const analyticsDataClient = require('../config/analytics');

async function runReport(propertyId, startDate, endDate) {
  if (!propertyId) {
    throw new Error('GA4 Property ID is required');
  }

  const [response] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [
      {
        startDate: startDate,
        endDate: endDate,
      },
    ],
    dimensions: [
      {
        name: 'date',
      },
      {
        name: 'pageTitle',
      },
    ],
    metrics: [
      {
        name: 'screenPageViews',
      },
      {
        name: 'activeUsers',
      },
      {
        name: 'userEngagementDuration',
      },
    ],
  });
  
  return response;
}

function formatAnalyticsData(report) {
  if (!report || !report.rows) {
    return [];
  }

  return report.rows.map(row => ({
    date: row.dimensionValues[0].value,
    pageTitle: row.dimensionValues[1].value,
    pageViews: parseInt(row.metricValues[0].value),
    activeUsers: parseInt(row.metricValues[1].value),
    engagementDuration: parseFloat(row.metricValues[2].value),
  }));
}

module.exports = {
  runReport,
  formatAnalyticsData
};