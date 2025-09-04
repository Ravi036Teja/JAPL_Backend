require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// --- DATABASE CONNECTION ---
const MONGODB_URI = process.env.MONGODB_URI;

// Ensure MONGODB_URI is defined
if (!MONGODB_URI) {
    console.error('FATAL ERROR: MONGODB_URI is not defined in the .env file.');
    process.exit(1);
}

mongoose.connect(MONGODB_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

const app = express();

// --- ENVIRONMENT VARIABLES AND PORT ---
const PORT = process.env.PORT || 5000;

// --- MIDDLEWARE ---
app.use(express.json());

// CORS Middleware - Directly define multiple origins here
app.use(cors({
    origin: [
        // 'http://localhost:3000', // Your local development frontend
        // 'http://localhost:3001', // Your local development admin panel
        // 'https://janathaautomobiles.netlify.app', // Your deployed frontend
        'https://japl-adminpanel.onrender.com', // Your deployed admin panel
        'https://japl-admin-panel.netlify.app',
        'https://japl.co.in' // Another deployed frontend
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

// --- ROUTES ---
const authRoutes = require('./routes/authRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes');
const blogRoutes = require('./routes/blogRoutes');
const jobRoutes = require('./routes/jobRoutes');
const applicationRoutes = require('./routes/applicationRoutes');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/applications', applicationRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/jobs', jobRoutes);

// Basic test route
app.get('/', (req, res) => {
    res.send('Backend API is running!');
});

// --- SERVER START ---
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    // No longer logging CORS Origins as it's hardcoded and obvious from the code
});