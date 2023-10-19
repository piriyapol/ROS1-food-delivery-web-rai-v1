const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const tableRoutes = require("./routes/tableRoutes");
const orderRoutes = require("./routes/orderRoutes");
const robotRoutes = require("./routes/robotRoutes");

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/tables", tableRoutes);
app.use("/orders", orderRoutes);
app.use("/robot-control", robotRoutes);

// Error handling middleware

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
