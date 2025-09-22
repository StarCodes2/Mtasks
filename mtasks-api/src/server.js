require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config/config');
const authRoutes = require('./routes/auth.route');
const userRoutes = require('./routes/user.route'); // Import user routes
const authMiddleware = require('./middlewares/auth.middleware'); // Import auth middleware
const listRoutes = require('./routes/list.route');
const taskRoutes = require('./routes/task.route');
const { errorConverter, errorHandler } = require('./middlewares/error.middleware');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
  res.send('MTask API is running!');
});

// Define Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', authMiddleware, userRoutes);
app.use('/api/lists', authMiddleware, listRoutes);
app.use('/api/lists/:listId/tasks', authMiddleware, taskRoutes);

// Protected route example
app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({ msg: `Welcome ${req.user.id}, you have access to protected data!` });
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

// Connect to MongoDB
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(config.MONGODB_URI) // Use config.MONGODB_URI
    .then(() => console.log('MongoDB connected'))
    .catch(err => {
      console.error('MongoDB connection error:', err);
      process.exit(1);
    });
}

const PORT = config.port; // Use config.port

const server = app.listen(PORT, () => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(`Server running on port ${PORT}`);
  }
});

module.exports = { app, server };