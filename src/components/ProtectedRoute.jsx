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
        return <div className="text-center mt-10">Memeriksa sesi...</div>;
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
};
