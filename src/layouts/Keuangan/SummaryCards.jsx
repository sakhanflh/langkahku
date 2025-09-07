export default function SummaryCards({
    totalIncome,
    totalExpense,
    balance,
    savingsProgress
}) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
            {/* Total Pemasukan */}
            <div className="bg-gray-700 rounded-xl md:rounded-2xl shadow-md p-4 md:p-5">
                <h3 className="text-gray-400 text-xs md:text-sm mb-1 md:mb-2">Total Pemasukan</h3>
                <p className="text-xl md:text-2xl font-bold text-green-500">Rp {totalIncome.toLocaleString('id-ID')}</p>
            </div>

            {/* Total Pengeluaran */}
            <div className="bg-gray-700 rounded-xl md:rounded-2xl shadow-md p-4 md:p-5">
                <h3 className="text-gray-400 text-xs md:text-sm mb-1 md:mb-2">Total Pengeluaran</h3>
                <p className="text-xl md:text-2xl font-bold text-red-500">Rp {totalExpense.toLocaleString('id-ID')}</p>
            </div>

            {/* Saldo Bersih */}
            <div className="bg-gray-700 rounded-xl md:rounded-2xl shadow-md p-4 md:p-5">
                <h3 className="text-gray-400 text-xs md:text-sm mb-1 md:mb-2">Saldo Bersih</h3>
                <p className="text-xl md:text-2xl font-bold text-blue-500">Rp {balance.toLocaleString('id-ID')}</p>
            </div>

            {/* Progress Tabungan */}
            <div className="bg-gray-700 rounded-xl md:rounded-2xl shadow-md p-4 md:p-5">
                <h3 className="text-gray-400 text-xs md:text-sm mb-1 md:mb-2">Progress Tabungan</h3>
                <div className="w-full bg-gray-600 rounded-full h-2 md:h-2.5 mb-1 md:mb-2">
                    <div
                        className="bg-blue-500 h-2 md:h-2.5 rounded-full"
                        style={{ width: `${savingsProgress}%` }}
                    ></div>
                </div>
                <p className="text-xs md:text-sm text-gray-300">{savingsProgress}% Tercapai</p>
            </div>
        </div>
    );
}