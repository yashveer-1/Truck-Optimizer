import { useState, useEffect, useMemo } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import MainView from "../components/MainView";
import StatsPanel from "../components/StatsPanel";
import BottomBar from "../components/BottomBar";

const HUB_PREFIXES = {
  Mumbai: "MH",
  Chennai: "TN",
  Kolkata: "WB",
  Silvassa: "DN"
};

const getHubPrefix = (hub) => {
  const key = hub?.replace(/\s*Hub$/i, "") || "";
  return HUB_PREFIXES[key] || key.slice(0, 2).toUpperCase();
};

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

  const [selectedHub, setSelectedHub] = useState("Mumbai");

  const getTruckKey = (item) =>
    item.vehicleNo || item.truckId || item.vehicle || item.plate || "";

  const selectedHubPrefix = getHubPrefix(selectedHub);

  const hubRawItems = useMemo(
    () => rawItems.filter((item) =>
      getTruckKey(item).startsWith(selectedHubPrefix)
    ),
    [rawItems, selectedHubPrefix]
  );

  // 🔥 AUTO SELECT FIRST VEHICLE AFTER UPLOAD / HUB CHANGE
  useEffect(() => {
    if (!hubRawItems.length) return;
    const firstVehicle = getTruckKey(hubRawItems[0]);
    const currentVehicleIsHubItem = hubRawItems.some(
      (item) => getTruckKey(item) === selectedVehicle
    );

    if (!selectedVehicle || !currentVehicleIsHubItem) {
      setSelectedVehicle(firstVehicle);
    }
  }, [hubRawItems, selectedVehicle]);

  // 🔥 FILTER DATA BASED ON SELECTED TRUCK
  const filteredItems = hubRawItems.filter(
    (item) => getTruckKey(item) === selectedVehicle
  );

  return (
    <div className="h-screen flex flex-col bg-[#0B1220] text-white">

      {/* 🔹 NAVBAR */}
      <Navbar selectedHub={selectedHub} setSelectedHub={setSelectedHub} />

      {/* 🔹 MAIN LAYOUT */}
      <div className="flex flex-1 overflow-hidden">

        {/* 🔹 LEFT SIDEBAR */}
        <div className="w-[20%] border-r border-gray-700 overflow-auto">
          <Sidebar
            setItems={setItems}
            setStats={setStats}
            setRawItems={setRawItems}

            rawItems={hubRawItems}

            // 🔥 PASS GLOBAL STATE
            selectedVehicle={selectedVehicle}
            setSelectedVehicle={setSelectedVehicle}
            selectedHub={selectedHub}
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