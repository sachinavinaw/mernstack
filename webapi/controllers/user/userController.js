const express = require("express");
const User = require("../../schema/user/userSchema");
const authorize = require("../../middleware/authorize");
const router = express.Router();
const userService = require('../../service/user/userService');
/**
 * @description :: API to create a new user
 * @param  {} async
 * @param  {} res
 */
router.post("/register", async(req, res) => {
    try {
        const result = await userService.register(req.body);
        res.status(201).send({ user: result.user, token: result.token });
    } catch (error) {
        res.status(400).send(error);
    }
});

/**
 * @description :: API to get all users
 * @param  {} authorize middleware object
 * @param  {} res
 */
router.get("/getall", authorize, async(req, res, next) => {
    try {
        let fields = ["id", "name", "email"];
        const users = await User.find({}, fields);
        res.json(users);
    } catch (error) {
        res.status(400).send(error);
    }
});

/**
 * @description :: API to get one user
 * @param  {} authorize middleware object
 * @param  {} res
 */
router.get("/get", authorize, async(req, res, next) => {
    try {
        const user = await userService.find({ _id: req.decoded._id })
        res.status(200).json({
            message: "User details found.",
            data: user,
        });
    } catch (error) {
        res.status(400).send(error);
    }
});

/**
 * @description :: Generic API to get find user 
 * @param  {} authorize middleware object
 * @param  {} res
 */
router.post("/find", authorize, async(req, res, next) => {
    try {
        const users = await userService.find(req.body);
        res.status(200).json({
            message: "User details found.",
            data: users,
        });
    } catch (error) {
        res.status(400).send(error);
    }
});

/**
 * @description :: API to update user data
 * @param  {} authorize middleware object
 * @param  {} res
 */
router.put("/update", authorize, async(req, res) => {
    try {
        await userService.update(req.body);
        res.status(200).json({
            message: "User details updated.",
            data: [],
        });
    } catch (error) {
        res.status(400).send(error);
    }
});

/**
 * @description :: API to delete user record
 * @param  {} authorize middleware object
 * @param  {} res
 */
router.delete("/delete/:_id", authorize, async(req, res) => {
    try {
        await userService.delete(req.params._id);
        res.status(200).json({
            message: "User deleted.",
            data: [],
        });
    } catch (error) {
        res.status(400).send(error);
    }
});


module.exports = router;