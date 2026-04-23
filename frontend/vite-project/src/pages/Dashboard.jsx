import { useState } from "react";
import Sidebar from "../components/Sidebar";
import MainView from "../components/MainView";
import StatsPanel from "../components/StatsPanel";

export default function Dashboard() {

const [items, setItems] = useState([]);
const [stats, setStats] = useState({});
  return (
    <div className="h-screen flex bg-[#0B1220] text-white">
      
      <div className="w-[20%] border-r border-gray-700">
        <Sidebar setItems={setItems} setStats={setStats} />
      </div>

      <div className="w-[60%] flex flex-col">
        <MainView items={items} />
      </div>

      <div className="w-[20%] border-l border-gray-700">
        <StatsPanel stats={stats} />
      </div>

    </div>
  );
}