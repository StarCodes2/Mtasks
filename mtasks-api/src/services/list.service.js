const List = require('../models/List');
const ApiError = require('../utils/ApiError');

const createList = async (title, description, owner) => {
  const list = new List({
    title,
    description,
    owner,
  });
  await list.save();
  return list;
};

const getLists = async (ownerId) => {
  return await List.find({ owner: ownerId }).sort({ createdAt: -1 });
};

const getListById = async (listId, ownerId) => {
  const list = await List.findOne({ _id: listId, owner: ownerId });
  if (!list) {
    throw new ApiError(404, 'List not found');
  }
  return list;
};

const updateList = async (listId, ownerId, title, description) => {
  const list = await List.findOneAndUpdate(
    { _id: listId, owner: ownerId },
    { title, description },
    { new: true, runValidators: true }
  );
  if (!list) {
    throw new ApiError(404, 'List not found');
  }
  return list;
};

const deleteList = async (listId, ownerId) => {
  const list = await List.findOneAndDelete({ _id: listId, owner: ownerId });
  if (!list) {
    throw new ApiError(404, 'List not found');
  }
  return { message: 'List removed' };
};

module.exports = {
  createList,
  getLists,
  getListById,
  updateList,
  deleteList,
};