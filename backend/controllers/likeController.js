const Like = require('../models/Like');

exports.toggleLike = async (req, res) => {
  try {
    const { postId } = req.body;
    const userId = req.user.id;

    const existingLike = await Like.findOne({ postId, userId });

    if (existingLike) {
      await existingLike.remove();
      return res.status(200).json({ message: 'Like removed' });
    }

    const newLike = new Like({ postId, userId });
    await newLike.save();

    res.status(201).json({ message: 'Post liked' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getLikesCount = async (req, res) => {
  try {
    const count = await Like.countDocuments({ postId: req.params.postId });
    res.status(200).json({ likes: count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
