const authRouter = require('express').Router();

const {
    signUp,
    logIn,
} = require('../controllers/auth.controller');

authRouter.post('/signup', signUp);
authRouter.post('/login', logIn);
authRouter.get('/', (req, res) => {
    res.status(200).send({ status: true, message: "Server wroking..." })
});

module.exports = authRouter;