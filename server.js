const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const portfolioRoutes = require('./routes/portfolio');
const transactionRoutes = require('./routes/transaction');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/transaction', transactionRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true,
    status: 'OK', 
    message: 'Mutual Fund API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// 404 handler for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Global error handler:', error);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Mutual Fund API server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📍 API Documentation:`);
  console.log(`   - POST /api/auth/login - User login`);
  console.log(`   - GET  /api/portfolio - Get user portfolio`);
  console.log(`   - GET  /api/portfolio/funds - Get available funds`);
  console.log(`   - POST /api/transaction/buy - Buy mutual funds`);
  console.log(`   - POST /api/transaction/sell - Sell mutual funds`);
  console.log(`   - GET  /api/transaction/history - Get transaction history`);
});

module.exports = app;