import { useEffect, useState } from 'react';
import API from '../api/axios';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [usersRes, postsRes] = await Promise.all([
        API.get('/admin/users'),
        API.get('/admin/posts')
      ]);
      setUsers(usersRes.data);
      setPosts(postsRes.data);
    } catch (err) {
      alert('Failed to load dashboard data');
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    await API.delete(`/admin/users/${id}`);
    fetchData();
  };

  const handleDeletePost = async (id) => {
    if (!window.confirm('Delete this post?')) return;
    await API.delete(`/admin/posts/${id}`);
    fetchData();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Users</h2>
        <ul className="space-y-2">
          {users.map((user) => (
            <li key={user._id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
              <span>{user.name} ({user.email})</span>
              <button onClick={() => handleDeleteUser(user._id)} className="bg-red-500 text-white px-3 py-1 rounded">
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Posts</h2>
        <ul className="space-y-2">
          {posts.map((post) => (
            <li key={post._id} className="flex justify-between items-center bg-white border p-2 rounded">
              <span>{post.title} by {post.author?.name}</span>
              <button onClick={() => handleDeletePost(post._id)} className="bg-red-600 text-white px-3 py-1 rounded">
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
