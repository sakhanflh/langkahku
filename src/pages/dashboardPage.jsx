import React, { useState } from 'react';
import {
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from 'recharts';

const DashboardPage = () => {
    // Data untuk ringkasan cepat
    const [summaryData] = useState([
        { id: 1, title: 'Pendapatan Hari Ini', value: 'Rp 350.000', icon: '💰', color: 'bg-green-500' },
        { id: 2, title: 'Km Ditempuh', value: '127 km', icon: '🛵', color: 'bg-blue-500' },
        { id: 3, title: 'Goals Tercapai', value: '3/5', icon: '🎯', color: 'bg-purple-500' },
        { id: 4, title: 'Mood Hari Ini', value: '😊 (7/10)', icon: '😊', color: 'bg-yellow-500' },
    ]);

    // Data untuk grafik pendapatan mingguan
    const [weeklyIncomeData] = useState([
        { day: 'Sen', income: 280000 },
        { day: 'Sel', income: 320000 },
        { day: 'Rab', income: 400000 },
        { day: 'Kam', income: 350000 },
        { day: 'Jum', income: 420000 },
        { day: 'Sab', income: 550000 },
        { day: 'Min', income: 480000 },
    ]);

    // Data untuk distribusi mood
    const [moodData] = useState([
        { name: 'Senang', value: 45 },
        { name: 'Biasa', value: 30 },
        { name: 'Sedih', value: 15 },
        { name: 'Lelah', value: 10 },
    ]);

    // Data untuk to-do & goals
    const [todoData] = useState([
        { id: 1, task: 'Mencapai target pendapatan Rp 400.000', completed: true },
        { id: 2, task: 'Servis rutin motor ojek', completed: false },
        { id: 3, task: 'Menabung Rp 200.000', completed: false },
        { id: 4, task: 'Olahraga 30 menit', completed: true },
        { id: 5, task: 'Membaca 1 artikel pengembangan diri', completed: true },
    ]);

    // Warna untuk pie chart
    const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444'];

    return (
        <div className="min-h-screen bg-gray-800 p-4 md:p-6">
            {/* Header */}
            <header className="mb-6">
                <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                <p className="text-gray-400">Ringkasan aktivitas dan pencapaian Anda</p>
            </header>

            {/* Ringkasan Cepat */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {summaryData.map((item) => (
                    <div key={item.id} className="bg-gray-700 rounded-xl shadow-lg p-4 flex items-center">
                        <div className={`${item.color} w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl mr-4`}>
                            {item.icon}
                        </div>
                        <div>
                            <h3 className="text-sm text-gray-200">{item.title}</h3>
                            <p className="text-lg font-semibold">{item.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Statistik */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Line Chart: Pendapatan Mingguan */}
                <div className="bg-gray-700 rounded-xl shadow-lg p-4">
                    <h2 className="text-lg font-semibold mb-4">Pendapatan Mingguan</h2>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={weeklyIncomeData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="day" />
                                <YAxis
                                    tickFormatter={(value) => `Rp ${value / 1000}rb`}
                                />
                                <Tooltip
                                    formatter={(value) => [`Rp ${value.toLocaleString()}`, 'Pendapatan']}
                                />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="income"
                                    stroke="#3B82F6"
                                    strokeWidth={2}
                                    name="Pendapatan"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Pie Chart: Distribusi Mood */}
                <div className="bg-gray-700 rounded-xl shadow-lg p-4">
                    <h2 className="text-lg font-semibold mb-4">Distribusi Mood</h2>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={moodData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {moodData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* To-Do & Goals */}
            <div className="bg-gray-700 rounded-xl shadow-lg p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">To-Do & Goals</h2>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
                        Lihat Semua
                    </button>
                </div>
                <ul className="divide-y divide-gray-200">
                    {todoData.slice(0, 5).map((item) => (
                        <li key={item.id} className="py-3 flex items-center">
                            <span className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${item.completed ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'}`}>
                                {item.completed && '✓'}
                            </span>
                            <span className={item.completed ? 'line-through text-gray-500' : ''}>
                                {item.task}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default DashboardPage;