const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());


// ✅ Test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});


// ✅ OPTIMIZATION FUNCTION
function optimizeTruck(data) {
  const { truck, items } = data;

  if (!truck || !items) {
    throw new Error("Invalid input: truck or items missing");
  }

  // ✅ do NOT mutate original items
  const sortedItems = [...items].sort((a, b) => b.priority - a.priority);

  let placements = [];

  // initial space = full truck
  let spaces = [
    {
      x: 0,
      y: 0,
      z: 0,
      length: truck.length,
      width: truck.width,
      height: truck.height
    }
  ];

  // 🔁 place items
  sortedItems.forEach(item => {
    let placed = false;

    for (let i = 0; i < spaces.length; i++) {
      let space = spaces[i];

      // ✅ check fit
      if (
        item.length <= space.length &&
        item.width <= space.width &&
        item.height <= space.height
      ) {

        // ✅ place item
        placements.push({
          ...item,
          x: space.x,
          y: space.y,
          z: space.z
        });

        // remove used space
        spaces.splice(i, 1);

        // ✅ SAFE SPACE SPLITTING

        // Right space
        if (space.length - item.length > 0) {
          spaces.push({
            x: space.x + item.length,
            y: space.y,
            z: space.z,
            length: space.length - item.length,
            width: space.width,
            height: space.height
          });
        }

        // Front space
        if (space.width - item.width > 0) {
          spaces.push({
            x: space.x,
            y: space.y,
            z: space.z + item.width,
            length: item.length,
            width: space.width - item.width,
            height: space.height
          });
        }

        // Top space
        if (space.height - item.height > 0) {
          spaces.push({
            x: space.x,
            y: space.y + item.height,
            z: space.z,
            length: item.length,
            width: item.width,
            height: space.height - item.height
          });
        }

        placed = true;
        break;
      }
    }

    // ⚠️ if item cannot be placed
    if (!placed) {
      console.warn("Item could not be placed:", item.id);
    }
  });

  // ✅ CALCULATE STATS (ONLY PLACED ITEMS)
  let totalVolume = 0;
  let totalWeight = 0;

  placements.forEach(item => {
    totalVolume += item.length * item.width * item.height;
    totalWeight += item.weight || 0;
  });

  const truckVolume = truck.length * truck.width * truck.height;

  const stats = {
    spaceUtilization: ((totalVolume / truckVolume) * 100).toFixed(2),
    totalItems: placements.length,
    totalWeight
  };

  return { placements, stats };
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