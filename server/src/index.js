require("./models/User");
require("./models/Track");
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const trackRoutes = require("./routes/trackRoutes");
const bodyParser = require("body-parser");
const requireAuth = require("./middlewares/requireAuth");

const app = express();

// This allows the authRoutes file to deal with JSON
app.use(bodyParser.json());
// This line essentially associates all request handlers added to the Router with the main application
app.use(authRoutes);
app.use(trackRoutes);

const mongoUri =
  "mongodb+srv://admin:passwordpassword@cluster0-xtprk.mongodb.net/<dbname>?retryWrites=true&w=majority";

// Connecting to MongoDB
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance");
});
mongoose.connection.on("error", (err) => {
  console.error("Error connecting to mongo", err);
});

// What does the line of code below do?
// It's a function that's executed everytime there's a GET request to the root
// route of this application, with a request object "req" and a reponse object
// which is represented by "res"
app.get("/", requireAuth, (req, res) => {
  res.send(`Your email: ${req.user.email}`);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
