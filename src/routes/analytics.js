const express = require('express');
const router = express.Router();
const { runReport, formatAnalyticsData } = require('../utils/reportHelper');

router.get('/', async (req, res) => {
  try {
    // Validate environment variables
    if (!process.env.GOOGLE_CLIENT_EMAIL) {
      return res.status(400).json({
        success: false,
        error: 'Google client email is not configured'
      });
    }

    if (!process.env.GOOGLE_PRIVATE_KEY) {
      return res.status(400).json({
        success: false,
        error: 'Google private key is not configured'
      });
    }

    const propertyId = process.env.GA4_PROPERTY_ID;
    if (!propertyId) {
      return res.status(400).json({
        success: false,
        error: 'GA4 Property ID is not configured'
      });
    }

    const { startDate = '7daysAgo', endDate = 'today' } = req.query;
    console.log('Fetching analytics with params:', {
      propertyId,
      startDate,
      endDate,
      clientEmail: process.env.GOOGLE_CLIENT_EMAIL.substring(0, 10) + '...'
    });

    const report = await runReport(propertyId, startDate, endDate);
    const formattedData = formatAnalyticsData(report);

    res.json({
      success: true,
      data: formattedData,
    });
  } catch (error) {
    console.error('Detailed error:', {
      message: error.message,
      stack: error.stack,
      code: error.code,
      details: error.details
    });

    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch analytics data',
      details: error.code ? `Error code: ${error.code}` : undefined
    });
  }
});

module.exports = router;