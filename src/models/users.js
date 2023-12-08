const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: true,
      unquie: true,
    }, 
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
