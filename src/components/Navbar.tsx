import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Phone, Menu, X, Calendar, Cross, MapPin, ShieldCheck, HelpCircle, Activity, Star } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Name */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-700 via-blue-600 to-teal-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
              <Cross className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 font-sans">
                  APEX
                </span>
                <span className="text-xs font-bold tracking-wider uppercase px-1.5 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-200/60">
                  Urgent Care
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 leading-tight">
                &amp; Wellness Dallas
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 font-medium text-sm text-slate-700">
            <a href="#services" className="hover:text-blue-600 transition-colors py-1">
              Services
            </a>
            <a href="#wait-times" className="hover:text-blue-600 transition-colors py-1 flex items-center gap-1">
              <span>Wait Times</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </a>
            <a href="#insurance" className="hover:text-blue-600 transition-colors py-1">
              Insurance
            </a>
            <a href="#testimonials" className="hover:text-blue-600 transition-colors py-1">
              Patient Reviews
            </a>
            <a href="#symptom-guide" className="hover:text-blue-600 transition-colors py-1">
              Care Guide
            </a>
            <a href="#location" className="hover:text-blue-600 transition-colors py-1">
              Location &amp; Hours
            </a>
            <a href="#faq" className="hover:text-blue-600 transition-colors py-1">
              FAQs
            </a>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${CLINIC_INFO.formattedPhone}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-300 text-slate-800 bg-white hover:bg-slate-50 font-semibold text-sm transition-all shadow-2xs hover:shadow-xs active:scale-[0.98]"
            >
              <Phone className="w-4 h-4 text-blue-600" />
              <span>Call Now</span>
            </a>

            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-all shadow-md shadow-blue-600/20 active:scale-[0.98] cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-blue-100" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={`tel:${CLINIC_INFO.formattedPhone}`}
              className="p-2 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors"
              aria-label="Call clinic"
            >
              <Phone className="w-5 h-5" />
            </a>

            <button
              onClick={toggleMobileMenu}
              type="button"
              className="p-2.5 rounded-lg text-slate-800 hover:bg-slate-100 focus:outline-hidden transition-colors cursor-pointer border border-slate-200"
              aria-label="Toggle navigation menu"
            >
              <Menu className="w-6 h-6 text-slate-900" />
            </button>
          </div>
        </div>
      </div>

      {/* Render Mobile Navigation Drawer via React Portal directly onto document.body */}
      {isMobileMenuOpen && createPortal(
        <div 
          className="fixed inset-0 z-[9999] bg-slate-950/80 backdrop-blur-xs flex justify-end animate-in fade-in duration-200"
          onClick={closeMobileMenu}
        >
          <div 
            className="w-[85vw] max-w-sm bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 text-slate-900 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-200 bg-white shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs">
                  <Cross className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <span className="font-extrabold text-slate-900 text-base leading-none block">Apex Urgent Care</span>
                  <span className="text-[11px] text-teal-700 font-bold leading-none block mt-1">Dallas Clinic</span>
                </div>
              </div>

              <button
                onClick={closeMobileMenu}
                className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer flex items-center gap-1 text-xs font-bold"
                aria-label="Close menu"
              >
                <span>Close</span>
                <X className="w-5 h-5 text-slate-900" />
              </button>
            </div>

            {/* Drawer Scrollable Navigation Links */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-slate-50/50">
              <a
                href="#services"
                onClick={closeMobileMenu}
                className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 text-slate-900 font-bold text-sm transition-all shadow-2xs"
              >
                <Activity className="w-5 h-5 text-blue-600 shrink-0" />
                <span>Services &amp; Specialties</span>
              </a>

              <a
                href="#wait-times"
                onClick={closeMobileMenu}
                className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 text-slate-900 font-bold text-sm transition-all shadow-2xs"
              >
                <span className="w-3 h-3 rounded-full bg-emerald-500 shrink-0 animate-pulse"></span>
                <div className="flex flex-col">
                  <span>Live Wait Time Status</span>
                  <span className="text-[11px] font-semibold text-emerald-700">Approx. 15 mins</span>
                </div>
              </a>

              <a
                href="#insurance"
                onClick={closeMobileMenu}
                className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 text-slate-900 font-bold text-sm transition-all shadow-2xs"
              >
                <ShieldCheck className="w-5 h-5 text-teal-600 shrink-0" />
                <span>Insurance Accepted</span>
              </a>

              <a
                href="#testimonials"
                onClick={closeMobileMenu}
                className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 text-slate-900 font-bold text-sm transition-all shadow-2xs"
              >
                <Star className="w-5 h-5 text-amber-500 fill-amber-400 shrink-0" />
                <span>What Our Patients Say</span>
              </a>

              <a
                href="#symptom-guide"
                onClick={closeMobileMenu}
                className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 text-slate-900 font-bold text-sm transition-all shadow-2xs"
              >
                <Activity className="w-5 h-5 text-indigo-600 shrink-0" />
                <span>Care &amp; Symptom Guide</span>
              </a>

              <a
                href="#location"
                onClick={closeMobileMenu}
                className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 text-slate-900 font-bold text-sm transition-all shadow-2xs"
              >
                <MapPin className="w-5 h-5 text-red-500 shrink-0" />
                <span>Location &amp; Hours</span>
              </a>

              <a
                href="#faq"
                onClick={closeMobileMenu}
                className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 text-slate-900 font-bold text-sm transition-all shadow-2xs"
              >
                <HelpCircle className="w-5 h-5 text-slate-500 shrink-0" />
                <span>Frequently Asked Questions</span>
              </a>
            </div>

            {/* Bottom Actions Footer */}
            <div className="p-4 border-t border-slate-200 bg-white flex flex-col gap-2.5 shrink-0">
              <button
                onClick={() => {
                  closeMobileMenu();
                  onOpenBooking();
                }}
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm text-center shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Calendar className="w-5 h-5 text-blue-100" />
                <span>Book Appointment Online</span>
              </button>

              <a
                href={`tel:${CLINIC_INFO.formattedPhone}`}
                className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-center flex items-center justify-center gap-2 transition-colors text-xs sm:text-sm"
              >
                <Phone className="w-4 h-4 text-teal-400" />
                <span>Call Clinic {CLINIC_INFO.phone}</span>
              </a>

              <button
                onClick={closeMobileMenu}
                className="w-full py-2 text-xs font-extrabold text-slate-600 hover:text-slate-900 text-center transition-colors cursor-pointer border border-slate-200 rounded-lg bg-slate-50"
              >
                Cancel &amp; Close Menu ✖️
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
};

