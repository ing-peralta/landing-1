import React from 'react';
import { Cpu, Layout, Server, Sparkles, Layers, ShieldCheck } from 'lucide-react';

export const TechStack: React.FC = () => {
  const stackItems = [
    {
      name: 'Mistral AI API',
      role: 'Motor de Inteligencia & Traducción',
      description: 'Modelos de lenguaje de última generación optimizados para contexto multilingüe. Preservan la semántica, expresiones coloquiales y terminología técnica con latencia sub-100ms.',
      icon: <Sparkles className="w-5 h-5 text-amber-400" />,
      badges: ['Comprensión Contextual', 'Streaming Ultra-rápido', 'Multimodal'],
    },
    {
      name: 'Vue.js 3',
      role: 'Frontend Reactivo con Composition API',
      description: 'Arquitectura ligera y reactividad de grano fino. Mantiene decenas de salas de chat y streams concurrentes sin sobrecargar la memoria ni ralentizar la experiencia.',
      icon: <Layout className="w-5 h-5 text-emerald-400" />,
      badges: ['Composition API', 'Renderizado Ligero', 'Alta Escalabilidad'],
    },
    {
      name: 'Vuetify.js 3',
      role: 'Sistema de Componentes Material Design 3',
      description: 'Librería de componentes UI de grado empresarial. Garantiza que la experiencia visual sea táctil, ergonómica y accesible en smartphones, tablets y pantallas de sobremesa.',
      icon: <Layers className="w-5 h-5 text-teal-400" />,
      badges: ['Material Design 3', 'Totalmente Responsive', 'Accesible WCAG'],
    },
    {
      name: 'Node.js & WebSockets',
      role: 'Backend de Comunicación en Tiempo Real',
      description: 'Servidor basado en eventos asíncronos para enrutamiento instantáneo de mensajes, streaming de notas de voz en chunks y sincronización bidireccional inmediata.',
      icon: <Server className="w-5 h-5 text-indigo-400" />,
      badges: ['WebSockets Bidireccionales', 'Baja Latencia', 'Arquitectura Distribuida'],
    },
  ];

  return (
    <section id="tecnologia" className="py-20 md:py-28 border-b border-slate-900 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="text-xs font-semibold text-teal-400 uppercase tracking-wider mb-3">
            Ingeniería de Alto Rendimiento
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-display tracking-tight text-balance">
            Construido con las tecnologías más eficientes del mercado
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            Una sinergia tecnológica diseñada específicamente para eliminar la latencia de red y entregar una precisión de traducción sin precedentes.
          </p>
        </div>

        {/* 4 Tech Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {stackItems.map((item, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 font-medium">
                    {item.role}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white font-display mb-2">
                  {item.name}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              {/* Clean unboxed proof metadata */}
              <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400">
                {item.badges.map((b, bIdx) => (
                  <React.Fragment key={bIdx}>
                    <span className="text-slate-300">{b}</span>
                    {bIdx < item.badges.length - 1 && (
                      <span aria-hidden="true" className="text-slate-700">·</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Security & Privacy Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-900/60 border border-teal-500/20 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center shrink-0 mt-1">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-white mb-1">
                Privacidad y Cifrado de Conversaciones
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">
                Los mensajes, audios y documentos solo se procesan en memoria volátil para la inferencia de traducción mediante la API de Mistral. No se utilizan para reentrenar modelos públicos y los datos en tránsito cuentan con cifrado TLS 1.3 de extremo a extremo.
              </p>
            </div>
          </div>
          <div className="text-xs font-mono text-teal-300 bg-teal-950/80 px-3.5 py-2 rounded-xl border border-teal-800/50 whitespace-nowrap">
            Cifrado TLS 1.3 · GDPR Compliant
          </div>
        </div>

      </div>
    </section>
  );
};
