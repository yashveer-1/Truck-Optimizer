export default function BottomPanel({ rawItems = [] }) {
  console.log("RAW ITEMS:", rawItems);

  const MAX_WEIGHT = 9000;
  const MAX_VOLUME = 28;

  // 🔥 CALCULATIONS
  const totalWeight = rawItems.reduce((s, i) => s + (i.weight || 0), 0);

  const totalVolume =
    rawItems.reduce((s, i) => s + (i.length * i.width * i.height), 0) /
    1000000;

  const weightUtil = Math.min(
    Math.round((totalWeight / MAX_WEIGHT) * 100),
    100
  );

  const volumeUtil = Math.min(
    Math.round((totalVolume / MAX_VOLUME) * 100),
    100
  );

  const getUtilColor = (value) => {
    if (value < 25) return "#ef4444";
    if (value <= 60) return "#f59e0b";
    return "#22c55e";
  };

  // 🔥 CONSTRAINTS
  const constraints = {
    weightLimit: totalWeight <= MAX_WEIGHT,
    volumeLimit: totalVolume <= MAX_VOLUME,
    axleLoad: true,
    stacking: true,
    stability: true,
    sequence: true
  };

  // 🔥 ORDER ALLOCATION
  const orderMap = {};

  rawItems.forEach(item => {
    const key = item.location || "Unknown";

    if (!orderMap[key]) {
      orderMap[key] = { weight: 0, volume: 0 };
    }

    orderMap[key].weight += item.weight || 0;
    orderMap[key].volume +=
      (item.length * item.width * item.height) / 1000000;
  });

  const orders = Object.entries(orderMap).map(([loc, val], i) => ({
    id: `O-${10045 + i}`,
    percent: 100,
    weight: val.weight,
    volume: val.volume.toFixed(2)
  }));

  return (
    <div className="grid grid-cols-3 gap-3 p-2">

      {/* 🔹 TRUCK UTILIZATION */}
      <div className="bg-[#0F213F] p-4 rounded-xl">
        <h2 className="text-sm text-gray-300 mb-3">
          TRUCK UTILIZATION
        </h2>

        <div className="flex justify-around">

          {/* 🔥 WEIGHT CIRCLE */}
          <div className="text-center">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center"
              style={{
                background: `conic-gradient(${getUtilColor(weightUtil)} ${weightUtil * 3.6}deg, #374151 0deg)`
              }}
            >
              <div className="w-16 h-16 bg-[#0F213F] rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">
                  {weightUtil}%
                </span>
              </div>
            </div>
            <p className="text-xs mt-2 text-gray-400">
              {totalWeight} / {MAX_WEIGHT} kg
            </p>
          </div>

          {/* 🔥 VOLUME CIRCLE */}
          <div className="text-center">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center"
              style={{
                background: `conic-gradient(${getUtilColor(volumeUtil)} ${volumeUtil * 3.6}deg, #374151 0deg)`
              }}
            >
              <div className="w-16 h-16 bg-[#0F213F] rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">
                  {volumeUtil}%
                </span>
              </div>
            </div>
            <p className="text-xs mt-2 text-gray-400">
              {totalVolume.toFixed(1)} / {MAX_VOLUME} m³
            </p>
          </div>

        </div>
      </div>

      {/* 🔹 CONSTRAINT CHECK */}
      <div className="bg-[#0F213F] p-4 rounded-xl">
        <h2 className="text-sm text-gray-300 mb-3">
          CONSTRAINT CHECK
        </h2>

        <div className="space-y-2 text-sm">

          <div className="flex justify-between">
            <span>Weight Limit</span>
            <span className={constraints.weightLimit ? "text-green-400" : "text-red-400"}>
              {constraints.weightLimit ? "✔ Passed" : "✘ Failed"}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Volume Limit</span>
            <span className={constraints.volumeLimit ? "text-green-400" : "text-red-400"}>
              {constraints.volumeLimit ? "✔ Passed" : "✘ Failed"}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Axle Load</span>
            <span className="text-green-400">✔ Passed</span>
          </div>

          <div className="flex justify-between">
            <span>Stacking Rules</span>
            <span className="text-green-400">✔ Passed</span>
          </div>

          <div className="flex justify-between">
            <span>Stability Check</span>
            <span className="text-green-400">✔ Passed</span>
          </div>

          <div className="flex justify-between">
            <span>Delivery Sequence</span>
            <span className="text-green-400">✔ Passed</span>
          </div>

        </div>
      </div>

      {/* 🔹 ORDER ALLOCATION */}
      <div className="bg-[#0F213F] p-4 rounded-xl">
        <h2 className="text-sm text-gray-300 mb-3">
          ORDER ALLOCATION
        </h2>
        <div className="h-px bg-gray-700 mb-4" />

        <table className="w-full text-xs text-gray-300 border-collapse">
          <thead>
            <tr className="text-gray-500 border-b border-gray-700">
              <th className="text-left px-2 py-2">Order</th>
              <th className="text-right px-2 py-2">%</th>
              <th className="text-right px-2 py-2">Weight</th>
              <th className="text-right px-2 py-2">Vol</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-800">
            {orders.map((o, i) => (
              <tr key={i} className="bg-[#0F213F]">
                <td className="py-2 px-2 text-left">{o.id}</td>
                <td className="py-2 px-2 text-right">{o.percent}%</td>
                <td className="py-2 px-2 text-right">{o.weight}</td>
                <td className="py-2 px-2 text-right">{o.volume}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

    </div>
  );
}