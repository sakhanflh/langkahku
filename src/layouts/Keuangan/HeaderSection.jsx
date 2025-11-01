import { useState } from 'react';

export default function HeaderSection({
    selectedMonth,
    setSelectedMonth,
    selectedWeek,
    setSelectedWeek,
    onAddExpense,
    transactions
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        keuanganId: '',
        kategori: '',
        jumlah: '',
        catatan: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.keuanganId) {
            alert('Pilih tanggal / keuangan terlebih dahulu');
            return;
        }
        try {
            await onAddExpense(
                formData.keuanganId,
                formData.kategori,
                Number(formData.jumlah),
                formData.catatan
            );
            alert('Pengeluaran berhasil ditambahkan!');
            setFormData({
                keuanganId: '',
                kategori: '',
                jumlah: '',
                catatan: ''
            });
            setIsModalOpen(false);
        } catch (err) {
            console.error(err);
            alert('Gagal menambahkan pengeluaran');
        }
    };

    return (
        <>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4">
                <h1 className="text-2xl font-bold">Keuangan</h1>

                <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                    {/* Filter Bulan */}
                    <select
                        className="bg-gray-700 text-gray-200 rounded-lg px-3 py-2"
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(Number(e.target.value))}
                    >
                        <option value="1">Januari</option>
                        <option value="2">Februari</option>
                        <option value="3">Maret</option>
                        <option value="4">April</option>
                        <option value="5">Mei</option>
                        <option value="6">Juni</option>
                        <option value="7">Juli</option>
                        <option value="8">Agustus</option>
                        <option value="9">September</option>
                        <option value="10">Oktober</option>
                        <option value="11">November</option>
                        <option value="12">Desember</option>
                    </select>

                    {/* Filter Minggu */}
                    <select
                        className="bg-gray-700 text-gray-200 rounded-lg px-3 py-2"
                        value={selectedWeek}
                        onChange={(e) => setSelectedWeek(e.target.value)}
                    >
                        <option value="all">Semua</option>
                        <option value="1">Minggu 1</option>
                        <option value="2">Minggu 2</option>
                        <option value="3">Minggu 3</option>
                        <option value="4">Minggu 4</option>
                    </select>

                    {/* Tombol Tambah */}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2"
                    >
                        + Tambah Pengeluaran
                    </button>
                </div>
            </div>

            {/* Modal tambah pengeluaran manual */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-gray-700 rounded-xl w-full max-w-md p-6">
                        <h2 className="text-xl font-semibold mb-4">Tambah Pengeluaran Manual</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <select
                                name="keuanganId"
                                value={formData.keuanganId}
                                onChange={handleInputChange}
                                required
                                className="w-full bg-gray-600 text-white rounded-lg px-4 py-2"
                            >
                                <option value="">Pilih Tanggal</option>
                                {transactions?.map(trx => (
                                    <option key={trx._id} value={trx._id}>
                                        {new Date(trx.tanggal).toLocaleDateString('id-ID')}
                                    </option>
                                ))}
                            </select>

                            <select
                                name="kategori"
                                value={formData.kategori}
                                onChange={handleInputChange}
                                required
                                className="w-full bg-gray-600 text-white rounded-lg px-4 py-2"
                            >
                                <option value="">Pilih Kategori</option>
                                <option value="Makan/Minum">Makan/Minum</option>
                                <option value="Transport">Transport</option>
                                <option value="Lainnya">Lainnya</option>
                            </select>

                            <input
                                type="number"
                                name="jumlah"
                                value={formData.jumlah}
                                onChange={handleInputChange}
                                placeholder="Jumlah (Rp)"
                                className="w-full bg-gray-600 text-white rounded-lg px-4 py-2"
                                required
                            />

                            <input
                                type="text"
                                name="catatan"
                                value={formData.catatan}
                                onChange={handleInputChange}
                                placeholder="Catatan (opsional)"
                                className="w-full bg-gray-600 text-white rounded-lg px-4 py-2"
                            />

                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="text-gray-300"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 px-4 py-2 rounded-lg text-white"
                                >
                                    Simpan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
