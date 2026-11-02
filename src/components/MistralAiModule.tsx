import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Terminal, 
  Copy, 
  Check, 
  Play, 
  RefreshCw, 
  Zap, 
  Layers, 
  Eye, 
  FileText, 
  Cpu, 
  ShieldCheck,
  ExternalLink,
  Sliders,
  CheckCircle2,
  Gauge
} from 'lucide-react';
import { MISTRAL_BACKEND_NODE_CODE, MISTRAL_MODELS_INFO } from '../data/mistralCodeSnippets';
import { LANGUAGES } from '../data/mockData';

export const MistralAiModule: React.FC = () => {
  const [activeModel, setActiveModel] = useState<'mistral-small-latest' | 'pixtral-12b' | 'mistral-large-latest'>('mistral-small-latest');
  const [activeTab, setActiveTab] = useState<'playground' | 'code' | 'models'>('playground');
  
  // Streaming playground states
  const [inputText, setInputText] = useState('Hola equipo, cerramos el acuerdo comercial con el cliente en París. Enviemos la versión final del contrato hoy.');
  const [sourceLang, setSourceLang] = useState('es');
  const [targetLang, setTargetLang] = useState('fr');
  const [formality, setFormality] = useState<'formal' | 'natural' | 'tecnico'>('formal');
  
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamedText, setStreamedText] = useState('');
  const [latencyMs, setLatencyMs] = useState(62);
  const [tokensPerSec, setTokensPerSec] = useState(98);
  const [copiedCode, setCopiedCode] = useState(false);

  // Predefined translation answers for realistic token-by-token streaming simulation
  const translationTargets: Record<string, string> = {
    fr: "Bonjour l'équipe, nous avons conclu l'accord commercial avec le client à Paris. Envoyons la version finale du contrat aujourd'hui.",
    en: "Hello team, we closed the commercial agreement with the client in Paris. Let's send the final version of the contract today.",
    de: "Hallo Team, wir haben die Handelsvereinbarung mit dem Kunden in Paris abgeschlossen. Lasst uns heute die endgültige Vertragsversion senden.",
    ja: "チームの皆様、パリのクライアントとの商業契約が締結されました。本日、契約書の最終版を送付しましょう。",
    pt: "Olá equipe, fechamos o acordo comercial com o cliente em Paris. Vamos enviar a versão final do contrato hoje.",
  };

  const handleRunStream = () => {
    setIsStreaming(true);
    setStreamedText('');
    setLatencyMs(Math.floor(Math.random() * 20) + 52); // ~52-72ms
    setTokensPerSec(Math.floor(Math.random() * 15) + 90);

    const fullText = translationTargets[targetLang] || `[Traducción por Mistral AI]: ${inputText}`;
    const words = fullText.split(' ');

    let current = '';
    let index = 0;

    const interval = setInterval(() => {
      if (index < words.length) {
        current += (index === 0 ? '' : ' ') + words[index];
        setStreamedText(current);
        index++;
      } else {
        clearInterval(interval);
        setIsStreaming(false);
      }
    }, 45); // realistic token streaming speed
  };

  const handleCopy = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="mistral-ai" className="py-20 md:py-28 border-b border-slate-900 bg-slate-950/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Motor de Inteligencia Artificial Oficial</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-display tracking-tight text-balance">
            Impulsado por la API de Mistral AI: Velocidad y Precisión Multilingüe
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Converxar.com aprovecha la familia de modelos europeos de <strong>Mistral AI</strong> para entregar streaming sub-100ms en chat, visión OCR con <strong>Pixtral</strong> y análisis de documentos de alta complejidad.
          </p>

          {/* Module Tabs */}
          <div className="mt-8 inline-flex p-1 bg-slate-900 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setActiveTab('playground')}
              className={`px-4 py-2 rounded-lg font-medium transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'playground'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Simulador de Streaming SSE</span>
            </button>
            <button
              onClick={() => setActiveTab('models')}
              className={`px-4 py-2 rounded-lg font-medium transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'models'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Modelos: Small, Pixtral & Large</span>
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`px-4 py-2 rounded-lg font-medium transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'code'
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Código Node.js (@mistralai/mistralai)</span>
            </button>
          </div>
        </div>

        {/* ===================== TAB 1: PLAYGROUND ===================== */}
        {activeTab === 'playground' && (
          <div className="max-w-4xl mx-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden">
            
            {/* Top Toolbar */}
            <div className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                  M
                </span>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-2">
                    <span>mistral-small-latest (Streaming Inferencia)</span>
                    <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800 font-mono">
                      Online
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Endpoint: api.mistral.ai/v1/chat/completions · stream: true
                  </div>
                </div>
              </div>

              {/* Performance Telemetry Chips */}
              <div className="flex items-center gap-3 text-xs font-mono">
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-1.5 text-teal-300">
                  <Gauge className="w-3.5 h-3.5 text-teal-400" />
                  <span>TTFT: {latencyMs} ms</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-1.5 text-amber-300">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>{tokensPerSec} tok/s</span>
                </div>
              </div>
            </div>

            {/* Input & Output Split Pane */}
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-800">
              
              {/* Left Pane: Input & Controls */}
              <div className="p-5 sm:p-6 bg-slate-900/60 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span className="font-semibold text-white">Mensaje de Origen (Español 🇪🇸)</span>
                    <span className="text-[10px] text-slate-500 font-mono">Input Prompt</span>
                  </div>

                  <textarea
                    rows={4}
                    value={inputText}
                    onChange={e => setInputText(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-amber-400 rounded-xl p-3.5 text-xs text-slate-200 leading-relaxed focus:outline-none resize-none font-sans"
                    placeholder="Escribe el mensaje que deseas traducir..."
                  />

                  {/* Formality Tuning */}
                  <div className="mt-4 pt-4 border-t border-slate-800/80">
                    <div className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Registro y Parámetros del Modelo
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      {[
                        { id: 'formal', label: 'Formal / B2B' },
                        { id: 'natural', label: 'Conversacional' },
                        { id: 'tecnico', label: 'Técnico / Código' },
                      ].map(item => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setFormality(item.id as any)}
                          className={`p-2 rounded-lg border text-center transition-colors cursor-pointer text-[11px] font-medium ${
                            formality === item.id
                              ? 'bg-amber-400/20 border-amber-400 text-amber-300 font-semibold'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Target Language & Trigger Button */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Traducir al idioma:</span>
                    <select
                      value={targetLang}
                      onChange={e => setTargetLang(e.target.value)}
                      className="bg-slate-950 border border-slate-800 focus:border-amber-400 rounded-lg px-3 py-1.5 text-xs text-white font-medium cursor-pointer"
                    >
                      <option value="fr">🇫🇷 Francés</option>
                      <option value="en">🇺🇸 Inglés</option>
                      <option value="de">🇩🇪 Alemán</option>
                      <option value="ja">🇯🇵 Japonés</option>
                      <option value="pt">🇧🇷 Portugués</option>
                    </select>
                  </div>

                  <button
                    onClick={handleRunStream}
                    disabled={isStreaming}
                    className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 disabled:opacity-50"
                  >
                    {isStreaming ? (
                      <span className="flex items-center gap-2">
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Recibiendo stream de tokens de Mistral...
                      </span>
                    ) : (
                      <>
                        <Play className="w-4 h-4 fill-current" />
                        <span>Ejecutar Streaming en Vivo con Mistral</span>
                      </>
                    )}
                  </button>
                </div>

              </div>

              {/* Right Pane: Live Token Stream Output */}
              <div className="p-5 sm:p-6 bg-slate-950 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span className="font-semibold text-amber-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Tokens en Tiempo Real (Server-Sent Events)</span>
                    </span>
                    <span className="text-[10px] text-teal-400 font-mono">Stream Response</span>
                  </div>

                  {/* Stream box */}
                  <div className="min-h-[160px] p-4 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-100 leading-relaxed font-sans relative">
                    {streamedText ? (
                      <div className="space-y-2">
                        <p className="font-medium text-emerald-200">
                          {streamedText}
                          {isStreaming && (
                            <span className="inline-block w-2 h-4 ml-1 bg-amber-400 animate-pulse" />
                          )}
                        </p>
                      </div>
                    ) : (
                      <div className="text-slate-500 text-xs italic flex flex-col items-center justify-center h-28 text-center">
                        <span>Haz clic en &quot;Ejecutar Streaming en Vivo&quot; para observar los tokens fluyendo desde la API de Mistral AI en milisegundos.</span>
                      </div>
                    )}
                  </div>

                  {/* System Instruction Transparency */}
                  <div className="mt-4 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-[11px] text-slate-400 space-y-1">
                    <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
                      System Prompt Inyectado:
                    </div>
                    <p className="font-mono text-slate-300">
                      &quot;Traduce directamente al idioma objetivo sin comentarios. Preserva el registro {formality} y adapta modismos para que suenen nativos.&quot;
                    </p>
                  </div>
                </div>

                {/* Footer status */}
                <div className="pt-4 border-t border-slate-900 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>Modelo: mistral-small-latest</span>
                  <span className="text-emerald-400">Temp: 0.2 · Top_P: 0.95</span>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* ===================== TAB 2: MODELOS MISTRAL ===================== */}
        {activeTab === 'models' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MISTRAL_MODELS_INFO.map(m => (
              <div
                key={m.id}
                className="p-6 sm:p-7 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-amber-400 font-bold bg-amber-950/80 px-2.5 py-1 rounded border border-amber-800/40">
                      {m.latency}
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">{m.id}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white font-display mb-1">
                    {m.name}
                  </h3>
                  <div className="text-xs text-teal-400 font-medium mb-3">
                    {m.role}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {m.description}
                  </p>

                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-400 mb-6">
                    <strong className="text-slate-200">En Converxar:</strong> {m.useCase}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex flex-wrap gap-2">
                  {m.badges.map((b, bIdx) => (
                    <span
                      key={bIdx}
                      className="text-[10px] font-mono text-slate-300 bg-slate-800 px-2 py-0.5 rounded"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ===================== TAB 3: CÓDIGO BACKEND OFICIAL ===================== */}
        {activeTab === 'code' && (
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white font-display">
                  Implementación Completa en Node.js con @mistralai/mistralai
                </h4>
                <p className="text-xs text-slate-400">
                  Rutas con streaming para WebSockets/SSE, OCR multimodal con Pixtral y documentos con Mistral Large.
                </p>
              </div>

              <button
                onClick={() => handleCopy(MISTRAL_BACKEND_NODE_CODE)}
                className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? 'Copiado' : 'Copiar Código Node.js'}</span>
              </button>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 p-4">
              <pre className="font-mono text-xs text-amber-300/90 overflow-x-auto leading-relaxed max-h-[500px]">
                <code>{MISTRAL_BACKEND_NODE_CODE}</code>
              </pre>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
