import API from "../services/api";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Analytics() {
  const [stats, setStats] = useState({
    totalCalls: 0,
    successRate: 0,
    avgDuration: "0m",
  });

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await API.get("/calls");

      const calls = res.data;
      const total = calls.length;
      const success = calls.filter((c) => c.status === "Interested").length;

      setStats({
        totalCalls: total,
        successRate: total > 0 ? ((success / total) * 100).toFixed(1) : 0,
        avgDuration: "2m 10s",
      });

      const grouped = {};

      calls.forEach((call) => {
        const date = new Date(call.createdAt).toLocaleDateString();
        if (!grouped[date]) grouped[date] = 0;
        grouped[date]++;
      });

      const formatted = Object.keys(grouped).map((date) => ({
        date,
        calls: grouped[date],
      }));

      setChartData(formatted);
    } catch (err) {
      console.error("Analytics error:", err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Analytics</h1>

      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-5 rounded-xl shadow">
          <p>Total Calls</p>
          <h2 className="text-2xl font-bold">{stats.totalCalls}</h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p>Success Rate</p>
          <h2 className="text-2xl font-bold">{stats.successRate}%</h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p>Avg Duration</p>
          <h2 className="text-2xl font-bold">{stats.avgDuration}</h2>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="font-semibold mb-4">Performance Trend</h2>

        <div className="h-64">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line dataKey="calls" stroke="#22c55e" />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center text-gray-500">
              No analytics data available
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
