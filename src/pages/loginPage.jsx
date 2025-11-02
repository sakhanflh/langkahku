import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [message, setMessage] = useState({ text: "", type: "" });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setUser } = useAuth();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ text: "", type: "" });

        try {
            const response = await login(formData);
            setUser(response.user);
            setMessage({
                text: response.message || "Login berhasil! Mengarahkan ke dashboard...",
                type: "success",
            });

            setTimeout(() => navigate("/dashboard"), 1000);
        } catch (error) {
            setMessage({
                text: error.response?.data?.message || "Gagal login",
                type: "error",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        // Implement Google login logic here
        console.log("Google login clicked");
        setMessage({
            text: "Fitur login Google akan segera tersedia",
            type: "info",
        });
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-5">
            <div className="w-full max-w-md ">
                {/* Header */}
                <div className="text-center mb-4">
                    <h1 className="text-3xl font-bold text-white mb-2">LANGKAHKU</h1>
                    <p className="text-gray-400">Masuk ke akun Anda</p>
                </div>

                {/* Google Login Button */}
                <button
                    onClick={handleGoogleLogin}
                    className="w-full bg-white hover:bg-gray-100 text-gray-800 font-medium rounded-xl py-3 px-4 transition-all duration-200 flex items-center justify-center space-x-3 mb-6 border border-gray-300 hover:shadow-lg"
                >
                    <FcGoogle size={20} />
                    <span>Lanjutkan dengan Google</span>
                </button>

                {/* Divider */}
                <div className="relative flex items-center justify-center mb-6">
                    <div className="border-t border-gray-600 flex-grow"></div>
                    <span className="px-4 text-gray-500 text-sm">atau</span>
                    <div className="border-t border-gray-600 flex-grow"></div>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
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
                            className="w-full bg-gray-700 border border-gray-600 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
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
                            className="w-full bg-gray-700 border border-gray-600 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                            placeholder="Masukkan password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl py-3 px-4 transition-all duration-200 flex items-center justify-center ${loading
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:shadow-lg transform hover:-translate-y-0.5"
                            }`}
                    >
                        {loading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                Memproses...
                            </>
                        ) : (
                            "Masuk"
                        )}
                    </button>
                </form>

                {/* Message Alert */}
                {message.text && (
                    <div
                        className={`mt-6 p-4 rounded-xl border text-sm ${message.type === "success"
                            ? "bg-green-500/10 border-green-500/30 text-green-400"
                            : message.type === "error"
                                ? "bg-red-500/10 border-red-500/30 text-red-400"
                                : "bg-blue-500/10 border-blue-500/30 text-blue-400"
                            }`}
                    >
                        {message.text}
                    </div>
                )}

                {/* Footer Links */}
                <div className="mt-8 text-center space-y-3">
                    <p className="text-gray-400 text-sm">
                        Belum punya akun?{" "}
                        <Link
                            to="/register"
                            className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
                        >
                            Daftar di sini
                        </Link>
                    </p>

                    <Link
                        to="/forgot-password"
                        className="text-gray-400 hover:text-gray-300 text-sm transition-colors duration-200 block"
                    >
                        Lupa password?
                    </Link>
                </div>
            </div>
        </div>
    );
}