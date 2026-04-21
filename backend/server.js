const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ Example Schema & Model
const artworkSchema = new mongoose.Schema({
  name: String,
  year: String,
  description: String
});

const Artwork = mongoose.model("Artwork", artworkSchema);

// ✅ Routes
app.get("/", (req, res) => {
  res.send("Ombra backend is running 🚀");
});

app.get("/api/artworks", async (req, res) => {
  const artworks = await Artwork.find();
  res.json(artworks);
});

app.post("/api/artworks", async (req, res) => {
  const newArtwork = new Artwork(req.body);
  await newArtwork.save();
  res.json(newArtwork);
});

app.get("/api/quiz", (req, res) => {
  res.json([
    { question: "When was the Roman Empire founded?", answer: "27 BC" },
    { question: "Who painted the Mona Lisa?", answer: "Leonardo da Vinci" }
  ]);
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
