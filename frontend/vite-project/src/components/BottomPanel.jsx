export default function BottomPanel() {
  return (
    <div className="grid grid-cols-3 gap-3 p-2">

      {/* 🔹 TRUCK UTILIZATION */}
      <div className="bg-[#0F213F] p-4 rounded-xl">
        <h2 className="text-sm text-gray-300 mb-3">
          TRUCK UTILIZATION
        </h2>

        <div className="flex justify-around">

          {/* Weight */}
          <div className="text-center">
            <div className="w-24 h-24 rounded-full border-[10px] border-green-500 border-t-gray-600 flex items-center justify-center">
              <span className="text-white font-semibold">99%</span>
            </div>
            <p className="text-xs mt-2 text-gray-400">
              8,920 / 9,000 kg
            </p>
          </div>

          {/* Volume */}
          <div className="text-center">
            <div className="w-24 h-24 rounded-full border-[10px] border-green-400 border-t-gray-600 flex items-center justify-center">
              <span className="text-white font-semibold">70%</span>
            </div>
            <p className="text-xs mt-2 text-gray-400">
              19.6 / 28.0 m³
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
            <span className="text-green-400">✔ Passed</span>
          </div>

          <div className="flex justify-between">
            <span>Volume Limit</span>
            <span className="text-green-400">✔ Passed</span>
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

        <table className="w-full text-xs text-gray-300">
          <thead>
            <tr className="text-gray-500">
              <th>Order</th>
              <th>%</th>
              <th>Weight</th>
              <th>Vol</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>O-10045</td>
              <td>100%</td>
              <td>1,840</td>
              <td>4.10</td>
            </tr>

            <tr>
              <td>O-10046</td>
              <td>100%</td>
              <td>2,130</td>
              <td>4.80</td>
            </tr>

            <tr>
              <td>O-10047</td>
              <td>100%</td>
              <td>1,100</td>
              <td>2.20</td>
            </tr>

            <tr>
              <td>O-10048</td>
              <td>100%</td>
              <td>3,850</td>
              <td>8.78</td>
            </tr>
          </tbody>
        </table>

      </div>

    </div>
  );
}