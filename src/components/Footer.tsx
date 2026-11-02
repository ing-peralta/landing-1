import React from 'react';
import { Globe } from 'lucide-react';

interface FooterProps {
  onOpenWaitlist: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenWaitlist }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12 md:py-16 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-900">
          
          {/* Brand info */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-lg font-display">
              <span className="w-7 h-7 rounded-lg bg-gradient-to-tr from-teal-500 to-indigo-500 flex items-center justify-center text-white">
                <Globe className="w-3.5 h-3.5 text-white" />
              </span>
              <span>Converxar<span className="text-teal-400">.com</span></span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Plataforma de mensajería en tiempo real multimodal (audio, texto, imágenes y archivos) con traducción automática contextual al idioma de cada participante.
            </p>
            <div className="text-[11px] text-slate-500">
              Desarrollada con Vue.js 3 · Vuetify.js · Node.js · Mistral AI API
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3 space-y-2">
            <div className="text-white font-semibold text-xs uppercase tracking-wider mb-3">
              Navegación
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#que-resuelve" className="hover:text-teal-300 transition-colors">
                  ¿Qué Resuelve?
                </a>
              </li>
              <li>
                <a href="#interfaz-vuetify" className="hover:text-teal-300 transition-colors">
                  Capturas & Interfaz Vuetify
                </a>
              </li>
              <li>
                <a href="#simulador" className="hover:text-teal-300 transition-colors">
                  Simulador en Vivo
                </a>
              </li>
              <li>
                <a href="#precios-pagos" className="hover:text-teal-300 transition-colors">
                  Planes & Pasarelas (Stripe y Mercado Pago)
                </a>
              </li>
              <li>
                <a href="#tecnologia" className="hover:text-teal-300 transition-colors">
                  Arquitectura Técnica
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-teal-300 transition-colors">
                  Preguntas Frecuentes
                </a>
              </li>
            </ul>
          </div>

          {/* Call to action & Legal */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-white font-semibold text-xs uppercase tracking-wider mb-2">
              Acceso a la Plataforma
            </div>
            <p className="text-slate-400 text-xs">
              ¿Listo para comunicarte con cualquier persona del mundo en tu idioma natal?
            </p>
            <button
              onClick={onOpenWaitlist}
              className="inline-flex items-center px-4 py-2 text-xs font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-lg transition-colors cursor-pointer"
            >
              Unirse a la Lista de Espera
            </button>
            <div className="text-[11px] text-slate-500 pt-2">
              Contacto comercial: contacto@converxar.com
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Converxar.com. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacidad y Protección de Datos</span>
            <span className="hover:text-slate-400 cursor-pointer">Términos de Servicio</span>
            <span className="hover:text-slate-400 cursor-pointer">Seguridad</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
