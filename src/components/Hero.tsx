import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Zap } from 'lucide-react';

interface HeroProps {
  onOpenWaitlist: () => void;
  onExploreDemo: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenWaitlist, onExploreDemo }) => {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden border-b border-slate-900">
      {/* Subtle ambient gradient mesh */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-teal-500/15 via-indigo-600/10 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Pitch */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          
          {/* Quiet text kicker with typographic separator */}
          <div className="inline-flex items-center gap-2 text-xs font-medium text-teal-400 mb-4 tracking-wide uppercase">
            <span>Mensajería Multimodal en Tiempo Real</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-400">Impulsado por Mistral AI</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white font-display tracking-tight leading-[1.15] text-balance mb-6">
            El chat en tiempo real donde cada uno escribe en su idioma <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-teal-400 to-indigo-300">y todos se entienden.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto mb-8 font-normal">
            <strong>Converxar.com</strong> traduce al instante texto, notas de voz con audio transcrito, imágenes con texto y documentos completos. Cada usuario siempre recibe y escucha el mensaje en su idioma elegido.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <button
              onClick={onOpenWaitlist}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 active:scale-98 rounded-xl shadow-lg shadow-teal-500/25 transition-all whitespace-nowrap cursor-pointer"
            >
              <span>Solicitar Acceso Anticipado</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onExploreDemo}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium text-slate-200 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-800 rounded-xl transition-all whitespace-nowrap cursor-pointer"
            >
              <span>Probar Simulador en Vivo</span>
            </button>
          </div>

          {/* Clean unboxed proof points (No pill enclosure) */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-400">
            <span className="inline-flex items-center gap-1.5 text-slate-300">
              <Zap className="w-3.5 h-3.5 text-teal-400" />
              Latencia sub-100ms con Mistral
            </span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span className="inline-flex items-center gap-1.5 text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              Audio, Texto, OCR y Archivos
            </span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span className="inline-flex items-center gap-1.5 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              PWA sin descargas obligatorias
            </span>
          </div>

        </div>

        {/* Visual Focal Anchor: Hero Workspace Screen */}
        <div className="relative max-w-5xl mx-auto">
          {/* Framed Laptop & Vuetify Interface Display */}
          <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/90 shadow-2xl shadow-teal-950/40">
            {/* Window title bar styled like clean Material/Vuetify OS window */}
            <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-2 font-mono text-[11px] text-slate-400">app.converxar.com/chat/multilingual</span>
              </div>
              <div className="hidden sm:flex items-center gap-3 text-[11px]">
                <span className="text-teal-400 font-medium">Vue 3 + Vuetify 3</span>
                <span>·</span>
                <span className="text-slate-400">Mistral AI v3.0</span>
              </div>
            </div>

            {/* Generated Photorealistic Mockup of Converxar Vuetify Laptop */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
              <img
                src="/src/assets/images/converxar_desktop_vuetify_1793627845056.jpg"
                alt="Captura de pantalla de la interfaz de Converxar.com en laptop con componentes Vuetify"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />

              {/* Live interactive overlay callout demonstrating the real-time translation mechanism */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-md backdrop-blur-md bg-slate-950/85 border border-teal-500/30 p-4 rounded-xl text-xs shadow-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-teal-400" />
                    Traducción Automática Bidireccional
                  </span>
                  <span className="text-[11px] text-teal-400 font-mono">84 ms</span>
                </div>
                <div className="space-y-1.5 text-slate-300">
                  <p className="text-[11px] text-slate-400">
                    <span className="font-medium text-slate-200">Elena (Madrid 🇪🇸):</span> &quot;¿Cómo va el lanzamiento del nuevo módulo?&quot;
                  </p>
                  <p className="text-[11px] text-emerald-300 bg-emerald-950/40 p-1.5 rounded border border-emerald-500/20">
                    <span className="font-medium text-white">David (London 🇬🇧 recibe):</span> &quot;How is the launch of the new module going?&quot;
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Under-hero metrics strip */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80">
              <div className="text-2xl font-bold text-white font-mono tabular-nums">100+</div>
              <div className="text-xs text-slate-400 mt-1">Idiomas globales soportados</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80">
              <div className="text-2xl font-bold text-teal-400 font-mono tabular-nums">4 en 1</div>
              <div className="text-xs text-slate-400 mt-1">Texto, Audio, OCR e Imágenes</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80">
              <div className="text-2xl font-bold text-indigo-400 font-mono tabular-nums">0s</div>
              <div className="text-xs text-slate-400 mt-1">Tiempo de instalación (PWA)</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80">
              <div className="text-2xl font-bold text-white font-mono tabular-nums">100%</div>
              <div className="text-xs text-slate-400 mt-1">Contexto y tono preservados</div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
