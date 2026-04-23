export default function Walls({
  showRightWall = false,
  showTop = false,
  opacity = 0.15
}) {
  return (
    <group>

      {/* Left Wall (always visible) */}
      <mesh position={[0, 130, -120]}>
        <boxGeometry args={[800, 260, 5]} />
        <meshStandardMaterial color="#374151" />
      </mesh>

      {/* Right Wall (optional) */}
      {showRightWall && (
        <mesh position={[0, 130, 120]}>
          <boxGeometry args={[800, 260, 5]} />
          <meshStandardMaterial
            color="#374151"
            transparent
            opacity={opacity}
          />
        </mesh>
      )}

      {/* Top (optional) */}
      {showTop && (
        <mesh position={[0, 260, 0]}>
          <boxGeometry args={[800, 5, 240]} />
          <meshStandardMaterial
            color="#374151"
            transparent
            opacity={0.1}
          />
        </mesh>
      )}

    </group>
  );
}