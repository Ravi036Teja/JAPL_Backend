// controllers/blogController.js
const Blog = require('../models/Blogs');

// Get all blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ publishedDate: -1 }); // Sort by latest
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single blog by ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new blog (Admin only)
exports.createBlog = async (req, res) => {
  const { title, coverImage, content } = req.body;

  if (!title || !coverImage || !content) {
    return res.status(400).json({ message: 'Please provide all required fields: title, coverImage, content' });
  }

  const newBlog = new Blog({
    title,
    coverImage,
    content,
  });

  try {
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a blog by ID (Admin only)
exports.updateBlog = async (req, res) => {
  try {
    const { title, coverImage, content } = req.body;
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, coverImage, content },
      { new: true, runValidators: true } // Return the updated document and run schema validators
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a blog by ID (Admin only)
exports.deleteBlog = async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};