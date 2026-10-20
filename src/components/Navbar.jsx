import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Menu,
  X,
  ShieldCheck,
  Search,
  UserPlus,
  LayoutDashboard,
  Calculator,
  MessageCircle,
  Sparkles
} from 'lucide-react';

export default function Navbar() {
  const {
    currentView,
    setCurrentView,
    setIsOrderModalOpen,
    setIsEstimatorOpen,
    setIsWorkerRegisterOpen,
    siteConfig
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigateTo = (view, sectionId = null) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    if (sectionId && view === 'home') {
      setTimeout(() => {
        const elem = document.getElementById(sectionId);
        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo & Identity */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => navigateTo('home')}
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#005BAC] to-[#007FEA] flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <span className="font-extrabold text-xl tracking-tight">US</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-slate-900">
                  UNAIR<span className="text-[#005BAC]">SURUH</span>
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  Syariah & Amanah
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block font-medium">
                Jasa On-Demand Mahasiswa Surabaya • {siteConfig.tiktokHandle}
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6">
            <button
              onClick={() => navigateTo('home')}
              className={`text-sm font-semibold transition-colors ${
                currentView === 'home'
                  ? 'text-[#005BAC]'
                  : 'text-slate-600 hover:text-[#005BAC]'
              }`}
            >
              Beranda
            </button>
            <button
              onClick={() => navigateTo('home', 'layanan')}
              className="text-sm font-semibold text-slate-600 hover:text-[#005BAC] transition-colors"
            >
              8 Layanan Care
            </button>
            <button
              onClick={() => setIsEstimatorOpen(true)}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-[#005BAC] transition-colors"
            >
              <Calculator className="w-4 h-4 text-amber-500" />
              Kalkulator Tarif
            </button>
            <button
              onClick={() => navigateTo('home', 'syariah')}
              className="text-sm font-semibold text-slate-600 hover:text-[#005BAC] transition-colors"
            >
              Prinsip Muamalah
            </button>
            <button
              onClick={() => navigateTo('track')}
              className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-colors ${
                currentView === 'track'
                  ? 'text-[#005BAC] bg-blue-50 px-3 py-1.5 rounded-lg'
                  : 'text-slate-600 hover:text-[#005BAC]'
              }`}
            >
              <Search className="w-4 h-4 text-blue-600" />
              Lacak Order & Akad
            </button>
            <button
              onClick={() => setIsWorkerRegisterOpen(true)}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors"
            >
              <UserPlus className="w-4 h-4 text-emerald-600" />
              Daftar Worker
            </button>
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => navigateTo('admin')}
              className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg border transition-all ${
                currentView === 'admin'
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : 'text-slate-700 bg-slate-100 hover:bg-slate-200 border-slate-200'
              }`}
              title="Masuk ke Panel Pengelola Web Admin"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-blue-500" />
              Web Admin
            </button>

            <button
              onClick={() => setIsOrderModalOpen(true)}
              className="inline-flex items-center gap-2 bg-[#005BAC] hover:bg-[#004785] text-white text-sm font-bold px-4 py-2.5 rounded-xl shadow-md shadow-blue-600/20 hover:shadow-lg transition-all active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              Pesan Sekarang
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setIsOrderModalOpen(true)}
              className="bg-[#005BAC] text-white text-xs font-bold px-3 py-2 rounded-lg"
            >
              Pesan
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top-2">
          <div className="grid grid-cols-2 gap-2 pb-2">
            <button
              onClick={() => {
                navigateTo('track');
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 bg-blue-50 text-[#005BAC] font-bold text-xs py-2.5 px-3 rounded-lg border border-blue-200"
            >
              <Search className="w-4 h-4" />
              Lacak Order
            </button>
            <button
              onClick={() => {
                setIsEstimatorOpen(true);
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 bg-amber-50 text-amber-800 font-bold text-xs py-2.5 px-3 rounded-lg border border-amber-200"
            >
              <Calculator className="w-4 h-4" />
              Kalkulator Tarif
            </button>
          </div>

          <div className="flex flex-col space-y-2">
            <button
              onClick={() => navigateTo('home')}
              className="text-left py-2 px-3 rounded-lg font-semibold text-slate-800 hover:bg-slate-50"
            >
              Beranda
            </button>
            <button
              onClick={() => navigateTo('home', 'layanan')}
              className="text-left py-2 px-3 rounded-lg font-semibold text-slate-800 hover:bg-slate-50"
            >
              8 Kategori Layanan Care
            </button>
            <button
              onClick={() => navigateTo('home', 'syariah')}
              className="text-left py-2 px-3 rounded-lg font-semibold text-slate-800 hover:bg-slate-50"
            >
              Prinsip Muamalah & Privasi Gender
            </button>
            <button
              onClick={() => navigateTo('home', 'testimoni')}
              className="text-left py-2 px-3 rounded-lg font-semibold text-slate-800 hover:bg-slate-50"
            >
              Testimoni TikTok & Review Mahasiswa
            </button>
            <button
              onClick={() => navigateTo('home', 'faq')}
              className="text-left py-2 px-3 rounded-lg font-semibold text-slate-800 hover:bg-slate-50"
            >
              Pertanyaan Umum (FAQ)
            </button>
            <button
              onClick={() => navigateTo('home', 'tim')}
              className="text-left py-2 px-3 rounded-lg font-semibold text-slate-800 hover:bg-slate-50"
            >
              Tim Manajemen Startup
            </button>
            <button
              onClick={() => {
                setIsWorkerRegisterOpen(true);
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 px-3 rounded-lg font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 flex items-center justify-between"
            >
              <span>Daftar Jadi Mitra Worker</span>
              <UserPlus className="w-4 h-4 text-emerald-600" />
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                navigateTo('admin');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center justify-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4 text-blue-400" />
              Masuk Web Admin Pengelola
            </button>
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent('Halo Admin @unair_suruh, saya ingin konsultasi jasa...')}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Chat WhatsApp Admin ({siteConfig.whatsappDisplay})
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
