import { useState } from "react";

export default function Sidebar({ setItems, setStats }) {
  const [jsonInput, setJsonInput] = useState("");

  const handleLoad = async () => {
    try {
      const parsed = JSON.parse(jsonInput);

      const res = await fetch("http://localhost:5000/optimize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(parsed)
      });

      const data = await res.json();

      console.log("API RESPONSE:", data);

      setItems([...data.placements]); // ✅ important
      setStats(data.stats);           // ✅ now works

    } catch (err) {
      console.error(err);
      alert("Error processing data");
    }
  };

  return (
    <div className="p-4 space-y-4">

      <h1 className="text-xl font-bold">Truck Optimizer</h1>

      <textarea
        className="w-full h-40 bg-gray-800 p-2 rounded"
        placeholder="Paste JSON here..."
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      />

      <button
        onClick={handleLoad}
        className="w-full bg-blue-600 py-2 rounded-xl"
      >
        Load Data
      </button>

    </div>
  );
}