const mongoose = require('mongoose');

const jobPostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Job title is required'],
        trim: true,
    },
    company: {
        type: String,
        required: [true, 'Company/Branch name is required'],
        trim: true,
    },
    location: {
        type: String,
        required: [true, 'Job location is required'],
        trim: true
    },
    jobType: {
        type: String,
        required: [true, 'Job Type is required'],
        enum: {
            values: ['Full-time', 'Part-time', 'Contract', 'Intership', 'Temporary', 'Remote', 'Hybrid'],
            message: '"{VALUE}" is not a valid job type',
        },
        trim: true,
    },
    experienceLevel: {
        type: String,
        enum: {
            values: ['Entry-level', 'Associate', 'Mid-level', 'Senior'],
            message: '"{VALUE}" is not a valid experience level',
        },
        trim: true,
    },
    department: {
        type: String,
        trim: true,
    },
    salaryRange: {
        type: String,
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Job description is required']
    },
    responsibilities: {
        type: [String],
        default: [],
    },
    requirements: {
        type: [String],
        default: [],
    },
    skills: {
        type: [String],
        default: [],
        set: (v) => Array.isArray(v) ? v.map(s => s.trim().toLowerCase()) : []
    },
    /**
   * Application Information
   */
    applicationLink: { // Direct URL to apply
        type: String,
        trim: true,
        match: [/^https?:\/\/\S+$/, 'Please use a valid URL for the application link.'] // Basic URL validation
    },
    howToApply: { // Text instructions if no direct link (e.g., "Email resume to ...")
        type: String,
        trim: true
    },

    /**
     * Job Post Status & Metadata
     */
    postedDate: {
        type: Date,
        default: Date.now, // Sets the date to the current time when the job is created
        immutable: true // This field cannot be changed after creation
    },
    expiresAt: { // Optional: Date when the job post should automatically become inactive
        type: Date,
        required: false
    },
    isActive: { // Manual toggle for activation/deactivation
        type: Boolean,
        default: true
    },
    views: { // Optional: for basic analytics
        type: Number,
        default: 0
    }
}, {
    timestamps: true // Adds `createdAt` and `updatedAt` fields automatically
});

// --- Schema Enhancements (Optional but Recommended) ---

// Text index for full-text search across multiple fields
jobPostSchema.index({
    title: 'text',
    description: 'text',
    responsibilities: 'text',
    requirements: 'text',
    skills: 'text',
    location: 'text',
    department: 'text'
}, {
    name: 'job_search_index',
    weights: {
        title: 10,
        description: 5,
        responsibilities: 3,
        requirements: 3,
        skills: 5,
        location: 7,
        department: 7
    }
});

// Regular indexes for faster filtering/sorting on common fields
jobPostSchema.index({ location: 1 });
jobPostSchema.index({ jobType: 1 });
jobPostSchema.index({ experienceLevel: 1 });
jobPostSchema.index({ postedDate: -1 }); // Index for sorting by latest jobs

// Create the Mongoose model
const JobPost = mongoose.model('JobPost', jobPostSchema);

module.exports = JobPost;
