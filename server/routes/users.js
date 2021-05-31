var app = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const userCollection = require('../models/userSchema');

app.post(
  '/signup',
  passport.authenticate('signup', { session: false }),
  async (req, res, next) => {
    res.json({
      status: true,
      message: 'Signup successful',
      user: req.user
    });
  }
);

app.post(
  '/login',
  async (req, res, next) => {
    passport.authenticate(
      'login',
      async (err, user, info) => {
        try {
          if (err || !user) {
            const error = new Error('An error occurred.');

            res.status(401);
            return res.json({ status: false, message: info.message || error });
          }

          req.login(
            user,
            { session: false },
            async (error) => {
              if (error) return next(error);

              const body = { _id: user._id, email: user.email };
              const token = jwt.sign({ user: body }, process.env.MY_JWT_SECRET);

              return res.json({ status: true, user, token });
            }
          );
        } catch (error) {
          return next(error);
        }
      }
    )(req, res, next);
  }
);

app.post('/', (req, res) => {
  userCollection
    .findById(req.body._id)
    .exec(function (err, response) {
        if (err) {
            return res.json({ err, status: false, message: err?.message || 'Something went wrong on our server.' })
        }
        res.json({ customer: response, status: true })
    });
})

app.get("/list", function(req, res) {
  userCollection
    .find({ role: 'user' })
    .exec((err, data) => {
        if (err) {
          return res.json({ err, status: false, message: err?.message || 'Something went wrong on our server.' });
        } else {
          res.json({ customers: data, status: true });
        }
    });
})

module.exports = app;