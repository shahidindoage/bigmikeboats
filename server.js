const express = require("express");
const axios = require("axios");
const cors = require("cors");
const dotenv = require("dotenv");
// const path = require('path'); 

dotenv.config();


const app = express();
app.set("view engine", "ejs");
app.use(cors());
app.use(express.json());
// app.use(express.static(path.join(__dirname, 'public')));

// Main page - loads with all boats by default
app.get("/", async (req, res) => {
  try {
    const response = await fetch(process.env.BOAT_API_URL_ALL);
    const data = await response.json();
    const boats = data.results || data;
    res.render("index", { boats });
  } catch (error) {
    console.error("Error fetching boats:", error);
    res.render("index", { boats: [] });
  }
});

// API endpoint for all boats
app.get("/api/boats/all", async (req, res) => {
  try {
    const response = await fetch(process.env.BOAT_API_URL_ALL);
    const data = await response.json();
    const boats = data.results || data;
    res.json({ boats });
  } catch (error) {
    console.error("Error fetching all boats:", error);
    res.status(500).json({ error: "Failed to fetch all boats" });
  }
});

// API endpoint for active boats
app.get("/api/boats/active", async (req, res) => {
  try {
    const response = await fetch(process.env.BOAT_API_URL_ACTIVE);
    const data = await response.json();
    const boats = data.results || data;
    res.json({ boats });
  } catch (error) {
    console.error("Error fetching active boats:", error);
    res.status(500).json({ error: "Failed to fetch active boats" });
  }
});

// API endpoint for sold boats
app.get("/api/boats/sold", async (req, res) => {
  try {
    const response = await fetch(process.env.BOAT_API_URL_SOLD);
    const data = await response.json();
    const boats = data.results || data;
    res.json({ boats });
  } catch (error) {
    console.error("Error fetching sold boats:", error);
    res.status(500).json({ error: "Failed to fetch sold boats" });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
