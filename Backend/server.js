const express = require("express");
const userRoutes = require("./routes/userRoutes");
const mealRoutes = require("./routes/mealRoutes");
require("dotenv").config();

const app = express();

app.use("/api/user", userRoutes);

app.use("/api/meal", mealRoutes);

// listen for requests
app.listen(process.env.PORT, () => {
  console.log("Listening on port 4000!");
});
