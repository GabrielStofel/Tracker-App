const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// By just defining the User model, mongoose is going to automatically
// create the actual collection in MongoDB and store all of the information in there
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
});

// Function that is executed before the attempt to save an
// instance of a User in the database
userSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) {
    return next();
  }

  // All of this is going to Hash the "Salt" and the Password together, so the
  // DB won't be vulnerable to rainbow table attacks
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }

      user.password = hash;
      next();
    });
  });
});

// The "funtion" keyword is used because we are using the "this" keyword and
// arrow functions have a different behavior when it comes this keyword
userSchema.methods.comparePassword = function (candidatePassword) {
  const user = this;

  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
      if (err) {
        return reject(err);
      }

      if (!isMatch) {
        return reject(false);
      }

      resolve(true);
    });
  });
};

mongoose.model("User", userSchema);
