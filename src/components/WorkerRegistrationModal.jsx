import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  UserPlus,
  ShieldCheck,
  CheckCircle2,
  GraduationCap,
  Truck,
  Clock,
  MessageCircle,
  Sparkles
} from 'lucide-react';

export default function WorkerRegistrationModal() {
  const {
    isWorkerRegisterOpen,
    setIsWorkerRegisterOpen,
    registerWorker,
    getWhatsAppWorkerUrl
  } = useApp();

  const [name, setName] = useState('');
  const [nim, setNim] = useState('');
  const [faculty, setFaculty] = useState('Fakultas Sains & Teknologi (FST)');
  const [gender, setGender] = useState('Pria');
  const [phone, setPhone] = useState('');
  const [vehicle, setVehicle] = useState('Motor Pribadi & SIM C');
  const [selectedSkills, setSelectedSkills] = useState(['Pindahan & Angkut Barang', 'Antar Jemput']);
  const [availableHours, setAvailableHours] = useState('Fleksibel di luar jam kuliah');
  const [agreedCodeOfConduct, setAgreedCodeOfConduct] = useState(true);
  const [registeredResult, setRegisteredResult] = useState(null);

  if (!isWorkerRegisterOpen) return null;

  const skillOptions = [
    'Pindahan & Angkut Barang',
    'Antar Jemput Stasiun / Bandara',
    'Perakitan Meja / Lemari / Teknis',
    'Administrasi Kampus & Pengambilan ELPT',
    'Bantuan Event & Loading Panggung Ormawa',
    'Tutor Les Privat Mata Kuliah',
    'Fotografi / Videografi Acara',
    'Titip Beli & Urusan Harian'
  ];

  const toggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !nim.trim()) {
      alert('Mohon lengkapi Nama, NIM, dan Nomor WhatsApp Anda.');
      return;
    }
    if (!agreedCodeOfConduct) {
      alert('Mohon setujui komitmen kode etik amanah.');
      return;
    }

    const newWorker = registerWorker({
      name,
      nim,
      faculty,
      gender,
      phone,
      vehicle,
      skills: selectedSkills,
      availableHours
    });

    setRegisteredResult(newWorker);
  };

  const handleClose = () => {
    setIsWorkerRegisterOpen(false);
    setRegisteredResult(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-700 text-white p-6 relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-black uppercase tracking-wider bg-emerald-950/60 text-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Pemberdayaan Ekonomi Mahasiswa
            </span>
          </div>
          <h3 className="text-2xl font-black">Daftar Jadi Mitra Worker</h3>
          <p className="text-xs sm:text-sm text-emerald-100 mt-1">
            Dapatkan penghasilan fleksibel di sela jadwal kuliah dengan pembagian upah adil & transparan (~80%).
          </p>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[72vh] overflow-y-auto">
          {registeredResult ? (
            <div className="text-center py-6 space-y-5 animate-in zoom-in-95">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Pendaftaran Diterima!
                </span>
                <h4 className="text-2xl font-black text-slate-900 mt-1">
                  ID Calon Worker: <span className="text-emerald-700">{registeredResult.id}</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-md mx-auto">
                  Selamat bergabung <strong>{registeredResult.name}</strong>! Pendaftaran kamu sudah masuk ke antrean verifikasi Tim People (CHRO) UNAIR SURUH.
                </p>
              </div>

              {/* Next step prompt */}
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-left text-xs space-y-2">
                <p className="font-bold text-emerald-950">Langkah Terakhir:</p>
                <p className="text-emerald-900">
                  Klik tombol di bawah untuk mengirim konfirmasi dan melampirkan foto KTM UNAIR via WhatsApp ke Tim People kami agar akunmu segera diaktifkan.
                </p>
              </div>

              <a
                href={getWhatsAppWorkerUrl(registeredResult)}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm py-3.5 px-6 rounded-xl shadow-lg shadow-emerald-600/25 transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Kirim Verifikasi KTM ke WhatsApp Tim People</span>
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Basic Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Muhammad Farhan"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 outline-hidden font-medium"
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
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 outline-hidden font-medium"
                  />
                </div>
              </div>

              {/* Campus Credentials */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
                    Nomor Induk Mahasiswa (NIM) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: 042211533088"
                    value={nim}
                    onChange={(e) => setNim(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 outline-hidden font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Fakultas / Jurusan *
                  </label>
                  <input
                    type="text"
                    required
                    value={faculty}
                    onChange={(e) => setFaculty(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 outline-hidden font-medium"
                  />
                </div>
              </div>

              {/* Gender & Vehicle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Jenis Kelamin (Penting untuk Penugasan Privasi Kos) *
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 outline-hidden bg-white"
                  >
                    <option value="Pria">Pria (Ikhwan)</option>
                    <option value="Wanita">Wanita (Akhwat)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-emerald-600" />
                    Kendaraan yang Dimiliki
                  </label>
                  <select
                    value={vehicle}
                    onChange={(e) => setVehicle(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 outline-hidden bg-white"
                  >
                    <option value="Motor Pribadi & SIM C">Motor Pribadi & SIM C</option>
                    <option value="Tossa Roda Tiga">Tossa / Motor Roda Tiga</option>
                    <option value="Mobil Pick-Up & SIM A">Mobil Pick-Up & SIM A</option>
                    <option value="Mobil Penumpang / Avanza">Mobil Penumpang / Avanza</option>
                    <option value="Sepeda / Tanpa Kendaraan (Tenaga Angkut/Tutor)">
                      Sepeda / Tenaga Angkut Saja
                    </option>
                  </select>
                </div>
              </div>

              {/* Skills Multi-Select */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Keahlian & Minat Tugas (Bisa pilih lebih dari satu):
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {skillOptions.map((sk, idx) => (
                    <label
                      key={idx}
                      className={`flex items-center gap-2 p-2 rounded-xl border text-xs cursor-pointer transition-all ${
                        selectedSkills.includes(sk)
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedSkills.includes(sk)}
                        onChange={() => toggleSkill(sk)}
                        className="w-3.5 h-3.5 text-emerald-600 focus:ring-emerald-500 rounded-sm"
                      />
                      <span>{sk}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Available hours */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-600" />
                  Jadwal Waktu Luang yang Tersedia
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Senin-Rabu sore, Sabtu & Minggu seharian penuh"
                  value={availableHours}
                  onChange={(e) => setAvailableHours(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 outline-hidden font-medium"
                />
              </div>

              {/* Code of Ethics Agreement */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="workerConduct"
                    checked={agreedCodeOfConduct}
                    onChange={(e) => setAgreedCodeOfConduct(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded-sm focus:ring-emerald-500 mt-0.5 cursor-pointer"
                  />
                  <label htmlFor="workerConduct" className="text-xs text-slate-700 cursor-pointer">
                    <strong>Komitmen Amanah:</strong> Saya berjanji menjalankan setiap order dengan jujur, disiplin waktu, menjaga adab sopan santun terhadap customer, menghormati privasi ruang personal, serta mematuhi SOP muamalah UNAIR SURUH.
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm py-3 px-6 rounded-xl shadow-md transition-colors"
              >
                Kirim Pendaftaran Mitra Worker
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
