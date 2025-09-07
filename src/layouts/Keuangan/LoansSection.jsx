export default function LoansSection({ loans }) {
    return (
        <div className="bg-gray-700 rounded-xl md:rounded-2xl shadow-md p-4 md:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 gap-2">
                <h2 className="text-lg md:text-xl font-semibold">Cicilan & Hutang</h2>
                <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs md:text-sm font-medium rounded-lg px-2 md:px-3 py-1 md:py-1 transition-colors whitespace-nowrap">
                    + Tambah Cicilan
                </button>
            </div>

            <div className="space-y-3 md:space-y-4">
                {loans.map(loan => {
                    const progress = (loan.paid / loan.total) * 100;
                    return (
                        <div key={loan.id} className="bg-gray-600 p-3 md:p-4 rounded-lg">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-1 md:mb-2 gap-1">
                                <div>
                                    <h3 className="font-medium text-sm md:text-base">{loan.name}</h3>
                                    <p className="text-xs md:text-sm text-gray-400">Jatuh tempo: {loan.dueDate}</p>
                                </div>
                                <span className="text-blue-400 font-medium text-sm md:text-base">
                                    Rp {loan.paid.toLocaleString('id-ID')} / Rp {loan.total.toLocaleString('id-ID')}
                                </span>
                            </div>
                            <div className="w-full bg-gray-500 rounded-full h-1.5 md:h-2 mb-1 md:mb-2">
                                <div
                                    className="bg-blue-500 h-1.5 md:h-2 rounded-full"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                            <p className="text-xs text-gray-400">{progress.toFixed(0)}% Terbayar</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}