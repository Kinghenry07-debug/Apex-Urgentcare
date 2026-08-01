import React from 'react';
import { Star, Quote, CheckCircle2, MessageSquare, ThumbsUp } from 'lucide-react';
import { PATIENT_REVIEWS } from '../data/clinicData';

export const PatientReviews: React.FC = () => {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4 shadow-2xs">
            <MessageSquare className="w-4 h-4 text-blue-600" />
            <span>What Our Patients Say</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Trusted Care Recommended by Dallas Families
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            See how Apex Urgent Care &amp; Wellness provides fast, attentive, and compassionate medical care when sudden health needs arise.
          </p>

          {/* Aggregate Rating Badge */}
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-3 px-5 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 stroke-amber-500" />
              ))}
            </div>
            <span className="text-sm font-bold text-slate-900">
              4.9 / 5.0 Star Average
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-xs font-medium text-slate-600">
              Over 450+ Verified Dallas Reviews
            </span>
          </div>
        </div>

        {/* Testimonials 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {PATIENT_REVIEWS.map((review, idx) => (
            <div
              key={idx}
              className="bg-slate-50/70 rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-blue-200 transition-all duration-200 flex flex-col justify-between relative group"
            >
              <div>
                {/* Quote Icon Background Accent */}
                <Quote className="w-10 h-10 text-blue-100 absolute top-5 right-5 group-hover:text-blue-200/80 transition-colors" />

                {/* Star Rating */}
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-500" />
                  ))}
                </div>

                {/* Patient Quote */}
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal relative z-10 italic mb-6">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>

              {/* Patient Meta Footer */}
              <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-1.5">
                    <span>{review.name}</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" title="Verified Patient" />
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {review.location}
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 px-2 py-1 rounded-md border border-teal-200/60 inline-block">
                    Verified Visit
                  </span>
                  <p className="text-[10px] text-slate-400 mt-1">{review.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
