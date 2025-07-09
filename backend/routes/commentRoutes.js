const express = require('express');
const router = express.Router();
const { addComment, getCommentsByPost } = require('../controllers/commentController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, addComment);
router.get('/:postId', getCommentsByPost);

module.exports = router;
