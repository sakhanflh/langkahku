import api from "./api"

export const tambahMood = async (data) => {
    const res = await api.post("/mood", data)
    return res.data
}

export const getMoods = async () => {
    const res = await api.get("/mood")
    return res.data
}

export const hapusMood = async (id) => {
    const res = await api.delete(`/mood/${id}`)
    return res.data
}