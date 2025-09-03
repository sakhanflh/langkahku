import { BrowserRouter, Route, Routes } from "react-router-dom"
import DashboardPage from "./pages/dashboardPage"
import KeuanganPage from "./pages/keuanganPage"
import GoalsAndTodoPage from "./pages/goalsAndTodoPage"
import MoodPage from "./pages/moodPage"
import OjekTrackerPage from "./pages/ojekTrackerPage"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/keuangan" element={<KeuanganPage />} />
          <Route path="/todo" element={<GoalsAndTodoPage />} />
          <Route path="/mood" element={<MoodPage />} />
          <Route path="/ojek-tracker" element={<OjekTrackerPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
