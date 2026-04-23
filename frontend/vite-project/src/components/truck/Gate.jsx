export default function Gate() {
  return (
    <mesh position={[-400, 130, 0]}>
      <boxGeometry args={[5, 260, 240]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
}