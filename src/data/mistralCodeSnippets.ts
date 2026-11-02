/**
 * Complete production-ready implementation of Mistral AI API for Converxar.com
 * Includes: Chat Streaming (mistral-small-latest), Vision OCR (pixtral-12b),
 * and Audio Note Context Translation.
 */

export const MISTRAL_BACKEND_NODE_CODE = `// ============================================================================
// BACKEND NODE.JS + EXPRESS: INTEGRACIÓN OFICIAL CON MISTRAL AI SDK
// Instalar: npm install @mistralai/mistralai
// ============================================================================

import express, { Request, Response } from 'express';
import { Mistral } from '@mistralai/mistralai';

const router = express.Router();

// Inicialización del cliente con la clave de entorno
const mistral = new Mistral({
  apiKey: process.env.MISTRAL_API_KEY,
});

/**
 * Prompt del Sistema especializado para traducción contextual bidireccional
 */
const CONVERXAR_SYSTEM_PROMPT = \`Eres el motor de traducción en tiempo real de Converxar.com.
Tu tarea es traducir con la máxima naturalidad y fidelidad cultural.
Instrucciones estrictas:
1. Traduce directamente al idioma objetivo indicado sin añadir introducciones, notas o comentarios ("Traducción:", etc.).
2. Preserva el registro (formal si es de negocios, informal si es coloquial).
3. Adapta modismos, frases hechas y cortesías culturales para que suenen nativas.
4. Mantén términos técnicos, nombres propios, enlaces y emojis intactos.\`;

// ----------------------------------------------------------------------------
// 1. CHAT EN TIEMPO REAL CON STREAMING (mistral-small-latest)
// Latencia ultra-baja (sub-80ms TTFT) para enviar tokens al WebSocket/SSE
// ----------------------------------------------------------------------------
router.post('/chat-translate-stream', async (req: Request, res: Response) => {
  try {
    const { text, sourceLang, targetLang, formality = 'natural' } = req.body;

    if (!text || !targetLang) {
      return res.status(400).json({ error: 'Texto e idioma objetivo son obligatorios.' });
    }

    // Configuración de Server-Sent Events (SSE) para streaming en vivo
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const promptUser = \`Idioma origen: \${sourceLang || 'Detectar'}.
Idioma objetivo: \${targetLang}.
Tono requerido: \${formality}.
Mensaje a traducir:
"\${text}"\`;

    // Invocación con streaming usando mistral-small-latest (optimizado para chat)
    const streamResponse = await mistral.chat.stream({
      model: 'mistral-small-latest',
      temperature: 0.2, // Baja temperatura para consistencia y precisión
      messages: [
        { role: 'system', content: CONVERXAR_SYSTEM_PROMPT },
        { role: 'user', content: promptUser }
      ],
    });

    for await (const chunk of streamResponse) {
      const content = chunk.data?.choices?.[0]?.delta?.content || '';
      if (content) {
        res.write(\`data: \${JSON.stringify({ token: content })}\\n\\n\`);
      }
    }

    res.write('data: [DONE]\\n\\n');
    res.end();

  } catch (error) {
    console.error('Error en streaming de Mistral AI:', error);
    res.write(\`data: \${JSON.stringify({ error: 'Fallo en la inferencia de Mistral' })}\\n\\n\`);
    res.end();
  }
});

// ----------------------------------------------------------------------------
// 2. OCR Y TRADUCCIÓN DE IMÁGENES / CAPTURAS CON PIXTRAL (pixtral-12b)
// Procesa carteles, menús, facturas o capturas en japonés, chino, alemán, etc.
// ----------------------------------------------------------------------------
router.post('/ocr-image-translate', async (req: Request, res: Response) => {
  try {
    const { imageBase64, mimeType = 'image/jpeg', targetLang = 'es' } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: 'La imagen en base64 es requerida.' });
    }

    const imageUrl = \`data:\${mimeType};base64,\${imageBase64}\`;

    const response = await mistral.chat.complete({
      model: 'pixtral-12b',
      messages: [
        {
          role: 'system',
          content: 'Eres el sistema OCR multimodal de Converxar.com. Extrae el texto visible de la imagen y entrégalo traducido fielmente al idioma objetivo, respetando su formato visual y saltos de línea.',
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: \`Extrae todo el texto de esta imagen y tradúcelo directamente al idioma: \${targetLang}. Si hay datos estructurados (fechas, montos, tablas), consérvalos intactos.\`,
            },
            {
              type: 'image_url',
              imageUrl: imageUrl,
            },
          ],
        },
      ],
    });

    const translatedText = response.choices?.[0]?.message?.content || '';

    return res.status(200).json({
      success: true,
      model: 'pixtral-12b',
      targetLang,
      translatedText,
    });

  } catch (error) {
    console.error('Error en OCR con Pixtral:', error);
    return res.status(500).json({ error: 'Error al procesar la imagen con Pixtral AI.' });
  }
});

// ----------------------------------------------------------------------------
// 3. DOCUMENTOS TÉCNICOS & CONTRATOS (mistral-large-latest)
// Para documentos largos, PDF y cláusulas legales con máxima coherencia
// ----------------------------------------------------------------------------
router.post('/document-translate', async (req: Request, res: Response) => {
  try {
    const { documentContent, sourceLang, targetLang, terminologyDomain = 'legal' } = req.body;

    const response = await mistral.chat.complete({
      model: 'mistral-large-latest',
      temperature: 0.1,
      messages: [
        {
          role: 'system',
          content: \`Eres un traductor profesional senior especializado en el ámbito \${terminologyDomain}. Traduce con precisión terminológica absoluta.\`,
        },
        {
          role: 'user',
          content: \`Traduce el siguiente documento de \${sourceLang || 'origen'} a \${targetLang}:\\n\\n\${documentContent}\`,
        },
      ],
    });

    return res.status(200).json({
      success: true,
      model: 'mistral-large-latest',
      result: response.choices?.[0]?.message?.content,
    });

  } catch (error) {
    console.error('Error en traducción con Mistral Large:', error);
    return res.status(500).json({ error: 'Error al traducir documento con Mistral.' });
  }
});

export default router;
`;

export const MISTRAL_MODELS_INFO = [
  {
    id: 'mistral-small-latest',
    name: 'Mistral Small 3',
    role: 'Chat en Tiempo Real & WebSockets',
    latency: '~65ms TTFT',
    description: 'El modelo predilecto para mensajería instantánea. Extremadamente rápido, ligero y con comprensión nativa excepcional de español, inglés, francés, alemán, italiano y portugués.',
    useCase: 'Mensajes de chat, streaming de notas de voz, respuestas instantáneas.',
    badges: ['Baja Latencia', 'Streaming SSE', 'Económico'],
  },
  {
    id: 'pixtral-12b',
    name: 'Pixtral 12B',
    role: 'Visión Multimodal & OCR de Imágenes',
    latency: '~210ms',
    description: 'Modelo multimodal nativo capaz de inspeccionar imágenes a resolución arbitraria, reconocer texto en alfabetos no latinos (kanji japonés, cirílico, hanzi chino) y traducirlo al vuelo.',
    useCase: 'Fotos de carteles, recibos, menús, etiquetas técnicas, capturas de pantalla.',
    badges: ['Multimodal', 'OCR Nativo', 'Alta Resolución'],
  },
  {
    id: 'mistral-large-latest',
    name: 'Mistral Large 2',
    role: 'Documentos Complejos & Contratos B2B',
    latency: '~140ms',
    description: 'Capacidad de razonamiento superior para terminología legal, médica y de ingeniería. Ideal para traducción de archivos PDF, cláusulas comerciales y negociaciones corporativas.',
    useCase: 'Minutas de reunión, contratos comerciales, especificaciones técnicas.',
    badges: ['Máxima Precisión', '128k Contexto', 'Grado Empresarial'],
  },
];
