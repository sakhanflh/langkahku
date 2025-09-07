import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/registerPage";
import KeuanganPage from "./pages/keuanganPage";
import GoalsAndTodoPage from "./pages/GoalsAndTodoPage";
import MoodPage from "./pages/moodPage";
import OjekTrackerPage from "./pages/ojekTrackerPage";
import { DashboardPage } from "./pages/DashboardPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MainLayout>
                <DashboardPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/keuangan"
          element={
            <ProtectedRoute>
              <MainLayout>
                <KeuanganPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/todo"
          element={
            <ProtectedRoute>
              <MainLayout>
                <GoalsAndTodoPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/mood"
          element={
            <ProtectedRoute>
              <MainLayout>
                <MoodPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/ojek-tracker"
          element={
            <ProtectedRoute>
              <MainLayout>
                <OjekTrackerPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
