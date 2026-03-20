import axios from "axios";
import { useState } from "react";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const login = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form,
      );

      localStorage.setItem("token", res.data.token);
      window.location.href = "/";
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT SIDE (Branding) */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-indigo-600 to-purple-700 text-white flex-col justify-center px-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to Admin Panel 🚀</h1>
        <p className="text-lg text-indigo-100">
          Manage your agents, customers and analytics in one powerful dashboard.
        </p>
      </div>

      {/* RIGHT SIDE (Login) */}
      <div className="flex flex-1 items-center justify-center bg-white px-6">
        <div className="w-full max-w-md">
          {/* Logo / Title */}
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Sign in to your account
          </h2>
          <p className="text-gray-500 mb-6">
            Enter your credentials to continue
          </p>

          {/* Error */}
          {error && (
            <div className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm">
              {error}
            </div>
          )}

          {/* Email */}
          <input
            type="email"
            placeholder="Email address"
            className="w-full mb-4 px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          {/* Password */}
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-sm text-gray-500"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Remember + Forgot */}
          <div className="flex justify-between items-center mb-6 text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Remember me
            </label>

            <span className="text-indigo-600 cursor-pointer hover:underline">
              Forgot password?
            </span>
          </div>

          {/* Button */}
          <button
            onClick={login}
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          {/* Footer */}
          <p className="text-center text-gray-500 text-sm mt-6">
            Admin access only
          </p>
        </div>
      </div>
    </div>
  );
}
