import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MainLayout } from '../layouts/MainLayout';

export default function OjekTrackerPage() {
    // State untuk form input
    const [formData, setFormData] = useState({
        date: new Date().toISOString().split('T')[0],
        km: '',
        orders: '',
        income: '',
        fuel: '',
        service: '',
        note: ''
    });

    // Data aktivitas contoh
    const [activities, setActivities] = useState([
        { id: 1, date: "2025-09-01", km: 40, orders: 8, income: 160000, fuel: 40000, service: 0, note: "Hari biasa" },
        { id: 2, date: "2025-09-02", km: 55, orders: 12, income: 250000, fuel: 50000, service: 0, note: "Order ramai" },
        { id: 3, date: "2025-08-31", km: 35, orders: 6, income: 120000, fuel: 35000, service: 0, note: "Hujan sepanjang hari" },
        { id: 4, date: "2025-08-30", km: 60, orders: 14, income: 280000, fuel: 55000, service: 20000, note: "Servis rutin" },
        { id: 5, date: "2025-08-29", km: 45, orders: 10, income: 200000, fuel: 45000, service: 0, note: "Lancar tanpa kendala" },
    ]);

    // Handler untuk input form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handler untuk menambah data aktivitas
    const handleAddActivity = (e) => {
        e.preventDefault();
        const newActivity = {
            id: activities.length + 1,
            date: formData.date,
            km: parseInt(formData.km),
            orders: parseInt(formData.orders),
            income: parseInt(formData.income),
            fuel: parseInt(formData.fuel || 0),
            service: parseInt(formData.service || 0),
            note: formData.note
        };

        setActivities([newActivity, ...activities]);

        // Reset form
        setFormData({
            date: new Date().toISOString().split('T')[0],
            km: '',
            orders: '',
            income: '',
            fuel: '',
            service: '',
            note: ''
        });
    };

    // Menghitung pendapatan bersih
    const calculateNetIncome = (income, fuel, service) => {
        return income - (fuel + service);
    };

    // Format currency Rupiah
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    // Data untuk grafik
    const chartData = activities.map(activity => ({
        date: new Date(activity.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }),
        km: activity.km,
        orders: activity.orders,
        income: activity.income,
        expense: activity.fuel + activity.service,
        net: calculateNetIncome(activity.income, activity.fuel, activity.service)
    })).reverse();

    return (
        <MainLayout>
        <div className="min-h-screen bg-gray-800 text-gray-100 p-4 md:p-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4">
                <h1 className="text-2xl font-bold">Ojek Online Tracker</h1>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-4 py-2 transition-colors">
                    + Tambah Data
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Form Input Aktivitas */}
                <div className="lg:col-span-1">
                    <div className="bg-gray-700 rounded-xl md:rounded-2xl shadow-lg p-4 md:p-5 mb-6">
                        <h2 className="text-xl font-semibold mb-4">Input Aktivitas Harian</h2>

                        <form onSubmit={handleAddActivity}>
                            {/* Tanggal */}
                            <div className="mb-4">
                                <label className="block text-gray-300 mb-2 text-sm md:text-base">Tanggal</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
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
                                        name="orders"
                                        value={formData.orders}
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
                                        name="income"
                                        value={formData.income}
                                        onChange={handleInputChange}
                                        className="w-full bg-gray-600 text-gray-100 rounded-lg p-2 md:p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="0"
                                        min="0"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-300 mb-2 text-sm md:text-base">Bensin (Rp)</label>
                                    <input
                                        type="number"
                                        name="fuel"
                                        value={formData.fuel}
                                        onChange={handleInputChange}
                                        className="w-full bg-gray-600 text-gray-100 rounded-lg p-2 md:p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="0"
                                        min="0"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Servis dan Catatan */}
                            <div className="mb-4">
                                <label className="block text-gray-300 mb-2 text-sm md:text-base">Servis/Perawatan (Rp) - Opsional</label>
                                <input
                                    type="number"
                                    name="service"
                                    value={formData.service}
                                    onChange={handleInputChange}
                                    className="w-full bg-gray-600 text-gray-100 rounded-lg p-2 md:p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="0"
                                    min="0"
                                />
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
                </div>

                {/* Grafik dan Riwayat */}
                <div className="lg:col-span-2">
                    {/* Line Chart */}
                    <div className="bg-gray-700 rounded-xl md:rounded-2xl shadow-lg p-4 md:p-5 mb-6">
                        <h2 className="text-xl font-semibold mb-4">Tren Aktivitas</h2>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    data={chartData}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                                    <XAxis dataKey="date" stroke="#9CA3AF" />
                                    <YAxis stroke="#9CA3AF" />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#F3F4F6' }}
                                        formatter={(value, name) => {
                                            if (name === 'income' || name === 'expense' || name === 'net') {
                                                return [formatCurrency(value), name === 'income' ? 'Pendapatan' : name === 'expense' ? 'Pengeluaran' : 'Bersih'];
                                            }
                                            return [value, name === 'km' ? 'KM' : 'Order'];
                                        }}
                                    />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="km"
                                        stroke="#3B82F6"
                                        strokeWidth={2}
                                        activeDot={{ r: 8 }}
                                        name="KM"
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="orders"
                                        stroke="#10B981"
                                        strokeWidth={2}
                                        name="Order"
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="income"
                                        stroke="#F59E0B"
                                        strokeWidth={2}
                                        name="Pendapatan"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Bar Chart */}
                    <div className="bg-gray-700 rounded-xl md:rounded-2xl shadow-lg p-4 md:p-5 mb-6">
                        <h2 className="text-xl font-semibold mb-4">Pendapatan vs Pengeluaran</h2>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={chartData}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                                    <XAxis dataKey="date" stroke="#9CA3AF" />
                                    <YAxis stroke="#9CA3AF" />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#F3F4F6' }}
                                        formatter={(value) => formatCurrency(value)}
                                    />
                                    <Legend />
                                    <Bar
                                        dataKey="income"
                                        fill="#10B981"
                                        name="Pendapatan"
                                        radius={[4, 4, 0, 0]}
                                    />
                                    <Bar
                                        dataKey="expense"
                                        fill="#EF4444"
                                        name="Pengeluaran"
                                        radius={[4, 4, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Riwayat Aktivitas */}
                    <div className="bg-gray-700 rounded-xl md:rounded-2xl shadow-lg p-4 md:p-5">
                        <h2 className="text-xl font-semibold mb-4">Riwayat Aktivitas</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[600px]">
                                <thead>
                                    <tr className="border-b border-gray-600">
                                        <th className="py-2 md:py-3 px-2 md:px-4 text-left text-xs md:text-sm">Tanggal</th>
                                        <th className="py-2 md:py-3 px-2 md:px-4 text-left text-xs md:text-sm">KM</th>
                                        <th className="py-2 md:py-3 px-2 md:px-4 text-left text-xs md:text-sm">Order</th>
                                        <th className="py-2 md:py-3 px-2 md:px-4 text-left text-xs md:text-sm">Pendapatan</th>
                                        <th className="py-2 md:py-3 px-2 md:px-4 text-left text-xs md:text-sm">Bensin</th>
                                        <th className="py-2 md:py-3 px-2 md:px-4 text-left text-xs md:text-sm">Servis</th>
                                        <th className="py-2 md:py-3 px-2 md:px-4 text-left text-xs md:text-sm">Bersih</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {activities.map((activity) => {
                                        const netIncome = calculateNetIncome(activity.income, activity.fuel, activity.service);
                                        return (
                                            <tr key={activity.id} className="border-b border-gray-600 hover:bg-gray-600">
                                                <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm">
                                                    {new Date(activity.date).toLocaleDateString('id-ID', {
                                                        day: '2-digit',
                                                        month: 'short',
                                                        year: 'numeric'
                                                    })}
                                                </td>
                                                <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm">{activity.km}</td>
                                                <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm">{activity.orders}</td>
                                                <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm text-green-400">
                                                    {formatCurrency(activity.income)}
                                                </td>
                                                <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm text-red-400">
                                                    {formatCurrency(activity.fuel)}
                                                </td>
                                                <td className="py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm text-red-400">
                                                    {formatCurrency(activity.service)}
                                                </td>
                                                <td className={`py-2 md:py-3 px-2 md:px-4 text-xs md:text-sm font-medium ${netIncome >= 0 ? 'text-green-400' : 'text-red-400'
                                                    }`}>
                                                    {formatCurrency(netIncome)}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </MainLayout>
    );
}