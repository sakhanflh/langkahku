import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }) {
    const isAuthenticated = !!localStorage.getItem("token");

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
}
