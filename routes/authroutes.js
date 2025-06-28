const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authControllers');

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected route example
router.get('/profile', verifyToken(), getProfile);

module.exports = router;
