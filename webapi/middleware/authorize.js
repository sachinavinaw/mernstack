let jwt = require("jsonwebtoken");
const config = require("config");
const jwtConfig = config.get("jwt");

module.exports = function (req, res, next) {
  let token = req.headers["x-access-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase
  if (token.startsWith("Bearer ")) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (token) {
    jwt.verify(token, jwtConfig, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: "Token is not valid",
          data: null,
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(401).json({
      message: "Authorization token is missing",
      data: null,
    });
  }
};
