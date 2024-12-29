const { BetaAnalyticsDataClient } = require('@google-analytics/data');
require('dotenv').config();

function initializeAnalyticsClient() {
  if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
    throw new Error('Missing required Google Analytics credentials');
  }

  const credentials = {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  };

  return new BetaAnalyticsDataClient({ credentials });
}

const analyticsDataClient = initializeAnalyticsClient();

module.exports = analyticsDataClient;