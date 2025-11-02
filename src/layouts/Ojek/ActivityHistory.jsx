import { useState } from "react";
import { formatCurrency } from "../../components/utils/formatters";
import { FiTrash2 } from "react-icons/fi";

export default function ActivityHistory({ activities, onDeleteActivity }) {
    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteClick = (id) => {
        setSelectedId(id);
        setShowModal(true);
    };

    const handleConfirmDelete = async () => {
        setIsDeleting(true);
        try {
            await onDeleteActivity(selectedId);
        } finally {
            setIsDeleting(false);
            setShowModal(false);
            setSelectedId(null);
        }
    };

    return (
        <div className="bg-gray-700 rounded-xl md:rounded-2xl shadow-lg p-4 md:p-5 relative">
            <h2 className="text-xl font-semibold mb-4">Riwayat Aktivitas</h2>
            <div className="overflow-x-auto">
                <table className="w-full min-w-[700px]">
                    <thead>
                        <tr className="border-b border-gray-600">
                            <th className="py-2 md:py-3 px-2 md:px-4 text-left text-xs md:text-sm">Tanggal</th>
                            <th className="py-2 md:py-3 px-2 md:px-4 text-left text-xs md:text-sm">KM</th>
                            <th className="py-2 md:py-3 px-2 md:px-4 text-left text-xs md:text-sm">Order</th>
                            <th className="py-2 md:py-3 px-2 md:px-4 text-left text-xs md:text-sm">Pendapatan</th>
                            <th className="py-2 md:py-3 px-2 md:px-4 text-left text-xs md:text-sm">Bensin</th>
                            <th className="py-2 md:py-3 px-2 md:px-4 text-left text-xs md:text-sm">Tabungan</th>
                            <th className="py-2 md:py-3 px-2 md:px-4 text-left text-xs md:text-sm">Bersih</th>
                            <th className="py-2 md:py-3 px-2 md:px-4 text-center text-xs md:text-sm">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activities.map((activity) => (
                            <tr
                                key={activity._id}
                                className="border-b border-gray-600 hover:bg-gray-600 transition"
                            >
                                <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm">
                                    {new Date(activity.tanggal).toLocaleDateString("id-ID", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    })}
                                </td>
                                <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm">{activity.km}</td>
                                <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm">{activity.order}</td>
                                <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm text-green-400">
                                    {formatCurrency(activity.pendapatan)}
                                </td>
                                <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm text-red-400">
                                    {formatCurrency(activity.bensin)}
                                </td>
                                <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm text-red-400">
                                    {formatCurrency(activity.tabungan)}
                                </td>
                                <td
                                    className={`py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium ${activity.pendapatanBersih >= 0
                                        ? "text-green-400"
                                        : "text-red-400"
                                        }`}
                                >
                                    {formatCurrency(activity.pendapatanBersih)}
                                </td>
                                <td className="py-2 md:py-3 px-2 md:px-4 text-center">
                                    <button
                                        onClick={() => handleDeleteClick(activity._id)}
                                        className="text-red-400 hover:text-red-500 transition"
                                        title="Hapus aktivitas"
                                    >
                                        <FiTrash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal Konfirmasi */}
            {showModal && (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4">
        <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700/50 p-8 w-full max-w-md transform transition-all duration-300 scale-100">
            {/* Header dengan Icon */}
            <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center">
                    <svg 
                        className="w-6 h-6 text-red-400" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                        />
                    </svg>
                </div>
                <div className="flex-1">
                    <h3 className="text-xl font-bold text-white">Hapus Aktivitas</h3>
                    <p className="text-gray-400 text-sm mt-1">
                        Tindakan ini tidak dapat dibatalkan
                    </p>
                </div>
            </div>

            {/* Description */}
            <div className="bg-gray-750 rounded-xl p-4 mb-6">
                <p className="text-gray-300 text-sm leading-relaxed">
                    Yakin ingin menghapus aktivitas ini? Data yang sudah dihapus tidak dapat dikembalikan.
                </p>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
                <button
                    onClick={() => setShowModal(false)}
                    disabled={isDeleting}
                    className="flex-1 px-6 py-3.5 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-xl font-medium transition-all duration-200 hover:shadow-lg border border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Batal
                </button>
                <button
                    onClick={handleConfirmDelete}
                    disabled={isDeleting}
                    className="flex-1 px-6 py-3.5 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-all duration-200 hover:shadow-lg hover:shadow-red-500/20 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                >
                    {isDeleting ? (
                        <>
                            <svg
                                className="w-4 h-4 text-white animate-spin"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                ></path>
                            </svg>
                            <span>Menghapus...</span>
                        </>
                    ) : (
                        "Hapus"
                    )}
                </button>
            </div>
        </div>
    </div>
)}
        </div>
    );
}
