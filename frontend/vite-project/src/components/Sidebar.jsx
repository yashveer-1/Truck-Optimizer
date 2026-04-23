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

      setItems(data.placements);
      setStats(data.stats);

    } catch (err) {
      console.error(err);
      alert("Invalid JSON or server error");
    }
  };

  return (
    <div className="p-3 space-y-4 text-xs overflow-auto h-full">

      {/* LOAD PLAN DETAILS */}
      <div className="bg-[#0F213F] p-4 rounded-xl space-y-3">
        <h2 className="text-sm font-semibold text-gray-300">
          LOAD PLAN DETAILS
        </h2>

        <div className="space-y-2">
          <select className="w-full bg-[#132A4A] p-2 rounded">
            <option>KA01 AB 1234</option>
          </select>

          <select className="w-full bg-[#132A4A] p-2 rounded">
            <option>16 MT Open Body</option>
          </select>

          <select className="w-full bg-[#132A4A] p-2 rounded">
            <option>Bengaluru → Hosur → Krishnagiri → Dharmapuri</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#132A4A] p-3 rounded">
            <p className="text-gray-400">Total Weight</p>
            <p className="text-white font-semibold">8,920 / 9,000 kg</p>
            <div className="h-1 bg-gray-700 mt-2 rounded">
              <div className="h-1 bg-green-500 w-[99%] rounded"></div>
            </div>
          </div>

          <div className="bg-[#132A4A] p-3 rounded">
            <p className="text-gray-400">Total Volume</p>
            <p className="text-white font-semibold">19.6 / 28.0 m³</p>
            <div className="h-1 bg-gray-700 mt-2 rounded">
              <div className="h-1 bg-green-400 w-[70%] rounded"></div>
            </div>
          </div>

          <div className="bg-[#132A4A] p-3 rounded">
            <p>No. of Orders</p>
            <p className="text-white font-semibold">4</p>
          </div>

          <div className="bg-[#132A4A] p-3 rounded">
            <p>No. of Drops</p>
            <p className="text-white font-semibold">4</p>
          </div>
        </div>
      </div>

      {/* SKU LIST */}
      <div className="bg-[#0F213F] p-4 rounded-xl">
        <div className="flex justify-between mb-2">
          <h2 className="text-sm font-semibold text-gray-300">
            SKU LIST (12)
          </h2>
          <input
            placeholder="Search SKU"
            className="bg-[#132A4A] px-2 py-1 rounded text-xs"
          />
        </div>

        <table className="w-full text-xs text-gray-300">
          <thead>
            <tr className="text-gray-500 text-left">
              <th>SKU</th>
              <th>Qty</th>
              <th>Weight</th>
              <th>Vol</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Drum 210L</td>
              <td>22</td>
              <td>4620</td>
              <td>5.50</td>
            </tr>
            <tr>
              <td>Pail 20L</td>
              <td>40</td>
              <td>800</td>
              <td>1.60</td>
            </tr>
            <tr>
              <td>Pail 10L</td>
              <td>20</td>
              <td>240</td>
              <td>0.48</td>
            </tr>
            <tr>
              <td>Carton 4L</td>
              <td>120</td>
              <td>1200</td>
              <td>2.40</td>
            </tr>
          </tbody>
        </table>

        <div className="flex justify-between mt-3 border-t border-gray-700 pt-2">
          <span>Total</span>
          <span>422</span>
          <span>8,920</span>
          <span>19.88</span>
        </div>
      </div>

      {/* LOAD SEQUENCE */}
      <div className="bg-[#0F213F] p-4 rounded-xl">
        <h2 className="text-sm font-semibold text-gray-300 mb-2">
          LOAD SEQUENCE (For Delivery)
        </h2>

        <table className="w-full text-xs text-gray-300">
          <thead>
            <tr className="text-gray-500 text-left">
              <th>Seq</th>
              <th>Location</th>
              <th>Items</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>1</td>
              <td>Hosur</td>
              <td>Cartons, Pail 10L</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Krishnagiri</td>
              <td>Pail 20L</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Dharmapuri</td>
              <td>Drum 50L</td>
            </tr>
          </tbody>
        </table>

        <p className="text-gray-500 mt-2">
          Note: Load sequence is LIFO
        </p>
      </div>

      {/* 🔥 JSON LOADER (ONLY AT BOTTOM) */}
      <div className="bg-[#0F213F] p-4 rounded-xl space-y-2">
        <h2 className="text-sm font-semibold text-gray-300">
          LOAD DATA (JSON)
        </h2>

        <textarea
          className="w-full h-32 bg-[#132A4A] p-2 rounded text-xs"
          placeholder="Paste JSON here..."
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
        />

        <button
          onClick={handleLoad}
          className="w-full bg-blue-600 py-2 rounded text-white"
        >
          Load Data
        </button>
      </div>

    </div>
  );
}