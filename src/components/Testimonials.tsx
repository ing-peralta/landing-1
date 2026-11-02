import React from 'react';
import { Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: 'Carlos Mendoza',
      role: 'Director de Operaciones Globales',
      company: 'Logix International (Valencia & Múnich)',
      content: 'Antes tardábamos hasta 4 horas en coordinar envíos con los almacenes en Alemania y Polonia debido al idioma. Con Converxar, el equipo español escribe en castellano y en Múnich reciben las instrucciones en alemán impecable. Redujimos los tiempos de respuesta en un 68%.',
      metric: '-68% en tiempos de respuesta',
    },
    {
      name: 'Sophie Laurent',
      role: 'Head of Product Design',
      company: 'Studio Bloom (París & Tokio)',
      content: 'La función de notas de voz transcritas y traducidas en tiempo real con Mistral AI cambió por completo nuestra dinámica creativa con nuestros diseñadores en Tokio. Puedo grabar un audio en francés caminando al metro y ellos lo leen en japonés al instante.',
      metric: '+4.2x notas de voz transfronterizas',
    },
    {
      name: 'Jorge Peralta',
      role: 'Arquitecto de Soluciones Cloud',
      company: 'DevBridge Solutions',
      content: 'La combinación de Vue 3 y Vuetify en una PWA hace que la app vuele en cualquier teléfono sin tener que forzar descargas en App Store. El backend en Node.js con WebSockets entrega los mensajes antes de que el usuario pestañee.',
      metric: '0 descargas forzadas · 100% PWA',
    },
  ];

  return (
    <section className="py-20 md:py-28 border-b border-slate-900 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="text-xs font-semibold text-teal-400 uppercase tracking-wider mb-2">
            Casos de Éxito & Resultados Comprobados
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-display tracking-tight text-balance">
            Equipos multilingües que ya no sufren barreras de comunicación
          </h2>
        </div>

        {/* Testimonials 3-Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-2xl bg-slate-900/50 border border-slate-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Quote className="w-6 h-6 text-teal-400/40" />
                  <span className="text-xs font-mono text-teal-300 font-semibold bg-teal-950/60 px-2.5 py-1 rounded border border-teal-800/40">
                    {t.metric}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 italic">
                  &quot;{t.content}&quot;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80">
                <div className="text-sm font-semibold text-white font-display">
                  {t.name}
                </div>
                <div className="text-xs text-slate-400">
                  {t.role} · <span className="text-slate-300">{t.company}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
