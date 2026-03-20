import API from "../services/api";
import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { Users, User, PhoneCall, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [stats, setStats] = useState({
    agents: 0,
    customers: 0,
    calls: 0,
    successRate: 0,
  });

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchStats();
    fetchCalls();
  }, []);

  const fetchStats = async () => {
    const agents = await API.get("/agents");
    const customers = await API.get("/customers");
    const calls = await API.get("/calls");

    const total = calls.data.length;
    const success = calls.data.filter((c) => c.status === "Interested").length;

    setStats({
      agents: agents.data.length,
      customers: customers.data.length,
      calls: total,
      successRate: total ? ((success / total) * 100).toFixed(1) : 0,
    });
  };

  const fetchCalls = async () => {
    const res = await API.get("/calls");

    const grouped = {};
    res.data.forEach((c) => {
      const d = new Date(c.createdAt).toLocaleDateString();
      grouped[d] = (grouped[d] || 0) + 1;
    });

    setChartData(
      Object.keys(grouped).map((d) => ({ date: d, calls: grouped[d] })),
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
          Dashboard
        </h1>
        <p className="text-gray-500 text-sm">
          Welcome back — here’s what’s happening today.
        </p>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        {[
          { title: "Agents", value: stats.agents, icon: <Users /> },
          { title: "Customers", value: stats.customers, icon: <User /> },
          { title: "Calls", value: stats.calls, icon: <PhoneCall /> },
          {
            title: "Success",
            value: `${stats.successRate}%`,
            icon: <TrendingUp />,
          },
        ].map((card, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <StatCard {...card} />
          </motion.div>
        ))}
      </div>

      {/* Chart */}
      <motion.div
        className="bg-white/70 backdrop-blur-lg p-6 rounded-3xl shadow-xl border border-gray-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Performance Overview
        </h2>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                dataKey="calls"
                stroke="#6366f1"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
}
