export default function Floor() {
  return (
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[800, 5, 240]} />
      <meshStandardMaterial color="#1f2937" />
    </mesh>
  );
}