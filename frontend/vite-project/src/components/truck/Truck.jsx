import Floor from "./Floor";
import Walls from "./Walls";
import Gate from "./Gate";
import Box from "./Box";
import Drum from "./Drum";

export default function Truck({ items = [] }) {
  return (
    <group>

      {/* Base Structure */}
      <Floor />
      <Walls showRightWall={false} showTop={false} />
      <Gate />

      {/* Render Items */}
      {items.map((item) => {
        const pos = [
          -400 + item.x + item.length / 2,     // X (centered)
          item.y + item.height / 2,            // Y (on floor)
          -120 + item.z + item.width / 2       // Z (centered)
        ];

        // 🔥 DRUM ITEMS
        if (item.type === "drum") {
          return (
            <Drum
              key={item.id}
              position={pos}
              radius={item.length / 2}
              height={item.height}
              color={item.color || "blue"}   // 👈 dynamic color
            />
          );
        }

        // 🔲 DEFAULT BOX ITEMS
        return (
          <Box
            key={item.id}
            position={pos}
            size={[item.length, item.height, item.width]}
            priority={item.priority}
          />
        );
      })}

    </group>
  );
}