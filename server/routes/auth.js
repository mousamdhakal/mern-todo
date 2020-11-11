const express = require('express');
const { register, login } = require('../controllers/auth');

const {
  validateUserInput,
} = require('../middlewares/validations/user/user.validation');

const router = express.Router();

// Validate input before creating a user
router.post('/', validateUserInput, register);

router.post('/login', login);

module.exports = router;
