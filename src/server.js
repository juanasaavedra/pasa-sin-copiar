const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const bookingRoutes = require('./routes/bookings');
const courseRoutes = require('./routes/courses');
const guideRoutes = require('./routes/guides');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api/bookings', bookingRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/guides', guideRoutes);

// Serve HTML pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'admin.html'));
});

app.get('/bookings', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'bookings.html'));
});

app.get('/courses', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'courses.html'));
});

app.get('/guides', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'guides.html'));
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Visit http://localhost:${PORT} to access the application`);
});

module.exports = app;
