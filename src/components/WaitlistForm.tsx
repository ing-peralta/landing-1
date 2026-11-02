import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  CheckCircle, 
  Sparkles, 
  Share2, 
  Copy, 
  Check, 
  Lock, 
  Gift, 
  Users, 
  Clock 
} from 'lucide-react';
import { LANGUAGES } from '../data/mockData';

interface RegistrationData {
  name: string;
  email: string;
  useCase: string;
  nativeLanguage: string;
  teamSize?: string;
  ticketNumber: number;
  registeredAt: string;
}

export const WaitlistForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [useCase, setUseCase] = useState('remote-teams');
  const [nativeLanguage, setNativeLanguage] = useState('es');
  const [teamSize, setTeamSize] = useState('1-10');
  const [type, setType] = useState<'waitlist' | 'trial'>('waitlist');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registration, setRegistration] = useState<RegistrationData | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Load existing registration from localStorage if available
  useEffect(() => {
    try {
      const stored = localStorage.getItem('converxar_waitlist_registration');
      if (stored) {
        setRegistration(JSON.parse(stored));
      }
    } catch {
      // Ignore localStorage error
    }
  }, []);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Por favor escribe tu nombre';
    if (!email.trim()) {
      errs.email = 'El correo electrónico es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Introduce una dirección de email válida';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const ticketNum = Math.floor(Math.random() * 300) + 420;
      const data: RegistrationData = {
        name,
        email,
        useCase,
        nativeLanguage,
        teamSize,
        ticketNumber: ticketNum,
        registeredAt: new Date().toLocaleDateString('es-ES', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
      };

      try {
        localStorage.setItem('converxar_waitlist_registration', JSON.stringify(data));
      } catch {
        // fallback
      }

      setRegistration(data);
      setIsSubmitting(false);
    }, 600);
  };

  const handleCopyInvite = () => {
    if (!registration) return;
    const url = `https://converxar.com/invite?ref=VX-${registration.ticketNumber}`;
    navigator.clipboard?.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleResetRegistration = () => {
    try {
      localStorage.removeItem('converxar_waitlist_registration');
    } catch {
      // ignore
    }
    setRegistration(null);
    setName('');
    setEmail('');
  };

  return (
    <section id="waitlist" className="py-20 md:py-32 border-b border-slate-900 bg-slate-950 relative overflow-hidden">
      {/* Decorative ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-teal-500/10 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-semibold text-teal-400 uppercase tracking-wider mb-2">
            Únete Antes del Lanzamiento Oficial
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight text-balance">
            Consigue Acceso Anticipado a Converxar.com
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            Estamos habilitando invitaciones progresivas para empresas y profesionales. Los usuarios de la lista obtendrán <strong>6 meses de plan Pro gratuito</strong> con minutos de voz y OCR ilimitados.
          </p>

          {/* Toggle Type: Waitlist vs Free Trial */}
          <div className="mt-6 inline-flex p-1 bg-slate-900 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setType('waitlist')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                type === 'waitlist'
                  ? 'bg-teal-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Lista de Espera VIP (Plazas Limitadas)
            </button>
            <button
              onClick={() => setType('trial')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                type === 'trial'
                  ? 'bg-teal-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Prueba Gratuita para Equipos (+5 personas)
            </button>
          </div>
        </div>

        {/* Form or Confirmed Ticket View */}
        {registration ? (
          /* Confirmation Ticket Card */
          <div className="rounded-2xl border border-teal-500/40 bg-slate-900 p-6 sm:p-10 shadow-2xl shadow-teal-950/40">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-400 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs text-teal-400 font-semibold uppercase tracking-wider">
                    ¡Registro Confirmado con Éxito!
                  </div>
                  <h3 className="text-xl font-bold text-white font-display">
                    Bienvenido a Converxar, {registration.name}
                  </h3>
                </div>
              </div>

              {/* Priority Ticket Badge */}
              <div className="text-right">
                <div className="text-[11px] text-slate-400 uppercase tracking-wider">Tu Posición VIP</div>
                <div className="text-2xl font-extrabold text-teal-400 font-mono tabular-nums">
                  #{registration.ticketNumber}
                </div>
              </div>
            </div>

            {/* Perks included */}
            <div className="py-6 border-b border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <div className="font-semibold text-white mb-1 flex items-center gap-1.5">
                  <Gift className="w-4 h-4 text-teal-400" />
                  6 Meses Pro Gratis
                </div>
                <p className="text-slate-400">Sin tarjeta de crédito requerida y sin límite de salas.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <div className="font-semibold text-white mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  Mistral AI Ilimitado
                </div>
                <p className="text-slate-400">Traducción de voz, texto y documentos OCR prioritario.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <div className="font-semibold text-white mb-1 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-400" />
                  Lote de Invitación
                </div>
                <p className="text-slate-400">Te enviaremos el enlace de activación directa a <strong>{registration.email}</strong>.</p>
              </div>
            </div>

            {/* Shareable Invite Link */}
            <div className="pt-6">
              <div className="text-xs text-slate-300 font-medium mb-2">
                Sube posiciones en la lista compartiendo tu enlace de referido personal:
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={`https://converxar.com/invite?ref=VX-${registration.ticketNumber}`}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-teal-300 font-mono focus:outline-none"
                />
                <button
                  onClick={handleCopyInvite}
                  className="px-4 py-2.5 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedLink ? 'Copiado' : 'Copiar'}</span>
                </button>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                <span>Fecha de registro: {registration.registeredAt}</span>
                <button
                  onClick={handleResetRegistration}
                  className="text-slate-400 hover:text-white underline cursor-pointer"
                >
                  Registrar otra cuenta
                </button>
              </div>
            </div>

          </div>
        ) : (
          /* Registration Form */
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 sm:p-10 shadow-2xl"
          >
            <div className="space-y-6">
              
              {/* Row 1: Name and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">
                    Nombre completo <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Ej. Roberto Gómez"
                    className={`w-full bg-slate-950 border rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
                      errors.name ? 'border-rose-500' : 'border-slate-800 focus:border-teal-400'
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-xs text-rose-400">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">
                    Correo electrónico <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="tu@empresa.com o personal"
                    className={`w-full bg-slate-950 border rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
                      errors.email ? 'border-rose-500' : 'border-slate-800 focus:border-teal-400'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-rose-400">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Row 2: Caso de Uso y Idioma Nativo */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">
                    ¿Cuál es tu principal caso de uso?
                  </label>
                  <select
                    value={useCase}
                    onChange={e => setUseCase(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-teal-400 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none cursor-pointer"
                  >
                    <option value="remote-teams">💼 Equipos de Trabajo Remoto / Software</option>
                    <option value="sales-b2b">📈 Ventas y Negociación Internacional</option>
                    <option value="customer-support">🎧 Soporte y Atención al Cliente Global</option>
                    <option value="travel-personal">✈️ Viajes, Idiomas y Uso Personal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">
                    Tu idioma nativo / principal
                  </label>
                  <select
                    value={nativeLanguage}
                    onChange={e => setNativeLanguage(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-teal-400 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none cursor-pointer"
                  >
                    {LANGUAGES.map(lang => (
                      <option key={lang.code} value={lang.code}>
                        {lang.flag} {lang.name} ({lang.native})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Optional Team Size if Trial chosen */}
              {type === 'trial' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">
                    Tamaño estimado de tu equipo u organización
                  </label>
                  <select
                    value={teamSize}
                    onChange={e => setTeamSize(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-teal-400 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none cursor-pointer"
                  >
                    <option value="1-5">1 - 5 personas</option>
                    <option value="6-20">6 - 20 personas</option>
                    <option value="21-100">21 - 100 personas</option>
                    <option value="100+">Más de 100 personas (Enterprise)</option>
                  </select>
                </div>
              )}

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 active:scale-98 rounded-xl shadow-lg shadow-teal-500/20 transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Registrando tu acceso en Converxar...</span>
                  ) : (
                    <>
                      <span>{type === 'waitlist' ? 'Asegurar Mi Plaza en Lista de Espera' : 'Solicitar Prueba Gratuita Inmediata'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] text-slate-500 text-center">
                <span className="flex items-center gap-1">
                  <Lock className="w-3 h-3 text-teal-400" />
                  Sin spam ni tarjetas de crédito
                </span>
                <span>·</span>
                <span>Invitaciones semanales por orden de llegada</span>
                <span>·</span>
                <span>Cancelable en cualquier momento</span>
              </div>

            </div>
          </form>
        )}

      </div>
    </section>
  );
};
