const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { body } = req;
    const user = await User.create(body);
    const token = jwt.sign(
      { id: user._id },
      process.env.SECRET,
      { expiresIn: 60 * 60 * 24 * 365 }
    )
    res.status(201).json({ token });
  } catch(e) {
    res.status(400).json({ error: e });
  }
}

exports.login = async (req, res) => {
  try {
    const { body: { email, password } } = req;
    const user = await User.findOne({ email });
    if(!user || !password) {
      throw new Error('Email is not valid');
    }
    const isValid = await bcrypt.compare(password, user.password);
    if(!isValid) {
      throw new Error('Email is not valid');
    }
    const token = jwt.sign(
      { id: user._id },
      process.env.SECRET,
      { expiresIn: 60 * 60 * 24 * 365 }
    )
    res.status(201).json({ token });
  } catch(e) {
    res.status(401).json({ error: e });
  }
}
