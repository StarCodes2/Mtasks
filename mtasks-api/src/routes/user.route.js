const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const userController = require('../controllers/user.controller');
const validate = require('../middlewares/validation.middleware');
const { createUserSchema, updateUserSchema } = require('../validation/user.validation');

// @route   GET api/users/me
// @desc    Get current user
// @access  Private
router.get('/me', auth, userController.getUserProfile);

// @route   PUT api/users/me
// @desc    Update current user
// @access  Private
router.put('/me', auth, validate(updateUserSchema), userController.updateUserDetails);

// @route   DELETE api/users/me
// @desc    Delete current user
// @access  Private
router.delete('/me', auth, userController.deleteUser);

module.exports = router;