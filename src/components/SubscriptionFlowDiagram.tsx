import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ArrowDown, 
  ArrowRight, 
  UserCheck, 
  Server, 
  CreditCard, 
  Webhook, 
  Check, 
  XCircle, 
  Key, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Terminal
} from 'lucide-react';
import { SUBSCRIPTION_FLOW_STEPS } from '../data/mockData';

interface FlowDiagramProps {
  onStartFlow: (planId: string) => void;
}

export const SubscriptionFlowDiagram: React.FC<FlowDiagramProps> = ({ onStartFlow }) => {
  const [selectedStepIndex, setSelectedStepIndex] = useState(0);
  const activeStep = SUBSCRIPTION_FLOW_STEPS[selectedStepIndex];

  return (
    <div className="my-16 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="text-xs font-semibold text-teal-400 uppercase tracking-wider mb-1">
            Arquitectura de Suscripciones & Onboarding
          </div>
          <h3 className="text-xl font-bold text-white font-display">
            Flujo Completo de 7 Pasos: Del Visitante al Dashboard Activo
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Diseñado para garantizar pagos seguros, sincronización asíncrona por Webhooks y acceso inmediato sin fricción.
          </p>
        </div>

        <button
          onClick={() => onStartFlow('empresarial')}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 shadow-sm shadow-teal-500/20"
        >
          <span>Simular Flujo Completo</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 7-Step Interactive Pipeline Strip */}
      <div className="py-6 overflow-x-auto scrollbar-none">
        <div className="flex items-center justify-between min-w-[760px] gap-2">
          {SUBSCRIPTION_FLOW_STEPS.map((s, idx) => {
            const isSelected = selectedStepIndex === idx;
            return (
              <React.Fragment key={s.step}>
                <button
                  onClick={() => setSelectedStepIndex(idx)}
                  className={`flex flex-col items-center text-center p-2.5 rounded-xl transition-all cursor-pointer group flex-1 ${
                    isSelected
                      ? 'bg-teal-950/70 border border-teal-500/60 shadow-md shadow-teal-950/50'
                      : 'hover:bg-slate-800/60 border border-transparent'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs mb-1.5 transition-colors font-mono ${
                    isSelected
                      ? 'bg-teal-400 text-slate-950'
                      : 'bg-slate-800 text-slate-300 group-hover:bg-slate-700'
                  }`}>
                    {s.step}
                  </div>
                  <div className={`text-[11px] font-semibold leading-tight line-clamp-1 ${
                    isSelected ? 'text-teal-300' : 'text-slate-300 group-hover:text-white'
                  }`}>
                    {s.title.split(' ')[0]} {s.title.split(' ')[1] || ''}
                  </div>
                  <div className="text-[9px] text-slate-500 mt-0.5">
                    {s.actor}
                  </div>
                </button>

                {idx < SUBSCRIPTION_FLOW_STEPS.length - 1 && (
                  <ChevronRight className="w-4 h-4 text-slate-600 shrink-0" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Active Step Deep Dive Card */}
      <div className="rounded-xl bg-slate-950 border border-slate-800 p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold text-xs font-mono">
              0{activeStep.step}
            </span>
            <h4 className="text-base font-bold text-white font-display">
              {activeStep.title}
            </h4>
          </div>
          <div className="text-xs font-mono text-teal-400 bg-teal-950/80 px-2.5 py-1 rounded border border-teal-800/40">
            Actor Responsable: {activeStep.actor}
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
          {activeStep.description}
        </p>

        <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800/80 text-xs text-slate-300 mb-4">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1 font-semibold">
            Detalle Técnico de Implementación
          </div>
          <div>{activeStep.technicalDetail}</div>
        </div>

        {/* Code Snippet for developers */}
        {activeStep.codeSnippet && (
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[11px] text-teal-300 overflow-x-auto flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <code>{activeStep.codeSnippet}</code>
          </div>
        )}

        {/* Step 4 Special Branching Callout */}
        {activeStep.step === 4 && (
          <div className="mt-4 pt-4 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-rose-950/20 border border-rose-900/40 text-rose-300">
              <div className="font-semibold flex items-center gap-1.5 mb-1">
                <XCircle className="w-3.5 h-3.5 text-rose-400" />
                <span>Bifurcación: Pago Rechazado / Cancelado</span>
              </div>
              <p className="text-[11px] text-slate-400">
                La pasarela retorna al usuario a la Landing Page con el parámetro <code className="text-rose-300">?status=canceled</code> o mensaje de fondos insuficientes para reintentar con otro medio.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-900/40 text-emerald-300">
              <div className="font-semibold flex items-center gap-1.5 mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Bifurcación: Pago Exitoso</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Se activa de inmediato el webhook en Node.js, se asigna el rol del plan en la BD y el usuario avanza automáticamente al paso 5, 6 y 7.
              </p>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
