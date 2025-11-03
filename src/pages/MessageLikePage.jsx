import React, { useState, useEffect, useRef } from 'react';
import { FiArrowLeft, FiHeart } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { createSupport, getSupports, toggleLike } from '../services/supportMessageService';
import { FaHeart } from 'react-icons/fa';

const MessageLikePage = () => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [formData, setFormData] = useState({ name: "", message: "" });
    const [isAutoScrolling, setIsAutoScrolling] = useState(true);
    const messagesContainerRef = useRef(null);

    // ✅ Ambil data dari BE
    useEffect(() => {
        fetchSupports();
    }, []);

    const fetchSupports = async () => {
        try {
            const data = await getSupports();
            setMessages(data);
        } catch (error) {
            console.error("Gagal mengambil data dukungan:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // ✅ Kirim pesan dukungan baru ke BE
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name.trim() || !formData.message.trim()) return;

        try {
            await createSupport(formData);
            setFormData({ name: "", message: "" });
            fetchSupports(); // refresh daftar
        } catch (error) {
            console.error("Gagal mengirim dukungan:", error);
        }
    };

    // ✅ Tambahkan like ke BE
    const handleLike = async (id) => {
        try {
            await toggleLike(id);
            fetchSupports();
        } catch (error) {
            console.error("Gagal menambah like:", error);
        }
    };

    // Auto-scroll (biarkan sama seperti sebelumnya)
    useEffect(() => {
        if (!isAutoScrolling || !messagesContainerRef.current || messages.length === 0) return;

        const container = messagesContainerRef.current;
        const scrollHeight = container.scrollHeight;
        const clientHeight = container.clientHeight;

        if (scrollHeight > clientHeight) {
            const scrollInterval = setInterval(() => {
                if (container.scrollTop >= scrollHeight - clientHeight) {
                    container.scrollTo({ top: 0, behavior: "smooth" });
                } else {
                    container.scrollBy({ top: 1, behavior: "smooth" });
                }
            }, 50);
            return () => clearInterval(scrollInterval);
        }
    }, [isAutoScrolling, messages.length]);

    const toggleAutoScroll = () => {
        setIsAutoScrolling(!isAutoScrolling);
    };

    const pinnedMessage = messages.find((msg) => msg.pinned);
    const unpinnedMessages = messages.filter((msg) => !msg.pinned);


    return (
        <div className="min-h-screen bg-gray-900 py-8">
            <div className="max-w-5xl mx-auto px-5">
                {/* Header */}
                <header className="sticky top-0 z-10 mb-3 bg-gray-900">
                    <div className="py-4 flex items-center">
                        <button onClick={() => navigate("/pengaturan")} className="p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200">
                            <FiArrowLeft className="w-5 h-5" />
                        </button>
                        <h1 onClick={() => navigate("/pengaturan")} className="text-xl font-semibold ml-2 hover:text-gray-300 cursor-pointer">
                            Kembali
                        </h1>
                    </div>
                </header>

                {/* Main Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Kiri - Form */}
                    <div className="space-y-6">
                        <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
                            <h2 className="text-xl font-semibold text-white mb-4">Kirim Pesan Dukungan</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Nama kamu"
                                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    rows="4"
                                    placeholder="Tulis pesan dukungan kamu..."
                                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 resize-none"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200"
                                >
                                    Kirim Dukungan
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Kanan - Pesan */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-white">Pesan Dukungan ({messages.length})</h2>
                            <button
                                onClick={toggleAutoScroll}
                                className={`px-3 py-1 rounded-lg text-sm transition-colors duration-200 ${isAutoScrolling ? 'bg-blue-600 text-white' : 'bg-gray-600 text-gray-300'
                                    }`}
                            >
                                {isAutoScrolling ? 'Auto Scroll On' : 'Auto Scroll Off'}
                            </button>
                        </div>

                        <div className="relative">
                            {/* ✅ Pinned Message */}
                            {pinnedMessage && (
                                <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-2 border-blue-500 rounded-xl p-4 relative mb-4">
                                    <div className="absolute -top-2 -left-2 bg-blue-500 rounded-full p-1">
                                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M16 12V4H17V2H7V4H8V12L6 14V16H11.2V22H12.8V16H18V14L16 12Z" />
                                        </svg>
                                    </div>

                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-semibold text-white text-lg flex items-center">
                                            {pinnedMessage.name}
                                            <span className="ml-2 text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
                                                Disematkan
                                            </span>
                                        </h3>
                                        <button
                                            onClick={() => handleLike(pinnedMessage._id)}
                                            className="flex items-center space-x-1 text-gray-300 hover:text-red-400 transition-colors duration-200 group"
                                        >
                                            {pinnedMessage.likedByCurrentUser ? (
                                                <FaHeart className="text-red-500 w-5 h-5" />
                                            ) : (
                                                <FiHeart className="text-gray-400 w-5 h-5" />
                                            )}
                                            <span className="text-sm">{pinnedMessage.likes}</span>
                                        </button>

                                    </div>
                                    <p className="text-gray-200 leading-relaxed">{pinnedMessage.message}</p>
                                </div>
                            )}

                            {/* ✅ Scrollable Unpinned Messages */}
                            <div
                                ref={messagesContainerRef}
                                className="max-h-80 overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
                                style={{ maxHeight: '320px' }}
                            >
                                {unpinnedMessages.map((msg) => (
                                    <div
                                        key={msg._id}
                                        className="bg-gray-700 border border-gray-600 rounded-xl p-4 hover:border-gray-500 transition-all duration-200"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-semibold text-white text-lg">{msg.name}</h3>
                                            <button
                                                onClick={() => handleLike(msg._id)}
                                                className="flex items-center space-x-1 text-gray-300 hover:text-red-400 transition-colors duration-200 group"
                                            >
                                                {msg.likedByCurrentUser ? (
                                                    <FaHeart className="text-red-500 w-5 h-5" />
                                                ) : (
                                                    <FiHeart className="text-gray-400 w-5 h-5" />
                                                )}
                                                <span className="text-sm">{msg.likes}</span>
                                            </button>
                                        </div>
                                        <p className="text-gray-300 leading-relaxed">{msg.message}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessageLikePage;
