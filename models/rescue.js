import mongoose from "mongoose";

const rescueSchema = new mongoose.Schema({
  animal: { type: String, required: true },
  location: { type: String, required: true },
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Rescue", rescueSchema);
