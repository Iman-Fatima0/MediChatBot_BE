const express = require('express');
const router = express.Router();
const recordController = require('../controllers/recordController');

router.post('/', recordController.createRecord);
router.get('/:userId', recordController.getRecordsByUser);
router.put('/:id', recordController.updateRecord);
router.delete('/:id', recordController.deleteRecord);

module.exports = router;
