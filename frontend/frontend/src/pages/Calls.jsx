import { useEffect, useState } from "react";
import API from "../services/api";

export default function Calls() {
  const [calls, setCalls] = useState([]);

  useEffect(() => {
    fetchCalls();
  }, []);

  const fetchCalls = async () => {
    try {
      const res = await API.get("/calls");
      setCalls(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Calls</h1>

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
            {calls.map((c) => (
              <tr key={c._id}>
                <td>{c.customer?.name}</td>
                <td>{c.agent?.name}</td>
                <td>{c.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
