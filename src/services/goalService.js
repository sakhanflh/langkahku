import api from "./api"

export const getGoals = async () => {
    const res = await api.get("/goals")
    return res.data
}

export const tambahGoal = async (data) => {
    const res = await api.post("/goals", data)
    return res.data
}

export const getGoalById = async (id) => {
    const res = await api.get(`/goals/${id}`)
    return res.data
}

export const updateGoal = async (id, data) => {
    const res = await api.put(`/goals/${id}`, data)
    return res.data
}

export const hapusGoal = async (id) => {
    const res = await api.delete(`/goals/${id}`)
    return res.data
}