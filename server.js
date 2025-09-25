const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./db");
const Rescue = require("./models/rescue");
const axios = require("axios");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static("public"));

// MongoDB connect
connectDB();

// POST API (Rescue Request Save)
app.post("/rescue", async (req, res) => {
  const { animalType, location, latitude, longitude } = req.body;

  if (!animalType || !location) {
    return res
      .status(400)
      .json({ error: "⚠ Animal type aur location required hai" });
  }

  try {
    let lat = latitude;
    let lng = longitude;

    // agar lat/lng frontend se nahi aaye to geocoding use karo
    if (!lat || !lng) {
      const geoRes = await axios.get(
        "https://nominatim.openstreetmap.org/search",
        {
          params: {
            q: location,
            format: "json",
            limit: 1,
          },
        }
      );

      if (geoRes.data.length > 0) {
        lat = geoRes.data[0].lat;
        lng = geoRes.data[0].lon;
      } else {
        return res.status(400).json({ error: "⚠ Location not found" });
      }
    }

    const rescue = new Rescue({
      animalType,
      location,
      latitude: lat,
      longitude: lng,
    });

    await rescue.save();
    res.json({ message: "✅ Rescue saved successfully", rescue });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET API (All Rescue Requests)
app.get("/rescue", async (req, res) => {
  try {
    const requests = await Rescue.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Server Run
app.listen(PORT, () => {
  console.log("🚀 Server running at http://localhost:" + PORT);
});