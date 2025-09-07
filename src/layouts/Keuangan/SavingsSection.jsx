export default function SavingsSection({ savings }) {
    return (
        <div className="bg-gray-700 rounded-xl md:rounded-2xl shadow-md p-4 md:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 gap-2">
                <h2 className="text-lg md:text-xl font-semibold">Tabungan</h2>
                <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs md:text-sm font-medium rounded-lg px-2 md:px-3 py-1 md:py-1 transition-colors whitespace-nowrap">
                    + Tambah Tabungan
                </button>
            </div>

            <div className="space-y-3 md:space-y-4">
                {savings.map(saving => {
                    const progress = (saving.current / saving.target) * 100;
                    return (
                        <div key={saving.id} className="bg-gray-600 p-3 md:p-4 rounded-lg">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-1 md:mb-2 gap-1">
                                <h3 className="font-medium text-sm md:text-base">{saving.name}</h3>
                                <span className="text-green-400 font-medium text-sm md:text-base">
                                    Rp {saving.current.toLocaleString('id-ID')} / Rp {saving.target.toLocaleString('id-ID')}
                                </span>
                            </div>
                            <div className="w-full bg-gray-500 rounded-full h-1.5 md:h-2 mb-1 md:mb-2">
                                <div
                                    className="bg-green-500 h-1.5 md:h-2 rounded-full"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                            <p className="text-xs text-gray-400">{progress.toFixed(0)}% Tercapai</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}