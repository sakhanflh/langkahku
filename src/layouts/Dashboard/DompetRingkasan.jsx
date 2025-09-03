export function DompetRingkasan() {
    return (
        <div className="bg-blue-100 rounded-2xl shadow-md p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
                <span className="text-2xl mr-2">💰</span>
                <h2 className="font-bold text-lg text-gray-800">Ringkasan Keuangan</h2>
            </div>
            <div className="grid grid-cols-2 gap-2">
                <div>
                    <p className="text-xs text-gray-500">Pemasukan</p>
                    <p className="text-green-600 font-semibold">Rp 750.000</p>
                </div>
                <div>
                    <p className="text-xs text-gray-500">Pengeluaran</p>
                    <p className="text-red-600 font-semibold">Rp 350.000</p>
                </div>
            </div>
        </div>
    )
}