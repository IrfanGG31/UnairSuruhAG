export const initialSiteConfig = {
  brandName: "UNAIR SURUH",
  tagline: "Bisa Apa Aja! Jasa On-Demand Mahasiswa & Civitas Kampus Surabaya",
  subTagline: "Platform solusi praktis untuk urusan harian, pindahan, antar-jemput, hingga administrasi kampus. Amanah, transparan, dan berlandaskan prinsip muamalah Islam.",
  whatsappNumber: "6287767766011",
  whatsappDisplay: "+62 877-6776-6011",
  tiktokHandle: "@unair_suruh",
  tiktokUrl: "https://www.tiktok.com/@unair_suruh",
  instagramHandle: "@unair_suruh",
  instagramUrl: "https://www.instagram.com/unair_suruh/",
  locationName: "Area Kampus UNAIR (Kampus A, B, C) & Seluruh Surabaya Raya",
  officeAddress: "Optik Airlangga, Jl. Dharmawangsa No. 35, Surabaya, Jawa Timur",
  hours: "06.00 - 23.00 WIB (Siaga Setiap Hari)",
  qrisCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=00020101021126570011ID.UNAIRSURUH.WWW011893600999000000010215000000000000005204581253033605802ID5911UNAIR_SURUH6008SURABAYA6304A1B2",
  bankTransferInfo: {
    bank: "Bank Syariah Indonesia (BSI) / Bank Mandiri",
    accountNumber: "7219-0123-8891-00",
    accountName: "UNAIR SURUH OFISIAL"
  },
  promoBanner: {
    active: true,
    badge: "PROMO MAHASISWA & MABA 2026",
    text: "Pindahan Kos & Antar Jemput Stasiun Diskon s/d 15%! Pesan sekarang dengan estimasi harga transparan tanpa potongan sepihak.",
    linkText: "Pesan Jasa Sekarang"
  },
  stats: {
    completedOrders: 1450,
    activeWorkers: 42,
    ratingAverage: 4.9,
    tiktokViews: "1.3M+",
    customerCount: 1100
  }
};

export const initialServices = [
  {
    id: "go-care",
    code: "GO",
    name: "Go Care",
    category: "Mobilitas & Transportasi",
    tagline: "Antar-jemput stasiun, bandara, kampus & bantuan mogok",
    startingPrice: 15000,
    priceLabel: "Mulai Rp15.000",
    badge: "Paling Populer",
    icon: "Car",
    genderSensitive: false,
    description: "Layanan mobilitas aman untuk mahasiswa dan civitas kampus. Mulai dari antar-jemput stasiun Gubeng/Pasar Turi, Bandara Juanda, keliling antar kampus A/B/C, hingga emergency motor mogok / kehabisan bensin.",
    subServices: [
      { name: "Antar Jemput Stasiun Gubeng / Ps. Turi", price: 20000 },
      { name: "Antar Jemput Bandara Juanda", price: 65000 },
      { name: "Mobilitas Antar Kampus UNAIR (A, B, C)", price: 15000 },
      { name: "Bantuan Motor Mogok / Antar Bensin Darurat", price: 25000 }
    ],
    vehicles: ["Motor", "Mobil Pribadi"],
    included: ["Driver ramah & beridentitas mahasiswa", "Tepat waktu sesuai jadwal tiket", "Helm bersih & aman", "Bebas biaya parkir stasiun"],
    notIncluded: ["Tol luar kota (jika ada)", "Beban muatan berlebih diluar kapasitas"]
  },
  {
    id: "move-care",
    code: "MOVE",
    name: "Move Care",
    category: "Pindahan & Logistik",
    tagline: "Pindahan kos, kontrakan & angkut barang lengkap armada",
    startingPrice: 85000,
    priceLabel: "Mulai Rp85.000",
    badge: "Rekomendasi",
    icon: "Truck",
    genderSensitive: true,
    description: "Spesialis jasa pindahan kos dan kontrakan mahasiswa di Surabaya. Pilihan armada lengkap mulai dari Tossa/Roda Tiga, Pick-up Bak/Box, hingga tenaga bantu angkut terpercaya. Privasi kamar kos terjamin dengan kesesuaian gender worker.",
    subServices: [
      { name: "Pindahan Kos Ringan (Motor + Keranjang/Bagasi)", price: 45000 },
      { name: "Pindahan Kos Standar (Armada Tossa Roda Tiga + Tenaga)", price: 85000 },
      { name: "Pindahan Kos Penuh / Kontrakan (Mobil Pick-up + 1 Tenaga)", price: 140000 },
      { name: "Extra Tenaga Angkut Tambahan (Per Orang)", price: 35000 }
    ],
    vehicles: ["Tossa Roda Tiga", "Mobil Pick-Up", "Mobil Box", "Motor"],
    included: ["Armada siap jalan + BBM", "Bantuan bongkar muat barang", "Tali pengikat & terpal anti hujan", "Worker disesuaikan gender untuk ruang privat kos"],
    notIncluded: ["Kardus packing (tersedia add-on Rp8.000/box)", "Angkat barang di lantai 4 tanpa lift (biaya tambahan Rp15.000)"]
  },
  {
    id: "keep-care",
    code: "KEEP",
    name: "Keep Care",
    category: "Penitipan & Simpan Barang",
    tagline: "Penitipan barang kos saat liburan, KKN & magang",
    startingPrice: 5000,
    priceLabel: "Mulai Rp5.000/hari",
    badge: "Musim KKN & Liburan",
    icon: "PackageCheck",
    genderSensitive: false,
    description: "Solusi hemat daripada bayar kos penuh saat kamu libur semester, dinas KKN di pelosok desa, atau magang di luar kota. Barang disimpan di ruangan kering, bersih, aman ber-CCTV, dan tersegel rapi.",
    subServices: [
      { name: "Penitipan Koper / Kardus Sedang (Harian)", price: 5000 },
      { name: "Paket Penitipan Koper 1 Bulan Penuh", price: 65000 },
      { name: "Penitipan Motor Kos (Termasuk Panasin Mesin Rutin)", price: 110000 },
      { name: "Layanan Jemput & Antar Kembali Barang Kos", price: 25000 }
    ],
    vehicles: ["Motor", "Tossa", "Pick-up"],
    included: ["Labeling & dokumentasi foto barang", "Ruangan aman tertutup & kering", "Perawatan mesin motor (jika titip motor)", "Berita acara serah terima digital"],
    notIncluded: ["Barang mudah membusuk / basah", "Hewan peliharaan", "Barang berharga khusus seperti perhiasan/uang tunai"]
  },
  {
    id: "fix-care",
    code: "FIX",
    name: "Fix Care",
    category: "Perakitan & Bantuan Teknis",
    tagline: "Rakit lemari, meja belajar, servis motor & HP panggilan",
    startingPrice: 30000,
    priceLabel: "Mulai Rp30.000",
    badge: "Praktis",
    icon: "Wrench",
    genderSensitive: true,
    description: "Beli meja belajar atau lemari baru di marketplace tapi bingung pasangnya? Butuh servis motor atau laptop tanpa harus ke bengkel? Mitra teknis mahasiswa kami siap datang ke kos kamu.",
    subServices: [
      { name: "Perakitan Meja Belajar / Rak Minimalis", price: 30000 },
      { name: "Perakitan Lemari Pakaian 2-3 Pintu", price: 60000 },
      { name: "Pemeriksaan / Servis Ringan Motor Panggilan", price: 35000 },
      { name: "Bantuan Masalah Laptop, Install OS / Software Tugas", price: 40000 }
    ],
    vehicles: ["Motor"],
    included: ["Peralatan obeng, bor & perkakas lengkap", "Uji coba fungsi setelah perakitan", "Pembersihan serpihan kemasan", "Worker cewek untuk kos putri"],
    notIncluded: ["Sparepart atau suku cadang baru", "Komponen hardware pengganti"]
  },
  {
    id: "task-care",
    code: "TASK",
    name: "Task Care",
    category: "Personal Assistant & Titip Beli",
    tagline: "Titip beli makan, ambil barang tertinggal & urusan harian",
    startingPrice: 10000,
    priceLabel: "Mulai Rp10.000",
    badge: "Super Cepat",
    icon: "ShoppingBag",
    genderSensitive: false,
    description: "Delegasikan tugas remeh-temeh yang menyita waktumu: belikan makanan antre (Mie Gacoan, McD), ambil cucian laundry, ambil barang tertinggal di kampus, print tugas dadakan, hingga kirim paket ke ekspedisi.",
    subServices: [
      { name: "Titip Beli Makanan / Belanjaan Sekitar Kampus", price: 10000 },
      { name: "Ambil & Antar Laundry Kiloan", price: 15000 },
      { name: "Ambilkan Barang Tertinggal di Kampus / Kos Teman", price: 15000 },
      { name: "Print & Jilid Makalah / Tugas Kuliah Dadakan", price: 12000 }
    ],
    vehicles: ["Motor"],
    included: ["Pembelian tepat waktu", "Struk belanja asli difotokan & dilampirkan", "Kembalian uang transparan", "Notifikasi posisi terkini"],
    notIncluded: ["Talangan belanja di atas Rp300.000 (harus transfer di awal)"]
  },
  {
    id: "desk-care",
    code: "DESK",
    name: "Desk Care",
    category: "Administrasi & Kampus Resmi",
    tagline: "Ambil sertifikat ELPT, legalisir & surat administrasi",
    startingPrice: 20000,
    priceLabel: "Mulai Rp20.000",
    badge: "Resmi & Amanah",
    icon: "FileText",
    genderSensitive: false,
    description: "Kamu sudah pulang kampung tapi butuh ambil sertifikat ELPT di Pusat Bahasa UNAIR, legalisir ijazah di fakultas, atau antre cap stempel? Kami uruskan secara amanah sesuai SOP resmi yang diperbolehkan kampus.",
    subServices: [
      { name: "Pengambilan Sertifikat ELPT Pusat Bahasa UNAIR", price: 25000 },
      { name: "Legalisir Ijazah / Transkrip Nilai di Fakultas", price: 30000 },
      { name: "Pengurusan Berkas Surat Izin / Keterangan Aktif", price: 20000 },
      { name: "Kirim Dokumen Kampus via JNE / J&T / TiKi", price: 15000 }
    ],
    vehicles: ["Motor"],
    included: ["Surat kuasa / bukti resi resmi dijaga rapi", "Dokumentasi penyerahan berkas", "Amplop pelindung dokumen", "Foto berkas sebelum dikirimkan"],
    notIncluded: ["Joki ujian / pelanggaran etik akademik (MUTLAK DITOLAK)", "Biaya legalisir resmi dari fakultas"]
  },
  {
    id: "crew-care",
    code: "CREW",
    name: "Crew Care",
    category: "Event & Bantuan Ormawa",
    tagline: "Tenaga operasional event BEM, UKM, seminar & konser",
    startingPrice: 50000,
    priceLabel: "Mulai Rp50.000/crew",
    badge: "Solusi BEM & Panitia",
    icon: "Users",
    genderSensitive: false,
    description: "Kepanitiaan event ormawa atau kegiatan kampus butuh tenaga ekstra untuk loading barang, penataan panggung, operasional tiket, atau tim kebersihan venue? Dapatkan tim crew mahasiswa yang sigap dan kompak.",
    subServices: [
      { name: "Crew Loading & Unloading Logistik Event", price: 50000 },
      { name: "Tim Keberesan & Cleaning Pasca Acara", price: 45000 },
      { name: "Bantuan Ticketing & Registrasi Peserta", price: 50000 },
      { name: "Paket Borongan Crew Acara (Setengah Hari / 4 Jam)", price: 85000 }
    ],
    vehicles: ["Motor", "Mobil Pick-Up"],
    included: ["Mahasiswa aktif berbadan sehat & disiplin", "Koordinator lapangan", "Briefing sebelum acara", "Laporan kehadiran transparan"],
    notIncluded: ["Konsumsi crew selama acara", "Peralatan berat khusus panggung"]
  },
  {
    id: "talent-care",
    code: "TALENT",
    name: "Talent Care",
    category: "Tutor & Skill Mahasiswa",
    tagline: "Tutor les mata kuliah, asisten praktikum & media",
    startingPrice: 45000,
    priceLabel: "Mulai Rp45.000/sesi",
    badge: "Edukasi & Skill",
    icon: "GraduationCap",
    genderSensitive: true,
    description: "Butuh tutor sebaya untuk mata kuliah sulit (Kalkulus, Statistika, Akuntansi, Kedokteran/Farmasi), atau fotografer/videografer untuk dokumentasi sidang skripsi dan wisuda? Mahasiswa berprestasi UNAIR siap membantumu.",
    subServices: [
      { name: "Tutor Les Privat Mata Kuliah (90 Menit)", price: 50000 },
      { name: "Dokumentasi Foto Wisuda / Sidang Skripsi", price: 85000 },
      { name: "Bantuan Desain Presentasi Sidang & Poster Ilmiah", price: 45000 },
      { name: "Konsultasi Olah Data Statistik (SPSS / R / Python)", price: 75000 }
    ],
    vehicles: ["Motor"],
    included: ["Tutor mahasiswa ber-IPK tinggi di bidangnya", "Bahan ajar & latihan soal", "Sesi tanya jawab fleksibel", "Kesesuaian gender untuk privat di kamar kos"],
    notIncluded: ["Joki tugas / pengerjaan skripsi orang lain (KAMI TOLAK KERAS)"]
  }
];

export const initialOrders = [
  {
    id: "US-2610-001",
    serviceId: "move-care",
    serviceName: "Move Care",
    subServiceName: "Pindahan Kos Standar (Armada Tossa Roda Tiga + Tenaga)",
    customerName: "Siti Rahmawati",
    customerPhone: "081234567890",
    pickupLocation: "Kos Putri Melati, Jl. Srikana No. 12, Gubeng, Surabaya",
    deliveryLocation: "Kos Griya Airlangga, Jl. Dharmawangsa III No. 8, Surabaya",
    bookingDate: "2026-10-19",
    bookingTime: "10:00",
    isPrivateSpace: true,
    clientGenderPreference: "Wanita",
    vehicleType: "Tossa Roda Tiga",
    notes: "Lantai 2, tolong bawakan worker cewek karena kamar kos putri ketat penjagaannya.",
    estimatedPrice: 95000,
    finalPrice: 95000,
    workerCut: 76000, // 80%
    platformCut: 19000, // 20%
    status: "SELESAI", // MENUNGGU_QUOTE, QUOTE_DIKIRIM, AKAD_DISETUJUI, WORKER_DITUGASKAN, DIKERJAKAN, SELESAI, DIBATALKAN
    akadDetails: {
      scopeOfWork: "Pengangkutan 4 kardus besar pakaian, 1 rak susun, 1 galon, dan koper dari lantai 2 kamar kos putri ke kos baru menggunakan armada Tossa.",
      finalPrice: 95000,
      paymentScheme: "Lunas di Tempat / Transfer setelah selesai",
      workerUjrah: 76000,
      agreedAt: "2026-10-19 09:15 WIB",
      isAgreed: true
    },
    assignedWorker: {
      id: "W-002",
      name: "Davina Clarissa & Fitriani",
      phone: "085712345678",
      gender: "Wanita",
      nim: "042211333012",
      faculty: "Fakultas Farmasi UNAIR",
      rating: 5.0
    },
    payment: {
      method: "QRIS",
      amount: 95000,
      isVerified: true,
      paidAt: "2026-10-19 11:45 WIB"
    },
    review: {
      rating: 5,
      comment: "MasyaAllah tertolong banget! Worker ceweknya ramah, gercep, dan sopan banget. Harganya jelas dari awal tanpa nembak.",
      createdAt: "2026-10-19 12:00 WIB"
    },
    createdAt: "2026-10-19 08:30 WIB"
  },
  {
    id: "US-2610-002",
    serviceId: "go-care",
    serviceName: "Go Care",
    subServiceName: "Antar Jemput Stasiun Gubeng / Ps. Turi",
    customerName: "Ahmad Rizky Pratama",
    customerPhone: "089876543210",
    pickupLocation: "Pintu Keluar Baru Stasiun Surabaya Gubeng",
    deliveryLocation: "Asrama Mahasiswa Kampus C UNAIR, Mulyorejo",
    bookingDate: "2026-10-19",
    bookingTime: "14:30",
    isPrivateSpace: false,
    clientGenderPreference: "Bebas",
    vehicleType: "Motor",
    notes: "Bawa koper 24 inch + tas ransel. Kereta tiba jam 14.15 di Gubeng.",
    estimatedPrice: 25000,
    finalPrice: 25000,
    workerCut: 20000,
    platformCut: 5000,
    status: "DIKERJAKAN",
    akadDetails: {
      scopeOfWork: "Penjemputan penumpang di Stasiun Gubeng pintu timur pukul 14.30 dengan amanah, mengantarkan selamat sampai Asrama Kampus C UNAIR.",
      finalPrice: 25000,
      paymentScheme: "Transfer QRIS",
      workerUjrah: 20000,
      agreedAt: "2026-10-19 13:00 WIB",
      isAgreed: true
    },
    assignedWorker: {
      id: "W-001",
      name: "Bagus Setiawan",
      phone: "081399887766",
      gender: "Pria",
      nim: "082111533045",
      faculty: "Fakultas Sains & Teknologi UNAIR",
      rating: 4.9
    },
    payment: {
      method: "QRIS",
      amount: 25000,
      isVerified: true,
      paidAt: "2026-10-19 13:10 WIB"
    },
    review: null,
    createdAt: "2026-10-19 11:20 WIB"
  },
  {
    id: "US-2610-003",
    serviceId: "desk-care",
    serviceName: "Desk Care",
    subServiceName: "Pengambilan Sertifikat ELPT Pusat Bahasa UNAIR",
    customerName: "Nanda Putri Kusuma",
    customerPhone: "082155443322",
    pickupLocation: "Pusat Bahasa UNAIR Kampus B, Jl. Dharmawangsa Dalam",
    deliveryLocation: "Kirim JNE ke alamat rumah di Kediri",
    bookingDate: "2026-10-19",
    bookingTime: "11:00",
    isPrivateSpace: false,
    clientGenderPreference: "Bebas",
    vehicleType: "Motor",
    notes: "Sudah siapkan surat kuasa bermaterai dan fotokopi KTM lengkap.",
    estimatedPrice: 35000,
    finalPrice: 35000,
    workerCut: 28000,
    platformCut: 7000,
    status: "QUOTE_DIKIRIM",
    akadDetails: {
      scopeOfWork: "Pengambilan sertifikat fisik ELPT di loket Pusat Bahasa UNAIR membawa surat kuasa resmi dari customer, mendokumentasikan sertifikat via foto, dan mengemas rapi ke JNE Surabaya.",
      finalPrice: 35000,
      paymentScheme: "Transfer BSI di awal sebelum berkas diambil",
      workerUjrah: 28000,
      agreedAt: null,
      isAgreed: false
    },
    assignedWorker: null,
    payment: {
      method: "Transfer Bank",
      amount: 35000,
      isVerified: false,
      paidAt: null
    },
    review: null,
    createdAt: "2026-10-19 07:45 WIB"
  },
  {
    id: "US-2610-004",
    serviceId: "keep-care",
    serviceName: "Keep Care",
    subServiceName: "Paket Penitipan Koper 1 Bulan Penuh",
    customerName: "Fajar Nugroho",
    customerPhone: "083811223344",
    pickupLocation: "Kos Menur Pumpungan Gang 2 No. 19, Sukolilo",
    deliveryLocation: "Ruang Simpan UNAIR SURUH (Optik Airlangga)",
    bookingDate: "2026-10-20",
    bookingTime: "09:00",
    isPrivateSpace: false,
    clientGenderPreference: "Bebas",
    vehicleType: "Motor",
    notes: "Titip 2 koper pakaian selama saya KKN di Banyuwangi 1 bulan.",
    estimatedPrice: 75000,
    finalPrice: 75000,
    workerCut: 60000,
    platformCut: 15000,
    status: "MENUNGGU_QUOTE",
    akadDetails: null,
    assignedWorker: null,
    payment: null,
    review: null,
    createdAt: "2026-10-19 09:50 WIB"
  }
];

export const initialWorkers = [
  {
    id: "W-001",
    name: "Bagus Setiawan",
    nim: "082111533045",
    faculty: "FST (Fakultas Sains & Teknologi)",
    gender: "Pria",
    phone: "081399887766",
    vehicle: "Motor Vario & SIM C",
    skills: ["Antar Jemput Cepat", "Bantuan Motor Mogok", "Angkut Barang", "Tutor Fisika"],
    availableHours: "Senin - Jumat sore & Full Weekend",
    rating: 4.9,
    completedJobs: 48,
    status: "Aktif",
    ktmVerified: true,
    joinedAt: "Agustus 2026"
  },
  {
    id: "W-002",
    name: "Fitriani Zahra",
    nim: "042211333012",
    faculty: "Fakultas Farmasi (FF)",
    gender: "Wanita",
    phone: "085712345678",
    vehicle: "Motor Scoopy",
    skills: ["Pindahan Kos Putri", "Bantuan Administrasi Kampus", "Rakit Rak/Meja", "Tutor Kimia Farmasi"],
    availableHours: "Setiap hari (jadwal lab fleksibel)",
    rating: 5.0,
    completedJobs: 37,
    status: "Aktif",
    ktmVerified: true,
    joinedAt: "Juli 2026"
  },
  {
    id: "W-003",
    name: "Rian Hidayat",
    nim: "092111234088",
    faculty: "Fakultas Vokasi",
    gender: "Pria",
    phone: "082233445566",
    vehicle: "Mobil Grand Max Pick-Up & Tossa Roda Tiga",
    skills: ["Driver Pick-up Pindahan", "Angkut Berat", "Kelistrikan & Servis Ringan", "Loading Event"],
    availableHours: "Pagi s/d Malam (Ready On-Call)",
    rating: 4.8,
    completedJobs: 62,
    status: "Aktif",
    ktmVerified: true,
    joinedAt: "Mei 2026"
  },
  {
    id: "W-004",
    name: "Alifa Nabila",
    nim: "072311133099",
    faculty: "Fisip (Ilmu Komunikasi)",
    gender: "Wanita",
    phone: "087788990011",
    vehicle: "Motor Beat",
    skills: ["Bantuan Dokumen Kampus", "Personal Assistant", "Fotografi & Video Sidang"],
    availableHours: "Weekend & Hari Libur",
    rating: 4.9,
    completedJobs: 19,
    status: "Aktif",
    ktmVerified: true,
    joinedAt: "September 2026"
  },
  {
    id: "W-005",
    name: "Ilham Ramadhan",
    nim: "022311433054",
    faculty: "Fakultas Hukum (FH)",
    gender: "Pria",
    phone: "089677889900",
    vehicle: "Motor NMAX",
    skills: ["Urus Berkas Administrasi", "Antar Jemput Bandara/Stasiun", "Crew Acara Ormawa"],
    availableHours: "Siang s/d Malam",
    rating: 0,
    completedJobs: 0,
    status: "Menunggu Verifikasi",
    ktmVerified: false,
    joinedAt: "19 Oktober 2026"
  }
];

export const initialReviews = [
  {
    id: "REV-1",
    author: "Dinda Aisyah (Mahasiswi FISIP UNAIR)",
    service: "Move Care (Pindahan Kos)",
    rating: 5,
    text: "Sumpah pake jasanya worth it banget!! Kemarin aku pindahan dari kos lama ke dekat Kampus B dan Unair Suruh yang ngerjain semuanya. Yang paling bikin tenang, karena kosku putri ketat, mereka kirim worker cewek yang sopan banget. Harganya transparan dari awal!",
    date: "2 hari lalu",
    source: "Komentar TikTok Viral (185.8K Views)"
  },
  {
    id: "REV-2",
    author: "Rendra Kurniawan (Maba Kedokteran Gigi)",
    service: "Go Care (Antar Jemput Stasiun)",
    rating: 5,
    text: "Penyelamat pas PKKMB Amerta kemarin! Sampai di Stasiun Gubeng jam 4 subuh, langsung dijemput tepat di pintu keluar. Gak ribet nego, gak takut dipalak oknum ojol nakal, drivernya sesama anak UNAIR jadi bisa sekalian nanya-nanya info kampus.",
    date: "1 minggu lalu",
    source: "Verified Order #US-2609-114"
  },
  {
    id: "REV-3",
    author: "Kepanitiaan BEM UNAIR (Divisi Logistik)",
    service: "Crew Care & Move Care",
    rating: 5,
    text: "Kerja sama dengan Unair Suruh untuk angkut sound system dan perlengkapan panggung seminar nasional. Respon cepat, akad dan rincian upah transparan, semua crew mahasiswa sangat sigap dan tepat waktu.",
    date: "2 minggu lalu",
    source: "Verified Ormawa Partner"
  },
  {
    id: "REV-4",
    author: "Kevin Maulana (Alumni UNAIR)",
    service: "Desk Care (Ambil Sertifikat ELPT)",
    rating: 5,
    text: "Udah kerja di Jakarta tapi sertifikat ELPT fisik harus diambil di Pusat Bahasa UNAIR buat syarat beasiswa LPDP. Untung ada Unair Suruh, dibantu ambilkan pakai surat kuasa dan langsung dipacking kilat ke JNE. Mantap amanah!",
    date: "3 minggu lalu",
    source: "Verified Order #US-2609-082"
  }
];

export const initialFaqs = [
  {
    question: "Bagaimana cara memesan jasa di UNAIR SURUH?",
    answer: "Sangat mudah dan cepat (< 2 menit)! Anda tidak perlu registrasi akun berbelit-belit. Cukup pilih kategori layanan, isi detail tugas dan alamat, lihat estimasi harga otomatis, lalu kirim order. Admin akan segera mengirimkan konfirmasi digital akad dan menugaskan mitra mahasiswa."
  },
  {
    question: "Apa maksudnya sistem Akad Digital & Ujrah Transparan?",
    answer: "Sesuai nilai muamalah Islam, kami menjamin kepastian di awal: harga final, ruang lingkup pengerjaan, dan besaran upah (ujrah) worker disepakati sebelum pekerjaan dimulai. Tidak ada tarif terselubung, tidak ada kenaikan harga sepihak, dan tidak ada potongan upah semena-mena terhadap mahasiswa pekerja."
  },
  {
    question: "Apakah aman untuk kamar kos putri (Kesesuaian Gender)?",
    answer: "Sangat aman! Untuk pekerjaan yang memasuki ruang privat seperti kamar kos atau kontrakan, sistem kami secara otomatis memfilter dan mewajibkan penugasan mitra pekerja dengan gender yang sesuai (pelanggan wanita dikerjakan oleh worker mahasiswi, pelanggan pria oleh mahasiswa)."
  },
  {
    question: "Armada kendaraan apa saja yang tersedia untuk pindahan?",
    answer: "Kami menyediakan armada lengkap sesuai volume barang Anda: Tossa (Motor Roda Tiga dengan bak luas—favorit anak kos Surabaya karena bisa masuk gang sempit), Mobil Pick-Up Bak Terbuka, Pick-Up Box Tertutup, Mobil Penumpang, hingga Motor untuk barang ringan."
  },
  {
    question: "Apakah melayani luar area kampus UNAIR?",
    answer: "Ya! Meskipun basis utama kami di sekitar Kampus A, B, dan C UNAIR (Dharmawangsa, Karangmenjangan, Gubeng, Mulyorejo), kami melayani seluruh area Surabaya Raya termasuk Sidoarjo (Waru, Bandara Juanda), Krian, Rungkut, Pakuwon, dan sekitarnya."
  },
  {
    question: "Bagaimana sistem pembayarannya?",
    answer: "Kami menerima pembayaran melalui QRIS Statis (bisa scan dari GoPay, OVO, Dana, ShopeePay, BCA, Mandiri, dll) serta Transfer Bank (BSI / Mandiri). Untuk pindahan besar, bisa menggunakan skema DP 50% dan pelunasan 50% setelah pekerjaan tuntas."
  },
  {
    question: "Saya mahasiswa UNAIR, bagaimana cara bergabung menjadi mitra worker?",
    answer: "Klik menu 'Daftar Jadi Worker' di navigasi atas website ini. Isi formulir data diri, NIM, fakultas, jadwal waktu luang, serta keahlian atau kendaraan yang kamu miliki. Tim People kami akan memverifikasi dalam 1x24 jam."
  }
];

export const initialTeam = [
  {
    name: "Afif Ardiansyah",
    role: "Chief Executive Officer (CEO)",
    spec: "Business Strategy & Strategic Partnership",
    description: "Bertanggung jawab pada arah pertumbuhan Unair Suru, ekspansi layanan, serta kemitraan dengan pihak universitas & ormawa."
  },
  {
    name: "Hasan Fitaihi",
    role: "Chief Marketing Officer (CMO)",
    spec: "Growth, Branding & Customer Acquisition",
    description: "Mengembangkan strategi kampanye kreatif TikTok & Instagram, penetrasi komunitas mahasiswa, dan retensi pelanggan."
  },
  {
    name: "Davina Clarissa",
    role: "Chief Operation Officer (COO)",
    spec: "Operations & Service Quality Management",
    description: "Mengelola penugasan worker, kontrol standar 8 kategori layanan, dan penegakan SOP syariah di lapangan."
  },
  {
    name: "Afriza Ata",
    role: "Chief Human Resources Officer (CHRO)",
    spec: "People Operations & Worker Empowerment",
    description: "Memimpin seleksi, verifikasi data KTM mahasiswa, serta pembinaan etika amanah mitra worker."
  }
];
