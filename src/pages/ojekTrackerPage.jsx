import { useEffect, useState } from 'react';
import HeaderSection from '../layouts/Ojek/HeaderSection';
import ActivityForm from '../layouts/Ojek/ActivityForm';
import LineChartComponent from '../layouts/Ojek/LineChartComponent';
import ActivityHistory from '../layouts/Ojek/ActivityHistory';
import { calculateNetIncome } from '../components/utils/formatters';
import { getTracker, hapusTracker, tambahTracker, updateTracker } from '../services/trackerService';
import { SkeletonLoading } from '../layouts/SkeletonLoading';

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
            console.error("Gagal mengambil data:", err);
        } finally {
            setLoading(false);
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
            });

            setActivities([res.data, ...activities]);
        } catch (err) {
            console.error("Gagal menambahkan data", err);
        }
    };

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
        <div className="min-h-screen bg-gray-800 text-gray-100 md:p-6">
            <HeaderSection />

            {loading ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Skeleton Form */}
                    <div className="lg:col-span-1">
                        <div className="bg-gray-700 rounded-xl shadow-lg p-4 space-y-4">
                            <SkeletonLoading width="50%" height="1.2rem" />
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="space-y-2">
                                    <SkeletonLoading width="70%" height="0.9rem" />
                                    <SkeletonLoading width="100%" height="2rem" />
                                </div>
                            ))}
                            <SkeletonLoading width="100%" height="2.5rem" />
                        </div>
                    </div>

                    {/* Skeleton Chart & History */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Chart Skeleton */}
                        <div className="bg-gray-700 rounded-xl shadow-lg p-4">
                            <SkeletonLoading width="40%" height="1.2rem" className="mb-4" />
                            <SkeletonLoading width="100%" height="200px" />
                        </div>

                        {/* History Table Skeleton */}
                        <div className="bg-gray-700 rounded-xl shadow-lg p-4">
                            <SkeletonLoading width="30%" height="1.2rem" className="mb-4" />
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="flex justify-between py-2 border-b border-gray-600">
                                    {[...Array(6)].map((__, j) => (
                                        <SkeletonLoading key={j} width={`${15 + j * 5}%`} height="0.9rem" />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1">
                        <ActivityForm
                            formData={formData}
                            setFormData={setFormData}
                            onAddActivity={handleAddActivity}
                        />
                    </div>

                    <div className="lg:col-span-2 space-y-6">
                        <LineChartComponent chartData={chartData} />
                        <ActivityHistory
                            activities={activities}
                            onDeleteActivity={handleDeleteActivity}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
