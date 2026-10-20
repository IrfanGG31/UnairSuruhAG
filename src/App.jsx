import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import PromoBanner from './components/PromoBanner';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import ServiceDetailModal from './components/ServiceDetailModal';
import PriceEstimatorModal from './components/PriceEstimatorModal';
import OrderModal from './components/OrderModal';
import SyariahValuesSection from './components/SyariahValuesSection';
import WorkflowSection from './components/WorkflowSection';
import TrackOrderSection from './components/TrackOrderSection';
import WorkerRegistrationModal from './components/WorkerRegistrationModal';
import SocialProofSection from './components/SocialProofSection';
import FaqSection from './components/FaqSection';
import TeamSection from './components/TeamSection';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import { CheckCircle2, AlertCircle, Info, Sparkles } from 'lucide-react';

function MainLayout() {
  const { currentView, toast } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-[#005BAC] selection:text-white">
      {/* Toast Notification Alert */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300 max-w-sm">
          <div
            className={`p-4 rounded-2xl shadow-2xl border flex items-start gap-3 backdrop-blur-md ${
              toast.type === 'error'
                ? 'bg-rose-900/90 text-white border-rose-700'
                : toast.type === 'info'
                ? 'bg-blue-900/90 text-white border-blue-700'
                : 'bg-slate-900/95 text-white border-slate-700'
            }`}
          >
            {toast.type === 'error' ? (
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            ) : toast.type === 'info' ? (
              <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            )}
            <p className="text-xs font-semibold leading-relaxed">{toast.message}</p>
          </div>
        </div>
      )}

      {/* View Switcher */}
      {currentView === 'admin' ? (
        <AdminDashboard />
      ) : currentView === 'track' ? (
        <>
          <Navbar />
          <TrackOrderSection />
          <Footer />
        </>
      ) : (
        <>
          <PromoBanner />
          <Navbar />
          <main className="flex-1">
            <HeroSection />
            <ServicesSection />
            <WorkflowSection />
            <SyariahValuesSection />
            <SocialProofSection />
            <TeamSection />
            <FaqSection />
          </main>
          <Footer />
        </>
      )}

      {/* Global Modals */}
      <ServiceDetailModal />
      <PriceEstimatorModal />
      <OrderModal />
      <WorkerRegistrationModal />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
