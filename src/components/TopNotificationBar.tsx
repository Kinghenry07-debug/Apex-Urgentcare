import React from 'react';
import { Clock, CheckCircle2, Phone, Sparkles } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface TopNotificationBarProps {
  onOpenBooking: () => void;
}

export const TopNotificationBar: React.FC<TopNotificationBarProps> = ({ onOpenBooking }) => {
  return (
    <div className="bg-slate-900 text-slate-100 text-xs sm:text-sm py-2 px-4 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        {/* Left: Wait time status with pulsing dot */}
        <div className="flex items-center gap-2.5 font-medium flex-wrap justify-center sm:justify-start">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-slate-200">
            Current Wait Time: <strong className="text-emerald-400 font-bold">{CLINIC_INFO.currentWaitMinutes} Mins</strong>
          </span>
          <span className="hidden md:inline-block text-slate-600">•</span>
          <span className="bg-emerald-950/80 text-emerald-300 px-2 py-0.5 rounded-full text-[11px] font-semibold border border-emerald-800/50 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Walk-ins Welcome Today
          </span>
        </div>

        {/* Right: Quick actions & Hours */}
        <div className="flex items-center gap-4 text-xs">
          <div className="hidden lg:flex items-center gap-1.5 text-slate-300">
            <Clock className="w-3.5 h-3.5 text-teal-400" />
            <span>Mon–Sun: 8:00 AM – 8:00 PM</span>
          </div>

          <a 
            href={`tel:${CLINIC_INFO.formattedPhone}`}
            className="flex items-center gap-1.5 text-slate-200 hover:text-white transition-colors font-medium group"
          >
            <Phone className="w-3.5 h-3.5 text-teal-400 group-hover:scale-110 transition-transform" />
            <span>{CLINIC_INFO.phone}</span>
          </a>

          <button
            onClick={onOpenBooking}
            className="bg-teal-600 hover:bg-teal-500 text-white px-2.5 py-1 rounded text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Sparkles className="w-3 h-3" />
            <span>Hold Spot</span>
          </button>
        </div>
      </div>
    </div>
  );
};
