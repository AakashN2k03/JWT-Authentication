const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Password hashing before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Password comparison method
UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", UserSchema);
module.exports = User;

// bcrypt → Library for hashing passwords securely.
// UserSchema.pre("save", ...) → A middleware hook that runs before saving a user document.
// this.isModified("password") → Checks if the password field was modified.
// bcrypt.hash(this.password, 10) → Hashes the password with salt rounds = 10 for security.
// next() → Proceeds to the next middleware or saves the data.

// Custom Method

// UserSchema.methods.comparePassword → Adds a custom method to user instances.
// async function (password) → Asynchronously accepts a password for comparison.
// bcrypt.compare(...) → Compares the input password with the hashed password.
