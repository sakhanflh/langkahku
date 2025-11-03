import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { LiaDonateSolid } from 'react-icons/lia';
import { useNavigate } from 'react-router-dom';

const DonationPage = () => {
    const navigate = useNavigate()
    // Data dummy top donatur
    const topDonors = [
        { id: 1, name: 'Kinan', amount: 50000 },
        { id: 2, name: 'Eki', amount: 20000 },
        
    ];

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const getRankingIcon = (rank) => {
        switch (rank) {
            case 1:
                return '🥇';
            case 2:
                return '🥈';
            case 3:
                return '🥉';
            default:
                return `#${rank}`;
        }
    };

    const getRankingColor = (rank) => {
        switch (rank) {
            case 1:
                return 'from-yellow-500 to-yellow-600';
            case 2:
                return 'from-gray-400 to-gray-500';
            case 3:
                return 'from-orange-700 to-orange-800';
            default:
                return 'from-gray-700 to-gray-800';
        }
    };

    const handleOpenSaweria = () => {
        window.open('https://saweria.co/sakhanflh', '_blank');
    };

    return (
        <div className="min-h-screen bg-gray-900 py-8">
            <div className="max-w-5xl mx-auto p-6">
                <header className="sticky top-0 z-10 mb-3 bg-gray-900">
                    <div className="py-4 flex items-center">
                        <button onClick={() => { navigate("/pengaturan") }} className="p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200">
                            <FiArrowLeft className="w-5 h-5 " />
                        </button>
                        <h1 onClick={() => { navigate("/pengaturan") }} className="text-xl font-semibold ml-2 hover:text-gray-300 transition-colors duration-200 cursor-pointer">Kembali</h1>
                    </div>
                </header>
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex justify-center items-center mb-4">
                        <LiaDonateSolid className="w-12 h-12 text-yellow-400 mr-3" />
                        <h1 className="text-4xl font-bold text-white">Bagi-bagi Rezeki</h1>
                    </div>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Dukung kami melalui Saweria dan bantu kami terus berkembang.
                    </p>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Left Column - Donation Form */}
                    <div className="space-y-6">
                        <div className="bg-gray-800 border border-gray-600 rounded-xl p-8 shadow-lg">
                            <div className="text-center space-y-6">
                                {/* QR Code Section */}
                                <div className="space-y-4">
                                    <h3 className="text-2xl font-semibold text-white mb-2">
                                        Scan QR Code
                                    </h3>
                                    <div className="bg-white p-4 rounded-lg w-64 h-64 mx-auto flex justify-center items-center">
                                        <p className='text-justify text-black'>Mohon maaf QR sedang bermasalah, Silahkan menggunakan link saweria dibawah ini.</p>
                                    </div>
                                    <p className="text-gray-400 text-sm">
                                        Scan QR code di atas untuk donasi via QRIS
                                    </p>
                                </div>

                                {/* Divider */}
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-600"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-2 bg-gray-800 text-gray-400">atau</span>
                                    </div>
                                </div>

                                {/* Saweria Button */}
                                <button
                                    onClick={handleOpenSaweria}
                                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-yellow-500/25 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                                >
                                    <div className="flex items-center justify-center space-x-2">
                                        <svg
                                            className="w-6 h-6"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm4 0h-2v-6h2v6z" />
                                        </svg>
                                        <span className="text-lg">Buka Saweria</span>
                                    </div>
                                </button>

                                {/* Footer Text */}
                                <p className="text-gray-400 text-lg mt-6">
                                    Setiap dukungan kamu sangat berarti ☕
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Leaderboard */}
                    <div className="space-y-6">
                        <div className="bg-gray-800 border border-gray-600 rounded-xl p-6 shadow-lg">
                            <h2 className="text-2xl font-semibold text-white mb-6 text-center">
                                🏆 Top Donatur
                            </h2>

                            <div className="max-h-96 overflow-y-auto space-y-2 pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                                {topDonors.map((donor, index) => (
                                    <div
                                        key={donor.id}
                                        className={`bg-gradient-to-r ${getRankingColor(index + 1)} border border-gray-600 rounded-lg p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}
                                    >
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center space-x-4">
                                                <span className="text-white font-bold text-lg w-8">
                                                    {getRankingIcon(index + 1)}
                                                </span>
                                                <span className="text-white font-medium text-lg">
                                                    {donor.name}
                                                </span>
                                            </div>
                                            <span className="text-yellow-400 font-bold text-lg">
                                                {formatCurrency(donor.amount)}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Footer Leaderboard */}
                            <div className="mt-6 pt-4 border-t border-gray-600">
                                <p className="text-gray-400 text-center text-sm">
                                    Terima kasih atas dukungannya! 💝
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="mt-12 text-center">
                    <div className="bg-gray-800 border border-gray-600 rounded-xl p-6 ">
                        <p className="text-gray-300 leading-relaxed">
                            Setiap donasi yang kamu berikan akan membantu kami terus mengembangkan
                            aplikasi ini, menambahkan fitur-fitur baru, dan menjaga kualitas layanan
                            untuk semua pengguna. Dukunganmu adalah motivasi terbesar kami!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DonationPage;