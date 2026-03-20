import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="bg-white px-6 py-4 flex justify-between items-center shadow-sm">
      <h1 className="text-lg font-semibold">Dashboard</h1>

      <div className="flex items-center gap-4">
        <input
          placeholder="Search..."
          className="border px-3 py-2 rounded-lg"
        />

        <Bell size={20} />

        {/* Profile + Logout */}
        <div className="flex items-center gap-2">
          <img
            src="https://i.pravatar.cc/40"
            className="rounded-full"
            alt="profile"
          />

          <button
            onClick={handleLogout}
            className="text-sm text-red-500 hover:text-red-600 font-medium"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
