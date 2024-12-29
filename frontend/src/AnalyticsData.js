import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2'; // Import Bar chart component
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';

// Register necessary Chart.js components for bar chart
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const AnalyticsData = () => {
    const [analytics, setAnalytics] = useState(null); // Changed to null since it's an object, not an array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                console.log('Fetching analytics data...');
                
                const response = await fetch('http://localhost:3000/api/analytics');
                console.log('Backend Response:', response);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                console.log('Fetched Data:', result); // Log the entire response

                // Check if result has the expected format
                if (result && result.success && result.data) {
                    setAnalytics(result.data); // Directly set the data object
                } else {
                    throw new Error('Invalid data format');
                }
            } catch (err) {
                console.error('Error while fetching data:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, []);

    // If still loading, show loading message
    if (loading) {
        console.log('Loading data...');
        return <p>Loading...</p>;
    }

    // If there was an error, show error message
    if (error) {
        console.error('An error occurred:', error);
        return <p>Error: {error}</p>;
    }

    // Prepare data for the chart
    const chartData = {
        labels: ['Users', 'Page Views', 'Engagement Duration'], // X-axis labels for each metric
        datasets: [
            {
                label: 'Analytics Metrics', // Label for the dataset
                data: [analytics.Users, analytics.PageViews, analytics.EngagementDuration], // Values for each metric
                backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'], // Bar colors
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'], // Bar border colors
                borderWidth: 1,
            },
        ],
    };

    // Chart options
    const chartOptions = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Analytics Data', // Title for the chart
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
                    },
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Metrics', // Label for X-axis
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Values', // Label for Y-axis
                },
                beginAtZero: true, // Make sure the Y-axis starts at 0
            },
        },
    };

    // Render the chart
    return (
        <div>
            <h1>Analytics Data</h1>
            <Bar data={chartData} options={chartOptions} /> {/* Render the bar chart */}
        </div>
    );
};

export default AnalyticsData;
