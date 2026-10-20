import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initialSiteConfig,
  initialServices,
  initialOrders,
  initialWorkers,
  initialReviews,
  initialFaqs,
  initialTeam
} from '../data/initialData';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Load from localStorage or fallback to defaults
  const [siteConfig, setSiteConfig] = useState(() => {
    const saved = localStorage.getItem('unair_suruh_site_config');
    return saved ? JSON.parse(saved) : initialSiteConfig;
  });

  const [services, setServices] = useState(() => {
    const saved = localStorage.getItem('unair_suruh_services');
    return saved ? JSON.parse(saved) : initialServices;
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('unair_suruh_orders');
    return saved ? JSON.parse(saved) : initialOrders;
  });

  const [workers, setWorkers] = useState(() => {
    const saved = localStorage.getItem('unair_suruh_workers');
    return saved ? JSON.parse(saved) : initialWorkers;
  });

  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem('unair_suruh_reviews');
    return saved ? JSON.parse(saved) : initialReviews;
  });

  const [faqs, setFaqs] = useState(() => {
    const saved = localStorage.getItem('unair_suruh_faqs');
    return saved ? JSON.parse(saved) : initialFaqs;
  });

  // UI Navigation & Modals State
  const [currentView, setCurrentView] = useState('home'); // 'home', 'track', 'worker-register', 'admin'
  const [selectedService, setSelectedService] = useState(null); // for detail modal or booking
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isEstimatorOpen, setIsEstimatorOpen] = useState(false);
  const [isWorkerRegisterOpen, setIsWorkerRegisterOpen] = useState(false);
  const [trackingCode, setTrackingCode] = useState('');
  const [toast, setToast] = useState(null);

  // Sync state to localStorage on updates
  useEffect(() => {
    localStorage.setItem('unair_suruh_site_config', JSON.stringify(siteConfig));
  }, [siteConfig]);

  useEffect(() => {
    localStorage.setItem('unair_suruh_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('unair_suruh_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('unair_suruh_workers', JSON.stringify(workers));
  }, [workers]);

  useEffect(() => {
    localStorage.setItem('unair_suruh_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('unair_suruh_faqs', JSON.stringify(faqs));
  }, [faqs]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  // Create New Customer Order
  const createOrder = (orderData) => {
    const now = new Date();
    const dateCode = `${now.getFullYear().toString().slice(2)}${String(now.getMonth() + 1).padStart(2, '0')}`;
    const randomSeq = String(orders.length + 1).padStart(3, '0');
    const orderId = `US-${dateCode}-${randomSeq}`;

    const newOrder = {
      id: orderId,
      serviceId: orderData.serviceId,
      serviceName: orderData.serviceName,
      subServiceName: orderData.subServiceName || orderData.serviceName,
      customerName: orderData.customerName,
      customerPhone: orderData.customerPhone,
      pickupLocation: orderData.pickupLocation,
      deliveryLocation: orderData.deliveryLocation || '-',
      bookingDate: orderData.bookingDate,
      bookingTime: orderData.bookingTime,
      isPrivateSpace: orderData.isPrivateSpace || false,
      clientGenderPreference: orderData.clientGenderPreference || 'Bebas',
      vehicleType: orderData.vehicleType || 'Motor',
      notes: orderData.notes || '',
      estimatedPrice: orderData.estimatedPrice || 0,
      finalPrice: orderData.estimatedPrice || 0,
      workerCut: Math.round((orderData.estimatedPrice || 0) * 0.8),
      platformCut: Math.round((orderData.estimatedPrice || 0) * 0.2),
      status: 'MENUNGGU_QUOTE',
      akadDetails: {
        scopeOfWork: `Pengerjaan layanan ${orderData.serviceName} (${orderData.subServiceName || ''}) dari ${orderData.pickupLocation} menuju ${orderData.deliveryLocation || 'lokasi pengerjaan'} pada tanggal ${orderData.bookingDate} jam ${orderData.bookingTime}.`,
        finalPrice: orderData.estimatedPrice || 0,
        paymentScheme: 'Transfer QRIS / Tunai setelah selesai',
        workerUjrah: Math.round((orderData.estimatedPrice || 0) * 0.8),
        agreedAt: null,
        isAgreed: false
      },
      assignedWorker: null,
      payment: null,
      review: null,
      createdAt: `${now.toLocaleDateString('id-ID')} ${now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB`
    };

    setOrders([newOrder, ...orders]);
    setTrackingCode(orderId);
    showToast(`Order ${orderId} berhasil dibuat! Segera konfirmasi via WhatsApp.`, 'success');
    return newOrder;
  };

  // Customer Approves Digital Akad
  const approveAkad = (orderId) => {
    const now = new Date();
    const agreedTimeStr = `${now.toLocaleDateString('id-ID')} ${now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB`;

    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          status: o.assignedWorker ? 'DIKERJAKAN' : 'AKAD_DISETUJUI',
          akadDetails: {
            ...o.akadDetails,
            isAgreed: true,
            agreedAt: agreedTimeStr
          }
        };
      }
      return o;
    }));
    showToast(`Akad Digital order ${orderId} berhasil disetujui!`, 'success');
  };

  // Customer Submits Payment Proof
  const submitPaymentProof = (orderId, method, paymentProofName = 'bukti_transfer.jpg') => {
    const now = new Date();
    const paidTimeStr = `${now.toLocaleDateString('id-ID')} ${now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB`;

    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          payment: {
            method: method || 'QRIS',
            amount: o.finalPrice,
            proofFileName: paymentProofName,
            isVerified: false, // admin will verify
            paidAt: paidTimeStr
          }
        };
      }
      return o;
    }));
    showToast(`Bukti pembayaran untuk ${orderId} berhasil diunggah! Menunggu verifikasi admin.`, 'info');
  };

  // Customer Submits Review
  const submitReview = (orderId, rating, comment) => {
    const now = new Date();
    const targetOrder = orders.find(o => o.id === orderId);

    const newRev = {
      id: `REV-${Date.now()}`,
      author: `${targetOrder?.customerName || 'Pelanggan UNAIR'} (Order ${orderId})`,
      service: targetOrder?.serviceName || 'Layanan UNAIR SURUH',
      rating,
      text: comment,
      date: 'Baru saja',
      source: `Verified Order #${orderId}`
    };

    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          review: {
            rating,
            comment,
            createdAt: `${now.toLocaleDateString('id-ID')} WIB`
          }
        };
      }
      return o;
    }));

    setReviews([newRev, ...reviews]);
    showToast(`Terima kasih atas ulasan Amanah Anda!`, 'success');
  };

  // Admin Actions: Send Quote & Publish Akad
  const adminSendQuote = (orderId, quoteData) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        const finalP = Number(quoteData.finalPrice) || o.finalPrice;
        const workerCut = Math.round(finalP * 0.8);
        const platformCut = finalP - workerCut;

        return {
          ...o,
          finalPrice: finalP,
          workerCut,
          platformCut,
          status: 'QUOTE_DIKIRIM',
          akadDetails: {
            scopeOfWork: quoteData.scopeOfWork || o.akadDetails?.scopeOfWork,
            finalPrice: finalP,
            paymentScheme: quoteData.paymentScheme || 'Transfer QRIS / DP 50%',
            workerUjrah: workerCut,
            isAgreed: false,
            agreedAt: null
          }
        };
      }
      return o;
    }));
    showToast(`Quote & Digital Akad untuk ${orderId} telah diterbitkan!`, 'success');
  };

  // Admin Actions: Assign Worker to Order
  const adminAssignWorker = (orderId, workerId) => {
    const targetWorker = workers.find(w => w.id === workerId);
    if (!targetWorker) return;

    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        const newStatus = o.akadDetails?.isAgreed ? 'DIKERJAKAN' : 'WORKER_DITUGASKAN';
        return {
          ...o,
          assignedWorker: targetWorker,
          status: newStatus
        };
      }
      return o;
    }));
    showToast(`Worker ${targetWorker.name} berhasil ditugaskan ke order ${orderId}!`, 'success');
  };

  // Admin Actions: Update Order Status
  const adminUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          status: newStatus
        };
      }
      return o;
    }));
    showToast(`Status order ${orderId} diubah menjadi ${newStatus}!`, 'info');
  };

  // Admin Actions: Verify Payment
  const adminVerifyPayment = (orderId) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId && o.payment) {
        return {
          ...o,
          payment: {
            ...o.payment,
            isVerified: true
          }
        };
      }
      return o;
    }));
    showToast(`Pembayaran order ${orderId} telah diverifikasi!`, 'success');
  };

  // Worker Registration
  const registerWorker = (workerData) => {
    const newId = `W-${String(workers.length + 1).padStart(3, '0')}`;
    const newWorker = {
      id: newId,
      name: workerData.name,
      nim: workerData.nim,
      faculty: workerData.faculty,
      gender: workerData.gender,
      phone: workerData.phone,
      vehicle: workerData.vehicle,
      skills: Array.isArray(workerData.skills) ? workerData.skills : [workerData.skills],
      availableHours: workerData.availableHours || 'Fleksibel',
      rating: 5.0,
      completedJobs: 0,
      status: 'Menunggu Verifikasi',
      ktmVerified: false,
      joinedAt: 'Baru mendaftar'
    };

    setWorkers([newWorker, ...workers]);
    showToast(`Pendaftaran Anda sebagai calon mitra worker berhasil dikirim! Tim People akan memverifikasi.`, 'success');
    return newWorker;
  };

  // Admin Actions: Worker Approval / Status
  const adminVerifyWorker = (workerId, approve = true) => {
    setWorkers(prev => prev.map(w => {
      if (w.id === workerId) {
        return {
          ...w,
          status: approve ? 'Aktif' : 'Ditolak',
          ktmVerified: approve
        };
      }
      return w;
    }));
    showToast(`Worker ${workerId} telah ${approve ? 'disetujui & aktif' : 'ditolak'}!`, 'info');
  };

  // Reset to Factory Default
  const resetAllData = () => {
    localStorage.clear();
    setSiteConfig(initialSiteConfig);
    setServices(initialServices);
    setOrders(initialOrders);
    setWorkers(initialWorkers);
    setReviews(initialReviews);
    setFaqs(initialFaqs);
    showToast('Seluruh data berhasil di-reset ke data awal!', 'info');
  };

  // Generate WhatsApp Direct Link
  const getWhatsAppOrderUrl = (order) => {
    const text = `Halo Admin @unair_suruh! Saya mau konfirmasi pesanan jasa:
*Kode Order*: ${order.id}
*Nama*: ${order.customerName}
*No. WA*: ${order.customerPhone}
*Layanan*: ${order.serviceName} (${order.subServiceName})
*Lokasi Jemput/Pengerjaan*: ${order.pickupLocation}
*Tujuan/Penerima*: ${order.deliveryLocation || '-'}
*Jadwal*: ${order.bookingDate} pukul ${order.bookingTime} WIB
*Jenis Kendaraan*: ${order.vehicleType || '-'}
*Ruang Privat (Kamar Kos)*: ${order.isPrivateSpace ? 'YA (Wajib Kesesuaian Gender)' : 'Tidak'}
*Estimasi Tarif*: Rp${order.estimatedPrice?.toLocaleString('id-ID')}
*Catatan Tambahan*: ${order.notes || '-'}

Mohon konfirmasi ketersediaan worker dan rincian digital akadnya ya min. Terima kasih!`;

    return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  const getWhatsAppWorkerUrl = (worker) => {
    const text = `Halo Tim People @unair_suruh! Saya telah mengisi pendaftaran calon mitra worker di website:
*ID Worker*: ${worker.id}
*Nama*: ${worker.name}
*NIM & Fakultas*: ${worker.nim} (${worker.faculty})
*Jenis Kelamin*: ${worker.gender}
*Kendaraan*: ${worker.vehicle}
*Keahlian*: ${Array.isArray(worker.skills) ? worker.skills.join(', ') : worker.skills}

Mohon diproses untuk verifikasi KTM dan pembekalan SOP amanah. Terima kasih!`;

    return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <AppContext.Provider
      value={{
        siteConfig,
        setSiteConfig,
        services,
        setServices,
        orders,
        workers,
        reviews,
        faqs,
        setFaqs,
        team: initialTeam,
        currentView,
        setCurrentView,
        selectedService,
        setSelectedService,
        isOrderModalOpen,
        setIsOrderModalOpen,
        isEstimatorOpen,
        setIsEstimatorOpen,
        isWorkerRegisterOpen,
        setIsWorkerRegisterOpen,
        trackingCode,
        setTrackingCode,
        toast,
        showToast,
        createOrder,
        approveAkad,
        submitPaymentProof,
        submitReview,
        adminSendQuote,
        adminAssignWorker,
        adminUpdateOrderStatus,
        adminVerifyPayment,
        registerWorker,
        adminVerifyWorker,
        resetAllData,
        getWhatsAppOrderUrl,
        getWhatsAppWorkerUrl
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
