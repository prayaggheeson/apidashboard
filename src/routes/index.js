const express = require("express");
const userRoutes = require("./users/users");

const router = express.Router();



const getRoute = () => {
  router.get("/", (req, res) => {
    res.status(200).json({ message: "Hello World" });
  });

  router.use("/users", userRoutes());

  return router;
};

module.exports = getRoute;
