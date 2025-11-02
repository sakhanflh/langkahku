import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { FcGoogle } from 'react-icons/fc';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [message, setMessage] = useState({ text: '', type: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ text: '', type: '' });

        try {
            const response = await api.post('/auth/register', formData);

            if (response.status === 201) {
                setMessage({
                    text: 'Berhasil membuat akun! Mengarahkan ke halaman login...',
                    type: 'success'
                });

                setFormData({
                    name: '',
                    email: '',
                    password: ''
                });

                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            }
        } catch (error) {
            console.error('Register error:', error);
            setMessage({
                text: error.response?.data?.message || 'Terjadi kesalahan saat registrasi',
                type: 'error'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleRegister = () => {
        // Implement Google register logic here
        console.log("Google register clicked");
        setMessage({
            text: "Fitur registrasi Google akan segera tersedia",
            type: "info",
        });
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-4">
                    <h1 className="text-3xl font-bold text-white mb-2">LANGKAHKU</h1>
                    <p className="text-gray-400">Buat akun baru Anda</p>
                </div>

                {/* Google Register Button */}
                <button
                    onClick={handleGoogleRegister}
                    className="w-full bg-white hover:bg-gray-100 text-gray-800 font-medium rounded-xl py-3 px-4 transition-all duration-200 flex items-center justify-center space-x-3 mb-6 border border-gray-300 hover:shadow-lg"
                >
                    <FcGoogle size={20} />
                    <span>Daftar dengan Google</span>
                </button>

                {/* Divider */}
                <div className="relative flex items-center justify-center mb-6">
                    <div className="border-t border-gray-600 flex-grow"></div>
                    <span className="px-4 text-gray-500 text-sm">atau</span>
                    <div className="border-t border-gray-600 flex-grow"></div>
                </div>

                {/* Register Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                            Nama
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-gray-700 border border-gray-600 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                            placeholder="Masukkan nama anda"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-gray-700 border border-gray-600 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                            placeholder="email@contoh.com"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full bg-gray-700 border border-gray-600 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                            placeholder="Buat password yang kuat"
                            required
                        />
                    </div>

                    {/* Terms and Conditions */}
                    <div className="flex items-start space-x-3 text-sm">
                        <input
                            type="checkbox"
                            id="terms"
                            className="mt-1 w-4 h-4 bg-gray-700 border-gray-600 rounded focus:ring-emerald-500 focus:ring-offset-gray-800"
                            required
                        />
                        <label htmlFor="terms" className="text-gray-400">
                            Saya menyetujui{' '}
                            <Link to="/terms" className="text-emerald-400 hover:text-emerald-300">
                                Syarat & Ketentuan
                            </Link>{' '}
                            dan{' '}
                            <Link to="/privacy" className="text-emerald-400 hover:text-emerald-300">
                                Kebijakan Privasi
                            </Link>
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl py-3 px-4 transition-all duration-200 flex items-center justify-center ${loading
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:shadow-lg transform hover:-translate-y-0.5"
                            }`}
                    >
                        {loading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                Membuat Akun...
                            </>
                        ) : (
                            "Buat Akun"
                        )}
                    </button>
                </form>

                {/* Message Alert */}
                {message.text && (
                    <div
                        className={`mt-6 p-4 rounded-xl border text-sm ${message.type === "success"
                            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                            : message.type === "error"
                                ? "bg-red-500/10 border-red-500/30 text-red-400"
                                : "bg-blue-500/10 border-blue-500/30 text-blue-400"
                            }`}
                    >
                        {message.text}
                    </div>
                )}

                {/* Footer Links */}
                <div className="mt-8 text-center">
                    <p className="text-gray-400 text-sm">
                        Sudah punya akun?{' '}
                        <Link
                            to="/login"
                            className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors duration-200"
                        >
                            Masuk di sini
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}