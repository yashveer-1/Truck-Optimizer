export default function BottomBar() {
  return (
    <div className="h-16 bg-[#0B1F3A] border-t border-gray-700 flex items-center justify-between px-6 text-sm text-gray-300">

      {/* Left Section */}
      <div className="flex items-center gap-6">

        <button className="bg-[#132A4A] px-4 py-2 rounded-md text-white border border-blue-500">
          Plan Summary
        </button>

        <div>Total Orders: <span className="text-white font-semibold">7</span></div>
        <div>Total Trucks: <span className="text-white font-semibold">3</span></div>
        <div>Total Weight: <span className="text-white font-semibold">24,560 kg</span></div>
        <div>Total Volume: <span className="text-white font-semibold">56.2 m³</span></div>

      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">

        <div>
          Avg. Weight Utilization:{" "}
          <span className="text-green-400 font-semibold">92%</span>
        </div>

        <div>
          Avg. Volume Utilization:{" "}
          <span className="text-green-400 font-semibold">78%</span>
        </div>

        <div className="bg-red-600 px-4 py-2 rounded-md text-white font-semibold">
          ⚠ Alerts 2
        </div>

      </div>

    </div>
  );
}