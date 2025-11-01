import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function SessionExpiredModal() {
    const { showSessionExpired, setShowSessionExpired } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const handleEvent = () => setShowSessionExpired(true);
        window.addEventListener("sessionExpired", handleEvent);
        return () => window.removeEventListener("sessionExpired", handleEvent);
    }, [setShowSessionExpired]);

    if (!showSessionExpired) return null;

    return (
        <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg p-6 w-[90%] max-w-sm text-center">
                <h2 className="text-white text-lg font-semibold mb-3">
                    Sesi Anda telah berakhir
                </h2>
                <p className="text-gray-300 mb-4 text-sm">
                    Silakan login ulang untuk melanjutkan.
                </p>
                <button
                    onClick={() => {
                        setShowSessionExpired(false);
                        navigate("/login");
                    }}
                    className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2"
                >
                    Login Ulang
                </button>
            </div>
        </div>
    );
}

export default SessionExpiredModal;
