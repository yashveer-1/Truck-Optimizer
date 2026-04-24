export default function BottomBar({ rawItems = [] }) {
  const MAX_WEIGHT = 9000;
  const MAX_VOLUME = 28;

  const totalOrders = rawItems.length;
  const totalWeight = rawItems.reduce(
    (sum, item) => sum + (Number(item.weight) || 0),
    0
  );
  const totalVolume = rawItems.reduce(
    (sum, item) =>
      sum +
      ((Number(item.length) || 0) * (Number(item.width) || 0) * (Number(item.height) || 0)),
    0
  ) / 1000000;
  const totalTrucks = new Set(rawItems.map(item => item.location || "Unknown")).size;

  const weightUtil = Math.min(Math.round((totalWeight / MAX_WEIGHT) * 100), 100);
  const volumeUtil = Math.min(Math.round((totalVolume / MAX_VOLUME) * 100), 100);

  const alertCount = [
    totalWeight > MAX_WEIGHT,
    totalVolume > MAX_VOLUME,
    rawItems.some(item =>
      !item.length || !item.width || !item.height || !item.weight
    )
  ].filter(Boolean).length;

  const utilClass = value =>
    value > 85 ? "text-green-400" : value > 60 ? "text-yellow-300" : "text-red-400";

  return (
    <div className="h-16 bg-[#0B1F3A] border-t border-gray-700 flex items-center justify-between px-6 text-sm text-gray-300">

      <div className="flex items-center gap-6">

        <button className="bg-[#132A4A] px-4 py-2 rounded-md text-white border border-blue-500">
          Plan Summary
        </button>

        <div>
          Total Orders: <span className="text-white font-semibold">{totalOrders}</span>
        </div>
        <div>
          Total Trucks: <span className="text-white font-semibold">{totalTrucks}</span>
        </div>
        <div>
          Total Weight: <span className="text-white font-semibold">{totalWeight.toLocaleString()} kg</span>
        </div>
        <div>
          Total Volume: <span className="text-white font-semibold">{totalVolume.toFixed(1)} m³</span>
        </div>

      </div>

      <div className="flex items-center gap-6">

        <div>
          Avg. Weight Utilization:{" "}
          <span className={`${utilClass(weightUtil)} font-semibold`}>
            {weightUtil}%
          </span>
        </div>

        <div>
          Avg. Volume Utilization:{" "}
          <span className={`${utilClass(volumeUtil)} font-semibold`}>
            {volumeUtil}%
          </span>
        </div>

        <div className={`rounded-md px-4 py-2 font-semibold ${alertCount > 0 ? "bg-red-600 text-white" : "bg-green-600 text-white"}`}>
          {alertCount > 0 ? `⚠ Alerts ${alertCount}` : "✔ No Alerts"}
        </div>

      </div>

    </div>
  );
}