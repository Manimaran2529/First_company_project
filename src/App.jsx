import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";

// PAGES
import Dashboard from "./pages/Dashboard";
import Candidates from "./pages/Candidates";
import AptitudeRound from "./pages/AptitudeRound";
import TechnicalRound from "./pages/TechnicalRound";
import CodingRound from "./pages/CodingRound";
import HRRound from "./pages/HRRound";
import Analytics from "./pages/Analytics";

export default function App() {
  return (
    <BrowserRouter>

      <div className="flex bg-[#0B0F17] text-white min-h-screen">

        {/* SIDEBAR */}
        <Sidebar />

        {/* MAIN */}
        <div className="flex-1 overflow-y-auto p-4">

          <Routes>

            {/* MAIN */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/candidates" element={<Candidates />} />

            {/* ROUNDS */}
            <Route path="/aptitude" element={<AptitudeRound />} />
            <Route path="/technical" element={<TechnicalRound />} />
            <Route path="/coding" element={<CodingRound />} />
            <Route path="/hr-round" element={<HRRound />} />

            {/* REPORT */}
            <Route path="/analytics" element={<Analytics />} />

            {/* FALLBACK */}
            <Route path="*" element={<Dashboard />} />

          </Routes>

        </div>

      </div>

    </BrowserRouter>
  );
}