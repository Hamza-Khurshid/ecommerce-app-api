const jwt = require('jsonwebtoken');

const isAuth = function (req, res, next) {
  // get token from header
  const token = req.headers.authorization ? req.headers.authorization.replace(/^Bearer\s/, '') : '';

  // check if not token
  if (!token) {
    return res.status(401).json({ message: 'Not Authorized' });
  }

  // verify token
  try {
    const decoded = jwt.verify(token, process.env.MY_JWT_SECRET);

    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is invalid' });
  }
};

const isAdmin = function (req, res, next) {
  try {
    if (req.user.role === 'admin') {
      req.admin = true;
      next();
    } else {
      return res.status(401).json({ message: 'Not Authorized' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

module.exports = {
  isAuth,
  isAdmin
}