// Import required modules
const express = require('express');
const router = express.Router();
const connectToDatabase = require('../db');
 // Assuming your MongoDB connection setup is in a separate file

// Route to fetch all data
router.get('/data', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('sampledata');
        const data = await collection.find({}).toArray();
        res.json(data);
    } catch (err) {
        console.error('Error fetching data from MongoDB:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to filter data based on time intervals
router.get('/data/filter', async (req, res) => {
    const { startTime, endTime } = req.query;
    try {
        const db = await connectToDatabase();
        const collection = db.collection('sampledata');
        const filteredData = await collection.find({
            timestamp: { $gte: new Date(startTime), $lte: new Date(endTime) }
        }).toArray();
        res.json(filteredData);
    } catch (err) {
        console.error('Error filtering data from MongoDB:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to generate summary
router.get('/data/summary', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('sampledata');
        const data = await collection.find({}).toArray();
        // Implement logic to generate summary
        // Example: Calculate number of 1s, number of 0s, continuous variations, etc.
        const summary = {
            numOnes: data.filter(item => item.sample === 1).length,
            numZeros: data.filter(item => item.sample === 0).length,
            // Add more summary calculations here
        };
        res.json(summary);
    } catch (err) {
        console.error('Error generating summary from MongoDB:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
