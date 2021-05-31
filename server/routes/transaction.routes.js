const transactionRouter = require('express').Router();
const isAuth = require('../middlewares/auth').isAuth;
const isAdmin = require('../middlewares/auth').isAdmin;

const {
    getTransaction,
    addTransaction,
    getTransactionList
} = require('../controllers/transaction.controller');


transactionRouter.post('/', isAuth, getTransaction);
transactionRouter.post('/create', isAuth, addTransaction);
transactionRouter.get('/list', isAuth, isAdmin, getTransactionList);

module.exports = transactionRouter;