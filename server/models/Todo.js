const mongoose = require('mongoose');

const todoScehma = mongoose.Schema({
  todo: String,
  completed: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Todo = mongoose.model('Todo', todoScehma);

module.exports = Todo;
