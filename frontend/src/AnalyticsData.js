import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AnalyticsData = () => {
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                console.log('Fetching analytics data...');

                const response = await fetch('https://project-81hw.onrender.com/api/analytics');
                console.log('Backend Response:', response);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                console.log('Fetched Data:', result);

                if (result && result.success && result.data) {
                    setAnalytics(result.data);
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

    if (loading) {
        console.log('Loading data...');
        return <p>Loading...</p>;
    }

    if (error) {
        console.error('An error occurred:', error);
        return <p>Error: {error}</p>;
    }

    // Prepare data for the chart
    const chartData = [
        { name: 'Users', value: analytics.Users },
        { name: 'Page Views', value: analytics.PageViews },
        { name: 'Engagement Duration', value: analytics.EngagementDuration },
    ];

    return (
        <div>
            <h1>Analytics Data</h1>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default AnalyticsData;
