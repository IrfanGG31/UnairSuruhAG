import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, ArrowRight, X } from 'lucide-react';

export default function PromoBanner() {
  const { siteConfig, setIsOrderModalOpen } = useApp();
  const [dismissed, setDismissed] = useState(false);

  if (!siteConfig.promoBanner?.active || dismissed) return null;

  return (
    <div className="bg-gradient-to-r from-blue-900 via-[#005BAC] to-blue-800 text-white text-xs sm:text-sm py-2 px-4 shadow-inner relative z-40 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 justify-center sm:justify-start overflow-hidden">
          <span className="hidden md:inline-flex items-center gap-1 bg-[#F9A01B] text-slate-900 text-[10px] font-black uppercase px-2 py-0.5 rounded-full shrink-0">
            <Sparkles className="w-3 h-3" />
            {siteConfig.promoBanner.badge}
          </span>
          <p className="truncate font-medium text-slate-100">
            {siteConfig.promoBanner.text}
          </p>
          <button
            onClick={() => setIsOrderModalOpen(true)}
            className="inline-flex items-center gap-1 font-bold text-[#F9A01B] hover:text-amber-300 underline shrink-0 ml-1 transition-colors"
          >
            <span>{siteConfig.promoBanner.linkText || 'Pesan Sekarang'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <button
          onClick={() => setDismissed(true)}
          className="text-white/70 hover:text-white p-1 rounded-md shrink-0"
          aria-label="Tutup Banner Promo"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
