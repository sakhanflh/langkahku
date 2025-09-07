import { formatCurrency } from "../../components/utils/formatters";

export default function ActivityHistory({ activities }) {
    return (
        <div className="bg-gray-700 rounded-xl md:rounded-2xl shadow-lg p-4 md:p-5">
            <h2 className="text-xl font-semibold mb-4">Riwayat Aktivitas</h2>
            <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                    <thead>
                        <tr className="border-b border-gray-600">
                            <th className="py-2 md:py-3 px-2 md:px-4 text-left text-xs md:text-sm">Tanggal</th>
                            <th className="py-2 md:py-3 px-2 md:px-4 text-left text-xs md:text-sm">KM</th>
                            <th className="py-2 md:py-3 px-2 md:px-4 text-left text-xs md:text-sm">Order</th>
                            <th className="py-2 md:py-3 px-2 md:px-4 text-left text-xs md:text-sm">Pendapatan</th>
                            <th className="py-2 md:py-3 px-2 md:px-4 text-left text-xs md:text-sm">Bensin</th>
                            <th className="py-2 md:py-3 px-2 md:px-4 text-left text-xs md:text-sm">Tabungan</th>
                            <th className="py-2 md:py-3 px-2 md:px-4 text-left text-xs md:text-sm">Bersih</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activities.map((activity) => (
                            <tr key={activity._id} className="border-b border-gray-600 hover:bg-gray-600">
                                <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm">
                                    {new Date(activity.tanggal).toLocaleDateString('id-ID', {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric'
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
                                    className={`py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium ${activity.pendapatanBersih >= 0 ? "text-green-400" : "text-red-400"
                                        }`}
                                >
                                    {formatCurrency(activity.pendapatanBersih)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
