var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Item = new Schema({
    title: String,
    image: String,
    price: Number,
    description: String,
});

const itemCollection = mongoose.model("items", Item);

module.exports = itemCollection;