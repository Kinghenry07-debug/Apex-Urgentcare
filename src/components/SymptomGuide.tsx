import React from 'react';
import { HelpCircle, Stethoscope, AlertTriangle, Video, ArrowRight, Check } from 'lucide-react';
import { CARE_COMPARISON } from '../data/clinicData';

interface SymptomGuideProps {
  onOpenBooking: () => void;
}

export const SymptomGuide: React.FC<SymptomGuideProps> = ({ onOpenBooking }) => {
  return (
    <section id="symptom-guide" className="py-16 bg-slate-100/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-blue-700" /> Patient Care Triage Guide
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Urgent Care vs. ER vs. Telehealth
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Not sure where to seek care? Knowing the difference can save you hours of waiting time and thousands of dollars in medical fees.
          </p>
        </div>

        {/* 3 Comparison Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Apex Urgent Care (Highlighted) */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-blue-600 shadow-xl relative flex flex-col justify-between">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white font-extrabold text-xs px-4 py-1 rounded-full uppercase tracking-wider shadow-sm">
              ★ Best For Non-Life-Threatening Illness & Injuries
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4 pt-2">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Apex Urgent Care</h3>
                  <p className="text-xs font-semibold text-teal-600">Walk-In Clinic & On-Site Labs/X-Ray</p>
                </div>
              </div>

              <p className="text-xs text-slate-600 mb-6 leading-relaxed">
                Ideal for sudden illnesses, cuts requiring stitches, broken bones, sinus pain, strep, earaches, and physicals.
              </p>

              <div className="space-y-3 text-xs border-t border-slate-100 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Average Wait Time:</span>
                  <span className="font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">10 – 15 Minutes</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Estimated Cost:</span>
                  <span className="font-bold text-slate-900">Standard Copay / $120 Flat</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Appointments Needed:</span>
                  <span className="font-bold text-slate-900">No (Walk-ins Welcome)</span>
                </div>
              </div>
            </div>

            <button
              onClick={onOpenBooking}
              className="mt-6 w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Walk-In or Save Spot</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 2: Emergency Room (ER) */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-red-100 text-red-700 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Emergency Room (ER)</h3>
                  <p className="text-xs font-semibold text-red-600">Life-Threatening Trauma</p>
                </div>
              </div>

              <p className="text-xs text-slate-600 mb-6 leading-relaxed">
                Reserved strictly for severe chest pain, stroke, major blood loss, difficulty breathing, or catastrophic injury.
              </p>

              <div className="space-y-3 text-xs border-t border-slate-100 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Average Wait Time:</span>
                  <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">2 – 4+ Hours</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Estimated Cost:</span>
                  <span className="font-bold text-red-600">$1,500 – $5,000+ (High ER Fees)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Hours:</span>
                  <span className="font-bold text-slate-900">24/7 Triage</span>
                </div>
              </div>
            </div>

            <div className="mt-6 p-3 bg-red-50 text-red-800 text-xs rounded-xl border border-red-200 text-center font-medium">
              If experiencing severe chest pain or stroke symptoms, call 911 immediately.
            </div>
          </div>

          {/* Card 3: Virtual Telehealth */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center">
                  <Video className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Virtual Telehealth</h3>
                  <p className="text-xs font-semibold text-teal-600">Online Consultations From Home</p>
                </div>
              </div>

              <p className="text-xs text-slate-600 mb-6 leading-relaxed">
                Best for simple prescription refills, mild allergies, minor skin rashes, or follow-up consultations online.
              </p>

              <div className="space-y-3 text-xs border-t border-slate-100 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Average Connect Time:</span>
                  <span className="font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">Under 5 Minutes</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Estimated Cost:</span>
                  <span className="font-bold text-slate-900">$59 Flat Fee</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Prescription Refills:</span>
                  <span className="font-bold text-slate-900">Sent to Local Pharmacy</span>
                </div>
              </div>
            </div>

            <button
              onClick={onOpenBooking}
              className="mt-6 w-full py-3 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold text-sm transition-colors border border-teal-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Start Telehealth Visit</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
