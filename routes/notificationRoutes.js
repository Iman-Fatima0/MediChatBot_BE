const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

router.post('/push', notificationController.push);
router.post('/email', notificationController.email);

module.exports = router;
