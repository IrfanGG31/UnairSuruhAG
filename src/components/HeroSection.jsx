import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Truck,
  Car,
  Bike,
  Calculator,
  MessageCircle,
  Search,
  Users
} from 'lucide-react';

export default function HeroSection() {
  const {
    siteConfig,
    setIsOrderModalOpen,
    setIsEstimatorOpen,
    setCurrentView
  } = useApp();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-white to-slate-50 pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-200/60">
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-20 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-40 -right-20 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Pill Badges */}
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <span className="inline-flex items-center gap-1.5 bg-[#005BAC]/10 text-[#005BAC] text-xs font-bold px-3 py-1 rounded-full border border-blue-200/60">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                Viral TikTok {siteConfig.stats.tiktokViews} Views
              </span>
              <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                100% Akad Digital & Ujrah Transparan
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
              Solusi Praktis & Cepat Urusan{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#005BAC] via-[#007FEA] to-blue-600">
                Mahasiswa Surabaya
              </span>
            </h1>

            {/* Bio Quote from TikTok */}
            <div className="inline-block bg-slate-900 text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl shadow-xs">
              "BISA APA AJA (DM) !!! Area Surabaya sedia PickUp, Tossa, Mobil, Motor. Bisa dikerjakan tim mahasiswa berdaya."
            </div>

            {/* Subtitle / Description */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Layanan on-demand terlengkap untuk anak kos & kampus: dari{' '}
              <strong className="text-slate-900">pindahan kos</strong>,{' '}
              <strong className="text-slate-900">antar-jemput stasiun/bandara</strong>,{' '}
              <strong className="text-slate-900">penitipan barang KKN</strong>, hingga{' '}
              <strong className="text-slate-900">ambil berkas ELPT kampus</strong>. 
              Pesan &lt; 2 menit, tahu harga pasti sejak awal, dan amanah sesuai prinsip muamalah.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={() => setIsOrderModalOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#005BAC] hover:bg-[#004785] text-white font-extrabold text-base px-6 py-3.5 rounded-xl shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30 transition-all transform active:scale-95"
              >
                <span>Pesan Jasa Sekarang</span>
                <ArrowRight className="w-5 h-5 text-amber-300" />
              </button>

              <button
                onClick={() => setIsEstimatorOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-base px-5 py-3.5 rounded-xl shadow-xs transition-all active:scale-95"
              >
                <Calculator className="w-5 h-5 text-amber-600" />
                <span>Kalkulator Tarif</span>
              </button>

              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                  'Halo Admin @unair_suruh, saya ingin konsultasi/tanya layanan jasa...'
                )}`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base px-5 py-3.5 rounded-xl shadow-md shadow-emerald-600/20 transition-all active:scale-95"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Chat WhatsApp</span>
              </a>
            </div>

            {/* Key Value Guarantee Points */}
            <div className="pt-4 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Tanpa Ribet Akun</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Akad & Ujrah di Depan</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Kesesuaian Gender Kos</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Respon &lt; 15 Menit</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Fleet Showcase & Quick Tracking Card */}
          <div className="lg:col-span-5 space-y-4">
            {/* Main Interactive Fleet Card */}
            <div className="bg-white rounded-2xl p-5 shadow-xl border border-slate-200/80 relative overflow-hidden">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="text-xs font-extrabold uppercase tracking-wide text-slate-800">
                    Armada Siaga Hari Ini
                  </span>
                </div>
                <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md">
                  Surabaya & Sekitarnya
                </span>
              </div>

              {/* Fleet Icons Grid */}
              <div className="grid grid-cols-2 gap-3 py-4">
                <div className="bg-slate-50 hover:bg-blue-50/60 p-3.5 rounded-xl border border-slate-100 transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center mb-2">
                    <Truck className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">Tossa Roda Tiga</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Juara gang kos sempit, bak luas, muat kasur & lemari.
                  </p>
                  <span className="inline-block mt-2 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Mulai Rp85K
                  </span>
                </div>

                <div className="bg-slate-50 hover:bg-blue-50/60 p-3.5 rounded-xl border border-slate-100 transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center mb-2">
                    <Truck className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">Pick-Up Bak & Box</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Pindahan kontrakan / barang banyak sekali jalan.
                  </p>
                  <span className="inline-block mt-2 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Mulai Rp140K
                  </span>
                </div>

                <div className="bg-slate-50 hover:bg-blue-50/60 p-3.5 rounded-xl border border-slate-100 transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center mb-2">
                    <Car className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">Mobil Penumpang</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Antar-jemput stasiun Gubeng/Ps Turi & Bandara Juanda.
                  </p>
                  <span className="inline-block mt-2 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Mulai Rp20K
                  </span>
                </div>

                <div className="bg-slate-50 hover:bg-blue-50/60 p-3.5 rounded-xl border border-slate-100 transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center mb-2">
                    <Bike className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">Motor Cepat</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Titip beli makan, ambil ELPT, jemput laundry kiloan.
                  </p>
                  <span className="inline-block mt-2 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Mulai Rp10K
                  </span>
                </div>
              </div>

              {/* Fast Track Box */}
              <div className="mt-1 p-3 bg-gradient-to-r from-blue-900 to-[#005BAC] text-white rounded-xl flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <Search className="w-5 h-5 text-amber-300 shrink-0" />
                  <div>
                    <p className="text-xs font-bold">Sudah memesan layanan?</p>
                    <p className="text-[11px] text-blue-100">Cek status progres & setujui akad</p>
                  </div>
                </div>
                <button
                  onClick={() => setCurrentView('track')}
                  className="bg-white hover:bg-slate-100 text-[#005BAC] text-xs font-black px-3.5 py-2 rounded-lg shrink-0 transition-colors shadow-xs"
                >
                  Lacak Order
                </button>
              </div>
            </div>

            {/* Social Trust Bar */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-slate-200/80 flex items-center justify-around text-center">
              <div>
                <p className="text-base font-black text-slate-900">{siteConfig.stats.completedOrders}+</p>
                <p className="text-[11px] text-slate-500 font-medium">Order Tuntas</p>
              </div>
              <div className="w-px h-8 bg-slate-200"></div>
              <div>
                <p className="text-base font-black text-slate-900">{siteConfig.stats.ratingAverage} / 5.0</p>
                <p className="text-[11px] text-slate-500 font-medium">Rating Amanah</p>
              </div>
              <div className="w-px h-8 bg-slate-200"></div>
              <div>
                <p className="text-base font-black text-slate-900">{siteConfig.stats.activeWorkers} Mahasiswa</p>
                <p className="text-[11px] text-slate-500 font-medium">Mitra Terverifikasi</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
