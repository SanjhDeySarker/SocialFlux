import { Menu, Sun, Moon } from "lucide-react";
import { useState } from "react";
import Sidebar from "./Sidebar";
import useDarkMode from "../hooks/useDarkMode";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useDarkMode();

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <header className="bg-white dark:bg-gray-800 dark:text-gray-100 shadow-sm p-4 flex justify-between items-center sticky top-0 z-10">
      <div className="flex items-center gap-2">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <Menu />
        </button>
        <h1 className="text-lg font-semibold">SocialFlux Dashboard</h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
          title="Toggle theme"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <span className="hidden sm:inline text-sm opacity-80">
          {theme === "dark" ? "Dark" : "Light"} Mode
        </span>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 md:hidden">
          <div className="absolute left-0 top-0 h-full bg-white dark:bg-gray-800 w-64 shadow-lg">
            <Sidebar />
          </div>
          <div
            className="absolute inset-0"
            onClick={() => setMobileOpen(false)}
          ></div>
        </div>
      )}
    </header>
  );
}
