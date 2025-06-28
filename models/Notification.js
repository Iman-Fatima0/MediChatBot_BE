// models/Notification.js
const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  type: { type: String, enum: ['push', 'email'], required: true },
  title: String,           // for push
  body: String,            // for push
  to: String,              // recipient email or device token
  subject: String,         // for email
  text: String,            // for email
  sentAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notification', notificationSchema);
