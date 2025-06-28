const express = require('express');
const router = express.Router();
const { handleChat } = require('../controllers/chatbotControllers');

// Optional: add auth middleware if needed, e.g., requireAuth
// const requireAuth = require('../middleware/auth');

router.post('/',  handleChat);

module.exports = router;
