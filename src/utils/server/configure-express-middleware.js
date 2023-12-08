const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("../../services/logger");

const configure = () => {
  try {
    const middleware = async (req, res, next) => {
      // Configuring body parser for URL-encoded and JSON requests
       bodyParser.urlencoded({
        extended: true,
        parameterLimit: 1000,
        limit: 1024 * 1024 * 10,
      })(req, res, (err) => {
        if (err) {
          return next(err);
        }

        bodyParser.json({ limit: "2mb" })(req, res, (err) => {
          if (err) {
            return next(err);
          }

          // Enable CORS for all routes
          cors()(req, res, next);
        });
      });
    };

    return middleware;
  } catch (error) {
    // Log errors with stack trace for better debugging
    logger.error(`[critical-error] ${error.stack || JSON.stringify(error)}`);
  }
};

module.exports = configure;
