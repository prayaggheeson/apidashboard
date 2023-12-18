const express = require("express");
const User = require("../../models/users");
const {transferTokens} = require("../../utils/transferToken")

const usersRouter = express.Router();

usersRouter.get("/checkuser", async (req, res) => {
  const address = req.query.address;

  try {
    const userExists = await User.findOne({ address });

    if (userExists) {
      res.status(200).json({ message: "user exists" });
    } else {
      res.status(400).json({ message: "user does not exist" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


usersRouter.post("/register", async (req, res) => {
  const { address, refid, transactionhash } = req.body;

  if (!address || !refid) {
    return res.status(400).json({ error: "Please provide address and refid" });
  }

  try {
    const alreadyExists = await User.findOne({ address, refid });

    if (alreadyExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    const virtualMoney = 50;  
    const newUser = new User({ address, refid, virtualMoney, transactionhash });
    
    await newUser.save();

    return res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

usersRouter.post("/login", async (req, res) => {
  const { address } = req.body;
 

  if (!address) {
    return res.status(400).json({ error: "Please provide an address" });
  }

  try {
    const user = await User.findOne({ address });

    if (user) {
      return res.status(200).json({ message: "Login Successfully" });
    } else {
      return res.status(404).json({ error: "User does not exist" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

usersRouter.post("/withdraw", async (req, res) => {
  const { address, amount } = req.body;

  if (!address || !amount) {
    return res.status(400).json({ error: "Please provide address and amount" });
  }

  try {
    await transferTokens(address, amount);

    const user = await User.findOne({ address });

    if (user) {
      user.virtualMoney -= amount;
      await user.save();
      return res.status(200).json({ message: "Withdrawal successful", virtualMoney: user.virtualMoney });
    } else {
      return res.status(404).json({ error: "User does not exist" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  } 
});

module.exports = usersRouter;
