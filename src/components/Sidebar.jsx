import { LayoutDashboard, FileText, Globe, CheckSquare, Code, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-64 bg-[#111827] min-h-screen p-5 border-r border-gray-800 flex flex-col justify-between">

      <div>
        {/* Logo */}
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-gray-700 p-2 rounded-lg">👤</div>
          <div>
            <h1 className="text-white font-semibold">TalentFlow</h1>
            <p className="text-gray-400 text-sm">HR Portal</p>
          </div>
        </div>

        {/* Menu */}
        <div className="space-y-3 text-sm">

          <p className="text-gray-500">RECRUITMENT</p>

          {/* Dashboard */}
          <NavItem to="/" icon={<LayoutDashboard size={16}/>} text="Dashboard" active={isActive("/")} />

          {/* Candidates */}
          <NavItem 
            to="/candidates" 
            icon={<FileText size={16}/>} 
            text="Resumes" 
            badge="48"
            active={isActive("/candidates")}
          />

          {/* Schedule */}
          <NavItem 
            to="/schedule" 
            icon={<Globe size={16}/>} 
            text="Schedule" 
            active={isActive("/schedule")}
          />

          <p className="text-gray-500 mt-4">ROUNDS</p>

          {/* Aptitude */}
          <NavItem 
            to="/aptitude" 
            icon={<CheckSquare size={16}/>} 
            text="Aptitude Round" 
            badge="12"
            active={isActive("/aptitude")}
          />

          {/* Technical */}
          <NavItem 
            to="/technical" 
            icon={<Code size={16}/>} 
            text="Technical Round" 
            active={isActive("/technical")}
          />

          {/* Coding */}
          <NavItem 
            to="/coding" 
            icon={<Code size={16}/>} 
            text="Coding Round" 
            active={isActive("/coding")}
          />

          {/* HR */}
          <NavItem 
            to="/hr-round" 
            icon={<User size={16}/>} 
            text="HR Round" 
            active={isActive("/hr-round")}
          />

          <p className="text-gray-500 mt-4">REPORTS</p>

          <div className="text-gray-400 px-3 py-2 hover:bg-gray-800 rounded-lg cursor-pointer">
            Analytics
          </div>

        </div>
      </div>

      {/* Bottom Profile */}
      <div className="flex items-center gap-3">
        <div className="bg-gray-600 w-8 h-8 rounded-full flex items-center justify-center">
          SA
        </div>
        <div>
          <p className="text-sm text-white">Sneha Agarwal</p>
          <p className="text-xs text-gray-400">HR Manager</p>
        </div>
      </div>
    </div>
  );
}


/* 🔥 REUSABLE NAV ITEM */
function NavItem({ to, icon, text, badge, active }) {
  return (
    <Link to={to}>
      <div className={`flex items-center justify-between px-3 py-2 rounded-lg transition ${
        active
          ? "bg-white text-black"
          : "text-gray-400 hover:bg-gray-800"
      }`}>

        <span className="flex items-center gap-2">
          {icon} {text}
        </span>

        {badge && (
          <span className="bg-gray-700 px-2 text-xs rounded-full">
            {badge}
          </span>
        )}

      </div>
    </Link>
  );
}