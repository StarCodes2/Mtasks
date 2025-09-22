const { check } = require('express-validator');

exports.updateUserSchema = [
  check('name', 'Name is required').optional().not().isEmpty(),
  check('email', 'Please include a valid email').optional().isEmail(),
  check('password', 'Please enter a password with 6 or more characters').optional().isLength({ min: 6 }),
];