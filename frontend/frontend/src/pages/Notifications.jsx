const notifications = [
  { id: 1, text: "New customer added", time: "2 min ago" },
  { id: 2, text: "Agent Alex completed a call", time: "10 min ago" },
  { id: 3, text: "Report generated successfully", time: "1 hour ago" },
];

export default function Notifications() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>

      <div className="bg-white rounded-xl shadow p-5">
        {notifications.map((n) => (
          <div
            key={n.id}
            className="border-b py-3 flex justify-between text-sm"
          >
            <p>{n.text}</p>
            <span className="text-gray-400">{n.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
