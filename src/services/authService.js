import api from "./api";

export const login = async (credentials) => {
    const res = await api.post("/auth/login", credentials);
    return res.data;
};

export const register = async (userData) => {
    const res = await api.post("/auth/register", userData);
    return res.data;
};

export const checkAuth = async () => {
    try {
        const res = await api.get("/auth/check");
        return { success: true, user: res.data.user };
    } catch (err) {
        return { success: false };
    }
};

export const logout = () => {
    localStorage.removeItem("token");
};
