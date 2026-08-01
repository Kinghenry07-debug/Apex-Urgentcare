import React, { useState } from 'react';
import { TopNotificationBar } from './components/TopNotificationBar';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { InsuranceBar } from './components/InsuranceBar';
import { ServicesGrid } from './components/ServicesGrid';
import { WaitTimeEstimator } from './components/WaitTimeEstimator';
import { SymptomGuide } from './components/SymptomGuide';
import { PatientReviews } from './components/PatientReviews';
import { FaqAccordion } from './components/FaqAccordion';
import { LocationSection } from './components/LocationSection';
import { BookingModal } from './components/BookingModal';
import { ToastNotification } from './components/ToastNotification';
import { Footer } from './components/Footer';
import { FloatingMobileBar } from './components/FloatingMobileBar';

export default function App() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string>('Urgent Care');
  
  // Toast state
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [toastDetails, setToastDetails] = useState<{
    name: string;
    service: string;
    date: string;
    timeSlot: string;
  } | null>(null);

  const handleOpenBooking = (serviceTitle?: string) => {
    if (serviceTitle) {
      setPreselectedService(serviceTitle);
    }
    setIsBookingModalOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingModalOpen(false);
  };

  const handleSuccessSubmit = (appointmentDetails: {
    name: string;
    service: string;
    date: string;
    timeSlot: string;
  }) => {
    setToastDetails(appointmentDetails);
    setIsToastVisible(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-teal-500 selection:text-white">
      {/* Top Notification Bar */}
      <TopNotificationBar onOpenBooking={() => handleOpenBooking('Urgent Care')} />

      {/* Header & Navigation */}
      <Navbar onOpenBooking={() => handleOpenBooking('Urgent Care')} />

      {/* Main Page Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection onOpenBooking={() => handleOpenBooking('Urgent Care')} />

        {/* Insurance Bar & Checker */}
        <InsuranceBar />

        {/* Services Grid (6 Services) */}
        <ServicesGrid onSelectServiceToBook={(srv) => handleOpenBooking(srv)} />

        {/* Live Wait Time Monitor */}
        <WaitTimeEstimator onOpenBooking={() => handleOpenBooking('Urgent Care')} />

        {/* Patient Care Triage Guide */}
        <SymptomGuide onOpenBooking={() => handleOpenBooking('Urgent Care')} />

        {/* What Our Patients Say - Testimonial Section */}
        <PatientReviews />

        {/* Location & Embedded Google Map */}
        <LocationSection />

        {/* FAQ Accordion */}
        <FaqAccordion />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Bottom Bar for Mobile */}
      <FloatingMobileBar onOpenBooking={() => handleOpenBooking('Urgent Care')} />

      {/* Interactive Booking Popup Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={handleCloseBooking}
        preselectedService={preselectedService}
        onSuccessSubmit={handleSuccessSubmit}
      />

      {/* Success Submission Toast Notification */}
      <ToastNotification
        isVisible={isToastVisible}
        onClose={() => setIsToastVisible(false)}
        details={toastDetails}
      />
    </div>
  );
}
