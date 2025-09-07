import React, { useState, useRef, useEffect } from 'react';
import { IoIosNotificationsOutline } from 'react-icons/io';

const Notification = ({ hasNew = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Data dummy notifikasi
  const [notifications] = useState([
    { id: 1, date: "2025-09-01", message: "Order 10 selesai hari ini" },
    { id: 2, date: "2025-09-02", message: "Servis motor dijadwalkan" },
    { id: 3, date: "2025-09-03", message: "Target mingguan tercapai 🎯" },
    { id: 4, date: "2025-09-04", message: "Pembayaran diterima untuk Order 12" },
    { id: 5, date: "2025-09-05", message: "Peringatan: Hujan diperkirakan sore ini" },
    { id: 6, date: "2025-09-06", message: "Bonus mencapai target kilometer" }
  ]);

  // Format tanggal menjadi lebih singkat
  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  // Menutup dropdown ketika klik di luar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Icon lonceng sebagai trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-white hover:text-blue-400 transition-colors duration-200 focus:outline-none"
      >
        <IoIosNotificationsOutline size={24} />

        {/* Dot merah untuk notifikasi baru */}
        {hasNew && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        )}
      </button>

      {/* Dropdown notifikasi */}
      <div
        className={`absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out transform origin-top-right z-50 ${isOpen
          ? 'opacity-100 scale-100 translate-y-0'
          : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
          }`}
      >
        {/* Header dropdown */}
        <div className="px-4 py-3 border-b border-gray-200">
          <h3 className="font-bold text-gray-800">Notifikasi</h3>
        </div>

        {/* Daftar notifikasi */}
        <div className="max-h-64 overflow-y-auto">
          {notifications.length > 0 ? (
            <ul>
              {notifications.map((notification) => (
                <li
                  key={notification.id}
                  className="px-4 py-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors duration-150"
                >
                  <p className="text-sm text-gray-800">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDate(notification.date)}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            /* Tampilan jika tidak ada notifikasi */
            <div className="px-4 py-6 text-center">
              <p className="text-gray-500 text-sm">Tidak ada notifikasi</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notification;