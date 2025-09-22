const { check } = require('express-validator');

exports.updateUserSchema = [
  check('name', 'Name is required').optional().not().isEmpty(),
  check('email', 'Please include a valid email').optional().isEmail().normalizeEmail(),
  check('password', 'Please enter a password with 6 or more characters').optional().isLength({ min: 6 }),
];

exports.createUserSchema = [
  check('name', 'Name is required').trim().not().isEmpty(),
  check('email', 'Please include a valid email').isEmail().normalizeEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
];