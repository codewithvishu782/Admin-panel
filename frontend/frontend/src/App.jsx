import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Agents from "./pages/Agents";
import Customers from "./pages/Customers";
import Calls from "./pages/Calls";
import Analytics from "./pages/Analytics";
import Uploads from "./pages/Uploads";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import Reports from "./pages/Reports";

// Protected Route
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🔐 LOGIN ROUTE */}
        <Route path="/login" element={<Login />} />

        {/* 🔐 PROTECTED ROUTES */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className="flex h-screen bg-slate-100">
                <Sidebar />

                <div className="flex-1 flex flex-col">
                  <Navbar />

                  <div className="p-6 overflow-y-auto">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/agents" element={<Agents />} />
                      <Route path="/customers" element={<Customers />} />
                      <Route path="/calls" element={<Calls />} />
                      <Route path="/analytics" element={<Analytics />} />
                      <Route path="/reports" element={<Reports />} />
                      <Route path="/uploads" element={<Uploads />} />
                      <Route
                        path="/notifications"
                        element={<Notifications />}
                      />
                      <Route path="/settings" element={<Settings />} />
                    </Routes>
                  </div>
                </div>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
