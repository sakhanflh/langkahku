import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/registerPage";
import KeuanganPage from "./pages/keuanganPage";
import OjekTrackerPage from "./pages/ojekTrackerPage";
import { DashboardPage } from "./pages/DashboardPage";
import SessionExpiredModal from "./components/SessionExpiredModal";
import SettingPage from "./pages/SettingPage";
import MessageLikePage from "./pages/MessageLikePage";
import DonationPage from "./pages/DonationPage";


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
          path="/ojek-tracker"
          element={
            <ProtectedRoute>
              <MainLayout>
                <OjekTrackerPage />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/pengaturan"
          element={
            <ProtectedRoute>
              <SettingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dukungan/pesan"
          element={
            <ProtectedRoute>
              <MessageLikePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dukungan/donasi"
          element={
            <ProtectedRoute>
              <DonationPage />
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
