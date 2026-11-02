import React, { useState } from 'react';
import { 
  Check, 
  Sparkles, 
  CreditCard, 
  Globe2, 
  ShieldCheck, 
  ArrowRight, 
  Zap, 
  HelpCircle,
  Repeat,
  Building2,
  GraduationCap,
  User,
  Lock
} from 'lucide-react';
import { PRICING_PLANS } from '../data/mockData';
import { CheckoutModal } from './CheckoutModal';
import { SubscriptionFlowDiagram } from './SubscriptionFlowDiagram';

interface PricingPaymentsProps {
  onOpenWaitlist: () => void;
  onEnterDashboard?: (role: 'user' | 'company', email: string, plan: string) => void;
}

export const PricingPayments: React.FC<PricingPaymentsProps> = ({ 
  onOpenWaitlist,
  onEnterDashboard 
}) => {
  const [selectedGateway, setSelectedGateway] = useState<'stripe' | 'mercadopago'>('stripe');
  const [modalOpen, setModalOpen] = useState(false);
  const [activePlan, setActivePlan] = useState<{ name: string; priceUSD: number }>({
    name: 'Plan Empresarial',
    priceUSD: 30,
  });

  const handleOpenCheckout = (name: string, priceUSD: number, preferredGateway?: 'stripe' | 'mercadopago') => {
    setActivePlan({ name, priceUSD });
    if (preferredGateway) {
      setSelectedGateway(preferredGateway);
    }
    setModalOpen(true);
  };

  const getPlanIcon = (id: string) => {
    switch (id) {
      case 'personal':
        return <User className="w-5 h-5 text-teal-400" />;
      case 'empresarial':
        return <Building2 className="w-5 h-5 text-indigo-400" />;
      case 'educacion':
        return <GraduationCap className="w-5 h-5 text-amber-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-teal-400" />;
    }
  };

  return (
    <section id="precios-pagos" className="py-20 md:py-32 border-b border-slate-900 bg-slate-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="text-xs font-semibold text-teal-400 uppercase tracking-wider mb-3">
            Planes Transparentes & Facturación Automatizada
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-display tracking-tight text-balance">
            Elige tu plan y suscríbete con Stripe o Mercado Pago
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            Planes diseñados para individuos, equipos y el sector educativo. Disfruta de la robustez global de <strong>Stripe Checkout</strong> o abona en moneda local mediante <strong>Mercado Pago Subscriptions</strong>.
          </p>

          {/* Quick Gateway Selector Pill */}
          <div className="mt-8 inline-flex items-center gap-1 p-1.5 bg-slate-900 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setSelectedGateway('stripe')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all cursor-pointer ${
                selectedGateway === 'stripe'
                  ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Stripe (Recomendado Global en USD)</span>
            </button>
            <button
              onClick={() => setSelectedGateway('mercadopago')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all cursor-pointer ${
                selectedGateway === 'mercadopago'
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Globe2 className="w-3.5 h-3.5" />
              <span>Mercado Pago (Moneda Local en LATAM)</span>
            </button>
          </div>
        </div>

        {/* 3 Pricing Plans Grid: Personal $10, Empresarial $30, Educación $30 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 items-stretch">
          {PRICING_PLANS.map((plan) => {
            const isFeatured = plan.featured;
            return (
              <div
                key={plan.id}
                className={`p-6 sm:p-8 rounded-2xl flex flex-col justify-between transition-all relative ${
                  isFeatured
                    ? 'bg-slate-900 border-2 border-teal-400 shadow-2xl shadow-teal-950/40'
                    : 'bg-slate-900/50 border border-slate-800 hover:border-slate-700'
                }`}
              >
                {isFeatured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-teal-400 text-slate-950 text-[11px] font-bold uppercase tracking-wider">
                    Opción Más Elegida
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center">
                      {getPlanIcon(plan.id)}
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
                      {plan.audience}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white font-display mb-1">
                    {plan.name}
                  </h3>
                  <div className="text-xs text-teal-400 font-medium mb-3">
                    {plan.subtitle}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    {plan.description}
                  </p>

                  <div className="mb-6 flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold text-white font-mono tabular-nums">
                      ${plan.priceUSD}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">USD / mes</span>
                    <span className="text-[11px] text-sky-400 block sm:inline">
                      (o en ARS/MXN/BRL/CLP)
                    </span>
                  </div>

                  <ul className="space-y-3 text-xs text-slate-300">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5">
                        <Check className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Subscription Action Buttons */}
                <div className="pt-8 space-y-2">
                  <button
                    onClick={() => handleOpenCheckout(plan.name, plan.priceUSD, 'stripe')}
                    className={`w-full py-3 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      isFeatured
                        ? 'bg-teal-400 hover:bg-teal-300 text-slate-950 shadow-md shadow-teal-500/20 font-bold'
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                    }`}
                  >
                    <span>Suscribirse con Stripe ($ {plan.priceUSD} USD)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleOpenCheckout(plan.name, plan.priceUSD, 'mercadopago')}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-medium text-sky-300 hover:text-white bg-slate-950/80 hover:bg-slate-950 border border-sky-500/30 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Pagar con Mercado Pago en Moneda Local</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive 7-Step Subscription Architecture Diagram */}
        <SubscriptionFlowDiagram onStartFlow={(planId) => {
          const target = PRICING_PLANS.find(p => p.id === planId) || PRICING_PLANS[1];
          handleOpenCheckout(target.name, target.priceUSD);
        }} />

        {/* 2-Column Gateway Comparison & Strategic Explanation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          
          {/* Card 1: Stripe */}
          <div className={`p-6 sm:p-8 rounded-2xl border transition-all ${
            selectedGateway === 'stripe'
              ? 'bg-slate-900/90 border-indigo-500/50 shadow-xl shadow-indigo-950/20 ring-1 ring-indigo-500/30'
              : 'bg-slate-900/40 border-slate-800'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
                  S
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-display">
                    Stripe (La Opción Recomendada)
                  </h3>
                  <div className="text-[11px] text-teal-400 font-mono">
                    Cobro Global en USD / EUR
                  </div>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-teal-300 bg-teal-950/80 px-2.5 py-1 rounded border border-teal-800/40">
                Recomendada
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
              Puedes usar <strong>Stripe Checkout</strong> redirigiendo al usuario o abriéndolo dentro del flujo de la app. Stripe gestiona automáticamente los reintentos de cobro, actualización de tarjetas vencidas y facturación mensual sin que tengas que programar esa lógica compleja en tu backend Node.js.
            </p>

            <div className="space-y-2.5 text-xs text-slate-300 border-t border-slate-800 pt-4">
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Flujo sin fricción:</strong> Ideal si vas a cobrar en dólares globales a empresas o instituciones educativas internacionales.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Gestión de fallos inteligente (Smart Retries):</strong> Recupera suscripciones automáticamente cuando fallan los cobros periódicos.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Customer Portal incluido:</strong> Tus clientes gestionan sus métodos de pago y descargan facturas fiscales sin soporte manual.
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Mercado Pago */}
          <div className={`p-6 sm:p-8 rounded-2xl border transition-all ${
            selectedGateway === 'mercadopago'
              ? 'bg-slate-900/90 border-sky-500/50 shadow-xl shadow-sky-950/20 ring-1 ring-sky-500/30'
              : 'bg-slate-900/40 border-slate-800'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
                  MP
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-display">
                    Mercado Pago (Líder en LATAM)
                  </h3>
                  <div className="text-[11px] text-sky-400 font-mono">
                    Monedas Locales: ARS, MXN, BRL, CLP, COP
                  </div>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-sky-300 bg-sky-950/80 px-2.5 py-1 rounded border border-sky-800/40">
                Región LATAM
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
              <strong>Por qué elegirlo:</strong> Es el estándar indiscutible en la región si cobras en moneda local (ARS en Argentina, MXN en México, BRL en Brasil, CLP en Chile, etc.) y soporta suscripciones recurrentes mediante su API de Pre-notificaciones / Subscriptions.
            </p>

            <div className="space-y-2.5 text-xs text-slate-300 border-t border-slate-800 pt-4">
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Aceptación bancaria local:</strong> Elimina los bloqueos de tarjetas que no tienen habilitado el cobro internacional en USD.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Métodos locales nativos:</strong> Compatible con débito recurrente, saldo en cuenta digital y transferencias locales.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>
                  <strong>API de Subscriptions en Node.js:</strong> Webhooks automáticos cuando el cliente renueva o actualiza su pre-aprobación.
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Interactive 7-Step Checkout & Onboarding Modal */}
      <CheckoutModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        planName={activePlan.name}
        planPriceUSD={activePlan.priceUSD}
        gateway={selectedGateway}
        onSwitchGateway={setSelectedGateway}
        onEnterDashboard={onEnterDashboard}
      />
    </section>
  );
};
