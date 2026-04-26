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
  const [activePage, setActivePage] = useState("home");

  const getTruckKey = (item) =>
    item.vehicleNo || item.truckId || item.vehicle || item.plate || "";

  const selectedHubPrefix = getHubPrefix(selectedHub);

  const hubRawItems = useMemo(
    () => rawItems.filter((item) =>
      getTruckKey(item).startsWith(selectedHubPrefix)
    ),
    [rawItems, selectedHubPrefix]
  );

  const DEFAULT_STATS = {
    spaceUtilization: 0,
    totalItems: 0,
    totalWeight: 0
  };

  const optimizeTruckItems = async (itemsToOptimize) => {
    if (!itemsToOptimize.length) return;

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const res = await fetch(`${apiUrl}/optimize`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          truck: { length: 800, width: 240, height: 260 },
          items: itemsToOptimize
        })
      });

      const result = await res.json();
      setItems(result.placements || []);
      setStats(result.stats || DEFAULT_STATS);
    } catch (err) {
      console.warn("Backend not running — frontend mode", err);
    }
  };

  const handleOptimize = async () => {
    const itemsToOptimize = hubRawItems.filter(
      (item) => getTruckKey(item) === selectedVehicle
    );

    if (!itemsToOptimize.length) {
      alert("No truck selected or no items available for optimization.");
      return;
    }

    await optimizeTruckItems(itemsToOptimize);
  };

  const handleRebuild = async () => {
    setItems([]);
    setStats(DEFAULT_STATS);
    await handleOptimize();
  };

  const handleExport = () => {
    if (!items.length) {
      alert("Nothing to export yet. Optimize a load first.");
      return;
    }

    const headers = [
      "id",
      "type",
      "length",
      "width",
      "height",
      "weight",
      "priority",
      "color",
      "location",
      "vehicleNo",
      "truckId",
      "route"
    ];

    const csvRows = [headers.join(",")];

    items.forEach((item) => {
      const row = headers.map((header) => {
        const value = item[header] ?? "";
        return `"${String(value).replace(/"/g, '""')}"`;
      });
      csvRows.push(row.join(","));
    });

    const blob = new Blob([csvRows.join("\n")], {
      type: "text/csv;charset=utf-8;"
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `load-plan-${selectedVehicle || "truck"}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const truckTitle = selectedVehicle ? `${selectedVehicle} (${selectedHub})` : "Current Load Plan";
    const itemRows = items.map((item) => `
      <tr style="border-bottom:1px solid #ccc;">
        <td style="padding: 8px">${item.id || "-"}</td>
        <td style="padding: 8px">${item.type || "-"}</td>
        <td style="padding: 8px">${item.length || "-"}</td>
        <td style="padding: 8px">${item.width || "-"}</td>
        <td style="padding: 8px">${item.height || "-"}</td>
        <td style="padding: 8px">${item.weight || "-"}</td>
        <td style="padding: 8px">${item.location || "-"}</td>
      </tr>
    `).join("");

    printWindow.document.write(`
      <html>
        <head>
          <title>Print Load Plan</title>
          <style>
            body { font-family: Arial, sans-serif; color: #111; padding: 24px; }
            h1 { margin-bottom: 0.5rem; }
            table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
            th, td { text-align: left; border-bottom: 1px solid #ccc; }
            th { padding: 8px 8px 4px; }
          </style>
        </head>
        <body>
          <h1>${truckTitle}</h1>
          <p>Route: ${selectedHub}</p>
          <p>Items: ${items.length}</p>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>L</th>
                <th>W</th>
                <th>H</th>
                <th>Weight</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              ${itemRows}
            </tbody>
          </table>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

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
      <Navbar
        selectedHub={selectedHub}
        setSelectedHub={setSelectedHub}
        activePage={activePage}
        setActivePage={setActivePage}
      />

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
          <StatsPanel
            rawItems={filteredItems}
            items={items}
            selectedVehicle={selectedVehicle}
            selectedHub={selectedHub}
            onOptimize={handleOptimize}
            onRebuild={handleRebuild}
            onExport={handleExport}
            onPrint={handlePrint}
          />
        </div>

      </div>

      {/* 🔹 BOTTOM BAR */}
      <div className="h-16 border-t border-gray-700">
        <BottomBar rawItems={filteredItems} />
      </div>

    </div>
  );
}