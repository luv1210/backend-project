const express = require("express");
const app = express();
const indexRoutes = require("./routes/index");

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use("/", indexRoutes);

// Default route
app.get("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
