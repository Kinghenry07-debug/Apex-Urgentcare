import React, { useState } from 'react';
import { ShieldCheck, Search, Check, HelpCircle, AlertCircle } from 'lucide-react';
import { INSURANCE_PROVIDERS, CLINIC_INFO } from '../data/clinicData';

export const InsuranceBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Commercial' | 'Government'>('All');

  const filteredInsurance = INSURANCE_PROVIDERS.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          provider.logoText.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || provider.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="insurance" className="py-14 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider border border-blue-100">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" /> In-Network Protection
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            We Accept Most Major Insurance Plans
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Apex Urgent Care partners with top insurance networks so you pay standard in-network copays. Self-pay options also available.
          </p>
        </div>

        {/* Featured Big 4 Insurance Logos Bar (BlueCross, Aetna, Cigna, UnitedHealthcare) */}
        <div className="mb-12">
          <p className="text-center text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">
            Featured In-Network Partners
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            
            {/* BlueCross BlueShield */}
            <div className="bg-slate-50 hover:bg-slate-100/80 p-5 rounded-xl border border-slate-200 transition-all flex flex-col items-center justify-center text-center group cursor-pointer shadow-2xs">
              <div className="w-12 h-12 rounded-full bg-blue-100/80 flex items-center justify-center text-blue-700 font-black text-lg mb-2 group-hover:scale-110 transition-transform">
                BCBS
              </div>
              <span className="font-extrabold text-slate-900 text-sm">BlueCross BlueShield</span>
              <span className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                <Check className="w-3 h-3" /> In-Network PPO/HMO
              </span>
            </div>

            {/* Aetna */}
            <div className="bg-slate-50 hover:bg-slate-100/80 p-5 rounded-xl border border-slate-200 transition-all flex flex-col items-center justify-center text-center group cursor-pointer shadow-2xs">
              <div className="w-12 h-12 rounded-full bg-red-100/80 flex items-center justify-center text-red-700 font-black text-lg mb-2 group-hover:scale-110 transition-transform">
                AETNA
              </div>
              <span className="font-extrabold text-slate-900 text-sm">Aetna Health</span>
              <span className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                <Check className="w-3 h-3" /> Commercial In-Network
              </span>
            </div>

            {/* Cigna */}
            <div className="bg-slate-50 hover:bg-slate-100/80 p-5 rounded-xl border border-slate-200 transition-all flex flex-col items-center justify-center text-center group cursor-pointer shadow-2xs">
              <div className="w-12 h-12 rounded-full bg-teal-100/80 flex items-center justify-center text-teal-700 font-black text-lg mb-2 group-hover:scale-110 transition-transform">
                CIGNA
              </div>
              <span className="font-extrabold text-slate-900 text-sm">Cigna Healthcare</span>
              <span className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                <Check className="w-3 h-3" /> Open Access Accepted
              </span>
            </div>

            {/* UnitedHealthcare */}
            <div className="bg-slate-50 hover:bg-slate-100/80 p-5 rounded-xl border border-slate-200 transition-all flex flex-col items-center justify-center text-center group cursor-pointer shadow-2xs">
              <div className="w-12 h-12 rounded-full bg-amber-100/80 flex items-center justify-center text-amber-800 font-black text-lg mb-2 group-hover:scale-110 transition-transform">
                UHC
              </div>
              <span className="font-extrabold text-slate-900 text-sm">UnitedHealthcare</span>
              <span className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                <Check className="w-3 h-3" /> All TX Plans Covered
              </span>
            </div>

          </div>
        </div>

        {/* Interactive Insurance Provider Search & Checker */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Search className="w-5 h-5 text-teal-400" /> Check Your Insurance Plan
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Type your insurance provider below to verify network status in real time.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative min-w-[280px]">
              <input
                type="text"
                placeholder="Search plan (e.g. BCBS, Medicare, Humana)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-hidden focus:border-teal-400 transition-colors"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          {/* Search Filtered Results Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredInsurance.length > 0 ? (
              filteredInsurance.map((ins, idx) => (
                <div key={idx} className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/70 flex items-start justify-between gap-3">
                  <div>
                    <span className="font-bold text-sm text-white block">{ins.name}</span>
                    <span className="text-xs text-slate-300 block mt-0.5">{ins.notes}</span>
                  </div>
                  <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0">
                    ACCEPTED
                  </span>
                </div>
              ))
            ) : (
              <div className="col-span-full py-6 text-center bg-slate-800/40 rounded-xl">
                <AlertCircle className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-200">Plan not listed in search results?</p>
                <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                  We accept many regional and secondary plans! Call our billing desk at <a href={`tel:${CLINIC_INFO.formattedPhone}`} className="text-teal-400 underline">{CLINIC_INFO.phone}</a> for instant coverage confirmation.
                </p>
              </div>
            )}
          </div>

          {/* Self-Pay Disclaimer Notice */}
          <div className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-teal-400 shrink-0" />
              <span>Uninsured or high deductible? We offer transparent self-pay flat rates starting at $120.</span>
            </div>
            <a href={`tel:${CLINIC_INFO.formattedPhone}`} className="text-teal-400 font-semibold hover:underline shrink-0">
              Inquire About Cash Pricing &rarr;
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
