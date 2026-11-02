import React, { useState } from 'react';
import { Lock, Check, Eye, EyeOff, ShieldCheck, ArrowRight, AlertCircle, RefreshCw } from 'lucide-react';

interface AccountActivationViewProps {
  token: string;
  userEmail: string;
  userName: string;
  onSuccess: (jwtToken: string, user: { name: string; email: string; role: string }) => void;
  onCancel?: () => void;
}

export const AccountActivationView: React.FC<AccountActivationViewProps> = ({
  token,
  userEmail,
  userName,
  onSuccess,
  onCancel,
}) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Password strength calculations
  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  const passwordsMatch = password && password === confirmPassword;

  const strengthScore = [hasMinLength, hasUpperCase, hasNumber, hasSpecial].filter(Boolean).length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!hasMinLength) {
      setError('La contraseña debe tener al menos 8 caracteres.');
      return;
    }

    if (!passwordsMatch) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setIsSubmitting(true);

    // Simulate backend call to POST /api/users/complete-registration
    setTimeout(() => {
      setIsSubmitting(false);
      const dummyJwt = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify({
        email: userEmail,
        name: userName,
        role: 'MEMBER',
        activated: true,
      }))}.signature_converxar_activation`;

      onSuccess(dummyJwt, {
        name: userName,
        email: userEmail,
        role: 'MEMBER',
      });
    }, 900);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl shadow-teal-950/40">
      
      {/* Brand & Title */}
      <div className="text-center mb-6">
        <div className="w-12 h-12 mx-auto rounded-2xl bg-teal-500/20 text-teal-400 flex items-center justify-center mb-3">
          <Lock className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-white font-display">
          Activa tu Cuenta en Converxar.com
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Hola <strong className="text-slate-200">{userName}</strong>, configura tu contraseña de acceso para comenzar a traducir en tiempo real.
        </p>
      </div>

      {/* Captured Token Info */}
      <div className="mb-5 p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
        <div>
          <span className="text-slate-500">Cuenta:</span> <span className="text-teal-300 font-medium">{userEmail}</span>
        </div>
        <div className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
          Token Válido
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-xl bg-rose-950/40 border border-rose-800/60 text-xs text-rose-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
          <span>{error}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Nueva Contraseña
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Mínimo 8 caracteres"
              className="w-full bg-slate-950 border border-slate-800 focus:border-teal-400 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Confirmar Contraseña
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            required
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            placeholder="Repite la contraseña"
            className="w-full bg-slate-950 border border-slate-800 focus:border-teal-400 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none"
          />
        </div>

        {/* Password Strength Checklist */}
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 text-[11px] text-slate-400">
          <div className="flex items-center justify-between text-xs font-medium text-slate-300 mb-1">
            <span>Seguridad de Contraseña</span>
            <span className={
              strengthScore <= 1 ? 'text-rose-400' : strengthScore <= 3 ? 'text-amber-400' : 'text-emerald-400'
            }>
              {strengthScore <= 1 ? 'Débil' : strengthScore <= 3 ? 'Media' : 'Fuerte'}
            </span>
          </div>

          <div className="grid grid-cols-4 gap-1 h-1.5 mb-2">
            {[1, 2, 3, 4].map(level => (
              <div
                key={level}
                className={`rounded-full transition-colors ${
                  strengthScore >= level
                    ? strengthScore <= 1
                      ? 'bg-rose-500'
                      : strengthScore <= 3
                      ? 'bg-amber-400'
                      : 'bg-emerald-400'
                    : 'bg-slate-800'
                }`}
              />
            ))}
          </div>

          <div className="grid grid-cols-2 gap-1 text-[10px]">
            <span className={hasMinLength ? 'text-emerald-400' : 'text-slate-500'}>
              {hasMinLength ? '✓' : '○'} Mínimo 8 caracteres
            </span>
            <span className={hasUpperCase ? 'text-emerald-400' : 'text-slate-500'}>
              {hasUpperCase ? '✓' : '○'} Mayúscula (A-Z)
            </span>
            <span className={hasNumber ? 'text-emerald-400' : 'text-slate-500'}>
              {hasNumber ? '✓' : '○'} Número (0-9)
            </span>
            <span className={hasSpecial ? 'text-emerald-400' : 'text-slate-500'}>
              {hasSpecial ? '✓' : '○'} Símbolo especial
            </span>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting || !hasMinLength || !passwordsMatch}
            className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin" />
                Validando token y activando usuario en Node.js...
              </span>
            ) : (
              <>
                <span>Activar Cuenta & Iniciar Sesión</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {onCancel && (
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
            >
              Cancelar y volver al Dashboard
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
