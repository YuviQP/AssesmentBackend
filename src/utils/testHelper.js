const jwt = require('jsonwebtoken');
const User = require('../models/users');
const Fav = require('../models/fav')

exports.createUser = async ({ email, password }) => {
return User.create({ email, password });
}

exports.generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: 60 * 60 * 24 * 365 });
}

exports.createFav = async ({title,description,link,userId}) => {
    return Fav.create({title,description,link,userId});
}
