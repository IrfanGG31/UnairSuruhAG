import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Car,
  Truck,
  PackageCheck,
  Wrench,
  ShoppingBag,
  FileText,
  Users,
  GraduationCap,
  ArrowRight,
  ShieldCheck,
  Check,
  Sparkles,
  Info
} from 'lucide-react';

export default function ServicesSection() {
  const { services, setSelectedService, setIsOrderModalOpen } = useApp();
  const [activeFilter, setActiveFilter] = useState('ALL');

  // Map icon strings to Lucide components
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Car':
        return <Car className="w-6 h-6" />;
      case 'Truck':
        return <Truck className="w-6 h-6" />;
      case 'PackageCheck':
        return <PackageCheck className="w-6 h-6" />;
      case 'Wrench':
        return <Wrench className="w-6 h-6" />;
      case 'ShoppingBag':
        return <ShoppingBag className="w-6 h-6" />;
      case 'FileText':
        return <FileText className="w-6 h-6" />;
      case 'Users':
        return <Users className="w-6 h-6" />;
      case 'GraduationCap':
        return <GraduationCap className="w-6 h-6" />;
      default:
        return <Sparkles className="w-6 h-6" />;
    }
  };

  const filteredServices = services.filter((srv) => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'PINDAHAN' && (srv.id === 'move-care' || srv.id === 'keep-care')) return true;
    if (activeFilter === 'MOBILITAS' && srv.id === 'go-care') return true;
    if (activeFilter === 'HARIAN' && (srv.id === 'task-care' || srv.id === 'fix-care')) return true;
    if (activeFilter === 'KAMPUS' && (srv.id === 'desk-care' || srv.id === 'crew-care' || srv.id === 'talent-care')) return true;
    return true;
  });

  const handleBookNow = (service) => {
    setSelectedService(service);
    setIsOrderModalOpen(true);
  };

  const handleOpenDetail = (service) => {
    setSelectedService(service);
  };

  return (
    <section id="layanan" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-blue-50 text-[#005BAC] text-xs font-bold px-3 py-1 rounded-full border border-blue-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Ekosistem 8 Layanan Terpadu
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Katalog Layanan <span className="text-[#005BAC]">UNAIR SURUH</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Solusi satu pintu untuk semua urusan praktis anak kos, mahasiswa perantau, ormawa, hingga civitas akademika di Surabaya.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8 mb-12">
          {[
            { id: 'ALL', label: 'Semua Layanan (8 Care)' },
            { id: 'PINDAHAN', label: 'Pindahan & Simpan Barang' },
            { id: 'MOBILITAS', label: 'Antar Jemput Stasiun/Bandara' },
            { id: 'HARIAN', label: 'Titip Beli & Bantuan Teknis' },
            { id: 'KAMPUS', label: 'Dokumen Kampus, Event & Edukasi' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`text-xs sm:text-sm font-bold px-4 py-2 rounded-xl transition-all ${
                activeFilter === tab.id
                  ? 'bg-[#005BAC] text-white shadow-md shadow-blue-600/20'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 8 Care Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all flex flex-col justify-between group overflow-hidden"
            >
              {/* Card Top */}
              <div className="p-5 space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#005BAC] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#005BAC] group-hover:text-white transition-all shadow-xs">
                    {getIcon(service.icon)}
                  </div>
                  {service.badge && (
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-100 text-amber-800">
                      {service.badge}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="font-extrabold text-xl text-slate-900 group-hover:text-[#005BAC] transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500 mt-0.5">
                    {service.category}
                  </p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {service.description}
                </p>

                {/* Gender Sensitivity Tag */}
                {service.genderSensitive && (
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/60 w-full">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Kesesuaian Gender Kamar Kos</span>
                  </div>
                )}

                {/* Subservice Previews */}
                <div className="pt-2 border-t border-slate-100 space-y-1.5">
                  <p className="text-[11px] font-bold text-slate-700">Contoh Sub-Layanan:</p>
                  {service.subServices?.slice(0, 2).map((sub, idx) => (
                    <div key={idx} className="flex items-center justify-between text-[11px] text-slate-600">
                      <span className="truncate">• {sub.name}</span>
                      <span className="font-bold text-slate-900 shrink-0 ml-1">
                        Rp{sub.price.toLocaleString('id-ID')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-5 bg-slate-50/80 border-t border-slate-100 space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-slate-500 font-medium">Tarif Mulai</span>
                  <span className="text-lg font-black text-[#005BAC]">
                    Rp{service.startingPrice.toLocaleString('id-ID')}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleOpenDetail(service)}
                    className="inline-flex items-center justify-center gap-1 text-xs font-bold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 py-2 rounded-xl transition-colors"
                  >
                    <Info className="w-3.5 h-3.5" />
                    Detail
                  </button>

                  <button
                    onClick={() => handleBookNow(service)}
                    className="inline-flex items-center justify-center gap-1 text-xs font-bold text-white bg-[#005BAC] hover:bg-[#004785] py-2 rounded-xl shadow-xs transition-colors"
                  >
                    <span>Pesan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-12 bg-blue-50/60 rounded-2xl p-4 sm:p-6 border border-blue-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="font-extrabold text-sm sm:text-base text-slate-900">
              Punya urusan atau kebutuhan di luar 8 kategori ini?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600">
              Sesuai slogan bio kami: <strong className="text-slate-800">"BISA APA AJA (DM) !!!"</strong>. Konsultasikan langsung kebutuhan unikmu via WhatsApp.
            </p>
          </div>
          <a
            href="https://wa.me/6287767766011?text=Halo%20Admin%20UNAIR%20SURUH,%20saya%20punya%20kebutuhan%20jasa%20khusus..."
            target="_blank"
            rel="noreferrer"
            className="shrink-0 bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold px-5 py-2.5 rounded-xl transition-colors shadow-xs"
          >
            Konsultasi Custom via WA
          </a>
        </div>
      </div>
    </section>
  );
}
