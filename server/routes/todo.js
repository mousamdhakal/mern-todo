const router = require('express').Router();

const { getAllTodos, addTodo, updateTodo, deleteTodo } = require('../controllers/todo');

const {
  validateTodoInput,
} = require('../middlewares/validations/todo/todo.validation');

// Validate input before creating todo
router.post('/', validateTodoInput, addTodo);

router.get('/', getAllTodos);

// Validate input before updating todo
router.patch('/:id', validateTodoInput, updateTodo);
router.delete('/:id', deleteTodo);

module.exports = router;
