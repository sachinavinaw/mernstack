const mongoose = require("mongoose");
const db = mongoose.connection;

module.exports = {
    Connect: () => {
        return new Promise((resolve, reject) => {
            try {
                //db connect
                mongoose.connect("mongodb://localhost/test", {
                    useNewUrlParser: true,
                    useCreateIndex: true,
                    useUnifiedTopology: true,
                });
                db.on("error", (err) => {
                    reject(err.message);
                });
                db.once("open", function() {
                    resolve(db);
                });
            } catch (error) {
                reject(error.message);
            }
        });
    },
};