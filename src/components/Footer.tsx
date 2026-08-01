import React from 'react';
import { Cross, Phone, MapPin, Clock, ShieldAlert, Heart } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-24 md:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand & Mission */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center text-white">
                <Cross className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                {CLINIC_INFO.name}
              </span>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md">
              {CLINIC_INFO.tagline} Apex Urgent Care provides walk-in medical services, digital X-rays, rapid lab testing, and pediatric care for families across Dallas, Texas.
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-400 pt-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Open 7 Days a Week: 8:00 AM – 8:00 PM</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Clinical Services
            </h4>
            <ul className="space-y-2 text-xs font-medium text-slate-400">
              <li><a href="#services" className="hover:text-white transition-colors">Urgent Medical Care</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Digital X-Rays & Rapid Labs</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Pediatric Care (6 mos+)</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Physicals & Wellness Exams</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Virtual Telehealth Visits</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Immunizations & Vaccines</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Dallas Clinic Contact
            </h4>
            
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{CLINIC_INFO.fullAddress}</span>
              </li>

              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <a href={`tel:${CLINIC_INFO.formattedPhone}`} className="font-bold text-white hover:underline">
                  {CLINIC_INFO.phone}
                </a>
              </li>

              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Mon – Sun: 8:00 AM – 8:00 PM</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Medical Emergency Disclaimer Notice */}
        <div className="mt-8 p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3 text-xs text-slate-400">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <p>
            <strong className="text-slate-200">Medical Emergency Disclaimer:</strong> Apex Urgent Care treats non-life-threatening medical conditions. If you are experiencing a life-threatening medical emergency—such as severe chest pain, shortness of breath, heavy uncontrolled bleeding, or stroke symptoms—please dial 911 immediately or go to the nearest hospital Emergency Room.
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Apex Urgent Care & Wellness. All rights reserved.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-current" />
            <span>for the Dallas Community</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
