import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Terminal, 
  Database, 
  ShieldCheck, 
  Check, 
  Copy, 
  ArrowRight, 
  ExternalLink,
  Code2,
  RefreshCw,
  Send,
  UserCheck,
  CheckCircle2,
  Lock,
  Layers,
  Inbox
} from 'lucide-react';
import { 
  DATABASE_SCHEMA_SQL, 
  BACKEND_ROUTES_CODE, 
  MAILER_SERVICE_CODE, 
  SECURITY_CHECKLIST 
} from '../data/invitationCodeSnippets';
import { AccountActivationView } from './AccountActivationView';

export interface InvitationFlowModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMemberActivated?: (member: { name: string; email: string; role: string }) => void;
}

export const InvitationFlowModal: React.FC<InvitationFlowModalProps> = ({
  isOpen,
  onClose,
  onMemberActivated,
}) => {
  const [activeTab, setActiveTab] = useState<'simulator' | 'sql' | 'backend' | 'mailer' | 'security'>('simulator');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Simulation State
  const [simStep, setSimStep] = useState<'form' | 'backend_processing' | 'email_inbox' | 'activation_screen' | 'completed'>('form');
  const [invName, setInvName] = useState('Sofía Valenzuela');
  const [invEmail, setInvEmail] = useState('sofia.valenzuela@empresa.com');
  const [invRole, setInvRole] = useState<'MEMBER' | 'MODERATOR' | 'ADMIN'>('MEMBER');
  
  // Generated token state
  const [generatedToken, setGeneratedToken] = useState('8f2a9c1e4d7b0f3e6a9c1e4d7b0f3e6a9c1e4d7b0f3e6a9c1e4d7b0f3e6a9c1e');
  const [activatedUser, setActivatedUser] = useState<{ name: string; email: string; role: string } | null>(null);

  if (!isOpen) return null;

  const handleCopyCode = (text: string, key: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Step 1 -> Step 2: Trigger backend invitation creation
  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    setSimStep('backend_processing');

    setTimeout(() => {
      // Generate a mock random 64-char hex token
      const randToken = Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
      setGeneratedToken(randToken);
      setSimStep('email_inbox');
    }, 800);
  };

  const handleOpenActivation = () => {
    setSimStep('activation_screen');
  };

  const handleActivationSuccess = (jwt: string, user: { name: string; email: string; role: string }) => {
    setActivatedUser(user);
    setSimStep('completed');
    if (onMemberActivated) {
      onMemberActivated(user);
    }
  };

  const handleResetSimulation = () => {
    setSimStep('form');
    setActivatedUser(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl my-8 rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl shadow-teal-950/40 overflow-hidden flex flex-col max-h-[92vh]"
        role="dialog"
        aria-modal="true"
      >
        
        {/* Modal Top Bar */}
        <div className="px-6 py-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center">
              <Mail className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-white font-display">
                Arquitectura de Invitación & Activación de Usuarios por Email
              </h3>
              <p className="text-[11px] text-slate-400">
                Flujo Full-Stack Senior: Base de Datos, Node.js Express, Mailer Transaccional y Frontend
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 py-2.5 bg-slate-950 border-b border-slate-800 flex items-center gap-2 overflow-x-auto text-xs shrink-0">
          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'simulator'
                ? 'bg-teal-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Simulador Interactivo en Vivo</span>
          </button>

          <button
            onClick={() => setActiveTab('sql')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'sql'
                ? 'bg-teal-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>1. Esquema SQL (PostgreSQL)</span>
          </button>

          <button
            onClick={() => setActiveTab('backend')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'backend'
                ? 'bg-teal-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>2. Backend Node.js / Express</span>
          </button>

          <button
            onClick={() => setActiveTab('mailer')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'mailer'
                ? 'bg-teal-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>3. Mailer & Plantilla HTML</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'security'
                ? 'bg-teal-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>5. Indicaciones de Seguridad</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          
          {/* TAB 1: SIMULADOR INTERACTIVO */}
          {activeTab === 'simulator' && (
            <div className="space-y-6">
              
              {/* Stepper overview */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400">
                <div className={`flex items-center gap-1.5 ${simStep === 'form' ? 'text-teal-400 font-bold' : ''}`}>
                  <span>1. Formulario Admin</span>
                </div>
                <span>➔</span>
                <div className={`flex items-center gap-1.5 ${simStep === 'backend_processing' ? 'text-teal-400 font-bold' : ''}`}>
                  <span>2. Token & BD</span>
                </div>
                <span>➔</span>
                <div className={`flex items-center gap-1.5 ${simStep === 'email_inbox' ? 'text-teal-400 font-bold' : ''}`}>
                  <span>3. Email HTML</span>
                </div>
                <span>➔</span>
                <div className={`flex items-center gap-1.5 ${simStep === 'activation_screen' ? 'text-teal-400 font-bold' : ''}`}>
                  <span>4. Activar Cuenta</span>
                </div>
                <span>➔</span>
                <div className={`flex items-center gap-1.5 ${simStep === 'completed' ? 'text-emerald-400 font-bold' : ''}`}>
                  <span>5. Usuario Activo</span>
                </div>
              </div>

              {/* Step 1: Admin Invitation Form */}
              {simStep === 'form' && (
                <div className="max-w-xl mx-auto p-6 rounded-2xl bg-slate-950 border border-slate-800">
                  <div className="flex items-center gap-2 mb-2 text-teal-400">
                    <Send className="w-4 h-4" />
                    <h4 className="text-base font-bold text-white font-display">
                      Paso 1: Dashboard del Administrador (Frontend)
                    </h4>
                  </div>
                  <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                    El administrador introduce el nombre y correo del nuevo colaborador para disparar la petición HTTP al backend.
                  </p>

                  <form onSubmit={handleSendInvite} className="space-y-4 text-xs">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">
                        Nombre completo del usuario <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={invName}
                        onChange={e => setInvName(e.target.value)}
                        placeholder="Ej. Sofía Valenzuela"
                        className="w-full bg-slate-900 border border-slate-800 focus:border-teal-400 rounded-xl px-4 py-2.5 text-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">
                        Correo electrónico institucional <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={invEmail}
                        onChange={e => setInvEmail(e.target.value)}
                        placeholder="sofia@empresa.com"
                        className="w-full bg-slate-900 border border-slate-800 focus:border-teal-400 rounded-xl px-4 py-2.5 text-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">
                        Rol asignado
                      </label>
                      <select
                        value={invRole}
                        onChange={e => setInvRole(e.target.value as any)}
                        className="w-full bg-slate-900 border border-slate-800 focus:border-teal-400 rounded-xl px-4 py-2.5 text-white focus:outline-none"
                      >
                        <option value="MEMBER">Miembro (Traducción y canales asignados)</option>
                        <option value="MODERATOR">Moderador de Canales Multilingüe</option>
                        <option value="ADMIN">Administrador de Organización</option>
                      </select>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-teal-500/20"
                      >
                        <span>Enviar Petición POST /api/users/invite</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Step 2: Backend Processing simulation */}
              {simStep === 'backend_processing' && (
                <div className="py-12 text-center space-y-4">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center">
                    <RefreshCw className="w-6 h-6 animate-spin" />
                  </div>
                  <h4 className="text-base font-bold text-white font-display">
                    Paso 2: Generando Invitación en Node.js...
                  </h4>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                    Validando unicidad de correo, insertando usuario en estado <strong>PENDING</strong>, generando token aleatorio criptográfico con TTL de 24 horas y guardando su hash SHA-256.
                  </p>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-[11px] text-teal-300 text-left max-w-md mx-auto">
                    <div>INSERT INTO users (status) VALUES (&apos;PENDING&apos;);</div>
                    <div>token_raw = crypto.randomBytes(32).toString(&apos;hex&apos;);</div>
                    <div>token_hash = crypto.createHash(&apos;sha256&apos;).update(token_raw);</div>
                    <div className="text-emerald-400 mt-1">✔ Correo transaccional despachado vía Resend / Nodemailer</div>
                  </div>
                </div>
              )}

              {/* Step 3: Simulated Email Inbox View */}
              {simStep === 'email_inbox' && (
                <div className="max-w-2xl mx-auto space-y-4">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1.5 text-teal-300 font-medium">
                      <Inbox className="w-4 h-4" />
                      Bandeja de Entrada del Destinatario: <span className="text-white font-mono">{invEmail}</span>
                    </span>
                    <span className="text-slate-500">Recibido hace 1 minuto</span>
                  </div>

                  {/* Email Preview Frame */}
                  <div className="rounded-2xl border border-slate-700 bg-slate-950 overflow-hidden shadow-2xl">
                    {/* Fake Mail Client Header */}
                    <div className="p-4 bg-slate-900 border-b border-slate-800 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-white">De: Converxar.com &lt;no-reply@converxar.com&gt;</span>
                        <span className="text-[11px] text-teal-400 font-mono">24h Expiración</span>
                      </div>
                      <div className="text-slate-400">Para: {invName} &lt;{invEmail}&gt;</div>
                      <div className="text-slate-300 font-medium pt-1">Asunto: Has sido invitado a unirte a Converxar.com</div>
                    </div>

                    {/* Email Body Template */}
                    <div className="p-6 sm:p-8 space-y-5 text-slate-300 text-xs sm:text-sm leading-relaxed">
                      <div className="text-lg font-bold text-white font-display">
                        ¡Hola, {invName}!
                      </div>
                      <p>
                        Te han invitado a colaborar en <strong>Converxar.com</strong>, el espacio de comunicación en tiempo real donde puedes chatear, enviar notas de voz y compartir documentos en tu propio idioma con traducción instantánea de Mistral AI.
                      </p>

                      <div className="py-2 text-center">
                        <button
                          onClick={handleOpenActivation}
                          className="px-6 py-3.5 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-teal-500/25 transition-all cursor-pointer inline-flex items-center gap-2"
                        >
                          <span>Activar Mi Cuenta y Establecer Contraseña</span>
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
                        <strong className="text-slate-200">Importante:</strong> Este enlace de activación es de un solo uso y expirará en <strong>24 horas</strong> por motivos de seguridad.
                      </div>

                      <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-900">
                        <div>Enlace directo:</div>
                        <div className="font-mono text-teal-400 break-all pt-1">
                          https://converxar.com/activar-cuenta?token={generatedToken}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center pt-2">
                    <p className="text-xs text-slate-400">
                      * Haz clic en el botón verde del correo para simular la llegada a la pantalla <code>/activar-cuenta</code>.
                    </p>
                  </div>
                </div>
              )}

              {/* Step 4: Account Activation Screen */}
              {simStep === 'activation_screen' && (
                <div>
                  <AccountActivationView
                    token={generatedToken}
                    userEmail={invEmail}
                    userName={invName}
                    onSuccess={handleActivationSuccess}
                    onCancel={() => setSimStep('email_inbox')}
                  />
                </div>
              )}

              {/* Step 5: Completed / Activated */}
              {simStep === 'completed' && activatedUser && (
                <div className="max-w-xl mx-auto p-8 rounded-2xl bg-slate-950 border border-teal-500/40 text-center space-y-4">
                  <div className="w-14 h-14 mx-auto rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="text-xs text-teal-400 font-semibold uppercase tracking-wider font-mono">
                    Flujo Completado con Éxito
                  </div>
                  <h4 className="text-xl font-bold text-white font-display">
                    ¡Cuenta de {activatedUser.name} Activada!
                  </h4>
                  <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                    La contraseña se almacenó cifrada con <strong>bcrypt (12 rounds)</strong>, el token fue marcado como utilizado (<code>used_at = NOW()</code>) y el estado del usuario cambió a <strong>ACTIVE</strong>. Se expidió el JWT de sesión para auto-login.
                  </p>

                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-left space-y-1.5 font-mono text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Usuario:</span>
                      <span className="text-white">{activatedUser.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Email:</span>
                      <span className="text-teal-300">{activatedUser.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Estado en BD:</span>
                      <span className="text-emerald-400 font-bold">ACTIVE</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Token Status:</span>
                      <span className="text-slate-400">Consumido / Invalidad</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-center gap-3">
                    <button
                      onClick={handleResetSimulation}
                      className="px-5 py-2.5 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 text-xs font-semibold cursor-pointer"
                    >
                      Probar Otra Invitación
                    </button>
                    <button
                      onClick={onClose}
                      className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-medium cursor-pointer"
                    >
                      Cerrar y Ver Dashboard
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 2: ESQUEMA SQL */}
          {activeTab === 'sql' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white font-display">
                    1. Esquema de Base de Datos Relacional (PostgreSQL)
                  </h4>
                  <p className="text-xs text-slate-400">
                    Tablas <code>users</code> y <code>invitation_tokens</code> con enums de estado, índices y claves foráneas.
                  </p>
                </div>
                <button
                  onClick={() => handleCopyCode(DATABASE_SCHEMA_SQL, 'sql')}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedKey === 'sql' ? <Check className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'sql' ? 'Copiado' : 'Copiar DDL SQL'}</span>
                </button>
              </div>

              <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 p-4">
                <pre className="font-mono text-xs text-teal-300 overflow-x-auto leading-relaxed">
                  <code>{DATABASE_SCHEMA_SQL}</code>
                </pre>
              </div>
            </div>
          )}

          {/* TAB 3: BACKEND NODE.JS */}
          {activeTab === 'backend' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white font-display">
                    2. Endpoints Backend en Node.js con Express & TypeScript
                  </h4>
                  <p className="text-xs text-slate-400">
                    <code>POST /api/users/invite</code> y <code>POST /api/users/complete-registration</code> con hash SHA-256 de tokens y bcrypt rounds 12.
                  </p>
                </div>
                <button
                  onClick={() => handleCopyCode(BACKEND_ROUTES_CODE, 'backend')}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedKey === 'backend' ? <Check className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'backend' ? 'Copiado' : 'Copiar Backend Node.js'}</span>
                </button>
              </div>

              <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 p-4">
                <pre className="font-mono text-xs text-teal-300 overflow-x-auto leading-relaxed max-h-[480px]">
                  <code>{BACKEND_ROUTES_CODE}</code>
                </pre>
              </div>
            </div>
          )}

          {/* TAB 4: MAILER & HTML TEMPLATE */}
          {activeTab === 'mailer' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white font-display">
                    3. Servicio de Mail Transaccional & Plantilla HTML Responsiva
                  </h4>
                  <p className="text-xs text-slate-400">
                    Función con Nodemailer / Resend y plantilla de correo diseñada para alta entregabilidad en Gmail, Outlook y Apple Mail.
                  </p>
                </div>
                <button
                  onClick={() => handleCopyCode(MAILER_SERVICE_CODE, 'mailer')}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedKey === 'mailer' ? <Check className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'mailer' ? 'Copiado' : 'Copiar Código Mailer'}</span>
                </button>
              </div>

              <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 p-4">
                <pre className="font-mono text-xs text-teal-300 overflow-x-auto leading-relaxed max-h-[480px]">
                  <code>{MAILER_SERVICE_CODE}</code>
                </pre>
              </div>
            </div>
          )}

          {/* TAB 5: GUIA DE SEGURIDAD */}
          {activeTab === 'security' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-bold text-white font-display mb-1">
                  5. Indicaciones de Seguridad Clave para Producción (Nivel Senior)
                </h4>
                <p className="text-xs text-slate-400 mb-6">
                  Prácticas esenciales para blindar el flujo de invitaciones contra ataques de enumeración, secuestro de tokens y ataques de fuerza bruta.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SECURITY_CHECKLIST.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="text-xs font-bold text-teal-400 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
                      <span>{item.title}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
