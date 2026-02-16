const { body, validationResult } = require('express-validator');

// Validation rules for student registration    
const validateRegistration = [
    body('name').notEmpty().withMessage('Name is required').trim().escape(),
    body('email').isEmail().withMessage('Invalid email format').trim(),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long').trim(),
    body('studentId').notEmpty().withMessage('Student ID is required').trim().escape(),
];
const validateLogin = [
    body('email').isEmail().withMessage('Invalid email format').trim().normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required').trim(),
]
// Middleware to handle validation results
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}
module.exports = { validateRegistration, validateLogin, handleValidationErrors };