import React from 'react';
import {
  FileCheck2,
  Coins,
  ShieldAlert,
  Star,
  Users2,
  CheckCircle,
  Sparkles,
  HeartHandshake
} from 'lucide-react';

export default function SyariahValuesSection() {
  const values = [
    {
      icon: <FileCheck2 className="w-6 h-6 text-emerald-600" />,
      title: 'Digital Akad di Depan',
      sub: 'Bebas Gharar & Ketidakpastian',
      desc: 'Setiap tugas memiliki rincian ruang lingkup, jadwal, dan tarif final yang disepakati oleh customer dan admin sebelum dikerjakan. Tidak ada biaya siluman atau tarif nembak mendadak.'
    },
    {
      icon: <Coins className="w-6 h-6 text-amber-600" />,
      title: 'Ujrah Transparan & Adil',
      sub: 'Tanpa Potongan Sepihak',
      desc: 'Mitra mahasiswa mengetahui besaran upah (ujrah ~80%) sebelum menerima pekerjaan. Platform menerapkan bagi hasil jujur tanpa komisi predator yang merugikan pekerja.'
    },
    {
      icon: <ShieldAlert className="w-6 h-6 text-blue-600" />,
      title: 'Kesesuaian Gender Ruang Privat',
      sub: 'Adab Privasi Kamar Kos',
      desc: 'Khusus pekerjaan yang memasuki area privat (kamar kos/tempat tinggal), penugasan worker disesuaikan gender: pelanggan putri oleh mahasiswi, pelanggan pria oleh mahasiswa.'
    },
    {
      icon: <Star className="w-6 h-6 text-purple-600" />,
      title: 'Rating Amanah Terverifikasi',
      sub: 'Integritas & Akuntabilitas',
      desc: 'Setiap mitra melewati seleksi verifikasi KTM UNAIR, identitas diri, dan komitmen etika amanah. Rekam jejak kerja dan ulasan tercatat transparan untuk menjaga reputasi.'
    }
  ];

  return (
    <section id="syariah" className="py-16 sm:py-24 bg-slate-50 border-y border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-900 text-xs font-black px-3.5 py-1 rounded-full border border-emerald-300">
            <HeartHandshake className="w-4 h-4 text-emerald-700" />
            Landasan Prinsip Muamalah Islam
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Bukan Sekadar Jasa, Tapi{' '}
            <span className="text-[#005BAC]">Ekosistem Ekonomi yang Berkah</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Di UNAIR SURUH, nilai syariah bukan sekadar jargon promosi, melainkan mekanisme sistem nyata yang melindungi hak customer dan memberdayakan mahasiswa pekerja.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {values.map((val, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all space-y-3 relative overflow-hidden"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-xs">
                {val.icon}
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#005BAC] uppercase tracking-wider block">
                  {val.sub}
                </span>
                <h3 className="font-extrabold text-lg text-slate-900 mt-0.5">
                  {val.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {val.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Problem to Solution Comparison Table (From Brainstorming PDF) */}
        <div className="mt-14 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <h3 className="font-black text-lg sm:text-xl text-slate-900 text-center mb-6">
            Transformasi Transaksi Gig Economy Mahasiswa
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200 space-y-2">
              <span className="font-bold text-rose-800 uppercase tracking-wider text-[11px] block">
                ❌ Masalah Gig Tradisional / DM WA
              </span>
              <ul className="space-y-1.5 text-rose-950">
                <li>• Pekerjaan tidak jelas (unclear job scope)</li>
                <li>• Biaya diubah-ubah di tengah jalan</li>
                <li>• Upah pekerja dipotong semena-mena</li>
                <li>• Privasi kamar kos terabaikan</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 space-y-2">
              <span className="font-bold text-blue-800 uppercase tracking-wider text-[11px] block">
                ⚖️ Solusi Nilai Syariah UNAIR SURUH
              </span>
              <ul className="space-y-1.5 text-blue-950">
                <li>• Digital Akad & kesepakatan tertulis di awal</li>
                <li>• Transparansi Ujrah & kepastian hak pekerja</li>
                <li>• Kesesuaian gender untuk ruang privat</li>
                <li>• Rekam jejak & perlindungan kedua belah pihak</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-2">
              <span className="font-bold text-emerald-800 uppercase tracking-wider text-[11px] block">
                ✅ Dampak Nyata untuk Kampus
              </span>
              <ul className="space-y-1.5 text-emerald-950">
                <li>• Customer tenang & puas dalam &lt; 2 menit</li>
                <li>• Mahasiswa dapat penghasilan fleksibel & halal</li>
                <li>• Mendukung perekonomian lokal UNAIR</li>
                <li>• Ekosistem tolong-menolong sesama civitas</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
