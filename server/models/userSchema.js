var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema({
    name: String,
    email: String,
    password: String,
    role: String
});

const userCollection = mongoose.model("users", User);

module.exports = userCollection;