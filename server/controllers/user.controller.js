const userCollection = require('../models/userSchema');

const getUser = (req, res) => {
  userCollection
    .findById(req.params.id)
    .exec(function (err, response) {
        if (err) {
            return res.json({ err, status: false, message: err?.message || 'Something went wrong on our server.' })
        }
        res.json({ customer: response, status: true })
    });
};

const getUserList = (req, res) => {
  userCollection
    .find({ role: 'user' })
    .exec((err, data) => {
        if (err) {
          return res.json({ error: err, status: false, message: err?.message || 'Something went wrong on our server.' });
        } else {
          res.json({ customers: data, status: true });
        }
    });
};

module.exports = {
    getUser,
    getUserList
};