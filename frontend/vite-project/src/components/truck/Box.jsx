import { useState } from "react";
import { Html } from "@react-three/drei";

export default function Box({ position, size, priority, id }) {
  const [hovered, setHovered] = useState(false);

  const getColor = () => {
    if (priority === 3) return "red";
    if (priority === 2) return "yellow";
    return "blue";
  };

  return (
    <mesh
      position={position}
      scale={hovered ? 1.1 : 1}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={size} />
      <meshStandardMaterial color={hovered ? "white" : getColor()} />

      {/* 🔥 Tooltip */}
      {hovered && (
        <Html distanceFactor={10}>
          <div className="bg-black text-white text-xs p-2 rounded">
            <p>ID: {id}</p>
            <p>Priority: {priority}</p>
            <p>{size[0]} x {size[2]} x {size[1]}</p>
          </div>
        </Html>
      )}
    </mesh>
  );
}