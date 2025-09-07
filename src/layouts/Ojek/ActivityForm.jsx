
export default function ActivityForm({ formData, setFormData, onAddActivity }) {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handler untuk menambah data aktivitas
    const handleSubmit = (e) => {
        e.preventDefault();
        const newActivity = {
            tanggal: formData.tanggal,
            km: parseInt(formData.km),
            order: parseInt(formData.order),
            pendapatan: parseInt(formData.pendapatan),
            avgKmPerLiter: parseInt(formData.avgKmPerLiter),
            bensin: parseInt(formData.bensin || 0),
            servis: parseInt(formData.servis || 0),
        };

        onAddActivity(newActivity);

        // Reset form
        setFormData({
            tanggal: new Date().toISOString().split('T')[0],
            km: '',
            order: '',
            pendapatan: '',
            avgKmPerLiter: '',
            bensin: '',
            servis: '',
        });
    };

    return (
        <div className="bg-gray-700 rounded-xl md:rounded-2xl shadow-lg p-4 md:p-5 mb-6">
            <h2 className="text-xl font-semibold mb-4">Input Aktivitas Harian</h2>

            <form onSubmit={handleSubmit}>
                {/* Tanggal */}
                <div className="mb-4">
                    <label className="block text-gray-300 mb-2 text-sm md:text-base">Tanggal</label>
                    <input
                        type="date"
                        name="tanggal"
                        value={formData.tanggal}
                        onChange={handleInputChange}
                        className="w-full bg-gray-600 text-gray-100 rounded-lg p-2 md:p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* KM dan Order */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                    <div>
                        <label className="block text-gray-300 mb-2 text-sm md:text-base">KM Ditempuh</label>
                        <input
                            type="number"
                            name="km"
                            value={formData.km}
                            onChange={handleInputChange}
                            className="w-full bg-gray-600 text-gray-100 rounded-lg p-2 md:p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="0"
                            min="0"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 mb-2 text-sm md:text-base">Jumlah Order</label>
                        <input
                            type="number"
                            name="order"
                            value={formData.order}
                            onChange={handleInputChange}
                            className="w-full bg-gray-600 text-gray-100 rounded-lg p-2 md:p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="0"
                            min="0"
                            required
                        />
                    </div>
                </div>

                {/* Pendapatan dan Bensin */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                    <div>
                        <label className="block text-gray-300 mb-2 text-sm md:text-base">Pendapatan (Rp)</label>
                        <input
                            type="number"
                            name="pendapatan"
                            value={formData.pendapatan}
                            onChange={handleInputChange}
                            className="w-full bg-gray-600 text-gray-100 rounded-lg p-2 md:p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="0"
                            min="0"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 mb-2 text-sm md:text-base">AVG KM Perliter</label>
                        <input
                            type="number"
                            name="avgKmPerLiter"
                            value={formData.avgKmPerLiter}
                            onChange={handleInputChange}
                            className="w-full bg-gray-600 text-gray-100 rounded-lg p-2 md:p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="0"
                            min="0"
                            required
                        />
                    </div>
                </div>


                <div className="mb-4">
                    <label className="block text-gray-300 mb-2 text-sm md:text-base">Catatan</label>
                    <textarea
                        name="note"
                        value={formData.note}
                        onChange={handleInputChange}
                        className="w-full bg-gray-600 text-gray-100 rounded-lg p-2 md:p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="2"
                        placeholder="Catatan singkat tentang aktivitas hari ini..."
                    ></textarea>
                </div>

                {/* Tombol Simpan */}
                <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg py-2 md:py-3 transition-colors"
                >
                    Simpan
                </button>
            </form>
        </div>
    );
}