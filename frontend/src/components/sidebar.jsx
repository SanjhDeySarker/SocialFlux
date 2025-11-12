import { NavLink } from "react-router-dom";
import { Home, Calendar, BarChart3, Bot, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { name: "Dashboard", path: "/", icon: Home },
  { name: "Scheduler", path: "/scheduler", icon: Calendar },
  { name: "Analytics", path: "/analytics", icon: BarChart3 },
  { name: "AI Assistant", path: "/ai", icon: Bot },
];

export default function Sidebar() {
  const { logout } = useAuth();

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 dark:text-gray-200 shadow-md hidden md:flex flex-col justify-between">
      <div>
        <div className="text-2xl font-bold text-blue-600 p-6 border-b dark:border-gray-700">
          SocialFlux
        </div>
        <nav className="flex flex-col p-4 space-y-2">
          {navItems.map(({ name, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded-md transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-gray-700"
                }`
              }
            >
              <Icon size={18} />
              {name}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="p-4 border-t dark:border-gray-700">
        <button
          onClick={logout}
          className="flex items-center gap-3 text-red-500 hover:text-red-700"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
