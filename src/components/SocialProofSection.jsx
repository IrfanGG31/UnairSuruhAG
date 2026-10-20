import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Star,
  Quote,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Heart
} from 'lucide-react';

export default function SocialProofSection() {
  const { reviews, siteConfig } = useApp();

  const viralVideos = [
    {
      title: 'Pindahan Kos Full Team Surabaya',
      views: '1.3 Juta Views',
      likes: '10.2K Likes',
      badge: 'Video Paling Viral',
      quote: '"Sumpah pake jasanya worth it banget, kemarin aku pindahan dan UNAIR SURUH yang ngerjain semua!"',
      category: 'Move Care (Pindahan Kos)'
    },
    {
      title: 'Ready All Role: Worker Cewek & Cowok',
      views: '97.8K Views',
      likes: '6.2K Likes',
      badge: 'Privasi & Syariah',
      quote: '"Buat kos putri wajib worker cewek ya min biar gak canggung dan sopan banget!"',
      category: 'Kesesuaian Gender Kos'
    },
    {
      title: 'Antar Jemput Eksklusif Maba Amerta',
      views: '34.6K Views',
      likes: '1.3K Likes',
      badge: 'Anti Scam Ojol',
      quote: '"Jemput subuh di Stasiun Gubeng langsung gercep, gak perlu ribet tawar-menawar."',
      category: 'Go Care (Stasiun & Bandara)'
    }
  ];

  return (
    <section id="testimoni" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-rose-50 text-rose-700 text-xs font-black px-3.5 py-1 rounded-full border border-rose-200">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            Social Proof & Komunitas Mahasiswa
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Dipercaya Ribuan Mahasiswa &{' '}
            <span className="text-[#005BAC]">Viral di TikTok</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Bukan sekadar janji promosi—bukti nyata kepercayaan mahasiswa UNAIR, ormawa, dan civitas kampus Surabaya.
          </p>
        </div>

        {/* Viral TikTok Showcase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {viralVideos.map((vid, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 text-white rounded-2xl p-6 shadow-xl border border-slate-700/60 flex flex-col justify-between relative overflow-hidden group hover:scale-[1.02] transition-transform"
            >
              {/* Decorative Glow */}
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"></div>

              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-rose-600 text-white px-2.5 py-0.5 rounded-full">
                    {vid.badge}
                  </span>
                  <span className="text-xs font-bold text-amber-300">
                    🔥 {vid.views}
                  </span>
                </div>

                <h3 className="font-black text-lg text-white mb-1">
                  {vid.title}
                </h3>
                <p className="text-[11px] font-semibold text-blue-300 mb-4">
                  {vid.category}
                </p>

                <div className="p-3.5 bg-white/10 rounded-xl backdrop-blur-xs border border-white/10 text-xs text-slate-200 italic leading-relaxed">
                  {vid.quote}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                <span>{vid.likes}</span>
                <a
                  href={siteConfig.tiktokUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 font-bold text-blue-300 hover:text-white transition-colors"
                >
                  <span>Lihat di TikTok</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Real Customer Testimonial Grid */}
        <div className="mt-14 space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-black text-slate-900">
              Ulasan Nyata dari Pengguna Layanan
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Testimoni organik dan ulasan bintang 5 yang diverifikasi sistem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200/90 shadow-xs flex flex-col justify-between hover:bg-white hover:shadow-md transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed italic">
                    "{rev.text}"
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/80">
                  <p className="font-extrabold text-xs text-slate-900 truncate">
                    {rev.author}
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 mt-0.5">
                    <span className="font-medium text-[#005BAC]">{rev.service}</span>
                    <span>{rev.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
