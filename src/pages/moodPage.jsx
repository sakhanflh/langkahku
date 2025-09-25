import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { getMoods, hapusMood, tambahMood } from '../services/moodService';

export default function MoodPage() {
    // State untuk form input
    const [moodScore, setMoodScore] = useState(3);
    const [moodNote, setMoodNote] = useState('');
    const [selectedMood, setSelectedMood] = useState('😔');
    const [moodData, setMoodData] = useState([]);

    // State modal delete
    const [showModal, setShowModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    // Pilihan mood
    const moodOptions = [
        { emoji: "😊", label: "Senang", value: 5 },
        { emoji: "😐", label: "Tenang", value: 4 },
        { emoji: "😔", label: "Sedih", value: 3 },
        { emoji: "😡", label: "Marah", value: 2 },
        { emoji: "😴", label: "Lelah", value: 1 },
    ];

    const fetchMoods = async () => {
        try {
            const res = await getMoods();
            setMoodData(res);
        } catch (error) {
            console.error("Gagal fetch moods:", error.response?.data || error.message);
        }
    };

    useEffect(() => {
        fetchMoods();
    }, []);

    const handleAddMood = async (e) => {
        e.preventDefault();
        try {
            const newMood = {
                mood: moodOptions.find(m => m.emoji === selectedMood).label.toLowerCase(),
                catatan: moodNote,
            };
            await tambahMood(newMood);
            fetchMoods();
            setMoodNote('');
            setSelectedMood('😔');
            setMoodScore(3);
        } catch (error) {
            console.error("Gagal tambah mood:", error.response?.data || error.message);
        }
    };

    const handleDelete = async () => {
        try {
            await hapusMood(deleteId);
            setMoodData(moodData.filter((m) => m._id !== deleteId));
            setShowModal(false);
            setDeleteId(null);
        } catch (error) {
            console.error("Gagal hapus mood:", error);
        }
    };

    // Data untuk line chart
    const lineChartData = moodData.map(entry => ({
        date: new Date(entry.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }),
        score: moodOptions.find(m => m.label.toLowerCase() === entry.mood.toLowerCase())?.value || 0,
    })).reverse();

    // Data untuk pie chart
    const moodDistribution = moodData.reduce((acc, entry) => {
        const moodLabel = entry.mood.charAt(0).toUpperCase() + entry.mood.slice(1);
        acc[moodLabel] = (acc[moodLabel] || 0) + 1;
        return acc;
    }, {});

    const pieChartData = Object.entries(moodDistribution).map(([name, value]) => ({
        name,
        value
    }));

    // Warna untuk pie chart
    const COLORS = ['#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#0EA5E9'];

    return (
        <div className="min-h-screen bg-gray-800 text-gray-100 md:p-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <h1 className="text-2xl font-bold">Mood & Refleksi</h1>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-4 py-2 transition-colors">
                    + Catat Mood
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Form Input Mood */}
                <div className="lg:col-span-1">
                    <div className="bg-gray-700 rounded-2xl shadow-lg p-5 mb-6">
                        <h2 className="text-xl font-semibold mb-4">Catat Mood Hari Ini</h2>

                        <form onSubmit={handleAddMood}>
                            {/* Pilihan Mood */}
                            <div className="mb-4">
                                <label className="block text-gray-300 mb-2">Bagaimana perasaan Anda hari ini?</label>
                                <div className="flex justify-between">
                                    {moodOptions.map((mood) => (
                                        <button
                                            key={mood.emoji}
                                            type="button"
                                            className={`text-2xl p-2 rounded-full ${selectedMood === mood.emoji ? 'bg-gray-600 ring-2 ring-blue-500' : 'hover:bg-gray-600'}`}
                                            onClick={() => {
                                                setSelectedMood(mood.emoji);
                                                setMoodScore(mood.value);
                                            }}
                                        >
                                            {mood.emoji}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Skala Mood */}
                            <div className="mb-4">
                                <label className="block text-gray-300 mb-2">Skala Mood (1-5)</label>
                                <div className="flex items-center">
                                    <span className="text-sm text-gray-400 mr-2">1</span>
                                    <input
                                        type="range"
                                        min="1"
                                        max="5"
                                        value={moodScore}
                                        onChange={(e) => setMoodScore(parseInt(e.target.value))}
                                        className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                                    />
                                    <span className="text-sm text-gray-400 ml-2">5</span>
                                </div>
                                <div className="text-center mt-1">
                                    <span className="text-blue-400 font-medium">{moodScore}</span>
                                    <span className="text-gray-400">/5</span>
                                </div>
                            </div>

                            {/* Refleksi */}
                            <div className="mb-4">
                                <label className="block text-gray-300 mb-2">Refleksi Singkat</label>
                                <textarea
                                    value={moodNote}
                                    onChange={(e) => setMoodNote(e.target.value)}
                                    className="w-full bg-gray-600 text-gray-100 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows="3"
                                    placeholder="Tuliskan refleksi singkat tentang hari Anda..."
                                ></textarea>
                            </div>

                            {/* Tombol Simpan */}
                            <button
                                type="submit"
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg py-2 transition-colors"
                            >
                                Simpan
                            </button>
                        </form>
                    </div>

                    {/* Statistik Mood */}
                    <div className="bg-gray-700 rounded-2xl shadow-lg p-5">
                        <h2 className="text-xl font-semibold mb-4">Distribusi Mood</h2>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={pieChartData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    >
                                        {pieChartData.map((entry, index) => (
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

                {/* Riwayat Mood dan Grafik */}
                <div className="lg:col-span-2">
                    {/* Line Chart */}
                    <div className="bg-gray-700 rounded-2xl shadow-lg p-5 mb-6">
                        <h2 className="text-xl font-semibold mb-4">Tren Mood Mingguan</h2>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    data={lineChartData}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                                    <XAxis dataKey="date" stroke="#9CA3AF" />
                                    <YAxis domain={[0, 5]} stroke="#9CA3AF" />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#F3F4F6' }}
                                        itemStyle={{ color: '#F3F4F6' }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="score"
                                        stroke="#3B82F6"
                                        strokeWidth={2}
                                        activeDot={{ r: 8 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Riwayat Mood */}
                    <div className="bg-gray-700 rounded-2xl shadow-lg p-5">
                        <h2 className="text-xl font-semibold mb-4">Riwayat Mood</h2>
                        <div className="space-y-3">
                            {moodData.map((entry) => (
                                <div key={entry._id} className="flex items-start p-3 bg-gray-600 rounded-lg">
                                    <span className="text-2xl mr-3">
                                        {moodOptions.find(m => m.label.toLowerCase() === entry.mood.toLowerCase())?.emoji}
                                    </span>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <span className="font-medium">
                                                {new Date(entry.tanggal).toLocaleDateString('id-ID', {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </span>
                                            <span className="text-blue-400 font-medium">
                                                {moodOptions.find(m => m.label.toLowerCase() === entry.mood.toLowerCase())?.value}/5
                                            </span>
                                        </div>
                                        <p className="text-gray-300 mt-1">{entry.catatan}</p>
                                    </div>
                                    <button
                                        onClick={() => { setShowModal(true); setDeleteId(entry._id); }}
                                        className="ml-3 text-red-400 hover:text-red-600"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Konfirmasi Delete */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-80">
                        <h3 className="text-lg font-semibold mb-4">Yakin ingin menghapus?</h3>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-500"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                            >
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
