import { useEffect, useState } from "react";
import { getKeuangan } from "../../services/keuanganService";
import { getTracker } from "../../services/trackerService";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function ChartWeekly() {
    const [pendapatanData, setPendapatanData] = useState([]);
    const [orderData, setOrderData] = useState([]);

    const getWeekOfMonth = (date) => Math.ceil(new Date(date).getDate() / 7);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const keuanganData = await getKeuangan();
                const trackerData = await getTracker();

                const today = new Date();
                const currentWeek = getWeekOfMonth(today);

                // ========================
                // Pendapatan Minggu Ini
                // ========================
                const keuanganMingguIni = keuanganData.filter(k => getWeekOfMonth(k.tanggal) === currentWeek);
                const pendapatanByDate = {};
                keuanganMingguIni.forEach(k => {
                    const day = new Date(k.tanggal).getDate();
                    pendapatanByDate[day] = (pendapatanByDate[day] || 0) + Number(k.pendapatan || 0);
                });
                const pendapatanChartData = Object.keys(pendapatanByDate)
                    .sort((a, b) => a - b)
                    .map(day => ({ day: `Tgl ${day}`, income: pendapatanByDate[day] }));

                // ========================
                // Orderan Minggu Ini
                // ========================
                const trackerMingguIni = trackerData.filter(t => getWeekOfMonth(t.tanggal) === currentWeek);
                const orderByDate = {};
                trackerMingguIni.forEach(t => {
                    const day = new Date(t.tanggal).getDate();
                    orderByDate[day] = (orderByDate[day] || 0) + Number(t.order || 0);
                });
                const orderChartData = Object.keys(orderByDate)
                    .sort((a, b) => a - b)
                    .map(day => ({ day: `Tgl ${day}`, orders: orderByDate[day] }));

                // Update state
                setPendapatanData(pendapatanChartData);
                setOrderData(orderChartData);

            } catch (error) {
                console.error("Gagal fetch chart data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Chart Pendapatan Minggu Ini */}
            <div className="bg-gray-700 rounded-xl shadow-lg p-4">
                <h3 className="text-gray-200 mb-2 font-semibold">Pendapatan Minggu Ini</h3>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={pendapatanData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                            <XAxis dataKey="day" stroke="#fff" />
                            <YAxis stroke="#fff" />
                            <Tooltip formatter={(value) => [`Rp ${value.toLocaleString()}`, 'Pendapatan']} />
                            <Legend />
                            <Line type="monotone" dataKey="income" stroke="#4ade80" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Chart Orderan Minggu Ini */}
            <div className="bg-gray-700 rounded-xl shadow-lg p-4">
                <h3 className="text-gray-200 mb-2 font-semibold">Orderan Minggu Ini</h3>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={orderData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                            <XAxis dataKey="day" stroke="#fff" />
                            <YAxis stroke="#fff" />
                            <Tooltip formatter={(value) => [value, 'Order']} />
                            <Legend />
                            <Line type="monotone" dataKey="orders" stroke="#60a5fa" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
