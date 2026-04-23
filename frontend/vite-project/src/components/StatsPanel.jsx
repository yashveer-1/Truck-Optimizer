export default function StatsPanel({ stats }) {
  return (
    <div className="p-4 space-y-4">
      
      {/* Space Utilization */}
      <div className="bg-gray-800 p-4 rounded-xl">
        <p className="text-gray-400">Space Utilization</p>
        <h2 className="text-2xl font-bold text-green-400">
          {stats.spaceUtilization || 0}%
        </h2>
      </div>

      {/* Total Items */}
      <div className="bg-gray-800 p-4 rounded-xl">
        <p className="text-gray-400">Items Loaded</p>
        <h2 className="text-2xl font-bold">
          {stats.totalItems || 0}
        </h2>
      </div>

      {/* Weight */}
      <div className="bg-gray-800 p-4 rounded-xl">
        <p className="text-gray-400">Total Weight</p>
        <h2 className="text-2xl font-bold">
          {stats.totalWeight || 0} kg
        </h2>
      </div>

      {/* Legend */}
      <div className="bg-gray-800 p-4 rounded-xl">
        <p className="text-gray-400 mb-2">Legend</p>

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500"></div>
          <span>High Priority</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-400"></div>
          <span>Medium Priority</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500"></div>
          <span>Low Priority</span>
        </div>
      </div>

    </div>
  );
}