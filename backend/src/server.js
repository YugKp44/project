const express = require('express');
const cors = require('cors');
const analyticsRoutes = require('./routes/analytics');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/analytics', analyticsRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'GA4 Analytics API is running' });
});
app.get('/hello', (req, res) => {
  res.json({ message: 'Hello World ' });
});

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});