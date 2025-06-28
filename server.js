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

// API Routes
app.use('/api/auth', require('./routes/authroutes'));

app.use((err, req, res, next) => {
  console.error(' Global Error:', err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
