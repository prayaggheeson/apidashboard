const express = require("express");
const cors = require("cors");

//internal dependency
const connectDB = require("./src/services/database");
const router = require("./src/routes/index");
const logger = require("./src/services/logger");
const pulse = require("./src/utils/heartbeat");
const configureMiddleware = require("./src/utils/server/configure-express-middleware");

(async function main() {
  try {
    logger.info("Starting API service");
    const app = express();

    // Connecting to the database
    await connectDB();

    configureMiddleware(app);

    // Registering routes
    app.use("/api", router());

    // Start the server
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });

    logger.info("Service API - Online.");

    setInterval(() => {
      pulse();
    }, 30000);
  } catch (ex) {
    logger.error(`[critical error] ${ex}`);
  }
})();
