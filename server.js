//import nodemodule
var cors = require("cors");
var express = require("express");
var bodyParser = require("body-parser");

require('dotenv').config();
const PORT = process.env.PORT || 8080;

//import from custom files
var dbConnection = require ('./server/config/dbConnection');
var authRoutes = require('./server/routes/auth.routes');
var userRoutes = require('./server/routes/user.routes');
var itemRoutes = require('./server/routes/item.routes');
var transactionRoutes = require('./server/routes/transaction.routes');

//add middleware
var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/uploads'));

//db connection
dbConnection();

// routes
app.use('/api', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/item', itemRoutes);
app.use('/api/transaction', transactionRoutes);

app.listen(PORT, function() {
  console.log(`express server running on port ${PORT}`);
});