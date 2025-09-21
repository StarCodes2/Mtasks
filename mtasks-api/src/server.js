require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config/config');
const authRoutes = require('./routes/auth.route');
const authMiddleware = require('./middlewares/auth.middleware'); // Import auth middleware

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
  res.send('MTask API is running!');
});

app.use('/api/auth', authRoutes);

// Protected route example
app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({ msg: `Welcome ${req.user.id}, you have access to protected data!` });
});

// Connect to MongoDB
mongoose.connect(config.mongoURI) // Use config.mongoURI
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

const PORT = config.port; // Use config.port

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));