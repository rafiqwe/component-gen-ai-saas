const cors = require("cors");
require("dotenv").config();
const express = require("express");
const authRoutes = require("./routes/user.route.js");
const genRoutes = require("./routes/generate.route.js");
const app = express();
const componentRoute = require("./routes/components.route.js");

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello from Component genat SaaS backend!");
});

app.use("/api/auth", authRoutes);
app.use("/api/generate", genRoutes);
app.use("/api/components", componentRoute);
module.exports = app;
