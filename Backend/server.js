const express = require("express");
const userRoutes = require("./routes/userRoutes");
const mealRoutes = require("./routes/mealRoutes");
const macrosRoutes = require("./routes/macrosRoutes");
const adminRoutes = require("./routes/adminRoutes");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

require("dotenv").config();

const app = express();

// app.get("/", (req, res) => {
//   console.log("Req Received.");
//   res.send("Hello from the server!");
// });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/user", userRoutes);

app.use("/api/meal", mealRoutes);

app.use("/api/macros", macrosRoutes);

app.use("/api/admin", adminRoutes);

mongoose
  .connect(process.env.URL)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("Listening on port 4000!");
    });
  })
  .catch((err) => {
    console.log(err);
  });
