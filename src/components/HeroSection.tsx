import React from 'react';
import { Calendar, Phone, Clock, ShieldCheck, MapPin, CheckCircle2, ArrowRight, Activity, Zap } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface HeroSectionProps {
  onOpenBooking: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white pt-12 pb-20 lg:pt-16 lg:pb-28">
      {/* Decorative background grid and soft color glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-teal-500/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Tagline, Value Props & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/90 border border-slate-700/80 text-slate-200 text-xs sm:text-sm font-medium backdrop-blur-xs">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-teal-300 font-semibold">Walk-Ins Welcome</span>
              <span className="text-slate-500">•</span>
              <span>Average Wait &lt; 15 Mins</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
              {CLINIC_INFO.tagline}
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Dallas’s trusted walk-in clinic for immediate medical care, digital X-rays, lab testing, and pediatric care. No appointment needed—just walk in or save your spot online.
            </p>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 max-w-lg mx-auto lg:mx-0 text-left">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200 bg-slate-800/50 p-2.5 rounded-lg border border-slate-700/50">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>In-House Digital X-Ray</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200 bg-slate-800/50 p-2.5 rounded-lg border border-slate-700/50">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Major Insurances</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200 bg-slate-800/50 p-2.5 rounded-lg border border-slate-700/50 col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Open 7 Days a Week</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-base transition-all shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2.5 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <Calendar className="w-5 h-5 text-blue-100" />
                <span>Book Online Now</span>
                <ArrowRight className="w-4 h-4 opacity-80" />
              </button>

              <a
                href={`tel:${CLINIC_INFO.formattedPhone}`}
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-base transition-all border border-slate-700 flex items-center justify-center gap-2.5 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Phone className="w-5 h-5 text-teal-400" />
                <span>Call Clinic: {CLINIC_INFO.phone}</span>
              </a>
            </div>

            {/* Address snippet */}
            <div className="flex items-center justify-center lg:justify-start gap-2 text-xs text-slate-400 pt-1">
              <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <span>{CLINIC_INFO.fullAddress}</span>
            </div>
          </div>

          {/* Right Column: Live Clinic Wait Time & Spot Holder Card */}
          <div className="lg:col-span-5">
            <div className="relative bg-slate-800/90 rounded-2xl p-6 sm:p-8 border border-slate-700/80 shadow-2xl backdrop-blur-md">
              <div className="absolute -top-3 right-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 fill-current" /> Live Wait Status
              </div>

              <div className="space-y-6">
                
                {/* Wait time display */}
                <div className="text-center pb-5 border-b border-slate-700">
                  <span className="text-xs uppercase font-semibold text-slate-400 tracking-wider">
                    Estimated Door-to-Doctor Wait
                  </span>
                  <div className="flex items-baseline justify-center gap-2 mt-2">
                    <span className="text-5xl font-extrabold text-white font-mono tracking-tight">
                      {CLINIC_INFO.currentWaitMinutes}
                    </span>
                    <span className="text-2xl font-bold text-emerald-400">Minutes</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 flex items-center justify-center gap-1">
                    <Activity className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
                    Updated 2 minutes ago — 4 providers on staff
                  </p>
                </div>

                {/* Quick Info Grid */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm py-2 px-3 bg-slate-900/60 rounded-lg border border-slate-700/50">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Clock className="w-4 h-4 text-teal-400" />
                      <span>Today's Hours</span>
                    </div>
                    <span className="font-semibold text-white">8:00 AM – 8:00 PM</span>
                  </div>

                  <div className="flex items-center justify-between text-sm py-2 px-3 bg-slate-900/60 rounded-lg border border-slate-700/50">
                    <div className="flex items-center gap-2 text-slate-300">
                      <ShieldCheck className="w-4 h-4 text-blue-400" />
                      <span>Insurance Verification</span>
                    </div>
                    <span className="font-semibold text-teal-300">In-Network Available</span>
                  </div>

                  <div className="flex items-center justify-between text-sm py-2 px-3 bg-slate-900/60 rounded-lg border border-slate-700/50">
                    <div className="flex items-center gap-2 text-slate-300">
                      <MapPin className="w-4 h-4 text-red-400" />
                      <span>Location</span>
                    </div>
                    <span className="font-semibold text-white">Central Expy / Dallas</span>
                  </div>
                </div>

                {/* Fast Action inside card */}
                <div className="pt-2">
                  <button
                    onClick={onOpenBooking}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Save Your Spot In Line Now</span>
                  </button>
                  <p className="text-[11px] text-center text-slate-400 mt-2">
                    No upfront payment required to hold a spot. Walk-ins always welcome!
                  </p>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
