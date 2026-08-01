import React from 'react';
import { MapPin, Phone, Clock, Navigation, Car, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

export const LocationSection: React.FC = () => {
  return (
    <section id="location" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-red-50 text-red-700 text-xs font-bold uppercase tracking-wider border border-red-200">
            <MapPin className="w-3.5 h-3.5 text-red-600" /> Convenient Dallas Location
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Visit Our Walk-In Clinic in Central Dallas
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Located conveniently on North Central Expressway (US-75) with ample free patient parking directly outside the entrance.
          </p>
        </div>

        {/* Location Info & Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Contact Info & Hours Card */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-md flex flex-col justify-between space-y-6">
            
            <div className="space-y-6">
              
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                    Address
                  </span>
                  <p className="font-extrabold text-slate-900 text-lg leading-snug mt-0.5">
                    {CLINIC_INFO.address}
                  </p>
                  <p className="text-sm font-medium text-slate-600">
                    {CLINIC_INFO.cityStateZip}
                  </p>
                  <span className="inline-block mt-2 text-xs text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md font-medium">
                    Landmark: Near Knox-Henderson / US-75 Exit
                  </span>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="flex items-start gap-4 pt-4 border-t border-slate-100">
                <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                    Operating Hours
                  </span>
                  <p className="font-extrabold text-slate-900 text-base mt-0.5">
                    Monday – Sunday: 8:00 AM – 8:00 PM
                  </p>
                  <p className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> No Appointment Needed (365 Days/Year)
                  </p>
                </div>
              </div>

              {/* Phone & Urgent Desk */}
              <div className="flex items-start gap-4 pt-4 border-t border-slate-100">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                    Direct Clinic Phone
                  </span>
                  <a
                    href={`tel:${CLINIC_INFO.formattedPhone}`}
                    className="font-extrabold text-blue-600 text-xl hover:underline block mt-0.5"
                  >
                    {CLINIC_INFO.phone}
                  </a>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Call for current wait status, directions, or billing inquiries.
                  </p>
                </div>
              </div>

              {/* Parking details */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center gap-2.5">
                <Car className="w-4 h-4 text-blue-600 shrink-0" />
                <span>
                  <strong>Free Patient Parking:</strong> Dedicated ground-floor parking spots available right in front of Suite 110.
                </span>
              </div>

            </div>

            {/* Get Directions Button */}
            <a
              href={CLINIC_INFO.googleMapsDirUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Navigation className="w-4 h-4 text-teal-400" />
              <span>Get Driving Directions on Google Maps</span>
            </a>

          </div>

          {/* Right: Live Responsive Embedded Google Map */}
          <div className="lg:col-span-7 bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-md min-h-[380px] lg:min-h-full flex flex-col">
            <div className="bg-slate-900 text-white px-5 py-3 text-xs font-semibold flex items-center justify-between border-b border-slate-800">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                Apex Urgent Care — 4210 North Central Expy, Dallas, TX
              </span>
              <a
                href={CLINIC_INFO.googleMapsDirUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-400 hover:underline text-[11px]"
              >
                Open Full Map &rarr;
              </a>
            </div>

            <iframe
              title="Apex Urgent Care Dallas Location Map"
              src={CLINIC_INFO.googleMapsEmbedUrl}
              className="w-full h-full min-h-[350px] border-0 flex-1"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

        </div>

      </div>
    </section>
  );
};
