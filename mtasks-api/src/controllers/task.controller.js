const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const taskService = require('../services/task.service');
const listService = require('../services/list.service');

exports.createTask = async (req, res) => {
  const { listId } = req.params;
  const userId = req.user.id;

  const list = await listService.getListById(listId);
  if (!list || list.owner.toString() !== userId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'List not found or not owned by user');
  }

  const task = await taskService.createTask(listId, req.body);
  task.id = task._id; // Add 'id' field to task object
  res.status(httpStatus.CREATED).json(task);
};

exports.getTasks = async (req, res) => {
  const { listId } = req.params;
  const userId = req.user.id;

  const list = await listService.getListById(listId);
  if (!list || list.owner.toString() !== userId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'List not found or not owned by user');
  }

  const tasks = await taskService.getTasksByListId(listId);
  res.status(httpStatus.OK).json(tasks);
};

exports.getTaskById = async (req, res) => {
  const { listId, taskId } = req.params;
  const userId = req.user.id;

  const list = await listService.getListById(listId);
  if (!list || list.owner.toString() !== userId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'List not found or not owned by user');
  }

  const task = await taskService.getTaskById(taskId);
  if (!task || task.list.toString() !== listId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Task not found in this list or not associated with the provided listId');
  }
  task.id = task._id; // Add 'id' field to task object
  res.status(httpStatus.OK).json(task);
};

exports.updateTask = async (req, res) => {
  const { listId, taskId } = req.params;
  const userId = req.user.id;

  const list = await listService.getListById(listId);
  if (!list || list.owner.toString() !== userId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'List not found or not owned by user');
  }

  const task = await taskService.getTaskById(taskId);
  if (!task || task.list.toString() !== listId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Task not found in this list or not associated with the provided listId');
  }

  const updatedTask = await taskService.updateTask(taskId, req.body);
  updatedTask.id = updatedTask._id; // Add 'id' field to updatedTask object
  res.status(httpStatus.OK).json(updatedTask);
};

exports.deleteTask = async (req, res) => {
  const { listId, taskId } = req.params;
  const userId = req.user.id;

  const list = await listService.getListById(listId);
  if (!list || list.owner.toString() !== userId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'List not found or not owned by user');
  }

  const task = await taskService.getTaskById(taskId);
  if (!task || task.list.toString() !== listId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Task not found in this list or not associated with the provided listId');
  }

  await taskService.deleteTask(taskId);
  res.status(httpStatus.NO_CONTENT).send(); // No content for successful deletion
};