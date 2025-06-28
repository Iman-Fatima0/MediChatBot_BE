const mongoose = require('mongoose');

const medicalRecordSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  data: { type: String, required: true }, // encrypted JSON string
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MedicalRecord', medicalRecordSchema);
