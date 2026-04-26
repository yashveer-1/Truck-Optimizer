import { useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows } from "@react-three/drei";
import Truck from "./truck/Truck";
import BottomPanel from "./MiddleComponents/BottomPanel";

const CAMERA_PRESETS = {
  top: { position: [0, 700, 0], target: [0, 90, 0] },
  front: { position: [0, 320, 900], target: [0, 90, 0] },
  iso: { position: [700, 320, 700], target: [0, 90, 0] }
};

export default function MainView({ items = [], rawItems = [] }) {
  const [showGrid, setShowGrid] = useState(true);
  const [showWalls, setShowWalls] = useState(true);
  const [showTop, setShowTop] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const controlsRef = useRef(null);

  const displayItems = items.length ? items : rawItems;

  const setCameraPreset = (preset) => {
    const controls = controlsRef.current;
    if (!controls) return;

    controls.object.position.set(...CAMERA_PRESETS[preset].position);
    controls.target.set(...CAMERA_PRESETS[preset].target);
    controls.update();
  };

  return (
    <div className="flex flex-col h-full">

      {/* 3D VIEW */}
      <div className="relative h-[75%] bg-black">
        <div className="absolute top-4 left-4 z-20 rounded-2xl border border-slate-700 bg-slate-900/90 p-3 text-xs text-white shadow-lg">
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setCameraPreset("top")}
              className="rounded-full bg-slate-800 px-3 py-1 text-[11px] text-white hover:bg-slate-700"
            >
              Top
            </button>
            <button
              onClick={() => setCameraPreset("front")}
              className="rounded-full bg-slate-800 px-3 py-1 text-[11px] text-white hover:bg-slate-700"
            >
              Front
            </button>
            <button
              onClick={() => setCameraPreset("iso")}
              className="rounded-full bg-slate-800 px-3 py-1 text-[11px] text-white hover:bg-slate-700"
            >
              ISO
            </button>
            <button
              onClick={() => setShowGrid(!showGrid)}
              className="rounded-full bg-slate-800 px-3 py-1 text-[11px] text-white hover:bg-slate-700"
            >
              {showGrid ? "Hide Grid" : "Show Grid"}
            </button>
            <button
              onClick={() => setShowWalls(!showWalls)}
              className="rounded-full bg-slate-800 px-3 py-1 text-[11px] text-white hover:bg-slate-700"
            >
              {showWalls ? "Hide Walls" : "Show Walls"}
            </button>
            <button
              onClick={() => setShowTop(!showTop)}
              className="rounded-full bg-slate-800 px-3 py-1 text-[11px] text-white hover:bg-slate-700"
            >
              {showTop ? "Hide Roof" : "Show Roof"}
            </button>
          </div>
          {selectedItem && (
            <div className="mt-3 rounded-lg bg-slate-800/90 p-2 text-[11px] text-slate-200">
              Selected Item: <span className="font-semibold">{selectedItem}</span>
            </div>
          )}
        </div>
        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{ position: CAMERA_PRESETS.iso.position, fov: 50 }}
        >
          <color attach="background" args={["#050816"]} />
          <ambientLight intensity={0.35} />
          <directionalLight
            castShadow
            position={[300, 400, 200]}
            intensity={1}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-far={1000}
            shadow-camera-left={-500}
            shadow-camera-right={500}
            shadow-camera-top={400}
            shadow-camera-bottom={-400}
          />
          <spotLight
            castShadow
            position={[-200, 450, 400]}
            angle={0.25}
            penumbra={0.4}
            intensity={0.35}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />

          {showGrid && (
            <gridHelper
              args={[900, 18, "#1f2937", "#1f2937"]}
              rotation={[-Math.PI / 2, 0, 0]}
              position={[0, 1, 0]}
            />
          )}

          <Truck
            items={displayItems}
            showWalls={showWalls}
            showTop={showTop}
            selectedItem={selectedItem}
            onSelectItem={setSelectedItem}
          />

          <ContactShadows
            position={[0, 0, 0]}
            opacity={0.35}
            width={1100}
            height={350}
            blur={2}
            far={350}
          />

          <OrbitControls
            ref={controlsRef}
            target={[0, 90, 0]}
            minDistance={250}
            maxDistance={1500}
            maxPolarAngle={Math.PI / 2.1}
            enablePan={true}
          />
        </Canvas>
      </div>

      {/* BOTTOM PANEL */}
      <BottomPanel rawItems={rawItems} />

    </div>
  );
}