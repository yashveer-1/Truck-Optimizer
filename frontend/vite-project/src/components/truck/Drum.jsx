import { useState } from "react";
import { Html } from "@react-three/drei";

export default function Drum({
  position = [0, 0, 0],
  radius = 30,
  height = 90,
  color = "red",
  id = "",
  priority = 1
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <group
      position={position}
      scale={hovered ? 1.1 : 1}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >

      {/* 🔴 MAIN CYLINDER */}
      <mesh>
        <cylinderGeometry args={[radius, radius, height, 32]} />
        <meshStandardMaterial
          color={hovered ? "white" : color}
          metalness={0.5}
          roughness={0.3}
        />
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
      {hovered && (
        <Html distanceFactor={10}>
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