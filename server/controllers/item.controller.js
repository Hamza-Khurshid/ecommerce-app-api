const itemCollection = require('../models/itemSchema');

const getItem = (req, res) => {
  itemCollection
    .findById(req.body._id)
    .exec(function (err, response) {
        if (err) {
            return res.json({ err, status: false, message: err?.message || 'Something went wrong on our server.' })
        }
        res.json({ item: response, status: true })
    });
};

const deleteItem = (req, res) => {
  itemCollection
    .findOneAndDelete({ _id: req.body._id })
    .exec(function (err, response) {
        if (err) {
          return res.json({ err, status: false, message: err?.message || 'Something went wrong on our server.' })
        }
        res.json({ item: response, status: true, message: 'Item deleted successfully.' })
    });
};

const updateItem = (req, res) => {
  itemCollection
    .findOneAndUpdate(
      { _id: req.body._id },
      {
        $set: {
          title: req.body.title,
          price: req.body.price,
          description: req.body.description,
        },
      }, { new: true })
    .exec(function (err, response) {
        if (err) {
            return res.json({ err, status: false, message: err?.message || 'Something went wrong on our server.' })
        }
        res.json({ item: response, status: true, message: 'Item updated successfully.' })
    });
};

const addItem = (req, res) => {
  let item = new itemCollection({
    title: req.body.title,
    price: req.body.price,
    image: req.file.path.slice(8),
    description: req.body.description,
  });
  
  item
    .save((err, response) => {
      if (err) {
        return res.json({ err, status: false, message: err?.message || 'Something went wrong on our server.' })
      }

      res.json({ item: response, status: true, message: 'Item created successfully.' })
    });
};

const getItemsList = (req, res) => {
    itemCollection
      .find()
      .exec((err, data) => {
          if (err) {
            return res.json({ err, status: false, message: err?.message || 'Something went wrong on our server.' });
          } else {
            res.json({ items: data, status: true });
          }
      });
};

module.exports = {
    getItem,
    deleteItem,
    addItem,
    updateItem,
    getItemsList
};