import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Calculator,
  Truck,
  Users,
  MapPin,
  ShieldCheck,
  ArrowRight,
  Info
} from 'lucide-react';

export default function PriceEstimatorModal() {
  const {
    isEstimatorOpen,
    setIsEstimatorOpen,
    services,
    setSelectedService,
    setIsOrderModalOpen
  } = useApp();

  const [selectedServiceId, setSelectedServiceId] = useState(services[1]?.id || 'move-care');
  const [selectedSubIndex, setSelectedSubIndex] = useState(0);
  const [vehicle, setVehicle] = useState('Tossa Roda Tiga');
  const [extraHelpers, setExtraHelpers] = useState(1);
  const [distanceRange, setDistanceRange] = useState('NEAR'); // NEAR (<3km), MID (3-8km), FAR (8-16km), EXTRA (>16km)
  const [isNightShift, setIsNightShift] = useState(false);

  if (!isEstimatorOpen) return null;

  const currentService = services.find((s) => s.id === selectedServiceId) || services[0];
  const currentSub = currentService.subServices?.[selectedSubIndex] || {
    name: currentService.name,
    price: currentService.startingPrice
  };

  // Calculation Formula
  let basePrice = currentSub.price;

  // Vehicle surcharge (only if service uses vehicles)
  let vehicleFee = 0;
  if (vehicle === 'Tossa Roda Tiga') vehicleFee = 25000;
  else if (vehicle === 'Mobil Pick-Up') vehicleFee = 55000;
  else if (vehicle === 'Mobil Pribadi') vehicleFee = 35000;

  // Helper surcharge
  const helperFee = extraHelpers * 35000;

  // Distance surcharge
  let distanceFee = 0;
  if (distanceRange === 'MID') distanceFee = 15000;
  else if (distanceRange === 'FAR') distanceFee = 30000;
  else if (distanceRange === 'EXTRA') distanceFee = 50000;

  // Night shift surcharge (>21.00 WIB)
  const nightFee = isNightShift ? 20000 : 0;

  const totalEstimate = basePrice + (currentService.id === 'move-care' ? vehicleFee : 0) + helperFee + distanceFee + nightFee;
  const workerCut = Math.round(totalEstimate * 0.8);
  const platformCut = totalEstimate - workerCut;

  const handleProceedToOrder = () => {
    setSelectedService({
      ...currentService,
      prefillSub: currentSub.name,
      prefillEstimate: totalEstimate,
      prefillVehicle: vehicle,
      prefillHelpers: extraHelpers
    });
    setIsEstimatorOpen(false);
    setIsOrderModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white p-6 relative">
          <button
            onClick={() => setIsEstimatorOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 mb-1.5">
            <Calculator className="w-5 h-5 text-amber-200" />
            <span className="text-xs font-black uppercase tracking-wider bg-amber-800/60 px-2.5 py-0.5 rounded-full">
              Kalkulator Tarif Transparan
            </span>
          </div>
          <h3 className="text-2xl font-black">Hitung Estimasi Biaya Jasa</h3>
          <p className="text-xs sm:text-sm text-amber-100 mt-1">
            Dapatkan kepastian tarif sebelum memesan. Tanpa biaya tersembunyi atau mark-up sepihak!
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 max-h-[72vh] overflow-y-auto">
          {/* Step 1: Select Service */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
              1. Pilih Kategori Layanan
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {services.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    setSelectedServiceId(s.id);
                    setSelectedSubIndex(0);
                  }}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    selectedServiceId === s.id
                      ? 'border-[#005BAC] bg-blue-50/80 text-[#005BAC] font-bold shadow-xs'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <p className="text-xs font-bold leading-tight">{s.name}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">Mulai Rp{s.startingPrice / 1000}K</p>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Select Sub-service */}
          {currentService.subServices && (
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
                2. Spesifikasi Sub-Layanan
              </label>
              <select
                value={selectedSubIndex}
                onChange={(e) => setSelectedSubIndex(Number(e.target.value))}
                className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 bg-slate-50 font-medium focus:bg-white focus:border-[#005BAC] focus:ring-2 focus:ring-blue-100 outline-hidden"
              >
                {currentService.subServices.map((sub, idx) => (
                  <option key={idx} value={idx}>
                    {sub.name} — Rp{sub.price.toLocaleString('id-ID')}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Step 3: Vehicle Type (relevant for Move & Go Care) */}
          {currentService.vehicles && currentService.vehicles.length > 1 && (
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
                3. Pilihan Armada Kendaraan
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {currentService.vehicles.map((v, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setVehicle(v)}
                    className={`p-2 rounded-xl border text-center text-xs font-bold transition-all ${
                      vehicle === v
                        ? 'border-amber-600 bg-amber-50 text-amber-900 shadow-xs'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Distance & Additional Helpers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                Jarak Tempuh / Wilayah
              </label>
              <select
                value={distanceRange}
                onChange={(e) => setDistanceRange(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white font-medium focus:border-blue-500 outline-hidden"
              >
                <option value="NEAR">Sekitar Kampus UNAIR (&lt; 3 KM) — Rp0</option>
                <option value="MID">Surabaya Tengah / Gubeng (3 - 8 KM) — +Rp15.000</option>
                <option value="FAR">Surabaya Barat / Rungkut (8 - 16 KM) — +Rp30.000</option>
                <option value="EXTRA">Luar Kota / Waru / Bandara (&gt; 16 KM) — +Rp50.000</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-blue-600" />
                Tenaga Angkut Tambahan
              </label>
              <select
                value={extraHelpers}
                onChange={(e) => setExtraHelpers(Number(e.target.value))}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white font-medium focus:border-blue-500 outline-hidden"
              >
                <option value={0}>Tanpa Tenaga Tambahan (Driver Saja)</option>
                <option value={1}>+ 1 Orang Tenaga Angkut (+Rp35.000)</option>
                <option value={2}>+ 2 Orang Tenaga Angkut (+Rp70.000)</option>
              </select>
            </div>
          </div>

          {/* Night Service Checkbox */}
          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="nightCheck"
              checked={isNightShift}
              onChange={(e) => setIsNightShift(e.target.checked)}
              className="w-4 h-4 text-amber-600 rounded-sm focus:ring-amber-500 border-slate-300 cursor-pointer"
            />
            <label htmlFor="nightCheck" className="text-xs text-slate-700 font-medium cursor-pointer">
              Pengerjaan malam hari (di atas jam 21.00 WIB) (+Rp20.000 uang lelah)
            </label>
          </div>

          {/* Transparent Muamalah Breakdown Box */}
          <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-bold text-slate-400">Rincian Estimasi Biaya</span>
              <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Prinsip Syariah & Adil
              </span>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Biaya Dasar Sub-Layanan</span>
                <span>Rp{basePrice.toLocaleString('id-ID')}</span>
              </div>
              {currentService.id === 'move-care' && vehicleFee > 0 && (
                <div className="flex justify-between text-slate-300">
                  <span>Armada ({vehicle})</span>
                  <span>+Rp{vehicleFee.toLocaleString('id-ID')}</span>
                </div>
              )}
              {helperFee > 0 && (
                <div className="flex justify-between text-slate-300">
                  <span>Tenaga Bantu ({extraHelpers} Orang)</span>
                  <span>+Rp{helperFee.toLocaleString('id-ID')}</span>
                </div>
              )}
              {distanceFee > 0 && (
                <div className="flex justify-between text-slate-300">
                  <span>Penyesuaian Jarak Tempuh</span>
                  <span>+Rp{distanceFee.toLocaleString('id-ID')}</span>
                </div>
              )}
              {nightFee > 0 && (
                <div className="flex justify-between text-slate-300">
                  <span>Tarif Malam / Emergency</span>
                  <span>+Rp{nightFee.toLocaleString('id-ID')}</span>
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-baseline justify-between">
              <div>
                <span className="text-xs text-slate-400 block">Total Estimasi Transparan</span>
                <span className="text-2xl font-black text-amber-400">
                  Rp{totalEstimate.toLocaleString('id-ID')}
                </span>
              </div>

              {/* Ujrah Worker Transparency Preview */}
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block">Porsi Ujrah Pekerja (80%)</span>
                <span className="text-xs font-bold text-emerald-400">
                  Rp{workerCut.toLocaleString('id-ID')}
                </span>
                <span className="text-[9px] text-slate-500 block">
                  (Fee operasional 20%: Rp{platformCut.toLocaleString('id-ID')})
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            onClick={() => setIsEstimatorOpen(false)}
            className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-800 transition-colors"
          >
            Tutup
          </button>
          <button
            onClick={handleProceedToOrder}
            className="inline-flex items-center gap-2 bg-[#005BAC] hover:bg-[#004785] text-white text-xs font-extrabold px-5 py-2.5 rounded-xl shadow-md transition-colors"
          >
            <span>Lanjut Pesan dengan Estimasi Ini</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
