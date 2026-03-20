export default function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white/70 backdrop-blur-lg p-5 rounded-3xl shadow-lg border flex justify-between items-center transition hover:shadow-xl">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h2 className="text-2xl font-bold text-gray-800 mt-1">{value}</h2>
      </div>

      <div className="bg-indigo-100 text-indigo-600 p-3 rounded-xl">{icon}</div>
    </div>
  );
}
