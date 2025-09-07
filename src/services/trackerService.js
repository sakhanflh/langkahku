import api from "./api";


// CREATE
export const tambahTracker = async (data) => {
    const res = await api.post("/tracker", data);
    return res.data;
};

// READ
export const getTracker = async () => {
    const res = await api.get("/tracker")
    return res.data
};

// UPDATE
export const updateTracker = async (id, data) => {
    const res = await api.put(`/tracker/${id}`, data)
    return res.data
};

// DELETE
export const hapusTracker = async (id) => {
    const res = await api.delete(`/tracker/${id}`)
    return res.data
};
