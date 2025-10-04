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

const allowedOrigins = [
  "https://macros-counter-sugo17.netlify.app",
  "http://macros-counter:3000",
  "https://macros-counter.sugo.co.in",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like curl or Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true); // allow this origin
      } else {
        callback(new Error("Not allowed by CORS")); // reject
      }
    },
    credentials: true, // allow cookies/auth headers if needed
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
