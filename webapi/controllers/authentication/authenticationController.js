const express = require("express");
const router = express.Router();

const User = require("../../schema/users/userSchema");
/**
 * @description :: Login Controller
 * @param  {} "/"
 * @param  {} res
 */
router.post("/", async(req, res) => {
    //Login a registered user
    try {
        const { email, password } = req.body;
        const user = await User.findByCredentials(email, password);
        if (!user) {
            return res
                .status(401)
                .json({ message: "Login failed! Check authentication credentials" });
        }
        const token = await user.generateAuthToken();
        let data = _.pick(user, "id", "name", "email");
        logger.info(`User [_id : ${data.id}] authenticated.`);
        res.status(200).json({
                message: "User successfuly logged in.",
                data: data,
                token: token,
            });
    } catch (error) {
        logger.error(`Authentication failed. REASON - ${error.message}`);
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;