const express = require("express");
const userRoutes = require("./routes/userRoutes");
const mealRoutes = require("./routes/mealRoutes");
const macrosRoutes = require("./routes/macrosRoutes");
require("dotenv").config();

const app = express();

// app.get("/", (req, res) => {
//   console.log("Req Received.");
//   res.send("Hello from the server!");
// });

app.use("/api/user", userRoutes);

app.use("/api/meal", mealRoutes);

app.use("/api/macros/", macrosRoutes);

// listen for requests
app.listen(process.env.PORT || 4000, () => {
  console.log("Listening on port 4000!");
});
