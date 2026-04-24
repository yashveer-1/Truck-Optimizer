import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Truck from "./truck/Truck";
import BottomPanel from "./MiddleComponents/BottomPanel";

export default function MainView({ items = [], rawItems = [] }) {
  const displayItems = items.length ? items : rawItems;

  return (
    <div className="flex flex-col h-full">

      {/* 3D VIEW */}
      <div className="h-[75%] bg-black">
        <Canvas camera={{ position: [700, 320, 700], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[300, 300, 300]} />

          {/* 🔥 USE OPTIMIZED OR FALLBACK ITEMS */}
          <Truck items={displayItems} />

          <OrbitControls target={[0, 90, 0]} />
        </Canvas>
      </div>

      {/* BOTTOM PANEL */}
      <BottomPanel rawItems={rawItems} />

    </div>
  );
}