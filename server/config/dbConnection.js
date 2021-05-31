const mongoose = require("mongoose");

function dbConnection() {
    mongoose.connect(
        process.env.MONGO_DB_URI,
        { 
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        },
        function (err) {
            if (err) {
                console.log("err connecting db: ", err);
            } else {
                console.log("db successfully connected");
            }
        }
    );
}

module.exports = dbConnection;