const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userCollection = require('../models/userSchema');

const signUp = async (req, res) => {
  const { email, password, name } = req.body;
  
  try {
    let user = await userCollection.findOne({ email });
    
    if (user) {
      return res.status(409).json({
        status: false,
        message: 'User already exists with same email address.',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await userCollection.create({ name, email, password: hashedPassword.toString(), role: "user" });
    return res.json({ status: true, message: "User registered successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      type: false,
      message: 'Internal Server Error',
    });
  }
};

const logIn = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    let user = await userCollection.findOne({ email });
    
    if (!user) {
      return res.status(400).json({
        status: false,
        message: 'Incorrect Email & Password combination',
      });
    }

    const isMatched = await bcrypt.compare(password, user.password);
    
    if (!isMatched) {
      return res.status(400).json({
        status: false,
        message: 'Incorrect Email & Password combination',
      });
    }

    const body = { _id: user._id, email: user.email, role: user.role };
    const token = jwt.sign(body, process.env.MY_JWT_SECRET);

    return res.json({ status: true, user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      type: false,
      message: 'Internal Server Error',
    });
  }
};

module.exports = {
    signUp,
    logIn,
};