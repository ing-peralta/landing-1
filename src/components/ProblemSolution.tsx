import React from 'react';
import { 
  MessageSquare, 
  Mic, 
  FileText, 
  Smartphone, 
  CheckCircle2, 
  XCircle,
  Globe2
} from 'lucide-react';
import { PROBLEM_SOLUTIONS } from '../data/mockData';

export const ProblemSolution: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'MessageSquareText':
        return <MessageSquare className="w-5 h-5 text-teal-400" />;
      case 'Mic':
        return <Mic className="w-5 h-5 text-indigo-400" />;
      case 'FileSpreadsheet':
        return <FileText className="w-5 h-5 text-teal-300" />;
      case 'Smartphone':
        return <Smartphone className="w-5 h-5 text-emerald-400" />;
      default:
        return <Globe2 className="w-5 h-5 text-teal-400" />;
    }
  };

  return (
    <section id="que-resuelve" className="py-20 md:py-28 border-b border-slate-900 bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="text-xs font-semibold text-teal-400 uppercase tracking-wider mb-3">
            El Problema Real y Nuestra Solución
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-display tracking-tight text-balance">
            ¿Por qué copiar y pegar en traductores está destruyendo la comunicación de tu equipo?
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            Las herramientas de mensajería convencionales asumen que todos comparten el mismo idioma. Converxar.com reescribe esta dinámica para que el lenguaje nunca más sea una frontera.
          </p>
        </div>

        {/* Comparison: The Old Friction vs The Converxar Standard */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {/* El Método Tradicional */}
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/40 border border-rose-900/30">
            <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm mb-4">
              <XCircle className="w-4 h-4" />
              <span>La fricción habitual sin Converxar</span>
            </div>
            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <span className="text-rose-500 font-bold shrink-0">·</span>
                <span>Copiar texto ajeno, abrir Google Translate, pegar y volver a la app de chat.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-rose-500 font-bold shrink-0">·</span>
                <span>Las notas de voz quedan sin escuchar porque nadie comprende el idioma original.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-rose-500 font-bold shrink-0">·</span>
                <span>Capturas de pantalla o facturas en japonés, chino o alemán que nadie puede leer rápido.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-rose-500 font-bold shrink-0">·</span>
                <span>Pérdida de matices culturales y tono comercial formal o informal.</span>
              </li>
            </ul>
          </div>

          {/* El Estándar Converxar */}
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/70 border border-teal-500/30 shadow-lg shadow-teal-950/20">
            <div className="flex items-center gap-2 text-teal-300 font-semibold text-sm mb-4">
              <CheckCircle2 className="w-4 h-4 text-teal-400" />
              <span>La experiencia con Converxar.com</span>
            </div>
            <ul className="space-y-4 text-sm text-slate-200">
              <li className="flex items-start gap-3">
                <span className="text-teal-400 font-bold shrink-0">·</span>
                <span>Tú escribes en tu idioma nativo; el receptor lee directamente en el suyo en tiempo real.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-teal-400 font-bold shrink-0">·</span>
                <span>Las notas de voz se transcriben y traducen al segundo con forma de onda y síntesis de audio.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-teal-400 font-bold shrink-0">·</span>
                <span>OCR inteligente integrado: sube imágenes y lee el contenido traducido sobre la marcha.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-teal-400 font-bold shrink-0">·</span>
                <span>El motor de Mistral AI preserva el contexto técnico, la cortesía y la intención del mensaje.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 4 Core Pillars Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROBLEM_SOLUTIONS.map((item, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center mb-5">
                  {getIcon(item.icon)}
                </div>
                <div className="text-xs text-teal-400 font-medium mb-1.5">{item.category}</div>
                <h3 className="text-base font-semibold text-white mb-2.5 font-display">{item.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">{item.problem}</p>
              </div>
              <div className="pt-4 border-t border-slate-800/80 text-xs text-slate-300 font-medium flex items-start gap-1.5">
                <span className="text-teal-400">✓</span>
                <span>{item.solution}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
