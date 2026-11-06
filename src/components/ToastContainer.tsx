import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      {toasts.map(toast => {
        let icon = <Info className="w-4 h-4 text-cyan-400" />;
        let borderClass = 'border-cyan-500/30';
        let bgClass = 'bg-[#0f111a]/95';

        if (toast.type === 'success') {
          icon = <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
          borderClass = 'border-emerald-500/40';
        } else if (toast.type === 'warning') {
          icon = <AlertTriangle className="w-4 h-4 text-amber-400" />;
          borderClass = 'border-amber-500/40';
        } else if (toast.type === 'error') {
          icon = <AlertCircle className="w-4 h-4 text-rose-400" />;
          borderClass = 'border-rose-500/40';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-3.5 rounded-2xl ${bgClass} border ${borderClass} shadow-2xl backdrop-blur-xl flex items-center gap-3 text-xs text-white animate-in fade-in slide-in-from-bottom-2`}
          >
            <div className="flex-shrink-0">{icon}</div>
            <p className="font-medium text-slate-200">{toast.message}</p>
          </div>
        );
      })}
    </div>
  );
};
