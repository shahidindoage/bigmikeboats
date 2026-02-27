const express = require("express");
const axios = require("axios");
const cors = require("cors");
const dotenv = require("dotenv");


dotenv.config();


const app = express();
app.set("view engine", "ejs");
app.use(cors());

app.get("/", async (req, res) => {
  const response = await fetch(process.env.BOAT_API_URL1);
  const data = await response.json();

  const boats = data.results || data;

  res.render("index", { boats });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});