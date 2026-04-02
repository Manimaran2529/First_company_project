import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Candidates from "./pages/Candidates";
import Schedule from "./pages/Schedule";
import AptitudeRound from "./pages/AptitudeRound";




export default function App() {
  return (
    <BrowserRouter>
      <div className="flex bg-[#0B0F17] text-white min-h-screen">
        
        <Sidebar />

        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/candidates" element={<Candidates />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/aptitude" element={<AptitudeRound />} />
          </Routes>
        </div>

      </div>
    </BrowserRouter>
  );
}