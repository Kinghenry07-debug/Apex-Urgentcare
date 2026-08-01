import React, { useEffect } from 'react';
import { CheckCircle2, X, Calendar, Clock, MapPin, Phone } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface ToastNotificationProps {
  isVisible: boolean;
  onClose: () => void;
  details?: {
    name: string;
    service: string;
    date: string;
    timeSlot: string;
  } | null;
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({
  isVisible,
  onClose,
  details
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 9000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full px-4 animate-in slide-in-from-bottom-5 duration-300">
      <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-2xl border border-emerald-500/50 relative overflow-hidden">
        
        {/* Glow Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500"></div>

        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
            <CheckCircle2 className="w-6 h-6" />
          </div>

          <div className="space-y-1 pr-4">
            <h4 className="font-extrabold text-base text-white flex items-center gap-2">
              <span>Your appointment request has been sent!</span>
            </h4>
            
            <p className="text-xs text-slate-300 leading-relaxed">
              Thank you, <strong className="text-emerald-400">{details?.name || 'Patient'}</strong>. Our Dallas clinical team has received your request and held your spot in line.
            </p>

            {details && (
              <div className="mt-3 p-2.5 bg-slate-800/90 rounded-lg border border-slate-700/80 text-xs space-y-1">
                <div className="flex items-center justify-between text-slate-300">
                  <span>Service:</span>
                  <span className="font-bold text-white">{details.service}</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>Requested Slot:</span>
                  <span className="font-bold text-teal-300">{details.date} at {details.timeSlot}</span>
                </div>
              </div>
            )}

            <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-red-400" /> {CLINIC_INFO.address}
              </span>
              <a href={`tel:${CLINIC_INFO.formattedPhone}`} className="text-teal-400 font-bold hover:underline">
                Call Clinic
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
