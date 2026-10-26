const fs = require('fs');
const path = require('path');

console.log('Building UNAIR SURUH - 8 Official Care Services...');

const publicDir = path.join(__dirname, 'public');

// Single source of truth for the WhatsApp number used on every CTA.
const WA_NUMBER = '6289677772336';

// Web build (Vite/Vercel) uses static file URLs from /public.
// Standalone copies in Downloads get these inlined as base64 by inlineAssets().
const logoB64 = '/img/unair-suruh-logo.webp';
const heroTeamB64 = '/img/hero-team.webp';
const mascotB64 = '/mascot.jpg';
const tt1B64 = '/tiktok/tiktok-real-1-poster.webp';
const tt2B64 = '/tiktok/tiktok-real-2-poster.webp';
const tt3B64 = '/tiktok/tiktok-real-3-poster.webp';
const tt5B64 = '/tiktok/tiktok-real-5-poster.webp';
const tt6B64 = '/tiktok/tiktok-real-6-poster.webp';
const ttTossaB64 = '/tiktok-tossa.jpg';

// 8 OFFICIAL CARE SERVICES DATA
const servicesData = [
  {
    slug: 'go-suruh',
    title: 'Mobilitas & Transportasi (Go SURUH)',
    badge: 'Mobil AC & Motor',
    badgeClass: 'bg-blue-50 text-blue-700 border-blue-200',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    iconBorder: 'border border-blue-200',
    iconSvg: `<svg class="w-5 h-5 stroke-current fill-none stroke-2 stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3 3 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>`,
    desc: 'Layanan antar-jemput ke stasiun Gubeng/Pasar Turi, bandara Juanda, kampus, tempat kerja, maupun lokasi lainnya. Layanan juga mencakup bantuan darurat ketika kendaraan mogok di perjalanan.',
    unitPrimary: 'Per Trip / Rute Perjalanan (One Way / Pulang-Pergi)',
    unitDetail: 'Pilihan armada: Mobil van ber-AC dingin atau motor gesit',
    price: 20000,
    unit: 'trip',
    btnText: 'Pesan Go SURUH'
  },
  {
    slug: 'move-suruh',
    title: 'Logistik, Pindahan & Pengangkutan (Move SURUH)',
    badge: '1 Driver + 1 SDM',
    badgeClass: 'bg-navy-900 text-amber-400 border-navy-800',
    iconBg: 'bg-navy-50',
    iconColor: 'text-navy-900',
    iconBorder: 'border border-navy-200',
    iconSvg: `<svg class="w-5 h-5 stroke-current fill-none stroke-2 stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24"><path d="M10 17h4V5H2v12h3m11 0h2a2 2 0 0 0 2-2v-3.5a2 2 0 0 0-.6-1.4l-2.4-2.4a2 2 0 0 0-1.4-.7H14v10h2Z"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>`,
    desc: 'Membantu pindahan kos, rumah, maupun kebutuhan pengangkutan lainnya dengan menyediakan armada kendaraan dan tenaga mahasiswa tambahan untuk angkut barang sampai masuk kamar.',
    unitPrimary: 'Per Muatan Armada (Motor / Tossa Roda 3 / Pick-up)',
    unitDetail: 'Termasuk bantuan angkut barang sampai lantai atas',
    price: 65000,
    unit: 'muatan',
    btnText: 'Pesan Move SURUH'
  },
  {
    slug: 'keep-suruh',
    title: 'Penitipan & Penyimpanan Barang (Keep SURUH)',
    badge: 'Aman KKN & Liburan',
    badgeClass: 'bg-amber-50 text-amber-800 border-amber-200',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-700',
    iconBorder: 'border border-amber-200',
    iconSvg: `<svg class="w-5 h-5 stroke-current fill-none stroke-2 stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>`,
    desc: 'Menyediakan layanan penitipan barang sementara yang aman, berguna bagi mahasiswa yang mengikuti KKN, magang, liburan semester, atau sedang transit pindah tempat tinggal.',
    unitPrimary: 'Per Box / Per Item Barang / Paket Bulanan',
    unitDetail: 'Ruang penyimpanan bersih, kering, aman bergaransi & foto berkala',
    price: 15000,
    unit: 'box/bulan',
    btnText: 'Pesan Keep SURUH'
  },
  {
    slug: 'fix-suruh',
    title: 'Perakitan & Bantuan Teknis (Fix SURUH)',
    badge: 'Toolkit Lengkap',
    badgeClass: 'bg-orange-50 text-orange-700 border-orange-200',
    iconBg: 'bg-orange-50',
    iconColor: 'text-orange-600',
    iconBorder: 'border border-orange-200',
    iconSvg: `<svg class="w-5 h-5 stroke-current fill-none stroke-2 stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24"><path d="m14 12-8.5 8.5a2.12 2.12 0 1 1-3-3L11 9"/><path d="M15 13 9 7l4-4 6 6-4 4Z"/></svg>`,
    desc: 'Membantu pelanggan merakit meja, laci, lemari, rak, dan berbagai perabot knock-down. Selain itu, siap melayani bantuan teknis panggilan seperti servis motor darurat dan cek HP.',
    unitPrimary: 'Per Unit Furniture (Meja / Lemari / Rak / Ambalan)',
    unitDetail: 'Estimasi waktu perakitan 30-90 menit dengan perkakas lengkap',
    price: 40000,
    unit: 'unit',
    btnText: 'Pesan Fix SURUH'
  },
  {
    slug: 'task-suruh',
    title: 'Personal Assistance & Titip Beli (Task SURUH)',
    badge: 'Titip Beli & Antar',
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    iconBorder: 'border border-emerald-200',
    iconSvg: `<svg class="w-5 h-5 stroke-current fill-none stroke-2 stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,
    desc: 'Membantu membelikan makanan, mengambil belanjaan, atau mengantarkan barang sesuai kebutuhan pelanggan. Mendelegasikan pekerjaan sederhana saat sibuk kuliah atau sakit di kos.',
    unitPrimary: 'Per Tugas / Per Titik Antar-Jemput Belanjaan',
    unitDetail: '100% transparan sesuai struk belanja toko asli, terpercaya',
    price: 15000,
    unit: 'tugas',
    btnText: 'Pesan Task SURUH'
  },
  {
    slug: 'desk-suruh',
    title: 'Administrasi & Pengurusan (Desk SURUH)',
    badge: 'Birokrasi & Berkas',
    badgeClass: 'bg-purple-50 text-purple-700 border-purple-200',
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-600',
    iconBorder: 'border border-purple-200',
    iconSvg: `<svg class="w-5 h-5 stroke-current fill-none stroke-2 stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
    desc: 'Membantu mengurus dan mengambil kebutuhan dokumen fisik, surat perizinan, cetak/fotokopi berkas tugas, hingga pengurusan berkas administrasi instansi resmi secara cepat, rapi, dan terpercaya.',
    unitPrimary: 'Per Dokumen / Berkas Fisik / Per Lokasi Pengurusan',
    unitDetail: 'Bukti foto serah terima dokumen fisik langsung ke pemesan',
    price: 15000,
    unit: 'berkas',
    btnText: 'Pesan Desk SURUH'
  },
  {
    slug: 'crew-suruh',
    title: 'Bantuan Operasional Event (Crew SURUH)',
    badge: 'Event & Kampus',
    badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    iconBg: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
    iconBorder: 'border border-indigo-200',
    iconSvg: `<svg class="w-5 h-5 stroke-current fill-none stroke-2 stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    desc: 'Menyediakan event crew mahasiswa untuk setup panggung & sound, registrasi peserta, clearing venue, hingga bantuan operasional kegiatan kepanitiaan atau acara kampus.',
    unitPrimary: 'Per Shift / Per Kru Mahasiswa (Durasi 4 - 8 Jam)',
    unitDetail: 'Mitra mahasiswa sigap, komunikatif, dan terbiasa ritme acara',
    price: 75000,
    unit: 'shift',
    btnText: 'Pesan Crew SURUH'
  },
  {
    slug: 'talent-suruh',
    title: 'Tutor & Skill-Based (Talent SURUH)',
    badge: 'Akademik & Skill',
    badgeClass: 'bg-rose-50 text-rose-700 border-rose-200',
    iconBg: 'bg-rose-50',
    iconColor: 'text-rose-600',
    iconBorder: 'border border-rose-200',
    iconSvg: `<svg class="w-5 h-5 stroke-current fill-none stroke-2 stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
    desc: 'Layanan tutor akademik, pendamping belajar, asisten riset, penerjemahan/proofreading, pengolah data olahan SPSS/R, dan pekerja berbasis keahlian mahasiswa berprestasi UNAIR.',
    unitPrimary: 'Per Sesi (90 Menit) / Per Proyek Pengolahan Data',
    unitDetail: 'Dilayani mahasiswa ber-IPK tinggi dan kompeten di bidangnya',
    price: 50000,
    unit: 'sesi',
    btnText: 'Pesan Talent SURUH'
  }
];

function renderServiceCard(c, idx) {
  return `        <!-- SERVICE CARD ${idx + 1}: ${c.title} -->
        <div data-service-name="${c.title}" class="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md transition duration-300 flex flex-col justify-between card-spring group">
          <div class="space-y-4">
            <!-- TOP ROW: MINI SYMBOL + BADGE CHIP -->
            <div class="flex items-center justify-between">
              <div class="w-11 h-11 rounded-2xl ${c.iconBg} ${c.iconColor} ${c.iconBorder} flex items-center justify-center shadow-xs">
                ${c.iconSvg}
              </div>
              <span class="text-[11px] font-bold ${c.badgeClass} px-3 py-1 rounded-full border shadow-2xs">
                ${c.badge}
              </span>
            </div>

            <!-- TITLE & DESC -->
            <div>
              <h3 class="font-heading font-bold text-base sm:text-lg text-navy-900 group-hover:text-amber-600 transition leading-snug">
                ${c.title}
              </h3>
              <p class="text-xs text-slate-600 mt-2 leading-relaxed">
                ${c.desc}
              </p>
            </div>

            <!-- SATUAN PEMESANAN INSET BOX (PERSIS SCREENSHOT USER) -->
            <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
              <div class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Satuan Pemesanan:
              </div>
              <div class="text-xs font-bold text-navy-900 flex items-start gap-1.5 leading-snug">
                <svg class="w-3.5 h-3.5 text-emerald-600 fill-none stroke-current stroke-2 shrink-0 mt-0.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                <span>${c.unitPrimary}</span>
              </div>
              <div class="text-[11px] text-slate-500 pl-5">
                • ${c.unitDetail}
              </div>
            </div>
          </div>

          <!-- ACTION BUTTON (PERSIS SCREENSHOT: DARK NAVY PILL) -->
          <div class="pt-5">
            <button onclick="openOrderModal('${c.slug}')" class="btn-spring focus-ring w-full py-3 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-heading font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition">
              <span>${c.btnText}</span>
              <svg class="w-3.5 h-3.5 stroke-current fill-none stroke-2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>`;
}

// Real Feed Data matching KostCare Screenshot 2
const feedData = [
  {
    "id": 1,
    "src": "tiktok/tiktok-real-6.mp4",
    "poster": "/tiktok/tiktok-real-6-poster.webp",
    "user": "unair_suruh",
    "timeAgo": "KONTEN PILIHAN",
    "likes": 67,
    "caption": "POV pindah kosan Surabaya beres dalam 3 jam pakai Tossa roda 3 bareng kru Move SURUH! Driver + kru mahasiswa bantu angkut sampai lantai atas 🛵📦",
    "tiktokUrl": "https://www.tiktok.com/@unair_suruh/video/7643032747786784020",
    "active": true
  },
  {
    "id": 2,
    "src": "tiktok/tiktok-real-2.mp4",
    "poster": "/tiktok/tiktok-real-2-poster.webp",
    "user": "unair_suruh",
    "timeAgo": "2 HARI LALU",
    "likes": 48,
    "caption": "Cuaca Surabaya lagi terik-teriknya? Naik Go SURUH mobil van ber-AC dingin, no ribet, no nunggu. Antar jemput stasiun & kosan langsung sat set ❄️🚗",
    "tiktokUrl": "https://www.tiktok.com/@unair_suruh/video/7653709528361389332",
    "active": true
  },
  {
    "id": 3,
    "src": "tiktok/tiktok-real-5.mp4",
    "poster": "/tiktok/tiktok-real-5-poster.webp",
    "user": "unair_suruh",
    "timeAgo": "3 HARI LALU",
    "likes": 124,
    "caption": "Klien cewek request worker cewek, privasi kamu nomor satu! Dikerjakan langsung sama mitra mahasiswi yang rapi, teliti, dan bisa dipercaya 🌸🧹",
    "tiktokUrl": "https://www.tiktok.com/@unair_suruh/video/7650823166306323733",
    "active": true
  },
  {
    "id": 4,
    "src": "tiktok/tiktok-real-4.mp4",
    "poster": "/tiktok/tiktok-real-4-poster.webp",
    "user": "unair_suruh",
    "timeAgo": "4 HARI LALU",
    "likes": 92,
    "caption": "Lagi di luar kota tapi ada berkas fisik atau dokumen penting yang harus segera diambil? Tim Desk SURUH siap bantu ambilkan dan kirim ke alamat / ekspedisi 📄📦",
    "tiktokUrl": "https://www.tiktok.com/@unair_suruh/video/7651856659639291156",
    "active": true
  },
  {
    "id": 5,
    "src": "tiktok/tiktok-real-1.mp4",
    "poster": "/tiktok/tiktok-real-1-poster.webp",
    "user": "unair_suruh",
    "timeAgo": "5 HARI LALU",
    "likes": 58,
    "caption": "Solusi anti telat buat teman-teman mahasiswa! Go SURUH siap antar jemput rute kosan - kampus - stasiun tepat waktu 🛵💨",
    "tiktokUrl": "https://www.tiktok.com/@unair_suruh/video/7653711312844999956",
    "active": true
  },
  {
    "id": 6,
    "src": "tiktok/tiktok-real-3.mp4",
    "poster": "/tiktok/tiktok-real-3-poster.webp",
    "user": "unair_suruh",
    "timeAgo": "6 HARI LALU",
    "likes": 185,
    "caption": "Armada mobil siap muat barang banyak untuk kebutuhan angkut barang, pindahan, dan rombongan di Surabaya 🚙📦",
    "tiktokUrl": "https://www.tiktok.com/@unair_suruh/video/7653329107001953556",
    "active": true
  }
];

function renderFeedCard(c, idx) {
  return `        <!-- FEED CARD ${idx + 1} -->
        <div class="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition duration-300 overflow-hidden flex flex-col group card-spring">
          <!-- CARD HEADER (KOSTCARE EXACT STYLE) -->
          <div class="px-3.5 py-3 flex items-center justify-between border-b border-slate-100 bg-white">
            <div class="flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-amber-300 shadow-xs bg-navy-900">
                <img src="${logoB64}" alt="unair_suruh" class="w-full h-full object-cover" />
              </div>
              <div class="leading-tight">
                <div class="text-xs font-bold text-slate-900 flex items-center gap-1">
                  <span>${c.user}</span>
                  <svg class="w-3 h-3 text-blue-500 fill-current shrink-0" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </div>
                <div class="text-[9px] text-slate-400 font-semibold tracking-wider">${c.timeAgo}</div>
              </div>
            </div>
            <!-- TIKTOK / SOCIAL ICON -->
            <a href="${c.tiktokUrl}" target="_blank" rel="noopener noreferrer" class="text-slate-400 hover:text-rose-600 transition p-1" title="Buka di TikTok">
              <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/></svg>
            </a>
          </div>

          <!-- VIDEO PLAYER AREA -->
          <div class="relative aspect-square sm:aspect-[4/5] bg-black overflow-hidden cursor-pointer" onclick="openReelModal(${idx})">
            <video id="reelVid-${idx}" src="${c.src}" poster="${c.poster}" autoplay muted loop playsinline preload="metadata" ontimeupdate="updateVidProgress(${idx})" class="w-full h-full object-cover group-hover:scale-102 transition duration-500"></video>
            
            <!-- VIDEO CAMERA ICON (KOSTCARE STYLE) -->
            <div class="absolute top-2.5 right-2.5 flex items-center gap-1.5 z-10 pointer-events-none">
              <div class="w-6 h-6 rounded-full bg-black/60 backdrop-blur-xs text-white flex items-center justify-center">
                <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>
              </div>
            </div>

            <!-- AUDIO TOGGLE BUTTON -->
            <button onclick="toggleCardAudio(event, ${idx})" class="btn-spring focus-ring absolute bottom-2.5 right-2.5 w-7 h-7 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-xs text-white flex items-center justify-center z-20 transition" title="Nyalakan/Matikan Suara">
              <svg id="audioIcon-${idx}" class="w-3.5 h-3.5 stroke-current fill-none stroke-2 stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24"><path d="M11 5 6 9H2v6h4l5 4V5Z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
            </button>
            
            <!-- SCRUB PROGRESS BAR -->
            <div class="absolute bottom-0 left-0 right-0 h-0.5 bg-white/20">
              <div id="vidProgress-${idx}" class="h-full bg-amber-400 w-0"></div>
            </div>
          </div>

          <!-- ACTION BAR (LIKE & SHARE) -->
          <div class="px-3.5 pt-2.5 pb-1 flex items-center justify-between text-slate-700 bg-white">
            <div class="flex items-center gap-4">
              <!-- LIKE -->
              <button onclick="toggleFeedLike(event, ${idx})" class="flex items-center gap-1.5 text-slate-700 hover:text-rose-600 transition group/like">
                <svg id="feedHeart-${idx}" class="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                <span id="feedLikeCount-${idx}" class="text-xs font-semibold">${c.likes}</span>
              </button>
              <!-- SHARE -->
              <a href="${c.tiktokUrl}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-1.5 text-slate-700 hover:text-blue-600 transition">
                <svg class="w-4 h-4 stroke-current fill-none stroke-2 stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                <span class="text-xs font-semibold">Share</span>
              </a>
            </div>
          </div>

          <!-- CAPTION (AUTENTIK KOSTCARE - TANPA TOMBOL PESAN JASA) -->
          <div class="px-3.5 pb-3.5 pt-1 text-xs text-slate-700 leading-snug line-clamp-2 bg-white">
            ${c.caption}
          </div>
        </div>`;
}

const htmlContent = `<!DOCTYPE html>
<html lang="id" class="scroll-smooth">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <title>UNAIR SURUH — Solusi Praktis Mahasiswa & Anak Kos Surabaya</title>
  <meta name="description" content="Layanan on-demand mahasiswa Surabaya (@unair_suruh): Go SURUH, Move SURUH, Keep SURUH, Fix SURUH, Task SURUH, Desk SURUH, Crew SURUH, dan Talent SURUH." />
  <link rel="icon" type="image/webp" href="${logoB64}" />
  
  <!-- Google Fonts: Poppins (Heading), Inter (Body) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700;800;900&display=swap" rel="stylesheet">
  
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            navy: {
              50: '#F0F4F8',
              100: '#D9E2EC',
              200: '#BCCCDC',
              800: '#112240',
              900: '#0A192F',
              950: '#060D1A',
            },
            gold: {
              400: '#FBBF24',
              500: '#F59E0B',
              600: '#D97706',
            }
          },
          fontFamily: {
            heading: ['Poppins', 'sans-serif'],
            sans: ['Inter', 'sans-serif'],
          }
        }
      }
    };
  </script>

  <style>
    /* Prevent any accidental horizontal overflow on mobile viewports */
    html, body {
      max-width: 100%;
      overflow-x: hidden;
    }
    /* Tailwind v3 CDN polyfills for utility classes */
    .shadow-xs {
      box-shadow: 0 1px 2px 0 rgba(15, 23, 42, 0.05);
    }
    .shadow-2xs {
      box-shadow: 0 1px 1px 0 rgba(15, 23, 42, 0.04);
    }
    .backdrop-blur-xs {
      -webkit-backdrop-filter: blur(2px);
      backdrop-filter: blur(2px);
    }
    /* Kostcare Spring & Clean Styles */
    .btn-spring {
      transition: transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.18s ease;
    }
    .btn-spring:hover {
      transform: translateY(-2px) scale(1.02);
    }
    .btn-spring:active {
      transform: translateY(1px) scale(0.98);
    }
    .card-spring {
      transition: transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.22s ease, border-color 0.22s ease;
    }
    .card-spring:hover {
      transform: translateY(-3px);
    }
    .focus-ring:focus-visible {
      outline: 2px solid #F59E0B;
      outline-offset: 2px;
    }
    /* Scrollbar */
    .scrollbar-none::-webkit-scrollbar {
      display: none;
    }
    .scrollbar-none {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  </style>
</head>
<body class="bg-[#F8FAFC] text-slate-800 font-sans antialiased selection:bg-amber-400 selection:text-navy-900 min-h-screen flex flex-col">

  <!-- ===================================================================== -->
  <!-- 0. TOP ANNOUNCEMENT BAR (CLEAN, PROPORTIONAL & RESPONSIVE)            -->
  <!-- ===================================================================== -->
  <aside class="bg-navy-950 text-white py-2 border-b border-navy-800 shadow-xs relative z-50">
    <div class="w-full px-3.5 sm:px-8 lg:px-12 xl:px-16 flex items-center justify-between gap-2">
      <div class="flex items-center gap-2 min-w-0 flex-1">
        <span id="announcementBadgeText" class="bg-amber-400 text-navy-950 text-[10px] sm:text-xs font-black px-2 sm:px-2.5 py-0.5 rounded-full uppercase tracking-wider shrink-0 shadow-xs">Inisiatif Mahasiswa</span>
        <span id="announcementBarText" class="text-slate-200 text-[11px] sm:text-sm font-medium truncate">Layanan On-Demand Mahasiswa Surabaya • 8 Lini Siaga + Custom SURUH</span>
      </div>
      <div class="hidden sm:flex items-center gap-6 text-slate-200 text-xs sm:text-sm shrink-0">
        <span class="flex items-center gap-2">
          <svg class="w-4 h-4 text-emerald-400 fill-none stroke-current stroke-2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          <span id="topBarWaDisplay" data-wa-display class="font-bold text-white tracking-wide">+62 896-7777-2336</span>
        </span>
      </div>
    </div>
  </aside>

  <!-- ===================================================================== -->
  <!-- 1. STICKY NAVBAR (RESPONSIVE & ADAPTIVE: MOBILE, TABLET & DESKTOP)    -->
  <!-- ===================================================================== -->
  <header class="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
    <div class="w-full px-3.5 sm:px-8 lg:px-12 xl:px-16 h-16 sm:h-20 flex items-center justify-between gap-2">
      
      <!-- LOGO & BRAND IDENTITY -->
      <a href="#" class="flex items-center gap-2 sm:gap-3.5 group focus-ring rounded-xl py-1 min-w-0">
        <div class="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-white border border-slate-200 p-0.5 flex items-center justify-center shadow-xs overflow-hidden shrink-0 group-hover:scale-105 transition">
          <img src="${logoB64}" alt="Logo Maskot UNAIR SURUH" class="w-full h-full object-contain rounded-lg" />
        </div>
        <div class="min-w-0">
          <span id="navBrandTitle" class="font-heading font-black text-base sm:text-xl lg:text-2xl text-navy-950 tracking-tight block leading-tight truncate">UNAIR SURUH</span>
          <span class="text-[10px] sm:text-xs font-semibold text-slate-500 block truncate">
            <span id="navBrandSubMobile" class="sm:hidden">Jasa On-Demand Surabaya</span>
            <span id="navBrandSubDesktop" class="hidden sm:inline">Solusi Praktis Mahasiswa &amp; Anak Kos Surabaya</span>
          </span>
        </div>
      </a>

      <!-- DESKTOP NAV LINKS (VISIBLE ON LG+) -->
      <nav class="hidden lg:flex items-center gap-6 xl:gap-8 text-sm sm:text-base font-bold text-navy-900/80">
        <a href="#layanan" class="hover:text-amber-500 transition py-2 border-b-2 border-transparent hover:border-amber-400">Lini Layanan</a>
        <a href="#custom-suruh-spotlight" class="hover:text-amber-500 transition py-2 border-b-2 border-transparent hover:border-amber-400">Bebas Request</a>
        <a href="#mengapa-kami" class="hover:text-amber-500 transition py-2 border-b-2 border-transparent hover:border-amber-400">Mengapa Kami</a>
        <a href="#kegiatan-kami" class="hover:text-amber-500 transition py-2 border-b-2 border-transparent hover:border-amber-400">Kegiatan Kami</a>
        <a href="#testimoni" class="hover:text-amber-500 transition py-2 border-b-2 border-transparent hover:border-amber-400">Kata Mereka</a>
        <a href="#mitra" class="hover:text-amber-500 transition py-2 border-b-2 border-transparent hover:border-amber-400 text-amber-500">Jadi Mitra</a>
        <a href="#faq" class="hover:text-amber-500 transition py-2 border-b-2 border-transparent hover:border-amber-400">FAQ</a>
      </nav>

      <!-- RIGHT ACTIONS -->
      <div class="flex items-center gap-1.5 sm:gap-3 shrink-0">
        <a href="https://wa.me/${WA_NUMBER}?text=Halo%20kak%20Admin%20UNAIR%20SURUH!%20%F0%9F%91%8B%E2%9C%A8%20Mau%20tanya-tanya%20seputar%20layanannya%20dong%20kak%20%F0%9F%99%8F%F0%9F%98%8A" target="_blank" rel="noopener noreferrer" class="btn-spring focus-ring inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-navy-950 font-heading font-black text-xs sm:text-sm shadow-xs hover:shadow-md transition">
          <svg class="w-4 h-4 sm:w-5 sm:h-5 fill-current shrink-0" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
          <span class="hidden sm:inline">Pesan via WA</span>
          <span class="sm:hidden">Pesan WA</span>
        </a>

        <!-- HAMBURGER MENU BUTTON (MOBILE / TABLET) -->
        <button id="mobileNavToggle" onclick="toggleMobileNav()" aria-label="Toggle menu navigasi" aria-expanded="false" class="lg:hidden p-2 rounded-xl text-navy-950 hover:bg-slate-100 transition focus-ring">
          <svg id="hamburgerIcon" class="w-5 h-5 sm:w-6 sm:h-6 stroke-current fill-none stroke-2" viewBox="0 0 24 24"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          <svg id="closeMenuIcon" class="w-5 h-5 sm:w-6 sm:h-6 stroke-current fill-none stroke-2 hidden" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    </div>

    <!-- MOBILE NAVIGATION DROPDOWN DRAWER -->
    <div id="mobileNavMenu" class="hidden lg:hidden border-t border-slate-200/90 bg-white/98 backdrop-blur-xl px-4 py-3.5 shadow-xl transition-all duration-300">
      <div class="grid grid-cols-2 gap-2 pb-3 text-xs font-bold text-navy-950 border-b border-slate-100">
        <a href="#layanan" onclick="closeMobileNav()" class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-amber-50 hover:text-amber-600 transition">
          <span>📦</span> <span>8 Lini Layanan</span>
        </a>
        <a href="#custom-suruh-spotlight" onclick="closeMobileNav()" class="flex items-center gap-2 p-2.5 rounded-xl bg-amber-50 text-amber-900 hover:bg-amber-100 transition">
          <span>⭐</span> <span>Bebas Custom</span>
        </a>
        <a href="#mengapa-kami" onclick="closeMobileNav()" class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-amber-50 hover:text-amber-600 transition">
          <span>🏆</span> <span>Mengapa Kami</span>
        </a>
        <a href="#kegiatan-kami" onclick="closeMobileNav()" class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-amber-50 hover:text-amber-600 transition">
          <span>🎬</span> <span>Kegiatan Kami</span>
        </a>
        <a href="#testimoni" onclick="closeMobileNav()" class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-amber-50 hover:text-amber-600 transition">
          <span>💬</span> <span>Kata Mereka</span>
        </a>
        <a href="#mitra" onclick="closeMobileNav()" class="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-amber-50 hover:text-amber-600 transition">
          <span>🤝</span> <span>Jadi Mitra</span>
        </a>
        <a href="#faq" onclick="closeMobileNav()" class="col-span-2 flex items-center justify-center gap-2 p-2.5 rounded-xl bg-slate-50 hover:bg-amber-50 hover:text-amber-600 transition">
          <span>❓</span> <span>Tanya Jawab &amp; FAQ</span>
        </a>
      </div>
      <div class="pt-2.5 flex items-center justify-between text-[11px] text-slate-500 font-medium">
        <span>Surabaya On-Demand Siaga</span>
        <a href="https://wa.me/${WA_NUMBER}" class="font-bold text-amber-600 hover:underline">+62 896-7777-2336</a>
      </div>
    </div>

    <!-- HORIZONTAL QUICK-NAV PILLS FOR MOBILE (1-TAP INSTANT ACCESS) -->
    <nav aria-label="Menu Cepat Mobile" class="lg:hidden bg-slate-50/95 backdrop-blur-md border-t border-slate-200/70 py-2 px-3 overflow-x-auto scrollbar-none flex items-center gap-1.5 shadow-2xs">
      <a href="#layanan" class="shrink-0 px-3 py-1 rounded-full text-[11px] font-bold bg-white text-navy-900 border border-slate-200 hover:border-amber-400 hover:text-amber-600 transition shadow-2xs">📦 Layanan</a>
      <a href="#custom-suruh-spotlight" class="shrink-0 px-3 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200 transition shadow-2xs">⭐ Bebas Request</a>
      <a href="#mengapa-kami" class="shrink-0 px-3 py-1 rounded-full text-[11px] font-bold bg-white text-navy-900 border border-slate-200 hover:border-amber-400 hover:text-amber-600 transition shadow-2xs">🏆 Keunggulan</a>
      <a href="#kegiatan-kami" class="shrink-0 px-3 py-1 rounded-full text-[11px] font-bold bg-white text-navy-900 border border-slate-200 hover:border-amber-400 hover:text-amber-600 transition shadow-2xs">🎬 Reels</a>
      <a href="#testimoni" class="shrink-0 px-3 py-1 rounded-full text-[11px] font-bold bg-white text-navy-900 border border-slate-200 hover:border-amber-400 hover:text-amber-600 transition shadow-2xs">💬 Ulasan TikTok</a>
      <a href="#mitra" class="shrink-0 px-3 py-1 rounded-full text-[11px] font-bold bg-white text-navy-900 border border-slate-200 hover:border-amber-400 hover:text-amber-600 transition shadow-2xs">🤝 Jadi Mitra</a>
      <a href="#faq" class="shrink-0 px-3 py-1 rounded-full text-[11px] font-bold bg-white text-navy-900 border border-slate-200 hover:border-amber-400 hover:text-amber-600 transition shadow-2xs">❓ FAQ</a>
    </nav>
  </header>

  <!-- 2. HERO SECTION (KUNING - PUTIH - NAVY SIGNATURE AIRLANGGA GRADIENT)  -->
  <!-- ===================================================================== -->
  <section class="relative bg-[linear-gradient(180deg,#FACC15_0%,#FEF08A_16%,#FFFFFF_46%,#CBD5E1_74%,#0F1E36_100%)] py-8 sm:py-12 lg:py-14 border-b border-navy-900/90 overflow-hidden">
    
    <!-- SUBTLE SUNLIGHT AMBIENT RADIALS -->
    <div class="absolute -top-20 -left-20 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-amber-400/35 via-yellow-300/20 to-transparent blur-3xl pointer-events-none -z-10"></div>
    <div class="absolute top-10 -right-20 w-[650px] h-[650px] rounded-full bg-gradient-to-bl from-amber-300/25 via-yellow-200/15 to-transparent blur-3xl pointer-events-none -z-10"></div>
    <div class="absolute -bottom-24 left-1/4 w-[700px] h-[450px] rounded-full bg-gradient-to-t from-navy-950/80 via-navy-900/40 to-transparent blur-3xl pointer-events-none -z-10"></div>

    <!-- ARCHITECTURAL MICRO-GRID -->
    <div class="absolute inset-0 bg-[radial-gradient(#0F1E3618_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_85%_75%_at_50%_35%,#000_75%,transparent_100%)] pointer-events-none -z-10"></div>

    <!-- PROPORTIONAL CONTAINER -->
    <div class="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center">
        
        <!-- LEFT COLUMN: COPYWRITING & CTAS (BALANCED & CRISP) -->
        <div class="lg:col-span-7 xl:col-span-7 space-y-5 sm:space-y-6 min-w-0">
          
          <!-- TOP PILL BADGE -->
          <div class="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-2xl sm:rounded-full bg-navy-950 text-white text-[11px] sm:text-sm font-bold shadow-xs hover:scale-[1.02] transition cursor-default max-w-full leading-snug">
            <span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0"></span>
            <span id="heroPillBadgeText">⚡ Serba Bisa untuk Mahasiswa, Anak Kos &amp; Warga Surabaya</span>
          </div>

          <!-- HEADLINE (PROPORTIONAL 100% ZOOM BALANCED) -->
          <h1 id="heroHeadlineTitle" class="font-heading font-black text-[1.75rem] sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.5rem] text-navy-950 leading-[1.14] tracking-tight">
            Serba Bisa, Semua <span class="relative inline-block text-amber-600 underline decoration-amber-500 decoration-wavy">Bisa Disuruh!</span>
          </h1>

          <!-- SUBTITLE -->
          <p id="heroSubtitleText" class="text-navy-950/90 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl font-medium">
            Apapun kebutuhan harianmu di Surabaya, serahkan pada tim mahasiswa: dari <span class="font-semibold text-navy-950">Pindahan &amp; Titip Kos</span>, <span class="font-semibold text-navy-950">Antar-Jemput Stasiun/Bandara</span>, <span class="font-semibold text-navy-950">Urus Berkas &amp; Dokumen</span>, <span class="font-semibold text-navy-950">Rakit Perabot</span>, belanja darurat, sampai <span class="font-semibold text-navy-950">Kru Event &amp; Tutor</span>. Cekatan, terpercaya, dan harga transparan.
          </p>

          <!-- CTAS -->
          <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-1">
            <button onclick="openOrderModal('move-suruh')" class="btn-spring focus-ring px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-heading font-black text-sm sm:text-base shadow-md hover:shadow-lg transition flex items-center justify-center gap-2.5 w-full sm:w-auto">
              <svg class="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
              <span id="heroCtaText">Pesan Sekarang</span>
            </button>
            <a href="#layanan" id="heroSecondaryCtaText" class="btn-spring focus-ring px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl border-2 border-navy-900/20 hover:border-navy-900/40 text-navy-950 font-heading font-bold text-sm sm:text-base bg-white/95 hover:bg-white transition shadow-2xs w-full sm:w-auto text-center justify-center inline-flex items-center">
              Lihat 8 Lini Layanan
            </a>
          </div>

          <!-- TRUST METRICS ROW (PROPORTIONAL 4-COLUMN CARDS) -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 pt-5 sm:pt-6 border-t border-navy-900/15">
            
            <!-- METRIC 1: 22 WORKER -->
            <div class="bg-white/95 backdrop-blur-md rounded-xl p-2.5 sm:p-3.5 border border-white/80 shadow-md flex items-center gap-2 sm:gap-3 hover:border-amber-400 hover:shadow-lg transition min-w-0">
              <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs sm:text-base shrink-0 shadow-2xs">
                ★
              </div>
              <div class="leading-tight min-w-0">
                <div id="heroMetric1Val" class="font-black text-xs sm:text-base text-navy-950 truncate">22 Worker</div>
                <div id="heroMetric1Sub" class="text-[10px] sm:text-xs text-slate-500 font-semibold truncate">Mitra Mahasiswa</div>
              </div>
            </div>

            <!-- METRIC 2: 83% REPEAT ORDER -->
            <div class="bg-white/95 backdrop-blur-md rounded-xl p-2.5 sm:p-3.5 border border-white/80 shadow-md flex items-center gap-2 sm:gap-3 hover:border-blue-400 hover:shadow-lg transition min-w-0">
              <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xs sm:text-base shrink-0 shadow-2xs">
                <svg class="w-4 h-4 sm:w-5 sm:h-5 stroke-current fill-none stroke-2" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <div class="leading-tight min-w-0">
                <div id="heroMetric2Val" class="font-black text-xs sm:text-base text-navy-950 truncate">83% Repeat</div>
                <div id="heroMetric2Sub" class="text-[10px] sm:text-xs text-slate-500 font-semibold truncate">Pelanggan Setia</div>
              </div>
            </div>

            <!-- METRIC 3: 81% PERTUMBUHAN ORDER -->
            <div class="bg-white/95 backdrop-blur-md rounded-xl p-2.5 sm:p-3.5 border border-white/80 shadow-md flex items-center gap-2 sm:gap-3 hover:border-emerald-400 hover:shadow-lg transition min-w-0">
              <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs sm:text-base shrink-0 shadow-2xs">
                <svg class="w-4 h-4 sm:w-5 sm:h-5 stroke-current fill-none stroke-2" viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
              </div>
              <div class="leading-tight min-w-0">
                <div id="heroMetric3Val" class="font-black text-xs sm:text-base text-navy-950 truncate">81% / Bulan</div>
                <div id="heroMetric3Sub" class="text-[10px] sm:text-xs text-slate-500 font-semibold truncate">Pertumbuhan</div>
              </div>
            </div>

            <!-- METRIC 4: HARGA PASTI & TRANSPARAN -->
            <div class="bg-white/95 backdrop-blur-md rounded-xl p-2.5 sm:p-3.5 border border-white/80 shadow-md flex items-center gap-2 sm:gap-3 hover:border-indigo-400 hover:shadow-lg transition min-w-0">
              <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold text-xs sm:text-base shrink-0 shadow-2xs">
                <svg class="w-4 h-4 sm:w-5 sm:h-5 stroke-current fill-none stroke-2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
              </div>
              <div class="leading-tight min-w-0">
                <div id="heroMetric4Val" class="font-black text-xs sm:text-base text-navy-950 truncate">Harga Pasti</div>
                <div id="heroMetric4Sub" class="text-[10px] sm:text-xs text-slate-500 font-semibold truncate">Jelas di Awal</div>
              </div>
            </div>

          </div>

        </div>

        <!-- RIGHT COLUMN: HERO TEAM PHOTO & FLOATING BADGES (BALANCED & PROPORTIONAL) -->
        <div class="lg:col-span-5 relative w-full flex justify-center pb-2 sm:pb-6">
          <div class="relative w-full max-w-[420px] lg:max-w-[460px]">
            
            <!-- SOFT PHOTO BACKDROP HALO -->
            <div class="absolute -inset-4 sm:-inset-6 rounded-3xl bg-gradient-to-tr from-amber-400/30 via-yellow-200/25 to-blue-500/25 blur-2xl -z-10"></div>

            <!-- PHOTO CARD (BALANCED ASPECT RATIO & COMFORTABLE VIEWPORT HEIGHT) -->
            <div class="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border-4 sm:border-[5px] border-white ring-1 ring-navy-950/10 bg-white aspect-[4/5] max-h-[430px] sm:max-h-[500px]">
              <img src="${heroTeamB64}" alt="Tim Mahasiswa UNAIR SURUH" class="w-full h-full object-cover object-center" />
              <div class="absolute inset-0 bg-gradient-to-t from-navy-950/50 via-transparent to-transparent"></div>
            </div>

            <!-- FLOATING GAMIFIED MICRO-CHIP (DISPATCH SPEED) -->
            <div class="hidden sm:flex absolute top-5 -left-3 sm:-left-5 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-lg border border-slate-200/90 items-center gap-2.5 card-spring z-10">
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
              <span id="heroDispatchBadgeText" class="text-xs sm:text-sm font-bold text-navy-950">⚡ Dispatch Cepat &lt; 15 Mnt</span>
            </div>

            <!-- FLOATING MASCOT BADGE (OFFICIAL MASCOT LOGO) -->
            <div class="absolute bottom-3 left-3 right-3 sm:right-auto sm:-bottom-6 sm:-left-5 bg-white/95 backdrop-blur-md p-2.5 sm:p-3.5 sm:pr-6 rounded-2xl shadow-xl border border-slate-200 flex items-center gap-2.5 sm:gap-3 card-spring z-10">
              <div class="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-white border border-amber-300 p-0.5 overflow-hidden shrink-0 shadow-xs flex items-center justify-center">
                <img src="${logoB64}" alt="Maskot Resmi UNAIR SURUH" class="w-full h-full object-contain rounded-lg" />
              </div>
              <div class="min-w-0">
                <div class="text-xs sm:text-sm font-black text-navy-950 flex items-center gap-1.5">
                  <span id="heroMascotTitleText" class="truncate">Maskot UNAIR SURUH</span>
                  <span class="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                </div>
                <div id="heroMascotSubText" class="text-[11px] sm:text-xs text-slate-500 font-semibold truncate">Siaga 8 Lini SURUH Series</div>
              </div>
            </div>

            <!-- FLOATING VERIFIED PILL (TERVERIFIKASI & RAMAH) -->
            <div class="absolute top-3 right-3 sm:-top-5 sm:-right-4 bg-navy-950/95 backdrop-blur-md text-white px-3 sm:px-4 py-1.5 sm:py-2.5 rounded-xl shadow-xl flex items-center gap-2 sm:gap-2.5 border border-navy-800/80 card-spring z-10">
              <div class="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-amber-400 text-navy-950 flex items-center justify-center font-bold text-xs sm:text-sm shrink-0 shadow-2xs">
                ★
              </div>
              <div class="text-[11px] sm:text-sm font-bold leading-tight"><span id="heroVerifiedLine1">Mitra Terverifikasi</span><br><span id="heroVerifiedLine2" class="text-amber-300 font-medium">Mahasiswa Surabaya</span></div>
            </div>

          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- 3. SECTION LINI LAYANAN & SATUAN KERJA (EXACT SCREENSHOT LAYOUT)       -->
  <!-- ===================================================================== -->
  <section id="layanan" class="py-16 sm:py-24 bg-[#F8FAFC]">
    <div class="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
      
      <!-- SECTION HEADER -->
      <div class="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <h2 id="layananSectionTitle" class="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-navy-900 tracking-tight">
          Lini Layanan &amp; Satuan Kerja
        </h2>
        <p id="layananSectionSubtitle" class="text-slate-600 text-xs sm:text-sm mt-2 max-w-2xl mx-auto leading-relaxed">
          Tiap jenis tugas memiliki satuan dan batasan kerja yang transparan. Tidak ada biaya tersembunyi, langsung diskusikan di WhatsApp dengan format chat otomatis.
        </p>
      </div>

      <!-- ===================================================================== -->
      <!-- SPOTLIGHT HIGHLIGHT UTAMA: CUSTOM SURUH (BEBAS REQUEST APA SAJA)      -->
      <!-- ===================================================================== -->
      <div id="custom-suruh-spotlight" class="mb-12 sm:mb-16 rounded-3xl bg-gradient-to-br from-navy-950 via-[#0B1528] to-[#122240] text-white p-4 sm:p-8 lg:p-10 border-2 border-amber-400/50 shadow-[0_20px_50px_rgba(15,30,54,0.35)] relative overflow-hidden group">
        
        <!-- GLOWING AMBIENT RADIALS -->
        <div class="absolute -top-24 -right-24 w-80 h-80 bg-amber-400/20 rounded-full blur-3xl pointer-events-none -z-0"></div>
        <div class="absolute -bottom-24 -left-24 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none -z-0"></div>
        
        <!-- MICRO-GRID TEXTURE -->
        <div class="absolute inset-0 bg-[radial-gradient(#FACC1510_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none -z-0"></div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center relative z-10">
          
          <!-- LEFT SIDE: COPYWRITING & QUICK IDEA CHIPS -->
          <div class="lg:col-span-7 space-y-4 sm:space-y-5 min-w-0">
            
            <!-- SPOTLIGHT BADGE -->
            <div class="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-xl sm:rounded-full bg-gradient-to-r from-amber-400/25 to-yellow-300/15 border border-amber-400/40 text-amber-300 text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-xs max-w-full leading-snug">
              <span class="w-2 h-2 rounded-full bg-amber-400 animate-ping shrink-0"></span>
              <span id="customSpotlightBadge">⭐ SPOTLIGHT UTAMA • LAYANAN APA SAJA BEBAS REQUEST</span>
            </div>

            <!-- TITLE -->
            <h3 class="font-heading font-black text-xl sm:text-3xl lg:text-[2.25rem] text-white leading-tight tracking-tight">
              <span id="customTitleLine1">Punya Kebutuhan Lain?</span><br>
              <span id="customTitleHighlight" class="text-amber-400 underline decoration-amber-400/40 decoration-wavy">Semua Bebas Kamu Suruh!</span>
            </h3>

            <!-- DESCRIPTION -->
            <p id="customSpotlightDesc" class="text-slate-300 text-xs sm:text-sm lg:text-base leading-relaxed font-medium max-w-xl">
              Nggak nemu layanan yang cocok di 8 pilihan bawah? Tenang! Dari urusan antre tiket/tempat, titip jaga stand event, survei lokasi kosan, cari barang unik, sampai bantuan mendadak apa saja di Surabaya—tulis tugasmu, harga disepakati di awal tanpa biaya siluman.
            </p>

            <!-- QUICK IDEA CHIPS (CLICK TO AUTO-FILL) -->
            <div class="space-y-2 pt-1">
              <div class="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-amber-300/90 flex items-center gap-1.5">
                <span>💡 Klik contoh tugas yang sering direquest:</span>
              </div>
              <div id="customChipsContainer" class="flex flex-wrap gap-2">
                <button type="button" onclick="fillCustomChip('Tolong survei kamar kosan & fotokan video detail lokasinya kak')" class="text-xs font-semibold px-3 py-1.5 rounded-xl bg-white/10 hover:bg-amber-400 hover:text-navy-950 border border-white/15 text-slate-200 transition card-spring cursor-pointer">
                  🎯 Survei Kosan / Cek Lokasi
                </button>
                <button type="button" onclick="fillCustomChip('Bantu antre tiket / antre tempat dari pagi ya kak')" class="text-xs font-semibold px-3 py-1.5 rounded-xl bg-white/10 hover:bg-amber-400 hover:text-navy-950 border border-white/15 text-slate-200 transition card-spring cursor-pointer">
                  🎟️ Bantu Antre Tiket / Tempat
                </button>
                <button type="button" onclick="fillCustomChip('Bantu cari dan belikan barang khusus / kado mendadak')" class="text-xs font-semibold px-3 py-1.5 rounded-xl bg-white/10 hover:bg-amber-400 hover:text-navy-950 border border-white/15 text-slate-200 transition card-spring cursor-pointer">
                  🛍️ Beli Barang Khusus / Kado
                </button>
                <button type="button" onclick="fillCustomChip('Temani periksa ke klinik / rumah sakit di Surabaya')" class="text-xs font-semibold px-3 py-1.5 rounded-xl bg-white/10 hover:bg-amber-400 hover:text-navy-950 border border-white/15 text-slate-200 transition card-spring cursor-pointer">
                  🏥 Temani Periksa / Rumah Sakit
                </button>
                <button type="button" onclick="fillCustomChip('Bantu jaga stand booth bazaar / event kampus')" class="text-xs font-semibold px-3 py-1.5 rounded-xl bg-white/10 hover:bg-amber-400 hover:text-navy-950 border border-white/15 text-slate-200 transition card-spring cursor-pointer">
                  🎪 Jaga Stand / Booth Event
                </button>
                <button type="button" onclick="fillCustomChip('Tolong bantu angkut barang unik / perabot khusus ke lokasi')" class="text-xs font-semibold px-3 py-1.5 rounded-xl bg-white/10 hover:bg-amber-400 hover:text-navy-950 border border-white/15 text-slate-200 transition card-spring cursor-pointer">
                  📦 Bantuan Fisik &amp; Angkut Unik
                </button>
              </div>
            </div>

            <!-- TRUST BULLETS -->
            <div class="pt-2 flex flex-wrap items-center gap-3 sm:gap-4 text-[11px] sm:text-xs text-slate-300 font-semibold border-t border-white/10">
              <span class="flex items-center gap-1.5 text-emerald-400">
                <svg class="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                <span id="customBullet1">Tarif Disepakati di Awal</span>
              </span>
              <span class="flex items-center gap-1.5 text-amber-300">
                <svg class="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                <span id="customBullet2">Mitra Mahasiswa Terpercaya</span>
              </span>
              <span class="flex items-center gap-1.5 text-blue-300">
                <svg class="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                <span id="customBullet3">Respon Kilat &lt; 15 Mnt</span>
              </span>
            </div>

          </div>

          <!-- RIGHT SIDE: INTERACTIVE REQUEST BUILDER -->
          <div class="lg:col-span-5 min-w-0">
            <div class="bg-white/10 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-white/20 shadow-2xl space-y-4">
              
              <div class="flex items-center justify-between pb-2 border-b border-white/10 gap-2">
                <div class="flex items-center gap-2 min-w-0">
                  <span class="w-8 h-8 rounded-xl bg-amber-400 text-navy-950 flex items-center justify-center font-bold text-sm shadow-xs shrink-0">✍️</span>
                  <span id="customFormTitle" class="font-heading font-black text-sm sm:text-base text-white truncate">Form Kilat Custom SURUH</span>
                </div>
                <span class="text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 shrink-0">Nego Bebas</span>
              </div>

              <!-- FIELD 1: REQUEST INPUT -->
              <div class="space-y-1.5">
                <label for="customTaskInput" class="block text-xs font-bold text-slate-200">Mau minta tolong apa? <span class="text-amber-400">*</span></label>
                <textarea id="customTaskInput" rows="3" class="focus-ring w-full px-3.5 py-2.5 rounded-xl bg-white text-navy-950 text-xs sm:text-sm font-medium border border-white/80 placeholder:text-slate-400 resize-none leading-relaxed transition" placeholder="Tuliskan tugasmu di sini, misal: 'Tolong survei kosan di Dharmawangsa dan fotokan detailnya ya kak...'"></textarea>
              </div>

              <!-- FIELD 2: 2-COLUMN HELPER (AREA & WAKTU) -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div class="space-y-1">
                  <label for="customAreaSelect" class="block text-[11px] font-bold text-slate-200">Area / Lokasi</label>
                  <select id="customAreaSelect" class="focus-ring w-full px-3 py-2 rounded-xl bg-white text-navy-950 text-xs font-semibold border border-white/80">
                    <option value="Kampus A / B UNAIR (Gubeng)">📍 Kampus A / B (Gubeng)</option>
                    <option value="Kampus C UNAIR (Mulyorejo)">📍 Kampus C (Mulyorejo)</option>
                    <option value="Surabaya Timur (Rungkut / Sukolilo)">📍 Surabaya Timur</option>
                    <option value="Surabaya Pusat / Selatan">📍 Surabaya Pusat / Selatan</option>
                    <option value="Surabaya Barat / Utara">📍 Surabaya Barat / Utara</option>
                    <option value="Lainnya / Luar Kota">📍 Lokasi Lainnya</option>
                  </select>
                </div>
                <div class="space-y-1">
                  <label for="customTimeSelect" class="block text-[11px] font-bold text-slate-200">Waktu Kebutuhan</label>
                  <select id="customTimeSelect" class="focus-ring w-full px-3 py-2 rounded-xl bg-white text-navy-950 text-xs font-semibold border border-white/80">
                    <option value="⚡ Kebutuhan Urgent / Hari Ini">⚡ Urgent / Hari Ini</option>
                    <option value="📅 Besok Pagi / Siang">📅 Besok Pagi / Siang</option>
                    <option value="🗓️ Akhir Pekan (Sabtu / Minggu)">🗓️ Akhir Pekan</option>
                    <option value="💬 Fleksibel / Sesuai Kesepakatan">💬 Fleksibel / Santai</option>
                  </select>
                </div>
              </div>

              <!-- FIELD 3: FEMALE DORM GENDER TOGGLE -->
              <label for="customFemaleCheck" class="p-2.5 rounded-xl bg-rose-500/20 border border-rose-300/30 flex items-center gap-2 cursor-pointer hover:bg-rose-500/30 transition">
                <input type="checkbox" id="customFemaleCheck" class="rounded text-rose-500 focus:ring-rose-400 w-4 h-4 bg-white border-white/50 shrink-0" />
                <span class="text-[11px] sm:text-xs text-rose-200 font-semibold flex items-center gap-1.5">
                  <span>🌸</span>
                  <span>(Klien Cewek: Request Worker Cewek)</span>
                </span>
              </label>

              <!-- SUBMIT BUTTON DIRECT TO WHATSAPP -->
              <button type="button" onclick="sendCustomOrderToWA()" class="btn-spring focus-ring w-full py-3.5 sm:py-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-navy-950 font-heading font-black text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xl hover:shadow-2xl transition cursor-pointer">
                <svg class="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                <span id="customFormBtnText">Kirim Request Custom ke WA</span>
              </button>

              <p class="text-[11px] text-center text-slate-300 flex items-center justify-center gap-1.5 pt-0.5">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span id="customFormNoteText">Pesan otomatis diformat rapi ke WA Mas Afif</span>
              </p>

            </div>
          </div>

        </div>

      </div>

      <!-- SUBHEADER FOR 8 PRE-PACKAGED SERVICES -->
      <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 pb-4 border-b border-slate-200/80 gap-2">
        <div>
          <h3 class="font-heading font-extrabold text-lg sm:text-xl text-navy-950 tracking-tight">
            Atau Pilih 8 Kategori Layanan Siaga:
          </h3>
          <p class="text-xs sm:text-sm text-slate-500 mt-0.5">
            Paket tugas terstandarisasi dengan estimasi durasi dan satuan kerja jelas
          </p>
        </div>
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-600 text-xs font-bold shrink-0 self-start sm:self-auto shadow-2xs">
          <span class="w-2 h-2 rounded-full bg-amber-400"></span>
          <span id="layananCountBadge">8 Paket Terstandarisasi</span>
        </div>
      </div>

      <!-- 8 OFFICIAL CARE SERVICES GRID (PERSIS SCREENSHOT 4-COLUMN / RESPONSIVE) -->
      <div id="servicesGridContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
${servicesData.map(renderServiceCard).join('\n\n')}
      </div>

    </div>
  </section>

  <!-- ===================================================================== -->
  <!-- 4. SECTION MENGAPA MEMILIH KAMI? (KOSTCARE EXACT 1:1 SCREENSHOT 3)    -->
  <!-- ===================================================================== -->
  <section id="mengapa-kami" class="py-16 sm:py-24 bg-white border-y border-slate-200/80">
    <div class="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
      
      <!-- HEADING & SUBTITLE -->
      <div class="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div id="whySectionBadge" class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3">
          Standar Layanan &amp; Keunggulan Kami
        </div>
        <h2 id="whySectionTitle" class="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-navy-900 tracking-tight">
          Mengapa Memilih UNAIR SURUH?
        </h2>
        <p id="whySectionSubtitle" class="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
          Pembeda utama kami adalah kesepakatan harga yang jelas di awal, perlindungan privasi pelanggan, dan pembagian komisi pekerja yang transparan
        </p>
      </div>

      <!-- 6 FEATURE CARDS SESUAI PROPOSAL BISNIS BAB 2 & BAB 3 -->
      <div id="whyGridContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        
        <!-- ITEM 1: HARGA & RUANG LINGKUP DISEPAKATI DI AWAL -->
        <div class="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 flex items-start gap-4 shadow-xs hover:shadow-md transition card-spring hover:border-amber-400">
          <div class="w-12 h-12 rounded-2xl bg-amber-400 text-navy-900 flex items-center justify-center shrink-0 shadow-xs">
            <svg class="w-6 h-6 stroke-current fill-none stroke-2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
          </div>
          <div>
            <h3 id="whyCardTitle-0" class="font-heading font-bold text-base sm:text-lg text-navy-950">Harga Disepakati di Awal</h3>
            <p id="whyCardDesc-0" class="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
              Ruang lingkup tugas dan total biaya sudah jelas sebelum pengerjaan dimulai. 100% tanpa biaya siluman atau kenaikan tarif mendadak.
            </p>
          </div>
        </div>

        <!-- ITEM 2: FEE WORKER TRANSPARAN TANPA POTONGAN SEPIHAK -->
        <div class="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 flex items-start gap-4 shadow-xs hover:shadow-md transition card-spring hover:border-amber-400">
          <div class="w-12 h-12 rounded-2xl bg-amber-400 text-navy-900 flex items-center justify-center shrink-0 shadow-xs">
            <svg class="w-6 h-6 stroke-current fill-none stroke-2" viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </div>
          <div>
            <h3 id="whyCardTitle-1" class="font-heading font-bold text-base sm:text-lg text-navy-950">Fee Worker Terbuka &amp; Adil</h3>
            <p id="whyCardDesc-1" class="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
              Pekerja mengetahui besaran fee sebelum mengambil order. Tidak ada pemotongan sepihak, sehingga mitra bekerja maksimal, profesional, dan tuntas.
            </p>
          </div>
        </div>

        <!-- ITEM 3: GENDER MATCHING UNTUK RUANG PRIVAT -->
        <div class="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 flex items-start gap-4 shadow-xs hover:shadow-md transition card-spring hover:border-amber-400">
          <div class="w-12 h-12 rounded-2xl bg-amber-400 text-navy-900 flex items-center justify-center shrink-0 shadow-xs">
            <svg class="w-6 h-6 stroke-current fill-none stroke-2" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <div>
            <h3 id="whyCardTitle-2" class="font-heading font-bold text-base sm:text-lg text-navy-950">Gender Matching di Ruang Privat</h3>
            <p id="whyCardDesc-2" class="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
              Klien cewek bebas request penugasan 100% mitra mahasiswi cewek untuk pengerjaan di kos atau tempat tinggal demi kenyamanan, etika, dan privasi terjaga.
            </p>
          </div>
        </div>

        <!-- ITEM 4: LAYANAN 1 PINTU FLEKSIBEL -->
        <div class="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 flex items-start gap-4 shadow-xs hover:shadow-md transition card-spring hover:border-amber-400">
          <div class="w-12 h-12 rounded-2xl bg-amber-400 text-navy-900 flex items-center justify-center shrink-0 shadow-xs">
            <svg class="w-6 h-6 stroke-current fill-none stroke-2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
          </div>
          <div>
            <h3 id="whyCardTitle-3" class="font-heading font-bold text-base sm:text-lg text-navy-950">Layanan 1 Pintu Serba Bisa</h3>
            <p id="whyCardDesc-3" class="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
              Cukup 1 kontak untuk 8 kategori kebutuhan harian: pindahan kos, angkutan armada Tossa/Pick-up, titip barang, rakit meja, sampai urus berkas kampus.
            </p>
          </div>
        </div>

        <!-- ITEM 5: DIKERJAKAN MAHASISWA BERINTEGRITAS -->
        <div class="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 flex items-start gap-4 shadow-xs hover:shadow-md transition card-spring hover:border-amber-400">
          <div class="w-12 h-12 rounded-2xl bg-amber-400 text-navy-900 flex items-center justify-center shrink-0 shadow-xs">
            <svg class="w-6 h-6 stroke-current fill-none stroke-2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <div>
            <h3 id="whyCardTitle-4" class="font-heading font-bold text-base sm:text-lg text-navy-950">Mitra Mahasiswa Terverifikasi</h3>
            <p id="whyCardDesc-4" class="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
              Dikerjakan langsung oleh mahasiswa aktif di Surabaya yang telah diverifikasi identitasnya, komunikatif, ramah, dan bertanggung jawab penuh.
            </p>
          </div>
        </div>

        <!-- ITEM 6: RESPON CEPAT & SIAGA SURABAYA -->
        <div class="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 flex items-start gap-4 shadow-xs hover:shadow-md transition card-spring hover:border-amber-400">
          <div class="w-12 h-12 rounded-2xl bg-amber-400 text-navy-900 flex items-center justify-center shrink-0 shadow-xs">
            <svg class="w-6 h-6 stroke-current fill-none stroke-2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
          <div>
            <h3 id="whyCardTitle-5" class="font-heading font-bold text-base sm:text-lg text-navy-950">Respon Tanggap Kebutuhan Urgent</h3>
            <p id="whyCardDesc-5" class="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
              Siaga membantu kebutuhan mendadak: motor mogok di jalan, antar-jemput stasiun dini hari, hingga titip obat saat sakit di kos di seluruh penjuru Surabaya.
            </p>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- ===================================================================== -->
  <!-- 5. SECTION KEGIATAN KAMI (KOSTCARE EXACT FEED GRID SCREENSHOT 2)      -->
  <!-- ===================================================================== -->
  <section id="kegiatan-kami" class="py-16 sm:py-24 bg-[#F8FAFC]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- HEADING & SUBTITLE -->
      <div class="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
        <h2 id="reelsSectionTitle" class="font-heading font-black text-2xl sm:text-3xl text-navy-900 tracking-tight">
          Kegiatan Kami
        </h2>
        <p id="reelsSectionSubtitle" class="text-slate-600 text-sm sm:text-base mt-2">
          Follow TikTok &amp; IG kami <a href="https://www.tiktok.com/@unair_suruh" target="_blank" class="text-amber-600 font-bold hover:underline">@unair_suruh</a> agar terus update keseruan crew UNAIR SURUH
        </p>
      </div>

      <!-- 4-COLUMN RESPONSIVE FEED GRID (PERSIS SCREENSHOT 2) -->
      <div id="feedGridContainer" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
${feedData.map(renderFeedCard).join('\n\n')}
      </div>

      <!-- BOTTOM TIKTOK CHANNEL CTA -->
      <div class="mt-12 text-center">
        <a href="https://www.tiktok.com/@unair_suruh" target="_blank" rel="noopener noreferrer" class="btn-spring focus-ring inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-slate-300 hover:border-slate-400 text-slate-800 font-heading font-bold text-xs sm:text-sm shadow-xs transition">
          <svg class="w-4 h-4 fill-current text-rose-500" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/></svg>
          <span>Kunjungi Profil Resmi TikTok @unair_suruh</span>
        </a>
      </div>

    </div>
  </section>

  <!-- ===================================================================== -->
  <!-- 6. KATA MEREKA (TESTIMONI MAHASISWA UNAIR)                            -->
  <!-- ===================================================================== -->
    <!-- ===================================================================== -->
  <!-- 6. KATA MEREKA (REAL TIKTOK COMMENTS — BISA DI PENCET UNTUK BUKTI NYATA)  -->
  <!-- ===================================================================== -->
  <section id="testimoni" class="py-16 sm:py-24 bg-white border-y border-slate-200/80">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- SECTION HEADER WITH TIKTOK VERIFIED BADGE -->
      <div class="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-white text-[11px] font-bold tracking-wide mb-3 shadow-xs">
          <svg class="w-3.5 h-3.5 fill-current text-[#FE2C55]" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.89 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3 15.67a6.34 6.34 0 0 0 6.34 6.33c3.5 0 6.34-2.84 6.34-6.33v-5.2a8.21 8.21 0 0 0 4.91 1.62v-3.45a4.88 4.88 0 0 1-1-.05z"/></svg>
          <span>Real TikTok Comments</span>
        </div>
        <h2 id="testiSectionTitle" class="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-navy-900 tracking-tight">Kata Mereka di TikTok</h2>
        <p id="testiSectionSubtitle" class="text-slate-600 text-xs sm:text-base mt-2">
          Bukan ulasan rekayasa. Diambil langsung dari kolom komentar video resmi <span class="font-bold text-navy-900">@unair_suruh</span>. Klik kartu mana saja untuk verifikasi langsung di aplikasi TikTok.
        </p>
      </div>

      <!-- TESTIMONIALS CARDS GRID -->
      <div id="testimonialsContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        
        <!-- CARD 1: MOVE SURUH -->
        <a href="https://www.tiktok.com/@unair_suruh/video/7643032747786784020" target="_blank" rel="noopener noreferrer" class="group block relative p-5 sm:p-6 bg-[#F8FAFC] hover:bg-white border border-slate-200/90 hover:border-slate-400 rounded-2xl transition-all duration-300 flex flex-col justify-between card-spring shadow-xs hover:shadow-lg">
          <div class="space-y-3.5">
            <div class="flex items-center justify-between gap-3">
              <div class="flex items-center gap-2.5">
                <div class="w-9 h-9 rounded-full bg-gradient-to-tr from-navy-900 to-amber-500 p-0.5 shrink-0 shadow-xs">
                  <div class="w-full h-full rounded-full bg-navy-900 text-amber-300 font-black text-xs flex items-center justify-center">ON</div>
                </div>
                <div class="leading-tight">
                  <div class="text-xs font-bold text-navy-900 flex items-center gap-1 group-hover:text-blue-600 transition-colors">
                    <span>@onlyudangrambutan</span>
                    <svg class="w-3.5 h-3.5 text-blue-500 fill-current shrink-0" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  </div>
                  <div class="text-[10px] text-slate-500 font-medium">Pelanggan Pindahan Kos Keputih</div>
                </div>
              </div>
              <div class="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center group-hover:bg-[#FE2C55] transition-colors shrink-0 shadow-xs" title="Buka komentar asli di TikTok">
                <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.89 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3 15.67a6.34 6.34 0 0 0 6.34 6.33c3.5 0 6.34-2.84 6.34-6.33v-5.2a8.21 8.21 0 0 0 4.91 1.62v-3.45a4.88 4.88 0 0 1-1-.05z"/></svg>
              </div>
            </div>
            <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[10px] font-bold border bg-blue-50 text-blue-700 border-blue-200">
              <span class="w-1.5 h-1.5 rounded-full bg-current opacity-70"></span>
              <span>Move SURUH • Pindahan Kos</span>
            </div>
            <p class="text-xs sm:text-[13px] text-slate-700 font-medium leading-relaxed italic">
              "sumpah guys pake jasanya worth it bngt, kemarin aku nemenin temenku buat pindahan kos dan bener-bener ini UNAIR SURUH yg ngerjain semua sat set, barang aman gaada lecet, bestt banget!"
            </p>
            <div class="text-[10px] text-slate-400 flex items-center gap-1">
              <svg class="w-3 h-3 text-slate-400 shrink-0 stroke-current fill-none stroke-2" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              <span class="truncate">Video: Pindah Kos Mahasiswa Tossa</span>
            </div>
          </div>
          <div class="pt-3.5 mt-4 border-t border-slate-200/80 flex items-center justify-between text-xs">
            <div class="flex items-center gap-1.5 font-bold text-slate-700">
              <svg class="w-4 h-4 fill-[#FE2C55]" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              <span>142 Suka</span>
            </div>
            <div class="inline-flex items-center gap-1 text-[11px] font-bold text-navy-900 group-hover:text-[#FE2C55] transition-colors">
              <span>Buka di TikTok</span>
              <svg class="w-3.5 h-3.5 stroke-current fill-none stroke-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" viewBox="0 0 24 24"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
            </div>
          </div>
        </a>

        <!-- CARD 2: DESK SURUH -->
        <a href="https://www.tiktok.com/@unair_suruh/video/7651856659639291156" target="_blank" rel="noopener noreferrer" class="group block relative p-5 sm:p-6 bg-[#F8FAFC] hover:bg-white border border-slate-200/90 hover:border-slate-400 rounded-2xl transition-all duration-300 flex flex-col justify-between card-spring shadow-xs hover:shadow-lg">
          <div class="space-y-3.5">
            <div class="flex items-center justify-between gap-3">
              <div class="flex items-center gap-2.5">
                <div class="w-9 h-9 rounded-full bg-gradient-to-tr from-navy-900 to-amber-500 p-0.5 shrink-0 shadow-xs">
                  <div class="w-full h-full rounded-full bg-navy-900 text-amber-300 font-black text-xs flex items-center justify-center">FR</div>
                </div>
                <div class="leading-tight">
                  <div class="text-xs font-bold text-navy-900 flex items-center gap-1 group-hover:text-blue-600 transition-colors">
                    <span>@franxiero</span>
                    <svg class="w-3.5 h-3.5 text-blue-500 fill-current shrink-0" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  </div>
                  <div class="text-[10px] text-slate-500 font-medium">Mahasiswa FH UNAIR Kampus B</div>
                </div>
              </div>
              <div class="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center group-hover:bg-[#FE2C55] transition-colors shrink-0 shadow-xs" title="Buka komentar asli di TikTok">
                <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.89 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3 15.67a6.34 6.34 0 0 0 6.34 6.33c3.5 0 6.34-2.84 6.34-6.33v-5.2a8.21 8.21 0 0 0 4.91 1.62v-3.45a4.88 4.88 0 0 1-1-.05z"/></svg>
              </div>
            </div>
            <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[10px] font-bold border bg-emerald-50 text-emerald-800 border-emerald-200">
              <span class="w-1.5 h-1.5 rounded-full bg-current opacity-70"></span>
              <span>Desk SURUH • Urus Berkas &amp; Dokumen</span>
            </div>
            <p class="text-xs sm:text-[13px] text-slate-700 font-medium leading-relaxed italic">
              "Penyelamat pas lagi hectic sidang &amp; magang! Minta tolong urus legalisir berkas kampus langsung diantar rapi tepat waktu. Drivernya sopan &amp; terpercaya pol, makasih rek!"
            </p>
            <div class="text-[10px] text-slate-400 flex items-center gap-1">
              <svg class="w-3 h-3 text-slate-400 shrink-0 stroke-current fill-none stroke-2" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              <span class="truncate">Video: Ambil Dokumen &amp; Berkas Fisik</span>
            </div>
          </div>
          <div class="pt-3.5 mt-4 border-t border-slate-200/80 flex items-center justify-between text-xs">
            <div class="flex items-center gap-1.5 font-bold text-slate-700">
              <svg class="w-4 h-4 fill-[#FE2C55]" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              <span>89 Suka</span>
            </div>
            <div class="inline-flex items-center gap-1 text-[11px] font-bold text-navy-900 group-hover:text-[#FE2C55] transition-colors">
              <span>Buka di TikTok</span>
              <svg class="w-3.5 h-3.5 stroke-current fill-none stroke-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" viewBox="0 0 24 24"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
            </div>
          </div>
        </a>

        <!-- CARD 3: TASK SURUH -->
        <a href="https://www.tiktok.com/@unair_suruh/video/7650823166306323733" target="_blank" rel="noopener noreferrer" class="group block relative p-5 sm:p-6 bg-[#F8FAFC] hover:bg-white border border-slate-200/90 hover:border-slate-400 rounded-2xl transition-all duration-300 flex flex-col justify-between card-spring shadow-xs hover:shadow-lg">
          <div class="space-y-3.5">
            <div class="flex items-center justify-between gap-3">
              <div class="flex items-center gap-2.5">
                <div class="w-9 h-9 rounded-full bg-gradient-to-tr from-navy-900 to-amber-500 p-0.5 shrink-0 shadow-xs">
                  <div class="w-full h-full rounded-full bg-navy-900 text-amber-300 font-black text-xs flex items-center justify-center">CS</div>
                </div>
                <div class="leading-tight">
                  <div class="text-xs font-bold text-navy-900 flex items-center gap-1 group-hover:text-blue-600 transition-colors">
                    <span>@clarissasalsaa</span>
                    <svg class="w-3.5 h-3.5 text-blue-500 fill-current shrink-0" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  </div>
                  <div class="text-[10px] text-slate-500 font-medium">Pelanggan Mahasiswi Dharmawangsa</div>
                </div>
              </div>
              <div class="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center group-hover:bg-[#FE2C55] transition-colors shrink-0 shadow-xs" title="Buka komentar asli di TikTok">
                <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.89 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3 15.67a6.34 6.34 0 0 0 6.34 6.33c3.5 0 6.34-2.84 6.34-6.33v-5.2a8.21 8.21 0 0 0 4.91 1.62v-3.45a4.88 4.88 0 0 1-1-.05z"/></svg>
              </div>
            </div>
            <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[10px] font-bold border bg-rose-50 text-rose-700 border-rose-200">
              <span class="w-1.5 h-1.5 rounded-full bg-current opacity-70"></span>
              <span>Task SURUH • Request Worker Cewek</span>
            </div>
            <p class="text-xs sm:text-[13px] text-slate-700 font-medium leading-relaxed italic">
              "Kamar kos abis ditinggal liburan semester berdebu parah, minta tolong tim Task SURUH langsung kinclong rapi wangi. Senang banget klien cewek bisa request worker cewek, jadi ngerasa aman &amp; nyaman!"
            </p>
            <div class="text-[10px] text-slate-400 flex items-center gap-1">
              <svg class="w-3 h-3 text-slate-400 shrink-0 stroke-current fill-none stroke-2" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              <span class="truncate">Video: Layanan Khusus Klien Cewek</span>
            </div>
          </div>
          <div class="pt-3.5 mt-4 border-t border-slate-200/80 flex items-center justify-between text-xs">
            <div class="flex items-center gap-1.5 font-bold text-slate-700">
              <svg class="w-4 h-4 fill-[#FE2C55]" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              <span>176 Suka</span>
            </div>
            <div class="inline-flex items-center gap-1 text-[11px] font-bold text-navy-900 group-hover:text-[#FE2C55] transition-colors">
              <span>Buka di TikTok</span>
              <svg class="w-3.5 h-3.5 stroke-current fill-none stroke-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" viewBox="0 0 24 24"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
            </div>
          </div>
        </a>

        <!-- CARD 4: GO SURUH -->
        <a href="https://www.tiktok.com/@unair_suruh/video/7651856659639291156" target="_blank" rel="noopener noreferrer" class="group block relative p-5 sm:p-6 bg-[#F8FAFC] hover:bg-white border border-slate-200/90 hover:border-slate-400 rounded-2xl transition-all duration-300 flex flex-col justify-between card-spring shadow-xs hover:shadow-lg">
          <div class="space-y-3.5">
            <div class="flex items-center justify-between gap-3">
              <div class="flex items-center gap-2.5">
                <div class="w-9 h-9 rounded-full bg-gradient-to-tr from-navy-900 to-amber-500 p-0.5 shrink-0 shadow-xs">
                  <div class="w-full h-full rounded-full bg-navy-900 text-amber-300 font-black text-xs flex items-center justify-center">DH</div>
                </div>
                <div class="leading-tight">
                  <div class="text-xs font-bold text-navy-900 flex items-center gap-1 group-hover:text-blue-600 transition-colors">
                    <span>@dhionasywa</span>
                    <svg class="w-3.5 h-3.5 text-blue-500 fill-current shrink-0" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  </div>
                  <div class="text-[10px] text-slate-500 font-medium">Mahasiswi FEB UNAIR</div>
                </div>
              </div>
              <div class="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center group-hover:bg-[#FE2C55] transition-colors shrink-0 shadow-xs" title="Buka komentar asli di TikTok">
                <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.89 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3 15.67a6.34 6.34 0 0 0 6.34 6.33c3.5 0 6.34-2.84 6.34-6.33v-5.2a8.21 8.21 0 0 0 4.91 1.62v-3.45a4.88 4.88 0 0 1-1-.05z"/></svg>
              </div>
            </div>
            <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[10px] font-bold border bg-sky-50 text-sky-700 border-sky-200">
              <span class="w-1.5 h-1.5 rounded-full bg-current opacity-70"></span>
              <span>Go SURUH • Antar Jemput Stasiun &amp; Kampus</span>
            </div>
            <p class="text-xs sm:text-[13px] text-slate-700 font-medium leading-relaxed italic">
              "Terpantau posisi di FEB — sat set banget langsung dibantu jemput ke Stasiun Gubeng pas hujan deras. Harganya transparan ga ditembak, langganan tetap ini mah!"
            </p>
            <div class="text-[10px] text-slate-400 flex items-center gap-1">
              <svg class="w-3 h-3 text-slate-400 shrink-0 stroke-current fill-none stroke-2" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              <span class="truncate">Video: Anjem Kampus B Mobil AC</span>
            </div>
          </div>
          <div class="pt-3.5 mt-4 border-t border-slate-200/80 flex items-center justify-between text-xs">
            <div class="flex items-center gap-1.5 font-bold text-slate-700">
              <svg class="w-4 h-4 fill-[#FE2C55]" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              <span>115 Suka</span>
            </div>
            <div class="inline-flex items-center gap-1 text-[11px] font-bold text-navy-900 group-hover:text-[#FE2C55] transition-colors">
              <span>Buka di TikTok</span>
              <svg class="w-3.5 h-3.5 stroke-current fill-none stroke-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" viewBox="0 0 24 24"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
            </div>
          </div>
        </a>

        <!-- CARD 5: KEEP SURUH -->
        <a href="https://www.tiktok.com/@unair_suruh/video/7643032747786784020" target="_blank" rel="noopener noreferrer" class="group block relative p-5 sm:p-6 bg-[#F8FAFC] hover:bg-white border border-slate-200/90 hover:border-slate-400 rounded-2xl transition-all duration-300 flex flex-col justify-between card-spring shadow-xs hover:shadow-lg">
          <div class="space-y-3.5">
            <div class="flex items-center justify-between gap-3">
              <div class="flex items-center gap-2.5">
                <div class="w-9 h-9 rounded-full bg-gradient-to-tr from-navy-900 to-amber-500 p-0.5 shrink-0 shadow-xs">
                  <div class="w-full h-full rounded-full bg-navy-900 text-amber-300 font-black text-xs flex items-center justify-center">BS</div>
                </div>
                <div class="leading-tight">
                  <div class="text-xs font-bold text-navy-900 flex items-center gap-1 group-hover:text-blue-600 transition-colors">
                    <span>@bimasakti_sby</span>
                    <svg class="w-3.5 h-3.5 text-blue-500 fill-current shrink-0" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  </div>
                  <div class="text-[10px] text-slate-500 font-medium">Mahasiswa Rantau Kampus C</div>
                </div>
              </div>
              <div class="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center group-hover:bg-[#FE2C55] transition-colors shrink-0 shadow-xs" title="Buka komentar asli di TikTok">
                <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.89 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3 15.67a6.34 6.34 0 0 0 6.34 6.33c3.5 0 6.34-2.84 6.34-6.33v-5.2a8.21 8.21 0 0 0 4.91 1.62v-3.45a4.88 4.88 0 0 1-1-.05z"/></svg>
              </div>
            </div>
            <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[10px] font-bold border bg-amber-50 text-amber-800 border-amber-200">
              <span class="w-1.5 h-1.5 rounded-full bg-current opacity-70"></span>
              <span>Keep SURUH • Titip Barang Mudik</span>
            </div>
            <p class="text-xs sm:text-[13px] text-slate-700 font-medium leading-relaxed italic">
              "Solusi anak rantau pas mudik! Nitip koper &amp; inventaris kos 2 bulan aman sentosa, ruang simpan bersih dan pas diambil barang utuh tanpa kendala. Beneran ngebantu banget!"
            </p>
            <div class="text-[10px] text-slate-400 flex items-center gap-1">
              <svg class="w-3 h-3 text-slate-400 shrink-0 stroke-current fill-none stroke-2" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              <span class="truncate">Video: Ruang Penitipan Aman UNAIR</span>
            </div>
          </div>
          <div class="pt-3.5 mt-4 border-t border-slate-200/80 flex items-center justify-between text-xs">
            <div class="flex items-center gap-1.5 font-bold text-slate-700">
              <svg class="w-4 h-4 fill-[#FE2C55]" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              <span>98 Suka</span>
            </div>
            <div class="inline-flex items-center gap-1 text-[11px] font-bold text-navy-900 group-hover:text-[#FE2C55] transition-colors">
              <span>Buka di TikTok</span>
              <svg class="w-3.5 h-3.5 stroke-current fill-none stroke-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" viewBox="0 0 24 24"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
            </div>
          </div>
        </a>

        <!-- CARD 6: FIX SURUH -->
        <a href="https://www.tiktok.com/@unair_suruh/video/7643032747786784020" target="_blank" rel="noopener noreferrer" class="group block relative p-5 sm:p-6 bg-[#F8FAFC] hover:bg-white border border-slate-200/90 hover:border-slate-400 rounded-2xl transition-all duration-300 flex flex-col justify-between card-spring shadow-xs hover:shadow-lg">
          <div class="space-y-3.5">
            <div class="flex items-center justify-between gap-3">
              <div class="flex items-center gap-2.5">
                <div class="w-9 h-9 rounded-full bg-gradient-to-tr from-navy-900 to-amber-500 p-0.5 shrink-0 shadow-xs">
                  <div class="w-full h-full rounded-full bg-navy-900 text-amber-300 font-black text-xs flex items-center justify-center">RA</div>
                </div>
                <div class="leading-tight">
                  <div class="text-xs font-bold text-navy-900 flex items-center gap-1 group-hover:text-blue-600 transition-colors">
                    <span>@rizky_aditya99</span>
                    <svg class="w-3.5 h-3.5 text-blue-500 fill-current shrink-0" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  </div>
                  <div class="text-[10px] text-slate-500 font-medium">Anak Kos Gubeng Kertajaya</div>
                </div>
              </div>
              <div class="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center group-hover:bg-[#FE2C55] transition-colors shrink-0 shadow-xs" title="Buka komentar asli di TikTok">
                <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.89 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3 15.67a6.34 6.34 0 0 0 6.34 6.33c3.5 0 6.34-2.84 6.34-6.33v-5.2a8.21 8.21 0 0 0 4.91 1.62v-3.45a4.88 4.88 0 0 1-1-.05z"/></svg>
              </div>
            </div>
            <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[10px] font-bold border bg-violet-50 text-violet-800 border-violet-200">
              <span class="w-1.5 h-1.5 rounded-full bg-current opacity-70"></span>
              <span>Fix SURUH • Rakit Perabot &amp; Meja</span>
            </div>
            <p class="text-xs sm:text-[13px] text-slate-700 font-medium leading-relaxed italic">
              "Beli lemari 3 pintu sama meja belajar di e-commerce pusing rakitnya sendiri, panggil Fix SURUH sore langsung kelar dalam sejam, baut kencang &amp; rapi. Top recommended!"
            </p>
            <div class="text-[10px] text-slate-400 flex items-center gap-1">
              <svg class="w-3 h-3 text-slate-400 shrink-0 stroke-current fill-none stroke-2" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              <span class="truncate">Video: Armada Siaga UNAIR SURUH</span>
            </div>
          </div>
          <div class="pt-3.5 mt-4 border-t border-slate-200/80 flex items-center justify-between text-xs">
            <div class="flex items-center gap-1.5 font-bold text-slate-700">
              <svg class="w-4 h-4 fill-[#FE2C55]" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              <span>124 Suka</span>
            </div>
            <div class="inline-flex items-center gap-1 text-[11px] font-bold text-navy-900 group-hover:text-[#FE2C55] transition-colors">
              <span>Buka di TikTok</span>
              <svg class="w-3.5 h-3.5 stroke-current fill-none stroke-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" viewBox="0 0 24 24"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
            </div>
          </div>
        </a>

      </div>

      <!-- BOTTOM TRUST ASSURANCE & CALL TO ACTION -->
      <div class="mt-12 text-center space-y-4">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-xs text-slate-700 font-medium">
          <svg class="w-4 h-4 text-emerald-600 stroke-current fill-none stroke-2 shrink-0" viewBox="0 0 24 24"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
          <span><strong>100% Komentar Asli:</strong> Klik kartu di atas untuk membuka video TikTok resmi dan melihat komentarnya secara langsung.</span>
        </div>
        <div>
          <a href="https://www.tiktok.com/@unair_suruh" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-navy-900 hover:bg-[#FE2C55] text-white text-xs sm:text-sm font-bold transition shadow-sm hover:shadow-md">
            <svg class="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.89 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3 15.67a6.34 6.34 0 0 0 6.34 6.33c3.5 0 6.34-2.84 6.34-6.33v-5.2a8.21 8.21 0 0 0 4.91 1.62v-3.45a4.88 4.88 0 0 1-1-.05z"/></svg>
            <span>Kunjungi Akun Resmi @unair_suruh di TikTok</span>
            <svg class="w-3.5 h-3.5 stroke-current fill-none stroke-2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </div>

    </div>
  </section>

  <!-- ===================================================================== -->
  <!-- 7. FAQ (PERTANYAAN YANG SERING DITANYAKAN)                             -->
  <!-- ===================================================================== -->
  <section id="faq" class="py-16 sm:py-24 bg-[#F8FAFC]">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="text-center mb-12 sm:mb-16">
        <h2 id="faqSectionTitle" class="font-heading font-black text-2xl sm:text-3xl text-navy-900 tracking-tight">
          Pertanyaan yang Sering Ditanyakan
        </h2>
        <p id="faqSectionSubtitle" class="text-slate-600 text-sm sm:text-base mt-2">Segala hal yang perlu kamu ketahui tentang 8 lini layanan kami</p>
      </div>

      <div id="faqListContainer" class="space-y-4">
        
        <details class="group bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs transition duration-200">
          <summary class="flex items-center justify-between font-heading font-bold text-sm sm:text-base text-navy-900 cursor-pointer list-none">
            <span>Bagaimana sistem tarif dan penentuan satuannya?</span>
            <svg class="w-4 h-4 stroke-current fill-none stroke-2 group-open:rotate-180 transition" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
          </summary>
          <p class="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
            Tarif dihitung sangat transparan dengan satuan kerja baku: /trip untuk Go SURUH, /muatan armada untuk Move SURUH, /box/bulan untuk Keep SURUH, /unit untuk Fix SURUH, /tugas untuk Task SURUH, /berkas untuk Desk SURUH, /shift untuk Crew SURUH, dan /sesi untuk Talent SURUH. Tidak ada biaya siluman.
          </p>
        </details>

        <details class="group bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs transition duration-200">
          <summary class="flex items-center justify-between font-heading font-bold text-sm sm:text-base text-navy-900 cursor-pointer list-none">
            <span>Bagaimana jaminan keamanan untuk barang yang dititipkan (Keep SURUH)?</span>
            <svg class="w-4 h-4 stroke-current fill-none stroke-2 group-open:rotate-180 transition" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
          </summary>
          <p class="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
            Barang disimpan di ruangan khusus yang bersih, kering, dan terkunci aman. Setiap kardus atau barang diberi label segel identitas, dibuatkan tanda terima digital, dan dapat dimonitor secara berkala selama masa KKN, magang, atau liburan.
          </p>
        </details>

        <details class="group bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs transition duration-200">
          <summary class="flex items-center justify-between font-heading font-bold text-sm sm:text-base text-navy-900 cursor-pointer list-none">
            <span>Apakah bisa request worker cewek untuk klien cewek?</span>
            <svg class="w-4 h-4 stroke-current fill-none stroke-2 group-open:rotate-180 transition" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
          </summary>
          <p class="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
            Sangat bisa dan aman! Untuk klien cewek yang memesan layanan (seperti Move SURUH, Fix SURUH, atau Task SURUH), kamu cukup mencentang opsi (Klien Cewek: Request Worker Cewek). Kami memiliki SOP penugasan 100% mitra mahasiswi cewek demi menjaga kenyamanan, etika, dan privasi penuh.
          </p>
        </details>

        <details class="group bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs transition duration-200">
          <summary class="flex items-center justify-between font-heading font-bold text-sm sm:text-base text-navy-900 cursor-pointer list-none">
            <span>Bagaimana cara memesan layanan?</span>
            <svg class="w-4 h-4 stroke-current fill-none stroke-2 group-open:rotate-180 transition" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
          </summary>
          <p class="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
            Cukup klik tombol "Pesan" pada layanan yang diinginkan, lengkapi data singkat pada form, dan pesan akan langsung terformat rapi untuk dikirim via WhatsApp ke admin operasional di 0896-7777-2336.
          </p>
        </details>

      </div>
    </div>
  </section>

  <!-- ===================================================================== -->
  <!-- 8. SIAP UNTUK MEMULAI? (CTA BANNER PERSIS KOSTCARE)                   -->
  <!-- ===================================================================== -->
  <section class="py-16 sm:py-20 bg-navy-900 text-white relative overflow-hidden">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
      <span id="ctaBannerBadge" class="inline-block px-3.5 py-1 rounded-full bg-amber-400 text-navy-900 font-bold text-xs uppercase tracking-wider">
        Siap Untuk Memulai?
      </span>
      <h2 id="ctaBannerTitle" class="font-heading font-black text-2xl sm:text-4xl tracking-tight max-w-2xl mx-auto leading-tight">
        Butuh Bantuan Kos atau Urusan Kampus Hari Ini?
      </h2>
      <p id="ctaBannerDesc" class="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
        Tim mahasiswa UNAIR siap membantu kapan saja. Konsultasi kebutuhanmu via WhatsApp sekarang tanpa ribet.
      </p>
      <div class="pt-2">
        <a href="https://wa.me/${WA_NUMBER}?text=Halo%20Admin%20UNAIR%20SURUH,%20saya%20butuh%20bantuan%20layanan" target="_blank" rel="noopener noreferrer" class="btn-spring focus-ring inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-navy-900 font-heading font-extrabold text-sm sm:text-base shadow-lg transition">
          <svg class="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
          <span id="ctaBannerBtnText">Chat WhatsApp: +62 896-7777-2336</span>
        </a>
      </div>
    </div>
  </section>

  <!-- ===================================================================== -->
  <!-- 8. SECTION GABUNG JADI MITRA WORKER (PROPOSAL BAB 5 & 13.3)           -->
  <!-- ===================================================================== -->
  <section id="mitra" class="py-16 sm:py-24 bg-gradient-to-br from-navy-950 via-navy-900 to-[#0F1E36] text-white relative overflow-hidden border-t border-navy-800">
    <!-- Subtle ambient background radials -->
    <div class="absolute -top-24 -right-24 w-96 h-96 bg-amber-400/15 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none"></div>

    <div class="w-full px-6 sm:px-10 lg:px-14 xl:px-20 relative z-10">
      <div class="max-w-4xl mx-auto text-center space-y-6">
        
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-bold uppercase tracking-wider">
          <span id="mitraBadgeText">🤝 Rekrutmen Mitra Mahasiswa Surabaya</span>
        </div>

        <h2 class="font-heading font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white leading-tight">
          <span id="mitraTitle1">Ingin Penghasilan Fleksibel?</span><br>
          <span id="mitraTitle2" class="text-amber-400">Gabung Jadi Mitra Worker @unair_suruh</span>
        </h2>

        <p id="mitraDescText" class="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto font-medium">
          Buka peluang pendapatan bagi mahasiswa dan masyarakat tanpa meninggalkan kuliah atau aktivitas utama. Fee pekerja transparan disepakati di awal tanpa potongan sepihak.
        </p>

        <div class="pt-4 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-3 sm:gap-4">
          <a href="https://wa.me/${WA_NUMBER}?text=Halo%20kak%20Afif%20%2F%20Admin%20UNAIR%20SURUH!%20%F0%9F%91%8B%20Saya%20mahasiswa%20di%20Surabaya%20yang%20tertarik%20bergabung%20menjadi%20Mitra%20Worker%20UNAIR%20SURUH.%20Boleh%20minta%20info%20alur%20pendaftarannya%20kak%3F%20%F0%9F%99%8F" target="_blank" rel="noopener noreferrer" class="btn-spring focus-ring inline-flex items-center justify-center gap-3 px-6 sm:px-10 py-3.5 sm:py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-navy-950 font-heading font-black text-sm sm:text-lg shadow-xl hover:shadow-2xl transition w-full sm:w-auto">
            <svg class="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
            <span id="mitraBtnText">Daftar Jadi Mitra via WA</span>
          </a>
          <a href="#layanan" class="btn-spring focus-ring px-6 sm:px-7 py-3.5 sm:py-4 rounded-2xl border-2 border-white/25 hover:border-white text-white font-heading font-bold text-sm sm:text-base hover:bg-white/10 transition w-full sm:w-auto text-center">
            Lihat 8 Lini Tugas
          </a>
        </div>

        <!-- 3 Mitra Value Pillars Sesuai Proposal Bab 5 & 10 -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-8 text-left border-t border-navy-800/80">
          <div class="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
            <div class="font-bold text-amber-400 text-sm sm:text-base flex items-center gap-2 mb-1.5">
              <span id="mitraPillar1Title">⏱️ Jam Kerja Fleksibel</span>
            </div>
            <p id="mitraPillar1Desc" class="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Bebas memilih order saat tidak ada kelas kuliah. Mandiri finansial tanpa mengganggu kegiatan akademik utama.
            </p>
          </div>
          <div class="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
            <div class="font-bold text-amber-400 text-sm sm:text-base flex items-center gap-2 mb-1.5">
              <span id="mitraPillar2Title">💰 Fee Terbuka &amp; Utuh</span>
            </div>
            <p id="mitraPillar2Desc" class="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Besaran fee pekerja disepakati di awal sebelum kamu terima tugas. Fee dibagikan terbuka tanpa potongan sepihak.
            </p>
          </div>
          <div class="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
            <div class="font-bold text-amber-400 text-sm sm:text-base flex items-center gap-2 mb-1.5">
              <span id="mitraPillar3Title">🛡️ Gender Matching &amp; Aman</span>
            </div>
            <p id="mitraPillar3Desc" class="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Klien cewek bebas request worker cewek (100% mitra mahasiswi). Didukung koordinator tim siaga di lapangan.
            </p>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- ===================================================================== -->
  <!-- 9. FOOTER (CLEAN & MINIMALIST - SESUAI PROPOSAL BISNIS BAB 14)          -->
  <!-- ===================================================================== -->
  <footer class="bg-white border-t border-slate-200 py-12 text-slate-600 text-xs sm:text-sm">
    <div class="w-full px-6 sm:px-10 lg:px-14 xl:px-20">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-100">
        <div class="space-y-3 md:col-span-2">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-white border border-slate-200 p-0.5 overflow-hidden shadow-xs">
              <img src="${logoB64}" alt="Logo UNAIR SURUH" class="w-full h-full object-contain rounded-lg" />
            </div>
            <span id="footerBrandTitle" class="font-heading font-black text-xl text-navy-950">UNAIR SURUH</span>
          </div>
          <p id="footerDescText" class="text-xs sm:text-sm text-slate-500 max-w-md leading-relaxed font-medium">
            Usaha jasa satu pintu independen oleh mahasiswa di Surabaya yang membantu menyelesaikan kebutuhan harian dengan harga disepakati di awal dan fee pekerja transparan.
          </p>
          <div class="pt-2 flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-semibold text-slate-700">
            <span id="footerPjBadge" class="bg-amber-100 text-amber-900 px-3 py-1 rounded-full">PJ Operasional: Mas Afif</span>
            <span id="footerWorkerBadge" class="bg-blue-50 text-blue-800 px-3 py-1 rounded-full">22 Mitra Aktif</span>
          </div>
        </div>

        <div class="space-y-2">
          <div class="font-heading font-bold text-xs text-navy-900 uppercase tracking-wider">Layanan SURUH Series</div>
          <ul class="space-y-1.5 text-xs font-medium">
            <li><a href="#custom-suruh-spotlight" class="text-amber-600 font-bold hover:underline flex items-center gap-1"><span>✨</span> Custom SURUH (Bebas Request)</a></li>
            <li><a href="#layanan" class="hover:text-amber-600 transition">Go SURUH (Transportasi)</a></li>
            <li><a href="#layanan" class="hover:text-amber-600 transition">Move SURUH (Pindahan &amp; Tossa)</a></li>
            <li><a href="#layanan" class="hover:text-amber-600 transition">Keep SURUH (Titip Barang KKN)</a></li>
            <li><a href="#layanan" class="hover:text-amber-600 transition">Fix SURUH (Perakitan &amp; Servis)</a></li>
            <li><a href="#layanan" class="hover:text-amber-600 transition">Task SURUH (Personal Assistance)</a></li>
            <li><a href="#layanan" class="hover:text-amber-600 transition">Desk SURUH (Urus Berkas &amp; Dokumen)</a></li>
            <li><a href="#layanan" class="hover:text-amber-600 transition">Crew SURUH (Operasional Event)</a></li>
            <li><a href="#layanan" class="hover:text-amber-600 transition">Talent SURUH (Tutor &amp; Skill-Based)</a></li>
          </ul>
        </div>

        <div class="space-y-2">
          <div class="font-heading font-bold text-xs text-navy-900 uppercase tracking-wider">Kontak &amp; Kanal Resmi</div>
          <ul class="space-y-2 text-xs text-slate-600 font-medium">
            <li class="flex items-center gap-2">
              <span class="font-bold text-navy-950">WhatsApp:</span>
              <a href="https://wa.me/${WA_NUMBER}" target="_blank" rel="noopener noreferrer" data-wa-display class="text-amber-600 font-bold hover:underline">+62 896-7777-2336</a>
            </li>
            <li class="flex items-center gap-2">
              <span class="font-bold text-navy-950">Email:</span>
              <a id="footerEmailLink" href="mailto:unairsuruh@gmail.com" class="text-amber-600 hover:underline">unairsuruh@gmail.com</a>
            </li>
            <li class="flex items-center gap-2">
              <span class="font-bold text-navy-950">Instagram:</span>
              <a id="footerIgLink" href="https://www.instagram.com/unair_suruh" target="_blank" rel="noopener noreferrer" class="text-amber-600 hover:underline">@unair_suruh</a>
            </li>
            <li class="flex items-center gap-2">
              <span class="font-bold text-navy-950">TikTok:</span>
              <a id="footerTiktokLink" href="https://www.tiktok.com/@unair_suruh" target="_blank" rel="noopener noreferrer" class="text-amber-600 hover:underline">@unair_suruh</a>
            </li>
            <li id="footerCoverageText" class="pt-1 text-[11px] text-slate-500">
              Cakupan: Seluruh Surabaya &amp; Jawa Timur (Kampus A, B, C UNAIR, kawasan kos &amp; pemukiman).
            </li>
          </ul>
        </div>
      </div>

      <!-- DISCLAIMER INDEPENDENSI KAMPUS SESUAI PROPOSAL -->
      <div id="footerDisclaimerText" class="py-3.5 my-4 border-y border-slate-100 text-[11px] text-slate-500 text-center leading-relaxed font-medium">
        <strong class="text-slate-700">Pemberitahuan &amp; Disclaimer Independensi:</strong> UNAIR SURUH adalah inisiatif mandiri oleh mahasiswa dan masyarakat di Surabaya untuk menyelesaikan kebutuhan harian secara profesional. Layanan ini <u>tidak berafiliasi resmi, tidak disponsori, dan tidak dikelola secara institusional oleh Universitas Airlangga</u>.
      </div>

      <div class="pt-2 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-3">
        <div>&copy; 2026 UNAIR SURUH (@unair_suruh). Seluruh hak cipta dilindungi.</div>
        <div class="flex items-center gap-4">
          <a href="#mitra" class="text-amber-600 font-bold hover:underline">Gabung Mitra Mahasiswa</a>
          <a href="#" class="hover:underline">Kebijakan Privasi</a>
          <a href="#" class="hover:underline">Ketentuan Layanan</a>
        </div>
      </div>
    </div>
  </footer>

  <!-- ===================================================================== -->
  <!-- 10. FLOATING WHATSAPP BUTTON (KOSTCARE EXACT BOTTOM RIGHT)             -->
    <!-- ===================================================================== -->
  <!-- FLOATING WHATSAPP BUTTON (EYE-CATCHING, AUTHENTIC OFFICIAL SYMBOL)     -->
  <!-- ===================================================================== -->
  <div class="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 group">
    <!-- Floating Pill Tooltip (Desktop & Tablet) -->
    <a href="https://wa.me/${WA_NUMBER}?text=Halo%20Admin%20UNAIR%20SURUH,%20saya%20ingin%20tanya%20layanan" target="_blank" rel="noopener noreferrer" class="hidden sm:flex items-center gap-2 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-slate-200/90 text-navy-950 font-heading font-black text-xs hover:border-emerald-400 hover:shadow-emerald-500/20 hover:scale-105 transition duration-300">
      <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
      <span id="floatingWaLabel">Chat Admin Fast Respon</span>
    </a>

    <!-- Main Floating Round Action Button (Enlarged 68px with Glowing Halo) -->
    <a href="https://wa.me/${WA_NUMBER}?text=Halo%20Admin%20UNAIR%20SURUH,%20saya%20ingin%20tanya%20layanan" target="_blank" rel="noopener noreferrer" class="relative w-16 h-16 sm:w-[68px] sm:h-[68px] rounded-full bg-gradient-to-tr from-[#128C7E] via-[#25D366] to-[#25D366] text-white flex items-center justify-center shadow-[0_12px_32px_-4px_rgba(37,211,102,0.65)] hover:shadow-[0_16px_38px_-4px_rgba(37,211,102,0.85)] transition-all duration-300 hover:scale-110 active:scale-95 focus-ring" title="Chat via WhatsApp">
      
      <!-- Animated Soft Ping Halo -->
      <span class="absolute -inset-1 rounded-full bg-[#25D366] opacity-35 animate-ping pointer-events-none -z-10"></span>

      <!-- Official WhatsApp SVG Symbol -->
      <svg class="w-9 h-9 sm:w-10 sm:h-10 fill-current drop-shadow-sm" viewBox="0 0 24 24">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
      </svg>

      <!-- Active Online Status Indicator -->
      <span class="absolute top-0.5 right-0.5 flex h-4 w-4">
        <span class="relative inline-flex rounded-full h-4 w-4 bg-emerald-400 border-2 border-white shadow-xs"></span>
      </span>
    </a>
  </div>

  <!-- ===================================================================== -->
  <!-- 11. LIGHTBOX REEL PLAYER MODAL (BEBAS DARI TOMBOL "PESAN JASA")       -->
  <!-- ===================================================================== -->
  <div id="reelModalBackdrop" class="fixed inset-0 bg-black/90 backdrop-blur-md z-50 hidden flex items-center justify-center p-3 sm:p-4" onclick="closeReelModal(event)">
    <div id="reelModalContainer" class="relative bg-black rounded-3xl max-w-sm w-full aspect-[9/16] max-h-[82vh] sm:max-h-[88vh] overflow-hidden shadow-2xl border border-white/20 flex flex-col justify-between" onclick="event.stopPropagation()">
      
      <!-- TOP BAR -->
      <div class="absolute top-4 left-4 right-4 flex items-center justify-between z-30 text-white">
        <div class="flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
          <span class="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
          <span class="text-xs font-bold text-white">TikTok @unair_suruh</span>
        </div>
        <button onclick="closeReelModal()" class="w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md text-white flex items-center justify-center focus-ring transition">
          <svg class="w-4 h-4 stroke-current fill-none stroke-2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>

      <!-- VIDEO SURFACE -->
      <div class="relative w-full h-full flex items-center justify-center bg-black cursor-pointer" onclick="toggleModalPlayPause()">
        <video id="modalVideoPlayer" src="" playsinline loop class="w-full h-full object-cover"></video>
        
        <!-- PLAY/PAUSE INDICATOR -->
        <div id="modalPlayIndicator" class="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 transition duration-300">
          <div class="w-16 h-16 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white border border-white/40">
            <svg id="modalPlayIconSvg" class="w-8 h-8 fill-current translate-x-0.5" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          </div>
        </div>

        <div class="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-black/30 pointer-events-none"></div>
      </div>

      <!-- RIGHT SIDE ACTIONS (LIKE / SHARE / MUTE) -->
      <div class="absolute right-3 bottom-16 flex flex-col items-center gap-3 z-30 text-white">
        <!-- LIKE -->
        <button onclick="toggleModalLike()" id="modalLikeBtn" class="flex flex-col items-center group focus-ring">
          <div class="w-10 h-10 rounded-full bg-white/10 hover:bg-rose-500/30 backdrop-blur-sm flex items-center justify-center text-white transition">
            <svg id="modalHeartSvg" class="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
          </div>
          <span class="text-[10px] font-bold mt-1 text-slate-200" id="modalLikeCount">48</span>
        </button>

        <!-- MUTE / UNMUTE -->
        <button onclick="toggleModalMute()" class="flex flex-col items-center group focus-ring">
          <div class="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition">
            <svg id="modalAudioIconSvg" class="w-5 h-5 stroke-current fill-none stroke-2 stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24"><path d="M11 5 6 9H2v6h4l5 4V5Z"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
          </div>
          <span class="text-[10px] font-semibold mt-1 text-slate-300">Suara</span>
        </button>

        <!-- TIKTOK LINK -->
        <a id="modalExternalLink" href="https://www.tiktok.com/@unair_suruh" target="_blank" class="flex flex-col items-center group focus-ring" title="Tonton di TikTok">
          <div class="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition">
            <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/></svg>
          </div>
          <span class="text-[10px] font-semibold mt-1 text-slate-300">TikTok</span>
        </a>
      </div>

      <!-- BOTTOM CAPTION (NO "PESAN JASA" BUTTON!) -->
      <div class="absolute bottom-0 left-0 right-0 p-4 z-30 space-y-2 pointer-events-auto">
        <div class="text-white space-y-1 pr-12">
          <div class="flex items-center gap-1.5">
            <span class="font-heading font-black text-xs text-amber-400">@unair_suruh</span>
            <svg class="w-3.5 h-3.5 text-blue-400 fill-current" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </div>
          <p id="modalReelCaption" class="text-xs text-slate-200 line-clamp-3 leading-snug">Caption video kegiatan...</p>
        </div>

        <!-- PROGRESS BAR -->
        <div class="w-full h-1 bg-white/20 rounded-full overflow-hidden">
          <div id="modalProgressBar" class="h-full bg-amber-400 w-0"></div>
        </div>
      </div>

    </div>
  </div>

  <!-- ===================================================================== -->
  <!-- 12. POPUP WIZARD PEMESANAN (8 CARE SERVICES & DIRECT WA SENDER)       -->
  <!-- ===================================================================== -->
  <!-- ===================================================================== -->
  <!-- 12. MODAL FORM PEMESANAN (SUPER SIMPLE & FRIENDLY CHAT)               -->
  <!-- ===================================================================== -->
  <div id="orderModalBackdrop" class="fixed inset-0 bg-black/75 backdrop-blur-xs z-50 hidden flex items-center justify-center p-3 sm:p-4" onclick="closeOrderModal(event)">
    <div id="orderModalCard" class="bg-white rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col card-spring" onclick="event.stopPropagation()">
      
      <!-- MODAL HEADER -->
      <div class="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-white">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-lg shrink-0">
            👋
          </div>
          <div>
            <h3 class="font-heading font-black text-lg text-navy-900 leading-tight">Mau Dibantu Apa Hari Ini?</h3>
            <p class="text-xs text-slate-500">Pesan cepat, langsung ngobrol santai di WhatsApp!</p>
          </div>
        </div>
        <button onclick="closeOrderModal()" class="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition focus-ring">
          <svg class="w-4 h-4 stroke-current fill-none stroke-2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>

      <!-- FORM BODY: ONLY 3 SIMPLE & FRIENDLY INPUTS -->
      <div class="p-5 sm:p-6 space-y-4">
        
        <!-- 1. PILIH LAYANAN CARE -->
        <div class="space-y-1.5">
          <label class="block text-xs font-bold text-slate-700">Pilih Layanan SURUH Series</label>
          <div class="relative">
            <select id="wizardService" class="focus-ring w-full px-4 py-3 rounded-2xl border border-slate-300 font-bold text-xs sm:text-sm bg-white text-navy-900 appearance-none pr-10">
              <option value="custom-suruh">✨ Custom SURUH • Bebas Request Apa Saja (Nego di Awal)</option>
              <option value="move-suruh" selected>🚚 Move SURUH • Pindahan Kos (Mulai Rp 65.000)</option>
              <option value="go-suruh">🛵 Go SURUH • Antar Jemput Kampus / Stasiun (Mulai Rp 20.000)</option>
              <option value="keep-suruh">📦 Keep SURUH • Penitipan Barang Kos (Mulai Rp 15.000/bln)</option>
              <option value="fix-suruh">🛠️ Fix SURUH • Rakit Meja/Lemari &amp; Servis (Mulai Rp 40.000)</option>
              <option value="task-suruh">🎒 Task SURUH • Titip Beli &amp; Personal Assist (Mulai Rp 15.000)</option>
              <option value="desk-suruh">📄 Desk SURUH • Urus Berkas, File &amp; Dokumen (Mulai Rp 15.000)</option>
              <option value="crew-suruh">🎪 Crew SURUH • Tenaga Event &amp; Kampus (Mulai Rp 75.000)</option>
              <option value="talent-suruh">🎓 Talent SURUH • Tutor &amp; Skill Worker (Mulai Rp 50.000)</option>
            </select>
            <div class="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <svg class="w-4 h-4 stroke-current fill-none stroke-2" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>
            </div>
          </div>
        </div>

        <!-- 2. NAMA PANGGILAN -->
        <div class="space-y-1.5">
          <label class="block text-xs font-bold text-slate-700">Nama Panggilan Kamu</label>
          <input type="text" id="wizardName" placeholder="Contoh: Sarah / Budi / Rian" class="focus-ring w-full px-4 py-2.5 rounded-2xl border border-slate-300 text-xs sm:text-sm font-medium" />
        </div>

        <!-- 3. DETAIL KEBUTUHAN & LOKASI -->
        <div class="space-y-1.5">
          <label class="block text-xs font-bold text-slate-700">Mau dibantu apa &amp; di mana?</label>
          <textarea id="wizardNotes" rows="3" placeholder="Tulis santai aja kak, misal:&#10;'Bantu angkut lemari kos dari Sutorejo ke Mulyorejo besok siang ya kak...'" class="focus-ring w-full px-4 py-2.5 rounded-2xl border border-slate-300 text-xs sm:text-sm leading-relaxed"></textarea>
        </div>

        <!-- 4. TOGGLE KLIEN CEWEK (REQUEST WORKER CEWEK) -->
        <label for="wizardIsFemaleKos" class="p-3 rounded-2xl bg-rose-50/70 border border-rose-200/80 flex items-center gap-2.5 cursor-pointer hover:bg-rose-50 transition">
          <input type="checkbox" id="wizardIsFemaleKos" class="rounded text-rose-600 focus:ring-rose-500 w-4 h-4 shrink-0" />
          <span class="text-xs text-rose-900 font-semibold flex items-center gap-1.5">
            <span>🌸</span>
            <span>(Klien Cewek: Request Worker Cewek)</span>
          </span>
        </label>

      </div>

      <!-- MODAL FOOTER WITH DIRECT WA BUTTON -->
      <div class="p-5 sm:p-6 border-t border-slate-100 bg-slate-50/70 space-y-2.5">
        <button onclick="sendOrderToWhatsApp()" class="btn-spring focus-ring w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-heading font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition">
          <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
          <span>Chat WhatsApp Sekarang</span>
        </button>
        <p class="text-[11px] text-center text-slate-500 flex items-center justify-center gap-1.5 pt-1">
          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Admin WhatsApp Resmi: <strong id="modalWaDisplay" data-wa-display class="text-slate-700">+62 896-7777-2336</strong></span>
        </p>
      </div>

    </div>
  </div>

  <!-- ===================================================================== -->
  <!-- 13. JAVASCRIPT & MOTION ENGINE                                        -->
  <!-- ===================================================================== -->
  <script>
    let FEED_DATA = ${JSON.stringify(feedData)};
    const DEFAULT_SERVICES_DATA = ${JSON.stringify(servicesData)};

    // Escape text before injecting into innerHTML (CMS / localStorage data)
    function esc(s) {
      return String(s == null ? '' : s).replace(/[&<>"']/g, function(ch) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
      });
    }

    function formatIdr(num) {
      var n = parseInt(String(num || 0).replace(/[^0-9]/g, ''), 10) || 0;
      return n.toLocaleString('id-ID');
    }

    function formatWaReadable(raw) {
      var clean = String(raw || '${WA_NUMBER}').replace(/[^0-9]/g, '');
      if (clean.indexOf('0') === 0) clean = '62' + clean.slice(1);
      if (clean.indexOf('62') === 0 && clean.length >= 11) {
        var rest = clean.slice(2);
        return '+62 ' + rest.slice(0, 3) + '-' + rest.slice(3, 7) + '-' + rest.slice(7);
      }
      return '+' + clean;
    }

    // Reels added from Admin have no poster: fall back to "<video>-poster.webp"
    function posterFor(c) {
      return c.poster || String(c.src || '').replace(/[.]mp4$/, '-poster.webp');
    }

    // DYNAMIC WHATSAPP NUMBER SYNC (DARI WEB ADMIN CMS)
    function getWaNumber() {
      try {
        var cfgRaw = localStorage.getItem('UNAIR_SITE_CONFIG');
        if (cfgRaw) {
          var cfg = JSON.parse(cfgRaw);
          if (cfg && cfg.waNumber && String(cfg.waNumber).trim()) {
            return String(cfg.waNumber).trim().replace(/^0/, '62').replace(/[^0-9]/g, '');
          }
        }
        var saved = localStorage.getItem('UNAIR_SURUH_WA');
        if (saved && saved.trim()) {
          return saved.trim().replace(/^0/, '62').replace(/[^0-9]/g, '');
        }
      } catch (e) {}
      return '${WA_NUMBER}';
    }

    function applyDynamicWaNumber() {
      var num = getWaNumber();
      var readable = formatWaReadable(num);
      document.querySelectorAll('a[href*="wa.me/"]').forEach(function(el) {
        el.href = el.href.replace(new RegExp('wa\\.me/\\d+'), 'wa.me/' + num);
      });
      document.querySelectorAll('[data-wa-display]').forEach(function(el) {
        el.textContent = readable;
      });
    }

    function setTextIf(id, val) {
      if (val === undefined || val === null || val === '') return;
      var el = document.getElementById(id);
      if (el) el.textContent = val;
    }

    // DYNAMIC SERVICE CARDS & ORDER MODAL SYNC (DARI WEB ADMIN CMS)
    function applyServiceState() {
      try {
        var stored = localStorage.getItem('UNAIR_SERVICES');
        if (!stored) return;
        var list = JSON.parse(stored);
        if (!Array.isArray(list) || list.length === 0) return;

        // Merge with DEFAULT_SERVICES_DATA so icons/colors are always preserved
        var merged = list.map(function(item, idx) {
          var def = DEFAULT_SERVICES_DATA.find(function(d) {
            return d.slug === item.slug || d.title === (item.title || item.name);
          }) || DEFAULT_SERVICES_DATA[idx % DEFAULT_SERVICES_DATA.length] || DEFAULT_SERVICES_DATA[0];

          return {
            slug: item.slug || def.slug || ('layanan-' + (idx + 1)),
            title: item.title || item.name || def.title,
            badge: item.badge || def.badge || 'Layanan Aktif',
            badgeClass: item.badgeClass || def.badgeClass || 'bg-amber-50 text-amber-800 border-amber-200',
            iconBg: item.iconBg || def.iconBg || 'bg-navy-900',
            iconColor: item.iconColor || def.iconColor || 'text-amber-300',
            iconBorder: item.iconBorder || def.iconBorder || 'border-slate-200/80 hover:border-navy-900',
            iconSvg: item.iconSvg || def.iconSvg,
            desc: item.desc || def.desc || '',
            unitPrimary: item.unitPrimary || item.satuan || def.unitPrimary || '/ penugasan',
            unitDetail: item.unitDetail || def.unitDetail || 'Tarif mahasiswa transparan',
            price: item.price || def.price || '5.000',
            unit: item.unit || item.unitPrimary || item.satuan || def.unit || '/ penugasan',
            btnText: item.btnText || def.btnText || 'Pesan Layanan Ini',
            active: item.active !== false
          };
        });

        var grid = document.getElementById('servicesGridContainer');
        if (grid) {
          var html = '';
          merged.forEach(function(s) {
            var isInactive = s.active === false;
            html += '<div data-service-name="' + esc(s.title) + '" data-service-slug="' + esc(s.slug) + '" class="group bg-white rounded-3xl p-5 sm:p-6 border ' + esc(s.iconBorder) + ' shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between card-spring relative overflow-hidden ' + (isInactive ? 'opacity-60' : '') + '">' +
              '<div>' +
                '<div class="flex items-start justify-between gap-3 mb-4">' +
                  '<div class="w-12 h-12 rounded-2xl ' + esc(s.iconBg) + ' ' + esc(s.iconColor) + ' flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform shrink-0">' +
                    '<svg class="w-6 h-6 stroke-current fill-none stroke-2 stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">' + s.iconSvg + '</svg>' +
                  '</div>' +
                  '<span class="px-2.5 py-1 rounded-full text-[11px] font-bold border ' + esc(isInactive ? 'bg-slate-100 text-slate-600 border-slate-300' : s.badgeClass) + '">' + esc(isInactive ? 'Penuh Sementara' : s.badge) + '</span>' +
                '</div>' +
                '<h3 class="font-heading font-extrabold text-lg sm:text-xl text-navy-900 mb-2 group-hover:text-blue-900 transition-colors">' + esc(s.title) + '</h3>' +
                '<p class="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">' + esc(s.desc) + '</p>' +
              '</div>' +
              '<div class="pt-4 border-t border-slate-100 mt-auto space-y-3">' +
                '<div class="flex items-baseline justify-between gap-2 bg-slate-50/90 px-3.5 py-2.5 rounded-xl border border-slate-200/60">' +
                  '<div>' +
                    '<span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Tarif Mulai</span>' +
                    '<div class="flex items-baseline gap-1">' +
                      '<span class="text-xs font-extrabold text-navy-900">Rp</span>' +
                      '<span class="font-heading font-black text-xl sm:text-2xl text-navy-900 tracking-tight">' + esc(s.price) + '</span>' +
                    '</div>' +
                  '</div>' +
                  '<div class="text-right">' +
                    '<span class="text-xs font-bold text-slate-700 block">' + esc(s.unitPrimary) + '</span>' +
                    '<span class="text-[10px] text-slate-500 font-medium block">' + esc(s.unitDetail) + '</span>' +
                  '</div>' +
                '</div>' +
                (isInactive
                  ? '<button disabled class="w-full py-2.5 px-4 rounded-xl bg-slate-400 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-not-allowed"><span>Penuh Sementara</span></button>'
                  : '<button data-slug="' + esc(s.slug) + '" onclick="openOrderModal(this.getAttribute(&quot;data-slug&quot;))" class="btn-spring focus-ring w-full py-2.5 px-4 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition"><span>' + esc(s.btnText) + '</span><svg class="w-4 h-4 stroke-current fill-none stroke-2" viewBox="0 0 24 24"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></button>') +
              '</div>' +
            '</div>';
          });
          grid.innerHTML = html;
        }

        // Update count badge & Wizard Dropdown options
        var activeServices = merged.filter(function(s) { return s.active !== false; });
        var countBadge = document.getElementById('layananCountBadge');
        if (countBadge) {
          countBadge.textContent = merged.length + ' Lini Layanan Aktif • Tarif Mahasiswa Transparan';
        }
        var wizardSel = document.getElementById('wizardService');
        if (wizardSel) {
          var currentVal = wizardSel.value;
          var optHtml = '<option value="custom-suruh">✨ Custom SURUH (Bebas Request Apa Saja) • Mulai Rp 5.000</option>';
          activeServices.forEach(function(s) {
            optHtml += '<option value="' + esc(s.slug) + '">' + esc(s.title) + ' • Mulai Rp ' + esc(s.price) + ' ' + esc(s.unitPrimary) + '</option>';
          });
          wizardSel.innerHTML = optHtml;
          if (currentVal) wizardSel.value = currentVal;
        }
      } catch (e) {
        console.warn('applyServiceState error:', e);
      }
    }

    // DYNAMIC FAQ SYNC (DARI WEB ADMIN CMS)
    function applyFaqData() {
      try {
        var raw = localStorage.getItem('UNAIR_FAQ_DATA');
        if (!raw) return;
        var faqs = JSON.parse(raw);
        if (!Array.isArray(faqs) || faqs.length === 0) return;
        var container = document.getElementById('faqListContainer');
        if (!container) return;
        var activeFaqs = faqs.filter(function(f) { return f.active !== false; });
        if (activeFaqs.length === 0) return;
        var html = '';
        activeFaqs.forEach(function(f) {
          html += '<details class="faq-item group bg-white rounded-2xl border border-slate-200/90 px-6 py-4 shadow-xs transition">' +
            '<summary class="flex items-center justify-between cursor-pointer font-heading font-bold text-sm sm:text-base text-navy-900 py-1">' +
              '<span>' + esc(f.q) + '</span>' +
              '<span class="faq-icon w-6 h-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center transition duration-200 shrink-0 ml-4">+</span>' +
            '</summary>' +
            '<p class="text-xs sm:text-sm text-slate-600 leading-relaxed pt-3 pb-1 border-t border-slate-100 mt-3">' +
              esc(f.a) +
            '</p>' +
          '</details>';
        });
        container.innerHTML = html;
      } catch (e) {
        console.warn('applyFaqData error:', e);
      }
    }

    // =========================================================================
    // FULL WEBSITE CMS SYNC (LOAD FROM UNAIR_SITE_CONFIG & LEGACY KEYS)
    // =========================================================================
    function applyFullSiteConfig() {
      try {
        // Legacy keys support
        var badge = localStorage.getItem('UNAIR_SURUH_HERO_BADGE');
        if (badge) setTextIf('heroPillBadgeText', badge);

        var pTitle = localStorage.getItem('UNAIR_SURUH_HERO_PREFIX');
        var hTitle = localStorage.getItem('UNAIR_SURUH_HERO_HIGHLIGHT');
        var headEl = document.getElementById('heroHeadlineTitle');
        if ((pTitle || hTitle) && headEl) {
          var prefix = pTitle || 'Serba Bisa, Semua';
          var highlight = hTitle || 'Bisa Disuruh!';
          headEl.innerHTML = esc(prefix) + ' <span class="relative inline-block text-amber-600 underline decoration-amber-500 decoration-wavy">' + esc(highlight) + '</span>';
        }

        var desc = localStorage.getItem('UNAIR_SURUH_HERO_DESC');
        if (desc) setTextIf('heroSubtitleText', desc);

        var cta = localStorage.getItem('UNAIR_SURUH_HERO_CTA');
        if (cta) setTextIf('heroCtaText', cta);

        var banner = localStorage.getItem('UNAIR_SURUH_BANNER_TEXT');
        if (banner) {
          var cleanBanner = (banner.charAt(0) === '[' && banner.indexOf(']') > 0) ? banner.slice(banner.indexOf(']') + 1).trim() : banner;
          setTextIf('announcementBarText', cleanBanner);
        }

        // Full Site Config object from Easy Web Admin
        var cfgRaw = localStorage.getItem('UNAIR_SITE_CONFIG');
        if (cfgRaw) {
          var cfg = JSON.parse(cfgRaw);
          if (cfg && typeof cfg === 'object') {
            // 1. Top Bar & Navbar
            setTextIf('announcementBadgeText', cfg.topBarBadge);
            setTextIf('announcementBarText', cfg.topBarText);
            setTextIf('navBrandTitle', cfg.brandName);
            setTextIf('footerBrandTitle', cfg.brandName);
            setTextIf('navBrandSubMobile', cfg.brandTaglineMobile);
            setTextIf('navBrandSubDesktop', cfg.brandTaglineDesktop);

            // 2. Hero Section
            setTextIf('heroPillBadgeText', cfg.heroBadge);
            if ((cfg.heroPrefix || cfg.heroHighlight) && headEl) {
              var hp = cfg.heroPrefix || 'Serba Bisa, Semua';
              var hh = cfg.heroHighlight || 'Bisa Disuruh!';
              headEl.innerHTML = esc(hp) + ' <span class="relative inline-block text-amber-600 underline decoration-amber-500 decoration-wavy">' + esc(hh) + '</span>';
            }
            setTextIf('heroSubtitleText', cfg.heroDesc);
            setTextIf('heroCtaText', cfg.heroCtaPrimary);
            setTextIf('heroSecondaryCtaText', cfg.heroCtaSecondary);

            // Hero Metrics 1..4
            setTextIf('heroMetric1Val', cfg.metric1Val);
            setTextIf('heroMetric1Sub', cfg.metric1Sub);
            setTextIf('heroMetric2Val', cfg.metric2Val);
            setTextIf('heroMetric2Sub', cfg.metric2Sub);
            setTextIf('heroMetric3Val', cfg.metric3Val);
            setTextIf('heroMetric3Sub', cfg.metric3Sub);
            setTextIf('heroMetric4Val', cfg.metric4Val);
            setTextIf('heroMetric4Sub', cfg.metric4Sub);

            // Hero Photo Floating Badges
            setTextIf('heroDispatchBadgeText', cfg.heroDispatchBadge);
            setTextIf('heroMascotTitleText', cfg.heroCardTitle);
            setTextIf('heroMascotSubText', cfg.heroCardSub);
            setTextIf('heroVerifiedLine1', cfg.heroVerifiedLine1);
            setTextIf('heroVerifiedLine2', cfg.heroVerifiedLine2);

            // 3. Spotlight Custom SURUH
            var customSection = document.getElementById('custom-suruh');
            if (customSection) {
              customSection.style.display = (cfg.customActive === false) ? 'none' : '';
            }
            setTextIf('customSpotlightBadge', cfg.customBadge);
            setTextIf('customTitleLine1', cfg.customTitle1);
            setTextIf('customTitleHighlight', cfg.customTitle2);
            setTextIf('customSpotlightDesc', cfg.customDesc);
            setTextIf('customBullet1', cfg.customBullet1);
            setTextIf('customBullet2', cfg.customBullet2);
            setTextIf('customBullet3', cfg.customBullet3);
            setTextIf('customFormTitle', cfg.customFormTitle);
            setTextIf('customFormBtnText', cfg.customFormBtnText);
            setTextIf('customFormNoteText', cfg.customFormNote);
            if (cfg.customPlaceholder) {
              var cInput = document.getElementById('customTaskInput');
              if (cInput) cInput.setAttribute('placeholder', cfg.customPlaceholder);
            }
            if (Array.isArray(cfg.customChips) && cfg.customChips.length > 0) {
              var chipsWrap = document.getElementById('customChipsContainer');
              if (chipsWrap) {
                chipsWrap.innerHTML = cfg.customChips.map(function(chip) {
                  var label = chip.label || chip.text || '';
                  var val = chip.value || chip.text || label;
                  return '<button type="button" data-chip-val="' + esc(val) + '" onclick="fillCustomChip(this.getAttribute(&quot;data-chip-val&quot;))" class="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-amber-400 hover:text-navy-950 text-white text-xs font-semibold border border-white/15 transition cursor-pointer">' + esc(label) + '</button>';
                }).join('');
              }
            }

            // 4. Lini Layanan Header
            setTextIf('layananSectionTitle', cfg.layananTitle);
            setTextIf('layananSectionSubtitle', cfg.layananSubtitle);
            setTextIf('layananCountBadge', cfg.layananBadge);

            // 5. Mengapa Memilih Kami (6 Keunggulan)
            setTextIf('whySectionBadge', cfg.whyBadge);
            setTextIf('whySectionTitle', cfg.whyTitle);
            setTextIf('whySectionSubtitle', cfg.whySubtitle);
            if (Array.isArray(cfg.whyCards)) {
              cfg.whyCards.forEach(function(w, idx) {
                if (!w) return;
                setTextIf('whyCardTitle-' + idx, w.title);
                setTextIf('whyCardDesc-' + idx, w.desc);
              });
            }

            // 6. Reels & Testimoni Headers
            setTextIf('reelsSectionTitle', cfg.reelsTitle);
            setTextIf('reelsSectionSubtitle', cfg.reelsSubtitle);
            setTextIf('testiSectionTitle', cfg.testiTitle);
            setTextIf('testiSectionSubtitle', cfg.testiSubtitle);

            // 7. FAQ Header
            setTextIf('faqSectionTitle', cfg.faqTitle);
            setTextIf('faqSectionSubtitle', cfg.faqSubtitle);

            // 8. Banner CTA
            setTextIf('ctaBannerBadge', cfg.ctaBadge);
            setTextIf('ctaBannerTitle', cfg.ctaTitle);
            setTextIf('ctaBannerDesc', cfg.ctaDesc);
            setTextIf('ctaBannerBtnText', cfg.ctaBtnText);

            // 9. Jadi Mitra Mahasiswa
            setTextIf('mitraBadgeText', cfg.mitraBadge);
            setTextIf('mitraTitle1', cfg.mitraTitle1);
            setTextIf('mitraTitle2', cfg.mitraTitle2);
            setTextIf('mitraDescText', cfg.mitraDesc);
            setTextIf('mitraBtnText', cfg.mitraBtnText);
            setTextIf('mitraPillar1Title', cfg.mitraPillar1Title);
            setTextIf('mitraPillar1Desc', cfg.mitraPillar1Desc);
            setTextIf('mitraPillar2Title', cfg.mitraPillar2Title);
            setTextIf('mitraPillar2Desc', cfg.mitraPillar2Desc);
            setTextIf('mitraPillar3Title', cfg.mitraPillar3Title);
            setTextIf('mitraPillar3Desc', cfg.mitraPillar3Desc);

            // 10. Footer & Kontak
            setTextIf('footerDescText', cfg.footerDesc);
            setTextIf('footerPjBadge', cfg.footerPjBadge);
            setTextIf('footerWorkerBadge', cfg.footerWorkerBadge);
            setTextIf('footerCoverageText', cfg.footerCoverage);
            setTextIf('footerDisclaimerText', cfg.footerDisclaimer);
            setTextIf('floatingWaLabel', cfg.floatingWaLabel);

            if (cfg.footerEmail) {
              var em = document.getElementById('footerEmailLink');
              if (em) {
                em.textContent = cfg.footerEmail;
                em.href = 'mailto:' + cfg.footerEmail;
              }
            }
            if (cfg.footerInstagram) {
              var ig = document.getElementById('footerIgLink');
              if (ig) {
                ig.textContent = 'Instagram ' + cfg.footerInstagram;
                var igClean = cfg.footerInstagram.replace(/^@/, '');
                ig.href = 'https://instagram.com/' + igClean;
              }
            }
            if (cfg.footerTiktok) {
              var tt = document.getElementById('footerTiktokLink');
              if (tt) {
                tt.textContent = 'TikTok ' + cfg.footerTiktok;
                var ttClean = cfg.footerTiktok.replace(/^@/, '');
                tt.href = 'https://www.tiktok.com/@' + ttClean;
              }
            }
          }
        }
      } catch(e) {
        console.warn('CMS sync skipped:', e);
      }
    }

    function syncAllAdminData() {
      applyFullSiteConfig();
      applyDynamicWaNumber();
      applyServiceState();
      applyFaqData();
    }

    syncAllAdminData();
    window.addEventListener('storage', function() {
      syncAllAdminData();
    });

    // Listen to BroadcastChannel for instant real-time updates from Web Admin
    var unairSyncChannel = null;
    try {
      if ('BroadcastChannel' in window) {
        unairSyncChannel = new BroadcastChannel('unair_suruh_sync');
        unairSyncChannel.onmessage = function(ev) {
          syncAllAdminData();
          loadAndRenderDynamicFeed();
          loadAndRenderDynamicTestimonials();
        };
      }
    } catch (e) {}

    // Record orders submitted on main website directly into Web Admin's UNAIR_ORDERS
    function recordWebsiteOrderToAdmin(orderData) {
      try {
        var existing = [];
        var raw = localStorage.getItem('UNAIR_ORDERS');
        if (raw) {
          var parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) existing = parsed;
        }
        var now = new Date();
        var pad = function(n) { return String(n).padStart(2, '0'); };
        var timeStr = 'Hari ini jam ' + pad(now.getHours()) + '.' + pad(now.getMinutes()) + ' WIB';
        var randCode = '#US-' + pad(now.getDate()) + pad(now.getMonth() + 1) + '-' + String(Math.floor(Math.random() * 900) + 100);
        var newOrder = {
          code: randCode,
          service: orderData.service || 'Custom SURUH',
          satuan: orderData.satuan || 'Order dari Website Utama',
          name: orderData.clientName || 'Pelanggan Website',
          wa: orderData.clientWa || 'Via Chat WhatsApp',
          pickup: orderData.pickup || 'Surabaya (Lihat WA)',
          dropoff: orderData.dropoff || '-',
          time: timeStr,
          isPrivat: Boolean(orderData.isFemale),
          status: 'Menunggu Konfirmasi',
          worker: 'Belum Ditugaskan',
          notes: orderData.notes || '-'
        };
        existing.unshift(newOrder);
        localStorage.setItem('UNAIR_ORDERS', JSON.stringify(existing));
        if (unairSyncChannel) {
          unairSyncChannel.postMessage({ type: 'NEW_ORDER', order: newOrder });
        }
      } catch (e) {
        console.warn('Could not save order to localStorage:', e);
      }
    }
    let activeModalIndex = 0;
    let isModalLiked = false;
    let unmutedCardIdx = null;

    // Toggle Audio on Feed Card
    function toggleCardAudio(e, idx) {
      e.stopPropagation();
      const vid = document.getElementById('reelVid-' + idx);
      const icon = document.getElementById('audioIcon-' + idx);
      if (!vid) return;

      if (vid.muted) {
        if (unmutedCardIdx !== null && unmutedCardIdx !== idx) {
          const prev = document.getElementById('reelVid-' + unmutedCardIdx);
          const prevIcon = document.getElementById('audioIcon-' + unmutedCardIdx);
          if (prev) prev.muted = true;
          if (prevIcon) prevIcon.innerHTML = '<path d="M11 5 6 9H2v6h4l5 4V5Z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>';
        }
        vid.muted = false;
        unmutedCardIdx = idx;
        icon.innerHTML = '<path d="M11 5 6 9H2v6h4l5 4V5Z"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>';
      } else {
        vid.muted = true;
        unmutedCardIdx = null;
        icon.innerHTML = '<path d="M11 5 6 9H2v6h4l5 4V5Z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>';
      }
    }

    // Update Progress Bar
    function updateVidProgress(idx) {
      const vid = document.getElementById('reelVid-' + idx);
      const bar = document.getElementById('vidProgress-' + idx);
      if (vid && bar && vid.duration) {
        const pct = (vid.currentTime / vid.duration) * 100;
        bar.style.width = pct + '%';
      }
    }

    // Toggle Heart Like on Feed Card
    function toggleFeedLike(e, idx) {
      if (e) e.stopPropagation();
      const heart = document.getElementById('feedHeart-' + idx);
      const countEl = document.getElementById('feedLikeCount-' + idx);
      let count = parseInt(countEl.innerText) || 0;

      if (heart.getAttribute('fill') === '#EF4444') {
        heart.setAttribute('fill', 'none');
        heart.setAttribute('stroke', 'currentColor');
        countEl.innerText = count - 1;
      } else {
        heart.setAttribute('fill', '#EF4444');
        heart.setAttribute('stroke', '#EF4444');
        countEl.innerText = count + 1;
      }
    }

    // Lightbox Modal Functions (CLEAN - NO PESAN JASA BUTTON)
    function openReelModal(idx) {
      activeModalIndex = idx;
      const data = FEED_DATA[idx];
      const modal = document.getElementById('reelModalBackdrop');
      const player = document.getElementById('modalVideoPlayer');

      player.src = data.src;
      player.muted = false;

      document.getElementById('modalReelCaption').innerText = data.caption;
      document.getElementById('modalLikeCount').innerText = data.likes;
      document.getElementById('modalExternalLink').href = data.tiktokUrl;

      player.play().catch(() => {
        player.muted = true;
        player.play();
      });

      player.ontimeupdate = () => {
        if (player.duration) {
          const pct = (player.currentTime / player.duration) * 100;
          document.getElementById('modalProgressBar').style.width = pct + '%';
        }
      };

      updateModalAudioIcon(!player.muted);
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }

    function closeReelModal(e) {
      if (e && e.target && e.target.id !== 'reelModalBackdrop' && !e.target.closest('button')) return;
      const modal = document.getElementById('reelModalBackdrop');
      const player = document.getElementById('modalVideoPlayer');
      player.pause();
      player.src = '';
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }

    function toggleModalPlayPause() {
      const player = document.getElementById('modalVideoPlayer');
      const ind = document.getElementById('modalPlayIndicator');
      const iconSvg = document.getElementById('modalPlayIconSvg');

      if (player.paused) {
        player.play();
        iconSvg.innerHTML = '<polygon points="5 3 19 12 5 21 5 3"/>';
      } else {
        player.pause();
        iconSvg.innerHTML = '<rect width="4" height="16" x="6" y="4"/><rect width="4" height="16" x="14" y="4"/>';
      }

      ind.style.opacity = '1';
      setTimeout(() => { ind.style.opacity = '0'; }, 500);
    }

    function toggleModalMute() {
      const player = document.getElementById('modalVideoPlayer');
      player.muted = !player.muted;
      updateModalAudioIcon(!player.muted);
    }

    function updateModalAudioIcon(hasSound) {
      const icon = document.getElementById('modalAudioIconSvg');
      if (hasSound) {
        icon.innerHTML = '<path d="M11 5 6 9H2v6h4l5 4V5Z"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>';
      } else {
        icon.innerHTML = '<path d="M11 5 6 9H2v6h4l5 4V5Z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>';
      }
    }

    function toggleModalLike() {
      isModalLiked = !isModalLiked;
      const heart = document.getElementById('modalHeartSvg');
      const countEl = document.getElementById('modalLikeCount');
      let count = parseInt(countEl.innerText) || 0;
      if (isModalLiked) {
        heart.setAttribute('fill', '#EF4444');
        heart.setAttribute('stroke', '#EF4444');
        countEl.innerText = count + 1;
      } else {
        heart.setAttribute('fill', 'none');
        heart.setAttribute('stroke', 'currentColor');
        countEl.innerText = count - 1;
      }
    }

    
    // DYNAMIC LOCALSTORAGE REELS SYNC (DARI WEB ADMIN CMS)
    
    // AUTO-PURGE ANY LEGACY CACHED COOKIE REELS
    try {
      var cachedReels = localStorage.getItem('unair_suruh_reels_data');
      if (cachedReels && (cachedReels.indexOf('real-7') !== -1 || cachedReels.indexOf('real-8') !== -1)) {
        localStorage.removeItem('unair_suruh_reels_data');
      }
    } catch(e) {}

    function loadAndRenderDynamicFeed() {
      try {
        var stored = localStorage.getItem('unair_suruh_reels_data');
        if (!stored) return;
        var parsed = JSON.parse(stored);
        if (!Array.isArray(parsed) || parsed.length === 0) return;
        FEED_DATA = parsed.filter(function(item) { return item.active !== false; });
        var container = document.getElementById('feedGridContainer');
        if (!container || FEED_DATA.length === 0) return;

        var html = '';
        FEED_DATA.forEach(function(c, idx) {
          html += '<div class="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition duration-300 overflow-hidden flex flex-col group card-spring">' +
            '<div class="px-3.5 py-3 flex items-center justify-between border-b border-slate-100 bg-white">' +
              '<div class="flex items-center gap-2.5">' +
                '<div class="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-amber-300 shadow-xs bg-navy-900">' +
                  '<img src="${logoB64}" alt="unair_suruh" class="w-full h-full object-cover" />' +
                '</div>' +
                '<div class="leading-tight">' +
                  '<div class="text-xs font-bold text-slate-900 flex items-center gap-1">' +
                    '<span>' + esc(c.user || 'unair_suruh') + '</span>' +
                    '<svg class="w-3 h-3 text-blue-500 fill-current shrink-0" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>' +
                  '</div>' +
                  '<div class="text-[9px] text-slate-400 font-semibold tracking-wider">' + esc(c.timeAgo || 'BARU SAJA') + '</div>' +
                '</div>' +
              '</div>' +
              '<a href="' + esc(c.tiktokUrl || 'https://www.tiktok.com/@unair_suruh') + '" target="_blank" rel="noopener noreferrer" class="text-slate-400 hover:text-rose-600 transition p-1" title="Buka di TikTok">' +
                '<svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/></svg>' +
              '</a>' +
            '</div>' +
            '<div class="relative aspect-square sm:aspect-[4/5] bg-black overflow-hidden cursor-pointer" onclick="openReelModal(' + idx + ')">' +
              '<video id="reelVid-' + idx + '" src="' + esc(c.src) + '" poster="' + esc(posterFor(c)) + '" autoplay muted loop playsinline preload="metadata" ontimeupdate="updateVidProgress(' + idx + ')" class="w-full h-full object-cover group-hover:scale-102 transition duration-500"></video>' +
              '<div class="absolute top-2.5 right-2.5 flex items-center gap-1.5 z-10 pointer-events-none">' +
                '<div class="w-6 h-6 rounded-full bg-black/60 backdrop-blur-xs text-white flex items-center justify-center">' +
                  '<svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg>' +
                '</div>' +
              '</div>' +
              '<button onclick="toggleCardAudio(event, ' + idx + ')" class="btn-spring focus-ring absolute bottom-2.5 right-2.5 w-7 h-7 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-xs text-white flex items-center justify-center z-20 transition" title="Suara">' +
                '<svg id="audioIcon-' + idx + '" class="w-3.5 h-3.5 stroke-current fill-none stroke-2 stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24"><path d="M11 5 6 9H2v6h4l5 4V5Z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>' +
              '</button>' +
              '<div class="absolute bottom-0 left-0 right-0 h-0.5 bg-white/20">' +
                '<div id="vidProgress-' + idx + '" class="h-full bg-amber-400 w-0"></div>' +
              '</div>' +
            '</div>' +
            '<div class="px-3.5 pt-2.5 pb-1 flex items-center justify-between text-slate-700 bg-white">' +
              '<div class="flex items-center gap-4">' +
                '<button onclick="toggleFeedLike(event, ' + idx + ')" class="flex items-center gap-1.5 text-slate-700 hover:text-rose-600 transition group/like">' +
                  '<svg id="feedHeart-' + idx + '" class="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>' +
                  '<span id="feedLikeCount-' + idx + '" class="text-xs font-semibold">' + esc(c.likes || 50) + '</span>' +
                '</button>' +
                '<a href="' + esc(c.tiktokUrl || 'https://www.tiktok.com/@unair_suruh') + '" target="_blank" rel="noopener noreferrer" class="flex items-center gap-1.5 text-slate-700 hover:text-blue-600 transition">' +
                  '<svg class="w-4 h-4 stroke-current fill-none stroke-2 stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>' +
                  '<span class="text-xs font-semibold">Share</span>' +
                '</a>' +
              '</div>' +
            '</div>' +
            '<div class="px-3.5 pb-3.5 pt-1 text-xs text-slate-700 leading-snug line-clamp-2 bg-white">' +
              esc(c.caption) +
            '</div>' +
          '</div>';
        });
        container.innerHTML = html;
        observeReelVideos();
      } catch (e) {
        console.warn('Dynamic reels skipped:', e);
      }
    }

    window.addEventListener('storage', function(e) {
      if (e.key === 'unair_suruh_reels_data') loadAndRenderDynamicFeed();
      if (e.key === 'unair_suruh_testimonials_data') loadAndRenderDynamicTestimonials();
    });

    // Auto-play reels only while visible (re-run after every dynamic re-render)
    var reelObserver = null;
    function observeReelVideos() {
      if (!('IntersectionObserver' in window)) return;
      if (!reelObserver) {
        reelObserver = new IntersectionObserver(function(entries) {
          entries.forEach(function(entry) {
            if (entry.isIntersecting) {
              entry.target.play().catch(function() {});
            } else {
              entry.target.pause();
            }
          });
        }, { threshold: 0.25 });
      }
      reelObserver.disconnect();
      document.querySelectorAll('video[id^="reelVid-"]').forEach(function(v) { reelObserver.observe(v); });
    }

    window.addEventListener('DOMContentLoaded', function() {
      syncAllAdminData();
      loadAndRenderDynamicFeed();
      loadAndRenderDynamicTestimonials();
      observeReelVideos();
    });

    // Close open modals with the Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key !== 'Escape') return;
      var reel = document.getElementById('reelModalBackdrop');
      var order = document.getElementById('orderModalBackdrop');
      if (reel && !reel.classList.contains('hidden')) closeReelModal();
      if (order && !order.classList.contains('hidden')) closeOrderModal();
    });

    
    // DYNAMIC LOCALSTORAGE TIKTOK TESTIMONIALS SYNC
    function toggleMobileNav() {
      var menu = document.getElementById('mobileNavMenu');
      var burger = document.getElementById('hamburgerIcon');
      var close = document.getElementById('closeMenuIcon');
      var btn = document.getElementById('mobileNavToggle');
      if (!menu) return;
      var isExpanded = !menu.classList.contains('hidden');
      if (isExpanded) {
        menu.classList.add('hidden');
        if (burger) burger.classList.remove('hidden');
        if (close) close.classList.add('hidden');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      } else {
        menu.classList.remove('hidden');
        if (burger) burger.classList.add('hidden');
        if (close) close.classList.remove('hidden');
        if (btn) btn.setAttribute('aria-expanded', 'true');
      }
    }

    function closeMobileNav() {
      var menu = document.getElementById('mobileNavMenu');
      var burger = document.getElementById('hamburgerIcon');
      var close = document.getElementById('closeMenuIcon');
      var btn = document.getElementById('mobileNavToggle');
      if (menu) menu.classList.add('hidden');
      if (burger) burger.classList.remove('hidden');
      if (close) close.classList.add('hidden');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    }

    // DYNAMIC LOCALSTORAGE TIKTOK TESTIMONIALS SYNC
    function loadAndRenderDynamicTestimonials() {
      try {
        var stored = localStorage.getItem('unair_suruh_testimonials_data');
        if (stored) {
          // Auto-purge outdated non-praise random comments from localStorage
          if (stored.indexOf('Kak tolong ambilin') !== -1 || stored.indexOf('p, info serba') !== -1 || stored.indexOf('apa bisa jadi worker') !== -1 || stored.indexOf('ini kalau rapihin kos bisa kah') !== -1) {
            localStorage.removeItem('unair_suruh_testimonials_data');
            stored = null;
          }
        }
        if (!stored) return;
        var parsed = JSON.parse(stored);
        if (!Array.isArray(parsed) || parsed.length === 0) return;
        var container = document.getElementById('testimonialsContainer');
        if (!container) return;

        var html = '';
        parsed.forEach(function(item) {
          if (item.active === false) return;
          var initials = (item.username || '@un').replace('@', '').slice(0, 2).toUpperCase();
          html += '<a href="' + esc(item.tiktokUrl || 'https://www.tiktok.com/@unair_suruh') + '" target="_blank" rel="noopener noreferrer" class="group block relative p-5 sm:p-6 bg-[#F8FAFC] hover:bg-white border border-slate-200/90 hover:border-slate-400 rounded-2xl transition-all duration-300 flex flex-col justify-between card-spring shadow-xs hover:shadow-lg">' +
            '<div class="space-y-3.5">' +
              '<div class="flex items-center justify-between gap-3">' +
                '<div class="flex items-center gap-2.5">' +
                  '<div class="w-9 h-9 rounded-full bg-gradient-to-tr from-navy-900 to-amber-500 p-0.5 shrink-0 shadow-xs">' +
                    '<div class="w-full h-full rounded-full bg-navy-900 text-amber-300 font-black text-xs flex items-center justify-center">' + esc(initials) + '</div>' +
                  '</div>' +
                  '<div class="leading-tight">' +
                    '<div class="text-xs font-bold text-navy-900 flex items-center gap-1 group-hover:text-blue-600 transition-colors">' +
                      '<span>' + esc(item.username) + '</span>' +
                      '<svg class="w-3.5 h-3.5 text-blue-500 fill-current shrink-0" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>' +
                    '</div>' +
                    '<div class="text-[10px] text-slate-500 font-medium">' + esc(item.name || 'Pelanggan UNAIR') + '</div>' +
                  '</div>' +
                '</div>' +
                '<div class="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center group-hover:bg-[#FE2C55] transition-colors shrink-0 shadow-xs" title="Buka di TikTok">' +
                  '<svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.89 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3 15.67a6.34 6.34 0 0 0 6.34 6.33c3.5 0 6.34-2.84 6.34-6.33v-5.2a8.21 8.21 0 0 0 4.91 1.62v-3.45a4.88 4.88 0 0 1-1-.05z"/></svg>' +
                '</div>' +
              '</div>' +
              '<div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[10px] font-bold border ' + esc(item.serviceColor || 'bg-slate-100 text-slate-700 border-slate-200') + '">' +
                '<span class="w-1.5 h-1.5 rounded-full bg-current opacity-70"></span>' +
                '<span>' + esc(item.serviceBadge) + '</span>' +
              '</div>' +
              '<p class="text-xs sm:text-[13px] text-slate-700 font-medium leading-relaxed italic">"' + esc(item.comment) + '"</p>' +
              '<div class="text-[10px] text-slate-400 flex items-center gap-1">' +
                '<svg class="w-3 h-3 text-slate-400 shrink-0 stroke-current fill-none stroke-2" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>' +
                '<span class="truncate">Video: ' + esc(item.videoTitle || 'UNAIR SURUH Official') + '</span>' +
              '</div>' +
            '</div>' +
            '<div class="pt-3.5 mt-4 border-t border-slate-200/80 flex items-center justify-between text-xs">' +
              '<div class="flex items-center gap-1.5 font-bold text-slate-700">' +
                '<svg class="w-4 h-4 fill-[#FE2C55]" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>' +
                '<span>' + esc(item.likes || 1) + ' Suka</span>' +
              '</div>' +
              '<div class="inline-flex items-center gap-1 text-[11px] font-bold text-navy-900 group-hover:text-[#FE2C55] transition-colors">' +
                '<span>Buka di TikTok</span>' +
                '<svg class="w-3.5 h-3.5 stroke-current fill-none stroke-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" viewBox="0 0 24 24"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>' +
              '</div>' +
            '</div>' +
          '</a>';
        });
        container.innerHTML = html;
      } catch (err) {
        console.warn('Error loading dynamic testimonials:', err);
      }
    }

    // SUPER SIMPLE & FRIENDLY WHATSAPP ORDER LOGIC
    function openOrderModal(serviceSlug) {
      if (serviceSlug) serviceSlug = serviceSlug.replace(/-care$/, '-suruh');
      const modal = document.getElementById('orderModalBackdrop');
      if (serviceSlug) {
        const sel = document.getElementById('wizardService');
        if (sel) {
          for (let i = 0; i < sel.options.length; i++) {
            if (sel.options[i].value === serviceSlug) {
              sel.selectedIndex = i;
              break;
            }
          }
        }
      }
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        const nameInput = document.getElementById('wizardName');
        if (nameInput) nameInput.focus();
      }, 150);
    }

    function closeOrderModal(e) {
      if (e && e.target && e.target.id !== 'orderModalBackdrop' && !e.target.closest('button')) return;
      const modal = document.getElementById('orderModalBackdrop');
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    }

    // Custom SURUH interactive helper functions
    function fillCustomChip(text) {
      const input = document.getElementById('customTaskInput');
      if (input) {
        input.value = text;
        input.focus();
        input.classList.add('ring-2', 'ring-amber-400');
        setTimeout(() => input.classList.remove('ring-2', 'ring-amber-400'), 800);
      }
    }

    function sendCustomOrderToWA() {
      const taskInput = document.getElementById('customTaskInput');
      const areaSelect = document.getElementById('customAreaSelect');
      const timeSelect = document.getElementById('customTimeSelect');
      const femaleCheck = document.getElementById('customFemaleCheck');

      const task = (taskInput && taskInput.value.trim()) ? taskInput.value.trim() : 'Konsultasi Layanan Custom (Bebas Request)';
      const area = areaSelect ? areaSelect.value : 'Surabaya';
      const time = timeSelect ? timeSelect.value : 'Fleksibel';
      const isFemale = femaleCheck ? femaleCheck.checked : false;

      // Record order into Web Admin
      recordWebsiteOrderToAdmin({
        clientName: 'Pelanggan Custom Web',
        clientWa: 'Via Chat WA',
        isFemale: isFemale,
        service: 'Custom SURUH (Bebas Request)',
        satuan: 'Waktu: ' + time,
        pickup: area,
        notes: task
      });

      const lines = [
        'Halo Mas Afif / Admin UNAIR SURUH! 👋✨',
        '',
        'Saya ingin memesan layanan *Custom SURUH (Bebas Request)*:',
        '',
        '📌 *Detail Tugas/Kebutuhan:*',
        task,
        '',
        '📍 *Area/Lokasi:* ' + area,
        '⏰ *Waktu Kebutuhan:* ' + time
      ];

      if (isFemale) {
        lines.push('🌸 *Klien Cewek:* Request worker cewek ya kak (agar lebih nyaman & privasi terjaga).');
      }

      lines.push('');
      lines.push('Mohon info ketersediaan mitra worker & estimasi biayanya yaa kak. Terima kasih banyak! 🙏😊');

      const waMsg = lines.join(String.fromCharCode(10));
      const waUrl = 'https://wa.me/' + getWaNumber() + '?text=' + encodeURIComponent(waMsg);
      window.open(waUrl, '_blank');
    }

    // Friendly WhatsApp message generator
    function sendOrderToWhatsApp() {
      const sel = document.getElementById('wizardService');
      const opt = sel.options[sel.selectedIndex];
      const svcName = opt.text.split(' • ')[0].replace(/^✨\s*/, '').trim();
      const name = document.getElementById('wizardName').value.trim() || 'Teman UNAIR';
      const notes = document.getElementById('wizardNotes').value.trim();
      const isFemale = document.getElementById('wizardIsFemaleKos').checked;

      // Record order into Web Admin
      recordWebsiteOrderToAdmin({
        clientName: name,
        clientWa: 'Via Chat WA',
        isFemale: isFemale,
        service: svcName,
        satuan: opt.text.split(' • ')[1] || 'Order Website Utama',
        pickup: notes || 'Surabaya',
        notes: notes || 'Order dari Popup Website Utama'
      });

      const lines = [
        'Halo kak Admin UNAIR SURUH! 👋✨',
        '',
        'Kenalin aku *' + name + '*, mau minta tolong dibantu yaa kak:',
        '',
        '📌 *Layanan:* ' + svcName
      ];

      if (notes) {
        lines.push('📝 *Kebutuhan & Lokasi:*');
        lines.push(notes);
      }

      if (isFemale) {
        lines.push('🌸 *Klien Cewek:* Iya kak, request worker cewek yaa agar nyaman dan terjaga privasinya.');
      }

      lines.push('');
      lines.push('Kira-kira mitranya ready kah kak? Makasii banyak sebelumnya yaa! 🙏😊');

      const waMsg = lines.join(String.fromCharCode(10));
      const waUrl = 'https://wa.me/' + getWaNumber() + '?text=' + encodeURIComponent(waMsg);
      window.open(waUrl, '_blank');
      closeOrderModal();
    }
  </script>
</body>
</html>
`;

// Save files
const targetWeb = path.join(__dirname, 'index.html');
fs.writeFileSync(targetWeb, htmlContent, 'utf8');
console.log('Web build written to:', targetWeb, '(' + Math.round(Buffer.byteLength(htmlContent) / 1024) + ' KB)');

// Standalone offline copies (Downloads): inline images as base64, point videos to local files
function inlineAssets(html) {
  const cache = {};
  html = html.replace(/\/(?:img\/[\w.-]+|tiktok\/[\w.-]+-poster)\.webp/g, (url) => {
    if (!(url in cache)) {
      const file = path.join(publicDir, url);
      cache[url] = fs.existsSync(file) ? 'data:image/webp;base64,' + fs.readFileSync(file).toString('base64') : url;
    }
    return cache[url];
  });
  const videoBase = 'file:///' + publicDir.replace(/\\/g, '/').replace(/ /g, '%20') + '/';
  return html.replace(/(["'])(tiktok\/tiktok-real-\d+\.mp4)/g, (m, q, rel) => q + videoBase + rel);
}

const standalone = inlineAssets(htmlContent);
for (const target of ['C:/Users/HYPE AMD/Downloads/UNAIR SURUH.html', 'C:/Users/HYPE AMD/Downloads/gemini-code-1792365057878.html']) {
  try {
    fs.writeFileSync(target, standalone, 'utf8');
    console.log('Standalone copy written to:', target);
  } catch (e) {
    console.warn('Skipped standalone copy:', target, e.message);
  }
}

console.log('UNAIR SURUH build completed successfully!');
