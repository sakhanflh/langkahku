import { useState } from 'react';
import { tambahTransaksi } from '../../services/keuanganService';

export default function HeaderSection({
    selectedMonth,
    setSelectedMonth,
    selectedCategory,
    setSelectedCategory
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        tanggal: '',
        catatan: '',
        kategori: '',
        jumlah: '',
        jenis: 'pengeluaran'
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await tambahTransaksi(formData);
            alert('Transaksi berhasil ditambahkan!');
            // reset form
            setFormData({
                tanggal: '',
                catatan: '',
                kategori: '',
                jumlah: '',
                jenis: 'pengeluaran'
            });
            setIsModalOpen(false);
        } catch (err) {
            console.error('Gagal tambah transaksi:', err);
            alert('Gagal menambahkan transaksi');
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
                        onChange={(e) => setSelectedMonth(e.target.value)}
                    >
                        <option>Januari</option>
                        <option>Februari</option>
                        <option>Maret</option>
                        <option>April</option>
                        <option>Mei</option>
                        <option>Juni</option>
                    </select>

                    {/* Filter Kategori */}
                    <select
                        className="bg-gray-700 text-gray-200 rounded-lg px-3 py-2"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option>Semua</option>
                        <option>Pendapatan</option>
                        <option>Kebutuhan</option>
                        <option>Hiburan</option>
                        <option>Utilities</option>
                    </select>

                    {/* Tombol Tambah */}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2"
                    >
                        + Tambah Transaksi
                    </button>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-gray-700 rounded-xl w-full max-w-md p-6">
                        <h2 className="text-xl font-semibold mb-4">Tambah Transaksi</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Tanggal */}
                            <input
                                type="date"
                                name="tanggal"
                                value={formData.tanggal}
                                onChange={handleInputChange}
                                className="w-full bg-gray-600 text-white rounded-lg px-4 py-2"
                                required
                            />

                            {/* Catatan */}
                            <input
                                type="text"
                                name="catatan"
                                value={formData.catatan}
                                onChange={handleInputChange}
                                placeholder="Catatan transaksi"
                                className="w-full bg-gray-600 text-white rounded-lg px-4 py-2"
                            />

                            {/* Kategori */}
                            <select
                                name="kategori"
                                value={formData.kategori}
                                onChange={handleInputChange}
                                className="w-full bg-gray-600 text-white rounded-lg px-4 py-2"
                                required
                            >
                                <option value="">Pilih Kategori</option>
                                <option value="Pendapatan">Pendapatan</option>
                                <option value="Kebutuhan">Kebutuhan</option>
                                <option value="Hiburan">Hiburan</option>
                                <option value="Utilities">Utilities</option>
                            </select>

                            {/* Jenis */}
                            <div className="flex gap-4">
                                <label>
                                    <input
                                        type="radio"
                                        name="jenis"
                                        value="pemasukan"
                                        checked={formData.jenis === 'pemasukan'}
                                        onChange={handleInputChange}
                                    /> Pemasukan
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="jenis"
                                        value="pengeluaran"
                                        checked={formData.jenis === 'pengeluaran'}
                                        onChange={handleInputChange}
                                    /> Pengeluaran
                                </label>
                            </div>

                            {/* Jumlah */}
                            <input
                                type="number"
                                name="jumlah"
                                value={formData.jumlah}
                                onChange={handleInputChange}
                                placeholder="Jumlah (Rp)"
                                className="w-full bg-gray-600 text-white rounded-lg px-4 py-2"
                                required
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
