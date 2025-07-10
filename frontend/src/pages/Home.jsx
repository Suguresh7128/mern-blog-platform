import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';

const Home = () => {
  const [posts, setPosts] = useState([]);

  <input
  type="text"
  placeholder="Search blog titles..."
  className="w-full mb-4 p-2 border rounded"
  onChange={(e) => {
    const keyword = e.target.value.toLowerCase();
    setPosts((prev) =>
      prev.filter((post) => post.title.toLowerCase().includes(keyword))
    );
  }}
/>


  const fetchPosts = async () => {
    try {
      const res = await API.get('/posts');
      setPosts(res.data);
    } catch (err) {
      console.error('Failed to fetch posts:', err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Latest Blog Posts</h1>

      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <div className="grid gap-6">
          {posts.map((post) => (
            <div key={post._id} className="border p-4 rounded shadow-sm bg-white hover:shadow-md transition">
              {post.image && (
                <img src={post.image} alt="Post Thumbnail" className="w-full h-60 object-cover rounded mb-4" />
              )}

              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-gray-600 text-sm mb-2">
                By {post.author?.name || 'Unknown'} · {new Date(post.createdAt).toLocaleDateString()}
              </p>
              <p className="line-clamp-3 text-gray-800 mb-2" dangerouslySetInnerHTML={{ __html: post.content }}></p>

              <div className="flex gap-2 flex-wrap mb-2">
                {post.tags?.map((tag, index) => (
                  <span key={index} className="text-xs bg-gray-200 px-2 py-1 rounded">
                    #{tag}
                  </span>
                ))}
              </div>

              <Link to={`/post/${post._id}`} className="text-blue-600 hover:underline">
                Read More →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
