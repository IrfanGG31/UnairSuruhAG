import React from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Truck,
  Car,
  Bike,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function ServiceDetailModal() {
  const { selectedService, setSelectedService, setIsOrderModalOpen } = useApp();

  if (!selectedService) return null;

  const handleBook = () => {
    setIsOrderModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-[#005BAC] text-white p-6 relative">
          <button
            onClick={() => setSelectedService(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full">
              {selectedService.category}
            </span>
            {selectedService.genderSensitive && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold bg-emerald-500/30 text-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-400/40">
                <ShieldCheck className="w-3.5 h-3.5" />
                Kesesuaian Gender Kamar Kos
              </span>
            )}
          </div>

          <h3 className="text-2xl font-black">{selectedService.name}</h3>
          <p className="text-sm text-blue-100 mt-1">{selectedService.tagline}</p>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Overview */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2">
              Deskripsi Layanan
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              {selectedService.description}
            </p>
          </div>

          {/* Subservices & Pricing Table */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2">
              Daftar Sub-Layanan & Tarif Mulai
            </h4>
            <div className="border border-slate-200 rounded-xl divide-y divide-slate-100 overflow-hidden">
              {selectedService.subServices?.map((sub, idx) => (
                <div key={idx} className="p-3 flex items-center justify-between text-xs sm:text-sm bg-slate-50/50 hover:bg-slate-50">
                  <span className="font-semibold text-slate-800">{sub.name}</span>
                  <span className="font-black text-[#005BAC] shrink-0 ml-2">
                    Rp{sub.price.toLocaleString('id-ID')}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 mt-1.5 italic">
              *Harga final ditentukan dalam Digital Akad sebelum pengerjaan dimulai, disesuaikan dengan volume/jarak.
            </p>
          </div>

          {/* What is Included & Not Included */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4">
              <h5 className="text-xs font-bold text-emerald-900 flex items-center gap-1.5 mb-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Sudah Termasuk (Included):
              </h5>
              <ul className="space-y-1.5 text-xs text-emerald-950">
                {selectedService.included?.map((inc, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-rose-50/70 border border-rose-200 rounded-xl p-4">
              <h5 className="text-xs font-bold text-rose-900 flex items-center gap-1.5 mb-2.5">
                <XCircle className="w-4 h-4 text-rose-600" />
                Belum Termasuk / Catatan:
              </h5>
              <ul className="space-y-1.5 text-xs text-rose-950">
                {selectedService.notIncluded?.map((notInc, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-rose-600 font-bold">•</span>
                    <span>{notInc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Fleet info */}
          {selectedService.vehicles && (
            <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-xl text-xs text-blue-900">
              <Truck className="w-4 h-4 text-blue-600 shrink-0" />
              <span>
                <strong>Pilihan Armada:</strong> {selectedService.vehicles.join(', ')}
              </span>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <div>
            <span className="text-xs text-slate-500 block">Tarif Mulai Dari</span>
            <span className="text-xl font-black text-[#005BAC]">
              Rp{selectedService.startingPrice.toLocaleString('id-ID')}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedService(null)}
              className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-800 hover:bg-slate-200 rounded-xl transition-colors"
            >
              Tutup
            </button>
            <button
              onClick={handleBook}
              className="inline-flex items-center gap-2 bg-[#005BAC] hover:bg-[#004785] text-white text-xs font-extrabold px-5 py-2.5 rounded-xl shadow-md transition-colors"
            >
              <span>Pesan Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
