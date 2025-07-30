// backend/controllers/jobController.js
const JobPost = require('../models/JobPost'); // Import your JobPost model

// Get all job posts
exports.getAllJobPosts = async (req, res) => {
  // Logic to fetch all job posts from MongoDB
  try {
      const jobPosts = await JobPost.find();
      res.status(200).json(jobPosts);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

// Get job post by ID
exports.getJobPostById = async (req, res) => {
  // Logic to fetch a single job post by ID
  try {
      const jobPost = await JobPost.findById(req.params.id);
      if (!jobPost) return res.status(404).json({ message: 'Job post not found' });
      res.status(200).json(jobPost);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

// Create a new job post
exports.createJobPost = async (req, res) => {
  // Logic to create a new job post based on req.body
  const newJob = new JobPost(req.body);
  try {
      const savedJob = await newJob.save();
      res.status(201).json(savedJob);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
};

// Update a job post by ID
exports.updateJobPost = async (req, res) => {
  // Logic to update an existing job post by ID
  try {
      const updatedJob = await JobPost.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!updatedJob) return res.status(404).json({ message: 'Job post not found' });
      res.status(200).json(updatedJob);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
};

// Delete a job post by ID
exports.deleteJobPost = async (req, res) => {
  // Logic to delete a job post by ID
  try {
      const deletedJob = await JobPost.findByIdAndDelete(req.params.id);
      if (!deletedJob) return res.status(404).json({ message: 'Job post not found' });
      res.status(200).json({ message: 'Job post deleted successfully' });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};