const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authControllers');
const verifyToken = require('../utils/verifyToken');


router.post('/register', registerUser);
router.post('/login', loginUser);


router.get('/profile', verifyToken(), getProfile);

module.exports = router;
