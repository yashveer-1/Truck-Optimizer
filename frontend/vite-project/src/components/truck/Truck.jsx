import Floor from "./Floor";
import Walls from "./Walls";
import Gate from "./Gate";
import Box from "./Box";

export default function Truck({ items = [] }) {
  return (
    <group>

      {/* 🚛 Front Cabin */}
      {/* <Cabin /> */}

      {/* ⚙️ Wheels */}
      {/* <Wheels /> */}

      {/* 📦 Container */}
      <Floor />
      <Walls showRightWall={false} showTop={false} />
      <Gate />

      {/* Boxes */}
      {items.map((item) => (
        <Box
          key={item.id}
          id={item.id}
          position={[
            -400 + item.x + item.length / 2,
            (item.y || 0) + item.height / 2,
            -120 + item.z + item.width / 2
          ]}
          size={[item.length, item.height, item.width]}
          priority={item.priority}
        />
      ))}

    </group>
  );
}