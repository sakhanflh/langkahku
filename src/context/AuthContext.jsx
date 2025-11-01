import { createContext, useContext, useState, useEffect } from "react";
import { checkAuth, logout } from "../services/authService";

const AuthContext = createContext();

export const showSessionExpiredModal = () => {
    window.dispatchEvent(new Event("sessionExpired"));
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [showSessionExpired, setShowSessionExpired] = useState(false);

    const verifyUser = async () => {
        try {
            const res = await checkAuth();

            if (res.success) {
                setUser(res.user);
            } else {
                setUser(false);
            }
        } catch (err) {
            console.error("Gagal verifikasi sesi:", err);
            setUser(null);
        }
    };

    useEffect(() => {
        verifyUser();
    }, []);

    const handleSessionExpired = async () => {
        await logout();
        setUser(null);
        setShowSessionExpired(true);
    };

    // ✅ Tambahan: dengarkan event global dari axios
    useEffect(() => {
        const handleSessionExpiredEvent = () => {
            handleSessionExpired();
        };

        window.addEventListener("sessionExpired", handleSessionExpiredEvent);
        return () => {
            window.removeEventListener("sessionExpired", handleSessionExpiredEvent);
        };
    }, []);

    return (
        <AuthContext.Provider
            value={{ user, setUser, showSessionExpired, setShowSessionExpired, handleSessionExpired }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
