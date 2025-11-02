import React, { useEffect, useState } from 'react';
import { FiArrowLeft, FiMoon, FiGlobe, FiDroplet, FiPieChart, FiTarget, FiSave } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { getUserSetting, updateUserSetting } from '../services/settingService';

const SettingPage = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [language, setLanguage] = useState('id');

    const [fuelPrice, setFuelPrice] = useState('');
    const [savingPercentage, setSavingPercentage] = useState('');
    const [dailyTarget, setDailyTarget] = useState('');

    const [isSaving, setIsSaving] = useState(false);
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate();

    useEffect(() => {
        const fetchSetting = async () => {
            try {
                const data = await getUserSetting()
                setFuelPrice(data.fuelPrice || '')
                setSavingPercentage(data.savingPercentage || '')
            } catch (error) {
                console.error("Gagal memuat setting:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchSetting()
    }, [])

    const handleSave = async () => {
        setIsSaving(true)
        try {
            const payload = {
                fuelPrice: parseInt(fuelPrice),
                savingPercentage: parseInt(savingPercentage)
            }
            const res = await updateUserSetting(payload)
            console.log("Berhasil disimpan", res)
            alert("Pengaturan berasil disimpan!")
        } catch (error) {
            console.error("Gagal menyimpan pengaturan:", error)
            alert("Gagal menyimpan pengaturan!")
        } finally {
            setIsSaving(false)
        }
    }

    if (loading) return <div className="p-6 text-center text-gray-400">Memuat pengaturan...</div>;

    
    return (
        <div className="min-h-screen transition-colors duration-300">
            {/* Header */}
            <header className="bg-gray-800 shadow-sm border-b border-gray-700 sticky top-0 z-10">
                <div className="max-w-2xl mx-auto px-4 py-4 flex items-center">
                    <button
                        className="p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                        onClick={() => {
                            navigate("/dashboard")
                        }}
                    >
                        <FiArrowLeft className="w-5 h-5 " />
                    </button>
                    <h1 className="text-xl font-semibold ml-4">Setting</h1>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-2xl mx-auto px-4 py-6">
                {/* Section Umum */}
                <section className="mb-8">
                    <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-md">
                        <div className="px-6 py-4 border-b border-gray-700">
                            <h2 className="text-lg font-semibold">Umum</h2>
                        </div>

                        <div className="divide-y divide-gray-700">
                            {/* Dark Mode Toggle */}
                            <div className="px-6 py-4 flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 bg-blue-50 rounded-lg">
                                        <FiMoon className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium">Dark Mode</h3>
                                        <p className="text-sm text-gray-400">Tampilan gelap untuk kenyamanan mata</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setDarkMode(!darkMode)}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${darkMode ? 'bg-blue-600' : 'bg-gray-200'
                                        }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${darkMode ? 'translate-x-6' : 'translate-x-1'
                                            }`}
                                    />
                                </button>
                            </div>

                            {/* Language Dropdown */}
                            <div className="px-6 py-4">
                                <div className="flex items-center space-x-3 mb-3">
                                    <div className="p-2 bg-green-50 rounded-lg">
                                        <FiGlobe className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium">Bahasa</h3>
                                        <p className="text-sm text-gray-400">Pilih bahasa aplikasi</p>
                                    </div>
                                </div>
                                <select
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-700"
                                >
                                    <option value="id">Bahasa Indonesia</option>
                                    <option value="en">English</option>
                                    <option value="ja">日本語</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section Ojek Tracker Settings */}
                <section className="mb-8">
                    <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-md">
                        <div className="px-6 py-4 border-b border-gray-700">
                            <h2 className="text-lg font-semibold">Ojek Tracker Settings</h2>
                        </div>

                        <div className="space-y-6 p-6">
                            {/* Fuel Price Input */}
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

                            {/* Saving Percentage Input */}
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

                            {/* Daily Target Input */}
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

                {/* Save Button */}
                <div className="flex justify-end">
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className={`flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium transition-all duration-300 ${isSaving
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5'
                            }`}
                    >
                        {isSaving ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                <span>Menyimpan...</span>
                            </>
                        ) : (
                            <>
                                <FiSave className="w-4 h-4" />
                                <span>Simpan Perubahan</span>
                            </>
                        )}
                    </button>
                </div>
            </main>
        </div>
    );
};

export default SettingPage;