const mongoose = require("mongoose");

const rescueSchema = new mongoose.Schema({
  animalType: { type: String, required: true },
  location: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Rescue", rescueSchema);