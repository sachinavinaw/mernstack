let app = require("../app");
let http = require("http");

//Get port from environment and store in Express.
const port = normalizePort(process.env.PORT || "5000");
const hostname = "localhost";

app.set("port", port);

//Create HTTP server.
const server = http.createServer(app);

server.listen(port, hostname);
server.on("error", onError);
server.on("listening", onListening);

//Normalize a port into a number, string, or false.
function normalizePort(val) {
  var port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}

//Event listener for HTTP server "error" event.
function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      logger.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      logger.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

//Event listener for HTTP server "listening" event.
function onListening() {
  var addr = server.address();
  let msg = `Server running at http://${addr.address}:${addr.port}`;
  console.log(msg);
  logger.info(msg);
}

process.on("uncaughtException", (error) => {
  console.error(error.message);
  logger.error(error.message);
});

process.on("unhandledRejection", (error) => {
  console.error(error.message);
  logger.error(error.message);
});

process.on("UnhandledPromiseRejectionWarning", (error) => {
  console.error(error.message);
  logger.error(error.message);
});
