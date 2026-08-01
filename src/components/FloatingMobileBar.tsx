import React from 'react';
import { Phone, Calendar, Clock } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface FloatingMobileBarProps {
  onOpenBooking: () => void;
}

export const FloatingMobileBar: React.FC<FloatingMobileBarProps> = ({ onOpenBooking }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 lg:hidden bg-slate-900/95 backdrop-blur-md border-t border-slate-800 p-3 px-4 shadow-2xl">
      <div className="flex items-center gap-2 max-w-md mx-auto">
        <a
          href={`tel:${CLINIC_INFO.formattedPhone}`}
          className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 border border-slate-700 transition-colors"
        >
          <Phone className="w-4 h-4 text-teal-400" />
          <span>Call ({CLINIC_INFO.phone})</span>
        </a>

        <button
          onClick={onOpenBooking}
          className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-colors cursor-pointer"
        >
          <Calendar className="w-4 h-4 text-blue-100" />
          <span>Book Spot (15m Wait)</span>
        </button>
      </div>
    </div>
  );
};
