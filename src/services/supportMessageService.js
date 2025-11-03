import api from "./api"; // import instance axios-mu

export const getSupports = async () => {
    try {
        const res = await api.get("/support-message");
        return res.data;
    } catch (err) {
        console.error("Gagal mengambil data dukungan:", err);
        throw err;
    }
};

// ✅ Kirim pesan dukungan baru
export const createSupport = async (data) => {
    try {
        const res = await api.post("/support-message", data);
        return res.data;
    } catch (err) {
        console.error("Gagal mengirim dukungan:", err);
        throw err;
    }
};

export const toggleLike = async (id) => {
    try {
        const res = await api.patch(`/support-message/${id}/like`, {}, { withCredentials: true });
        return res.data;
    } catch (error) {
        console.error("Gagal toggle like:", error.response?.data || error.message);
        throw error;
    }
};
