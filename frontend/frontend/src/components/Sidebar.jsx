import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  User,
  PhoneCall,
  BarChart3,
  FileText,
  Upload,
  Bell,
  Settings,
  Menu,
  Sun,
  Moon,
} from "lucide-react";
import { useState } from "react";

export default function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const mainMenu = [
    { name: "Dashboard", path: "/", icon: <LayoutDashboard size={18} /> },
    { name: "Agents", path: "/agents", icon: <User size={18} /> },
    { name: "Customers", path: "/customers", icon: <Users size={18} /> },
    { name: "Calls", path: "/calls", icon: <PhoneCall size={18} /> },
    { name: "Analytics", path: "/analytics", icon: <BarChart3 size={18} /> },
    { name: "Reports", path: "/reports", icon: <FileText size={18} /> },
    { name: "Uploads", path: "/uploads", icon: <Upload size={18} /> },
  ];

  const bottomMenu = [
    {
      name: "Notifications",
      path: "/notifications",
      icon: <Bell size={18} />,
      badge: true,
    },
    { name: "Settings", path: "/settings", icon: <Settings size={18} /> },
  ];

  return (
    <div
      className={`h-screen flex flex-col justify-between transition-all duration-300
      ${collapsed ? "w-20" : "w-64"}
      ${darkMode ? "bg-slate-900 text-white" : "bg-white text-gray-800"}
      border-r`}
    >
      {/* Top */}
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          {!collapsed && <h1 className="text-lg font-bold">SCANMONK</h1>}

          <button onClick={() => setCollapsed(!collapsed)}>
            <Menu size={20} />
          </button>
        </div>

        {/* Main Menu */}
        <div className="space-y-2">
          {mainMenu.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition
                  ${
                    isActive
                      ? "bg-indigo-600 text-white"
                      : "hover:bg-slate-800 hover:text-white"
                  }
                `}
              >
                {item.icon}
                {!collapsed && item.name}
              </Link>
            );
          })}
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-gray-600"></div>

        {/* Bottom Menu */}
        <div className="space-y-2">
          {bottomMenu.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition
                  ${
                    isActive
                      ? "bg-indigo-600 text-white"
                      : "hover:bg-slate-800 hover:text-white"
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  {!collapsed && item.name}
                </div>

                {/* 🔴 Notification Badge */}
                {item.badge && !collapsed && (
                  <span className="bg-red-500 text-xs px-2 py-0.5 rounded-full">
                    3
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="p-4 space-y-4">
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-slate-700 transition"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          {!collapsed && (darkMode ? "Light Mode" : "Dark Mode")}
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-800">
          <img
            src="https://i.pravatar.cc/40"
            className="w-8 h-8 rounded-full"
          />
          {!collapsed && (
            <div>
              <p className="text-sm font-semibold">Sarah</p>
              <p className="text-xs text-green-400">Active</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
