const listService = require('../services/list.service');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

const createList = async (req, res) => {
  const list = await listService.createList(req.user.id, req.body);
  list.id = list._id;
  delete list._id;
  res.status(httpStatus.CREATED).send(list);
};

const getLists = async (req, res) => {
  const lists = await listService.getLists(req.user.id);
  const sanitizedLists = lists.map(list => {
    list.id = list._id;
    delete list._id;
    return list;
  });
  res.status(httpStatus.OK).send(sanitizedLists);
};

const getListById = async (req, res) => {
  const list = await listService.getListById(req.params.listId, req.user.id);
  if (!list) {
    throw new ApiError(httpStatus.NOT_FOUND, 'List not found');
  }
  list.id = list._id;
  delete list._id;
  res.status(httpStatus.OK).send(list);
};

const updateList = async (req, res) => {
  const list = await listService.updateList(req.params.listId, req.user.id, req.body);
  if (!list) {
    throw new ApiError(httpStatus.NOT_FOUND, 'List not found');
  }
  list.id = list._id;
  delete list._id;
  res.status(httpStatus.OK).send(list);
};

const deleteList = async (req, res) => {
  await listService.deleteList(req.params.listId, req.user.id);
  res.status(httpStatus.NO_CONTENT).send();
};

module.exports = {
  createList,
  getLists,
  getListById,
  updateList,
  deleteList,
};