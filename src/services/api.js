import axios from "axios";
import { showSessionExpiredModal } from "../context/AuthContext"; // fungsi dari context

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, // penting untuk cookies
});

// Interceptor request
api.interceptors.request.use(
    (config) => {
        // (optional, tidak perlu token manual karena pakai cookies)
        return config;
    },
    (error) => Promise.reject(error)
);

// Interceptor response
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            showSessionExpiredModal();
        }
        return Promise.reject(error);
    }
);

export default api;
