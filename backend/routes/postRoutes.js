const express = require('express');
const router = express.Router();
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost
} = require('../controllers/postController');

const authMiddleware = require('../middleware/authMiddleware');

// Public Routes
router.get('/', getAllPosts);
router.get('/:id', getPostById);

// Protected Routes
router.post('/', authMiddleware, createPost);
router.put('/:id', authMiddleware, updatePost);
router.delete('/:id', authMiddleware, deletePost);

module.exports = router;
