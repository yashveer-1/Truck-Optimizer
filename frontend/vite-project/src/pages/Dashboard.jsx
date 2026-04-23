import { useState } from "react";
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

 return (
  <div className="h-screen flex flex-col bg-[#0B1220] text-white">

    {/* Navbar */}
    <Navbar />

    {/* Main Layout */}
    <div className="flex flex-1 overflow-hidden">

      <div className="w-[20%] border-r border-gray-700 overflow-auto">
        <Sidebar setItems={setItems} setStats={setStats} />
      </div>

      <div className="w-[60%] overflow-hidden">
        <MainView items={items} />
      </div>

      <div className="w-[20%] border-l border-gray-700 overflow-auto">
        <StatsPanel stats={stats} />
      </div>

    </div>

    {/* 🔥 FIXED BOTTOM BAR */}
    <div className="h-16">
      <BottomBar />
    </div>

  </div>
);
}