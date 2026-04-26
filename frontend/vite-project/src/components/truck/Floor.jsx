export default function Floor() {
  return (
    <mesh position={[0, 0, 0]} receiveShadow>
      <boxGeometry args={[800, 5, 240]} />
      <meshStandardMaterial
        color="#1f2937"
        metalness={0.1}
        roughness={0.85}
      />
    </mesh>
  );
}