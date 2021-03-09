const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("config");
const express = require("express");
const app = express();

const indexRouter = require("./controllers/indexController");

if (!config.get("jwtPrivateKey")) {
    console.error("FATAL ERROR : JWT Secret key not found");
    logger.error("FATAL ERROR : JWT Secret key not found");
    process.exit(1);
}

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

app.use(indexRouter);

// If route not found : 404
app.use(function(req, res, next) {
    return res.status(404).send({
        message: `Route '${req.url}' not found.`
    });
});

app.use(function(err, req, res, next) {
    logger.error(`[internal-processing] ${error.stack}`);
    res.status(500).json({
        message: err.message,
    });
    next();
});

module.exports = app;