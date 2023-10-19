const express = require("express");
const bodyParser = require("body-parser");
const tableRoutes = require("./routes/tableRoutes");
const orderRoutes = require("./routes/orderRoutes");
const robotRoutes = require("./routes/robotRoutes");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Use your routes
app.use("/api", tableRoutes);
app.use("/api", orderRoutes);
app.use("/api", robotRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
