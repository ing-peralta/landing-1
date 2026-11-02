import React, { useState } from 'react';
import { 
  Building2, 
  User, 
  Users, 
  CreditCard, 
  Sparkles, 
  ShieldCheck, 
  Download, 
  Plus, 
  Mail, 
  Globe2, 
  Activity, 
  FileText, 
  Sliders, 
  Check, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Layers,
  Clock,
  Settings,
  Code2
} from 'lucide-react';
import { InvitationFlowModal } from './InvitationFlowModal';

interface AdminDashboardProps {
  initialRole?: 'user' | 'company';
  subscribedEmail?: string;
  subscribedPlan?: string;
  onOpenCheckout?: (planName: string, priceUSD: number) => void;
}

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'Administrador' | 'Miembro' | 'Moderador';
  nativeLang: string;
  flag: string;
  status: 'Activo' | 'Invitación Pendiente';
  messagesCount: number;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  initialRole = 'company',
  subscribedEmail = 'admin@empresa.com',
  subscribedPlan = 'Plan Empresarial ($30/mes)',
  onOpenCheckout,
}) => {
  const [viewMode, setViewMode] = useState<'user' | 'company'>(initialRole);
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d'>('30d');
  const [members, setMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'Carlos Mendoza',
      email: subscribedEmail || 'carlos.mendoza@empresa.com',
      role: 'Administrador',
      nativeLang: 'Español',
      flag: '🇪🇸',
      status: 'Activo',
      messagesCount: 1420,
    },
    {
      id: '2',
      name: 'David King',
      email: 'd.king@empresa.com',
      role: 'Miembro',
      nativeLang: 'Inglés',
      flag: '🇬🇧',
      status: 'Activo',
      messagesCount: 980,
    },
    {
      id: '3',
      name: 'Kenji Tanaka',
      email: 'tanaka.k@empresa.jp',
      role: 'Miembro',
      nativeLang: 'Japonés',
      flag: '🇯🇵',
      status: 'Activo',
      messagesCount: 1150,
    },
    {
      id: '4',
      name: 'Sophie Laurent',
      email: 'sophie.laurent@empresa.fr',
      role: 'Moderador',
      nativeLang: 'Francés',
      flag: '🇫🇷',
      status: 'Activo',
      messagesCount: 640,
    },
  ]);

  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberLang, setNewMemberLang] = useState('es');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showFullInviteFlowModal, setShowFullInviteFlowModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleMemberActivated = (user: { name: string; email: string; role: string }) => {
    const newM: TeamMember = {
      id: String(Date.now()),
      name: user.name,
      email: user.email,
      role: (user.role === 'ADMIN' ? 'Administrador' : user.role === 'MODERATOR' ? 'Moderador' : 'Miembro') as any,
      nativeLang: 'Español',
      flag: '🇪🇸',
      status: 'Activo',
      messagesCount: 1,
    };
    setMembers(prev => [...prev, newM]);
    showToast(`¡Usuario ${user.name} activado en la base de datos y añadido al equipo!`);
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberEmail || !newMemberName) return;

    const flagMap: Record<string, string> = {
      es: '🇪🇸',
      en: '🇬🇧',
      fr: '🇫🇷',
      de: '🇩🇪',
      ja: '🇯🇵',
      pt: '🇧🇷',
    };

    const newM: TeamMember = {
      id: String(Date.now()),
      name: newMemberName,
      email: newMemberEmail,
      role: 'Miembro',
      nativeLang: newMemberLang === 'es' ? 'Español' : newMemberLang === 'en' ? 'Inglés' : 'Portugués',
      flag: flagMap[newMemberLang] || '🌐',
      status: 'Invitación Pendiente',
      messagesCount: 0,
    };

    setMembers([...members, newM]);
    setNewMemberEmail('');
    setNewMemberName('');
    setShowInviteModal(false);
    showToast(`Invitación enviada a ${newMemberEmail} con enlace de acceso a Converxar`);
  };

  return (
    <section id="dashboard" className="py-20 md:py-28 border-b border-slate-900 bg-slate-950/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="text-xs font-semibold text-teal-400 uppercase tracking-wider mb-2">
            Panel de Administración & Control
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-display tracking-tight text-balance">
            Dashboard de Gestión: Usuario Individual o Empresa
          </h2>
          <p className="mt-3 text-slate-300 text-sm leading-relaxed">
            Monitorea el consumo de la API de Mistral, administra los miembros del equipo, revisa las salas de chat multilingüe y gestiona la facturación mensual recurrente de Stripe o Mercado Pago.
          </p>

          {/* Role Switcher: Usuario vs Empresa */}
          <div className="mt-8 inline-flex items-center gap-1 p-1 bg-slate-900 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setViewMode('company')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all cursor-pointer ${
                viewMode === 'company'
                  ? 'bg-teal-400 text-slate-950 font-bold shadow-md shadow-teal-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Vista Empresa / Institución (Plan $30/mes)</span>
            </button>

            <button
              onClick={() => setViewMode('user')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all cursor-pointer ${
                viewMode === 'user'
                  ? 'bg-teal-400 text-slate-950 font-bold shadow-md shadow-teal-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Vista Usuario / Freelancer (Plan $10/mes)</span>
            </button>
          </div>
        </div>

        {/* Toast notification */}
        {toastMessage && (
          <div className="mb-6 max-w-md mx-auto p-3 rounded-xl bg-teal-950 border border-teal-500/50 text-teal-300 text-xs flex items-center justify-between shadow-lg">
            <span>{toastMessage}</span>
            <button onClick={() => setToastMessage(null)} className="text-teal-400 hover:text-white">✕</button>
          </div>
        )}

        {/* Dashboard Canvas Container (Styled as clean Vuetify VCard Enterprise Layout) */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden">
          
          {/* Top Bar of the Dashboard */}
          <div className="px-6 py-4 bg-slate-900 border-b border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold text-sm">
                {viewMode === 'company' ? <Building2 className="w-5 h-5" /> : <User className="w-5 h-5" />}
              </div>
              <div>
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  <span>{viewMode === 'company' ? 'DevBridge Global Inc. · Consola de Empresa' : 'Espacio Personal de Trabajo'}</span>
                  <span className="text-[10px] text-teal-400 bg-teal-950/80 px-2 py-0.5 rounded border border-teal-800 font-mono">
                    {viewMode === 'company' ? 'Plan Empresarial Activo' : 'Plan Personal Activo'}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400">
                  {viewMode === 'company' ? 'ID Organización: org_vx_89412 · 4 / 10 Licencias' : `Cuenta: ${subscribedEmail}`}
                </div>
              </div>
            </div>

            {/* Quick Action buttons */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              {viewMode === 'company' && (
                <>
                  <button
                    onClick={() => setShowFullInviteFlowModal(true)}
                    className="px-3.5 py-1.5 rounded-lg bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm shadow-teal-500/20"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Invitar Miembro por Email</span>
                  </button>

                  <button
                    onClick={() => setShowFullInviteFlowModal(true)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-teal-300 border border-teal-500/30 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    <span>Arquitectura & Código Backend</span>
                  </button>
                </>
              )}
              <button
                onClick={() => showToast('Factura fiscal de Stripe generada y descargada en PDF')}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Descargar Factura</span>
              </button>
            </div>
          </div>

          {/* ===================== VIEW MODE: EMPRESA / INSTITUCIÓN ===================== */}
          {viewMode === 'company' && (
            <div className="p-6 sm:p-8 space-y-8">
              
              {/* Metric KPI Cards (Tabular numerals) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                <div className="p-5 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span>Miembros Activos</span>
                    <Users className="w-4 h-4 text-teal-400" />
                  </div>
                  <div className="text-2xl font-bold text-white font-mono tabular-nums">
                    {members.length} <span className="text-xs text-slate-500 font-normal">/ 10 licencias</span>
                  </div>
                  <div className="text-[11px] text-teal-400 mt-1 flex items-center gap-1">
                    <span>6 disponibles en tu plan</span>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span>Mensajes Multilingües</span>
                    <Globe2 className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div className="text-2xl font-bold text-white font-mono tabular-nums">
                    4,190
                  </div>
                  <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>+24% este mes</span>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span>Minutos de Audio Traducidos</span>
                    <Activity className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-2xl font-bold text-white font-mono tabular-nums">
                    384 <span className="text-xs text-slate-500 font-normal">min</span>
                  </div>
                  <div className="text-[11px] text-teal-400 mt-1">
                    <span>Mistral Audio TTS ilimitado</span>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span>Estado de Facturación</span>
                    <CreditCard className="w-4 h-4 text-sky-400" />
                  </div>
                  <div className="text-2xl font-bold text-teal-300 font-mono">
                    $30 <span className="text-xs text-slate-400">USD/mes</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Próxima renovación: 2 de Diciembre
                  </div>
                </div>

              </div>

              {/* 2-Column: Team Members Management vs Subscription Details */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Team Members List (Vuetify VList / VTable style) */}
                <div className="lg:col-span-8 rounded-xl bg-slate-950 border border-slate-800 p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-sm font-bold text-white font-display">
                        Miembros del Equipo & Idioma de Recepción
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        Cada usuario recibe todos los chats en su idioma nativo automáticamente
                      </p>
                    </div>
                    <span className="text-xs text-slate-400 font-mono">
                      {members.length} usuarios registrados
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-400">
                          <th className="pb-2.5 font-semibold">Usuario</th>
                          <th className="pb-2.5 font-semibold">Rol</th>
                          <th className="pb-2.5 font-semibold">Idioma Nativo</th>
                          <th className="pb-2.5 font-semibold">Mensajes</th>
                          <th className="pb-2.5 font-semibold text-right">Estado</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 text-slate-200">
                        {members.map(m => (
                          <tr key={m.id} className="hover:bg-slate-900/60 transition-colors">
                            <td className="py-3 font-medium text-white">
                              <div>{m.name}</div>
                              <div className="text-[11px] text-slate-400 font-mono">{m.email}</div>
                            </td>
                            <td className="py-3 text-slate-300">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                                m.role === 'Administrador'
                                  ? 'bg-teal-950 text-teal-300 border border-teal-800'
                                  : 'bg-slate-800 text-slate-300'
                              }`}>
                                {m.role}
                              </span>
                            </td>
                            <td className="py-3">
                              <span className="inline-flex items-center gap-1.5 font-medium">
                                <span>{m.flag}</span>
                                <span>{m.nativeLang}</span>
                              </span>
                            </td>
                            <td className="py-3 font-mono tabular-nums text-slate-400">
                              {m.messagesCount.toLocaleString()}
                            </td>
                            <td className="py-3 text-right">
                              <span className={`inline-flex items-center gap-1 text-[11px] font-medium ${
                                m.status === 'Activo' ? 'text-emerald-400' : 'text-amber-400'
                              }`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${m.status === 'Activo' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                                {m.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                </div>

                {/* Subscription & Gateway Overview */}
                <div className="lg:col-span-4 space-y-4">
                  
                  {/* Subscription Card */}
                  <div className="rounded-xl bg-slate-950 border border-slate-800 p-5">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                      <div className="text-xs font-bold text-white font-display">
                        Gestión de Facturación
                      </div>
                      <span className="text-[10px] text-teal-400 font-mono">Stripe Checkout</span>
                    </div>

                    <div className="space-y-3 text-xs text-slate-300">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Plan actual:</span>
                        <span className="font-semibold text-white">Empresarial ($30/mes)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">ID Suscripción:</span>
                        <span className="font-mono text-[11px] text-slate-300">sub_1P8x9qMistral</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Método de pago:</span>
                        <span className="font-mono text-slate-200">Visa terminada en •••• 4242</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Reintentos automáticos:</span>
                        <span className="text-teal-400">Smart Retries Activo</span>
                      </div>
                    </div>

                    <div className="mt-5 pt-4 border-t border-slate-800 space-y-2">
                      <button
                        onClick={() => showToast('Abriendo portal de autoservicio de cliente en Stripe...')}
                        className="w-full py-2 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Abrir Stripe Customer Portal</span>
                      </button>

                      <button
                        onClick={() => showToast('Configuración cambiada a Mercado Pago para cobros locales en ARS/MXN')}
                        className="w-full py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-sky-400 border border-slate-800 text-xs font-medium transition-colors cursor-pointer"
                      >
                        Cambiar a Mercado Pago (LATAM)
                      </button>
                    </div>
                  </div>

                  {/* Company Channels & Rooms */}
                  <div className="rounded-xl bg-slate-950 border border-slate-800 p-5 text-xs">
                    <div className="text-xs font-bold text-white font-display mb-3">
                      Canales de Empresa Activos
                    </div>
                    <div className="space-y-2 text-slate-300">
                      <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                        <span className="font-mono text-teal-300">#expansion-global</span>
                        <span className="text-[10px] text-slate-400">ES · EN · JA</span>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                        <span className="font-mono text-teal-300">#soporte-latam-emea</span>
                        <span className="text-[10px] text-slate-400">ES · FR · PT</span>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                        <span className="font-mono text-teal-300">#ventas-q4-contratos</span>
                        <span className="text-[10px] text-slate-400">DE · EN · ES</span>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* ===================== VIEW MODE: USUARIO INDIVIDUAL ===================== */}
          {viewMode === 'user' && (
            <div className="p-6 sm:p-8 space-y-8">
              
              {/* User KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                <div className="p-5 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span>Minutos de Audio Usados</span>
                    <Clock className="w-4 h-4 text-teal-400" />
                  </div>
                  <div className="text-2xl font-bold text-white font-mono tabular-nums">
                    48 <span className="text-xs text-slate-500 font-normal">/ 120 min</span>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden">
                    <div className="w-[40%] h-full bg-teal-400" />
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1.5">
                    72 minutos restantes en tu ciclo
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span>Imágenes OCR Traducidas</span>
                    <FileText className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div className="text-2xl font-bold text-white font-mono tabular-nums">
                    18 <span className="text-xs text-slate-500 font-normal">procesadas</span>
                  </div>
                  <div className="text-[11px] text-teal-400 mt-1">
                    Carteles, menús y recibos analizados
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span>Plan Personal Activo</span>
                    <CreditCard className="w-4 h-4 text-sky-400" />
                  </div>
                  <div className="text-2xl font-bold text-teal-300 font-mono">
                    $10 <span className="text-xs text-slate-400">USD/mes</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Suscripción individual sin ataduras
                  </div>
                </div>

              </div>

              {/* 2-Column: Personal Preferences vs Chat History */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Personal Preferences */}
                <div className="rounded-xl bg-slate-950 border border-slate-800 p-5 space-y-4 text-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <h4 className="font-bold text-white font-display text-sm">
                      Preferencias Personales de Traducción
                    </h4>
                    <Sliders className="w-4 h-4 text-teal-400" />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      Mi Idioma Principal de Recepción
                    </label>
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-white font-medium flex items-center justify-between">
                      <span>🇪🇸 Español (Castellano)</span>
                      <Check className="w-4 h-4 text-teal-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      Registro de Mistral AI
                    </label>
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 flex items-center justify-between">
                      <span>Conversacional Natural & Amigable</span>
                      <span className="text-[10px] text-teal-400 font-mono">Mistral v3.0</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-white">Auto-escuchar voz traducida</div>
                      <div className="text-[11px] text-slate-400">Reproduce notas de voz traducidas automáticamente</div>
                    </div>
                    <div className="w-10 h-5 rounded-full bg-teal-500 p-0.5 flex items-center justify-end cursor-pointer">
                      <div className="w-4 h-4 rounded-full bg-slate-950" />
                    </div>
                  </div>
                </div>

                {/* Personal Recent Activity */}
                <div className="rounded-xl bg-slate-950 border border-slate-800 p-5 space-y-3 text-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <h4 className="font-bold text-white font-display text-sm">
                      Actividad Reciente Multilingüe
                    </h4>
                    <span className="text-[11px] text-slate-500">Últimas 48 horas</span>
                  </div>

                  <div className="space-y-2">
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-white">Chat con Sophie Laurent (París)</div>
                        <div className="text-[11px] text-slate-400">Francés ➔ Traducido al Español</div>
                      </div>
                      <span className="text-[10px] text-teal-400 font-mono">14 msgs</span>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-white">Nota de voz con David King</div>
                        <div className="text-[11px] text-slate-400">Inglés ➔ Síntesis TTS en Español</div>
                      </div>
                      <span className="text-[10px] text-teal-400 font-mono">0:24 min</span>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-white">OCR: Menú en Tokio</div>
                        <div className="text-[11px] text-slate-400">Japonés Kanji ➔ Traducido al Español</div>
                      </div>
                      <span className="text-[10px] text-teal-400 font-mono">Completado</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>

      </div>

      {/* Invite Member Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
            <h3 className="text-base font-bold text-white font-display mb-1">
              Invitar Miembro a tu Organización
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              El nuevo usuario recibirá un correo con el enlace para unirse a los canales corporativos de Converxar.
            </p>

            <form onSubmit={handleAddMember} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Nombre completo</label>
                <input
                  type="text"
                  required
                  value={newMemberName}
                  onChange={e => setNewMemberName(e.target.value)}
                  placeholder="Ej. Lucas Silva"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-teal-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Correo electrónico</label>
                <input
                  type="email"
                  required
                  value={newMemberEmail}
                  onChange={e => setNewMemberEmail(e.target.value)}
                  placeholder="lucas@empresa.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-teal-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Idioma preferido del miembro</label>
                <select
                  value={newMemberLang}
                  onChange={e => setNewMemberLang(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-teal-400"
                >
                  <option value="es">🇪🇸 Español</option>
                  <option value="en">🇬🇧 Inglés</option>
                  <option value="pt">🇧🇷 Portugués</option>
                  <option value="fr">🇫🇷 Francés</option>
                  <option value="de">🇩🇪 Alemán</option>
                  <option value="ja">🇯🇵 Japonés</option>
                </select>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-teal-400 text-slate-950 font-semibold hover:bg-teal-300"
                >
                  Enviar Invitación
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Full-Stack User Invitation Architecture & Interactive Simulator Modal */}
      <InvitationFlowModal
        isOpen={showFullInviteFlowModal}
        onClose={() => setShowFullInviteFlowModal(false)}
        onMemberActivated={handleMemberActivated}
      />

    </section>
  );
};
