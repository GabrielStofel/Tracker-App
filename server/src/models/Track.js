const mongoose = require("mongoose");

// PointsSchema gets embedded into trackSchema
// (this way, it's not necessary to type "mongoose.model("Point", pointSchema)"
const pointSchema = new mongoose.Schema({
  timestamp: Number,

  coords: {
    latitude: Number,
    longitude: Number,
    altitude: Number,
    accuracy: Number,
    heading: Number,
    speed: Number,
  },
});

const trackSchema = new mongoose.Schema({
  userId: {
    // This is a way of informing that userId is a reference to some
    // other object stored inside of MongoDB
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  name: {
    type: String,
    default: "",
  },

  locations: [pointSchema],
});

mongoose.model("Track", trackSchema);
