const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  // authorization === "Bearer {token is here}"

  if (!authorization) {
    return res.status(401).send({ error: "You must be logged in." });
  }

  // This line leaves us with just the token
  const token = authorization.replace("Bearer ", "");
  // Verifies if the tolken is valid
  jwt.verify(token, "MY_SECRET_KEY", async (err, payload) => {
    // err -> if anything goes wrong | payload -> if the verification went okay
    // Payload will hold the information that is stuck into the JWT

    if (err) {
      return res.status(401).send({ error: "You must be logged in." });
    }

    const { userId } = payload;

    const user = await User.findById(userId);
    req.user = user;
    // A sign that this middleware is all done
    next();
  });
};
