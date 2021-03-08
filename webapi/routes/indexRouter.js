const router = require("express").Router();

//importing routes
const users = require("./user/users");

//Enabling routes
router.use("/users", users);

module.exports = router;