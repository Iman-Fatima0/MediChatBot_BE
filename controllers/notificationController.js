const Notification = require('../models/Notification');
const admin = require('../config/firebase');
const transporter = require('../config/mailer');
// Send push + save
exports.push = async (req, res) => {
  const { token, title, body } = req.body;
  try {
    await admin.messaging().send({ token, notification: { title, body } });
    
    // Save to DB
    await Notification.create({ type: 'push', title, body, to: token });
    
    res.json({ message: 'Push sent' });
  } catch (err) {
    res.status(500).json({ error: 'Push error' });
  }
};

// Send email + save
exports.email = async (req, res) => {
  const { to, subject, text } = req.body;
  try {
    await transporter.sendMail({ from: process.env.EMAIL_USER, to, subject, text });
    
    // Save to DB
    await Notification.create({ type: 'email', to, subject, text });
    
    res.json({ message: 'Email sent' });
  } catch (err) {
    res.status(500).json({ error: 'Email error' });
  }
};
