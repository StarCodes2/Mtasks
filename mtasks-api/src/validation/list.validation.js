const { check } = require('express-validator');

exports.createListSchema = [
  check('title', 'Title is required').not().isEmpty(),
];

exports.updateListSchema = [
  check('title', 'Title is required').optional().not().isEmpty(),
];