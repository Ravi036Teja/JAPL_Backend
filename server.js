// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv'); // Missing dotenv import
// const connectDB = require('./config/db');
// const cors = require('cors');
// const authRoutes = require('./routes/authRoutes');
// const vehicleRoutes = require('./routes/vehicleRoutes');
// const blogRoutes = require('./routes/blogRoutes');

// // Conditionally load .env files
// if (process.env.NODE_ENV === 'production') {
//   require('dotenv').config({ path: './.env.production' });
// } else {
//   require('dotenv').config({ path: './.env' });
// }

// // Initialize environment variables
// dotenv.config();

// // Connect to MongoDB
// connectDB(); // Use this OR mongoose.connect below, not both

// const app = express();
// const CORS_ORIGIN = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : [];
// // app.use(cors({
// //   origin: 'http://localhost:3000', // Your frontend URL
// //   origin: 'http://localhost:3001', // Your admin frontend URL
// //   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
// //   credentials: true
// // }));

// // Middleware
// app.use(cors({
//   origin: CORS_ORIGIN, // Use the dynamically loaded origins
//     origin: 'http://localhost:3000', // Your frontend URL
//   origin: 'http://localhost:3001', // Your admin frontend URL
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true,
// }));
// app.use(bodyParser.json());

// // Middleware
// // app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/vehicles', vehicleRoutes);
// app.use('/api/blogs', blogRoutes);

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
//   console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
//   console.log(`CORS Origins: ${CORS_ORIGIN}`);
// });

// // Start server
// const PORT = process.env.PORT || 5000; // Use env port if available
// // app.listen(PORT, () => {
// //   console.log(`Backend running on http://localhost:${PORT}`);
// // });


// --- CONDITIONAL DOTENV CONFIGURATION ---
// IMPORTANT: Place this at the very top of your file to ensure env vars are loaded before anything else
// Correct placement: This block should be the FIRST thing after basic imports
// if (process.env.NODE_ENV === 'production') {
//   require('dotenv').config({ path: './.env.production' });
// } else {
//   require('dotenv').config({ path: './.env' }); // This will load your current .env file
// }

// server.js (or app.js)

require('dotenv').config(); // This will load your single .env file regardless of NODE_ENV

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// --- DATABASE CONNECTION ---
// Define MONGODB_URI and CORS_ORIGIN *after* dotenv config
const MONGODB_URI = process.env.MONGODB_URI; // Now this will have a value from your single .env
const CORS_ORIGIN = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : []; // Now this will have a value

// Ensure MONGODB_URI is defined
if (!MONGODB_URI) {
  console.error('FATAL ERROR: MONGODB_URI is not defined in the .env file.');
  process.exit(1); // Exit the process if a critical variable is missing
}

mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

const app = express();

// --- ENVIRONMENT VARIABLES AND PORT ---
const PORT = process.env.PORT || 5000; // Define PORT here, after dotenv config

// --- MIDDLEWARE ---
app.use(express.json());

// CORS Middleware
app.use(cors({
  origin: CORS_ORIGIN, // Use the dynamically loaded origins array
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
  // Removed NODE_ENV console log as it's less relevant with a single .env
  console.log(`CORS Origins: ${CORS_ORIGIN.join(', ')}`); // This will now show the correct origins
});