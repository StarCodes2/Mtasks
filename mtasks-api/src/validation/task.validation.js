const { check } = require('express-validator');

exports.createTaskSchema = [
  check('title', 'Title is required').not().isEmpty(),
  check('priority', 'Priority must be one of low, medium, or high').optional().isIn(['low', 'medium', 'high']),
  check('dueDate', 'Due date must be a valid date').optional().isISO8601().toDate(),
];

exports.updateTaskSchema = [
  check('title', 'Title is required').optional().not().isEmpty(),
  check('completed', 'Completed must be a boolean').optional().isBoolean(),
  check('priority', 'Priority must be one of low, medium, or high').optional().isIn(['low', 'medium', 'high']),
  check('dueDate', 'Due date must be a valid date').optional().isISO8601().toDate(),
];