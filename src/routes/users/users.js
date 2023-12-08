const express = require("express");
const User = require("../../models/users");

const usersRouter = express.Router();

usersRouter.get("/checkuser", async (req, res) => {
  const address = req.query.address;
  const userExists = User.findOne({ address });
  if (userExists) {
    res.json({ message: "user exists" });
  } else {
    res.json({ message: "user does not exist" });
  }
});

usersRouter.post("/register", async (req, res) => {
  const { address, refid } = req.query;

  if (!address || !refid) {
    return res.status(400).json({ error: "Please provide address and refid" });
  }

  try {
    const alreadyExists = await User.findOne({ address, refid });

    if (alreadyExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    const newUser = new User({ address, refid });
    await newUser.save();

    return res.json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

usersRouter.post("/login", async (req, res) => {
  const { address } = req.query;

  if (!address) {
    return res.status(400).json({ error: "Please provide an address" });
  }

  try {
    const user = await User.findOne({ address });

    if (user) {
      return res.json({ message: "Login Successfully", user });
    } else {
      return res.status(404).json({ error: "User does not exist" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = usersRouter;
