export default function Gate() {
  return (
    <mesh position={[-400, 130, 0]} castShadow receiveShadow>
      <boxGeometry args={[5, 260, 240]} />
      <meshStandardMaterial
        color="#ef4444"
        metalness={0.3}
        roughness={0.45}
      />
    </mesh>
  );
}