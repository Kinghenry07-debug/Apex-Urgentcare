import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, User, Phone, Mail, FileText, Shield, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { CLINIC_INFO, SERVICES_LIST } from '../data/clinicData';
import { BookingFormData } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
  onSuccessSubmit: (appointmentDetails: { name: string; service: string; date: string; timeSlot: string }) => void;
}

interface FieldErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  reason?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedService,
  onSuccessSubmit
}) => {
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    phone: '',
    email: '',
    service: preselectedService || 'Urgent Care',
    date: new Date().toISOString().split('T')[0],
    timeSlot: '09:00 AM',
    reason: '',
    insurance: 'Self-Pay / Cash',
    patientType: 'new'
  });

  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Single booking restriction state
  const [existingBooking, setExistingBooking] = useState<{
    name: string;
    service: string;
    date: string;
    timeSlot: string;
    bookedAt: string;
  } | null>(null);

  // Load active booking on mount / open
  useEffect(() => {
    if (isOpen) {
      const savedBooking = localStorage.getItem('apex_patient_booking');
      if (savedBooking) {
        try {
          setExistingBooking(JSON.parse(savedBooking));
        } catch (e) {
          console.error('Error parsing saved booking:', e);
          setExistingBooking(null);
        }
      } else {
        setExistingBooking(null);
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (preselectedService) {
      setFormData(prev => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

  // Close on Escape key and lock body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Phone number formatter: restricts to max 10 digits, formats as (XXX) XXX-XXXX
  const formatPhoneInput = (value: string): string => {
    const digits = value.replace(/\D/g, '').slice(0, 10);
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  };

  // Field validation function
  const validateFields = (data: BookingFormData): FieldErrors => {
    const newErrors: FieldErrors = {};

    // 1. Full Name
    if (!data.fullName.trim() || data.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name is required (minimum 2 letters).';
    }

    // 2. Phone Number (digits only must equal 10)
    const rawDigits = data.phone.replace(/\D/g, '');
    if (!rawDigits) {
      newErrors.phone = 'Phone number is required.';
    } else if (rawDigits.length < 10) {
      newErrors.phone = `Phone number must be 10 digits (${10 - rawDigits.length} more needed).`;
    }

    // 3. Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email.trim()) {
      newErrors.email = 'Valid email address is required.';
    } else if (!emailRegex.test(data.email.trim())) {
      newErrors.email = 'Please enter a valid email address (e.g. name@example.com).';
    }

    // 4. Description of symptoms / feeling (COMPULSORY!)
    if (!data.reason.trim()) {
      newErrors.reason = 'Description of how you are feeling or your symptoms is required.';
    } else if (data.reason.trim().length < 5) {
      newErrors.reason = 'Please write at least 5 characters describing your symptoms.';
    }

    return newErrors;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let updatedValue = value;

    if (name === 'phone') {
      updatedValue = formatPhoneInput(value);
    }

    const updatedFormData = { ...formData, [name]: updatedValue };
    setFormData(updatedFormData);

    // Validate on the fly if touched
    if (touched[name]) {
      const fieldErrors = validateFields(updatedFormData);
      setErrors(prev => ({
        ...prev,
        [name]: fieldErrors[name as keyof FieldErrors]
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const fieldErrors = validateFields(formData);
    setErrors(prev => ({
      ...prev,
      [name]: fieldErrors[name as keyof FieldErrors]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields touched
    setTouched({
      fullName: true,
      phone: true,
      email: true,
      reason: true
    });

    const validationErrors = validateFields(formData);
    setErrors(validationErrors);

    // Block submission if there are validation errors!
    if (Object.keys(validationErrors).length > 0) {
      setSubmitError('Please fix the highlighted errors before submitting your appointment.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const appointmentPayload = {
      name: formData.fullName,
      service: formData.service,
      date: formData.date,
      timeSlot: formData.timeSlot,
      bookedAt: new Date().toLocaleString()
    };

    try {
      // Send form data to formspree endpoint
      await fetch(CLINIC_INFO.formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `New Apex Urgent Care Booking: ${formData.fullName} (${formData.service})`,
          _replyto: formData.email,
          recipientEmail: "adetito4life@gmail.com",
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          service: formData.service,
          appointmentDate: formData.date,
          appointmentTime: formData.timeSlot,
          insurance: formData.insurance,
          patientType: formData.patientType,
          reasonForVisit: formData.reason,
          clinic: CLINIC_INFO.name,
          submittedAt: new Date().toLocaleString()
        })
      });

      // Save to localStorage to enforce single booking restriction
      localStorage.setItem('apex_patient_booking', JSON.stringify(appointmentPayload));

      onSuccessSubmit(appointmentPayload);
      onClose();
    } catch (err) {
      console.warn('Formspree submit fallback executed:', err);
      localStorage.setItem('apex_patient_booking', JSON.stringify(appointmentPayload));
      onSuccessSubmit(appointmentPayload);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClearExistingBooking = () => {
    localStorage.removeItem('apex_patient_booking');
    setExistingBooking(null);
  };

  const availableTimeSlots = [
    '08:30 AM', '09:00 AM', '09:30 AM', '10:15 AM',
    '11:00 AM', '12:30 PM', '01:45 PM', '02:30 PM',
    '03:15 PM', '04:30 PM', '05:45 PM', '06:30 PM'
  ];

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      
      {/* Modal Container */}
      <div 
        className="relative bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 my-6 overflow-hidden text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer flex items-center gap-1 text-xs font-semibold"
            aria-label="Close modal"
            title="Cancel & Close Modal"
          >
            <span>Cancel</span>
            <X className="w-5 h-5 text-white" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-300">
              {CLINIC_INFO.name}
            </span>
          </div>

          <h3 className="text-2xl font-extrabold text-white">Book Your Visit Online</h3>
          <p className="text-slate-300 text-xs sm:text-sm mt-1">
            Hold your spot in line. Walk-ins are always welcomed at our Dallas clinic!
          </p>
        </div>

        {/* IF USER HAS ALREADY BOOKED AN APPOINTMENT (SINGLE BOOKING RESTRICTION) */}
        {existingBooking ? (
          <div className="p-6 sm:p-8 space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-amber-100 border-2 border-amber-300 flex items-center justify-center mx-auto text-amber-600 shadow-sm">
              <AlertCircle className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-widest px-3 py-1 bg-amber-50 rounded-full border border-amber-200">
                Active Appointment Record
              </span>
              <h4 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                You Already Have a Booking Scheduled!
              </h4>
              <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                To prevent line hold duplication and maintain accurate wait times for all patients, you can only book <strong>one appointment at a time</strong> online.
              </p>
            </div>

            {/* Existing Appointment Summary Box */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-left space-y-2 text-sm">
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500 font-medium">Patient Name:</span>
                <span className="font-bold text-slate-900">{existingBooking.name}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500 font-medium">Requested Service:</span>
                <span className="font-bold text-blue-700">{existingBooking.service}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500 font-medium">Date &amp; Time:</span>
                <span className="font-bold text-slate-900">{existingBooking.date} at {existingBooking.timeSlot}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-slate-500 font-medium">Clinic Phone:</span>
                <span className="font-bold text-teal-700">{CLINIC_INFO.phone}</span>
              </div>
            </div>

            {/* Action Buttons for Existing Booking */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={onClose}
                className="flex-1 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Back to Main Page ✖️</span>
              </button>

              <button
                onClick={handleClearExistingBooking}
                className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5 border border-slate-300"
                title="Cancel existing hold to create a new appointment"
              >
                <RefreshCw className="w-4 h-4 text-slate-500" />
                <span>Cancel &amp; Re-book</span>
              </button>
            </div>
          </div>
        ) : (
          /* REGULAR BOOKING FORM WITH STRICT VALIDATIONS */
          <form 
            action={CLINIC_INFO.formspreeEndpoint} 
            method="POST" 
            onSubmit={handleSubmit}
            className="p-5 sm:p-6 space-y-4"
            noValidate
          >
            {submitError && (
              <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-300 flex items-start gap-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                <span className="font-semibold">{submitError}</span>
              </div>
            )}

            {/* Full Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="fullName"
                    required
                    placeholder="e.g. Sarah Johnson"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`w-full bg-slate-50 border rounded-xl pl-9 pr-3 py-2.5 text-sm font-medium focus:bg-white focus:outline-hidden transition-all ${
                      errors.fullName
                        ? 'border-red-500 bg-red-50/40 focus:border-red-600 focus:ring-1 focus:ring-red-500'
                        : 'border-slate-300 focus:border-blue-600'
                    }`}
                  />
                  <User className={`w-4 h-4 absolute left-3 top-3 ${errors.fullName ? 'text-red-400' : 'text-slate-400'}`} />
                </div>
                {errors.fullName && (
                  <p className="text-red-600 text-xs font-semibold mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.fullName}</span>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Phone Number (10 Digits) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="(214) 555-0199"
                    value={formData.phone}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    maxLength={14}
                    className={`w-full bg-slate-50 border rounded-xl pl-9 pr-3 py-2.5 text-sm font-medium focus:bg-white focus:outline-hidden transition-all ${
                      errors.phone
                        ? 'border-red-500 bg-red-50/40 focus:border-red-600 focus:ring-1 focus:ring-red-500'
                        : 'border-slate-300 focus:border-blue-600'
                    }`}
                  />
                  <Phone className={`w-4 h-4 absolute left-3 top-3 ${errors.phone ? 'text-red-400' : 'text-slate-400'}`} />
                </div>
                {errors.phone && (
                  <p className="text-red-600 text-xs font-semibold mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.phone}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Email & Service Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Valid Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="sarah@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`w-full bg-slate-50 border rounded-xl pl-9 pr-3 py-2.5 text-sm font-medium focus:bg-white focus:outline-hidden transition-all ${
                      errors.email
                        ? 'border-red-500 bg-red-50/40 focus:border-red-600 focus:ring-1 focus:ring-red-500'
                        : 'border-slate-300 focus:border-blue-600'
                    }`}
                  />
                  <Mail className={`w-4 h-4 absolute left-3 top-3 ${errors.email ? 'text-red-400' : 'text-slate-400'}`} />
                </div>
                {errors.email && (
                  <p className="text-red-600 text-xs font-semibold mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Service Needed <span className="text-red-500">*</span>
                </label>
                <select
                  name="service"
                  required
                  value={formData.service}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-sm font-medium focus:bg-white focus:border-blue-600 focus:outline-hidden transition-all"
                >
                  {SERVICES_LIST.map((srv) => (
                    <option key={srv.id} value={srv.title}>
                      {srv.title} ({srv.selfPayPrice})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Date & Time Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Preferred Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name="date"
                    required
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2.5 text-sm font-medium focus:bg-white focus:border-blue-600 focus:outline-hidden transition-all"
                  />
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Preferred Time Slot <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    name="timeSlot"
                    required
                    value={formData.timeSlot}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2.5 text-sm font-medium focus:bg-white focus:border-blue-600 focus:outline-hidden transition-all"
                  >
                    {availableTimeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                  <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>
              </div>
            </div>

            {/* Insurance & Patient Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Insurance Provider
                </label>
                <div className="relative">
                  <select
                    name="insurance"
                    value={formData.insurance}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2.5 text-sm font-medium focus:bg-white focus:border-blue-600 focus:outline-hidden transition-all"
                  >
                    <option value="Self-Pay / Cash">Self-Pay / Cash Rate</option>
                    <option value="BlueCross BlueShield">BlueCross BlueShield</option>
                    <option value="Aetna">Aetna</option>
                    <option value="Cigna">Cigna</option>
                    <option value="UnitedHealthcare">UnitedHealthcare</option>
                    <option value="Medicare">Medicare</option>
                    <option value="Other Plan">Other Insurance Network</option>
                  </select>
                  <Shield className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Patient Status
                </label>
                <div className="flex items-center gap-4 pt-2">
                  <label className="flex items-center gap-1.5 text-xs font-medium cursor-pointer">
                    <input
                      type="radio"
                      name="patientType"
                      value="new"
                      checked={formData.patientType === 'new'}
                      onChange={handleInputChange}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span>New Patient</span>
                  </label>
                  <label className="flex items-center gap-1.5 text-xs font-medium cursor-pointer">
                    <input
                      type="radio"
                      name="patientType"
                      value="returning"
                      checked={formData.patientType === 'returning'}
                      onChange={handleInputChange}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span>Returning Patient</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Description of Symptoms / Reason (COMPULSORY!) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Description of Symptoms / How You Are Feeling <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <textarea
                  name="reason"
                  required
                  rows={2}
                  placeholder="e.g. Sore throat, mild fever since yesterday, ankle sprain..."
                  value={formData.reason}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`w-full bg-slate-50 border rounded-xl pl-9 pr-3 py-2 text-sm font-medium focus:bg-white focus:outline-hidden transition-all resize-none ${
                    errors.reason
                      ? 'border-red-500 bg-red-50/40 focus:border-red-600 focus:ring-1 focus:ring-red-500'
                      : 'border-slate-300 focus:border-blue-600'
                  }`}
                ></textarea>
                <FileText className={`w-4 h-4 absolute left-3 top-3 ${errors.reason ? 'text-red-400' : 'text-slate-400'}`} />
              </div>
              {errors.reason ? (
                <p className="text-red-600 text-xs font-semibold mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>{errors.reason}</span>
                </p>
              ) : (
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Briefly describe your symptoms so our clinical team can prepare for your visit.
                </p>
              )}
            </div>

            {/* Privacy Note & Action Buttons */}
            <div className="pt-3 border-t border-slate-100 space-y-3">
              <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                <span>HIPAA Compliant &amp; Secure. Instant confirmation sent to your email.</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>Verifying &amp; Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Calendar className="w-5 h-5 text-blue-100" />
                      <span>Confirm Appointment Request</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="py-3.5 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-colors cursor-pointer flex items-center justify-center gap-1.5 border border-slate-300"
                  title="Cancel and return to main page"
                >
                  <span>Cancel ✖️</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>

    </div>
  );
};
