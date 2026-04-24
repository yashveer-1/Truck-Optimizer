const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());


// ✅ Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});


// 🔥 HELPER → TRY ROTATIONS
function getRotations(item) {
  const dims = [item.length, item.width, item.height];
  const uniqueRotations = new Set();

  const permutations = [
    [0, 1, 2],
    [0, 2, 1],
    [1, 0, 2],
    [1, 2, 0],
    [2, 0, 1],
    [2, 1, 0]
  ];

  permutations.forEach(([l, w, h]) => {
    const key = `${dims[l]}-${dims[w]}-${dims[h]}`;
    if (!uniqueRotations.has(key)) {
      uniqueRotations.add(key);
      uniqueRotations.add(key);
    }
  });

  return Array.from(uniqueRotations).map(rotation => {
    const [l, w, h] = rotation.split("-").map(Number);
    return { l, w, h };
  });
}


// 🔥 SORT SPACES (BEST-FIT STRATEGY)
function sortSpaces(spaces) {
  return spaces.sort((a, b) => {
    const volA = a.length * a.width * a.height;
    const volB = b.length * b.width * b.height;
    return volA - volB; // smallest space first
  });
}


// ✅ OPTIMIZATION FUNCTION (IMPROVED)
function optimizeTruck(data) {
  const { truck, items } = data;

  if (!truck || !items) {
    throw new Error("Invalid input");
  }

  // 🔥 SORT BIG → SMALL
  const sortedItems = [...items].sort(
    (a, b) => (b.length * b.width) - (a.length * a.width)
  );

  let placements = [];

  let x = 0, z = 0, y = 0;
  let rowDepth = 0;
  let layerHeight = 0;

  sortedItems.forEach(item => {
    let placed = false;

    const rotations = getRotations(item);

    for (let rot of rotations) {

      // 👉 next row
      if (x + rot.l > truck.length) {
        x = 0;
        z += rowDepth;
        rowDepth = 0;
      }

      // 👉 next layer
      if (z + rot.w > truck.width) {
        z = 0;
        x = 0;
        y += layerHeight;
        layerHeight = 0;
      }

      // 👉 cannot fit vertically
      if (y + rot.h > truck.height) continue;

      // ✅ PLACE
      placements.push({
        ...item,
        length: rot.l,
        width: rot.w,
        height: rot.h,
        x,
        y,
        z
      });

      x += rot.l;

      rowDepth = Math.max(rowDepth, rot.w);
      layerHeight = Math.max(layerHeight, rot.h);

      placed = true;
      break;
    }

    if (!placed) {
      console.warn("❌ Could not place:", item.id);
    }
  });

  // ✅ STATS
  let totalVolume = 0;
  let totalWeight = 0;

  placements.forEach(item => {
    totalVolume += item.length * item.width * item.height;
    totalWeight += item.weight || 0;
  });

  const truckVolume = truck.length * truck.width * truck.height;

  return {
    placements,
    stats: {
      spaceUtilization: ((totalVolume / truckVolume) * 100).toFixed(2),
      totalItems: placements.length,
      totalWeight
    }
  };
}

// ✅ API ROUTE
app.post("/optimize", (req, res) => {
  console.log("Incoming request:", req.body);

  try {
    const result = optimizeTruck(req.body);
    res.json(result);
  } catch (err) {
    console.error("Backend error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});


// ✅ START SERVER
app.listen(5000, () => {
  console.log("Server running on port 5000 🚀");
});