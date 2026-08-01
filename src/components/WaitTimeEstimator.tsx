import React, { useState } from 'react';
import { Clock, Users, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface WaitTimeEstimatorProps {
  onOpenBooking: () => void;
}

export const WaitTimeEstimator: React.FC<WaitTimeEstimatorProps> = ({ onOpenBooking }) => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('Now');

  const timeSlots = [
    { label: 'Right Now', time: 'Now', estWait: '10 - 15 Mins', status: 'Optimal' },
    { label: 'Next 1 Hour', time: '1 hr', estWait: '15 - 20 Mins', status: 'Good' },
    { label: 'This Afternoon (1pm - 4pm)', time: 'Afternoon', estWait: '15 Mins', status: 'Optimal' },
    { label: 'Evening (5pm - 8pm)', time: 'Evening', estWait: '15 - 25 Mins', status: 'Moderate' }
  ];

  return (
    <section id="wait-times" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 text-white rounded-3xl p-8 lg:p-12 shadow-2xl relative overflow-hidden">
          {/* Background Ambient Lights */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Live Wait Monitor
              </div>
              
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Check Live Clinic Wait Times Before You Leave Home
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                We update our live patient queue every few minutes so you can minimize time spent in the waiting room. Save your spot online to jump the line.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 text-xs text-slate-300">
                <span className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-2 rounded-lg border border-slate-700">
                  <Users className="w-4 h-4 text-teal-400" /> 4 Medical Staff Active
                </span>
                <span className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-2 rounded-lg border border-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Triage On Arrival
                </span>
                <span className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-2 rounded-lg border border-slate-700">
                  <Sparkles className="w-4 h-4 text-blue-400" /> Express Registration
                </span>
              </div>
            </div>

            {/* Right Slot selector & Save Spot Trigger */}
            <div className="lg:col-span-6 bg-slate-800/90 rounded-2xl p-6 border border-slate-700 shadow-xl space-y-4">
              <h3 className="font-bold text-slate-200 text-sm flex items-center justify-between">
                <span>Select Your Expected Arrival Time:</span>
                <span className="text-xs text-teal-400 font-normal">Updated Live</span>
              </h3>

              <div className="space-y-2.5">
                {timeSlots.map((slot) => (
                  <button
                    key={slot.time}
                    onClick={() => setSelectedTimeSlot(slot.time)}
                    className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                      selectedTimeSlot === slot.time
                        ? 'bg-blue-600/30 border-blue-400 text-white shadow-md'
                        : 'bg-slate-900/60 border-slate-700 text-slate-300 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Clock className={`w-4 h-4 ${selectedTimeSlot === slot.time ? 'text-teal-400' : 'text-slate-500'}`} />
                      <div>
                        <span className="font-bold text-sm block">{slot.label}</span>
                        <span className="text-xs text-slate-400">Estimated door to doc: {slot.estWait}</span>
                      </div>
                    </div>

                    <span className={`text-[11px] font-extrabold px-2.5 py-1 rounded-full ${
                      slot.status === 'Optimal'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : 'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}>
                      {slot.status}
                    </span>
                  </button>
                ))}
              </div>

              <button
                onClick={onOpenBooking}
                className="w-full py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>Pre-Register & Save Spot for {selectedTimeSlot === 'Now' ? 'Immediate Arrival' : selectedTimeSlot}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
