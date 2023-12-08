const logger = require("../services/logger");

const pulse = () => {
  logger.info(".");
  return;
};

module.exports = pulse;
