import { useMemo, useEffect } from "react";

export default function LoadPlanDetails({
  rawItems = [],
  selectedVehicle,
  setSelectedVehicle
}) {

  // 🔥 UNIQUE VEHICLES FROM CSV
  const vehicleIds = useMemo(() => {
    return [...new Set(
      rawItems
        .map(i => i.vehicleNo || i.truckId || i.vehicle || i.plate)
        .filter(Boolean)
    )];
  }, [rawItems]);

  // ✅ AUTO SELECT FIRST VEHICLE AFTER UPLOAD
  useEffect(() => {
    if (vehicleIds.length > 0 && !selectedVehicle) {
      setSelectedVehicle(vehicleIds[0]);
    }
  }, [vehicleIds, selectedVehicle, setSelectedVehicle]);

  // 🔥 FILTER DATA BASED ON SELECTED VEHICLE
  const filteredItems = useMemo(() => {
    return rawItems.filter(
      i =>
        i.vehicleNo === selectedVehicle ||
        i.truckId === selectedVehicle ||
        i.vehicle === selectedVehicle ||
        i.plate === selectedVehicle
    );
  }, [rawItems, selectedVehicle]);

  // 🔥 AUTO GET TRUCK TYPE
  const selectedTruck = filteredItems[0]?.truckType || "";

  // 🔥 BUILD ROUTE DYNAMICALLY
  const selectedRoute = useMemo(() => {
    if (!filteredItems.length) return "";

    const route = [
      "Bengaluru",
      ...[...new Set(
        [...filteredItems]
          .sort((a, b) => (a.priority || 0) - (b.priority || 0))
          .map(i => i.location)
      )]
    ];

    return route.join(" → ");
  }, [filteredItems]);

  // 🔥 CALCULATIONS
  const totalWeight = filteredItems.reduce(
    (s, i) => s + (i.weight || 0),
    0
  );

  const totalVolume =
    filteredItems.reduce(
      (s, i) => s + (i.length * i.width * i.height),
      0
    ) / 1000000;

  const weightPercent = Math.min(
    Math.round((totalWeight / 9000) * 100),
    100
  );

  const volumePercent = Math.min(
    Math.round((totalVolume / 28) * 100),
    100
  );

  const totalOrders = filteredItems.length;

  const totalDrops = new Set(
    filteredItems.map(i => i.location)
  ).size;

  return (
    <div className="bg-[#0F213F] p-4 rounded-xl space-y-3">

      <h2 className="text-sm font-semibold text-gray-300">
        LOAD PLAN DETAILS
      </h2>

      {/* 🔹 VEHICLE DROPDOWN */}
      <select
        value={selectedVehicle}
        onChange={(e) => setSelectedVehicle(e.target.value)}
        className="w-full bg-[#132A4A] p-2 rounded text-white"
      >
        {vehicleIds.map((v) => (
          <option key={v} value={v}>
            {v}
          </option>
        ))}
      </select>

      {/* 🔹 AUTO FILLED */}
      <input
        value={selectedTruck}
        disabled
        className="w-full bg-[#132A4A] p-2 rounded text-gray-300"
      />

      <input
        value={selectedRoute}
        disabled
        className="w-full bg-[#132A4A] p-2 rounded text-gray-300"
      />

      {/* 🔹 STATS */}
      <div className="grid grid-cols-2 gap-3">

        <div className="bg-[#132A4A] p-3 rounded">
          <p className="text-gray-400">Total Weight</p>
          <p className="text-white font-semibold">
            {totalWeight} / 9000 kg
          </p>
          <div className="h-1 bg-gray-700 mt-2 rounded">
            <div
              className="h-1 bg-green-500 rounded"
              style={{ width: `${weightPercent}%` }}
            />
          </div>
        </div>

        <div className="bg-[#132A4A] p-3 rounded">
          <p className="text-gray-400">Total Volume</p>
          <p className="text-white font-semibold">
            {totalVolume.toFixed(1)} / 28.0 m³
          </p>
          <div className="h-1 bg-gray-700 mt-2 rounded">
            <div
              className="h-1 bg-green-400 rounded"
              style={{ width: `${volumePercent}%` }}
            />
          </div>
        </div>

        <div className="bg-[#132A4A] p-3 rounded">
          <p className="text-gray-400">No. of Orders</p>
          <p className="text-white font-semibold">
            {totalOrders}
          </p>
        </div>

        <div className="bg-[#132A4A] p-3 rounded">
          <p className="text-gray-400">No. of Drops</p>
          <p className="text-white font-semibold">
            {totalDrops}
          </p>
        </div>

      </div>
    </div>
  );
}