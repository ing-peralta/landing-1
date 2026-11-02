import React, { useState } from 'react';
import { 
  ArrowRightLeft, 
  Send, 
  Sparkles, 
  Play, 
  Pause, 
  FileText, 
  Image as ImageIcon, 
  CheckCheck,
  RefreshCw,
  Copy,
  Check
} from 'lucide-react';
import { LANGUAGES, SIMULATOR_SAMPLES, LanguageOption } from '../data/mockData';

export const LiveSimulator: React.FC = () => {
  const [selectedSampleIndex, setSelectedSampleIndex] = useState(0);
  const [senderLang, setSenderLang] = useState<string>('es');
  const [receiverLang, setReceiverLang] = useState<string>('ja');
  const [customText, setCustomText] = useState<string>('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copied, setCopied] = useState(false);

  const activeSample = SIMULATOR_SAMPLES[selectedSampleIndex];

  // Pick sample
  const handleSelectSample = (index: number) => {
    setSelectedSampleIndex(index);
    const sample = SIMULATOR_SAMPLES[index];
    setSenderLang(sample.senderLang);
    // ensure receiver lang is different
    if (sample.senderLang === 'es') setReceiverLang('en');
    else if (sample.senderLang === 'en') setReceiverLang('es');
    else if (sample.senderLang === 'ja') setReceiverLang('es');
    else setReceiverLang('es');
    setCustomText('');
  };

  // Swap languages
  const handleSwapLanguages = () => {
    const temp = senderLang;
    setSenderLang(receiverLang);
    setReceiverLang(temp);
  };

  // Compute translation output
  const getTranslatedResult = () => {
    if (customText.trim()) {
      // If user typed custom text, generate a smart contextual translation simulation
      const targetLangObj = LANGUAGES.find(l => l.code === receiverLang);
      return `[Traducción automática por Mistral AI al ${targetLangObj?.name || 'idioma destino'}]: "${customText}"`;
    }

    // From predefined rich sample
    if (activeSample.translations[receiverLang]) {
      return activeSample.translations[receiverLang];
    }
    // Fallback if target is same as sender or missing
    if (receiverLang === senderLang) {
      return activeSample.senderText;
    }
    return activeSample.translations['en'] || activeSample.senderText;
  };

  // Copy handler
  const handleCopy = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const senderLangObj = LANGUAGES.find(l => l.code === senderLang) || LANGUAGES[0];
  const receiverLangObj = LANGUAGES.find(l => l.code === receiverLang) || LANGUAGES[1];

  return (
    <section id="simulador" className="py-20 md:py-28 border-b border-slate-900 bg-slate-950/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="text-xs font-semibold text-teal-400 uppercase tracking-wider mb-3">
            Simulador Interactivo en Tiempo Real
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-display tracking-tight text-balance">
            Experimenta cómo traduce Converxar con la API de Mistral
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            Elige los idiomas de envío y recepción. Comprueba la inmediatez y naturalidad tanto en mensajes de texto, como en notas de voz, imágenes o documentos.
          </p>

          {/* Sample scenario selectors */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {SIMULATOR_SAMPLES.map((sample, idx) => (
              <button
                key={sample.id}
                onClick={() => handleSelectSample(idx)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                  selectedSampleIndex === idx
                    ? 'bg-teal-500/15 border-teal-500/50 text-teal-300 font-semibold shadow-sm'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <span>{sample.title}</span>
                <span className="ml-1.5 text-[10px] text-slate-500 uppercase">({sample.type})</span>
              </button>
            ))}
          </div>
        </div>

        {/* The Live Playground Card */}
        <div className="max-w-4xl mx-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden">
          
          {/* Language selector bar */}
          <div className="p-4 sm:p-5 bg-slate-900/90 border-b border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Sender Language */}
            <div className="w-full sm:w-auto flex items-center gap-2">
              <span className="text-xs text-slate-400">Emisor envía en:</span>
              <select
                value={senderLang}
                onChange={e => setSenderLang(e.target.value)}
                className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-teal-500 cursor-pointer font-medium"
              >
                {LANGUAGES.map(lang => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Swap Button */}
            <button
              onClick={handleSwapLanguages}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Intercambiar idiomas"
              aria-label="Intercambiar idiomas emisor y receptor"
            >
              <ArrowRightLeft className="w-4 h-4" />
            </button>

            {/* Receiver Language */}
            <div className="w-full sm:w-auto flex items-center gap-2">
              <span className="text-xs text-slate-400">Receptor recibe en:</span>
              <select
                value={receiverLang}
                onChange={e => setReceiverLang(e.target.value)}
                className="bg-slate-950 border border-teal-500/50 rounded-lg px-3 py-1.5 text-xs text-teal-300 focus:outline-none focus:border-teal-400 cursor-pointer font-medium"
              >
                {LANGUAGES.map(lang => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Two-Pane Interactive View: Sender Side vs Receiver Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-800">
            
            {/* Left: What the sender types / uploads */}
            <div className="p-5 sm:p-6 bg-slate-950/40 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                  <span className="font-semibold text-white flex items-center gap-1.5">
                    <span>{senderLangObj.flag}</span>
                    <span>Mensaje Original ({senderLangObj.name})</span>
                  </span>
                  <span className="text-[11px] text-slate-500 font-mono">Dispositivo Emisor</span>
                </div>

                {/* Modality specifics */}
                {activeSample.type === 'audio' && (
                  <div className="mb-4 p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="flex items-center justify-between mb-2 text-xs">
                      <span className="text-amber-400 font-medium flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-amber-400" />
                        Audio grabado por emisor
                      </span>
                      <span className="font-mono text-slate-400">{activeSample.audioDuration}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                        className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors cursor-pointer"
                        aria-label="Escuchar audio de muestra"
                      >
                        {isPlayingAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
                      </button>
                      <div className="flex-1 flex items-center gap-1 h-6">
                        {[10, 18, 14, 22, 12, 20, 16, 24, 15, 19, 13, 21, 11, 23].map((h, i) => (
                          <div
                            key={i}
                            className={`flex-1 rounded-full ${isPlayingAudio ? 'bg-amber-400 animate-wave-2' : 'bg-slate-700'}`}
                            style={{ height: `${h}px` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeSample.type === 'image' && (
                  <div className="mb-4 p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-teal-400 shrink-0">
                      <ImageIcon className="w-5 h-5" />
                    </div>
                    <div className="text-xs">
                      <div className="font-medium text-slate-200">{activeSample.imageDetail}</div>
                      <div className="text-slate-500 text-[11px]">OCR activado en origen</div>
                    </div>
                  </div>
                )}

                {activeSample.type === 'file' && (
                  <div className="mb-4 p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-indigo-400 shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="text-xs">
                      <div className="font-medium text-slate-200">{activeSample.fileDetail}</div>
                      <div className="text-slate-500 text-[11px]">Documento analizado por Mistral</div>
                    </div>
                  </div>
                )}

                {/* Text preview / edit */}
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-200 leading-relaxed font-sans">
                  {customText ? customText : activeSample.senderText}
                </div>
              </div>

              {/* Custom Input box to try your own message */}
              <div className="mt-4 pt-3 border-t border-slate-800/80">
                <div className="text-[11px] text-slate-400 mb-1.5">
                  ¿Quieres probar tu propia frase?
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={customText}
                    onChange={e => setCustomText(e.target.value)}
                    placeholder="Escribe algo aquí para probar la traducción..."
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                  />
                  {customText && (
                    <button
                      onClick={() => setCustomText('')}
                      className="text-xs text-slate-400 hover:text-white px-2 py-1"
                    >
                      Limpiar
                    </button>
                  )}
                </div>
              </div>

            </div>

            {/* Right: What the recipient receives translated */}
            <div className="p-5 sm:p-6 bg-slate-900/60 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                  <span className="font-semibold text-teal-300 flex items-center gap-1.5">
                    <span>{receiverLangObj.flag}</span>
                    <span>Mensaje Recibido ({receiverLangObj.name})</span>
                  </span>
                  <span className="text-[11px] text-teal-400/90 font-mono">Traducción Mistral AI</span>
                </div>

                {/* Translation Display */}
                <div className="p-4 rounded-xl bg-slate-950 border border-teal-500/30 text-sm text-slate-100 leading-relaxed shadow-inner relative group">
                  <p className="font-medium text-emerald-200/90">
                    {getTranslatedResult()}
                  </p>

                  <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-1.5 text-teal-400 text-[11px]">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Contexto & tono preservado</span>
                    </div>

                    <button
                      onClick={() => handleCopy(getTranslatedResult())}
                      className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                      title="Copiar texto traducido"
                      aria-label="Copiar texto traducido"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Receiver audio TTS preview if sample is audio */}
                {activeSample.type === 'audio' && (
                  <div className="mt-3 p-3 rounded-lg bg-teal-950/20 border border-teal-500/20 flex items-center justify-between text-xs">
                    <span className="text-teal-300">
                      🔊 Voz sintética generada en {receiverLangObj.name}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">Listo para reproducir</span>
                  </div>
                )}
              </div>

              {/* Status / Telemetry footnote */}
              <div className="mt-6 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1 text-slate-400">
                  <CheckCheck className="w-3.5 h-3.5 text-teal-400" />
                  Entregado vía WebSockets en tiempo real
                </span>
                <span className="font-mono text-teal-400">Latencia: ~74 ms</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
