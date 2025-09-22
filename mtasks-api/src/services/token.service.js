const jwt = require('jsonwebtoken');
const config = require('../config/config');

const generateToken = (userId) => {
  const token = jwt.sign({ id: userId }, config.jwtSecret, { expiresIn: '1h' });
  return token;
};

const verifyToken = (token) => {
  return jwt.verify(token, config.jwtSecret);
};

module.exports = {
  generateToken,
  verifyToken,
};