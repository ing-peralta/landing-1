/**
 * Production-ready schemas, backend routes, mailer templates, and security guidelines
 * for the user email invitation & account activation flow.
 */

export const DATABASE_SCHEMA_SQL = `-- ============================================================================
-- 1. ESQUEMA DE BASE DE DATOS (PostgreSQL con extensiones seguras)
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enumeración de estados de usuario
CREATE TYPE user_status AS ENUM ('PENDING', 'ACTIVE', 'SUSPENDED');
CREATE TYPE user_role AS ENUM ('ADMIN', 'MEMBER', 'MODERATOR');

-- Tabla de Usuarios
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(120) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NULL, -- NULL mientras esté en estado PENDING
    role user_role NOT NULL DEFAULT 'MEMBER',
    status user_status NOT NULL DEFAULT 'PENDING',
    native_language VARCHAR(10) NOT NULL DEFAULT 'es',
    invited_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de Tokens de Invitación y Activación
CREATE TABLE invitation_tokens (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash VARCHAR(64) NOT NULL UNIQUE, -- SHA-256 del token original
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    used_at TIMESTAMP WITH TIME ZONE NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices optimizados para búsqueda de alta concurrencia
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_invitation_tokens_hash ON invitation_tokens(token_hash);
CREATE INDEX idx_invitation_tokens_user_id ON invitation_tokens(user_id);
`;

export const BACKEND_ROUTES_CODE = `// ============================================================================
// 2. BACKEND NODE.JS + EXPRESS (Controladores y Rutas de Invitación)
// ============================================================================

import express, { Request, Response } from 'express';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from './db'; // Cliente de base de datos (ej. pg / prisma / drizzle)
import { sendInvitationEmail } from './mailer';

const router = express.Router();

/**
 * 1. Genera un token aleatorio criptográficamente seguro
 * Retorna el token en texto plano (para el email) y su hash SHA-256 (para la BD)
 */
function generateInvitationToken(): { rawToken: string; tokenHash: string; expiresAt: Date } {
  const rawToken = crypto.randomBytes(32).toString('hex');
  const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');
  
  // Expiración en 24 horas
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
  
  return { rawToken, tokenHash, expiresAt };
}

/**
 * ENDPOINT 1: POST /api/users/invite
 * Genera la invitación, crea el usuario PENDING y envía el email.
 */
router.post('/invite', async (req: Request, res: Response) => {
  try {
    const { name, email, role = 'MEMBER', nativeLanguage = 'es' } = req.body;

    // Validación básica de parámetros
    if (!name || !email || !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Nombre y correo electrónico válido son requeridos.' });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // 1. Verificar si el usuario ya existe
    const existingUser = await db.query('SELECT id, status FROM users WHERE email = $1', [normalizedEmail]);
    if (existingUser.rows.length > 0) {
      const user = existingUser.rows[0];
      if (user.status === 'ACTIVE') {
        return res.status(409).json({ error: 'Este correo electrónico ya tiene una cuenta activa en Converxar.' });
      }
      // Si está en PENDING, podemos invalidar tokens anteriores y reenviar la invitación
      await db.query('DELETE FROM invitation_tokens WHERE user_id = $1 AND used_at IS NULL', [user.id]);
    }

    // 2. Iniciar transacción en base de datos
    await db.query('BEGIN');

    let userId: string;

    if (existingUser.rows.length > 0) {
      userId = existingUser.rows[0].id;
      await db.query(
        'UPDATE users SET name = $1, role = $2, native_language = $3, updated_at = NOW() WHERE id = $4',
        [name, role, nativeLanguage, userId]
      );
    } else {
      const newUserResult = await db.query(
        \`INSERT INTO users (name, email, role, status, native_language)
         VALUES ($1, $2, $3, 'PENDING', $4)
         RETURNING id\`,
        [name, normalizedEmail, role, nativeLanguage]
      );
      userId = newUserResult.rows[0].id;
    }

    // 3. Generar token seguro y guardar solo su HASH en la base de datos
    const { rawToken, tokenHash, expiresAt } = generateInvitationToken();

    await db.query(
      \`INSERT INTO invitation_tokens (user_id, token_hash, expires_at)
       VALUES ($1, $2, $3)\`,
      [userId, tokenHash, expiresAt]
    );

    await db.query('COMMIT');

    // 4. Enviar correo transaccional con el enlace de activación
    const appUrl = process.env.APP_URL || 'https://converxar.com';
    const activationLink = \`\${appUrl}/activar-cuenta?token=\${rawToken}\`;

    await sendInvitationEmail({
      toEmail: normalizedEmail,
      recipientName: name,
      activationLink,
      expiresHours: 24,
    });

    return res.status(201).json({
      success: true,
      message: 'Invitación enviada exitosamente.',
      data: {
        userId,
        email: normalizedEmail,
        status: 'PENDING',
        expiresAt,
      },
    });

  } catch (error) {
    await db.query('ROLLBACK');
    console.error('Error al procesar invitación:', error);
    return res.status(500).json({ error: 'Error interno del servidor al procesar la invitación.' });
  }
});

/**
 * ENDPOINT 2: POST /api/users/complete-registration
 * Valida el token, hashea la contraseña, activa el usuario y entrega JWT.
 */
router.post('/complete-registration', async (req: Request, res: Response) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({ error: 'Token y contraseña son obligatorios.' });
    }

    if (password.length < 8) {
      return res.status(400).json({ error: 'La contraseña debe contener al menos 8 caracteres.' });
    }

    // 1. Hashear el token recibido para buscarlo en la base de datos
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

    // 2. Buscar el token y verificar que no esté usado ni expirado
    const tokenResult = await db.query(
      \`SELECT it.id as token_id, it.user_id, it.expires_at, it.used_at, u.email, u.name, u.role
       FROM invitation_tokens it
       INNER JOIN users u ON it.user_id = u.id
       WHERE it.token_hash = $1\`,
      [tokenHash]
    );

    if (tokenResult.rows.length === 0) {
      return res.status(400).json({ error: 'El enlace de activación es inválido o no existe.' });
    }

    const invitation = tokenResult.rows[0];

    // Verificar si ya fue utilizado
    if (invitation.used_at !== null) {
      return res.status(400).json({ error: 'Este enlace de invitación ya ha sido utilizado anteriormente.' });
    }

    // Verificar si expiró
    if (new Date() > new Date(invitation.expires_at)) {
      return res.status(410).json({ error: 'El enlace de invitación ha expirado. Solicita una nueva invitación al administrador.' });
    }

    // 3. Hashear la nueva contraseña con bcrypt (cost factor 12)
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // 4. Iniciar transacción para activar la cuenta
    await db.query('BEGIN');

    // Actualizar usuario a ACTIVE
    await db.query(
      \`UPDATE users
       SET password_hash = $1, status = 'ACTIVE', updated_at = NOW()
       WHERE id = $2\`,
      [passwordHash, invitation.user_id]
    );

    // Marcar el token como usado
    await db.query(
      \`UPDATE invitation_tokens
       SET used_at = NOW()
       WHERE id = $1\`,
      [invitation.token_id]
    );

    await db.query('COMMIT');

    // 5. Generar sesión JWT de acceso inmediato (Auto-login)
    const jwtSecret = process.env.JWT_SECRET || 'secret_converxar_key_2026';
    const authToken = jwt.sign(
      {
        userId: invitation.user_id,
        email: invitation.email,
        name: invitation.name,
        role: invitation.role,
      },
      jwtSecret,
      { expiresIn: '30d' }
    );

    return res.status(200).json({
      success: true,
      message: 'Cuenta activada correctamente.',
      token: authToken,
      user: {
        id: invitation.user_id,
        name: invitation.name,
        email: invitation.email,
        role: invitation.role,
        status: 'ACTIVE',
      },
    });

  } catch (error) {
    await db.query('ROLLBACK');
    console.error('Error al completar registro:', error);
    return res.status(500).json({ error: 'Error interno del servidor al activar la cuenta.' });
  }
});

export default router;
`;

export const MAILER_SERVICE_CODE = `// ============================================================================
// 3. SERVICIO DE CORREO & PLANTILLA HTML RESPONSIVA (Resend / Nodemailer)
// ============================================================================

import nodemailer from 'nodemailer';

interface SendInvitationParams {
  toEmail: string;
  recipientName: string;
  activationLink: string;
  expiresHours?: number;
}

export async function sendInvitationEmail({
  toEmail,
  recipientName,
  activationLink,
  expiresHours = 24,
}: SendInvitationParams) {
  // Configuración del transporte (ej. SMTP o Resend SDK)
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.resend.com',
    port: Number(process.env.SMTP_PORT) || 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER || 'resend',
      pass: process.env.SMTP_PASSWORD || process.env.RESEND_API_KEY,
    },
  });

  const htmlContent = generateInvitationEmailTemplate({
    recipientName,
    activationLink,
    expiresHours,
  });

  const mailOptions = {
    from: '"Converxar.com" <no-reply@converxar.com>',
    to: toEmail,
    subject: \`Has sido invitado a unirte a Converxar.com\`,
    html: htmlContent,
    text: \`Hola \${recipientName},\\n\\nHas sido invitado a unirte a Converxar.com, la plataforma de mensajería en tiempo real que traduce texto, notas de voz y documentos en tu propio idioma.\\n\\nPara activar tu cuenta y configurar tu contraseña, visita el siguiente enlace:\\n\${activationLink}\\n\\nEste enlace expira en \${expiresHours} horas.\`,
  };

  return await transporter.sendMail(mailOptions);
}

/**
 * Generador de plantilla HTML responsiva con diseño optimizado para clientes de correo
 * (Gmail, Apple Mail, Outlook, Thunderbird)
 */
export function generateInvitationEmailTemplate({
  recipientName,
  activationLink,
  expiresHours = 24,
}: {
  recipientName: string;
  activationLink: string;
  expiresHours?: number;
}): string {
  return \`<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Invitación a Converxar.com</title>
  <style>
    body { margin: 0; padding: 0; background-color: #020617; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f8fafc; }
    .container { max-width: 580px; margin: 40px auto; background-color: #0f172a; border-radius: 16px; border: 1px solid #1e293b; overflow: hidden; }
    .header { padding: 32px 40px; background-color: #0f172a; border-bottom: 1px solid #1e293b; text-align: center; }
    .logo { font-size: 24px; font-weight: 800; color: #ffffff; text-decoration: none; }
    .logo span { color: #2dd4bf; }
    .content { padding: 40px; }
    .h1 { font-size: 22px; font-weight: 700; color: #ffffff; margin-top: 0; margin-bottom: 16px; line-height: 1.3; }
    .p { font-size: 14px; line-height: 1.6; color: #94a3b8; margin-bottom: 24px; }
    .btn-container { text-align: center; margin: 32px 0; }
    .btn { display: inline-block; background-color: #2dd4bf; color: #020617 !important; text-decoration: none; font-weight: 700; font-size: 14px; padding: 14px 32px; border-radius: 10px; }
    .callout { background-color: #020617; border-radius: 10px; border: 1px solid #1e293b; padding: 16px; margin-bottom: 24px; font-size: 12px; color: #64748b; }
    .callout strong { color: #cbd5e1; }
    .footer { padding: 24px 40px; background-color: #020617; border-top: 1px solid #1e293b; text-align: center; font-size: 11px; color: #475569; }
    .footer a { color: #64748b; text-decoration: underline; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">Converxar<span>.com</span></div>
    </div>
    <div class="content">
      <h1 class="h1">¡Hola, \${recipientName}!</h1>
      <p class="p">
        Te han invitado a colaborar en <strong>Converxar.com</strong>, el espacio de comunicación en tiempo real donde puedes chatear, enviar notas de voz y compartir documentos en tu propio idioma con traducción instantánea impulsada por Mistral AI.
      </p>

      <div class="btn-container">
        <a href="\${activationLink}" class="btn" target="_blank">Activar Mi Cuenta y Establecer Contraseña</a>
      </div>

      <div class="callout">
        <strong>Importante:</strong> Este enlace de activación es de un solo uso y expirará en <strong>\${expiresHours} horas</strong> por motivos de seguridad.
      </div>

      <p class="p" style="font-size: 12px; margin-bottom: 8px;">
        Si el botón no funciona, copia y pega el siguiente enlace directo en tu navegador:
      </p>
      <p style="font-family: monospace; font-size: 11px; color: #2dd4bf; word-break: break-all; margin-top: 0;">
        \${activationLink}
      </p>
    </div>
    <div class="footer">
      © \${new Date().getFullYear()} Converxar.com · Mensajería Multimodal en Tiempo Real.<br>
      Si no reconoces esta invitación, puedes ignorar este mensaje con seguridad.
    </div>
  </div>
</body>
</html>\`;
}
`;

export const SECURITY_CHECKLIST = [
  {
    title: '1. Almacenamiento Seguro del Token (Token Hashing con SHA-256)',
    description: 'Nunca almacenes el token en texto plano en la base de datos. El backend genera 32 bytes criptográficos aleatorios, envía el token original por correo al usuario, pero guarda únicamente su hash SHA-256 en la columna `token_hash`. Si la base de datos sufre una filtración, los atacantes no podrán activar cuentas ajenas.',
  },
  {
    title: '2. Enlace de Un Solo Uso (Single-Use Token Enforcement)',
    description: 'La columna `used_at` garantiza que tan pronto como el usuario activa su cuenta, el token queda invalidado de inmediato. Cualquier reintento posterior es rechazado con código 400 Bad Request.',
  },
  {
    title: '3. Ventana de Expiración Estricta (TTL de 24 horas)',
    description: 'Los tokens de invitación deben tener una fecha límite inmutable (`expires_at`). Si un usuario intenta activar una cuenta tras 24 horas, el endpoint retorna HTTP 410 Gone y ofrece solicitar una nueva invitación.',
  },
  {
    title: '4. Hashing de Contraseña con Cost Factor Robusto (Bcrypt salt rounds 12)',
    description: 'La contraseña del usuario se procesa con bcrypt utilizando un factor de costo 12 o superior para mitigar ataques de fuerza bruta en hardware moderno.',
  },
  {
    title: '5. Rate Limiting en Endpoints Sensibles',
    description: 'Aplica limitadores de tasa (ej. `express-rate-limit`) tanto en `POST /api/users/invite` (ej. máximo 15 invitaciones por hora por IP/Admin) como en `POST /api/users/complete-registration` (ej. máximo 5 intentos por minuto) para evitar ataques de denegación de servicio o saturación de envíos de email.',
  },
  {
    title: '6. Prevención de Enumeración de Usuarios',
    description: 'En el endpoint de invitación para usuarios no administradores, las respuestas deben ser opacas para no revelar si una dirección de correo ya existe en el sistema.',
  },
];
