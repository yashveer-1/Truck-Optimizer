import logo from "../assets/hpcl.png";
import { Home } from "lucide-react";

const HUBS = [
  { value: "Mumbai", label: "Mumbai Hub" },
  { value: "Chennai", label: "Chennai Hub" },
  { value: "Kolkata", label: "Kolkata Hub" },
  { value: "Silvassa", label: "Silvasa Hub" }
];

export default function Navbar({ selectedHub, setSelectedHub }) {
  return (
    <div>

      {/* 🔹 TOP WHITE BAR */}
      <div className="h-14 bg-white border-b border-gray-300 flex items-center justify-between px-6">

        {/* Left */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="logo" className="h-8 w-auto" />

          <div className="flex flex-col leading-tight">
            <h1 className="text-lg font-semibold text-blue-900">
              HPCL TLB
            </h1>
            <span className="text-sm text-blue-800">
              3D Load Builder
            </span>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4 text-sm text-gray-600">

          <select
            className="bg-gray-100 px-2 py-1 rounded"
            value={selectedHub}
            onChange={(e) => setSelectedHub(e.target.value)}
          >
            {HUBS.map((hub) => (
              <option key={hub.value} value={hub.value}>
                {hub.label}
              </option>
            ))}
          </select>

          <input
            type="date"
            className="bg-gray-100 px-2 py-1 rounded"
          />

          <div className="bg-blue-600 px-3 py-1 rounded-full text-white">
            YS
          </div>

        </div>
      </div>

      {/* 🔹 DARK NAV BAR BELOW */}
      <div className="h-12 bg-[#0B1F3A] flex items-center px-6 text-sm">

        <div className="flex items-center gap-4">

          {/* Logo/Icon */}
          <div className="flex items-center justify-center w-9 h-9 rounded-md bg-[#132A4A] border border-blue-500 text-white">
            <Home size={18} />
          </div>

          {/* Buttons */}
          <div className="flex gap-3">

            <button className="px-4 py-1 rounded-md bg-[#132A4A] text-white border border-blue-500">
              Home            </button>

            <button className="px-4 py-1 rounded-md bg-[#132A4A] text-gray-300 hover:text-white border border-transparent hover:border-blue-400">
              Plan Summary
            </button>

            <button className="px-4 py-1 rounded-md bg-[#132A4A] text-gray-300 hover:text-white border border-transparent hover:border-blue-400">
              Orders
            </button>

            <button className="px-4 py-1 rounded-md bg-[#132A4A] text-gray-300 hover:text-white border border-transparent hover:border-blue-400">
              Reports
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}