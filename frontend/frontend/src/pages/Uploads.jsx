import { useState } from "react";

export default function Uploads() {
  const [file, setFile] = useState(null);
  const [dataPreview, setDataPreview] = useState([]);

  // Handle file selection
  const handleFile = (selectedFile) => {
    if (!selectedFile) return;

    setFile(selectedFile);

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;

      const rows = text.split("\n").map((row) => row.split(","));
      setDataPreview(rows.slice(0, 5)); // preview first 5 rows
    };

    reader.readAsText(selectedFile);
  };

  // Drag & drop
  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");

    // TODO: Replace with API call
    console.log("Uploading file:", file);

    alert("File uploaded successfully!");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Data Uploads</h1>

      {/* Upload Box */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center bg-white"
      >
        <p className="text-gray-500 mb-4">
          Drag & drop your CSV file here or click to upload
        </p>

        <input
          type="file"
          accept=".csv"
          onChange={(e) => handleFile(e.target.files[0])}
          className="hidden"
          id="fileUpload"
        />

        <label
          htmlFor="fileUpload"
          className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
        >
          Upload File
        </label>

        {file && <p className="mt-4 text-green-600">Selected: {file.name}</p>}
      </div>

      {/* Preview */}
      {dataPreview.length > 0 && (
        <div className="mt-6 bg-white rounded-xl shadow p-4">
          <h2 className="font-semibold mb-3">Preview</h2>

          <table className="w-full text-sm">
            <tbody>
              {dataPreview.map((row, i) => (
                <tr key={i} className="border-t">
                  {row.map((cell, j) => (
                    <td key={j} className="p-2">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Upload Button */}
      {file && (
        <button
          onClick={handleUpload}
          className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
        >
          Confirm Upload
        </button>
      )}
    </div>
  );
}
