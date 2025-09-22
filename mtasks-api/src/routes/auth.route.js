const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const validate = require('../middlewares/validation.middleware');
const { registerSchema, loginSchema } = require('../validation/auth.validation');

// @route   POST api/auth/register
// @desc    Register user
// @access  Public
router.post(
  '/register',
  validate(registerSchema),
  authController.register
);

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post(
  '/login',
  validate(loginSchema),
  authController.login
);

module.exports = router;