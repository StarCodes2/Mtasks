const ApiError = require('../utils/ApiError');
const { verifyToken } = require('../services/token.service');
const userService = require('../services/user.service');

module.exports = async function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if not token
  if (!token) {
    return next(new ApiError(401, 'No token, authorization denied'));
  }

  // Verify token
  try {
    const decoded = verifyToken(token);
    req.user = await userService.findUserById(decoded.id);
    if (!req.user) {
      return next(new ApiError(401, 'Token is not valid'));
    }
    next();
  } catch (err) {
    next(new ApiError(401, 'Token is not valid'));
  }
};