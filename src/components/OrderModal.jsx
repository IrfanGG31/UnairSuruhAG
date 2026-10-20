import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  MapPin,
  Calendar,
  Clock,
  Truck,
  MessageCircle,
  FileCheck,
  AlertCircle
} from 'lucide-react';

export default function OrderModal() {
  const {
    isOrderModalOpen,
    setIsOrderModalOpen,
    services,
    selectedService,
    setSelectedService,
    createOrder,
    getWhatsAppOrderUrl,
    setCurrentView,
    setTrackingCode
  } = useApp();

  const [step, setStep] = useState(1);
  const [createdOrderResult, setCreatedOrderResult] = useState(null);

  // Form Fields
  const [serviceId, setServiceId] = useState('move-care');
  const [subServiceName, setSubServiceName] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('10:00');
  const [vehicleType, setVehicleType] = useState('Tossa Roda Tiga');
  const [isPrivateSpace, setIsPrivateSpace] = useState(false);
  const [clientGenderPreference, setClientGenderPreference] = useState('Bebas');
  const [notes, setNotes] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [agreedTerms, setAgreedTerms] = useState(true);

  // Sync with selectedService if passed
  useEffect(() => {
    if (selectedService) {
      setServiceId(selectedService.id);
      if (selectedService.prefillSub) {
        setSubServiceName(selectedService.prefillSub);
      } else if (selectedService.subServices?.[0]) {
        setSubServiceName(selectedService.subServices[0].name);
      }
      if (selectedService.prefillVehicle) {
        setVehicleType(selectedService.prefillVehicle);
      }
      if (selectedService.genderSensitive) {
        setIsPrivateSpace(true);
      }
    } else {
      const defaultServ = services[1] || services[0];
      if (defaultServ) {
        setServiceId(defaultServ.id);
        setSubServiceName(defaultServ.subServices?.[0]?.name || defaultServ.name);
      }
    }

    // Set today's date as default
    const today = new Date().toISOString().split('T')[0];
    setBookingDate(today);
  }, [selectedService, services, isOrderModalOpen]);

  if (!isOrderModalOpen) return null;

  const currentService = services.find((s) => s.id === serviceId) || services[0];

  // Dynamic calculated estimated price
  const calculateEstimate = () => {
    let subPrice = currentService.startingPrice;
    const foundSub = currentService.subServices?.find((sub) => sub.name === subServiceName);
    if (foundSub) subPrice = foundSub.price;

    let extraVehicle = 0;
    if (vehicleType === 'Tossa Roda Tiga') extraVehicle = 15000;
    else if (vehicleType === 'Mobil Pick-Up') extraVehicle = 45000;

    return subPrice + (currentService.id === 'move-care' ? extraVehicle : 0);
  };

  const estimatedPrice = calculateEstimate();

  const handleNext = () => {
    if (step === 1) {
      if (!subServiceName && currentService.subServices?.[0]) {
        setSubServiceName(currentService.subServices[0].name);
      }
      setStep(2);
    } else if (step === 2) {
      if (!pickupLocation.trim()) {
        alert('Mohon isi alamat atau lokasi jemput/pengerjaan.');
        return;
      }
      setStep(3);
    }
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) {
      alert('Mohon isi nama dan nomor WhatsApp aktif Anda.');
      return;
    }
    if (!agreedTerms) {
      alert('Mohon centang persetujuan syarat & ketentuan.');
      return;
    }

    const orderPayload = {
      serviceId: currentService.id,
      serviceName: currentService.name,
      subServiceName: subServiceName || currentService.name,
      customerName,
      customerPhone,
      pickupLocation,
      deliveryLocation,
      bookingDate,
      bookingTime,
      isPrivateSpace,
      clientGenderPreference: isPrivateSpace ? clientGenderPreference : 'Bebas',
      vehicleType,
      notes,
      estimatedPrice
    };

    const newOrder = createOrder(orderPayload);
    setCreatedOrderResult(newOrder);
  };

  const handleClose = () => {
    setIsOrderModalOpen(false);
    setStep(1);
    setCreatedOrderResult(null);
    setSelectedService(null);
  };

  const handleGoToTracking = (orderId) => {
    setTrackingCode(orderId);
    handleClose();
    setCurrentView('track');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-900 via-[#005BAC] to-blue-800 text-white p-6 relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-black uppercase tracking-wider bg-[#F9A01B] text-slate-950 px-2.5 py-0.5 rounded-full">
              Pemesanan Cepat (Tanpa Login)
            </span>
            <span className="text-xs text-blue-200 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              SOP Syariah
            </span>
          </div>

          <h3 className="text-2xl font-black">Formulir Pesan Jasa</h3>
          <p className="text-xs sm:text-sm text-blue-100 mt-1">
            Isi detail singkat dalam 2 menit. Kami hitungkan estimasi pasti sebelum pengerjaan.
          </p>

          {/* Stepper Dots (Hidden on Success Screen) */}
          {!createdOrderResult && (
            <div className="flex items-center gap-2 mt-4">
              <div
                className={`h-1.5 flex-1 rounded-full transition-all ${
                  step >= 1 ? 'bg-[#F9A01B]' : 'bg-white/20'
                }`}
              />
              <div
                className={`h-1.5 flex-1 rounded-full transition-all ${
                  step >= 2 ? 'bg-[#F9A01B]' : 'bg-white/20'
                }`}
              />
              <div
                className={`h-1.5 flex-1 rounded-full transition-all ${
                  step >= 3 ? 'bg-[#F9A01B]' : 'bg-white/20'
                }`}
              />
            </div>
          )}
        </div>

        {/* Modal Content */}
        <div className="p-6 max-h-[72vh] overflow-y-auto">
          {/* SUCCESS SCREEN */}
          {createdOrderResult ? (
            <div className="text-center py-6 space-y-5 animate-in zoom-in-95">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Pesanan Berhasil Dicatat!
                </span>
                <h4 className="text-2xl font-black text-slate-900 mt-1">
                  Kode Order: <span className="text-[#005BAC]">{createdOrderResult.id}</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-md mx-auto">
                  Alhamdulillah! Pesanan Anda untuk layanan{' '}
                  <strong>{createdOrderResult.serviceName}</strong> sudah masuk ke sistem kami.
                </p>
              </div>

              {/* Order Info Card */}
              <div className="bg-slate-50 rounded-xl p-4 text-left border border-slate-200 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Pemesan:</span>
                  <span className="font-bold text-slate-800">{createdOrderResult.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Jadwal:</span>
                  <span className="font-bold text-slate-800">
                    {createdOrderResult.bookingDate} ({createdOrderResult.bookingTime} WIB)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Ruang Privat Kos:</span>
                  <span className="font-bold text-emerald-700">
                    {createdOrderResult.isPrivateSpace ? 'Ya (Gender Matching)' : 'Tidak'}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-200">
                  <span className="text-slate-700 font-bold">Estimasi Biaya:</span>
                  <span className="text-sm font-black text-[#005BAC]">
                    Rp{createdOrderResult.estimatedPrice.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <a
                  href={getWhatsAppOrderUrl(createdOrderResult)}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm py-3.5 px-6 rounded-xl shadow-lg shadow-emerald-600/25 transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Kirim Ringkasan ke WhatsApp Admin Sekarang</span>
                </a>

                <button
                  onClick={() => handleGoToTracking(createdOrderResult.id)}
                  className="w-full inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs py-3 px-4 rounded-xl transition-colors border border-slate-200"
                >
                  <FileCheck className="w-4 h-4 text-blue-600" />
                  <span>Buka Halaman Lacak Status & Akad Digital</span>
                </button>
              </div>
            </div>
          ) : (
            /* MULTI-STEP WIZARD */
            <div>
              {/* STEP 1: SERVICE & SUBSERVICE */}
              {step === 1 && (
                <div className="space-y-5 animate-in fade-in">
                  <div className="border-b border-slate-100 pb-3">
                    <span className="text-xs font-bold text-[#005BAC] uppercase tracking-wider">
                      Langkah 1 dari 3
                    </span>
                    <h4 className="text-lg font-black text-slate-900 mt-0.5">
                      Pilih Kategori & Sub-Layanan
                    </h4>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">
                      Kategori Layanan
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {services.map((srv) => (
                        <button
                          key={srv.id}
                          type="button"
                          onClick={() => {
                            setServiceId(srv.id);
                            if (srv.subServices?.[0]) {
                              setSubServiceName(srv.subServices[0].name);
                            }
                            if (srv.genderSensitive) {
                              setIsPrivateSpace(true);
                            }
                          }}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            serviceId === srv.id
                              ? 'border-[#005BAC] bg-blue-50 text-[#005BAC] font-black shadow-xs ring-1 ring-blue-500'
                              : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <p className="text-xs font-bold">{srv.name}</p>
                          <p className="text-[10px] text-slate-500 mt-0.5">{srv.priceLabel}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {currentService.subServices && (
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">
                        Pilih Spesifikasi Sub-Layanan
                      </label>
                      <div className="space-y-2">
                        {currentService.subServices.map((sub, idx) => (
                          <label
                            key={idx}
                            className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                              subServiceName === sub.name
                                ? 'border-[#005BAC] bg-blue-50/60 font-bold'
                                : 'border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <input
                                type="radio"
                                name="subService"
                                checked={subServiceName === sub.name}
                                onChange={() => setSubServiceName(sub.name)}
                                className="w-4 h-4 text-[#005BAC] focus:ring-blue-500"
                              />
                              <span className="text-xs text-slate-800">{sub.name}</span>
                            </div>
                            <span className="text-xs font-black text-[#005BAC]">
                              Rp{sub.price.toLocaleString('id-ID')}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Vehicle selector if applicable */}
                  {currentService.vehicles && currentService.vehicles.length > 1 && (
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                        <Truck className="w-4 h-4 text-blue-600" />
                        Pilihan Armada Kendaraan
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {currentService.vehicles.map((v, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setVehicleType(v)}
                            className={`p-2 rounded-xl border text-xs font-bold transition-all ${
                              vehicleType === v
                                ? 'border-amber-600 bg-amber-50 text-amber-950 font-black'
                                : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                            }`}
                          >
                            {v}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* STEP 2: LOCATION, DATE & GENDER PRIVACY */}
              {step === 2 && (
                <div className="space-y-5 animate-in fade-in">
                  <div className="border-b border-slate-100 pb-3">
                    <span className="text-xs font-bold text-[#005BAC] uppercase tracking-wider">
                      Langkah 2 dari 3
                    </span>
                    <h4 className="text-lg font-black text-slate-900 mt-0.5">
                      Lokasi, Jadwal & Ketentuan Privasi
                    </h4>
                  </div>

                  {/* Locations */}
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-blue-600" />
                        Alamat Jemput / Lokasi Pengerjaan *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Kos Putri Melati, Jl. Srikana No. 12, Gubeng, Surabaya"
                        value={pickupLocation}
                        onChange={(e) => setPickupLocation(e.target.value)}
                        className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:border-[#005BAC] focus:ring-2 focus:ring-blue-100 outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                        Alamat Tujuan / Pengantaran (Opsional jika berlaku)
                      </label>
                      <input
                        type="text"
                        placeholder="Contoh: Kampus B UNAIR / Stasiun Gubeng / Kos Baru"
                        value={deliveryLocation}
                        onChange={(e) => setDeliveryLocation(e.target.value)}
                        className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:border-[#005BAC] focus:ring-2 focus:ring-blue-100 outline-hidden"
                      />
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-blue-600" />
                        Tanggal Pengerjaan *
                      </label>
                      <input
                        type="date"
                        required
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:border-[#005BAC] outline-hidden bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-blue-600" />
                        Estimasi Jam Mulai *
                      </label>
                      <input
                        type="time"
                        required
                        value={bookingTime}
                        onChange={(e) => setBookingTime(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:border-[#005BAC] outline-hidden bg-white"
                      />
                    </div>
                  </div>

                  {/* SYARIAH PRIVACY: RUANG PRIVAT & GENDER MATCHING */}
                  <div className="p-4 rounded-xl border border-emerald-300 bg-emerald-50/80 space-y-3">
                    <div className="flex items-start gap-2.5">
                      <input
                        type="checkbox"
                        id="privateSpaceCheck"
                        checked={isPrivateSpace}
                        onChange={(e) => setIsPrivateSpace(e.target.checked)}
                        className="w-4 h-4 text-emerald-600 rounded-sm focus:ring-emerald-500 border-slate-300 mt-0.5 cursor-pointer"
                      />
                      <label htmlFor="privateSpaceCheck" className="text-xs text-emerald-950 font-bold cursor-pointer">
                        Pekerjaan ini dilakukan di ruang privat (misal: Masuk Kamar Kos Putri / Tempat Tinggal)
                      </label>
                    </div>

                    {isPrivateSpace && (
                      <div className="pl-6 pt-2 border-t border-emerald-200/80 animate-in fade-in space-y-2">
                        <p className="text-[11px] text-emerald-900 font-medium">
                          Sesuai SOP Syariah kami, sistem akan memprioritaskan penugasan mitra pekerja dengan gender yang sesuai demi kenyamanan dan adab privasi:
                        </p>
                        <div className="flex items-center gap-4 text-xs font-semibold text-emerald-900">
                          <label className="flex items-center gap-1.5 cursor-pointer">
                            <input
                              type="radio"
                              name="genderPref"
                              value="Wanita"
                              checked={clientGenderPreference === 'Wanita'}
                              onChange={() => setClientGenderPreference('Wanita')}
                              className="text-emerald-600 focus:ring-emerald-500"
                            />
                            <span>Wajib Pekerja Wanita (Kos Putri)</span>
                          </label>
                          <label className="flex items-center gap-1.5 cursor-pointer">
                            <input
                              type="radio"
                              name="genderPref"
                              value="Pria"
                              checked={clientGenderPreference === 'Pria'}
                              onChange={() => setClientGenderPreference('Pria')}
                              className="text-emerald-600 focus:ring-emerald-500"
                            />
                            <span>Wajib Pekerja Pria</span>
                          </label>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Catatan Tambahan untuk Tim
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Contoh: Kamar di lantai 2 tanpa lift, barang ada 3 kardus dan 1 koper..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:border-[#005BAC] outline-hidden"
                    />
                  </div>
                </div>
              )}

              {/* STEP 3: CONTACT & CONFIRMATION */}
              {step === 3 && (
                <div className="space-y-5 animate-in fade-in">
                  <div className="border-b border-slate-100 pb-3">
                    <span className="text-xs font-bold text-[#005BAC] uppercase tracking-wider">
                      Langkah 3 dari 3
                    </span>
                    <h4 className="text-lg font-black text-slate-900 mt-0.5">
                      Identitas Pemesan & Konfirmasi
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Nama Lengkap / Panggilan *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Contoh: Dinda Aisyah"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:border-[#005BAC] outline-hidden font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Nomor WhatsApp Aktif *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="Contoh: 081234567890"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:border-[#005BAC] outline-hidden font-medium"
                      />
                    </div>
                  </div>

                  {/* Order Summary Box */}
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Layanan:</span>
                      <span className="font-bold text-slate-900">
                        {currentService.name} ({subServiceName})
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Jadwal:</span>
                      <span className="font-bold text-slate-800">
                        {bookingDate} pukul {bookingTime} WIB
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Lokasi:</span>
                      <span className="font-bold text-slate-800 truncate max-w-[200px]">
                        {pickupLocation}
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-slate-200 items-baseline">
                      <span className="text-slate-700 font-bold">Estimasi Biaya Dasar:</span>
                      <span className="text-base font-black text-[#005BAC]">
                        Rp{estimatedPrice.toLocaleString('id-ID')}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 italic">
                      *Harga final akan dituangkan dalam Digital Akad sebelum pengerjaan dimulai. Tanpa biaya siluman!
                    </p>
                  </div>

                  {/* Agreement Checkbox */}
                  <div className="flex items-start gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="agreedTerms"
                      checked={agreedTerms}
                      onChange={(e) => setAgreedTerms(e.target.checked)}
                      className="w-4 h-4 text-[#005BAC] rounded-sm focus:ring-blue-500 border-slate-300 mt-0.5 cursor-pointer"
                    />
                    <label htmlFor="agreedTerms" className="text-xs text-slate-600 cursor-pointer">
                      Saya menyetujui prinsip muamalah syariah UNAIR SURUH: saling amanah, akad disepakati di awal, dan pembayaran dilakukan sesuai ketentuan.
                    </label>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        {!createdOrderResult && (
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Kembali
              </button>
            ) : (
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
              >
                Batal
              </button>
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 bg-[#005BAC] hover:bg-[#004785] text-white text-xs font-extrabold px-5 py-2.5 rounded-xl shadow-md transition-colors"
              >
                <span>Lanjut</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmitOrder}
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black px-6 py-2.5 rounded-xl shadow-md transition-colors"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Kirim Pesanan Sekarang</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
