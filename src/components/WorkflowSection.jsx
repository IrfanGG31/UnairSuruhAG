import React from 'react';
import {
  ClipboardList,
  FileCheck,
  Truck,
  Star,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function WorkflowSection() {
  const { setIsOrderModalOpen } = useApp();

  const steps = [
    {
      step: '01',
      title: 'Pesan & Estimasi',
      desc: 'Pilih layanan yang kamu butuhkan, tentukan jadwal dan alamat. Estimasi biaya langsung muncul otomatis tanpa perlu registrasi akun.',
      icon: <ClipboardList className="w-6 h-6 text-[#005BAC]" />,
      badge: 'Cepat < 2 Menit'
    },
    {
      step: '02',
      title: 'Akad Digital',
      desc: 'Admin menerbitkan rincian pengerjaan dan harga pasti. Kamu menyetujui akad secara digital demi kepastian muamalah kedua pihak.',
      icon: <FileCheck className="w-6 h-6 text-emerald-600" />,
      badge: 'Transparan & Halal'
    },
    {
      step: '03',
      title: 'Dikerjakan Mitra',
      desc: 'Mitra mahasiswa UNAIR terverifikasi (dengan kesesuaian gender untuk ruang privat) tiba di lokasi dan menuntaskan tugas secara amanah.',
      icon: <Truck className="w-6 h-6 text-blue-600" />,
      badge: 'SOP Amanah'
    },
    {
      step: '04',
      title: 'Bayar & Ulasan',
      desc: 'Periksa hasil pengerjaan, lakukan pembayaran via QRIS / transfer bank / tunai, lalu berikan rating amanah untuk mendukung rekam jejak worker.',
      icon: <Star className="w-6 h-6 text-amber-500 fill-amber-400" />,
      badge: 'Mudah & Berkah'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#005BAC] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Alur Layanan Sederhana
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Cara Kerja <span className="text-[#005BAC]">UNAIR SURUH</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Hanya 4 langkah mudah dari order hingga pekerjaan beres dengan tenang dan tuntas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-14 relative">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-50/70 rounded-2xl p-6 border border-slate-200/80 hover:bg-white hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-center group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span className="text-3xl font-black text-slate-300 group-hover:text-[#005BAC]/40 transition-colors">
                    {item.step}
                  </span>
                </div>

                <div className="inline-block text-[10px] font-black uppercase tracking-wider text-slate-600 bg-white border border-slate-200 px-2 py-0.5 rounded-md mb-2">
                  {item.badge}
                </div>

                <h3 className="font-extrabold text-lg text-slate-900">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none text-slate-300">
                  <ArrowRight className="w-6 h-6" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => setIsOrderModalOpen(true)}
            className="inline-flex items-center gap-2 bg-[#005BAC] hover:bg-[#004785] text-white font-extrabold text-sm px-6 py-3.5 rounded-xl shadow-md transition-all active:scale-95"
          >
            <span>Coba Pesan Sekarang</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
