const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const app = express();


app.use(cors());
app.use(express.json()); 


app.get('/', (req, res) => {
  res.send(' Medical Assistant Backend is Running...');
});


app.use('/api/auth', require('./routes/authroutes'));
app.use('/api/symptom', require('./routes/symptomRoutes'));
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/chatbot', require('./routes/chatbotRoutes'));
app.use('/api/symptom', require('./routes/symptomRoutes'));
app.use('/api/appointments', require('./routes/appointmentRoutes'));
app.use('/api/reminders', require('./routes/reminderRoutes'));
app.use('/api/records', require('./routes/recordRoutes'));
app.use('/api/video', require('./routes/videoRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));


app.use((err, req, res, next) => {
  console.error(' Global Error:', err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
