const itemRouter = require('express').Router();
const upload = require('../config/upload');
const isAuth = require('../middlewares/auth').isAuth;
const isAdmin = require('../middlewares/auth').isAdmin;

const {
    getItem,
    deleteItem,
    updateItem,
    addItem,
    getItemsList
} = require('../controllers/item.controller');

itemRouter.post('/', isAuth, getItem);
itemRouter.post('/delete', isAuth, isAdmin, deleteItem);
itemRouter.post('/update', isAuth, isAdmin, updateItem);
itemRouter.post('/create', isAuth, isAdmin, upload.single('image'), addItem);
itemRouter.get('/list', isAuth, getItemsList);

module.exports = itemRouter;