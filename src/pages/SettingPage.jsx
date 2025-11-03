import React, { useEffect, useState } from 'react';
import {
    FiArrowLeft, FiDroplet, FiPieChart, FiTarget, FiSave, FiCheck, FiX
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { getUserSetting, updateUserSetting } from '../services/settingService';
import { SupportSetting } from '../layouts/Settings/SupportSetting';
import { SkeletonLoading } from '../layouts/SkeletonLoading';

const SettingPage = () => {
    const [fuelPrice, setFuelPrice] = useState('');
    const [savingPercentage, setSavingPercentage] = useState('');
    const [dailyTarget, setDailyTarget] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSetting = async () => {
            try {
                const data = await getUserSetting();
                setFuelPrice(data.fuelPrice || '');
                setSavingPercentage(data.savingPercentage || '');
            } catch (error) {
                console.error("Gagal memuat setting:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSetting();
    }, []);

    const handleSave = async () => {
        setIsSaving(true);
        setSaveStatus(null);
        try {
            const payload = {
                fuelPrice: parseInt(fuelPrice),
                savingPercentage: parseInt(savingPercentage)
            };
            await updateUserSetting(payload);
            setSaveStatus('success');
        } catch (error) {
            console.error("Gagal menyimpan pengaturan:", error);
            setSaveStatus('error');
        } finally {
            setIsSaving(false);
            setTimeout(() => setSaveStatus(null), 3000);
        }
    };

    return (
        <div className="min-h-screen transition-colors duration-300">
            {/* Header */}
            <header className="bg-gray-800 shadow-sm border-b border-gray-700 sticky top-0 z-10">
                <div className="max-w-2xl mx-auto px-4 py-4 flex items-center">
                    <button
                        className="p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                        onClick={() => navigate("/dashboard")}
                    >
                        <FiArrowLeft className="w-5 h-5" />
                    </button>
                    <h1 className="text-xl font-semibold ml-4">Setting</h1>
                </div>
            </header>

            <main className="max-w-2xl mx-auto px-4 py-6">
                {/* Skeleton Loading */}
                {loading ? (
                    <div className="space-y-6">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6"
                            >
                                <SkeletonLoading width="40%" height="20px" className="mb-4" />
                                <SkeletonLoading width="100%" height="44px" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                        {/* Section Ojek Tracker Settings */}
                        <section className="mb-8">
                            <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-md">
                                <div className="px-6 py-4 border-b border-gray-700">
                                    <h2 className="text-lg font-semibold">Ojek Tracker Settings</h2>
                                </div>

                                <div className="space-y-6 p-6">
                                    {/* Harga Bensin */}
                                    <div>
                                        <label className="flex items-center space-x-3 mb-3">
                                            <div className="p-2 bg-orange-50 rounded-lg">
                                                <FiDroplet className="w-5 h-5 text-orange-600" />
                                            </div>
                                            <div>
                                                <h3 className="font-medium">Harga Bensin per Liter (Rp)</h3>
                                                <p className="text-sm text-gray-400">Harga bensin saat ini</p>
                                            </div>
                                        </label>
                                        <input
                                            type="number"
                                            value={fuelPrice}
                                            onChange={(e) => setFuelPrice(e.target.value)}
                                            placeholder="Contoh: 10000"
                                            className="w-full px-4 py-3 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        />
                                    </div>

                                    {/* Persentase Tabungan */}
                                    <div>
                                        <label className="flex items-center space-x-3 mb-3">
                                            <div className="p-2 bg-purple-50 rounded-lg">
                                                <FiPieChart className="w-5 h-5 text-purple-600" />
                                            </div>
                                            <div>
                                                <h3 className="font-medium">Persentase Tabungan (%)</h3>
                                                <p className="text-sm text-gray-400">Persentase pendapatan untuk ditabung</p>
                                            </div>
                                        </label>
                                        <input
                                            type="number"
                                            value={savingPercentage}
                                            onChange={(e) => setSavingPercentage(e.target.value)}
                                            placeholder="Contoh: 20"
                                            min="0"
                                            max="100"
                                            className="w-full px-4 py-3 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        />
                                    </div>

                                    {/* Target Harian */}
                                    <div>
                                        <label className="flex items-center space-x-3 mb-3">
                                            <div className="p-2 bg-red-50 rounded-lg">
                                                <FiTarget className="w-5 h-5 text-red-600" />
                                            </div>
                                            <div>
                                                <h3 className="font-medium">Target Pendapatan Harian (Rp)</h3>
                                                <p className="text-sm text-gray-400">Target harian (opsional)</p>
                                            </div>
                                        </label>
                                        <input
                                            type="number"
                                            value={dailyTarget}
                                            onChange={(e) => setDailyTarget(e.target.value)}
                                            placeholder="Contoh: 200000"
                                            className="w-full px-4 py-3 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Tombol Simpan */}
                        <div className="flex justify-end">
                            <button
                                onClick={handleSave}
                                disabled={isSaving}
                                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${saveStatus === 'success'
                                    ? 'bg-green-600 hover:bg-green-700 text-white'
                                    : saveStatus === 'error'
                                        ? 'bg-red-600 hover:bg-red-700 text-white'
                                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                                    } ${isSaving ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg transform hover:-translate-y-0.5'}`}
                            >
                                {isSaving ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        <span>Menyimpan...</span>
                                    </>
                                ) : saveStatus === 'success' ? (
                                    <>
                                        <FiCheck className="w-4 h-4" />
                                        <span>Berhasil Disimpan</span>
                                    </>
                                ) : saveStatus === 'error' ? (
                                    <>
                                        <FiX className="w-4 h-4" />
                                        <span>Gagal Menyimpan</span>
                                    </>
                                ) : (
                                    <>
                                        <FiSave className="w-4 h-4" />
                                        <span>Simpan Perubahan</span>
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Support Section */}
                        <section className="my-8">
                            <SupportSetting />
                        </section>
                    </>
                )}
            </main>
        </div>
    );
};

export default SettingPage;
