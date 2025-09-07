// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

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

            if (response.data.success) {
                setMessage({
                    text: 'Registrasi berhasil! Silakan login.',
                    type: 'success'
                });

                // Reset form
                setFormData({
                    name: '',
                    email: '',
                    password: ''
                });
                navigate('/login');
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

    return (
        <div className="min-h-screen bg-gray-800 flex items-center justify-center p-4">
            <div className="bg-gray-700 rounded-xl p-6 md:p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-white text-center mb-6">Daftar Akun</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-gray-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Masukkan name"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-gray-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Masukkan email"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full bg-gray-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Masukkan password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg py-2 transition-colors duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                    >
                        {loading ? 'Mendaftarkan...' : 'Daftar'}
                    </button>
                </form>

                {message.text && (
                    <div className={`mt-4 p-3 rounded-lg text-sm ${message.type === 'success'
                        ? 'bg-green-500/20 text-green-300'
                        : 'bg-red-500/20 text-red-300'
                        }`}>
                        {message.text}
                    </div>
                )}

                <div className="mt-6 text-center">
                    <p className="text-gray-400 text-sm">
                        Sudah punya akun?{' '}
                        <Link
                            to="/login"
                            className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                        >
                            Login di sini
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};