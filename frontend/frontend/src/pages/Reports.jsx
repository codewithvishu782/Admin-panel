export default function Reports() {
  const download = () => {
    window.open("http://localhost:5000/api/reports/download");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Reports</h1>

      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
        Download Report
      </button>
    </div>
  );
}
