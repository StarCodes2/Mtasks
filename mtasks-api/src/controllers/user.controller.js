const asyncHandler = require('../middlewares/asyncHandler');
const { ApiError } = require('../utils/ApiError');
const httpStatus = require('http-status');
const userService = require('../services/user.service');

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await userService.getUserById(req.user.id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  user.id = user._id;
  delete user._id;
  res.status(httpStatus.OK).json({ user });
});

const updateUserDetails = asyncHandler(async (req, res) => {
  const user = await userService.updateUserById(req.user.id, req.body);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  user.id = user._id;
  delete user._id;
  res.status(httpStatus.OK).json({ user });
});

const deleteUser = asyncHandler(async (req, res) => {
  await userService.deleteUserById(req.user.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  getUserProfile,
  updateUserDetails,
  deleteUser,
};