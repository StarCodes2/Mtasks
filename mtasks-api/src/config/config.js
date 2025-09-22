require('dotenv').config();

module.exports = {
require('dotenv').config();

const { MONGODB_URI, JWT_SECRET, PORT, NODE_ENV } = process.env;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is required');
}
if (!MONGODB_URI && NODE_ENV !== 'test') {
  throw new Error('MONGODB_URI is required');
}

module.exports = {
  MONGODB_URI,
  JWT_SECRET,
  // Temporary aliases for backward-compat; remove after consumers are updated
  mongoURI: MONGODB_URI,
  jwtSecret: JWT_SECRET,
  port: PORT || 5000,
};
  port: process.env.PORT || 5000
};