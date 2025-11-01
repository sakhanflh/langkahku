import api from "./api";

export const getKeuangan = async () => {
    try {
        const response = await api.get("/keuangan");
        return response.data;
    } catch (error) {
        console.error("Gagal mengambil data keuangan:", error.response?.data || error.message);
        throw error;
    }
};

export const tambahPengeluaranManual = async ({ keuanganId, kategori, nominal, catatan }) => {
    try {
        const response = await api.post("/keuangan/pengeluaran", { keuanganId, kategori, nominal, catatan });
        return response.data;
    } catch (error) {
        console.error("Gagal menambah pengeluaran manual:", error.response?.data || error.message);
        throw error;
    }
};

export const editPengeluaranManual = async ({ keuanganId, pengeluaranId, kategori, nominal, catatan }) => {
    try {
        const response = await api.put("/keuangan/pengeluaran/edit", { keuanganId, pengeluaranId, kategori, nominal, catatan });
        return response.data;
    } catch (error) {
        console.error("Gagal mengedit pengeluaran manual:", error.response?.data || error.message);
        throw error;
    }
};

export const hapusPengeluaranManual = async ({ keuanganId, pengeluaranId }) => {
    try {
        const response = await api.delete("/keuangan/pengeluaran/delete", { data: { keuanganId, pengeluaranId } });
        return response.data;
    } catch (error) {
        console.error("Gagal menghapus pengeluaran manual:", error.response?.data || error.message);
        throw error;
    }
};
