const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  deleteUser,
  getAllPosts,
  deletePost
} = require('../controllers/adminController');

const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// All routes below are protected and admin-only
router.use(authMiddleware, adminMiddleware);

router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);

router.get('/posts', getAllPosts);
router.delete('/posts/:id', deletePost);

module.exports = router;
