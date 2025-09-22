const Task = require('../models/Task');
const List = require('../models/List');
const ApiError = require('../utils/ApiError');

const createTask = async (listId, title, description, priority, dueDate, ownerId) => {
  const list = await List.findOne({ _id: listId, owner: ownerId });
  if (!list) {
    throw new ApiError(404, 'List not found');
  }

  const task = new Task({
    list: listId,
    title,
    description,
    priority,
    dueDate,
  });
  await task.save();
  return task;
};

const getTasksByListId = async (listId, ownerId) => {
  const list = await List.findOne({ _id: listId, owner: ownerId });
  if (!list) {
    throw new ApiError(404, 'List not found');
  }
  return await Task.find({ list: listId }).sort({ createdAt: -1 });
};

const getTaskById = async (taskId, listId, ownerId) => {
  const list = await List.findOne({ _id: listId, owner: ownerId });
  if (!list) {
    throw new ApiError(404, 'List not found');
  }
  const task = await Task.findOne({ _id: taskId, list: listId });
  if (!task) {
    throw new ApiError(404, 'Task not found');
  }
  return task;
};

const updateTask = async (taskId, listId, ownerId, updateBody) => {
  const list = await List.findOne({ _id: listId, owner: ownerId });
  if (!list) {
    throw new ApiError(404, 'List not found');
  }
  const task = await Task.findOneAndUpdate(
    { _id: taskId, list: listId },
    updateBody,
    { new: true, runValidators: true }
  );
  if (!task) {
    throw new ApiError(404, 'Task not found');
  }
  return task;
};

const deleteTask = async (taskId, listId, ownerId) => {
  const list = await List.findOne({ _id: listId, owner: ownerId });
  if (!list) {
    throw new ApiError(404, 'List not found');
  }
  const task = await Task.findOneAndDelete({ _id: taskId, list: listId });
  if (!task) {
    throw new ApiError(404, 'Task not found');
  }
  return { message: 'Task removed' };
};

module.exports = {
  createTask,
  getTasksByListId,
  getTaskById,
  updateTask,
  deleteTask,
};