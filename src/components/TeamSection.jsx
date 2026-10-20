import React from 'react';
import { useApp } from '../context/AppContext';
import { Users, MapPin, Building, ShieldCheck } from 'lucide-react';

export default function TeamSection() {
  const { team, siteConfig } = useApp();

  return (
    <section id="tim" className="py-16 sm:py-24 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-blue-50 text-[#005BAC] text-xs font-black px-3.5 py-1 rounded-full border border-blue-200">
            <Users className="w-3.5 h-3.5" />
            Founder & Penggerak Startup
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Tim di Balik <span className="text-[#005BAC]">UNAIR SURUH</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Kolaborasi mahasiswa dan alumni Universitas Airlangga yang berkomitmen membangun ekosistem jasa on-demand berdaya saing dan berlandaskan nilai syariah.
          </p>
        </div>

        {/* Team Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, idx) => (
            <div
              key={idx}
              className="bg-slate-50/70 rounded-2xl p-6 border border-slate-200/90 hover:bg-white hover:shadow-lg transition-all space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#005BAC] to-blue-500 text-white flex items-center justify-center font-black text-xl mb-4 shadow-md shadow-blue-500/20">
                  {member.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                </div>

                <h3 className="font-extrabold text-lg text-slate-900">
                  {member.name}
                </h3>
                <p className="text-xs font-bold text-[#005BAC] mt-0.5">
                  {member.role}
                </p>
                <p className="text-[11px] font-semibold text-slate-500 mt-1 uppercase tracking-wide">
                  {member.spec}
                </p>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed pt-3 border-t border-slate-200/60">
                {member.description}
              </p>
            </div>
          ))}
        </div>

        {/* Operational Base Banner */}
        <div className="bg-gradient-to-r from-slate-900 to-blue-950 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-black uppercase tracking-wider text-amber-400 bg-amber-400/20 px-2.5 py-0.5 rounded-full inline-block">
              Pos Operasional & Hub Layanan
            </span>
            <h3 className="text-xl sm:text-2xl font-black">
              Berbasis di Lingkungan Kampus UNAIR Surabaya
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Kantor & Ruang Simpan: {siteConfig.officeAddress}. Melayani seluruh pergerakan mahasiswa di Kampus A, B, C, serta area Surabaya Raya.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <div className="flex items-center gap-2 bg-white/10 px-4 py-3 rounded-xl border border-white/10 text-xs">
              <Building className="w-4 h-4 text-blue-300" />
              <span>Surabaya, Jawa Timur</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-3 rounded-xl border border-white/10 text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Siaga 06.00 - 23.00 WIB</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
