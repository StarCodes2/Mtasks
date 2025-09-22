const User = require('../models/User');

exports.createUser = async (name, email, password) => {
  const user = new User({
    name,
    email,
    password,
  });

  await user.save();
  return user;
};

exports.findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

exports.findUserById = async (id) => {
  return await User.findById(id).select('-password');
};

exports.comparePassword = async (candidatePassword, hashedPassword) => {
  return await User.schema.methods.matchPassword.call({ password: hashedPassword }, candidatePassword);
};

const getUserById = async (id) => {
  return User.findById(id);
};

const User = require('../models/User');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.deleteOne();
  return user;
};

module.exports = {
  ...module.exports,
  getUserById,
  updateUserById,
  deleteUserById,
};