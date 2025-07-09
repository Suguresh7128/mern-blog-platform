const express = require('express');
const router = express.Router();
const { toggleLike, getLikesCount } = require('../controllers/likeController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, toggleLike);
router.get('/:postId', getLikesCount);

module.exports = router;
