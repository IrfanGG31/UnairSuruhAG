import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  ClipboardList,
  Users,
  Tag,
  FileEdit,
  DollarSign,
  Settings,
  Plus,
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  Filter,
  ShieldCheck,
  Truck,
  MessageCircle,
  Eye,
  Edit3,
  Trash2,
  RefreshCw,
  ArrowLeft,
  ChevronRight,
  TrendingUp,
  Download
} from 'lucide-react';

export default function AdminDashboard() {
  const {
    orders,
    workers,
    services,
    setServices,
    siteConfig,
    setSiteConfig,
    adminSendQuote,
    adminAssignWorker,
    adminUpdateOrderStatus,
    adminVerifyPayment,
    adminVerifyWorker,
    resetAllData,
    setCurrentView,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState('orders'); // 'overview', 'orders', 'workers', 'services', 'cms', 'ujrah'
  const [orderFilter, setOrderFilter] = useState('ALL');
  const [selectedOrderForEdit, setSelectedOrderForEdit] = useState(null);

  // Quote / Akad Edit Form State
  const [quotePrice, setQuotePrice] = useState(0);
  const [quoteScope, setQuoteScope] = useState('');
  const [selectedWorkerIdToAssign, setSelectedWorkerIdToAssign] = useState('');

  // CMS Edit State
  const [cmsHeroHeadline, setCmsHeroHeadline] = useState(siteConfig.tagline);
  const [cmsWaNumber, setCmsWaNumber] = useState(siteConfig.whatsappNumber);
  const [cmsPromoText, setCmsPromoText] = useState(siteConfig.promoBanner?.text || '');
  const [cmsPromoActive, setCmsPromoActive] = useState(siteConfig.promoBanner?.active || false);
  const [cmsBankNumber, setCmsBankNumber] = useState(siteConfig.bankTransferInfo?.accountNumber || '');

  // Calculate Metrics
  const totalOrders = orders.length;
  const waitingQuoteCount = orders.filter((o) => o.status === 'MENUNGGU_QUOTE').length;
  const inProgressCount = orders.filter((o) => o.status === 'DIKERJAKAN' || o.status === 'WORKER_DITUGASKAN').length;
  const completedCount = orders.filter((o) => o.status === 'SELESAI').length;

  const totalTurnover = orders.reduce((sum, o) => sum + (o.finalPrice || 0), 0);
  const totalWorkerPayouts = orders.reduce((sum, o) => sum + (o.workerCut || 0), 0);
  const totalPlatformMargin = totalTurnover - totalWorkerPayouts;

  const activeWorkerCount = workers.filter((w) => w.status === 'Aktif').length;
  const pendingWorkerCount = workers.filter((w) => w.status === 'Menunggu Verifikasi').length;

  // Filtered Orders
  const filteredOrders = orders.filter((o) => {
    if (orderFilter === 'ALL') return true;
    if (orderFilter === 'WAITING_QUOTE') return o.status === 'MENUNGGU_QUOTE';
    if (orderFilter === 'QUOTE_SENT') return o.status === 'QUOTE_DIKIRIM';
    if (orderFilter === 'IN_PROGRESS') return o.status === 'DIKERJAKAN' || o.status === 'WORKER_DITUGASKAN' || o.status === 'AKAD_DISETUJUI';
    if (orderFilter === 'COMPLETED') return o.status === 'SELESAI';
    return true;
  });

  const handleOpenOrderDrawer = (order) => {
    setSelectedOrderForEdit(order);
    setQuotePrice(order.finalPrice || order.estimatedPrice || 0);
    setQuoteScope(
      order.akadDetails?.scopeOfWork ||
        `Pengerjaan layanan ${order.serviceName} (${order.subServiceName}) dari ${order.pickupLocation} ke ${order.deliveryLocation || 'lokasi pengerjaan'}.`
    );
    setSelectedWorkerIdToAssign(order.assignedWorker?.id || '');
  };

  const handleSaveQuoteAndAkad = () => {
    if (!selectedOrderForEdit) return;
    adminSendQuote(selectedOrderForEdit.id, {
      finalPrice: Number(quotePrice),
      scopeOfWork: quoteScope,
      paymentScheme: 'Transfer QRIS / DP 50%'
    });
    // refresh current drawer
    setSelectedOrderForEdit({
      ...selectedOrderForEdit,
      finalPrice: Number(quotePrice),
      workerCut: Math.round(Number(quotePrice) * 0.8),
      platformCut: Number(quotePrice) - Math.round(Number(quotePrice) * 0.8),
      status: 'QUOTE_DIKIRIM'
    });
  };

  const handleAssignWorkerAction = () => {
    if (!selectedOrderForEdit || !selectedWorkerIdToAssign) return;
    adminAssignWorker(selectedOrderForEdit.id, selectedWorkerIdToAssign);
    const assignedW = workers.find((w) => w.id === selectedWorkerIdToAssign);
    setSelectedOrderForEdit({
      ...selectedOrderForEdit,
      assignedWorker: assignedW,
      status: selectedOrderForEdit.akadDetails?.isAgreed ? 'DIKERJAKAN' : 'WORKER_DITUGASKAN'
    });
  };

  const handleSaveCmsChanges = (e) => {
    e.preventDefault();
    setSiteConfig({
      ...siteConfig,
      tagline: cmsHeroHeadline,
      whatsappNumber: cmsWaNumber,
      promoBanner: {
        ...siteConfig.promoBanner,
        active: cmsPromoActive,
        text: cmsPromoText
      },
      bankTransferInfo: {
        ...siteConfig.bankTransferInfo,
        accountNumber: cmsBankNumber
      }
    });
    showToast('Perubahan Konten Laman Website berhasil disimpan!', 'success');
  };

  // Suitable workers matching gender if private space
  const getEligibleWorkersForOrder = (order) => {
    return workers.filter((w) => {
      if (w.status !== 'Aktif') return false;
      if (order?.isPrivateSpace && order?.clientGenderPreference !== 'Bebas') {
        return w.gender === order.clientGenderPreference;
      }
      return true;
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-16">
      {/* Admin Topbar */}
      <header className="bg-slate-900 text-white sticky top-0 z-40 border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentView('home')}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Kembali ke Website Publik"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <span className="font-black text-lg tracking-tight text-white">
                UNAIR<span className="text-[#007FEA]">SURUH</span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-wider bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded border border-blue-500/30">
                Web Admin Hub
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-300 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Peran: <strong>COO / Operations</strong></span>
            </div>
            <button
              onClick={resetAllData}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-rose-400 bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
              title="Reset data demo ke awal"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Demo</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-xs text-slate-500 font-medium">Total Order Masuk</span>
            <p className="text-2xl font-black text-slate-900 mt-1">{totalOrders}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-amber-200 bg-amber-50/40 shadow-xs">
            <span className="text-xs text-amber-800 font-medium">Menunggu Quote</span>
            <p className="text-2xl font-black text-amber-700 mt-1">{waitingQuoteCount}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-blue-200 bg-blue-50/40 shadow-xs">
            <span className="text-xs text-blue-800 font-medium">Sedang Berjalan</span>
            <p className="text-2xl font-black text-[#005BAC] mt-1">{inProgressCount}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 shadow-xs">
            <span className="text-xs text-emerald-800 font-medium">Order Tuntas</span>
            <p className="text-2xl font-black text-emerald-700 mt-1">{completedCount}</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-xs text-slate-500 font-medium">Worker Aktif</span>
            <p className="text-2xl font-black text-slate-900 mt-1">
              {activeWorkerCount}{' '}
              {pendingWorkerCount > 0 && (
                <span className="text-xs font-bold text-amber-600">({pendingWorkerCount} baru)</span>
              )}
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-xs text-slate-500 font-medium">Omzet Kotor</span>
            <p className="text-lg font-black text-slate-900 mt-1 truncate">
              Rp{(totalTurnover / 1000).toFixed(0)}K
            </p>
          </div>
        </div>

        {/* Tab Navigation Navigation */}
        <div className="bg-white rounded-xl border border-slate-200 p-1.5 flex items-center gap-1 overflow-x-auto shadow-xs">
          {[
            { id: 'orders', label: 'Manajemen Order & Akad', icon: ClipboardList, badge: waitingQuoteCount },
            { id: 'workers', label: 'Mitra Worker UNAIR', icon: Users, badge: pendingWorkerCount },
            { id: 'services', label: 'Layanan & CMS Harga', icon: Tag },
            { id: 'cms', label: 'Konten Laman (CMS)', icon: FileEdit },
            { id: 'ujrah', label: 'Rekap Ujrah & Syariah', icon: DollarSign }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all shrink-0 ${
                  isActive
                    ? 'bg-[#005BAC] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {Boolean(tab.badge && tab.badge > 0) && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                      isActive ? 'bg-amber-400 text-amber-950' : 'bg-rose-500 text-white'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ===================== TAB 1: ORDER MANAGEMENT ===================== */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {/* Filter pills */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200">
              <div className="flex flex-wrap items-center gap-1.5 text-xs font-bold">
                {[
                  { id: 'ALL', label: `Semua (${orders.length})` },
                  { id: 'WAITING_QUOTE', label: `Menunggu Quote (${waitingQuoteCount})` },
                  { id: 'QUOTE_SENT', label: 'Quote Terbit' },
                  { id: 'IN_PROGRESS', label: `Sedang Berjalan (${inProgressCount})` },
                  { id: 'COMPLETED', label: `Selesai (${completedCount})` }
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setOrderFilter(f.id)}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      orderFilter === f.id
                        ? 'bg-slate-900 text-white font-extrabold'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <div className="text-xs text-slate-500 font-medium">
                Klik order untuk terbitkan akad, assign worker & update status
              </div>
            </div>

            {/* Orders Table / Cards */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="divide-y divide-slate-100">
                {filteredOrders.map((ord) => {
                  const isWaitingQuote = ord.status === 'MENUNGGU_QUOTE';
                  const isPrivateSpace = ord.isPrivateSpace;

                  return (
                    <div
                      key={ord.id}
                      onClick={() => handleOpenOrderDrawer(ord)}
                      className="p-4 sm:p-5 hover:bg-blue-50/40 cursor-pointer transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-sm font-black text-[#005BAC]">
                            {ord.id}
                          </span>
                          <span className="text-xs font-bold bg-slate-100 text-slate-800 px-2.5 py-0.5 rounded-md">
                            {ord.serviceName}
                          </span>
                          {isPrivateSpace && (
                            <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md border border-emerald-300 flex items-center gap-1">
                              <ShieldCheck className="w-3 h-3 text-emerald-700" />
                              Ruang Privat ({ord.clientGenderPreference})
                            </span>
                          )}
                          <span
                            className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                              isWaitingQuote
                                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                : ord.status === 'SELESAI'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {ord.status.replace('_', ' ')}
                          </span>
                        </div>

                        <p className="text-xs text-slate-700 font-semibold truncate">
                          {ord.subServiceName} — Pemesan:{' '}
                          <span className="text-slate-900 font-bold">{ord.customerName}</span> ({ord.customerPhone})
                        </p>

                        <p className="text-[11px] text-slate-500 truncate">
                          Lokasi: {ord.pickupLocation} → {ord.deliveryLocation || '-'}
                        </p>
                      </div>

                      {/* Right Meta Info */}
                      <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                        <div className="text-left sm:text-right">
                          <span className="text-xs text-slate-500 font-medium block">Harga Final</span>
                          <span className="text-sm sm:text-base font-black text-slate-900">
                            Rp{ord.finalPrice?.toLocaleString('id-ID')}
                          </span>
                        </div>

                        <div className="text-right">
                          <span className="text-[11px] text-slate-500 block">
                            Worker: {ord.assignedWorker ? ord.assignedWorker.name : '— Belum di-assign —'}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {filteredOrders.length === 0 && (
                  <div className="p-8 text-center text-xs text-slate-500">
                    Tidak ada order dengan filter ini.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ===================== TAB 2: WORKER MITRA MANAGEMENT ===================== */}
        {activeTab === 'workers' && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                  Daftar Mitra Mahasiswa UNAIR (Supply Side)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Verifikasi NIM, kesesuaian gender, dan rating performa amanah.
                </p>
              </div>
              <span className="text-xs font-bold bg-blue-50 text-[#005BAC] px-3 py-1 rounded-lg">
                Total: {workers.length} Mahasiswa
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {workers.map((w) => {
                const isPending = w.status === 'Menunggu Verifikasi';

                return (
                  <div
                    key={w.id}
                    className="bg-white rounded-xl border border-slate-200 p-5 space-y-3 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-slate-900 text-sm">{w.name}</h4>
                            <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded">
                              {w.gender}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500">
                            NIM: {w.nim} • {w.faculty}
                          </p>
                        </div>
                        <span
                          className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${
                            w.status === 'Aktif'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {w.status}
                        </span>
                      </div>

                      <div className="text-xs text-slate-600 space-y-1 pt-1 border-t border-slate-100">
                        <p>
                          <strong>Armada:</strong> {w.vehicle}
                        </p>
                        <p>
                          <strong>Keahlian:</strong> {Array.isArray(w.skills) ? w.skills.join(', ') : w.skills}
                        </p>
                        <p>
                          <strong>Jadwal:</strong> {w.availableHours}
                        </p>
                        <p>
                          <strong>Job Selesai:</strong> {w.completedJobs} order • Rating: ⭐ {w.rating || 5.0}
                        </p>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      {isPending ? (
                        <>
                          <button
                            onClick={() => adminVerifyWorker(w.id, true)}
                            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2 rounded-lg transition-colors flex items-center justify-center gap-1"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Approve
                          </button>
                          <button
                            onClick={() => adminVerifyWorker(w.id, false)}
                            className="px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-2 rounded-lg transition-colors"
                          >
                            Tolak
                          </button>
                        </>
                      ) : (
                        <a
                          href={`https://wa.me/62${w.phone.replace(/^0/, '')}?text=${encodeURIComponent(
                            `Halo Mitra ${w.name}, dari Tim Operasional UNAIR SURUH...`
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full inline-flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs py-2 rounded-lg transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                          Chat WhatsApp Worker
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ===================== TAB 3: SERVICES & PRICING CMS ===================== */}
        {activeTab === 'services' && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                  Manajemen 8 Kategori Layanan & Tarif Mulai
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Ubah tarif dasar per kategori langsung tampil seketika di website publik.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((srv, idx) => (
                <div key={srv.id} className="bg-white rounded-xl border border-slate-200 p-5 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900 text-base">{srv.name}</h4>
                      <p className="text-xs text-slate-500">{srv.category}</p>
                    </div>
                    <span className="text-xs font-black text-[#005BAC]">
                      Rp{srv.startingPrice.toLocaleString('id-ID')}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {srv.description}
                  </p>

                  <div className="pt-2 border-t border-slate-100 space-y-2">
                    <label className="text-[11px] font-bold text-slate-700 block">
                      Ubah Tarif 'Mulai Dari' (Rp):
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        defaultValue={srv.startingPrice}
                        id={`price-${srv.id}`}
                        className="text-xs p-2 rounded-lg border border-slate-300 w-36 font-bold"
                      />
                      <button
                        onClick={() => {
                          const inputEl = document.getElementById(`price-${srv.id}`);
                          if (inputEl) {
                            const newP = Number(inputEl.value) || srv.startingPrice;
                            const updated = services.map((s) => (s.id === srv.id ? { ...s, startingPrice: newP } : s));
                            setServices(updated);
                            showToast(`Tarif ${srv.name} berhasil diperbarui menjadi Rp${newP.toLocaleString('id-ID')}!`, 'success');
                          }
                        }}
                        className="bg-[#005BAC] hover:bg-[#004785] text-white text-xs font-bold px-3 py-2 rounded-lg"
                      >
                        Simpan Harga
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===================== TAB 4: CMS KONTEN LAMAN ===================== */}
        {activeTab === 'cms' && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs max-w-3xl mx-auto space-y-6">
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">
                CMS Konten Laman Website
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Edit teks landing page, headline hero, kontak nomor WhatsApp, dan banner promo.
              </p>
            </div>

            <form onSubmit={handleSaveCmsChanges} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Tagline Utama Hero
                </label>
                <input
                  type="text"
                  value={cmsHeroHeadline}
                  onChange={(e) => setCmsHeroHeadline(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-slate-300 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Nomor WhatsApp Resmi Admin (Format: 628...)
                </label>
                <input
                  type="text"
                  value={cmsWaNumber}
                  onChange={(e) => setCmsWaNumber(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-slate-300 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Nomor Rekening Bank Syariah Indonesia (BSI) / Pembayaran
                </label>
                <input
                  type="text"
                  value={cmsBankNumber}
                  onChange={(e) => setCmsBankNumber(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-slate-300 font-medium"
                />
              </div>

              {/* Promo Banner Settings */}
              <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 space-y-3">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="promoActive"
                    checked={cmsPromoActive}
                    onChange={(e) => setCmsPromoActive(e.target.checked)}
                    className="w-4 h-4 text-[#005BAC] rounded-sm cursor-pointer"
                  />
                  <label htmlFor="promoActive" className="font-bold text-slate-900 cursor-pointer">
                    Aktifkan Banner Pengumuman / Promo Musiman di Bagian Atas
                  </label>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1 text-xs">
                    Teks Promo Banner
                  </label>
                  <input
                    type="text"
                    value={cmsPromoText}
                    onChange={(e) => setCmsPromoText(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-[#005BAC] hover:bg-[#004785] text-white font-black text-xs sm:text-sm py-3 px-6 rounded-xl shadow-md transition-colors"
              >
                Simpan & Perbarui Konten Website
              </button>
            </form>
          </div>
        )}

        {/* ===================== TAB 5: UJRAH & SYARIAH REPORT ===================== */}
        {activeTab === 'ujrah' && (
          <div className="space-y-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">
                  Laporan Transparansi Ujrah & Keuangan Syariah
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Pembagian hasil proporsional: 80% Hak Mitra Pekerja Mahasiswa vs 20% Fee Operasional Platform.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert('Fitur Ekspor CSV siap digunakan untuk pelaporan akuntansi startup!')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-lg border border-slate-200 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Ekspor Laporan CSV</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
                <span className="text-xs text-slate-500 font-semibold">Total Pendapatan Transaksi</span>
                <p className="text-2xl font-black text-slate-900 mt-1">
                  Rp{totalTurnover.toLocaleString('id-ID')}
                </p>
                <p className="text-[11px] text-slate-500 mt-1">Dari {orders.length} order tercatat</p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-emerald-200 bg-emerald-50/40 shadow-xs">
                <span className="text-xs text-emerald-800 font-semibold">Hak Ujrah Mitra Mahasiswa (80%)</span>
                <p className="text-2xl font-black text-emerald-700 mt-1">
                  Rp{totalWorkerPayouts.toLocaleString('id-ID')}
                </p>
                <p className="text-[11px] text-emerald-800 mt-1">Tanpa pemotongan sepihak</p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-blue-200 bg-blue-50/40 shadow-xs">
                <span className="text-xs text-blue-800 font-semibold">Margin Platform UNAIR SURUH (20%)</span>
                <p className="text-2xl font-black text-[#005BAC] mt-1">
                  Rp{totalPlatformMargin.toLocaleString('id-ID')}
                </p>
                <p className="text-[11px] text-blue-800 mt-1">Untuk operasional, server, & marketing</p>
              </div>
            </div>

            {/* Payout Records Table */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="p-4 bg-slate-50 border-b border-slate-200 font-bold text-xs text-slate-700 uppercase tracking-wider">
                Rincian Payout Per Order
              </div>
              <div className="divide-y divide-slate-100 text-xs">
                {orders.map((ord) => (
                  <div key={ord.id} className="p-3.5 flex items-center justify-between gap-4">
                    <div>
                      <span className="font-mono font-bold text-slate-900">{ord.id}</span>
                      <p className="text-slate-500">{ord.serviceName} • Worker: {ord.assignedWorker?.name || '-'}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-emerald-700">
                        Ujrah: Rp{ord.workerCut?.toLocaleString('id-ID')}
                      </span>
                      <p className="text-[10px] text-slate-500">
                        Total Bayar: Rp{ord.finalPrice?.toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ===================== ORDER DETAIL & EDIT DRAWER ===================== */}
      {selectedOrderForEdit && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-base font-black text-blue-400">
                    {selectedOrderForEdit.id}
                  </span>
                  <span className="text-xs bg-slate-800 px-2.5 py-0.5 rounded text-slate-300">
                    {selectedOrderForEdit.serviceName}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Pemesan: {selectedOrderForEdit.customerName} ({selectedOrderForEdit.customerPhone})
                </p>
              </div>

              <button
                onClick={() => setSelectedOrderForEdit(null)}
                className="p-1 rounded-full bg-slate-800 text-slate-300 hover:text-white"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm">
              {/* Status Update Switcher */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <label className="block font-bold text-slate-800 text-xs">
                  Ubah Status Order:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    'MENUNGGU_QUOTE',
                    'QUOTE_DIKIRIM',
                    'AKAD_DISETUJUI',
                    'WORKER_DITUGASKAN',
                    'DIKERJAKAN',
                    'SELESAI'
                  ].map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => {
                        adminUpdateOrderStatus(selectedOrderForEdit.id, st);
                        setSelectedOrderForEdit({ ...selectedOrderForEdit, status: st });
                      }}
                      className={`p-2 rounded-lg text-[11px] font-bold transition-all ${
                        selectedOrderForEdit.status === st
                          ? 'bg-[#005BAC] text-white shadow-xs'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {st.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* EDIT QUOTE & AKAD DIGITAL */}
              <div className="p-4 rounded-xl border-2 border-emerald-500 bg-emerald-50/40 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-black text-emerald-950 text-xs sm:text-sm flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    Penerbitan Quote & Digital Akad
                  </h4>
                  <span className="text-[11px] text-emerald-800 font-bold">
                    {selectedOrderForEdit.akadDetails?.isAgreed
                      ? '✓ Akad Disetujui Customer'
                      : 'Belum Disetujui Customer'}
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Harga Final yang Disepakati (Rp):
                  </label>
                  <input
                    type="number"
                    value={quotePrice}
                    onChange={(e) => setQuotePrice(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 font-black bg-white"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    Hak Ujrah Worker (80%): Rp{Math.round(quotePrice * 0.8).toLocaleString('id-ID')}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Rincian Ruang Lingkup Pekerjaan (Akad):
                  </label>
                  <textarea
                    rows={3}
                    value={quoteScope}
                    onChange={(e) => setQuoteScope(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleSaveQuoteAndAkad}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2 px-4 rounded-lg shadow-xs"
                >
                  Terbitkan Quote & Akad Digital
                </button>
              </div>

              {/* ASSIGN WORKER WITH GENDER FILTER ENFORCEMENT */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-blue-600" />
                    Penugasan Mitra Worker Mahasiswa
                  </h4>
                  {selectedOrderForEdit.isPrivateSpace && (
                    <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                      Wajib Gender: {selectedOrderForEdit.clientGenderPreference}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <select
                    value={selectedWorkerIdToAssign}
                    onChange={(e) => setSelectedWorkerIdToAssign(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white"
                  >
                    <option value="">— Pilih Worker Mahasiswa yang Cocok —</option>
                    {getEligibleWorkersForOrder(selectedOrderForEdit).map((w) => (
                      <option key={w.id} value={w.id}>
                        {w.name} ({w.gender} - {w.faculty} - {w.vehicle})
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    onClick={handleAssignWorkerAction}
                    disabled={!selectedWorkerIdToAssign}
                    className="bg-[#005BAC] hover:bg-[#004785] disabled:opacity-50 text-white font-bold text-xs py-2 px-4 rounded-lg shadow-xs"
                  >
                    Assign Worker ke Order Ini
                  </button>
                </div>
              </div>

              {/* PAYMENT VERIFICATION */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                    Status Pembayaran
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {selectedOrderForEdit.payment?.isVerified
                      ? 'Lunas & Sudah Diverifikasi'
                      : selectedOrderForEdit.payment
                      ? `Menunggu Verifikasi (${selectedOrderForEdit.payment.proofFileName || 'Bukti ada'})`
                      : 'Belum Ada Bukti Pembayaran'}
                  </p>
                </div>

                {!selectedOrderForEdit.payment?.isVerified && (
                  <button
                    type="button"
                    onClick={() => {
                      adminVerifyPayment(selectedOrderForEdit.id);
                      setSelectedOrderForEdit({
                        ...selectedOrderForEdit,
                        payment: {
                          ...(selectedOrderForEdit.payment || { method: 'QRIS', amount: selectedOrderForEdit.finalPrice }),
                          isVerified: true
                        }
                      });
                    }}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2 px-3.5 rounded-lg"
                  >
                    Verifikasi Lunas
                  </button>
                )}
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div className="p-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between gap-2">
              <a
                href={`https://wa.me/62${selectedOrderForEdit.customerPhone.replace(/^0/, '')}?text=${encodeURIComponent(
                  `Halo ${selectedOrderForEdit.customerName}, update pesanan ${selectedOrderForEdit.id} UNAIR SURUH...`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 px-3.5 py-2 rounded-lg transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                Chat Customer WA
              </a>

              <button
                type="button"
                onClick={() => setSelectedOrderForEdit(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
