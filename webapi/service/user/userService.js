const User = require("../../schema/users/userSchema");

module.exports = {
    /**
     * @description :: function to register new user record
     * @param  {} data
     */
    register: (data) => {
        return new Promise(async(resolve, reject) => {
            try {
                const user = new User(data);
                await user.save();
                const token = await user.generateAuthToken();
                logger.info(`User record created successfuly.`);
                resolve({ user, token });
            } catch (error) {
                logger.error(`Failed to create user record. REASON - ${error.message}`);
                reject(error);
            }
        });
    },
    /**
     * @description :: function to update user record
     * @param  {} data
     */
    update: (data) => {
        return new Promise(async(resolve, reject) => {
            try {
                const user = await User.updateOne({ _id: data._id }, { name: data.name }, { upsert: true });
                logger.info(`User record updated successfuly.`);
                resolve(user);
            } catch (error) {
                logger.error(`Failed to update user record. REASON - ${error.message}`);
                reject(error);
            }
        });
    },
    /**
     * @description :: function to find user(s) based on generic search
     * @param  {} data
     */
    find: (data) => {
        return new Promise(async(resolve, reject) => {
            try {
                let fields = ["id", "name", "email"];
                const user = await User.find(PrepareConditions(data), fields);
                logger.info(`User record retrieved successfuly.`);
                resolve(user);
            } catch (error) {
                logger.error(`Failed to find user record. REASON - ${error.message}`);
                reject(error);
            }

        });
    },
    /**
     * @description :: function to delete user data
     * @param  {} _id
     */
    delete: (_id) => {
        return new Promise(async(resolve, reject) => {
            try {
                const result = await User.deleteOne({ _id: _id }, { upsert: true });
                logger.info(`User record deleted successfuly.`);
                resolve(result)
            } catch (error) {
                logger.error(`Failed to delete user record. REASON - ${error.message}`);
                reject(error);
            }
        });
    }
}

/**
 * @description :: Dynamically prepare filter condition
 * @param  {} data
 */
function PrepareConditions(data) {
    let conditions = {}
    for (const [key, value] of Object.entries(data)) {
        switch (key) {
            case '_id':
                conditions[key] = value;
                break;
            case 'name':
            case 'email':
                conditions[key] = { $regex: value, $options: 'i' };
                break;
            default:
                break;
        }
    }
    return conditions;
}