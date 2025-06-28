const express = require('express');
const router = express.Router();
const { checkSymptoms } = require('../controllers/symptomController');

// POST /api/symptom/check
router.post('/check', checkSymptoms);

module.exports = router;
