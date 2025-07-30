// backend/models/Application.js
const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  jobPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobPost', // Reference to your JobPost model
    required: true,
  },
  applicantName: {
    type: String,
    required: true,
  },
  applicantEmail: {
    type: String,
    required: true,
    match: [/.+@.+\..+/, 'Please fill a valid email address'], // Basic email regex
  },
  applicantPhone: {
    type: String,
    required: true,
  },
  resumePath: { // This will store the path or URL to the uploaded resume file
    type: String,
    required: true,
  },
  appliedAt: {
    type: Date,
    default: Date.now,
  },
  status: { // e.g., 'Pending', 'Reviewed', 'Rejected', 'Hired'
    type: String,
    enum: ['Pending', 'Reviewed', 'Rejected', 'Hired'],
    default: 'Pending',
  },
}, { timestamps: true });

module.exports = mongoose.model('Application', ApplicationSchema);