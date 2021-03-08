const mongoose = require("mongoose");
global.AppBasePath = process.cwd();
global._ = require("underscore");
global.logger = require("./utils/logger");
let DBConnector = require("./database/dbconnector");

DBConnector.Connect()
  .then((data) => {
    console.log("Database connection successful. Starting server...");
    logger.info("Database connection successful. Starting server...");
    require("./bin/server");
  })
  .catch((err) => {
    console.error(err.stack);
    logger.error(err.message);
  });
