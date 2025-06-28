const express = require('express');
const router = express.Router();
const verifyToken = require('../utils/verifyToken');

router.get('/profile', verifyToken(), (req, res) => {
  res.send(`Hello, user ${req.user.id} with role ${req.user.role}`);
});

module.exports = router;
