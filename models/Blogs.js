// models/Blog.js
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  coverImage: {
    type: String, // URL to the image
    required: true,
  },
  content: {
    type: String, // HTML content of the blog
    required: true,
  },
  publishedDate: {
    type: Date,
    default: Date.now,
  },
  // You can add more fields like author, tags, etc.
});

module.exports = mongoose.model('Blog', blogSchema);