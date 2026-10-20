import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  CheckCircle2,
  Clock,
  ShieldCheck,
  FileCheck2,
  AlertCircle,
  Truck,
  UserCheck,
  Star,
  QrCode,
  Upload,
  MessageCircle,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function TrackOrderSection() {
  const {
    orders,
    trackingCode,
    setTrackingCode,
    approveAkad,
    submitPaymentProof,
    submitReview,
    siteConfig,
    setCurrentView
  } = useApp();

  const [inputCode, setInputCode] = useState(trackingCode || 'US-2610-001');
  const [selectedOrder, setSelectedOrder] = useState(() => {
    return orders.find((o) => o.id === (trackingCode || 'US-2610-001')) || orders[0];
  });

  const [uploadFileName, setUploadFileName] = useState('');
  const [reviewStars, setReviewStars] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  const handleSearch = (e) => {
    e?.preventDefault();
    const cleanCode = inputCode.trim().toUpperCase();
    const found = orders.find((o) => o.id.toUpperCase() === cleanCode);
    if (found) {
      setSelectedOrder(found);
    } else {
      alert(`Pesanan dengan kode "${cleanCode}" tidak ditemukan. Silakan cek kode order Anda.`);
    }
  };

  const handleQuickSelect = (ord) => {
    setInputCode(ord.id);
    setSelectedOrder(ord);
  };

  // Timeline Step calculation
  const getStepProgress = (status) => {
    switch (status) {
      case 'MENUNGGU_QUOTE':
        return 1;
      case 'QUOTE_DIKIRIM':
        return 2;
      case 'AKAD_DISETUJUI':
        return 3;
      case 'WORKER_DITUGASKAN':
        return 4;
      case 'DIKERJAKAN':
        return 5;
      case 'SELESAI':
        return 6;
      case 'DIBATALKAN':
        return 0;
      default:
        return 1;
    }
  };

  const currentStepNum = getStepProgress(selectedOrder?.status);

  const timelineSteps = [
    { num: 1, label: 'Order Masuk' },
    { num: 2, label: 'Quote Terbit' },
    { num: 3, label: 'Akad Disetujui' },
    { num: 4, label: 'Worker Siaga' },
    { num: 5, label: 'Dikerjakan' },
    { num: 6, label: 'Selesai' }
  ];

  return (
    <div className="py-12 sm:py-20 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-blue-100 text-[#005BAC] text-xs font-black px-3.5 py-1 rounded-full border border-blue-200">
            <Search className="w-3.5 h-3.5" />
            Portal Pelacakan Pesanan & Akad
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Lacak Status & <span className="text-[#005BAC]">Digital Akad</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Masukkan kode order Anda untuk memantau progres pengerjaan, menyetujui akad digital, menyelesaikan pembayaran, atau memberikan rating amanah.
          </p>
        </div>

        {/* Search Bar & Quick Order Chips */}
        <div className="bg-white p-5 rounded-2xl shadow-md border border-slate-200 space-y-4">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Masukkan Kode Order (Contoh: US-2610-001)"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                className="w-full pl-11 pr-4 py-3 text-sm font-bold text-slate-800 rounded-xl border border-slate-300 focus:border-[#005BAC] focus:ring-2 focus:ring-blue-100 outline-hidden uppercase tracking-wider"
              />
            </div>
            <button
              type="submit"
              className="bg-[#005BAC] hover:bg-[#004785] text-white font-black text-sm px-6 py-3 rounded-xl shadow-md transition-colors shrink-0"
            >
              Cari Order
            </button>
          </form>

          {/* Quick Select for Demo/Testing */}
          <div className="pt-2 border-t border-slate-100 flex items-center flex-wrap gap-2 text-xs">
            <span className="text-slate-500 font-semibold">Uji Coba Cepat:</span>
            {orders.slice(0, 4).map((ord) => (
              <button
                key={ord.id}
                type="button"
                onClick={() => handleQuickSelect(ord)}
                className={`px-2.5 py-1 rounded-lg border font-bold transition-all ${
                  selectedOrder?.id === ord.id
                    ? 'bg-blue-50 border-[#005BAC] text-[#005BAC]'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {ord.id} ({ord.serviceName.split(' ')[0]} - {ord.status})
              </button>
            ))}
          </div>
        </div>

        {/* ORDER DETAILS & TRACKING VIEW */}
        {selectedOrder && (
          <div className="space-y-6">
            {/* Main Order Card */}
            <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">
              {/* Card Header */}
              <div className="bg-gradient-to-r from-blue-900 to-[#005BAC] text-white p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-extrabold uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-md">
                      {selectedOrder.serviceName}
                    </span>
                    {selectedOrder.isPrivateSpace && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-emerald-500/30 text-emerald-200 px-2.5 py-0.5 rounded-md border border-emerald-400/40">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Ruang Privat (Gender Matched)
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl font-black">{selectedOrder.id}</h2>
                  <p className="text-xs text-blue-200 mt-0.5">
                    Dibuat pada: {selectedOrder.createdAt}
                  </p>
                </div>

                <div className="text-left sm:text-right bg-white/10 p-3 rounded-xl border border-white/10">
                  <span className="text-xs text-blue-200 block">Total Biaya Final</span>
                  <span className="text-2xl font-black text-amber-300">
                    Rp{selectedOrder.finalPrice?.toLocaleString('id-ID')}
                  </span>
                  <span className="text-[10px] text-blue-200 block">
                    (Ujrah Mitra: Rp{selectedOrder.workerCut?.toLocaleString('id-ID')})
                  </span>
                </div>
              </div>

              {/* Status Timeline */}
              <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-500">
                    Progres Pelaksanaan
                  </h3>
                  <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-blue-100 text-[#005BAC]">
                    Status: {selectedOrder.status.replace('_', ' ')}
                  </span>
                </div>

                <div className="relative">
                  {/* Timeline Bar */}
                  <div className="grid grid-cols-6 gap-1 relative z-10">
                    {timelineSteps.map((s) => (
                      <div key={s.num} className="text-center">
                        <div
                          className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center text-xs font-bold transition-all ${
                            currentStepNum >= s.num
                              ? 'bg-[#005BAC] text-white ring-4 ring-blue-100 shadow-sm'
                              : 'bg-slate-200 text-slate-500'
                          }`}
                        >
                          {currentStepNum > s.num ? (
                            <CheckCircle2 className="w-4 h-4" />
                          ) : (
                            s.num
                          )}
                        </div>
                        <p
                          className={`text-[10px] sm:text-xs font-bold mt-2 truncate ${
                            currentStepNum >= s.num ? 'text-slate-900' : 'text-slate-400'
                          }`}
                        >
                          {s.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Order Info Details Grid */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
                <div className="space-y-3">
                  <h4 className="font-extrabold text-slate-900 border-b border-slate-100 pb-2">
                    Detail Pemesanan
                  </h4>
                  <div className="space-y-2 text-slate-600">
                    <p>
                      <strong className="text-slate-800">Pemesan:</strong>{' '}
                      {selectedOrder.customerName} ({selectedOrder.customerPhone})
                    </p>
                    <p>
                      <strong className="text-slate-800">Sub-Layanan:</strong>{' '}
                      {selectedOrder.subServiceName}
                    </p>
                    <p>
                      <strong className="text-slate-800">Jadwal:</strong>{' '}
                      {selectedOrder.bookingDate} pukul {selectedOrder.bookingTime} WIB
                    </p>
                    <p>
                      <strong className="text-slate-800">Armada:</strong>{' '}
                      {selectedOrder.vehicleType || '-'}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-extrabold text-slate-900 border-b border-slate-100 pb-2">
                    Lokasi & Catatan Khusus
                  </h4>
                  <div className="space-y-2 text-slate-600">
                    <p>
                      <strong className="text-slate-800">Lokasi Jemput/Pengerjaan:</strong>{' '}
                      {selectedOrder.pickupLocation}
                    </p>
                    <p>
                      <strong className="text-slate-800">Tujuan/Antar:</strong>{' '}
                      {selectedOrder.deliveryLocation || '-'}
                    </p>
                    <p>
                      <strong className="text-slate-800">Catatan:</strong>{' '}
                      {selectedOrder.notes || 'Tidak ada catatan tambahan.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* DIGITAL AKAD CARD (CORE DIFFERENTIATOR) */}
            <div className="bg-white rounded-2xl shadow-md border-2 border-emerald-500 overflow-hidden">
              <div className="bg-emerald-600 text-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileCheck2 className="w-5 h-5 text-emerald-200" />
                  <h3 className="font-black text-sm sm:text-base">
                    Lembar Digital Akad (Persetujuan Bersama)
                  </h3>
                </div>
                {selectedOrder.akadDetails?.isAgreed ? (
                  <span className="text-[11px] font-bold bg-white text-emerald-800 px-3 py-1 rounded-full flex items-center gap-1 shadow-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Akad Sah Disetujui
                  </span>
                ) : (
                  <span className="text-[11px] font-bold bg-amber-400 text-amber-950 px-3 py-1 rounded-full flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    Menunggu Persetujuan Anda
                  </span>
                )}
              </div>

              <div className="p-6 space-y-4 text-xs sm:text-sm">
                <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                  <p className="font-bold text-emerald-950">
                    Rincian Ruang Lingkup Pekerjaan:
                  </p>
                  <p className="text-emerald-900 leading-relaxed">
                    {selectedOrder.akadDetails?.scopeOfWork ||
                      'Pengerjaan tugas sesuai deskripsi order dan SOP amanah UNAIR SURUH.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-slate-500 text-xs block">Harga Final Akad</span>
                    <span className="text-base font-black text-[#005BAC]">
                      Rp{selectedOrder.finalPrice?.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-slate-500 text-xs block">Hak Ujrah Pekerja</span>
                    <span className="text-base font-bold text-emerald-700">
                      Rp{selectedOrder.workerCut?.toLocaleString('id-ID')} (80%)
                    </span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-slate-500 text-xs block">Skema Pembayaran</span>
                    <span className="text-xs font-bold text-slate-800">
                      {selectedOrder.akadDetails?.paymentScheme || 'Lunas setelah pengerjaan'}
                    </span>
                  </div>
                </div>

                {/* Akad Actions */}
                {!selectedOrder.akadDetails?.isAgreed ? (
                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      type="button"
                      onClick={() => approveAkad(selectedOrder.id)}
                      className="w-full sm:w-auto flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm py-3 px-6 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="w-5 h-5 text-emerald-200" />
                      <span>Saya Menyetujui Akad Digital Ini</span>
                    </button>

                    <a
                      href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                        `Halo Admin @unair_suruh, saya ingin meminta penyesuaian rincian akad untuk Order ${selectedOrder.id}:`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs text-center transition-colors"
                    >
                      Minta Penyesuaian ke Admin
                    </a>
                  </div>
                ) : (
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-600 text-xs flex items-center justify-between">
                    <span>
                      Disetujui pada:{' '}
                      <strong className="text-slate-800">{selectedOrder.akadDetails?.agreedAt}</strong>
                    </span>
                    <span className="text-emerald-700 font-bold">
                      ✓ Berlaku mengikat kedua pihak
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* ASSIGNED WORKER CARD */}
            {selectedOrder.assignedWorker ? (
              <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-blue-100 text-[#005BAC] flex items-center justify-center font-black text-xl shrink-0">
                    {selectedOrder.assignedWorker.gender === 'Wanita' ? '🧕' : '🧑‍🎓'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-black text-lg text-slate-900">
                        {selectedOrder.assignedWorker.name}
                      </h4>
                      <span className="text-[10px] font-bold bg-blue-50 text-blue-800 px-2 py-0.5 rounded">
                        {selectedOrder.assignedWorker.gender}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium">
                      NIM: {selectedOrder.assignedWorker.nim} • {selectedOrder.assignedWorker.faculty}
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-xs">
                      <span className="flex items-center gap-1 font-bold text-amber-600">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        {selectedOrder.assignedWorker.rating} / 5.0
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-emerald-700 font-medium">
                        KTM Terverifikasi
                      </span>
                    </div>
                  </div>
                </div>

                <a
                  href={`https://wa.me/62${selectedOrder.assignedWorker.phone.replace(/^0/, '')}?text=${encodeURIComponent(
                    `Halo ${selectedOrder.assignedWorker.name}, saya pelanggan Order ${selectedOrder.id} UNAIR SURUH...`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-xs transition-colors shrink-0"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Hubungi Worker</span>
                </a>
              </div>
            ) : (
              <div className="bg-amber-50/70 rounded-2xl border border-amber-200 p-5 flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-amber-600 shrink-0" />
                <div className="text-xs text-amber-950">
                  <p className="font-bold">Mitra Mahasiswa Sedang Ditugaskan oleh Admin</p>
                  <p className="text-amber-800 mt-0.5">
                    Admin sedang mencocokkan worker terbaik (dan memastikan kesesuaian gender untuk ruang privat). Rincian worker akan muncul seketika setelah di-assign.
                  </p>
                </div>
              </div>
            )}

            {/* PAYMENT SECTION (QRIS & BANK TRANSFER) */}
            <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <QrCode className="w-5 h-5 text-[#005BAC]" />
                  <h3 className="font-black text-base text-slate-900">
                    Instruksi Pembayaran Digital
                  </h3>
                </div>
                {selectedOrder.payment?.isVerified ? (
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Pembayaran Lunas & Terverifikasi
                  </span>
                ) : selectedOrder.payment ? (
                  <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    Menunggu Verifikasi Admin
                  </span>
                ) : (
                  <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                    Belum Dibayar
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {/* QRIS Statis Box */}
                <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <img
                    src={siteConfig.qrisCodeUrl}
                    alt="QRIS Statis UNAIR SURUH"
                    className="w-32 h-32 rounded-lg shadow-sm border border-slate-200 bg-white p-1"
                  />
                  <div className="text-xs space-y-1 text-slate-600 text-center sm:text-left">
                    <p className="font-black text-slate-900 text-sm">QRIS UNAIR SURUH</p>
                    <p>Bisa scan dari GoPay, OVO, Dana, ShopeePay, BCA, Mandiri, BSI, dll.</p>
                    <p className="font-bold text-[#005BAC]">
                      Nominal: Rp{selectedOrder.finalPrice?.toLocaleString('id-ID')}
                    </p>
                  </div>
                </div>

                {/* Bank Transfer info */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                  <p className="font-bold text-slate-800">Transfer Bank Alternatif:</p>
                  <p className="text-slate-600">{siteConfig.bankTransferInfo.bank}</p>
                  <p className="font-mono text-base font-black text-slate-900 bg-white p-2 rounded-lg border border-slate-200 inline-block">
                    {siteConfig.bankTransferInfo.accountNumber}
                  </p>
                  <p className="text-slate-500">a.n {siteConfig.bankTransferInfo.accountName}</p>
                </div>
              </div>

              {/* Upload Payment Proof Simulation */}
              {!selectedOrder.payment?.isVerified && (
                <div className="pt-2 border-t border-slate-100">
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <input
                      type="text"
                      placeholder="Nama File Bukti Bayar / No Referensi Transfer"
                      value={uploadFileName}
                      onChange={(e) => setUploadFileName(e.target.value)}
                      className="w-full sm:w-auto flex-1 text-xs p-3 rounded-xl border border-slate-300 focus:border-[#005BAC] outline-hidden font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const nameToUse = uploadFileName.trim() || 'bukti_transfer_qris.jpg';
                        submitPaymentProof(selectedOrder.id, 'QRIS', nameToUse);
                        setUploadFileName('');
                      }}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#005BAC] hover:bg-[#004785] text-white font-bold text-xs py-3 px-5 rounded-xl shadow-xs transition-colors shrink-0"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Konfirmasi & Unggah Bukti Bayar</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* RATING & TESTIMONIAL FORM (IF STATUS IS COMPLETED) */}
            {selectedOrder.status === 'SELESAI' && (
              <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Star className="w-5 h-5 text-amber-500 fill-amber-400" />
                  <h3 className="font-black text-base text-slate-900">
                    Beri Penilaian Amanah untuk Mitra Worker
                  </h3>
                </div>

                {selectedOrder.review ? (
                  <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs space-y-1">
                    <p className="font-bold text-emerald-950">
                      Ulasan Anda Telah Dicatat:
                    </p>
                    <div className="flex items-center gap-1 text-amber-500">
                      {Array.from({ length: selectedOrder.review.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-emerald-900 italic">"{selectedOrder.review.comment}"</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-600">
                      Bagaimana kinerja dan sikap amanah mitra kami? Masukan Anda sangat berarti bagi pengembangan reputasi mahasiswa.
                    </p>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-700">Rating:</span>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setReviewStars(star)}
                            className="p-1 hover:scale-110 transition-transform"
                          >
                            <Star
                              className={`w-6 h-6 ${
                                reviewStars >= star
                                  ? 'text-amber-500 fill-amber-400'
                                  : 'text-slate-300'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <textarea
                      rows={3}
                      placeholder="Tuliskan ulasan jujur Anda..."
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:border-[#005BAC] outline-hidden"
                    />

                    <button
                      type="button"
                      onClick={() => {
                        if (!reviewComment.trim()) {
                          alert('Mohon tuliskan sepatah ulasan pengalaman Anda.');
                          return;
                        }
                        submitReview(selectedOrder.id, reviewStars, reviewComment);
                        setReviewComment('');
                      }}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 px-5 rounded-xl shadow-xs transition-colors"
                    >
                      Kirim Ulasan Amanah
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
