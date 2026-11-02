import React, { useState } from 'react';
import { 
  X, 
  CreditCard, 
  ShieldCheck, 
  Check, 
  ArrowRight, 
  Sparkles, 
  ExternalLink,
  RefreshCw,
  Lock,
  Globe2,
  AlertCircle,
  Key,
  Server,
  UserCheck,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Webhook
} from 'lucide-react';

export interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  planPriceUSD: number;
  gateway: 'stripe' | 'mercadopago';
  onSwitchGateway: (gateway: 'stripe' | 'mercadopago') => void;
  onEnterDashboard?: (role: 'user' | 'company', email: string, plan: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  planName,
  planPriceUSD,
  gateway,
  onSwitchGateway,
  onEnterDashboard,
}) => {
  // Current active step in the 7-step architecture flow:
  // Step 2: Registro / Identificación Previa (Email + Password)
  // Step 3: Creación de Checkout (Node.js API call)
  // Step 4: Pasarela de Pago (Stripe / Mercado Pago)
  // Step 5: Webhook Async (Node.js webhook receipt)
  // Step 6: Redirección / Bienvenida (Página de éxito)
  // Step 7: Acceso Directo con JWT al Dashboard
  const [currentStep, setCurrentStep] = useState<2 | 3 | 4 | 5 | 6 | 7>(2);

  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPassword, setCustomerPassword] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState<'ARS' | 'MXN' | 'BRL' | 'CLP' | 'COP'>('MXN');
  
  // Payment states
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [jwtToken, setJwtToken] = useState<string>('');

  if (!isOpen) return null;

  // Approximate local conversion rates for Mercado Pago
  const localCurrencies = {
    ARS: { symbol: 'ARS $', rate: 1180, name: 'Pesos Argentinos' },
    MXN: { symbol: 'MXN $', rate: 19.5, name: 'Pesos Mexicanos' },
    BRL: { symbol: 'R$', rate: 5.4, name: 'Reales Brasileños (Pix)' },
    CLP: { symbol: 'CLP $', rate: 940, name: 'Pesos Chilenos' },
    COP: { symbol: 'COP $', rate: 4150, name: 'Pesos Colombianos' },
  };

  const localPrice = Math.round(planPriceUSD * localCurrencies[selectedCurrency].rate);

  // Step 2 -> Step 3: Register intent and generate checkout session in Node.js
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentError(null);
    setCurrentStep(3);

    // Simulate Node.js backend generating session with Stripe or Mercado Pago
    setTimeout(() => {
      setCurrentStep(4);
    }, 900);
  };

  // Step 4: Simulate successful payment
  const handleSimulateSuccess = () => {
    setIsProcessing(true);
    setPaymentError(null);

    // Simulate payment submission -> Step 5 (Async Webhook received)
    setTimeout(() => {
      setIsProcessing(false);
      setCurrentStep(5);

      // Simulate Webhook processing in Node.js -> Step 6 (Welcome / Success)
      setTimeout(() => {
        const dummyJwt = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify({ 
          sub: customerEmail || 'user@empresa.com', 
          plan: planName, 
          role: 'subscriber',
          exp: Math.floor(Date.now() / 1000) + 3600 * 24 * 30 
        }))}.signature_converxar_node`;
        
        setJwtToken(dummyJwt);
        setCurrentStep(6);
      }, 1000);

    }, 800);
  };

  // Step 4: Simulate rejected/canceled payment
  const handleSimulateFailure = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentError(
        gateway === 'stripe'
          ? 'Error de Stripe: La tarjeta fue rechazada por fondos insuficientes o cancelada por el usuario (card_declined).'
          : 'Error de Mercado Pago: Pago cancelado o rechazado por la entidad bancaria local (cc_rejected_call_for_authorize).'
      );
    }, 700);
  };

  const handleEnterDashboard = () => {
    setCurrentStep(7);
  };

  const handleCloseAndReset = () => {
    setCurrentStep(2);
    setPaymentError(null);
    setIsProcessing(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div 
        className="relative w-full max-w-xl my-8 rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl shadow-teal-950/40 overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        
        {/* Modal Top Bar */}
        <div className="px-6 py-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-teal-400 font-mono">
              Flujo de Suscripción Converxar · Paso {currentStep} de 7
            </span>
          </div>
          <button
            onClick={handleCloseAndReset}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Plan Header Info */}
        <div className="px-6 py-3 bg-slate-950/70 border-b border-slate-800/80 flex items-center justify-between text-xs">
          <div>
            <span className="text-slate-400">Plan: </span>
            <span className="font-bold text-white font-display">{planName}</span>
          </div>
          <div className="font-mono">
            <span className="text-teal-400 font-bold">${planPriceUSD} USD</span>
            <span className="text-slate-500"> /mes</span>
          </div>
        </div>

        {/* Dynamic Step View */}
        <div className="p-6 sm:p-8">

          {/* STEP 2: Registro / Identificación Previa (Email + Contraseña) */}
          {currentStep === 2 && (
            <div>
              <div className="flex items-center gap-2 mb-2 text-teal-400">
                <UserCheck className="w-5 h-5" />
                <h3 className="text-lg font-bold text-white font-display">
                  Paso 2: Registro / Identificación Previa
                </h3>
              </div>
              <p className="text-xs text-slate-300 mb-6 leading-relaxed">
                Ingresa tu correo y contraseña. Node.js creará tu cuenta en la base de datos y la vinculará a la sesión de pago con la pasarela elegida.
              </p>

              {/* Gateway Selector */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <button
                  type="button"
                  onClick={() => onSwitchGateway('stripe')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    gateway === 'stripe'
                      ? 'bg-indigo-950/40 border-indigo-500 text-white'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-indigo-300">Stripe Checkout</span>
                    <span className="text-[9px] text-teal-400 bg-teal-950 px-1.5 py-0.5 rounded font-mono">Recomendado</span>
                  </div>
                  <div className="text-[10px] text-slate-400">
                    USD Global · Tarjetas & Apple Pay
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => onSwitchGateway('mercadopago')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    gateway === 'mercadopago'
                      ? 'bg-sky-950/40 border-sky-500 text-white'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-sky-300">Mercado Pago</span>
                    <span className="text-[9px] text-sky-400 bg-sky-950 px-1.5 py-0.5 rounded font-mono">LATAM</span>
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Moneda Local (ARS, MXN, BRL, CLP)
                  </div>
                </button>
              </div>

              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Correo electrónico <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={e => setCustomerEmail(e.target.value)}
                    placeholder="tu@empresa.com o personal"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-teal-400 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Contraseña para acceder a Converxar <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={customerPassword}
                    onChange={e => setCustomerPassword(e.target.value)}
                    placeholder="Mínimo 6 caracteres"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-teal-400 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-teal-500/20"
                  >
                    <span>Continuar a Creación de Checkout (Node.js)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* STEP 3: Creación de Checkout (Llamada al Backend Node.js) */}
          {currentStep === 3 && (
            <div className="py-8 text-center space-y-4">
              <div className="w-12 h-12 mx-auto rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center">
                <RefreshCw className="w-6 h-6 animate-spin" />
              </div>
              <h3 className="text-base font-bold text-white font-display">
                Paso 3: Creando Sesión de Checkout en Node.js...
              </h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                El backend en Node.js está comunicándose con la API de {gateway === 'stripe' ? 'Stripe (stripe.checkout.sessions.create)' : 'Mercado Pago (/v1/preapproval)'} para generar el enlace de pago seguro.
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-[11px] text-teal-300 text-left max-w-sm mx-auto">
                <div>POST /api/checkout/create-session</div>
                <div className="text-slate-500">{`{ email: "${customerEmail || 'demo@converxar.com'}", plan: "${planName}", currency: "${gateway === 'stripe' ? 'USD' : selectedCurrency}" }`}</div>
                <div className="text-emerald-400 mt-1">200 OK · Session ID generated</div>
              </div>
            </div>
          )}

          {/* STEP 4: Pasarela de Pago Segura (Stripe o Mercado Pago) */}
          {currentStep === 4 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-teal-400">
                  <CreditCard className="w-5 h-5" />
                  <h3 className="text-lg font-bold text-white font-display">
                    Paso 4: Pasarela de Pago ({gateway === 'stripe' ? 'Stripe Checkout' : 'Mercado Pago Subscriptions'})
                  </h3>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">TLS 1.3 Seguro</span>
              </div>
              <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                El usuario introduce los datos de su tarjeta. Puedes simular el resultado de la transacción a continuación para probar ambas rutas:
              </p>

              {/* Currency Selector for Mercado Pago */}
              {gateway === 'mercadopago' && (
                <div className="mb-4 p-3 rounded-xl bg-sky-950/20 border border-sky-800/40 text-xs">
                  <div className="text-slate-300 font-medium mb-1">Moneda local de cobro en LATAM:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {(Object.keys(localCurrencies) as Array<keyof typeof localCurrencies>).map(curr => (
                      <button
                        key={curr}
                        type="button"
                        onClick={() => setSelectedCurrency(curr)}
                        className={`px-2 py-1 rounded text-[11px] font-medium border cursor-pointer transition-colors ${
                          selectedCurrency === curr
                            ? 'bg-sky-500 text-slate-950 font-bold border-sky-400'
                            : 'bg-slate-900 border-slate-800 text-slate-300'
                        }`}
                      >
                        {curr} ({localCurrencies[curr].symbol} {Math.round(planPriceUSD * localCurrencies[curr].rate).toLocaleString()})
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Error banner if rejected/canceled */}
              {paymentError && (
                <div className="mb-4 p-3.5 rounded-xl bg-rose-950/30 border border-rose-800/60 text-xs text-rose-300 space-y-1">
                  <div className="font-semibold flex items-center gap-1.5 text-rose-200">
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>Pago Rechazado / Cancelado por el Banco</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">{paymentError}</p>
                  <p className="text-[10px] text-slate-400 pt-1">
                    * Tal como indica el diagrama, el usuario ha sido retornado a la Landing con mensaje de error para reintentar.
                  </p>
                </div>
              )}

              {/* Simulated Card Form */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs mb-6">
                <div>
                  <label className="block text-slate-400 text-[11px] mb-1">Número de Tarjeta Simulado</label>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 font-mono text-slate-200 flex items-center justify-between">
                    <span>•••• •••• •••• 4242</span>
                    <span className="text-[10px] text-slate-500 uppercase">{gateway === 'stripe' ? 'Visa / MC' : 'Débito / Pix'}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 text-[11px] mb-1">Vencimiento</label>
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 font-mono text-slate-300">12/28</div>
                  </div>
                  <div>
                    <label className="block text-slate-400 text-[11px] mb-1">CVC / CVV</label>
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 font-mono text-slate-300">•••</div>
                  </div>
                </div>
              </div>

              {/* Dual Action: Test Success vs Test Failure (Branching from Diagram) */}
              <div className="space-y-2">
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={handleSimulateSuccess}
                  className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>Procesar Pago Exitoso (${planPriceUSD} USD)</span>
                      <CheckCircle2 className="w-4 h-4" />
                    </>
                  )}
                </button>

                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={handleSimulateFailure}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-medium text-rose-300 hover:text-rose-200 bg-rose-950/20 hover:bg-rose-950/40 border border-rose-900/40 transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Simular Rechazo / Cancelación de Pago</span>
                  <XCircle className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          )}

          {/* STEP 5: Webhook Asíncrono en Node.js */}
          {currentStep === 5 && (
            <div className="py-8 text-center space-y-4">
              <div className="w-12 h-12 mx-auto rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                <Webhook className="w-6 h-6 animate-pulse" />
              </div>
              <h3 className="text-base font-bold text-white font-display">
                Paso 5: Webhook Asíncrono Recibido en Node.js
              </h3>
              <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                La pasarela envió el evento <code className="text-teal-300">invoice.payment_succeeded</code> o <code className="text-sky-300">preapproval.approved</code>. Node.js verificó la firma HMAC y activó tu suscripción en la base de datos.
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-[11px] text-teal-300 text-left max-w-sm mx-auto">
                <div>EVENT: customer.subscription.created</div>
                <div className="text-slate-400">DB.users.update(email, {`{ status: "active", plan: "${planName}" }`})</div>
                <div className="text-emerald-400 mt-1">✔ Cuenta activada en 42ms</div>
              </div>
            </div>
          )}

          {/* STEP 6: Redirección / Bienvenida (Página de Éxito) */}
          {currentStep === 6 && (
            <div className="text-center space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center">
                <Check className="w-8 h-8" />
              </div>
              <div className="text-xs text-teal-400 font-semibold uppercase tracking-wider font-mono">
                Paso 6: Redirección & Página de Bienvenida
              </div>
              <h3 className="text-2xl font-bold text-white font-display">
                ¡Bienvenido a Converxar!
              </h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                Tu suscripción al <strong>{planName}</strong> (${planPriceUSD} USD/mes) ha sido confirmada. El pago fue procesado a través de {gateway === 'stripe' ? 'Stripe Checkout' : 'Mercado Pago Subscriptions'}.
              </p>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 text-left space-y-1.5 font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-500">Usuario:</span>
                  <span className="text-white">{customerEmail || 'usuario@empresa.com'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Plan:</span>
                  <span className="text-teal-300 font-bold">{planName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Estado:</span>
                  <span className="text-emerald-400">Activo (Renovación Mensual)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Pasarela:</span>
                  <span className="text-white uppercase">{gateway}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleEnterDashboard}
                  className="w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-teal-500/25"
                >
                  <span>Paso 7: Entrar al Dashboard de Converxar con JWT</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 7: Acceso Directo al Dashboard con JWT */}
          {currentStep === 7 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-teal-400">
                <Key className="w-5 h-5" />
                <h3 className="text-lg font-bold text-white font-display">
                  Paso 7: Acceso Directo con JWT al Dashboard
                </h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Node.js expidió tu token de sesión seguro. Tu cliente Vuetify lo almacena para mantenerte conectado en la PWA y activar las salas de chat multilingüe con Mistral AI.
              </p>

              {/* JWT Token View */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[10px] text-teal-300 break-all">
                <span className="text-slate-500 block mb-1">Bearer Token JWT (Sesión Activa):</span>
                {jwtToken || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy_token_converxar'}
              </div>

              {/* Mini Dashboard Active Preview */}
              <div className="p-4 rounded-xl bg-slate-950 border border-teal-500/40 text-xs">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    Converxar App · Sesión Iniciada
                  </span>
                  <span className="text-teal-400 font-mono text-[11px]">{planName} Activo</span>
                </div>
                <div className="space-y-1.5 text-slate-300 text-[11px]">
                  <p>✔ Motor de traducción Mistral AI desbloqueado en tiempo real.</p>
                  <p>✔ Acceso a canales de texto, notas de voz con audio TTS y OCR de archivos.</p>
                  <p>✔ PWA sincronizada en tus dispositivos móviles y de escritorio.</p>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
                <button
                  onClick={() => {
                    const role = planName.toLowerCase().includes('personal') ? 'user' : 'company';
                    if (onEnterDashboard) {
                      onEnterDashboard(role, customerEmail || 'usuario@empresa.com', planName);
                    }
                    handleCloseAndReset();
                  }}
                  className="w-full sm:flex-1 py-3 px-4 rounded-xl text-xs font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-teal-500/25"
                >
                  <span>Abrir Dashboard de Administración ({planName.toLowerCase().includes('personal') ? 'Usuario' : 'Empresa'})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleCloseAndReset}
                  className="w-full sm:w-auto py-3 px-4 rounded-xl text-xs text-slate-400 hover:text-white bg-slate-900 border border-slate-800 transition-colors cursor-pointer"
                >
                  Cerrar
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
