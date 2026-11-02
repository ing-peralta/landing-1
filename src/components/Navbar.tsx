import React from 'react';
import { ArrowRight, Globe } from 'lucide-react';

interface NavbarProps {
  onOpenWaitlist: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenWaitlist }) => {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-slate-950/85 border-b border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="#" 
          className="flex items-center gap-2 text-xl font-bold tracking-tight text-white font-display whitespace-nowrap shrink-0 group"
        >
          <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-teal-500 to-indigo-500 flex items-center justify-center text-white shadow-sm shadow-teal-500/20 group-hover:scale-105 transition-transform">
            <Globe className="w-4 h-4 text-white" />
          </span>
          <span>Converxar<span className="text-teal-400">.com</span></span>
        </a>

        {/* Zone 2: clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-slate-300">
          <a href="#que-resuelve" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            ¿Qué Resuelve?
          </a>
          <a href="#interfaz-vuetify" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            Interfaz Vuetify
          </a>
          <a href="#mistral-ai" className="hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>Mistral AI</span>
          </a>
          <a href="#simulador" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            Simulador
          </a>
          <a href="#precios-pagos" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            Planes & Pagos
          </a>
          <a href="#dashboard" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            Dashboard
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenWaitlist}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 active:scale-95 rounded-lg shadow-sm shadow-teal-500/20 transition-all whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Acceso Anticipado</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </header>
  );
};
