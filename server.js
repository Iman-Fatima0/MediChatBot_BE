const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Medical Assistant Backend is Running...');
});

// API routes
app.use('/api/auth', require('./routes/authroutes'));
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/symptom', require('./routes/symptomRoutes'));
app.use('/api/appointments', require('./routes/appointmentRoutes'));
app.use('/api/reminders', require('./routes/reminderRoutes'));
app.use('/api/records', require('./routes/recordRoutes'));
app.use('/api/video', require('./routes/videoRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));

// ✅ New: chatbot integration route
app.use('/api/chatbot', require('./routes/chatbotRoutes'));

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global Error:', err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
