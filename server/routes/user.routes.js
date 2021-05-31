const userRouter = require('express').Router();
const isAuth = require('../middlewares/auth').isAuth;

const {
    getUser,
    getUserList
} = require('../controllers/user.controller');

userRouter.get('/:id', isAuth, getUser);
userRouter.get('/list', isAuth, getUserList);

module.exports = userRouter;