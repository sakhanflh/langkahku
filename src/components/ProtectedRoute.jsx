import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import SessionExpiredModal from "./SessionExpiredModal";
import api from "../services/api";

export function ProtectedRoute({ children }) {
    const [isValid, setIsValid] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [redirect, setRedirect] = useState(false);
    
    useEffect(() => {
        const checkSession = async () => {
            try {
                const res = await api.get("/auth/check", {
                    withCredentials: true,
                });
                if (res.data.success) {
                    setIsValid(true);
                }
            } catch (err) {
                setIsValid(false);
                setShowModal(true);
            }
        };
        checkSession();
    }, []);

    const handleCloseModal = () => {
        setShowModal(false);
        setRedirect(true);
    };

    if (isValid === null) {
        return (
            <div className="min-h-screen bg-gray-800 flex items-center justify-center p-4">
                <div className="text-center space-y-8">
                    {/* Elegant Spinner */}
                    <div className="relative mx-auto w-16 h-16">
                        {/* Pulsing Core */}
                        <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-20"></div>

                        {/* Rotating Ring */}
                        <div className="absolute inset-0 border-2 border-gray-600 border-t-blue-400 rounded-full animate-spin"></div>
                    </div>

                    {/* Content */}
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <p className="text-gray-200 text-sm font-light uppercase tracking-wider animate-pulse">
                                Memeriksa Sesi
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (redirect) {
        return <Navigate to="/login" replace />;
    }

    if (!isValid) {
        return (
            <>
                {showModal && <SessionExpiredModal onClose={handleCloseModal} />}
            </>
        );
    }

    return children;
}