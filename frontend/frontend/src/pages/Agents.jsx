import { useEffect, useState } from "react";
import API from "../services/api";

export default function Agents() {
  const [agents, setAgents] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const [editAgent, setEditAgent] = useState(null); // 🔥 modal state
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchAgents();
  }, [search, page]); // ✅ MUST

  const fetchAgents = async () => {
    try {
      const res = await API.get(
        `/agents?search=${search}&page=${page}&limit=5`,
      );

      console.log("API DATA:", res.data); // 👈 debug

      setAgents(res.data.data); // ✅ IMPORTANT
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
    }
  };

  // ➕ Add
  const addAgent = async () => {
    await API.post("/agents", form);
    setForm({ name: "", email: "", phone: "" });
    fetchAgents();
  };

  // ❌ Delete
  const deleteAgent = async (id) => {
    await API.delete(`/agents/${id}`);
    fetchAgents();
  };

  // ✏️ Open Modal
  const openEdit = (agent) => {
    setEditAgent(agent);
  };

  // 💾 Update Agent
  const updateAgent = async () => {
    await API.put(`/agents/${editAgent._id}`, editAgent);
    setEditAgent(null);
    fetchAgents();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Agents</h1>

      {/* ➕ Add */}
      <div className="bg-white p-4 rounded-xl shadow mb-6 flex gap-4">
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <input
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="border p-2 rounded w-full"
        />

        <input
          placeholder="Search agents..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1); // reset page
          }}
        />

        <button
          onClick={addAgent}
          className="bg-indigo-600 text-white px-4 rounded"
        >
          Add
        </button>
      </div>

      {/* 📋 Table */}
      <div className="bg-white p-5 rounded-xl shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {agents.map((a) => (
              <tr key={a._id} className="border-b">
                <td>{a.name}</td>
                <td>{a.email}</td>
                <td>{a.phone}</td>
                <td className="text-green-500">{a.status || "Active"}</td>

                <td className="space-x-3">
                  <button onClick={() => openEdit(a)} className="text-blue-600">
                    Edit
                  </button>

                  <button
                    onClick={() => deleteAgent(a._id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🪟 MODAL */}
      {editAgent && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-96 shadow-xl">
            <h2 className="text-lg font-bold mb-4">Edit Agent</h2>

            <input
              value={editAgent.name}
              onChange={(e) =>
                setEditAgent({ ...editAgent, name: e.target.value })
              }
              className="border p-2 w-full mb-3 rounded"
            />

            <input
              value={editAgent.email}
              onChange={(e) =>
                setEditAgent({ ...editAgent, email: e.target.value })
              }
              className="border p-2 w-full mb-3 rounded"
            />

            <input
              value={editAgent.phone}
              onChange={(e) =>
                setEditAgent({ ...editAgent, phone: e.target.value })
              }
              className="border p-2 w-full mb-4 rounded"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditAgent(null)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>

              <button
                onClick={updateAgent}
                className="px-4 py-2 bg-indigo-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
