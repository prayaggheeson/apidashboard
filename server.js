const express = require("express");
const connectDB = require("./src/services/database");
const router = require("./src/routes/index");
const logger = require("./src/services/logger");
const pulse = require('./src/utils/heartbeat');
const configureMiddleware = require('./src/utils/server/configure-express-middleware');

(async function main() {
  try {
    logger.info('Starting API service');
    const app = express();

    // Connecting to the database
    await connectDB();

     // Registering routes
     app.use("/api", router());
     
    // Applying middleware
    app.use(configureMiddleware());

   

    // Start the server
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });

    logger.info('Service API - Online.');

    setInterval(() => {
      pulse();
    }, 30000);

  } catch (ex) {
    logger.error(`[critical error] ${ex}`);
  }
})();


// app.get("/", (req, res) => {
//   res.send("hello world");
// });

// app.get("/api/checkUser/address=:address", (req, res) => {
//   const address = req.params.address;
//   const userExists = User.findOne({ address });
//   if (userExists) {
//     res.json({ message: "user exists" });
//   } else {
//     res.json({ message: "user does not exist" });
//   }
// });

// app.post("/api/register", async (req, res) => {
//   const { address, refid } = req.query;

//   if (!address || !refid) {
//     return res.status(400).json({ error: "Please provide address and refid" });
//   }

//   try {
//     const alreadyExists = await User.findOne({ address, refid });

//     if (alreadyExists) {
//       return res.status(400).json({ error: "User already exists" });
//     }

//     const newUser = new User({ address, refid });
//     await newUser.save();

//     return res.json({ message: "User registered successfully", user: newUser });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// });

// app.post("/api/login", async (req, res) => {
//     const { address } = req.query;

//     if (!address) {
//       return res.status(400).json({ error: "Please provide an address" });
//     }

//     try {
//       const user = await User.findOne({ address });

//       if (user) {
//         return res.json({ message: "Login Successfully", user });
//       } else {
//         return res.status(404).json({ error: "User does not exist" });
//       }
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ error: "Internal server error" });
//     }
//   });

// app.listen(3001, () => {
//   console.log("server started ");
// });
