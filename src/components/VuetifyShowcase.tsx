import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  Mic, 
  Send, 
  Paperclip, 
  Image as ImageIcon, 
  Globe, 
  Check, 
  CheckCheck, 
  Sliders, 
  Monitor, 
  Smartphone,
  ChevronRight,
  Eye,
  FileCheck
} from 'lucide-react';
import { VUETIFY_HIGHLIGHTS } from '../data/mockData';

export const VuetifyShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'desktop' | 'mobile' | 'settings'>('desktop');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(35);
  const [selectedLanguage, setSelectedLanguage] = useState<'es' | 'en' | 'ja'>('es');
  const [showOriginalOcr, setShowOriginalOcr] = useState(false);

  // Audio simulation toggle
  const togglePlayAudio = () => {
    setIsPlayingAudio(!isPlayingAudio);
    if (!isPlayingAudio) {
      setAudioProgress(prev => (prev >= 90 ? 10 : prev + 15));
    }
  };

  return (
    <section id="interfaz-vuetify" className="py-20 md:py-28 border-b border-slate-900 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="text-xs font-semibold text-teal-400 uppercase tracking-wider mb-3">
            Experiencia de Usuario en Vue.js 3 & Vuetify
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-display tracking-tight text-balance">
            Interfaz limpia inspirada en Material Design 3 con Vuetify
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            Explora las capturas reales de <strong>Converxar.com</strong> y navega por el simulador de componentes interactivos construidos con el ecosistema de Vuetify.js.
          </p>

          {/* Interactive view mode tabs */}
          <div className="inline-flex items-center gap-1 p-1 bg-slate-900 rounded-xl border border-slate-800 mt-8">
            <button
              onClick={() => setActiveTab('desktop')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'desktop'
                  ? 'bg-teal-500 text-slate-950 shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Chat Multimodal Desktop</span>
            </button>
            <button
              onClick={() => setActiveTab('mobile')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'mobile'
                  ? 'bg-teal-500 text-slate-950 shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>PWA Móvil Touch</span>
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-teal-500 text-slate-950 shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Ajustes & Motor Mistral</span>
            </button>
          </div>
        </div>

        {/* Dynamic Interactive Vuetify UI Preview Area */}
        <div className="mb-16">
          {activeTab === 'desktop' && (
            <div className="rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden">
              
              {/* Vuetify VAppBar Header */}
              <div className="px-5 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold text-xs">
                    VX
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white flex items-center gap-2">
                      <span>#proyecto-expansion-global</span>
                      <span className="text-[11px] text-teal-400 bg-teal-950/60 px-2 py-0.5 rounded border border-teal-800/40">
                        Mistral AI Auto-Translate ON
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      5 miembros conectados · Madrid, Londres, Tokio, París
                    </div>
                  </div>
                </div>

                {/* Vuetify Language Switcher Chip */}
                <div className="flex items-center gap-3">
                  <div className="text-xs text-slate-400 hidden sm:block">Mi idioma de lectura:</div>
                  <div className="flex items-center gap-1 bg-slate-800/90 border border-slate-700/80 rounded-lg p-1 text-xs">
                    <button
                      onClick={() => setSelectedLanguage('es')}
                      className={`px-2.5 py-1 rounded font-medium cursor-pointer transition-colors ${
                        selectedLanguage === 'es' ? 'bg-teal-500 text-slate-950 font-semibold' : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      🇪🇸 Español
                    </button>
                    <button
                      onClick={() => setSelectedLanguage('en')}
                      className={`px-2.5 py-1 rounded font-medium cursor-pointer transition-colors ${
                        selectedLanguage === 'en' ? 'bg-teal-500 text-slate-950 font-semibold' : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      🇬🇧 English
                    </button>
                    <button
                      onClick={() => setSelectedLanguage('ja')}
                      className={`px-2.5 py-1 rounded font-medium cursor-pointer transition-colors ${
                        selectedLanguage === 'ja' ? 'bg-teal-500 text-slate-950 font-semibold' : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      🇯🇵 日本語
                    </button>
                  </div>
                </div>
              </div>

              {/* Main Workspace: VNavigationDrawer + VChat Window */}
              <div className="grid grid-cols-1 md:grid-cols-12 min-h-[500px]">
                
                {/* Left Drawer (VNavigationDrawer) */}
                <div className="hidden md:block md:col-span-4 lg:col-span-3 border-r border-slate-800 bg-slate-950/50 p-4">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    Canales de Equipo
                  </div>
                  <div className="space-y-1 mb-6 text-xs">
                    <div className="px-3 py-2 rounded-lg bg-teal-500/10 text-teal-300 font-medium flex items-center justify-between border border-teal-500/20">
                      <span># expansion-global</span>
                      <span className="w-2 h-2 rounded-full bg-teal-400" />
                    </div>
                    <div className="px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-900 transition-colors flex items-center justify-between cursor-pointer">
                      <span># soporte-latam-emea</span>
                      <span className="text-[10px] text-slate-500">3 nuev.</span>
                    </div>
                    <div className="px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-900 transition-colors flex items-center justify-between cursor-pointer">
                      <span># negociaciones-q4</span>
                    </div>
                  </div>

                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    Participantes Activos
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-[10px]">
                          E
                        </div>
                        <span className="text-slate-200">Elena M.</span>
                      </div>
                      <span className="text-[10px] text-teal-400 font-mono">🇪🇸 ES</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-[10px]">
                          D
                        </div>
                        <span className="text-slate-200">David K.</span>
                      </div>
                      <span className="text-[10px] text-teal-400 font-mono">🇬🇧 EN</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center font-bold text-[10px]">
                          K
                        </div>
                        <span className="text-slate-200">Kenji T.</span>
                      </div>
                      <span className="text-[10px] text-teal-400 font-mono">🇯🇵 JA</span>
                    </div>
                  </div>
                </div>

                {/* Chat Feed (VChat Area) */}
                <div className="md:col-span-8 lg:col-span-9 flex flex-col justify-between bg-slate-900/40 p-4 sm:p-6">
                  
                  {/* Messages Feed */}
                  <div className="space-y-4 mb-4">
                    
                    {/* Message 1: Incoming from Kenji (Original Japanese) */}
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                        KT
                      </div>
                      <div className="max-w-xl">
                        <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                          <span className="font-semibold text-slate-200">Kenji Tanaka</span>
                          <span>·</span>
                          <span className="text-rose-400">Envió en Japonés (🇯🇵)</span>
                          <span>·</span>
                          <span className="text-[11px]">10:24 AM</span>
                        </div>

                        {/* Translation container (Vuetify VCard style) */}
                        <div className="p-3.5 rounded-2xl rounded-tl-sm bg-slate-800/90 border border-slate-700/80 text-sm text-slate-100 shadow-sm">
                          {selectedLanguage === 'es' && (
                            <p>
                              Buenos días a todos. Acabamos de validar la especificación de la API. ¿Podemos revisar la arquitectura de despliegue antes de las 16:00?
                            </p>
                          )}
                          {selectedLanguage === 'en' && (
                            <p>
                              Good morning everyone. We just validated the API specification. Can we review the deployment architecture before 4:00 PM?
                            </p>
                          )}
                          {selectedLanguage === 'ja' && (
                            <p>
                              皆さん、おはようございます。API仕様書の検証が完了しました。16時までにデプロイ設計を確認できますでしょうか？
                            </p>
                          )}

                          <div className="mt-2 pt-2 border-t border-slate-700/60 flex items-center justify-between text-[11px] text-slate-400">
                            <span className="text-teal-400 flex items-center gap-1">
                              <CheckCheck className="w-3.5 h-3.5 text-teal-400" />
                              Traducido en 62ms vía Mistral AI
                            </span>
                            <span className="text-slate-500 font-mono">Original: 日本語</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Message 2: Voice Note with Waveform (Audio Player in Vuetify Card) */}
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                        DK
                      </div>
                      <div className="max-w-xl">
                        <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                          <span className="font-semibold text-slate-200">David King</span>
                          <span>·</span>
                          <span className="text-amber-400">Nota de Voz en Inglés (🇬🇧)</span>
                          <span>·</span>
                          <span className="text-[11px]">10:26 AM</span>
                        </div>

                        <div className="p-4 rounded-2xl rounded-tl-sm bg-slate-800/90 border border-slate-700/80 shadow-sm">
                          {/* Audio Player Controls */}
                          <div className="flex items-center gap-3 mb-2.5">
                            <button
                              onClick={togglePlayAudio}
                              className="w-9 h-9 rounded-full bg-teal-400 hover:bg-teal-300 text-slate-950 flex items-center justify-center transition-transform active:scale-90 cursor-pointer shadow-md"
                              aria-label={isPlayingAudio ? 'Pausar audio' : 'Reproducir audio traducido'}
                            >
                              {isPlayingAudio ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                            </button>

                            {/* Soundwave Simulation */}
                            <div className="flex-1 flex items-center gap-1 h-8 px-2 bg-slate-900/80 rounded-lg">
                              {[12, 24, 18, 30, 16, 28, 22, 14, 26, 32, 20, 15, 27, 19, 29, 14, 21, 28, 16].map((h, i) => (
                                <div
                                  key={i}
                                  className={`flex-1 rounded-full transition-all duration-300 ${
                                    i * 5 <= audioProgress ? 'bg-teal-400' : 'bg-slate-700'
                                  } ${isPlayingAudio && i % 3 === 0 ? 'animate-wave-1' : ''}`}
                                  style={{ height: `${h}px` }}
                                />
                              ))}
                            </div>

                            <div className="text-xs font-mono text-slate-300 whitespace-nowrap">
                              0:14
                            </div>
                          </div>

                          {/* Dynamic audio translation transcript */}
                          <div className="text-xs text-slate-200 bg-slate-900/60 p-2.5 rounded-lg border border-slate-700/50">
                            <div className="text-[10px] text-teal-400 font-semibold mb-1 uppercase tracking-wider flex items-center justify-between">
                              <span>Transcripción & Traducción en Tiempo Real</span>
                              <span className="text-slate-400 font-mono">Voz Sintética Lista</span>
                            </div>
                            <p className="italic">
                              {selectedLanguage === 'es' && '"¡De acuerdo Kenji! Ya revisé el esquema y funciona excelente. Agendemos la videollamada a las 15:30."'}
                              {selectedLanguage === 'en' && '"Sounds great Kenji! I just reviewed the schema and it works like a charm. Let\'s schedule the call for 3:30 PM."'}
                              {selectedLanguage === 'ja' && '"分かりましたケンジさん！スキーマを確認しましたが問題なく動作しています。15時30分にコールを設定しましょう。"'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Message 3: OCR Translated Image snippet */}
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                        EM
                      </div>
                      <div className="max-w-xl">
                        <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                          <span className="font-semibold text-slate-200">Elena Morales</span>
                          <span>·</span>
                          <span className="text-teal-400">Captura OCR adjuntada</span>
                          <span>·</span>
                          <span className="text-[11px]">10:28 AM</span>
                        </div>

                        <div className="p-3.5 rounded-2xl rounded-tl-sm bg-slate-800/90 border border-slate-700/80">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2 text-xs text-slate-200 font-medium">
                              <ImageIcon className="w-4 h-4 text-teal-400" />
                              <span>diagrama_flujo_aduanas.png</span>
                            </div>
                            <button
                              onClick={() => setShowOriginalOcr(!showOriginalOcr)}
                              className="text-[11px] text-teal-300 hover:text-teal-200 flex items-center gap-1 cursor-pointer bg-slate-900 px-2 py-1 rounded border border-slate-700"
                            >
                              <Eye className="w-3 h-3" />
                              <span>{showOriginalOcr ? 'Ver Traducción' : 'Ver Original en Alemán'}</span>
                            </button>
                          </div>

                          <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-xs">
                            {showOriginalOcr ? (
                              <div className="text-amber-300/90 font-mono">
                                [Texto Original OCR - Alemán]: &quot;Zollfreigabe erteilt. Alle Unterlagen für den Transport nach Spanien sind vollständig genehmigt.&quot;
                              </div>
                            ) : (
                              <div className="text-teal-300 font-sans">
                                [Texto Traducido al {selectedLanguage === 'es' ? 'Español' : selectedLanguage === 'en' ? 'Inglés' : 'Japonés'}]:
                                <p className="mt-1 text-slate-200 font-medium">
                                  {selectedLanguage === 'es' && '«Despacho aduanero concedido. Todos los documentos para el transporte a España están completamente aprobados.»'}
                                  {selectedLanguage === 'en' && '«Customs clearance granted. All documentation for transport to Spain has been fully approved.»'}
                                  {selectedLanguage === 'ja' && '«通関手続きが承認されました。スペイン向け輸送に関するすべての書類が完全に承認されています。»'}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Vuetify VTextField Message Input */}
                  <div className="pt-3 border-t border-slate-800 flex items-center gap-2">
                    <button 
                      className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                      title="Adjuntar Archivo o Imagen OCR"
                      aria-label="Adjuntar archivo o imagen"
                    >
                      <Paperclip className="w-4 h-4" />
                    </button>
                    <button 
                      className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                      title="Grabar Nota de Voz con Mistral Transcriber"
                      aria-label="Grabar nota de voz"
                    >
                      <Mic className="w-4 h-4 text-teal-400" />
                    </button>
                    
                    <input
                      type="text"
                      readOnly
                      value="Escribe en tu propio idioma... Converxar lo traducirá a cada destinatario"
                      className="flex-1 bg-slate-950/90 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs text-slate-400 focus:outline-none"
                    />

                    <button 
                      className="p-2.5 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 transition-colors cursor-pointer font-semibold"
                      title="Enviar Mensaje"
                      aria-label="Enviar mensaje"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>

                </div>

              </div>
            </div>
          )}

          {activeTab === 'mobile' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Smartphone Framed Preview */}
              <div className="lg:col-span-6 flex justify-center">
                <div className="relative w-full max-w-[340px] rounded-[42px] border-4 border-slate-700 bg-slate-950 p-3 shadow-2xl shadow-teal-950/30">
                  {/* Phone Notch / Speaker */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-800 rounded-full z-10" />

                  {/* Screen Content */}
                  <div className="rounded-[32px] overflow-hidden bg-slate-900 border border-slate-800 flex flex-col h-[580px]">
                    
                    {/* Mobile App Bar */}
                    <div className="pt-8 px-4 pb-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                      <div className="text-sm font-bold text-white">Converxar PWA</div>
                      <div className="text-[10px] text-teal-400 bg-teal-950 px-2 py-0.5 rounded-full border border-teal-800">
                        🇪🇸 Idioma: ES
                      </div>
                    </div>

                    {/* Chat Feed */}
                    <div className="flex-1 p-3 overflow-y-auto space-y-3 text-xs">
                      <div className="bg-slate-800/90 p-3 rounded-2xl rounded-tl-sm border border-slate-700/80">
                        <div className="text-[10px] text-slate-400 mb-1 font-medium">Maria (FR 🇫🇷):</div>
                        <p className="text-slate-100">
                          &quot;Bonjour! Le rapport trimestriel est prêt pour validation.&quot;
                        </p>
                        <div className="mt-1.5 text-[10px] text-teal-300 bg-teal-950/40 p-1.5 rounded">
                          Traducción: &quot;¡Hola! El informe trimestral está listo para validación.&quot;
                        </div>
                      </div>

                      {/* Mobile Audio Note */}
                      <div className="bg-slate-800/90 p-3 rounded-2xl rounded-tl-sm border border-slate-700/80">
                        <div className="flex items-center justify-between mb-1 text-[10px] text-slate-400">
                          <span>David (EN 🇬🇧) · Nota de voz</span>
                          <span className="text-teal-400 font-mono">0:09</span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="w-7 h-7 rounded-full bg-teal-400 text-slate-950 flex items-center justify-center font-bold text-[11px]">
                            ▶
                          </span>
                          <div className="flex-1 h-3 bg-slate-700 rounded-full overflow-hidden">
                            <div className="w-1/2 h-full bg-teal-400" />
                          </div>
                        </div>
                        <p className="text-[11px] text-slate-200">
                          Traducido al Español: &quot;Aprobado por el director de finanzas.&quot;
                        </p>
                      </div>
                    </div>

                    {/* Bottom Navigation */}
                    <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center justify-around text-slate-400 text-[10px]">
                      <div className="text-teal-400 font-medium">Chats</div>
                      <div>Canales</div>
                      <div>Contactos</div>
                      <div>Ajustes</div>
                    </div>

                  </div>
                </div>
              </div>

              {/* Explanatory points on PWA & Mobile Vuetify Experience */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <div className="text-xs text-teal-400 font-semibold uppercase tracking-wider mb-2">
                    Arquitectura PWA Móvil
                  </div>
                  <h3 className="text-2xl font-bold text-white font-display mb-3">
                    Fluidez nativa sin tiendas de aplicaciones
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Converxar está desarrollada con Vuetify sobre Vue 3 para comportarse exactamente como una aplicación nativa de iOS o Android. Funciona con gestos táctiles ergonómicos, transiciones de 60fps y almacenamiento en caché para operar con baja conectividad.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
                    <Check className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-semibold text-white">Instalable con 1 toque</div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        Añade Converxar a tu pantalla de inicio en segundos desde Safari o Chrome. Sin ocupar cientos de megas.
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
                    <Check className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-semibold text-white">Notificaciones Push en tiempo real</div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        Recibe alertas instantáneas en tu idioma sin importar desde qué huso horario o país te escriban.
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
                    <Check className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-semibold text-white">Micro-grabadora de voz táctil</div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        Grabación continua con cancelación de ruido y previsualización de ondas sonoras directamente en el navegador.
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}

          {activeTab === 'settings' && (
            <div className="max-w-3xl mx-auto rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-white font-display">
                    Panel de Configuración de Idioma & Motor Mistral AI
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Componente Vuetify VCard para personalizar tu experiencia de traducción
                  </p>
                </div>
                <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center">
                  <Sliders className="w-4 h-4" />
                </div>
              </div>

              <div className="space-y-6">
                {/* Setting 1: Preferred Language */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Tu idioma nativo de recepción
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { code: 'es', label: 'Español 🇪🇸' },
                      { code: 'en', label: 'English 🇺🇸' },
                      { code: 'fr', label: 'Français 🇫🇷' },
                      { code: 'de', label: 'Deutsch 🇩🇪' },
                    ].map(lang => (
                      <div
                        key={lang.code}
                        className="p-3 rounded-xl bg-slate-950/80 border border-teal-500/30 text-xs font-medium text-white flex items-center justify-between"
                      >
                        <span>{lang.label}</span>
                        {lang.code === 'es' && <Check className="w-3.5 h-3.5 text-teal-400" />}
                      </div>
                    ))}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-2">
                    Todos los mensajes de texto, audios e imágenes recibidos se adaptarán automáticamente a esta lengua.
                  </p>
                </div>

                {/* Setting 2: Mistral AI Formality Tuning */}
                <div className="pt-4 border-t border-slate-800">
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Tono y Registro del Modelo Mistral AI
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-slate-950 border border-teal-500/40 text-slate-200">
                      <div className="font-semibold text-teal-300 mb-1">Empresarial / Formal</div>
                      <p className="text-[11px] text-slate-400">Traducción cortés ideal para contratos, ventas y clientes B2B.</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800 text-slate-400">
                      <div className="font-semibold text-slate-300 mb-1">Conversacional Fluido</div>
                      <p className="text-[11px] text-slate-500">Tono natural para equipos internos y coordinación diaria.</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800 text-slate-400">
                      <div className="font-semibold text-slate-300 mb-1">Técnico / Preciso</div>
                      <p className="text-[11px] text-slate-500">Mantiene términos de programación, ingeniería y finanzas intactos.</p>
                    </div>
                  </div>
                </div>

                {/* Setting 3: Audio TTS */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-white">Auto-reproducción de voz traducida (TTS)</div>
                    <div className="text-xs text-slate-400">
                      Genera voz sintética con entonación humana para que puedas escuchar las notas de voz en tu idioma.
                    </div>
                  </div>
                  <div className="w-11 h-6 rounded-full bg-teal-500 p-1 flex items-center justify-end">
                    <div className="w-4 h-4 rounded-full bg-slate-950 shadow-sm" />
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>

        {/* Gallery / Side-by-side device mockups showcasing real Vuetify layouts */}
        <div className="pt-8 border-t border-slate-900">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-xl font-bold text-white font-display">
              Capturas de Pantalla en Entornos Reales
            </h3>
            <p className="text-xs text-slate-400 mt-2">
              Diseñado con Vuetify para ofrecer consistencia visual en monitores ultrawide, portátiles y terminales móviles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            
            {/* Desktop Mockup */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 flex flex-col justify-between">
              <div className="rounded-xl overflow-hidden aspect-[16/9] mb-4 bg-slate-950">
                <img
                  src="/src/assets/images/converxar_desktop_vuetify_1793627845056.jpg"
                  alt="Vista de escritorio de Converxar.com con Vuetify"
                  className="w-full h-full object-cover hover:scale-102 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white font-display">
                  Consola de Colaboración Multilingüe Desktop
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  Muestra la barra lateral de navegación Vuetify (VNavigationDrawer), lista de canales por país y reproductor de ondas de sonido de 100+ idiomas.
                </p>
              </div>
            </div>

            {/* Mobile PWA Mockup */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 flex flex-col justify-between">
              <div className="rounded-xl overflow-hidden aspect-[4/3] mb-4 bg-slate-950">
                <img
                  src="/src/assets/images/converxar_mobile_pwa_1793627845052.jpg"
                  alt="Vista móvil de Converxar.com PWA con interfaz táctil en smartphone"
                  className="w-full h-full object-cover hover:scale-102 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white font-display">
                  Experiencia PWA en Smartphone
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  Optimizado para la palma de la mano: notas de voz instantáneas con transcripción al español, selector rápido y carga fotográfica con OCR de Mistral.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Vuetify Component Highlights Grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {VUETIFY_HIGHLIGHTS.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80">
              <div className="text-xs font-mono text-teal-400 font-semibold mb-1">
                {item.component}
              </div>
              <div className="text-xs text-slate-300 leading-relaxed">
                {item.description}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
