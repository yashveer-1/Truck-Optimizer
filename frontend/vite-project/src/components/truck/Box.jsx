import { useState } from "react";
import { Html, Edges } from "@react-three/drei";

export default function Box({ position, size, priority, id, color, selected = false, onSelect }) {
  const [hovered, setHovered] = useState(false);

  // fallback if color not passed
  const getDefaultColor = () => {
    if (priority === 3) return "red";
    if (priority === 2) return "yellow";
    return "blue";
  };

  const isActive = hovered || selected;

  return (
    <mesh
      position={position}
      scale={isActive ? 1.05 : 1}
      castShadow
      receiveShadow
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onPointerDown={(event) => {
        event.stopPropagation();
        onSelect?.();
      }}
    >
      <boxGeometry args={size} />

      {/* ✅ USE PASSED COLOR */}
      <meshStandardMaterial
        color={hovered ? "white" : (color || getDefaultColor())}
        emissive={selected ? "#374151" : "#000000"}
        emissiveIntensity={selected ? 0.2 : 0}
        metalness={0.15}
        roughness={0.45}
      />

      <Edges threshold={15} color={isActive ? "#f8fafc" : "#9ca3af"} />

      {/* 🔥 Tooltip */}
      {(hovered || selected) && (
        <Html distanceFactor={10} center>
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