export default function SummaryCards({
    totalIncome = 0,
    totalExpense = 0,
    balance = 0,
    totalSavings = 0
}) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
            {/* Total Pemasukan */}
            <div className="bg-gray-700 rounded-xl shadow-md p-4 text-center">
                <h3 className="text-gray-400 text-sm mb-1">Total Pemasukan</h3>
                <p className="text-xl font-bold text-green-500">Rp {totalIncome.toLocaleString('id-ID')}</p>
            </div>

            {/* Total Pengeluaran */}
            <div className="bg-gray-700 rounded-xl shadow-md p-4 text-center">
                <h3 className="text-gray-400 text-sm mb-1">Total Pengeluaran</h3>
                <p className="text-xl font-bold text-red-500">Rp {totalExpense.toLocaleString('id-ID')}</p>
            </div>

            {/* Saldo Bersih */}
            <div className="bg-gray-700 rounded-xl shadow-md p-4 text-center">
                <h3 className="text-gray-400 text-sm mb-1">Saldo Bersih</h3>
                <p className="text-xl font-bold text-blue-500">Rp {balance.toLocaleString('id-ID')}</p>
            </div>

            {/* Total Tabungan */}
            <div className="bg-gray-700 rounded-xl shadow-md p-4 text-center">
                <h3 className="text-gray-400 text-sm mb-1">Total Tabungan</h3>
                <p className="text-xl font-bold text-yellow-400">Rp {totalSavings.toLocaleString('id-ID')}</p>
            </div>
        </div>
    );
}
