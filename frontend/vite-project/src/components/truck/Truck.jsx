import Floor from "./Floor";
import Walls from "./Walls";
import Gate from "./Gate";
import Box from "./Box";
import Drum from "./Drum";

// 🔥 COLOR LOGIC
const getColor = (item, index) => {
  // Priority color (highest importance)
  if (item.type === "drum") return "red";
  if (item.type === "pallet") return "yellow";
  if (item.type === "carton") return "green";

  // Layer-based coloring (stacking visualization)
  if (item.y < 80) return "blue";        // bottom
  if (item.y < 160) return "cyan";       // middle
  return "orange";                       // top
};

export default function Truck({
  items = [],
  showWalls = true,
  showTop = true,
  selectedItem,
  onSelectItem
}) {
  return (
    <group>

      {/* 🔹 TRUCK STRUCTURE */}
      <Floor />
      <Walls showRightWall={showWalls} showTop={showTop} opacity={0.15} />
      <Gate />

      {/* 🔹 ITEMS */}
      {items.map((item, index) => {

        // ✅ POSITION CALCULATION (SAFE DEFAULTS)
        const pos = [
          -400 + (item.x || 0) + item.length / 2,
          (item.y || 0) + item.height / 2,
          -120 + (item.z || 0) + item.width / 2
        ];

        const color = getColor(item, index);

        // 🔴 DRUM
        if (item.type === "drum") {
          return (
            <Drum
              key={item.id}
              id={item.id}                 // ✅ required for tooltip
              priority={item.priority}     // ✅ useful for debugging
              position={pos}
              radius={item.length / 2}
              height={item.height}
              color={color}
              selected={selectedItem === item.id}
              onSelect={() => onSelectItem?.(item.id)}
            />
          );
        }

        // 📦 BOX / PALLET / CARTON
        return (
          <Box
            key={item.id}
            id={item.id}              // 🔥 important for tooltip
            position={pos}
            size={[item.length, item.height, item.width]}
            priority={item.priority}
            color={color}             // 🔥 THIS was missing earlier
            selected={selectedItem === item.id}
            onSelect={() => onSelectItem?.(item.id)}
          />
        );
      })}

    </group>
  );
}