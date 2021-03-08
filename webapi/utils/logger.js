const moment = require("moment");
var winston = require("winston");
require("winston-daily-rotate-file");
const path = require("path");

const PATH_LOG_FILE = path.join(AppBasePath, "Logs");

//Custom log format
const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf(
    (info) =>
      `${moment(info.timestamp).format(
        "YYYY-MM-DD;HH:mm:ss.SSS"
      )};${info.level.toUpperCase()};${info.message}`
  )
);

var transport = new winston.transports.DailyRotateFile({
  filename: "%DATE%-app-server", //File name pattern to be made
  dirname: PATH_LOG_FILE, //Directory to store log files
  datePattern: "YYYY-MM-DD",
  zippedArchive: false, //Option for archeving the log files
  maxSize: "10m", //Maximum size for log file partition
  maxFiles: "14d", //Remove files based on no. of days or no. of files
  extension: ".log",
  handleExceptions: true,
});

var logger = winston.createLogger({
  format: logFormat,
  transports: [transport],
});

module.exports = logger;
