const express = require("express");
const userRoutes = require("./routes/userRoutes");
const mealRoutes = require("./routes/mealRoutes");
const macrosRoutes = require("./routes/macrosRoutes");
const adminRoutes = require("./routes/adminRoutes");
const homeRoutes = require("./routes/homeRoutes");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const app = express();
app.use(cookieParser());

// app.get("/", (req, res) => {
//   console.log("Req Received.");
//   res.send("Hello from the server!");
// });
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: "*",
  })
);

app.use("/api", homeRoutes);

app.use("/api/user", userRoutes);

app.use("/api/meal", mealRoutes);

app.use("/api/macros", macrosRoutes);

app.use("/api/admin", adminRoutes);

mongoose
  .connect(process.env.URL)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT || 4000, () => {
      console.log("Listening on port", process.env.PORT || 4000);
    });
  })
  .catch((err) => {
    console.log(err);
  });
