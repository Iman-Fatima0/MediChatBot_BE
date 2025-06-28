const express = require('express');
const router = express.Router();
const verifyToken = require('../utils/verifyToken');

router.get('/dashboard', verifyToken(['admin']), (req, res) => {
  res.send('Welcome admin!');
});

module.exports = router;
