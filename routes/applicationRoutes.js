// backend/routes/applicationRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // Node.js File System module

const Application = require('../models/Application');
const JobPost = require('../models/JobPost'); // Assuming you have this model

// --- Multer Configuration for Resume Uploads ---
const UPLOAD_DIR = path.join(__dirname, '../uploads/resumes');

// Ensure the upload directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    // Generate a unique filename with timestamp and original extension
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
  fileFilter: (req, file, cb) => {
    const filetypes = /pdf|docx/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only PDF and DOCX files are allowed!'));
  },
}).single('resume'); // 'resume' is the field name for the file from the frontend

// --- Public Route: Submit Job Application ---
// @route   POST /api/applications
// @desc    Submit a new job application with resume
// @access  Public
router.post('/', (req, res) => {
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: err.message }); // Multer errors (e.g., file size)
    } else if (err) {
      return res.status(500).json({ message: err.message }); // Other unexpected errors
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Resume file is required.' });
    }

    const { jobId, applicantName, applicantEmail, applicantPhone } = req.body;

    if (!jobId || !applicantName || !applicantEmail || !applicantPhone) {
      // If required text fields are missing, delete the uploaded file
      fs.unlink(req.file.path, (unlinkErr) => {
        if (unlinkErr) console.error('Error deleting incomplete resume file:', unlinkErr);
      });
      return res.status(400).json({ message: 'All form fields (Name, Email, Phone) and a resume are required.' });
    }

    try {
      // Optional: Verify if the job exists and is active
      const jobExists = await JobPost.findById(jobId);
      if (!jobExists || !jobExists.isActive) {
        fs.unlink(req.file.path, (unlinkErr) => {
          if (unlinkErr) console.error('Error deleting resume for non-existent job:', unlinkErr);
        });
        return res.status(404).json({ message: 'Job not found or is inactive.' });
      }

      // Create new application entry
      const newApplication = new Application({
        jobPost: jobId,
        applicantName,
        applicantEmail,
        applicantPhone,
        resumePath: `/uploads/resumes/${req.file.filename}`, // Store public path
      });

      await newApplication.save();
      res.status(201).json({ message: 'Application submitted successfully!', application: newApplication });
    } catch (dbErr) {
      console.error('Database error saving application:', dbErr);
      // If DB save fails, delete the uploaded file to prevent orphans
      fs.unlink(req.file.path, (unlinkErr) => {
        if (unlinkErr) console.error('Error deleting resume after DB failure:', unlinkErr);
      });
      res.status(500).json({ message: 'Failed to save application details.' });
    }
  });
});


// --- Admin Route: Get All Job Applications ---
// @route   GET /api/applications
// @desc    Get all job applications (for admin panel)
// @access  Private (e.g., requires admin authentication middleware)
router.get('/', async (req, res) => {
  try {
    // Populate jobPost to get job title and company directly
    const applications = await Application.find().populate('jobPost', 'title company'); // Only fetch title and company
    res.status(200).json(applications);
  } catch (err) {
    console.error('Error fetching applications for admin:', err);
    res.status(500).json({ message: 'Server error fetching applications.' });
  }
});


// Add other admin application routes (e.g., update status, delete application)
// router.patch('/:id/status', protect, authorize('admin'), async (req, res) => { ... });
// router.delete('/:id', protect, authorize('admin'), async (req, res) => { ... });

module.exports = router;