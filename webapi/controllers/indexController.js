const router = require("express").Router();

//importing controllers
const authenticationController = require("./authentication/authenticationController");
const userController = require("./user/userController");


//Enabling controllers
router.use("/login", authenticationController);
router.use("/users", userController);

module.exports = router;