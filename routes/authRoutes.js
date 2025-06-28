const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getProfile } = require('../controllers/authControllers');
const verifyToken = require('../utils/verifyToken');

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected route example
router.get('/profile', verifyToken(), getProfile);

module.exports = router;
