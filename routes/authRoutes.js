const express = require('express');
const { registerStudent, loginStudent } = require('../controllers/authController');
const { validateRegistration, validateLogin, handleValidationErrors } = require('../middleware/validation');
const router = express.Router();
router.post('/register', validateRegistration, handleValidationErrors, registerStudent);
router.post('/login', validateLogin, handleValidationErrors, loginStudent);


module.exports = router;