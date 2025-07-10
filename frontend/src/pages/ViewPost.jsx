import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/axios';

const ViewPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchPost = async () => {
    try {
      const res = await API.get(`/posts/${id}`);
      setPost(res.data);
    } catch (err) {
      alert('Failed to load post');
    }
  };

  const handleLike = async () => {
    try {
      const res = await API.post(`/posts/${id}/like`);
      setPost({ ...post, likes: res.data.likes });
    } catch (err) {
      alert('Like failed');
    }
  };

  const handleComment = async () => {
    if (!commentText.trim()) return;

    try {
      const res = await API.post(`/comments/${id}`, { content: commentText });
      setPost({ ...post, comments: [...post.comments, res.data] });
      setCommentText('');
    } catch (err) {
      alert('Failed to comment');
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  if (!post) return <div className="p-4">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      {post.image && <img src={post.image} alt="Post" className="w-full h-72 object-cover mb-4 rounded" />}
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-600 mb-4">
        By {post.author?.name || 'Unknown'} · {new Date(post.createdAt).toLocaleDateString()}
      </p>

      <div className="prose max-w-none mb-6" dangerouslySetInnerHTML={{ __html: post.content }} />

      <div className="mb-6">
        <button
          onClick={handleLike}
          className="bg-pink-500 text-white px-4 py-1 rounded hover:bg-pink-600"
        >
          ❤️ Like ({post.likes?.length || 0})
        </button>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">Comments</h3>

        <div className="space-y-2 mb-4">
          {post.comments?.map((c, idx) => (
            <div key={idx} className="border rounded p-2 bg-gray-100">
              <p className="text-sm text-gray-800">{c.content}</p>
              <p className="text-xs text-gray-500">— {c.user?.name || 'Anonymous'}</p>
            </div>
          ))}
        </div>

        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          rows={3}
          placeholder="Add a comment..."
          className="w-full p-2 border rounded mb-2"
        ></textarea>

        <button
          onClick={handleComment}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Posting...' : 'Post Comment'}
        </button>
      </div>
    </div>
  );
};

export default ViewPost;
