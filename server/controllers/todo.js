const mongoose = require('mongoose');
const Todo = require('../models/Todo');

/**
 * Get all todos in database for the user with provided token
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Function} next Function as a reference to call next middleware
 */
let getAllTodos = async (req, res, next) => {
  let user = req.userId;

  try {
    const todos = await Todo.find({ user });
    res.status(200).json(todos);
  } catch (err) {
    next(err);
  }
};

/**
 * Get all todos in database for the user with provided token
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Function} next Function as a reference to call next middleware
 */
let addTodo = async (req, res, next) => {
  let todo = req.body;
  // Set user to the _id of current user
  todo.user = req.userId;

  const newTodo = new Todo(todo);

  try {
    await newTodo.save();

    res.json({
      message: 'Todo added successfully',
      data: newTodo,
      status: 200,
    });
  } catch (err) {
    return next(err);
  }
};

/**
 * Get all todos in database for the user with provided token
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Function} next Function as a reference to call next middleware
 */
let updateTodo = async (req, res, next) => {
  const { id: _id } = req.params;

  // Check if todo exists
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    next('No todo with that id');
  }

  let todo = req.body;

  // Check if the todo belongs to the current user
  if (req.userId != todo.user) {
    next({
      status: 403,
      message: 'Unauthorized to update',
    });
  }

  const updatedTodo = await Todo.findByIdAndUpdate(_id, todo, { new: true });

  res.json({
    message: 'Todo updated successfully',
    data: updatedTodo,
    status: 200,
  });
};

/**
 * Get all todos in database for the user with provided token
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Function} next Function as a reference to call next middleware
 */
let deleteTodo = async (req, res, next) => {
  const { id: _id } = req.params;

  // Check if todo exists
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    next('No todo with that id');
  }

  const todo = await Todo.findById(_id);

  if (!todo) {
    next('No todo with that id');
    return;
  }

  // Check if the todo belongs to the current user
  if (req.userId != todo.user) {
    next({
      status: 403,
      message: 'Unauthorized to delete',
    });
  }

  await Todo.findByIdAndRemove(_id);

  res.json({
    message: 'Todo deleted successfully',
    status: 200,
  });
};

module.exports = {
  getAllTodos,
  addTodo,
  updateTodo,
  deleteTodo,
};
