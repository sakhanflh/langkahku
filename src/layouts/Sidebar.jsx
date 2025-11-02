import { useState } from "react";
import { AiFillDashboard } from "react-icons/ai";
import { FaMotorcycle } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { FiDollarSign, FiLogOut } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/authService";

export function Sidebar({ isOpen, setIsOpen }) {
    const navigate = useNavigate();
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleLogoutConfirm = async () => {
        await logout();
        setShowLogoutModal(false);
        navigate("/login");
        setIsOpen(false);
    };

    const menuItems = [
        { name: "Dashboard", icon: <AiFillDashboard size={20} />, path: "/" },
        { name: "Ojek Tracker", icon: <FaMotorcycle size={20} />, path: "/ojek-tracker" },
        { name: "Keuangan", icon: <FiDollarSign size={20} />, path: "/keuangan" },
        { name: "Pengaturan", icon: <IoSettingsSharp size={20} />, path: "/pengaturan" },
    ];

    return (
        <>
            {/* Overlay Sidebar */}
            {isOpen && (
                <div
                    className="fixed inset-0"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-full w-72 bg-gray-900 border-r border-gray-700 transform transition-transform duration-300 z-50
                ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                <div className="p-5">
                    <div className="flex items-center p-4 border-b border-gray-700">
                        <div className="flex items-center justify-center w-10 h-10 bg-blue-500 rounded-md mr-[2px]">
                            <span className="font-bold text-xl">M</span>
                        </div>
                        <h1 className="text-xl font-semibold">enu</h1>
                    </div>

                    <nav className="mt-6">
                        <ul>
                            {menuItems.map((item, index) => (
                                <li key={index} className="px-4 py-2">
                                    <Link
                                        to={item.path}
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center p-2 rounded-lg hover:bg-blue-500 hover:bg-opacity-20 transition-colors duration-200"
                                    >
                                        <span className="mr-3">{item.icon}</span>
                                        <span>{item.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="px-4 py-2 mt-32">
                        <button
                            onClick={() => setShowLogoutModal(true)}
                            className="flex w-full items-center p-2 rounded-lg text-red-500 hover:bg-red-500 hover:text-white hover:bg-opacity-20 transition-colors duration-200"
                        >
                            <FiLogOut size={20} className="mr-3" />
                            Logout
                        </button>
                    </div>
                </div>
            </aside>

            {/* Modal Konfirmasi Logout */}
            {showLogoutModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-[60] p-4">
                    <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700/50 p-8 w-full max-w-md transform transition-all duration-300 scale-100">
                        {/* Header dengan Icon */}
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center">
                                <svg
                                    className="w-6 h-6 text-red-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                    />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-white">Logout</h3>
                                <p className="text-gray-400 text-sm mt-1">
                                    Keluar dari akun Anda?
                                </p>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-gray-750 rounded-xl p-4 mb-6">
                            <p className="text-gray-300 text-sm leading-relaxed">
                                Anda akan dialihkan ke halaman login. Masuk kembali kapan saja untuk melanjutkan aktivitas.
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-3">
                            <button
                                onClick={() => setShowLogoutModal(false)}
                                className="flex-1 px-6 py-3.5 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-xl font-medium transition-all duration-200 hover:shadow-lg border border-gray-600"
                            >
                                Tetap Masuk
                            </button>
                            <button
                                onClick={handleLogoutConfirm}
                                className="flex-1 px-6 py-3.5 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-all duration-200 hover:shadow-lg hover:shadow-red-500/20 transform hover:-translate-y-0.5"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
