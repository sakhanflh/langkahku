import { useEffect, useState } from 'react';
import HeaderSection from '../layouts/Ojek/HeaderSection';
import ActivityForm from '../layouts/Ojek/ActivityForm';
import LineChartComponent from '../layouts/Ojek/LineChartComponent';
import BarChartComponent from '../layouts/Ojek/BarChartComponent';
import ActivityHistory from '../layouts/Ojek/ActivityHistory';
import { calculateNetIncome } from '../components/utils/formatters';
import { getTracker, hapusTracker, tambahTracker, updateTracker } from '../services/trackerService';

export default function OjekTrackerPage() {
    const [formData, setFormData] = useState({
        tanggal: new Date().toISOString().split('T')[0],
        km: '',
        order: '',
        pendapatan: '',
        avgKmPerLiter: '',
        bensin: '',
        servis: '',
        pendapatanBersih: ''
    });

    // Data aktivitas contoh
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchActivites();
    }, []);

    const fetchActivites = async () => {
        try {
            const res = await getTracker();
            setActivities(res);
        } catch (err) {
            console.error("Gagal mengambil data:", err)
        } finally {
            setLoading(false)
        }
    };

    const handleAddActivity = async (newActivity) => {
        try {
            const res = await tambahTracker({
                tanggal: newActivity.tanggal,
                km: Number(newActivity.km),
                order: Number(newActivity.order),
                pendapatan: Number(newActivity.pendapatan),
                avgKmPerLiter: Number(newActivity.avgKmPerLiter),
                servis: Number(newActivity.servis || 0),
            })

            setActivities([res.data, ...activities])
        } catch (err) {
            console.error("Gagal menambahkan data", err)
        }
    }

    const handleDeleteActivity = async (id) => {
        try {
            await hapusTracker(id);
            setActivities(activities.filter((act) => act._id !== id));
        } catch (error) {
            console.error("Gagal menghapus data:", error);
        }
    };

    const handleUpdateActivity = async (id, updatedActivity) => {
        try {
            const res = await updateTracker(id, {
                tanggal: updatedActivity.tanggal,
                km: Number(updatedActivity.km),
                order: Number(updatedActivity.order),
                pendapatan: Number(updatedActivity.pendapatan),
                avgKmPerLiter: Number(updatedActivity.avgKmPerLiter),
                servis: Number(updatedActivity.servis || 0),
            });

            setActivities(
                activities.map((act) => (act._id === id ? res.data : act))
            );
        } catch (error) {
            console.error("Gagal update data:", error);
        }
    };


    const chartData = activities.map(activity => ({
        tanggal: new Date(activity.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }),
        km: activity.km,
        order: activity.order,
        pendapatan: activity.pendapatan,
        bensin: activity.bensin,
        servis: activity.servis,
        net: calculateNetIncome(activity.pendapatan, activity.bensin, activity.servis)
    })).reverse();

    return (
        <div className="min-h-screen bg-gray-800 text-gray-100 p-4 md:p-6">
            <HeaderSection />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Form Input Aktivitas */}
                <div className="lg:col-span-1">
                    <ActivityForm
                        formData={formData}
                        setFormData={setFormData}
                        onAddActivity={handleAddActivity}
                    />
                </div>

                {/* Grafik dan Riwayat */}
                <div className="lg:col-span-2">
                    {loading ? (
                        <p>loading data...</p>
                    ) : (
                        <>
                            <LineChartComponent chartData={chartData} />
                            <BarChartComponent chartData={chartData} />
                            <ActivityHistory activities={activities} />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}