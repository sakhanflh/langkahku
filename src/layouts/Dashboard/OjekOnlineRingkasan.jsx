export function OjekOnlineRingkasan() {
    return (
        <div className="bg-amber-100 rounded-2xl shadow-md p-5 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
                <span className="text-2xl mr-2">🛵</span>
                <h2 className="font-bold text-lg text-gray-800">Ojek Online Tracker</h2>
            </div>
            <div className="grid grid-cols-3 gap-2">
                <div>
                    <p className="text-xs text-gray-500">KM Ditempuh</p>
                    <p className="text-blue-600 font-semibold">42 km</p>
                </div>
                <div>
                    <p className="text-xs text-gray-500">Jumlah Order</p>
                    <p className="text-blue-600 font-semibold">12</p>
                </div>
                <div>
                    <p className="text-xs text-gray-500">Pendapatan</p>
                    <p className="text-blue-600 font-semibold">Rp 320.000</p>
                </div>
            </div>
        </div>
    )
}