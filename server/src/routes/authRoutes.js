const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
// Using User is how we're able to interact with all the Users that are stored in Mongo
const User = mongoose.model("User");

// A Router is a little object that allows us to assosiate some number of route
// handlers with it
const router = express.Router();

// Handling a POST request to the DataBase when signing up
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = new User({ email, password });
    await user.save();

    const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
    res.send({ token });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  // Check to see if both email and password are being properly provided
  if (!email || !password) {
    return res.status(422).send({ error: "Must provide email and password" });
  }

  const user = await User.findOne({ email });

  // If user is returned null, an error is going to be displayed
  if (!user) {
    return res.status(422).send({ error: "Invalid password or email" });
  }

  try {
    await user.comparePassword(password);

    const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
    res.send({ token });
  } catch (err) {
    return res.status(422).send({ error: "Invalid password or email" });
  }
});

// A JWT (Json Web Token) is a String that authenticates a user, a proof
// they are what they say they are (the JWT works like a drivers license
// which is hard to fake and contains identifying information), this String
// is creating using a special key that only our server knows

module.exports = router;
