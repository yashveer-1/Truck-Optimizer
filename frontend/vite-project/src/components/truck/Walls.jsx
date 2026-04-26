export default function Walls({
  showRightWall = false,
  showTop = false,
  opacity = 0.15
}) {
  return (
    <group>

      {/* Left Wall (semi-transparent for visibility) */}
      <mesh position={[0, 130, -120]} receiveShadow>
        <boxGeometry args={[800, 260, 5]} />
        <meshStandardMaterial
          color="#374151"
          transparent
          opacity={opacity}
          roughness={0.7}
        />
      </mesh>

      {/* Right Wall (optional) */}
      {showRightWall && (
        <mesh position={[0, 130, 120]} receiveShadow>
          <boxGeometry args={[800, 260, 5]} />
          <meshStandardMaterial
            color="#374151"
            transparent
            opacity={opacity}
            roughness={0.7}
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