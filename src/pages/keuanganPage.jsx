import { useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';

export default function Keuangan() {
    // State untuk filter
    const [selectedMonth, setSelectedMonth] = useState('Januari');
    const [selectedCategory, setSelectedCategory] = useState('Semua');

    // Data dummy
    const transactions = [
        { id: 1, date: '12/05/2023', description: 'Gaji Bulanan', category: 'Pendapatan', amount: 5000000, type: 'income' },
        { id: 2, date: '13/05/2023', description: 'Belanja Bulanan', category: 'Kebutuhan', amount: 1500000, type: 'expense' },
        { id: 3, date: '14/05/2023', description: 'Bayar Listrik', category: 'Utilities', amount: 500000, type: 'expense' },
        { id: 4, date: '15/05/2023', description: 'Freelance Project', category: 'Pendapatan', amount: 2500000, type: 'income' },
        { id: 5, date: '16/05/2023', description: 'Nongki Cafe', category: 'Hiburan', amount: 300000, type: 'expense' },
    ];

    const loans = [
        { id: 1, name: 'Kredit Motor', total: 18000000, paid: 9000000, dueDate: '12/12/2024' },
        { id: 2, name: 'Hutang Bank', total: 10000000, paid: 2500000, dueDate: '30/10/2024' },
    ];

    const savings = [
        { id: 1, name: 'Dana Darurat', target: 10000000, current: 6500000 },
        { id: 2, name: 'Liburan Akhir Tahun', target: 5000000, current: 2000000 },
    ];

    // Ringkasan keuangan
    const totalIncome = 7500000;
    const totalExpense = 2300000;
    const balance = totalIncome - totalExpense;
    const savingsProgress = 65;

    return (
        <MainLayout>
            <div className="min-h-screen bg-gray-800 text-gray-100 p-4 md:p-6">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4">
                    <h1 className="text-2xl font-bold">Keuangan</h1>

                    <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                        {/* Dropdown Filters */}
                        <div className="flex flex-col lg:flex-row gap-2 xs:gap-3">
                            <select
                                className="bg-gray-700 text-gray-200 rounded-lg px-3 md:px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
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

                            <select
                                className="bg-gray-700 text-gray-200 rounded-lg px-3 md:px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                <option>Semua</option>
                                <option>Pendapatan</option>
                                <option>Kebutuhan</option>
                                <option>Hiburan</option>
                                <option>Utilities</option>
                            </select>
                        </div>

                        {/* Tombol Tambah Transaksi */}
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-3 md:px-4 py-2 transition-colors text-sm md:text-base whitespace-nowrap">
                            + Tambah Transaksi
                        </button>
                    </div>
                </div>

                {/* Ringkasan Cards */}
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

                {/* Daftar Transaksi */}
                <div className="bg-gray-700 rounded-xl md:rounded-2xl shadow-md p-4 md:p-6 mb-6 md:mb-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 gap-2">
                        <h2 className="text-lg md:text-xl font-semibold">Daftar Transaksi</h2>
                        <span className="text-xs md:text-sm text-gray-400">Menampilkan 5 transaksi</span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[600px]">
                            <thead>
                                <tr className="border-b border-gray-600">
                                    <th className="py-2 md:py-3 px-2 md:px-4 text-left text-xs md:text-sm">Tanggal</th>
                                    <th className="py-2 md:py-3 px-2 md:px-4 text-left text-xs md:text-sm">Deskripsi</th>
                                    <th className="py-2 md:py-3 px-2 md:px-4 text-left text-xs md:text-sm">Kategori</th>
                                    <th className="py-2 md:py-3 px-2 md:px-4 text-right text-xs md:text-sm">Nominal</th>
                                    <th className="py-2 md:py-3 px-2 md:px-4 text-center text-xs md:text-sm">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map(transaction => (
                                    <tr key={transaction.id} className="border-b border-gray-600 hover:bg-gray-600">
                                        <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm">{transaction.date}</td>
                                        <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm">{transaction.description}</td>
                                        <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm">
                                            <span className="bg-gray-600 text-gray-200 text-xs px-2 py-1 rounded-full">
                                                {transaction.category}
                                            </span>
                                        </td>
                                        <td className={`py-2 md:py-3 px-2 md:px-4 text-right font-medium text-xs md:text-sm ${transaction.type === 'income' ? 'text-green-500' : 'text-red-500'
                                            }`}>
                                            {transaction.type === 'income' ? '+' : '-'} Rp {transaction.amount.toLocaleString('id-ID')}
                                        </td>
                                        <td className="py-2 md:py-3 px-2 md:px-4 text-center text-xs md:text-sm">
                                            <div className="flex justify-center space-x-2">
                                                <button className="text-blue-400 hover:text-blue-300 text-sm md:text-base">
                                                    ✏️
                                                </button>
                                                <button className="text-red-400 hover:text-red-300 text-sm md:text-base">
                                                    🗑️
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                    {/* Cicilan & Hutang */}
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

                    {/* Tabungan */}
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
                </div>
            </div>
        </MainLayout>
    );
}