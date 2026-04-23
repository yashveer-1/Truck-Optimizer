import { Group } from "three";

export default function Drum({
  position = [0, 0, 0],
  radius = 30,
  height = 90,
  color = "red"
}) {
  return (
    <group position={position}>

      {/* Main cylinder */}
      <mesh>
        <cylinderGeometry args={[radius, radius, height, 32]} />
        <meshStandardMaterial
          color={color}
          metalness={0.5}
          roughness={0.3}
        />
      </mesh>

      {/* Top cap */}
      <mesh position={[0, height / 2, 0]}>
        <cylinderGeometry args={[radius * 0.95, radius * 0.95, 2, 32]} />
        <meshStandardMaterial color="#e5e7eb" />
      </mesh>

      {/* Bottom cap */}
      <mesh position={[0, -height / 2, 0]}>
        <cylinderGeometry args={[radius * 0.95, radius * 0.95, 2, 32]} />
        <meshStandardMaterial color="#9ca3af" />
      </mesh>

    </group>
  );
}