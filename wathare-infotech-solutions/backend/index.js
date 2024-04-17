const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/mydb', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to MongoDB');
});

// Define schema and model
const schema = new mongoose.Schema({
    ts: String,
    machine_status: Boolean,
    vibration: [Number]
});
const mon_model = mongoose.model('userbind', schema);

// to fetch documents 
app.get('/api/data', async (req, res) => {
    try {
        const data = await mon_model.find({});
        res.json(data);
    } catch (err) {
        console.error('Error fetching data from MongoDB:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// to insert a document
app.post('/api/post', async (req, res) => {
    try {
        const data = new mon_model({
            ts: req.body.ts,
            machine_status: req.body.machine_status,
            vibration: req.body.vibration
        });
        const savedData = await data.save();
        res.json(savedData);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error saving data');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  //  console.log(Server listening on port ${PORT});
});