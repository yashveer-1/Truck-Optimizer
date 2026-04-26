import { useEffect } from "react";
import * as XLSX from "xlsx";
import LoadPlanDetails from "./LeftSideBarComponents/LoadPlanDetails";
import LoadSequence from "./LeftSideBarComponents/LoadSequence";
import SkuList from "./LeftSideBarComponents/SkuList";
import UploadExcel from "./LeftSideBarComponents/UploadExcel";

export default function Sidebar({
  setItems,
  setStats,
  setRawItems,
  rawItems = [],

  // 🔥 NEW (from Dashboard)
  selectedVehicle,
  setSelectedVehicle,
  selectedHub
}) {
  const getTruckKey = (item) =>
    item.vehicleNo || item.truckId || item.vehicle || item.plate || "";

  // 🔥 FILTERED DATA (ONLY SELECTED TRUCK)
  const filteredItems = rawItems.filter(
    (item) => getTruckKey(item) === selectedVehicle
  );

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
      setStats(result.stats || {});
    } catch {
      console.warn("Backend not running — frontend mode");
    }
  };

  useEffect(() => {
    if (!rawItems.length || !selectedVehicle) return;
    const itemsToOptimize = rawItems.filter(
      (item) => getTruckKey(item) === selectedVehicle
    );
    optimizeTruckItems(itemsToOptimize);
  }, [rawItems, selectedVehicle]);

  const handleExcelUpload = async (file) => {
    try {
      if (!file) {
        alert("Please select a file first");
        return;
      }

      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);

      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(sheet);

      if (!rows.length) {
        alert("Excel is empty or wrong format");
        return;
      }

      const formattedItems = rows
        .filter(row => row.length && row.width && row.height)
        .map((row, i) => ({
          vehicleNo: (row.vehicleNo || row["Vehicle No"] || "").toString().trim(),
          truckId: (row.truckId || row["Truck Id"] || row["Truck ID"] || row["Truck No"] || "").toString().trim(),
          truckType: (row.truckType || row["Truck Type"] || "").toString().trim(),
          route: (row.route || row["Route"] || row["Route Name"] || "").toString().trim(),
          id: row.id || `ITEM_${i}`,
          type: row.type || "box",
          length: Number(row.length) || 0,
          width: Number(row.width) || 0,
          height: Number(row.height) || 0,
          weight: Number(row.weight) || 0,
          priority: Number(row.priority) || 1,
          color: row.color || "blue",
          location: row.location || "Unknown"
        }))
        .filter(item => getTruckKey(item) !== "");

      console.log("FINAL DATA:", formattedItems);

      const firstVehicle = formattedItems.map(getTruckKey).find(Boolean);

      if (typeof setRawItems === "function") {
        setRawItems(formattedItems);
      }

      if (!selectedVehicle && firstVehicle && typeof setSelectedVehicle === "function") {
        setSelectedVehicle(firstVehicle);
      }

      setItems([]);

    } catch (err) {
      console.error("UPLOAD ERROR:", err);
      alert("Excel upload failed — check console");
    }
  };

  return (
    <div className="p-3 space-y-4 text-xs overflow-auto h-full">

      {/* 🔥 VEHICLE CONTROL */}
      <LoadPlanDetails
        rawItems={rawItems}
        selectedVehicle={selectedVehicle}
        setSelectedVehicle={setSelectedVehicle}
        selectedHub={selectedHub}
      />

      {/* 🔥 FILTERED DATA USED BELOW */}
      <SkuList rawItems={filteredItems} />

      <LoadSequence rawItems={filteredItems} />

      <UploadExcel onUpload={handleExcelUpload} />

    </div>
  );
}