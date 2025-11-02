import React, { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

export default function TransactionList({ transactions, onDelete, onEdit }) {
    const [showModal, setShowModal] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState({ trxId: null, expId: null });
    const [isDeleting, setIsDeleting] = useState(false); // ✅ state baru

    // buka modal
    const handleDeleteClick = (trxId, expId) => {
        setDeleteTarget({ trxId, expId });
        setShowModal(true);
    };

    // konfirmasi hapus
    const handleConfirmDelete = async () => {
        try {
            setIsDeleting(true);
            await onDelete(deleteTarget.trxId, deleteTarget.expId);
        } finally {
            setIsDeleting(false);
            setShowModal(false);
            setDeleteTarget({ trxId: null, expId: null });
        }
    };

    return (
        <>
            <div className="bg-gray-700 rounded-xl md:rounded-2xl shadow-md p-4 md:p-6 mb-6 md:mb-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 gap-2">
                    <h2 className="text-lg md:text-xl font-semibold">Daftar Transaksi</h2>
                    <span className="text-xs md:text-sm text-gray-400">
                        Menampilkan {transactions.length} transaksi
                    </span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[700px]">
                        <thead>
                            <tr className="border-b border-gray-600">
                                <th className="py-2 md:py-3 px-2 md:px-4 text-left text-xs md:text-sm">Tanggal</th>
                                <th className="py-2 md:py-3 px-2 md:px-4 text-left text-xs md:text-sm">Deskripsi</th>
                                <th className="py-2 md:py-3 px-2 md:px-4 text-left text-xs md:text-sm">Kategori</th>
                                <th className="py-2 md:py-3 px-2 md:px-4 text-right text-xs md:text-sm">Nominal</th>
                                <th className="py-2 md:py-3 px-2 md:px-4 text-center text-xs md:text-sm">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((trx) => (
                                <React.Fragment key={trx._id}>
                                    {/* Row utama */}
                                    <tr className="border-b border-gray-600 hover:bg-gray-600">
                                        <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm">
                                            {new Date(trx.tanggal).toLocaleDateString("id-ID", {
                                                weekday: "short",
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </td>
                                        <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm">Pendapatan Bersih</td>
                                        <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm">-</td>
                                        <td className="py-2 md:py-3 px-2 md:px-4 text-right font-medium text-green-500 text-xs md:text-sm">
                                            Rp {trx.pendapatanBersih.toLocaleString("id-ID")}
                                        </td>
                                        <td className="py-2 md:py-3 px-2 md:px-4 text-center text-xs md:text-sm">-</td>
                                    </tr>

                                    {/* Sub-row pengeluaran manual */}
                                    {trx.pengeluaranManual.map((exp) => (
                                        <tr key={exp._id} className="border-b border-gray-600 bg-gray-600 hover:bg-gray-500">
                                            <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm"></td>
                                            <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm">{exp.catatan || "-"}</td>
                                            <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm">
                                                <span className="bg-gray-500 text-gray-200 text-xs px-2 py-1 rounded-full">
                                                    {exp.kategori}
                                                </span>
                                            </td>
                                            <td className="py-2 md:py-3 px-2 md:px-4 text-right font-medium text-red-500 text-xs md:text-sm">
                                                - Rp {exp.nominal.toLocaleString("id-ID")}
                                            </td>
                                            <td className="py-2 md:py-3 px-2 md:px-4 text-center text-xs md:text-sm">
                                                <div className="flex justify-center space-x-2">
                                                    <button
                                                        onClick={() => onEdit(trx._id, exp._id)}
                                                        className="text-blue-400 hover:text-blue-300 text-sm md:text-base"
                                                    >
                                                        <FaEdit />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteClick(trx._id, exp._id)}
                                                        className="text-red-400 hover:text-red-300 text-sm md:text-base"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Konfirmasi */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4">
                    <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700/50 p-8 w-full max-w-md transform transition-all duration-300 scale-100">
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
                                <h3 className="text-xl font-bold text-white">Hapus Transaksi</h3>
                                <p className="text-gray-400 text-sm mt-1">
                                    Tindakan ini tidak dapat dibatalkan
                                </p>
                            </div>
                        </div>

                        <div className="bg-gray-750 rounded-xl p-4 mb-6">
                            <p className="text-gray-300 text-sm leading-relaxed">
                                Yakin ingin menghapus transaksi ini? Data yang sudah dihapus tidak dapat dikembalikan.
                            </p>
                        </div>

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
                                className="flex-1 px-6 py-3.5 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-all duration-200 hover:shadow-lg hover:shadow-red-500/20 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
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
        </>
    );
}
