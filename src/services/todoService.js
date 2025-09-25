import api from "./api"

export const getTodo = async () => {
    const res = await api.get("/todo")
    return res.data
}

export const addTodo = async (data) => {
    const res = await api.post("/todo", data)
    return res.data
}

export const updateTodo = async (id, data) => {
    const res = await api.put(`/todo/${id}`, data)
    return res.data
}

export const deleteTodo = async (id) => {
    const res = await api.delete(`/todo/${id}`)
    return res.data
}