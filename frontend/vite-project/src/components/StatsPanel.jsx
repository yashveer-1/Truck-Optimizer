export default function StatsPanel() {
  return (
    <div className="p-3 space-y-4 text-sm">

      {/* 🔹 LAYER INFORMATION */}
      <div className="bg-[#0F213F] p-4 rounded-xl">
        <h2 className="text-gray-300 font-semibold mb-3">
          LAYER INFORMATION
        </h2>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span>Top Layer (3)</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Middle Layer (2)</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-400"></div>
            <span>Base Layer (1)</span>
          </div>
        </div>
      </div>

      {/* 🔹 LEGEND */}
      <div className="bg-[#0F213F] p-4 rounded-xl">
        <h2 className="text-gray-300 font-semibold mb-3">
          LEGEND (SKU GROUP)
        </h2>

        <div className="space-y-2">

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span>Drums (210L / 50L)</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-400 rounded"></div>
            <span>Pails / Buckets</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span>Grease Pails</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-purple-500 rounded"></div>
            <span>Cartons / Boxes</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span>Grease Blocks</span>
          </div>

        </div>
      </div>

      {/* 🔹 GAP ANALYSIS */}
      <div className="bg-[#0F213F] p-4 rounded-xl">
        <h2 className="text-gray-300 font-semibold mb-3">
          GAP ANALYSIS
        </h2>

        <div className="text-xs mb-3">
          <p>Total Unutilized Volume</p>
          <p className="text-red-400 font-semibold">
            8.4 m³ (29.9%)
          </p>
        </div>

        {/* Fake Pie Chart */}
        <div className="flex items-center gap-4">

          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 via-blue-400 to-yellow-400"></div>

          <div className="text-xs space-y-1">
            <p>🔵 Left Gap: 3.1 m³</p>
            <p>🟡 Top Gap: 4.0 m³</p>
            <p>🟣 Side Gap: 1.3 m³</p>
          </div>

        </div>
      </div>

      {/* 🔹 ACTIONS */}
      <div className="bg-[#0F213F] p-4 rounded-xl space-y-2">
        <h2 className="text-gray-300 font-semibold mb-2">
          ACTIONS
        </h2>

        <button className="w-full bg-blue-600 py-2 rounded">
          Optimize Load
        </button>

        <button className="w-full bg-[#132A4A] py-2 rounded">
          Rebuild Load
        </button>

        <button className="w-full bg-[#132A4A] py-2 rounded">
          Export Load Plan
        </button>

        <button className="w-full bg-[#132A4A] py-2 rounded">
          Print / Share
        </button>
      </div>

    </div>
  );
}