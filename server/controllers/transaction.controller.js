var transactionCollection = require('../models/transactionSchema');

const getTransaction = (req, res) => {
  transactionCollection
    .findById(req.body._id)
    .exec(function (err, response) {
        if (err) {
            return res.json({ err, status: false, message: err?.message || 'Something went wrong on our server.' })
        }
        res.json({ item: response, status: true })
    });
};

const addTransaction = (req, res) => {
  let transaction = new transactionCollection({
    items: req.body.items,
    totalBill: req.body.totalBill,
    order: req.body.order,
    user: req.body.user
  });
  
  transaction
    .save((err, response) => {
      if (err) {
        return res.json({ err, status: false, message: err?.message || 'Something went wrong on our server.' })
      }

      res.json({ transaction: response, status: true, message: 'Transaction is successful.' })
    });
};

const getTransactionList = (req, res) => {
    transactionCollection
      .find()
      .populate('user')
      .populate('items')
      .exec((err, data) => {
          if (err) {
            return res.json({ err, status: false, message: err?.message || 'Something went wrong on our server.' });
          } else {
            res.json({ transactions: data, status: true });
          }
      });
};

module.exports = {
    getTransaction,
    addTransaction,
    getTransactionList
};