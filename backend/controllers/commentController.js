const Comment = require('../models/Comment');

exports.addComment = async (req, res) => {
  try {
    const { postId, content } = req.body;

    const comment = new Comment({
      postId,
      content,
      userId: req.user.id
    });

    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCommentsByPost = async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).populate('userId', 'name');
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
