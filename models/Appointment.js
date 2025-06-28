const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
