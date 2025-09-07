import api from "./api"

export const getTransaksi = async () => {
    const res = await api.get("/keuangan");
    return res.data;
};

export const tambahTransaksi = async (data) => {
    const res = await api.post("/keuangan", data);
    return res.data;
}

export const getTransaksiById = async (id) => {
    const res = await api.get(`/keuangan/${id}`);
    return res.data;
}

export const updateTransaksi = async (id, data) => {
    const res = await api.put(`/keuangan/${id}`, data);
    return res.data;
}

export const hapusTransaksi = async (id) => {
    const res = await api.delete(`/keuangan/${id}`);
    return res.data;
}