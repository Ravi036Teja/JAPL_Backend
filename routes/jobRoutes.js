const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController'); // Import your job controller functions
// const authMiddleware = require('../middleware/authMiddleware'); // Uncomment if you have authentication middleware

// --- Public Routes (accessible by anyone) ---

/**
 * @route GET /api/jobs
 * @desc Get all job posts
 * @access Public
 */
router.get('/', jobController.getAllJobPosts);

/**
 * @route GET /api/jobs/:id
 * @desc Get a single job post by ID
 * @access Public
 */
router.get('/:id', jobController.getJobPostById);


// --- Admin/Protected Routes (require authentication) ---
// You would add authMiddleware here to protect these routes.
// Example: router.post('/', authMiddleware, jobController.createJobPost);

/**
 * @route POST /api/jobs
 * @desc Create a new job post
 * @access Private (Admin)
 */
router.post('/',
  // authMiddleware, // Uncomment this line once you have your authentication middleware set up
  jobController.createJobPost
);

/**
 * @route PATCH /api/jobs/:id
 * @desc Update a job post by ID
 * @access Private (Admin)
 *
 * Use PATCH for partial updates. If you prefer full replacement, use PUT.
 * Your frontend (blogapi.js) is set to use PATCH, so ensure your backend matches.
 */
router.patch('/:id',
  // authMiddleware, // Uncomment this line once you have your authentication middleware set up
  jobController.updateJobPost
);

/**
 * @route DELETE /api/jobs/:id
 * @desc Delete a job post by ID
 * @access Private (Admin)
 */
router.delete('/:id',
  // authMiddleware, // Uncomment this line once you have your authentication middleware set up
  jobController.deleteJobPost
);

module.exports = router;