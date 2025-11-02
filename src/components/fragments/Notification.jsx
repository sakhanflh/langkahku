import React, { useState, useRef, useEffect } from 'react';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { FiCheck, FiTrash2, FiSettings } from 'react-icons/fi';
import { MdOutlineMarkEmailRead } from 'react-icons/md';

const Notification = ({ hasNew = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      date: "2025-09-01",
      message: "Order #1234 selesai hari ini",
      type: "success",
      read: false,
      time: "14:30"
    },
    {
      id: 2,
      date: "2025-09-02",
      message: "Servis motor dijadwalkan besok",
      type: "warning",
      read: false,
      time: "09:15"
    },
    {
      id: 3,
      date: "2025-09-03",
      message: "Target mingguan tercapai 🎯",
      type: "success",
      read: true,
      time: "18:45"
    },
    {
      id: 4,
      date: "2025-09-04",
      message: "Pembayaran diterima untuk Order #1256",
      type: "info",
      read: true,
      time: "11:20"
    },
    {
      id: 5,
      date: "2025-09-05",
      message: "Peringatan: Hujan diperkirakan sore ini",
      type: "warning",
      read: false,
      time: "07:30"
    },
    {
      id: 6,
      date: "2025-09-06",
      message: "Bonus mencapai target kilometer",
      type: "success",
      read: true,
      time: "16:10"
    }
  ]);
  const dropdownRef = useRef(null);

  // Format tanggal menjadi lebih singkat
  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  // Get type color
  const getTypeColor = (type) => {
    switch (type) {
      case 'success': return 'text-green-600 bg-green-50 border-green-200';
      case 'warning': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'info': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  // Get type icon
  const getTypeIcon = (type) => {
    switch (type) {
      case 'success': return '🎯';
      case 'warning': return '⚠️';
      case 'info': return '💡';
      default: return '📢';
    }
  };

  // Mark as read
  const markAsRead = (id) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  // Delete notification
  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  // Clear all notifications
  const clearAll = () => {
    setNotifications([]);
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

  const unreadCount = notifications.filter(notif => !notif.read).length;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Icon Notification dengan animasi */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-blue-600 transition-all duration-300 ease-out transform hover:scale-110 focus:outline-none"
      >
        <div className="relative">
          <IoIosNotificationsOutline size={26} />

          {/* Notification badge */}
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
              {unreadCount}
            </span>
          )}
        </div>
      </button>

      {/* Dropdown Notification */}
      <div
        className={`absolute right-0 top-full mt-3 w-96 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 ease-out transform origin-top-right z-50 ${isOpen
          ? 'opacity-100 scale-100 translate-y-0'
          : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
          }`}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-gray-800 text-lg">Notifikasi</h3>
              <p className="text-sm text-gray-500 mt-1">
                {unreadCount > 0 ? `${unreadCount} belum dibaca` : 'Semua sudah dibaca'}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
                  title="Tandai semua sudah dibaca"
                >
                  <MdOutlineMarkEmailRead size={18} />
                </button>
              )}
              {notifications.length > 0 && (
                <button
                  onClick={clearAll}
                  className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                  title="Hapus semua"
                >
                  <FiTrash2 size={16} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="max-h-80 overflow-y-auto">
          {notifications.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`px-6 py-4 transition-all duration-200 hover:bg-gray-50 group ${!notification.read ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                    }`}
                >
                  <div className="flex items-start space-x-3">
                    {/* Type Icon */}
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm ${getTypeColor(notification.type)
                      }`}>
                      {getTypeIcon(notification.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${notification.read ? 'text-gray-700' : 'text-gray-900'
                        }`}>
                        {notification.message}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="text-xs text-gray-500">
                          {formatDate(notification.date)}
                        </span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500">
                          {notification.time}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="p-1 text-gray-400 hover:text-green-600 hover:bg-green-100 rounded transition-colors duration-150"
                          title="Tandai sudah dibaca"
                        >
                          <FiCheck size={14} />
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-100 rounded transition-colors duration-150"
                        title="Hapus notifikasi"
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="px-6 py-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <IoIosNotificationsOutline size={24} className="text-gray-400" />
              </div>
              <p className="text-gray-500 font-medium mb-2">Tidak ada notifikasi</p>
              <p className="text-gray-400 text-sm">
                Notifikasi baru akan muncul di sini
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="px-6 py-3 border-t border-gray-100 bg-gray-50">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">
                {notifications.length} notifikasi
              </span>
              <button className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
                Lihat Semua
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notification;