import React, { useState } from 'react';
import { 
  Stethoscope, 
  Activity, 
  Baby, 
  ClipboardCheck, 
  Video, 
  Syringe, 
  Check, 
  Clock, 
  Tag, 
  ChevronRight,
  Sparkles 
} from 'lucide-react';
import { SERVICES_LIST } from '../data/clinicData';
import { ServiceItem } from '../types';

interface ServicesGridProps {
  onSelectServiceToBook: (serviceId: string) => void;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({ onSelectServiceToBook }) => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Stethoscope':
        return <Stethoscope className="w-6 h-6 text-blue-600" />;
      case 'Activity':
        return <Activity className="w-6 h-6 text-teal-600" />;
      case 'Baby':
        return <Baby className="w-6 h-6 text-indigo-600" />;
      case 'ClipboardCheck':
        return <ClipboardCheck className="w-6 h-6 text-blue-600" />;
      case 'Video':
        return <Video className="w-6 h-6 text-teal-600" />;
      case 'Syringe':
        return <Syringe className="w-6 h-6 text-indigo-600" />;
      default:
        return <Stethoscope className="w-6 h-6 text-blue-600" />;
    }
  };

  return (
    <section id="services" className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold uppercase tracking-wider border border-teal-200">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" /> Comprehensive Medical Care
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Comprehensive Urgent Care & Diagnostic Services
          </h2>
          <p className="text-slate-600 text-base">
            From emergency minor injury treatment to on-site digital imaging and telehealth, our medical team provides fast, expert care 7 days a week.
          </p>
        </div>

        {/* 6 Services Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_LIST.map((service: ServiceItem) => (
            <div
              key={service.id}
              className="group bg-white rounded-2xl p-7 border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-teal-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div>
                {/* Header Badge & Icon */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 group-hover:bg-blue-50 flex items-center justify-center transition-colors">
                    {renderIcon(service.iconName)}
                  </div>
                  {service.badge && (
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 group-hover:bg-teal-50 group-hover:text-teal-800 border border-slate-200 transition-colors">
                      {service.badge}
                    </span>
                  )}
                </div>

                {/* Service Title */}
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
                  {service.title}
                </h3>

                {/* Short Description */}
                <p className="text-slate-600 text-sm leading-relaxed mb-5">
                  {service.shortDesc}
                </p>

                {/* Key Treatments Treated List */}
                <div className="bg-slate-50/80 rounded-xl p-3.5 mb-6 border border-slate-100">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    Common Conditions Treated:
                  </span>
                  <ul className="grid grid-cols-1 gap-1.5 text-xs text-slate-700">
                    {service.commonTreatments.slice(0, 4).map((treatment, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                        <span>{treatment}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Footer info & Action */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <div className="flex flex-col text-xs text-slate-500">
                  <span className="flex items-center gap-1 text-slate-700 font-medium">
                    <Clock className="w-3.5 h-3.5 text-teal-600" /> {service.avgTime}
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-slate-900 mt-0.5">
                    <Tag className="w-3.5 h-3.5 text-blue-600" /> {service.selfPayPrice}
                  </span>
                </div>

                <button
                  onClick={() => onSelectServiceToBook(service.title)}
                  className="px-4 py-2 rounded-lg bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white font-bold text-xs transition-colors flex items-center gap-1 cursor-pointer group/btn"
                >
                  <span>Book Care</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Walk-in notice Banner below grid */}
        <div className="mt-12 bg-blue-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-lg font-bold text-white">Need treatment for an unlisted condition?</h4>
            <p className="text-sm text-blue-200">
              Our clinical staff evaluates almost all non-life-threatening health concerns. Walk in anytime between 8 AM and 8 PM!
            </p>
          </div>
          <button
            onClick={() => onSelectServiceToBook('Urgent Care')}
            className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm shrink-0 transition-colors shadow-md cursor-pointer"
          >
            Schedule Consultation
          </button>
        </div>

      </div>
    </section>
  );
};
