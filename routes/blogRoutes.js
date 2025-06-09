// // routes/blogRoutes.js
// const express = require('express');
// const router = express.Router();
// const blogController = require('../controllers/blogController');

// // Public routes
// router.get('/', blogController.getAllBlogs);
// router.get('/:id', blogController.getBlogById);

// // Admin routes (e.g., protected by authentication in a real application)
// router.post('/', blogController.createBlog);
// router.patch('/:id', blogController.updateBlog); // <--- CHANGED FROM .put TO .patch
// router.delete('/:id', blogController.deleteBlog);

// module.exports = router;

// routes/blogRoutes.js
const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

// ... (other routes) ...
router.get('/', blogController.getAllBlogs);
router.get('/:id', blogController.getBlogById);

// Admin routes
router.post('/', blogController.createBlog);
router.patch('/:id', blogController.updateBlog); // <--- CHANGE BACK TO .put
router.delete('/:id', blogController.deleteBlog);

module.exports = router;