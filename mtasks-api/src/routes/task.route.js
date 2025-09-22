const express = require('express');
const router = express.Router({ mergeParams: true });
const auth = require('../middlewares/auth.middleware');
const taskController = require('../controllers/task.controller');
const validate = require('../middlewares/validation.middleware');
const { createTaskSchema, updateTaskSchema } = require('../validation/task.validation');

// @route   POST api/lists/:listId/tasks
// @desc    Create a task for a specific list
// @access  Private
router.post(
  '/',
  [auth, validate(createTaskSchema)],
  taskController.createTask
);

// @route   GET api/lists/:listId/tasks
// @desc    Get all tasks for a specific list
// @access  Private
router.get('/', auth, taskController.getTasks);

// @route   GET api/lists/:listId/tasks/:taskId
// @desc    Get a single task by ID for a specific list
// @access  Private
router.get('/:taskId', auth, taskController.getTaskById);

// @route   PUT api/lists/:listId/tasks/:taskId
// @desc    Update a task by ID for a specific list
// @access  Private
router.put(
  '/:taskId',
  [auth, validate(updateTaskSchema)],
  taskController.updateTask
);

// @route   DELETE api/lists/:listId/tasks/:taskId
// @desc    Delete a task by ID for a specific list
// @access  Private
router.delete('/:taskId', auth, taskController.deleteTask);

module.exports = router;