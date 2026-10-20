import React from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  MapPin,
  Clock,
  Phone,
  LayoutDashboard,
  ExternalLink,
  Heart
} from 'lucide-react';

export default function Footer() {
  const { siteConfig, setCurrentView, setIsOrderModalOpen } = useApp();

  return (
    <footer className="bg-slate-950 text-white border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#005BAC] to-blue-500 flex items-center justify-center font-black text-white text-lg">
                US
              </div>
              <span className="text-xl font-black tracking-tight">
                UNAIR<span className="text-[#007FEA]">SURUH</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Platform layanan on-demand & pemberdayaan mahasiswa Universitas Airlangga di Surabaya. Memadukan kemudahan transaksi instan dengan kepastian akad syariah dan perlindungan privasi.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-800/80 px-3 py-1 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5" />
                Muamalah Transparan & Amanah
              </span>
            </div>
          </div>

          {/* Col 3: 8 Care Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-200">
              8 Kategori Care
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>• Go Care (Transportasi)</li>
              <li>• Move Care (Pindahan Kos)</li>
              <li>• Keep Care (Penitipan KKN)</li>
              <li>• Fix Care (Perakitan & Servis)</li>
              <li>• Task Care (Titip Beli)</li>
              <li>• Desk Care (Dokumen ELPT)</li>
              <li>• Crew Care (Bantuan Ormawa)</li>
              <li>• Talent Care (Tutor Les)</li>
            </ul>
          </div>

          {/* Col 4: Quick Nav & Social */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-200">
              Akses Cepat
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => setIsOrderModalOpen(true)}
                  className="hover:text-white transition-colors"
                >
                  Pesan Jasa Baru
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('track');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Lacak Status & Digital Akad
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('admin');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 text-amber-500 font-bold flex items-center gap-1 transition-colors"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  Masuk Web Admin
                </button>
              </li>
              <li className="pt-2">
                <a
                  href={siteConfig.tiktokUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white flex items-center gap-1"
                >
                  <span>TikTok {siteConfig.tiktokHandle}</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white flex items-center gap-1"
                >
                  <span>Instagram {siteConfig.instagramHandle}</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Operational & Contact */}
          <div className="space-y-3 text-xs text-slate-400">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-200">
              Operasional Surabaya
            </h4>
            <p className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#007FEA] shrink-0 mt-0.5" />
              <span>{siteConfig.officeAddress}</span>
            </p>
            <p className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#007FEA] shrink-0" />
              <span>{siteConfig.hours}</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#007FEA] shrink-0" />
              <span>WhatsApp: {siteConfig.whatsappDisplay}</span>
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} UNAIR SURUH. Hak Cipta Dilindungi Undang-Undang.
          </p>
          <p className="flex items-center gap-1">
            <span>Dibuat dengan dedikasi untuk kemaslahatan civitas mahasiswa</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </p>
        </div>
      </div>
    </footer>
  );
}
