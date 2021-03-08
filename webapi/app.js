const bodyParser = require("body-parser");
const cors = require("cors");
//const config = require("config");
const express = require("express");
const app = express();
const path = require('path');

var logger = require('morgan');


const indexRouter = require("./routes/indexRouter");

app.use(logger('dev'));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

app.use(indexRouter);

app.use(function (err, req, res, next) {
  res.status(500).json({
    message: err.message,
  });

  next();
});

module.exports = app;
