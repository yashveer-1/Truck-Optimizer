import { useState } from "react";
import { Html, Edges } from "@react-three/drei";

export default function Drum({
  position = [0, 0, 0],
  radius = 30,
  height = 90,
  color = "red",
  id = "",
  priority = 1,
  selected = false,
  onSelect
}) {
  const [hovered, setHovered] = useState(false);
  const isActive = hovered || selected;

  return (
    <group
      position={position}
      scale={isActive ? 1.05 : 1}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onPointerDown={(event) => {
        event.stopPropagation();
        onSelect?.();
      }}
    >

      {/* 🔴 MAIN CYLINDER */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[radius, radius, height, 32]} />
        <meshStandardMaterial
          color={hovered ? "white" : color}
          emissive={selected ? "#374151" : "#000000"}
          emissiveIntensity={selected ? 0.2 : 0}
          metalness={0.5}
          roughness={0.3}
        />
        <Edges color={isActive ? "#f8fafc" : "#9ca3af"} />
      </mesh>

      {/* 🔘 TOP CAP */}
      <mesh position={[0, height / 2, 0]}>
        <cylinderGeometry args={[radius * 0.95, radius * 0.95, 2, 32]} />
        <meshStandardMaterial color="#e5e7eb" />
      </mesh>

      {/* ⚫ BOTTOM CAP */}
      <mesh position={[0, -height / 2, 0]}>
        <cylinderGeometry args={[radius * 0.95, radius * 0.95, 2, 32]} />
        <meshStandardMaterial color="#9ca3af" />
      </mesh>

      {/* 🔥 TOOLTIP */}
      {(hovered || selected) && (
        <Html distanceFactor={10} center>
          <div className="bg-black text-white text-xs p-2 rounded">
            <p>ID: {id}</p>
            <p>Type: Drum</p>
            <p>Priority: {priority}</p>
            <p>R: {radius}</p>
            <p>H: {height}</p>
          </div>
        </Html>
      )}

    </group>
  );
}