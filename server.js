const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./db");
const Rescue = require("./models/Rescue");

const app = express();
const PORT = process.env.PORT || 3000; // ✅ Render assigns PORT dynamically

app.use(bodyParser.json());
app.use(express.static("public"));

// ✅ Connect to MongoDB
connectDB();

// ✅ POST API
app.post("/rescue", async (req, res) => {
  const { animalType, location, latitude, longitude } = req.body;

  if (!animalType || !location || !latitude || !longitude) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const rescue = new Rescue({ animalType, location, latitude, longitude });
    await rescue.save();
    res.json({ message: "✅ Rescue saved successfully", rescue });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET API
app.get("/rescue", async (req, res) => {
  try {
    const requests = await Rescue.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Start server
app.listen(PORT, () => {
  console.log( Server running at http://localhost:${PORT});
});
