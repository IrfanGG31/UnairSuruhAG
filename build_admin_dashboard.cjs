const fs = require('fs');
const path = require('path');

console.log('Generating UNAIR SURUH — Web Admin Dashboard...');

const adminHtmlContent = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <title>Web Admin UNAIR SURUH — Pusat Kendali & Manajemen Order</title>
  <meta name="description" content="Dashboard Web Admin resmi UNAIR SURUH: Manajemen order on-demand, penetapan mitra mahasiswa, CMS konten website, dan verifikasi adab muamalah." />
  <link rel="icon" type="image/jpeg" href="logo.jpg" onerror="this.src='/logo.jpg'" />
  
  <!-- Google Fonts: Poppins (Heading), Inter (Body), JetBrains Mono (Code/Numbers) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600&family=Poppins:wght@600;700;800;900&display=swap" rel="stylesheet">
  
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            heading: ['Poppins', 'sans-serif'],
            body: ['Inter', 'sans-serif'],
            mono: ['"JetBrains Mono"', 'monospace'],
            sans: ['Inter', 'system-ui', 'sans-serif']
          },
          colors: {
            navy: {
              950: '#0F1A2E',
              900: '#1B2A4A',
              800: '#23375E',
              700: '#2D4A7A',
              600: '#3D619B',
              500: '#4A6FA5',
              100: '#E8EDF5',
            },
            gold: {
              600: '#B88D2A',
              500: '#D4A843',
              400: '#E0B95C',
              300: '#E8C97A',
              100: '#FDF5E6',
            },
            cream: {
              500: '#F5E6C8',
              300: '#FAF3E8',
              100: '#FDFBF7',
            }
          }
        }
      }
    }
  </script>
  <style>
    body {
      font-family: 'Inter', sans-serif;
      background-color: #F8FAFC;
      color: #0F172A;
    }
    h1, h2, h3, h4, .font-heading {
      font-family: 'Poppins', sans-serif;
    }
    .font-mono {
      font-family: 'JetBrains Mono', monospace;
    }
    .scrollbar-none::-webkit-scrollbar { display: none; }
    .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
    
    .btn-spring {
      cursor: pointer;
      transition: transform 0.15s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.15s ease, background-color 0.15s ease;
    }
    .btn-spring:hover {
      transform: translateY(-1px);
    }
    .btn-spring:active {
      transform: translateY(1px);
    }
    .focus-ring:focus-visible {
      outline: 2px solid #D4A843;
      outline-offset: 2px;
    }
    .nav-tab.active {
      background-color: #1B2A4A;
      color: #D4A843;
      font-weight: 700;
    }
    .nav-tab.active svg {
      color: #D4A843;
    }
  </style>
</head>
<body class="antialiased min-h-screen flex flex-col selection:bg-gold-500 selection:text-navy-900">

  <!-- ===================================================================== -->
  <!-- 1. TOP NAVBAR / HEADER ADMIN                                          -->
  <!-- ===================================================================== -->
  <header class="bg-navy-900 border-b border-navy-800 text-white sticky top-0 z-40">
    <div class="px-4 sm:px-6 h-16 flex items-center justify-between">
      
      <!-- LOGO & SIDEBAR TOGGLE (MOBILE) -->
      <div class="flex items-center gap-3">
        <button onclick="toggleMobileSidebar()" class="md:hidden p-2 text-slate-300 hover:text-white rounded-lg focus-ring">
          <svg class="w-6 h-6 stroke-current fill-none stroke-2 stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
        <a href="index.html" onclick="goToPublicSite(); return false;" class="flex items-center gap-2.5 group focus-ring rounded-lg">
          <div class="w-9 h-9 rounded-full bg-gold-500/20 border border-gold-500 flex items-center justify-center text-gold-500 font-black text-sm">
            US
          </div>
          <div>
            <div class="font-heading font-black text-sm sm:text-base tracking-tight leading-none">
              UNAIR <span class="text-gold-500">SURUH</span>
            </div>
            <div class="text-[10px] text-slate-300 font-mono tracking-wider mt-0.5">WEB ADMIN v2.4</div>
          </div>
        </a>
      </div>

      <!-- ROLE SELECTOR & ACTION CTAs -->
      <div class="flex items-center gap-3">
        
        <!-- ROLE SELECTOR -->
        <div class="hidden sm:flex items-center gap-2 bg-navy-800/80 px-3 py-1.5 rounded-xl border border-navy-700">
          <span class="text-[11px] text-slate-400 font-medium">Peran:</span>
          <select id="adminRoleSelect" onchange="changeAdminRole(this.value)" class="bg-transparent text-xs font-bold text-gold-500 focus:outline-none cursor-pointer">
            <option value="ceo" class="bg-navy-900 text-white">CEO (Afif Ardiansyah) • Full Akses</option>
            <option value="coo" class="bg-navy-900 text-white">COO (Davina Clarissa) • Operasional</option>
            <option value="cmo" class="bg-navy-900 text-white">CMO (Hasan Fitaihi) • Konten & Marketing</option>
            <option value="chro" class="bg-navy-900 text-white">CHRO (Afriza Ata) • Mitra Mahasiswa</option>
          </select>
        </div>

        <!-- TOMBOL KUNJUNGI WEBSITE PUBLIK -->
        <a href="index.html" onclick="goToPublicSite(); return false;" class="btn-spring focus-ring px-3.5 py-1.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-900 font-bold text-xs flex items-center gap-1.5 shadow-sm">
          <span>Lihat Website</span>
          <svg class="w-3.5 h-3.5 stroke-current fill-none stroke-2 stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        </a>

        <!-- QUICK NOTIFICATION BELL -->
        <button onclick="showToast('Sistem sinkronisasi realtime aktif')" class="p-2 text-slate-300 hover:text-white rounded-lg relative focus-ring">
          <svg class="w-5 h-5 stroke-current fill-none stroke-2 stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
          <span class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
        </button>

      </div>
    </div>
  </header>

  <!-- ===================================================================== -->
  <!-- 2. MAIN LAYOUT (SIDEBAR + CONTENT PANELS)                             -->
  <!-- ===================================================================== -->
  <div class="flex-1 flex overflow-hidden">
    
    <!-- SIDEBAR NAV DESKTOP & MOBILE -->
    <aside id="adminSidebar" class="hidden md:flex flex-col w-64 bg-navy-950 text-slate-300 border-r border-navy-800 shrink-0 z-30 transition-all duration-200">
      <div class="p-4 space-y-1">
        <div class="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Pusat Kendali</div>
        
        <button onclick="switchTab('dashboard')" id="tabBtn-dashboard" class="nav-tab active w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold hover:bg-navy-900 hover:text-white transition cursor-pointer">
          <svg class="w-4 h-4 stroke-current fill-none stroke-2 stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
          <span>Dashboard Utama</span>
        </button>

        <button onclick="switchTab('orders')" id="tabBtn-orders" class="nav-tab w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold hover:bg-navy-900 hover:text-white transition cursor-pointer">
          <div class="flex items-center gap-3">
            <svg class="w-4 h-4 stroke-current fill-none stroke-2 stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
            <span>Manajemen Order</span>
          </div>
          <span id="badgeOrderWaiting" class="bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">2</span>
        </button>

        <button onclick="switchTab('workers')" id="tabBtn-workers" class="nav-tab w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold hover:bg-navy-900 hover:text-white transition cursor-pointer">
          <svg class="w-4 h-4 stroke-current fill-none stroke-2 stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          <span>Mitra Mahasiswa</span>
        </button>

        <button onclick="switchTab('services')" id="tabBtn-services" class="nav-tab w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold hover:bg-navy-900 hover:text-white transition cursor-pointer">
          <svg class="w-4 h-4 stroke-current fill-none stroke-2 stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
          <span>Layanan & Satuan</span>
        </button>

        <div class="pt-4 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Website & Sistem</div>

        <button onclick="switchTab('cms')" id="tabBtn-cms" class="nav-tab w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold hover:bg-navy-900 hover:text-white transition cursor-pointer">
          <svg class="w-4 h-4 stroke-current fill-none stroke-2 stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
          <span>Konten Website (CMS)</span>
        </button>

        <button onclick="switchTab('reports')" id="tabBtn-reports" class="nav-tab w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold hover:bg-navy-900 hover:text-white transition cursor-pointer">
          <svg class="w-4 h-4 stroke-current fill-none stroke-2 stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
          <span>Laporan & Ekspor</span>
        </button>

        <button onclick="switchTab('settings')" id="tabBtn-settings" class="nav-tab w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold hover:bg-navy-900 hover:text-white transition cursor-pointer">
          <svg class="w-4 h-4 stroke-current fill-none stroke-2 stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
          <span>Pengaturan WA & Toko</span>
        </button>

      </div>

      <!-- FOOTER SIDEBAR INFO -->
      <div class="mt-auto p-4 border-t border-navy-800 text-[11px] text-slate-400">
        <div class="font-semibold text-slate-200">SOP Adab Muamalah:</div>
        <div class="text-[10px] text-slate-400 mt-1 leading-relaxed">
          • Order kamar kos putri wajib 100% worker mahasiswi<br>
          • Tanpa mark-up sepihak biaya talangan belanja
        </div>
      </div>
    </aside>

    <!-- CONTENT WRAPPER -->
    <main class="flex-1 overflow-y-auto bg-slate-50 p-4 sm:p-6 lg:p-8 space-y-6">

      <!-- ================================================================= -->
      <!-- PANEL 1: DASHBOARD UTAMA                                          -->
      <!-- ================================================================= -->
      <section id="panel-dashboard" class="space-y-6">
        
        <!-- HEADER TITLE & QUICK ACTIONS -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 class="font-heading font-black text-2xl sm:text-3xl text-navy-900 tracking-tight">Dashboard Operasional</h1>
            <p class="text-xs sm:text-sm text-slate-600 mt-0.5">Ringkasan status harian pesanan jasa mahasiswa UNAIR SURUH</p>
          </div>
          <div class="flex items-center gap-2">
            <button onclick="openModalNewOrder()" class="btn-spring focus-ring px-4 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-gold-500 font-bold text-xs flex items-center gap-2 shadow-sm">
              <svg class="w-4 h-4 stroke-current fill-none stroke-2 stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              <span>Catat Order Manual</span>
            </button>
            <button onclick="openModalAddWorker()" class="btn-spring focus-ring px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-navy-900 font-bold text-xs hover:bg-slate-50 shadow-xs">
              + Mitra Baru
            </button>
          </div>
        </div>

        <!-- STAT METRICS CARDS -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold text-slate-500">Order Hari Ini</span>
              <div class="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <svg class="w-4 h-4 stroke-current fill-none stroke-2 stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              </div>
            </div>
            <div class="font-heading font-black text-2xl text-navy-900" id="statTodayOrders">18</div>
            <div class="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
              <svg class="w-3 h-3 fill-current" viewBox="0 0 24 24"><polygon points="12 4 4 20 20 20"/></svg>
              <span>+24% dibanding kemarin</span>
            </div>
          </div>

          <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold text-slate-500">Menunggu Tindakan</span>
              <div class="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <svg class="w-4 h-4 stroke-current fill-none stroke-2 stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
            </div>
            <div class="font-heading font-black text-2xl text-amber-600" id="statPendingOrders">2</div>
            <div class="text-[11px] text-slate-500">Perlu konfirmasi WhatsApp</div>
          </div>

          <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold text-slate-500">Mitra Aktif UNAIR</span>
              <div class="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <svg class="w-4 h-4 stroke-current fill-none stroke-2 stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
            </div>
            <div class="font-heading font-black text-2xl text-navy-900" id="statActiveWorkers">32</div>
            <div class="text-[11px] text-slate-500">100% KTM Terverifikasi</div>
          </div>

          <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold text-slate-500">Rating Amanah</span>
              <div class="w-8 h-8 rounded-lg bg-gold-100 text-gold-600 flex items-center justify-center">
                <svg class="w-4 h-4 fill-current text-gold-600" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              </div>
            </div>
            <div class="font-heading font-black text-2xl text-navy-900">4.9 <span class="text-sm font-normal text-slate-400">/ 5.0</span></div>
            <div class="text-[11px] text-slate-500">Dari 142 ulasan pelanggan</div>
          </div>

        </div>

        <!-- ALERT GENDER MATCH NOTIFIKASI -->
        <div class="bg-rose-50 border border-rose-200 p-4 rounded-2xl flex items-start sm:items-center justify-between gap-3 text-xs text-rose-900">
          <div class="flex items-start sm:items-center gap-3">
            <div class="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
              <svg class="w-4 h-4 stroke-current fill-none stroke-2 stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            </div>
            <div>
              <span class="font-bold">Perhatian SOP Gender Match:</span> Ada pesanan pembersihan kamar kos putri masuk. Sistem mengunci penugasan hanya untuk mitra mahasiswi putri.
            </div>
          </div>
          <button onclick="filterOrdersBy('privat')" class="btn-spring focus-ring px-3 py-1.5 rounded-lg bg-rose-600 text-white font-bold text-[11px] shrink-0">
            Lihat Order
          </button>
        </div>

        <!-- RECENT ORDERS PREVIEW -->
        <div class="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden space-y-4 p-5">
          <div class="flex items-center justify-between">
            <h2 class="font-heading font-bold text-base text-navy-900">Pesanan Masuk Terbaru</h2>
            <button onclick="switchTab('orders')" class="text-xs font-bold text-navy-700 hover:text-gold-500 transition">
              Lihat Semua Order →
            </button>
          </div>
          
          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead class="bg-slate-50 text-slate-500 border-b border-slate-200">
                <tr>
                  <th class="p-3 font-semibold">Kode Order</th>
                  <th class="p-3 font-semibold">Layanan & Satuan</th>
                  <th class="p-3 font-semibold">Pemesan & No WA</th>
                  <th class="p-3 font-semibold">Status</th>
                  <th class="p-3 font-semibold">Mitra Mahasiswa</th>
                  <th class="p-3 font-semibold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody id="dashboardRecentTable" class="divide-y divide-slate-100">
                <!-- Rendered by JS -->
              </tbody>
            </table>
          </div>
        </div>

      </section>

      <!-- ================================================================= -->
      <!-- PANEL 2: MANAJEMEN ORDER LENGKAP                                  -->
      <!-- ================================================================= -->
      <section id="panel-orders" class="space-y-6 hidden">
        
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 class="font-heading font-black text-2xl text-navy-900 tracking-tight">Manajemen Pesanan</h1>
            <p class="text-xs text-slate-600">Daftar semua order, verifikasi gender match, dan penetapan mitra tugas</p>
          </div>
          <div class="flex items-center gap-2">
            <button onclick="exportOrdersToCSV()" class="btn-spring focus-ring px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 font-bold text-xs flex items-center gap-1.5 hover:bg-slate-50">
              <svg class="w-3.5 h-3.5 stroke-current fill-none stroke-2 stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              <span>Ekspor CSV</span>
            </button>
            <button onclick="openModalNewOrder()" class="btn-spring focus-ring px-4 py-2 rounded-xl bg-navy-900 text-gold-500 font-bold text-xs flex items-center gap-1.5 hover:bg-navy-800">
              <span>+ Buat Order Baru</span>
            </button>
          </div>
        </div>

        <!-- FILTER TABS & SEARCH BAR -->
        <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div class="flex flex-col md:flex-row gap-3 items-center justify-between">
            
            <!-- SEARCH INPUT -->
            <div class="relative w-full md:w-80">
              <input type="text" id="orderSearchInput" onkeyup="filterOrderTable()" placeholder="Cari kode order, nama, atau no WA..." class="focus-ring w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 placeholder-slate-400" />
              <svg class="w-4 h-4 absolute left-3 top-2.5 text-slate-400 stroke-current fill-none stroke-2 stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </div>

            <!-- STATUS FILTER PILLS -->
            <div class="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none text-xs">
              <button onclick="setOrderStatusFilter('all')" id="filterStatus-all" class="px-3 py-1.5 rounded-lg bg-navy-900 text-gold-500 font-bold whitespace-nowrap">Semua</button>
              <button onclick="setOrderStatusFilter('Menunggu Akad')" id="filterStatus-Menunggu" class="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 font-medium whitespace-nowrap hover:bg-slate-200">Menunggu Akad</button>
              <button onclick="setOrderStatusFilter('Dikerjakan')" id="filterStatus-Dikerjakan" class="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 font-medium whitespace-nowrap hover:bg-slate-200">Dikerjakan</button>
              <button onclick="setOrderStatusFilter('Selesai')" id="filterStatus-Selesai" class="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 font-medium whitespace-nowrap hover:bg-slate-200">Selesai</button>
              <button onclick="setOrderStatusFilter('privat')" id="filterStatus-privat" class="px-3 py-1.5 rounded-lg bg-rose-100 text-rose-700 font-bold whitespace-nowrap">Khusus Kos Putri</button>
            </div>

          </div>
        </div>

        <!-- FULL ORDERS TABLE -->
        <div class="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead class="bg-slate-50 text-slate-600 border-b border-slate-200 font-semibold">
                <tr>
                  <th class="p-3.5">Kode</th>
                  <th class="p-3.5">Layanan & Satuan Kerja</th>
                  <th class="p-3.5">Pemesan (WhatsApp)</th>
                  <th class="p-3.5">Jadwal & Lokasi</th>
                  <th class="p-3.5">Privasi / Gender</th>
                  <th class="p-3.5">Status</th>
                  <th class="p-3.5">Worker Ditugaskan</th>
                  <th class="p-3.5 text-center">Kelola</th>
                </tr>
              </thead>
              <tbody id="ordersMainTable" class="divide-y divide-slate-100">
                <!-- Rendered by JS -->
              </tbody>
            </table>
          </div>
        </div>

      </section>

      <!-- ================================================================= -->
      <!-- PANEL 3: MITRA MAHASISWA (WORKERS)                                -->
      <!-- ================================================================= -->
      <section id="panel-workers" class="space-y-6 hidden">
        
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 class="font-heading font-black text-2xl text-navy-900 tracking-tight">Mitra Mahasiswa Aktif UNAIR</h1>
            <p class="text-xs text-slate-600">Verifikasi KTM mahasiswa, gender, armada kendaraan, dan rating amanah</p>
          </div>
          <button onclick="openModalAddWorker()" class="btn-spring focus-ring px-4 py-2.5 rounded-xl bg-navy-900 text-gold-500 font-bold text-xs flex items-center gap-1.5">
            <span>+ Tambah Mitra Baru</span>
          </button>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4" id="workersGrid">
          <!-- Rendered by JS -->
        </div>

      </section>

      <!-- ================================================================= -->
      <!-- PANEL 4: LAYANAN & SATUAN KERJA                                   -->
      <!-- ================================================================= -->
      <section id="panel-services" class="space-y-6 hidden">
        
        <div>
          <h1 class="font-heading font-black text-2xl text-navy-900 tracking-tight">Katalog Layanan & Satuan Kerja</h1>
          <p class="text-xs text-slate-600">Standar satuan pemesanan dan model muamalah zero-pricing tanpa perang harga</p>
        </div>

        <div class="grid md:grid-cols-2 gap-4" id="servicesGrid">
          <!-- Rendered by JS -->
        </div>

      </section>

      <!-- ================================================================= -->
      <!-- PANEL 5: CMS KONTEN WEBSITE                                       -->
      <!-- ================================================================= -->
      <section id="panel-cms" class="space-y-6 hidden">
        
        <div>
          <h1 class="font-heading font-black text-2xl text-navy-900 tracking-tight">CMS Konten Website</h1>
          <p class="text-xs text-slate-600">Atur copywriting, banner pengumuman, dan integrasi media tanpa deploy ulang</p>
        </div>

        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5 text-xs sm:text-sm">
          
          <div class="space-y-2">
            <label class="block font-bold text-navy-900">Judul Utama Hero (Tagline)</label>
            <input type="text" id="cmsHeroTitle" value="Capek Suruh-Suruh? Serahkan ke UNAIR SURUH." class="focus-ring w-full p-3 rounded-xl border border-slate-300 font-bold text-sm" />
            <p class="text-[11px] text-slate-500">Gunakan tanda tanya (?) untuk pemisah baris warna gold.</p>
          </div>

          <div class="space-y-2">
            <label class="block font-bold text-navy-900">Deskripsi Singkat Hero</label>
            <textarea id="cmsHeroDesc" rows="3" class="focus-ring w-full p-3 rounded-xl border border-slate-300 text-xs sm:text-sm leading-relaxed">Layanan pindah kos (1 driver + 1 SDM), bersihin kos putri/putra, rakit barang, antar jemput mobil AC / motor, hingga kebutuhan urgent 24 jam. Dikerjakan langsung oleh mitra mahasiswa aktif Universitas Airlangga dengan adab muamalah dan privasi terjaga.</textarea>
          </div>

          <div class="grid sm:grid-cols-2 gap-4">
            <div class="space-y-2">
              <label class="block font-bold text-navy-900">Banner Pengumuman / Event Maba</label>
              <input type="text" id="cmsBannerText" value="Layanan On-Demand Mahasiswa UNAIR Surabaya" class="focus-ring w-full p-2.5 rounded-xl border border-slate-300 text-xs" />
            </div>
            <div class="space-y-2">
              <label class="block font-bold text-navy-900">Akun TikTok Resmi</label>
              <input type="text" id="cmsTiktokUser" value="@unair_suruh" class="focus-ring w-full p-2.5 rounded-xl border border-slate-300 text-xs font-mono" />
            </div>
          </div>

          <div class="pt-2 flex items-center gap-3">
            <button onclick="saveCmsSettings()" class="btn-spring focus-ring px-6 py-3 rounded-xl bg-navy-900 text-gold-500 font-bold text-xs hover:bg-navy-800">
              Simpan Konten Laman
            </button>
            <a href="index.html" target="_blank" class="btn-spring focus-ring px-4 py-3 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50">
              Lihat di Website Publik
            </a>
          </div>

        </div>

      </section>

      <!-- ================================================================= -->
      <!-- PANEL 6: LAPORAN & REKAP                                          -->
      <!-- ================================================================= -->
      <section id="panel-reports" class="space-y-6 hidden">
        
        <div>
          <h1 class="font-heading font-black text-2xl text-navy-900 tracking-tight">Laporan & Statistik</h1>
          <p class="text-xs text-slate-600">Performa layanan dan kepatuhan muamalah kerja mitra</p>
        </div>

        <div class="grid md:grid-cols-3 gap-4">
          <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div class="text-xs font-semibold text-slate-500">Layanan Paling Banyak Diminati</div>
            <div class="font-heading font-bold text-lg text-navy-900">Antar Jemput Amerta</div>
            <div class="text-[11px] text-slate-500">38% dari total pesanan masuk</div>
          </div>
          <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div class="text-xs font-semibold text-slate-500">Kepatuhan Gender Match</div>
            <div class="font-heading font-bold text-lg text-emerald-600">100% Sesuai</div>
            <div class="text-[11px] text-slate-500">Seluruh kos putri dikerjakan mitra cewek</div>
          </div>
          <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div class="text-xs font-semibold text-slate-500">Waktu Respon WhatsApp</div>
            <div class="font-heading font-bold text-lg text-navy-900">&lt; 8 Menit</div>
            <div class="text-[11px] text-slate-500">Standar operasional tercapai</div>
          </div>
        </div>

        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <h3 class="font-heading font-bold text-sm text-navy-900">Ekspor Arsip Pesanan</h3>
          <p class="text-xs text-slate-600">Unduh data seluruh pesanan untuk pelaporan tim operasional.</p>
          <button onclick="exportOrdersToCSV()" class="btn-spring focus-ring px-5 py-2.5 rounded-xl bg-navy-900 text-gold-500 font-bold text-xs flex items-center gap-2">
            <svg class="w-4 h-4 stroke-current fill-none stroke-2 stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            <span>Unduh Berkas CSV Lengkap</span>
          </button>
        </div>

      </section>

      <!-- ================================================================= -->
      <!-- PANEL 7: PENGATURAN TOKO & WHATSAPP                               -->
      <!-- ================================================================= -->
      <section id="panel-settings" class="space-y-6 hidden">
        
        <div>
          <h1 class="font-heading font-black text-2xl text-navy-900 tracking-tight">Pengaturan WhatsApp & Operasional</h1>
          <p class="text-xs text-slate-600">Nomor kontak utama WhatsApp, jam kerja, dan tim pengelola</p>
        </div>

        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5 text-xs sm:text-sm">
          
          <div class="space-y-2">
            <label class="block font-bold text-navy-900">Nomor WhatsApp Resmi Admin (Format 628...)</label>
            <input type="text" id="settingWaNumber" value="6289509960815" class="focus-ring w-full p-3 rounded-xl border border-slate-300 font-mono text-sm" />
            <p class="text-[11px] text-slate-500">Nomor ini yang akan menerima seluruh order otomatis dari tombol website.</p>
          </div>

          <div class="space-y-2">
            <label class="block font-bold text-navy-900">Jam Operasional Layanan</label>
            <input type="text" id="settingHours" value="06.00 - 24.00 WIB (Kebutuhan Urgent Siaga 24 Jam)" class="focus-ring w-full p-3 rounded-xl border border-slate-300 text-xs sm:text-sm" />
          </div>

          <div class="pt-2">
            <button onclick="saveAdminSettings()" class="btn-spring focus-ring px-6 py-3 rounded-xl bg-navy-900 text-gold-500 font-bold text-xs hover:bg-navy-800">
              Simpan Pengaturan
            </button>
          </div>

        </div>

      </section>

    </main>

  </div>

  <!-- ===================================================================== -->
  <!-- 3. MODALS (DETAIL ORDER, ASSIGN WORKER, NEW ORDER, ADD WORKER)        -->
  <!-- ===================================================================== -->

  <!-- MODAL DETAIL & KELOLA ORDER -->
  <div id="modalOrderDetail" class="fixed inset-0 bg-navy-900/70 backdrop-blur-xs z-50 hidden flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 space-y-5">
      
      <div class="flex items-center justify-between pb-3 border-b border-slate-200">
        <div>
          <span id="modalOrderCode" class="font-mono text-xs font-bold bg-navy-900 text-gold-500 px-2 py-0.5 rounded">#US-2610-842</span>
          <h3 class="font-heading font-black text-lg text-navy-900 mt-1" id="modalOrderSvc">Pindah Kos (Tossa)</h3>
        </div>
        <button onclick="closeModalOrder()" class="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg">
          <svg class="w-5 h-5 stroke-current fill-none stroke-2 stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>

      <div class="space-y-3 text-xs">
        <div class="p-3 bg-slate-50 rounded-xl space-y-1.5 border border-slate-200">
          <div class="flex justify-between"><span class="text-slate-500">Nama Pemesan:</span> <span class="font-bold text-navy-900" id="modalOrderName">Sarah</span></div>
          <div class="flex justify-between"><span class="text-slate-500">WhatsApp:</span> <a id="modalOrderWaLink" href="#" target="_blank" class="font-mono font-bold text-emerald-600 hover:underline">0812-3456-7890</a></div>
          <div class="flex justify-between"><span class="text-slate-500">Satuan Kerja:</span> <span class="font-semibold text-navy-900" id="modalOrderSatuan">1 Tossa + 1 Helper</span></div>
          <div class="flex justify-between"><span class="text-slate-500">Lokasi Asal:</span> <span class="text-slate-800" id="modalOrderPickup">Kos Melati Mulyorejo</span></div>
          <div class="flex justify-between"><span class="text-slate-500">Lokasi Tujuan:</span> <span class="text-slate-800" id="modalOrderDropoff">Wisma Dharmawangsa</span></div>
          <div class="flex justify-between"><span class="text-slate-500">Jadwal:</span> <span class="font-semibold text-navy-900" id="modalOrderTime">Hari ini jam 15.00 WIB</span></div>
          <div class="flex justify-between items-center"><span class="text-slate-500">Privasi Kos Putri:</span> <span class="font-bold px-2 py-0.5 rounded text-[10px]" id="modalOrderPrivat">Ya (Wajib Cewek)</span></div>
        </div>

        <div>
          <span class="block text-slate-500 font-semibold mb-1">Catatan Pemesan:</span>
          <div class="p-2.5 bg-amber-50/70 border border-amber-200 rounded-lg text-slate-700 italic" id="modalOrderNotes">-</div>
        </div>

        <div class="pt-2 border-t border-slate-200 space-y-3">
          <label class="block font-bold text-navy-900">Tugaskan Mitra Mahasiswa:</label>
          <select id="modalAssignWorkerSelect" class="focus-ring w-full p-2.5 rounded-xl border border-slate-300 text-xs">
            <!-- Populated by JS based on gender match -->
          </select>
          <div id="modalGenderAlert" class="text-[10px] text-rose-600 font-medium hidden">
            ⚠️ Order ruang privat: Opsi dikunci hanya untuk mitra mahasiswi putri.
          </div>
        </div>

        <div class="space-y-2">
          <label class="block font-bold text-navy-900">Ubah Status Pesanan:</label>
          <select id="modalOrderStatusSelect" class="focus-ring w-full p-2.5 rounded-xl border border-slate-300 text-xs font-semibold">
            <option value="Menunggu Akad">Menunggu Akad (Konfirmasi)</option>
            <option value="Dikerjakan">Dikerjakan (Worker Ditugaskan)</option>
            <option value="Selesai">Selesai (Tugas Rampung)</option>
            <option value="Dibatalkan">Dibatalkan</option>
          </select>
        </div>
      </div>

      <div class="flex items-center gap-2 pt-2">
        <button onclick="saveOrderDetailAction()" class="btn-spring focus-ring flex-1 py-2.5 rounded-xl bg-navy-900 text-gold-500 font-bold text-xs hover:bg-navy-800">
          Simpan Perubahan
        </button>
        <button onclick="openWaChatDirect()" class="btn-spring focus-ring px-4 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 hover:bg-emerald-500" title="Chat WhatsApp Pemesan">
          <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
          <span>Chat WA</span>
        </button>
      </div>

    </div>
  </div>

  <!-- MODAL CATAT ORDER MANUAL -->
  <div id="modalNewOrder" class="fixed inset-0 bg-navy-900/70 backdrop-blur-xs z-50 hidden flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 space-y-4 text-xs">
      <div class="flex items-center justify-between pb-3 border-b border-slate-200">
        <h3 class="font-heading font-black text-base text-navy-900">Catat Order Manual</h3>
        <button onclick="closeModalNewOrder()" class="text-slate-400 hover:text-slate-600">✕</button>
      </div>

      <div>
        <label class="block font-semibold text-slate-700 mb-1">Pilih Layanan</label>
        <select id="newOrderSvc" class="focus-ring w-full p-2.5 rounded-lg border border-slate-300">
          <option value="Pindah Kos">Pindah Kos (Tossa / Van)</option>
          <option value="Bersihin Kos">Bersihin Kos (Deep Cleaning)</option>
          <option value="Rakit Barang">Rakit Barang (Meja / Lemari)</option>
          <option value="Antar Jemput">Antar Jemput (Mobil AC / Motor)</option>
          <option value="Antar Paket / ELPT">Antar Paket / Sertifikat ELPT</option>
          <option value="Kebutuhan Urgent">Kebutuhan Urgent 24 Jam</option>
          <option value="Beliin Barang">Beliin Barang / Jastip</option>
        </select>
      </div>

      <div>
        <label class="block font-semibold text-slate-700 mb-1">Satuan & Rincian Tugas</label>
        <input type="text" id="newOrderSatuan" placeholder="cth: 1 Tossa + 1 Helper (Lantai 2)" class="focus-ring w-full p-2.5 rounded-lg border border-slate-300" />
      </div>

      <div class="grid grid-cols-2 gap-2">
        <div>
          <label class="block font-semibold text-slate-700 mb-1">Nama Pemesan</label>
          <input type="text" id="newOrderName" placeholder="Nama Pelanggan" class="focus-ring w-full p-2.5 rounded-lg border border-slate-300" />
        </div>
        <div>
          <label class="block font-semibold text-slate-700 mb-1">No WhatsApp</label>
          <input type="text" id="newOrderWa" placeholder="08123456789" class="focus-ring w-full p-2.5 rounded-lg border border-slate-300 font-mono" />
        </div>
      </div>

      <div>
        <label class="block font-semibold text-slate-700 mb-1">Lokasi Jemput & Antar</label>
        <input type="text" id="newOrderLocation" placeholder="Lokasi Asal / Tujuan" class="focus-ring w-full p-2.5 rounded-lg border border-slate-300" />
      </div>

      <label class="flex items-center gap-2 p-2 bg-slate-50 rounded-lg border border-slate-200 cursor-pointer">
        <input type="checkbox" id="newOrderPrivat" class="rounded text-gold-500 focus:ring-gold-500" />
        <span>Khusus Kos Putri (Wajib Mitra Cewek)</span>
      </label>

      <div class="pt-2 flex items-center gap-2">
        <button onclick="submitNewOrderManual()" class="btn-spring focus-ring flex-1 py-2.5 rounded-xl bg-navy-900 text-gold-500 font-bold hover:bg-navy-800">
          Simpan Order
        </button>
        <button onclick="closeModalNewOrder()" class="btn-spring focus-ring px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold hover:bg-slate-50">
          Batal
        </button>
      </div>
    </div>
  </div>

  <!-- TOAST NOTIFICATION POPUP -->
  <div id="adminToast" class="fixed bottom-5 right-5 bg-navy-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-gold-500 text-xs font-semibold flex items-center gap-2 transform translate-y-20 opacity-0 transition-all duration-300 z-50 pointer-events-none">
    <svg class="w-4 h-4 text-emerald-400 fill-current" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
    <span id="toastMsg">Tindakan berhasil disimpan</span>
  </div>

  <!-- JAVASCRIPT & STATE ENGINE -->
  <script>
    // State Data Store
    const DEFAULT_ORDERS = [
      {
        code: '#US-2610-842',
        service: 'Pindah Kos',
        satuan: '1 Tossa Roda 3 + 1 Helper Mahasiswa (Lantai 2)',
        name: 'Sarah Nabila',
        wa: '081234567890',
        pickup: 'Kos Putri Melati, Jl. Mulyorejo No. 45',
        dropoff: 'Wisma Airlangga, Jl. Dharmawangsa',
        time: 'Hari ini jam 15.00 WIB',
        isPrivat: true,
        status: 'Menunggu Akad',
        worker: 'Belum Ditugaskan',
        notes: 'Bawa tali pengikat ya min, ada kasur lipat dan lemari plastik.'
      },
      {
        code: '#US-2610-841',
        service: 'Antar Jemput',
        satuan: 'Mobil Van Dingin Ber-AC (Exclusive Maba Amerta)',
        name: 'Budi Santoso',
        wa: '085712345678',
        pickup: 'Stasiun Gubeng Surabaya',
        dropoff: 'Asrama Mahasiswa UNAIR Kampus C',
        time: 'Hari ini jam 13.30 WIB',
        isPrivat: false,
        status: 'Dikerjakan',
        worker: 'Cassano (Owner / Van)',
        notes: 'Bawa 2 koper besar maba'
      },
      {
        code: '#US-2610-840',
        service: 'Bersihin Kos',
        satuan: '1 Kamar Standar (KM Dalam) • Khusus Putri',
        name: 'Alya Khairunnisa',
        wa: '089698765432',
        pickup: 'Kos Putri Srikandi, Jl. Karangmenjangan',
        dropoff: '-',
        time: 'Hari ini jam 10.00 WIB',
        isPrivat: true,
        status: 'Selesai',
        worker: 'Siti Rahmawati (FKM)',
        notes: 'Kamar baru ditinggal liburan'
      },
      {
        code: '#US-2610-839',
        service: 'Kebutuhan Urgent',
        satuan: 'Darurat Motor (Mogok Busi Mati Tengah Malam)',
        name: 'Rizky Pratama',
        wa: '081387654321',
        pickup: 'Jl. Manyar Kertoarjo No. 12',
        dropoff: 'Bengkel Darurat',
        time: 'Tadi Malam 01.30 WIB',
        isPrivat: false,
        status: 'Selesai',
        worker: 'Dimas Arya (FST)',
        notes: 'Bawa busi cadangan dan obeng'
      },
      {
        code: '#US-2610-838',
        service: 'Rakit Barang',
        satuan: 'Rakit 1 Meja Belajar + 1 Rak Buku Susun',
        name: 'Kevin Jonathan',
        wa: '087811223344',
        pickup: 'Apartemen Educity Mulyorejo',
        dropoff: '-',
        time: 'Hari ini jam 16.00 WIB',
        isPrivat: false,
        status: 'Dikerjakan',
        worker: 'Farhan Syahputra (FTMM)',
        notes: 'Paket baru sampai dari Shopee'
      },
      {
        code: '#US-2610-837',
        service: 'Antar Paket / ELPT',
        satuan: 'Ambil Sertifikat ELPT di Pusat Bahasa Kampus B',
        name: 'Dinda Ayu',
        wa: '082155667788',
        pickup: 'Pusat Bahasa UNAIR Kampus B',
        dropoff: 'Ekspedisi JNE Dharmahusada',
        time: 'Kemarin jam 14.00 WIB',
        isPrivat: false,
        status: 'Selesai',
        worker: 'Siti Rahmawati (FKM)',
        notes: 'Kirim kilat ke Jakarta'
      }
    ];

    const DEFAULT_WORKERS = [
      {
        name: 'Cassano',
        role: 'Founder / Koordinator Armada',
        faculty: 'FTMM UNAIR',
        gender: 'Laki-laki',
        vehicle: 'Mobil Van AC & Pick-up',
        rating: 4.9,
        jobs: 124,
        status: 'Aktif',
        verified: true
      },
      {
        name: 'Siti Rahmawati',
        role: 'Mitra Utama Khusus Kos Putri',
        faculty: 'FKM UNAIR \'23',
        gender: 'Perempuan',
        vehicle: 'Motor Matic',
        rating: 5.0,
        jobs: 48,
        status: 'Aktif',
        verified: true
      },
      {
        name: 'Dimas Arya',
        role: 'Spesialis Pindah Tossa & Urgent 24 Jam',
        faculty: 'FST UNAIR \'22',
        gender: 'Laki-laki',
        vehicle: 'Tossa Roda 3 & Motor',
        rating: 4.9,
        jobs: 64,
        status: 'Aktif',
        verified: true
      },
      {
        name: 'Nabila Putri',
        role: 'Deep Cleaning & Jastip Kos',
        faculty: 'FEB UNAIR \'24',
        gender: 'Perempuan',
        vehicle: 'Motor Matic',
        rating: 4.8,
        jobs: 22,
        status: 'Aktif',
        verified: true
      },
      {
        name: 'Farhan Syahputra',
        role: 'Toolkit Perakitan & Kelistrikan',
        faculty: 'FTMM UNAIR \'23',
        gender: 'Laki-laki',
        vehicle: 'Motor',
        rating: 4.9,
        jobs: 35,
        status: 'Aktif',
        verified: true
      },
      {
        name: 'Ahmad Fikri',
        role: 'Pendaftar Baru (Verifikasi KTM)',
        faculty: 'FIB UNAIR \'25',
        gender: 'Laki-laki',
        vehicle: 'Motor',
        rating: 0,
        jobs: 0,
        status: 'Pending',
        verified: false
      }
    ];

    const DEFAULT_SERVICES = [
      {
        name: 'Pindah Kos (1 Driver + 1 SDM)',
        satuan: 'Per Muatan Armada (Tossa / Motor / Van)',
        desc: 'Bantu angkut kardus, kasur, dan perabot sampai lantai atas.',
        active: true
      },
      {
        name: 'Bersihin Kos (Deep Cleaning)',
        satuan: 'Per Kamar Kos (KM Dalam / KM Luar)',
        desc: '100% mitra mahasiswi putri untuk privasi kos putri.',
        active: true
      },
      {
        name: 'Rakit Barang & Furniture',
        satuan: 'Per Unit Furniture (Meja / Lemari / Rak)',
        desc: 'Mitra bawa toolkit obeng, palu, dan tang lengkap.',
        active: true
      },
      {
        name: 'Antar Jemput (Anjem Exclusive)',
        satuan: 'Per Trip / Rute Perjalanan',
        desc: 'Mobil Van Dingin Ber-AC Exclusive Amerta atau Motor Gesit.',
        active: true
      },
      {
        name: 'Antar Paket / Sertifikat ELPT',
        satuan: 'Per Berkas Dokumen Fisik / Per Paket',
        desc: 'Ambil berkas di Pusat Bahasa Kampus B dan drop ekspedisi.',
        active: true
      },
      {
        name: 'Kebutuhan Urgent 24 Jam',
        satuan: 'Per Panggilan Darurat Siang / Malam',
        desc: 'Motor mogok, busi mati, beli obat apotek saat sakit malam.',
        active: true
      },
      {
        name: 'Beliin Barang / Jastip',
        satuan: 'Per Titik Warung / Supermarket',
        desc: 'Kuliner malam Surabaya & belanja bulanan kos.',
        active: true
      }
    ];

    // Initialize or load from LocalStorage
    let orders = JSON.parse(localStorage.getItem('UNAIR_ORDERS')) || DEFAULT_ORDERS;
    let workers = JSON.parse(localStorage.getItem('UNAIR_WORKERS')) || DEFAULT_WORKERS;
    let services = JSON.parse(localStorage.getItem('UNAIR_SERVICES')) || DEFAULT_SERVICES;
    let activeFilterStatus = 'all';
    let currentSelectedOrderIndex = null;

    function saveState() {
      localStorage.setItem('UNAIR_ORDERS', JSON.stringify(orders));
      localStorage.setItem('UNAIR_WORKERS', JSON.stringify(workers));
      localStorage.setItem('UNAIR_SERVICES', JSON.stringify(services));
    }

    // UI Tab Navigation
    function switchTab(tabId) {
      const tabs = ['dashboard', 'orders', 'workers', 'services', 'cms', 'reports', 'settings'];
      tabs.forEach(t => {
        const panel = document.getElementById('panel-' + t);
        const btn = document.getElementById('tabBtn-' + t);
        if (panel) panel.classList.toggle('hidden', t !== tabId);
        if (btn) btn.classList.toggle('active', t === tabId);
      });
      // On mobile close sidebar
      if (window.innerWidth < 768) {
        document.getElementById('adminSidebar').classList.add('hidden');
      }
      renderAll();
    }

    function toggleMobileSidebar() {
      document.getElementById('adminSidebar').classList.toggle('hidden');
    }

    function showToast(msg) {
      const toast = document.getElementById('adminToast');
      document.getElementById('toastMsg').textContent = msg;
      toast.classList.remove('translate-y-20', 'opacity-0');
      setTimeout(() => {
        toast.classList.add('translate-y-20', 'opacity-0');
      }, 2500);
    }

    // Rendering functions
    function renderDashboardRecent() {
      const tbody = document.getElementById('dashboardRecentTable');
      if (!tbody) return;
      tbody.innerHTML = '';
      
      orders.slice(0, 5).forEach((o, idx) => {
        const tr = document.createElement('tr');
        tr.className = 'hover:bg-slate-50 transition cursor-pointer';
        tr.onclick = () => openModalOrder(idx);
        
        let statusBadge = '<span class="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-semibold">Menunggu Akad</span>';
        if (o.status === 'Dikerjakan') statusBadge = '<span class="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-semibold">Dikerjakan</span>';
        if (o.status === 'Selesai') statusBadge = '<span class="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-semibold">Selesai</span>';

        tr.innerHTML = \`
          <td class="p-3 font-mono font-bold text-navy-900">\${o.code}</td>
          <td class="p-3 font-semibold text-slate-800">\${o.service}</td>
          <td class="p-3 text-slate-600">\${o.name} <span class="text-slate-400">(\${o.wa})</span></td>
          <td class="p-3">\${statusBadge}</td>
          <td class="p-3 text-slate-700">\${o.worker}</td>
          <td class="p-3 text-right">
            <button class="text-navy-900 font-bold hover:text-gold-500">Kelola →</button>
          </td>
        \`;
        tbody.appendChild(tr);
      });

      // Update counters
      const pendingCount = orders.filter(o => o.status === 'Menunggu Akad').length;
      document.getElementById('statPendingOrders').textContent = pendingCount;
      document.getElementById('badgeOrderWaiting').textContent = pendingCount;
      document.getElementById('statTodayOrders').textContent = orders.length;
      document.getElementById('statActiveWorkers').textContent = workers.filter(w => w.status === 'Aktif').length;
    }

    function renderOrdersTable() {
      const tbody = document.getElementById('ordersMainTable');
      if (!tbody) return;
      tbody.innerHTML = '';

      const query = (document.getElementById('orderSearchInput').value || '').toLowerCase();

      const filtered = orders.filter(o => {
        if (activeFilterStatus === 'privat') return o.isPrivat;
        if (activeFilterStatus !== 'all' && o.status !== activeFilterStatus) return false;
        if (query) {
          const matchCode = o.code.toLowerCase().includes(query);
          const matchName = o.name.toLowerCase().includes(query);
          const matchWa = o.wa.toLowerCase().includes(query);
          const matchSvc = o.service.toLowerCase().includes(query);
          return matchCode || matchName || matchWa || matchSvc;
        }
        return true;
      });

      if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" class="p-8 text-center text-slate-400">Tidak ada pesanan yang sesuai filter.</td></tr>';
        return;
      }

      filtered.forEach(o => {
        const originalIndex = orders.indexOf(o);
        const tr = document.createElement('tr');
        tr.className = 'hover:bg-slate-50 transition';

        let statusBadge = '<span class="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-semibold">Menunggu Akad</span>';
        if (o.status === 'Dikerjakan') statusBadge = '<span class="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-semibold">Dikerjakan</span>';
        if (o.status === 'Selesai') statusBadge = '<span class="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-semibold">Selesai</span>';

        const privatBadge = o.isPrivat 
          ? '<span class="bg-rose-50 text-rose-700 px-2 py-0.5 rounded-md font-bold text-[10px] border border-rose-200">Kos Putri (Cewek)</span>' 
          : '<span class="text-slate-400 text-[10px]">Standar</span>';

        tr.innerHTML = \`
          <td class="p-3.5 font-mono font-bold text-navy-900">\${o.code}</td>
          <td class="p-3.5">
            <div class="font-bold text-slate-900">\${o.service}</div>
            <div class="text-[10px] text-slate-500 line-clamp-1">\${o.satuan}</div>
          </td>
          <td class="p-3.5">
            <div class="font-semibold text-slate-900">\${o.name}</div>
            <a href="https://wa.me/\${o.wa.replace(/[^0-9]/g, '')}" target="_blank" class="font-mono text-emerald-600 hover:underline text-[11px]">\${o.wa}</a>
          </td>
          <td class="p-3.5">
            <div class="text-slate-800 font-medium">\${o.time}</div>
            <div class="text-[10px] text-slate-500 line-clamp-1">\${o.pickup}</div>
          </td>
          <td class="p-3.5">\${privatBadge}</td>
          <td class="p-3.5">\${statusBadge}</td>
          <td class="p-3.5 text-slate-700 font-medium">\${o.worker}</td>
          <td class="p-3.5 text-center">
            <button onclick="openModalOrder(\${originalIndex})" class="btn-spring focus-ring px-3 py-1.5 rounded-lg bg-navy-900 text-gold-500 font-bold text-xs hover:bg-navy-800">
              Kelola
            </button>
          </td>
        \`;
        tbody.appendChild(tr);
      });
    }

    function renderWorkersGrid() {
      const grid = document.getElementById('workersGrid');
      if (!grid) return;
      grid.innerHTML = '';

      workers.forEach((w, idx) => {
        const card = document.createElement('div');
        card.className = 'bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3';
        
        const badgeGender = w.gender === 'Perempuan' 
          ? '<span class="bg-rose-100 text-rose-700 px-2 py-0.5 rounded text-[10px] font-bold">Perempuan (Kos Putri)</span>' 
          : '<span class="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-[10px] font-bold">Laki-laki</span>';

        const verifiedBadge = w.verified 
          ? '<span class="text-emerald-600 font-bold text-[11px] flex items-center gap-1"><svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L10 19 21 8l-1.41-1.41z"/></svg> KTM Terverifikasi</span>' 
          : '<span class="text-amber-600 font-bold text-[11px]">Pending Verifikasi KTM</span>';

        card.innerHTML = \`
          <div class="flex items-start justify-between">
            <div>
              <h3 class="font-heading font-bold text-base text-navy-900">\${w.name}</h3>
              <p class="text-xs text-slate-500 font-medium">\${w.role} • \${w.faculty}</p>
            </div>
            <span class="text-xs font-bold px-2 py-0.5 rounded-full \${w.status === 'Aktif' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'}">\${w.status}</span>
          </div>

          <div class="text-xs space-y-1.5 text-slate-600 border-t border-b border-slate-100 py-2.5">
            <div class="flex justify-between"><span>Gender:</span> \${badgeGender}</div>
            <div class="flex justify-between"><span>Kendaraan:</span> <span class="font-semibold text-slate-800">\${w.vehicle}</span></div>
            <div class="flex justify-between"><span>Rating Amanah:</span> <span class="font-bold text-gold-600">★ \${w.rating} (\${w.jobs} Job)</span></div>
          </div>

          <div class="flex items-center justify-between pt-1">
            \${verifiedBadge}
            <button onclick="toggleWorkerStatus(\${idx})" class="text-xs font-bold text-navy-900 hover:text-gold-500">
              \${w.status === 'Aktif' ? 'Nonaktifkan' : 'Aktifkan'}
            </button>
          </div>
        \`;
        grid.appendChild(card);
      });
    }

    function renderServicesGrid() {
      const grid = document.getElementById('servicesGrid');
      if (!grid) return;
      grid.innerHTML = '';

      services.forEach((s, idx) => {
        const card = document.createElement('div');
        card.className = 'bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3';
        card.innerHTML = \`
          <div class="flex items-start justify-between">
            <div>
              <h3 class="font-heading font-bold text-base text-navy-900">\${s.name}</h3>
              <div class="inline-block bg-gold-100 text-gold-800 text-[10px] font-bold px-2 py-0.5 rounded-md mt-1">
                Satuan: \${s.satuan}
              </div>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" \${s.active ? 'checked' : ''} onchange="toggleServiceActive(\${idx})" class="sr-only peer">
              <div class="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-navy-900"></div>
            </label>
          </div>
          <p class="text-xs text-slate-600 leading-relaxed">\${s.desc}</p>
        \`;
        grid.appendChild(card);
      });
    }

    function renderAll() {
      renderDashboardRecent();
      renderOrdersTable();
      renderWorkersGrid();
      renderServicesGrid();
    }

    // Modal Operations
    function openModalOrder(idx) {
      currentSelectedOrderIndex = idx;
      const o = orders[idx];
      document.getElementById('modalOrderCode').textContent = o.code;
      document.getElementById('modalOrderSvc').textContent = o.service;
      document.getElementById('modalOrderName').textContent = o.name;
      document.getElementById('modalOrderWaLink').textContent = o.wa;
      document.getElementById('modalOrderWaLink').href = 'https://wa.me/' + o.wa.replace(/[^0-9]/g, '');
      document.getElementById('modalOrderSatuan').textContent = o.satuan;
      document.getElementById('modalOrderPickup').textContent = o.pickup;
      document.getElementById('modalOrderDropoff').textContent = o.dropoff || '-';
      document.getElementById('modalOrderTime').textContent = o.time;
      document.getElementById('modalOrderNotes').textContent = o.notes || '-';
      document.getElementById('modalOrderStatusSelect').value = o.status;

      const privEl = document.getElementById('modalOrderPrivat');
      const alertEl = document.getElementById('modalGenderAlert');
      if (o.isPrivat) {
        privEl.textContent = 'Ya (Wajib Worker Cewek)';
        privEl.className = 'font-bold px-2 py-0.5 rounded text-[10px] bg-rose-100 text-rose-700';
        alertEl.classList.remove('hidden');
      } else {
        privEl.textContent = 'Tidak (Standar)';
        privEl.className = 'font-bold px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-600';
        alertEl.classList.add('hidden');
      }

      // Populate Worker Select with Gender Matching Rules
      const select = document.getElementById('modalAssignWorkerSelect');
      select.innerHTML = '<option value=\"Belum Ditugaskan\">-- Pilih Mitra Mahasiswa --</option>';

      workers.filter(w => w.status === 'Aktif').forEach(w => {
        if (o.isPrivat && w.gender !== 'Perempuan') return; // Enforce Gender Match rule
        const opt = document.createElement('option');
        opt.value = w.name + ' (' + w.faculty + ')';
        opt.textContent = w.name + ' • ' + w.gender + ' (' + w.vehicle + ')';
        if (o.worker.includes(w.name)) opt.selected = true;
        select.appendChild(opt);
      });

      document.getElementById('modalOrderDetail').classList.remove('hidden');
    }

    function closeModalOrder() {
      document.getElementById('modalOrderDetail').classList.add('hidden');
      currentSelectedOrderIndex = null;
    }

    function saveOrderDetailAction() {
      if (currentSelectedOrderIndex === null) return;
      const o = orders[currentSelectedOrderIndex];
      o.status = document.getElementById('modalOrderStatusSelect').value;
      o.worker = document.getElementById('modalAssignWorkerSelect').value;
      saveState();
      renderAll();
      closeModalOrder();
      showToast('Perubahan pesanan ' + o.code + ' berhasil disimpan');
    }

    function openWaChatDirect() {
      if (currentSelectedOrderIndex === null) return;
      const o = orders[currentSelectedOrderIndex];
      const cleanNum = o.wa.replace(/[^0-9]/g, '');
      const waMsg = \`Halo Kak \${o.name}, kami dari Tim Admin UNAIR SURUH terkait pesanan *\${o.service}* (\${o.code}). Mitra yang ditugaskan: *\${o.worker}*. Jadwal: \${o.time}. Mohon konfirmasi ketersediaannya ya kak, terima kasih!\`;
      window.open('https://wa.me/' + cleanNum + '?text=' + encodeURIComponent(waMsg), '_blank');
    }

    function setOrderStatusFilter(status) {
      activeFilterStatus = status;
      ['all', 'Menunggu', 'Dikerjakan', 'Selesai', 'privat'].forEach(s => {
        const btn = document.getElementById('filterStatus-' + s);
        if (btn) {
          const isMatch = (status === 'all' && s === 'all') || (status === 'Menunggu Akad' && s === 'Menunggu') || (status === s);
          btn.className = isMatch 
            ? 'px-3 py-1.5 rounded-lg bg-navy-900 text-gold-500 font-bold whitespace-nowrap'
            : 'px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 font-medium whitespace-nowrap hover:bg-slate-200';
        }
      });
      renderOrdersTable();
    }

    function filterOrderTable() {
      renderOrdersTable();
    }

    function filterOrdersBy(type) {
      switchTab('orders');
      setOrderStatusFilter(type);
    }

    // New Order Modal
    function openModalNewOrder() {
      document.getElementById('modalNewOrder').classList.remove('hidden');
    }
    function closeModalNewOrder() {
      document.getElementById('modalNewOrder').classList.add('hidden');
    }
    function submitNewOrderManual() {
      const svc = document.getElementById('newOrderSvc').value;
      const satuan = document.getElementById('newOrderSatuan').value.trim() || 'Paket Standar';
      const name = document.getElementById('newOrderName').value.trim() || 'Kak Mahasiswa';
      const wa = document.getElementById('newOrderWa').value.trim() || '08123456789';
      const loc = document.getElementById('newOrderLocation').value.trim() || 'Surabaya';
      const isPrivat = document.getElementById('newOrderPrivat').checked;

      const randNum = Math.floor(Math.random() * 900) + 100;
      const code = '#US-2610-' + randNum;

      orders.unshift({
        code: code,
        service: svc,
        satuan: satuan,
        name: name,
        wa: wa,
        pickup: loc,
        dropoff: '-',
        time: 'Hari ini',
        isPrivat: isPrivat,
        status: 'Menunggu Akad',
        worker: 'Belum Ditugaskan',
        notes: 'Order dicatat langsung via Web Admin'
      });

      saveState();
      renderAll();
      closeModalNewOrder();
      showToast('Order baru ' + code + ' berhasil ditambahkan');
    }

    function toggleWorkerStatus(idx) {
      workers[idx].status = workers[idx].status === 'Aktif' ? 'Nonaktif' : 'Aktif';
      saveState();
      renderWorkersGrid();
      showToast('Status mitra ' + workers[idx].name + ' diperbarui');
    }

    function toggleServiceActive(idx) {
      services[idx].active = !services[idx].active;
      saveState();
      showToast('Status layanan ' + services[idx].name + ' diperbarui');
    }

    function saveCmsSettings() {
      const title = document.getElementById('cmsHeroTitle').value.trim();
      const desc = document.getElementById('cmsHeroDesc').value.trim();
      localStorage.setItem('UNAIR_SURUH_TITLE', title);
      localStorage.setItem('UNAIR_SURUH_DESC', desc);
      showToast('Konten website berhasil disimpan dan disinkronkan');
    }

    function saveAdminSettings() {
      const wa = document.getElementById('settingWaNumber').value.trim();
      localStorage.setItem('UNAIR_SURUH_WA', wa);
      showToast('Nomor WhatsApp operasional disimpan: ' + wa);
    }

    function exportOrdersToCSV() {
      let csv = 'Kode Order,Layanan,Satuan,Nama,WhatsApp,Waktu,Lokasi Asal,Lokasi Tujuan,Privasi Putri,Status,Worker\\n';
      orders.forEach(o => {
        csv += \`"\${o.code}","\${o.service}","\${o.satuan}","\${o.name}","\${o.wa}","\${o.time}","\${o.pickup}","\${o.dropoff || '-'}","\${o.isPrivat ? 'Ya' : 'Tidak'}","\${o.status}","\${o.worker}"\\n\`;
      });
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'UNAIR-SURUH-Orders-' + new Date().toISOString().slice(0, 10) + '.csv';
      a.click();
      window.URL.revokeObjectURL(url);
      showToast('Berkas CSV pesanan berhasil diunduh');
    }

    function changeAdminRole(role) {
      showToast('Mode login berganti: ' + role.toUpperCase());
    }

    function goToPublicSite() {
      if (window.location.protocol === 'file:') {
        window.location.href = 'UNAIR SURUH.html';
      } else {
        window.location.href = 'index.html';
      }
    }

    // Init Page on Load
    window.addEventListener('DOMContentLoaded', () => {
      // Load saved settings if any
      const savedWa = localStorage.getItem('UNAIR_SURUH_WA');
      if (savedWa) {
        document.getElementById('settingWaNumber').value = savedWa;
      }
      const savedTitle = localStorage.getItem('UNAIR_SURUH_TITLE');
      if (savedTitle) {
        document.getElementById('cmsHeroTitle').value = savedTitle;
      }
      const savedDesc = localStorage.getItem('UNAIR_SURUH_DESC');
      if (savedDesc) {
        document.getElementById('cmsHeroDesc').value = savedDesc;
      }

      renderAll();
    });
  </script>
</body>
</html>
`;

// Destination files
const targets = [
  'C:/Users/HYPE AMD/.gemini/antigravity/scratch/unair-suruh/admin.html',
  'C:/Users/HYPE AMD/Downloads/UNAIR SURUH — Web Admin.html'
];

targets.forEach(t => {
  fs.writeFileSync(t, adminHtmlContent, 'utf8');
  console.log('Successfully written admin page to:', t);
});

console.log('Admin Dashboard generated successfully!');
