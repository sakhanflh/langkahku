import { FaTrash } from "react-icons/fa";

export default function TransactionList({ transactions, onDelete }) {
    return (
        <div className="bg-gray-700 rounded-xl md:rounded-2xl shadow-md p-4 md:p-6 mb-6 md:mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 gap-2">
                <h2 className="text-lg md:text-xl font-semibold">Daftar Transaksi</h2>
                <span className="text-xs md:text-sm text-gray-400">Menampilkan {transactions.length} transaksi</span>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
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
                        {transactions.map(transaction => (
                            <tr key={transaction._id} className="border-b border-gray-600 hover:bg-gray-600">
                                <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm">
                                    {new Date(transaction.tanggal).toLocaleDateString('id-ID')}
                                </td>
                                <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm">
                                    {transaction.catatan || '-'}
                                </td>
                                <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm">
                                    <span className="bg-gray-600 text-gray-200 text-xs px-2 py-1 rounded-full">
                                        {transaction.kategori}
                                    </span>
                                </td>
                                <td
                                    className={`py-2 md:py-3 px-2 md:px-4 text-right font-medium text-xs md:text-sm ${transaction.jenis === 'pemasukan'
                                        ? 'text-green-500'
                                        : 'text-red-500'
                                        }`}
                                >
                                    {transaction.jenis === 'pemasukan' ? '+' : '-'} Rp{' '}
                                    {transaction.jumlah?.toLocaleString('id-ID')}
                                </td>
                                <td className="py-2 md:py-3 px-2 md:px-4 text-center text-xs md:text-sm">
                                    <div className="flex justify-center space-x-2">
                                        <button className="text-blue-400 hover:text-blue-300 text-sm md:text-base">
                                            ✏️
                                        </button>
                                        <button onClick={() => onDelete(transaction._id)} className="text-red-400 hover:text-red-300 text-sm md:text-base">
                                            <FaTrash />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
