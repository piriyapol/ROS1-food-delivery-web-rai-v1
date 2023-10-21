const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const tableRoutes = require("./routes/tableRoutes");
const orderRoutes = require("./routes/orderRoutes");
const robotRoutes = require("./routes/robotRoutes");
const menuRoutes = require("./routes/menuRoutes");

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/tables", tableRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/robot", robotRoutes);
app.use("/api/menu", menuRoutes);

// Error handling middleware

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});