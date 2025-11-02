import { useEffect, useState } from "react";
import { getKeuangan } from "../../services/keuanganService";
import { getTracker } from "../../services/trackerService";
import { MdSavings } from "react-icons/md";
import { AiFillDashboard } from "react-icons/ai";
import { FaMoneyBillTransfer, FaMoneyBillTrendUp } from "react-icons/fa6";

export function SummaryCards() {
    const [summaryData, setSummaryData] = useState([
        { id: 1, title: 'Pendapatan Hari Ini', value: 'Rp 0', icon: <FaMoneyBillTrendUp className="text-yellow-700"/>, color: 'bg-green-500' },
        { id: 2, title: 'Pengeluaran Hari Ini', value: 'Rp 0', icon: <FaMoneyBillTransfer />, color: 'bg-purple-500' },
        { id: 3, title: 'Km Ditempuh Minggu Ini', value: '0 km', icon: <AiFillDashboard />, color: 'bg-blue-500' },
        { id: 4, title: 'Total Tabungan Minggu Ini', value: 'Rp 0', icon: <MdSavings />, color: 'bg-yellow-500' },
    ]);

    const getWeekOfMonth = (date) => {
        const d = new Date(date);
        const day = d.getDate();
        return Math.ceil(day / 7); 
    };

    const fetchSummary = async () => {
        try {
            const keuanganData = await getKeuangan();
            const trackerData = await getTracker();

            const today = new Date();
            const currentWeek = getWeekOfMonth(today);

            const keuanganHariIniArray = keuanganData.filter(k => {
                const tgl = new Date(k.tanggal);
                return tgl.getFullYear() === today.getFullYear() &&
                    tgl.getMonth() === today.getMonth() &&
                    tgl.getDate() === today.getDate();
            });

            const pendapatanHariIni = keuanganHariIniArray.reduce(
                (sum, k) => sum + Number(k.pendapatan || 0),
                0
            );

            const pengeluaranHariIni = keuanganHariIniArray.reduce((sum, k) => {
                const manual = (k.pengeluaranManual || []).reduce((s, p) => s + Number(p.nominal), 0);
                return sum + Number(k.bensin || 0) + manual;
            }, 0);

            const kmDitempuhHariIni = trackerData.reduce((sum, item) => sum + Number(item.km), 0);

            const keuanganMingguIni = keuanganData.filter(k => getWeekOfMonth(k.tanggal) === currentWeek);
            const totalTabunganMingguIni = keuanganMingguIni.reduce((sum, k) => sum + Number(k.tabungan || 0), 0);

            setSummaryData([
                { 
                    id: 1, 
                    title: 'Pendapatan Hari Ini', 
                    value: `Rp ${pendapatanHariIni.toLocaleString()}`, 
                    icon: <FaMoneyBillTrendUp className="text-white"/>, 
                    color: 'bg-green-500'
                },
                { 
                    id: 2, 
                    title: 'Pengeluaran Hari Ini', 
                    value: `Rp ${pengeluaranHariIni.toLocaleString()}`, 
                    icon: <FaMoneyBillTransfer className="text-white"/>, 
                    color: 'bg-red-500'
                },
                { 
                    id: 3, 
                    title: 'Km Ditempuh Minggu Ini', 
                    value: `${kmDitempuhHariIni} km`, 
                    icon: <AiFillDashboard className="text-white"/>, 
                    color: 'bg-blue-500'
                },
                { 
                    id: 4, 
                    title: 'Total Tabungan Minggu Ini', 
                    value: `Rp ${totalTabunganMingguIni.toLocaleString()}`, 
                    icon: <MdSavings className="text-white"/>, 
                    color: 'bg-emerald-500'
                },
            ]);
        } catch (error) {
            console.error("Gagal mengambil summary:", error);
        }
    };

    useEffect(() => {
        fetchSummary();
    }, []);

    return (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {summaryData.map((item) => (
                <div key={item.id} className="bg-gray-700 rounded-xl shadow-lg p-4 flex items-center">
                    <div className={`${item.color} hidden w-10 h-10 md:w-12 md:h-12 rounded-lg md:flex items-center justify-center text-white text-xl mr-4`}>
                        {item.icon}
                    </div>
                    <div>
                        <h3 className="text-xs md:text-sm text-gray-200">{item.title}</h3>
                        <p className="text-sm md:text-lg font-semibold">{item.value}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
