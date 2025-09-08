import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

export default function MoodPage() {
    // State untuk form input
    const [moodScore, setMoodScore] = useState(3);
    const [moodNote, setMoodNote] = useState('');
    const [selectedMood, setSelectedMood] = useState('😐');

    // Data mood contoh
    const [moodData, setMoodData] = useState([
        { id: 1, date: "2025-09-02", mood: "😊", score: 5, note: "Order banyak, target tercapai" },
        { id: 2, date: "2025-09-01", mood: "😔", score: 2, note: "Motor mogok, pendapatan turun" },
        { id: 3, date: "2025-08-31", mood: "😊", score: 4, note: "Hari yang produktif" },
        { id: 4, date: "2025-08-30", mood: "😡", score: 1, note: "Ada pelanggan yang komplain" },
        { id: 5, date: "2025-08-29", mood: "😴", score: 3, note: "Lelah setelah bekerja seharian" },
        { id: 6, date: "2025-08-28", mood: "😊", score: 5, note: "Dapat bonus dari aplikasi" },
    ]);

    // Pilihan mood
    const moodOptions = [
        { emoji: "😊", label: "Senang", value: 5 },
        { emoji: "😐", label: "Biasa", value: 3 },
        { emoji: "😔", label: "Sedih", value: 2 },
        { emoji: "😡", label: "Marah", value: 1 },
        { emoji: "😴", label: "Lelah", value: 4 },
    ];

    // Handler untuk menambah data mood
    const handleAddMood = (e) => {
        e.preventDefault();
        const newMood = {
            id: moodData.length + 1,
            date: new Date().toISOString().split('T')[0],
            mood: selectedMood,
            score: moodScore,
            note: moodNote
        };

        setMoodData([newMood, ...moodData]);
        setMoodNote('');
        setMoodScore(3);
        setSelectedMood('😐');
    };

    // Data untuk line chart
    const lineChartData = moodData.map(entry => ({
        date: new Date(entry.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }),
        score: entry.score,
    })).reverse();

    // Data untuk pie chart
    const moodDistribution = moodData.reduce((acc, entry) => {
        const moodLabel = moodOptions.find(m => m.emoji === entry.mood)?.label || 'Lainnya';
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
                                    <div key={entry.id} className="flex items-start p-3 bg-gray-600 rounded-lg">
                                        <span className="text-2xl mr-3">{entry.mood}</span>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <span className="font-medium">
                                                    {new Date(entry.date).toLocaleDateString('id-ID', {
                                                        weekday: 'long',
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </span>
                                                <span className="text-blue-400 font-medium">{entry.score}/5</span>
                                            </div>
                                            <p className="text-gray-300 mt-1">{entry.note}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}