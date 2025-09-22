const authService = require('../services/auth.service');
const httpStatus = require('http-status');

const { ApiError } = require('../utils/ApiError');
const asyncHandler = require('../middlewares/asyncHandler');

exports.register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await authService.registerUser(name, email, password);
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User registration failed');
  }
  const token = await authService.generateAuthToken(user._id);
  user.id = user._id;
  delete user._id;
  res.status(httpStatus.CREATED).send({ user, token });
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.authUser(email, password);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Incorrect email or password');
  }
  const token = await authService.generateAuthToken(user._id);
  user.id = user._id;
  delete user._id;
  res.status(httpStatus.OK).send({ user, token });
});

exports.getAuthenticatedUser = asyncHandler(async (req, res, next) => {
  const user = await authService.getUserById(req.user.id);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  res.json(user);
});