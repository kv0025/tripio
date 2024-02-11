const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

// Define API endpoints
const travelAPI = 'https://example.com/travel';
const financeAPI = 'https://example.com/finance';
const weatherAPI = 'https://example.com/weather';

// Middleware to parse JSON requests
app.use(express.json());

// Define route to fetch trip recommendations
app.post('/trips', async (req, res) => {
  try {
    // Get request data
    const { origin, destination, budget } = req.body;

    // Make request to travel API
    const travelResponse = await axios.get(travelAPI, {
      params: { origin, destination, budget }
    });

    // Make request to finance API
    const financeResponse = await axios.get(financeAPI, {
      params: { budget }
    });

    // Make request to weather API
    const weatherResponse = await axios.get(weatherAPI, {
      params: { location: destination }
    });

    // Combine responses and send to client
    const tripData = {
      travel: travelResponse.data,
      finance: financeResponse.data,
      weather: weatherResponse.data
    };
    res.json(tripData);
  } catch (error) {
    console.error('Error fetching trip data:', error);
    res.status(500).json({ error: 'An error occurred while fetching trip data' });
  }
});

// Start server
