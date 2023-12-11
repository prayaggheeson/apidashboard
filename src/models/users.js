const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: true,
      unquie: true,
    },
    virtualMoney: {
      type:String,
      require:true,
    },
    refid:{
      type:String,
      require:true,
      unique:true,
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
