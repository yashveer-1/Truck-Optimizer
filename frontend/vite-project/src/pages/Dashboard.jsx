import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import MainView from "../components/MainView";
import StatsPanel from "../components/StatsPanel";
import BottomBar from "../components/BottomBar";

export default function Dashboard() {
  const [items, setItems] = useState([]);

  const [stats, setStats] = useState({
    spaceUtilization: 0,
    totalItems: 0,
    totalWeight: 0
  });

  // 🔥 RAW DATA FROM EXCEL
  const [rawItems, setRawItems] = useState([]);

  // 🔥 SELECTED TRUCK (GLOBAL STATE)
  const [selectedVehicle, setSelectedVehicle] = useState("");

  const getTruckKey = (item) =>
    item.vehicleNo || item.truckId || item.vehicle || item.plate || "";

  // 🔥 AUTO SELECT FIRST VEHICLE AFTER UPLOAD
  useEffect(() => {
    if (rawItems.length > 0) {
      const firstVehicle = getTruckKey(rawItems[0]);
      setSelectedVehicle(firstVehicle);
    }
  }, [rawItems]);

  // 🔥 FILTER DATA BASED ON SELECTED TRUCK
  const filteredItems = rawItems.filter(
    (item) => getTruckKey(item) === selectedVehicle
  );

  return (
    <div className="h-screen flex flex-col bg-[#0B1220] text-white">

      {/* 🔹 NAVBAR */}
      <Navbar />

      {/* 🔹 MAIN LAYOUT */}
      <div className="flex flex-1 overflow-hidden">

        {/* 🔹 LEFT SIDEBAR */}
        <div className="w-[20%] border-r border-gray-700 overflow-auto">
          <Sidebar
            setItems={setItems}
            setStats={setStats}
            setRawItems={setRawItems}

            rawItems={rawItems}

            // 🔥 PASS GLOBAL STATE
            selectedVehicle={selectedVehicle}
            setSelectedVehicle={setSelectedVehicle}
          />
        </div>

        {/* 🔹 CENTER (3D VIEW) */}
        <div className="w-[60%] overflow-hidden">
          <MainView items={items} rawItems={filteredItems} />
        </div>

        {/* 🔹 RIGHT PANEL */}
        <div className="w-[20%] border-l border-gray-700 overflow-auto">
          <StatsPanel rawItems={filteredItems} />
        </div>

      </div>

      {/* 🔹 BOTTOM BAR */}
      <div className="h-16 border-t border-gray-700">
        <BottomBar rawItems={filteredItems} />
      </div>

    </div>
  );
}