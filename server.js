const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

let users = [
  {
    address: "0x94C1Da4F14178AB9c2eB2f8C8351b0B6f383CF72",
  },
];

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/api/checkUser/address=:address", (req, res) => {
  const address = req.params.address;
  const userExists = users.some((user) => user.address === address);
  if (userExists) {
    res.json({ message: "user exists" });
  } else {
    res.json({ message: "user does not exist" });
  }
});

app.post("/api/register", (req, res) => {
  const { address, refid } = req.query;
  const alreadyExists = users.some((user) => user.address === address);
  if (alreadyExists) {
    res.json({ message: "user already exists" });
  }

  if (!address || !refid) {
    res.json({ message: "please provide address and refid" });
  } else {
    users.push({ address, refid });
    res.json({ message: "user registered" });
  }
});

app.post("/api/login", (req, res) => {
  const { address } = req.query;
  const userExists = users.some((user) => user.address === address);
  if (userExists) {
    res.json({ message: "already a user" });
  } else {
    res.json({ message: "user does not exist" });
  }
});

app.listen(3001, () => {
  console.log("server started ");
});
