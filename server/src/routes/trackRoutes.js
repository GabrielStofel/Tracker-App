const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../middlewares/requireAuth");

// In order to get access to the Track model
const Track = mongoose.model("Track");

const router = express.Router("");

// This line requires the User to be signed in
router.use(requireAuth);

router.get("/tracks", async (req, res) => {
  // Finding the tracks created by the User
  const tracks = await Track.find({ userId: req.user._id });

  res.send(tracks);
});

router.post("/tracks", async (req, res) => {
  const { name, locations } = req.body;

  if (!name || !locations) {
    return res
      .status(422)
      .send({ error: "You must provide a name and locations" });
  }

  try {
    const track = new Track({ name, locations, userId: req.user._id });
    await track.save();
    res.send(track);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

module.exports = router;
