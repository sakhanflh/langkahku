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
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-gray-800 rounded-xl shadow-lg p-6 w-80 text-center">
                        <h3 className="text-lg font-semibold mb-4">Konfirmasi Hapus</h3>
                        <p className="text-sm text-gray-300 mb-6">
                            Yakin ingin menghapus aktivitas ini?
                        </p>
                        <div className="flex justify-center gap-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg transition text-sm"
                                disabled={isDeleting}
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleConfirmDelete}
                                className={`px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg transition text-sm flex items-center justify-center min-w-[80px] ${isDeleting ? "opacity-80 cursor-not-allowed" : ""
                                    }`}
                                disabled={isDeleting}
                            >
                                {isDeleting ? (
                                    <svg
                                        className="w-5 h-5 text-white animate-spin"
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
                                ) : (
                                    "Yakin"
                                )}
                            </button>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
