import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Truck from "./truck/Truck";
import BottomPanel from "./BottomPanel";

export default function MainView({ items }) {
    return (
        <div className="flex flex-col h-full">

            {/* 3D View */}
            <div className="h-[75%] bg-black">
                <Canvas camera={{ position: [700, 500, 700], fov: 50 }}>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[300, 300, 300]} />

                    {/* ✅ real data from backend */}
                    <Truck items={items} />

                    <OrbitControls />
                </Canvas>
            </div>

            <BottomPanel items={items} />
        </div>
    );
}