import { useEffect, useState } from "react";
import API from "../services/api";

export default function Calls() {
  const [calls, setCalls] = useState([]);

  // ✅ NEW STATES (ADDED)
  const [customers, setCustomers] = useState([]);
  const [agents, setAgents] = useState([]);
  const [form, setForm] = useState({
    customer: "",
    agent: "",
  });

  useEffect(() => {
    fetchCalls();

    // ✅ NEW FETCHES (ADDED)
    fetchCustomers();
    fetchAgents();
  }, []);

  const fetchCalls = async () => {
    try {
      const res = await API.get("/calls");
      setCalls(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ NEW FUNCTIONS (ADDED)
  const fetchCustomers = async () => {
    const res = await API.get("/customers");
    setCustomers(res.data.data || res.data);
  };

  const fetchAgents = async () => {
    const res = await API.get("/agents");
    setAgents(res.data.data || res.data);
  };

  const createCall = async () => {
    try {
      await API.post("/calls", {
        customer: form.customer,
        agent: form.agent,
        status: "Pending",
      });

      setForm({ customer: "", agent: "" });
      fetchCalls();
    } catch (err) {
      console.error("Create error:", err);
    }
  };

  // ✅ EXISTING (UNCHANGED)
  const updateStatus = async (id, status) => {
    try {
      await API.put(`/calls/${id}`, { status });
      fetchCalls();
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Calls</h1>

      {/* 🔥 NEW CREATE CALL UI (ADDED) */}
      <div className="bg-white p-5 rounded-xl shadow mb-6">
        <h2 className="font-semibold mb-3">Create Call</h2>

        <div className="flex gap-4">
          <select
            value={form.customer}
            onChange={(e) => setForm({ ...form, customer: e.target.value })}
            className="border px-3 py-2 rounded w-full"
          >
            <option value="">Select Customer</option>
            {customers.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            value={form.agent}
            onChange={(e) => setForm({ ...form, agent: e.target.value })}
            className="border px-3 py-2 rounded w-full"
          >
            <option value="">Select Agent</option>
            {agents.map((a) => (
              <option key={a._id} value={a._id}>
                {a.name}
              </option>
            ))}
          </select>

          <button
            onClick={createCall}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Create
          </button>
        </div>
      </div>

      {/* ✅ EXISTING TABLE (UNCHANGED) */}
      <div className="bg-white p-5 rounded-xl shadow">
        <table className="w-full">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Agent</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {calls.length > 0 ? (
              calls.map((c) => (
                <tr key={c._id}>
                  <td>{c.customer?.name || "N/A"}</td>
                  <td>{c.agent?.name || "N/A"}</td>
                  <td>
                    <select
                      value={c.status}
                      onChange={(e) => updateStatus(c._id, e.target.value)}
                      className="border px-2 py-1 rounded"
                    >
                      <option>Pending</option>
                      <option>Interested</option>
                      <option>Not Interested</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4 text-gray-400">
                  No calls found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
