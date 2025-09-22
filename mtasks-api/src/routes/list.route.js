const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const listController = require('../controllers/list.controller');
const taskRoutes = require('./task.route'); // Import task routes
const validate = require('../middlewares/validation.middleware');
const { createListSchema, updateListSchema } = require('../validation/list.validation');

// @route   POST api/lists
// @desc    Create a list
// @access  Private
router.post('/', auth, validate(createListSchema), listController.createList);

// @route   GET api/lists
// @desc    Get all lists
// @access  Private
router.get('/', auth, listController.getLists);

// @route   GET api/lists/:id
// @desc    Get list by ID
// @access  Private
router.get('/:listId', auth, listController.getListById);

// @route   PUT api/lists/:id
// @desc    Update a list
// @access  Private
router.put('/:listId', auth, validate(updateListSchema), listController.updateList);

// @route   DELETE api/lists/:id
// @desc    Delete a list
// @access  Private
router.delete('/:listId', auth, listController.deleteList);

// Mount task routes


module.exports = router;