import { useState, useEffect } from 'react';
import api from '../api/client';
import PostCard from '../components/PostCard';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await api.get('/posts');
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="container-main py-16">
      <div className="animate-slide-up">
        <div className="max-w-3xl mb-12">
          <h1 className="section-heading">Blog</h1>
          <p className="section-subheading">
            Thoughts on life, software engineering, architecture, and building things on the web.
          </p>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-accent-200 border-t-accent-600 rounded-full animate-spin" />
          </div>
        )}

        {error && (
          <div className="card p-8 text-center">
            <p className="text-slate-500 mb-2">Could not load posts</p>
            <p className="text-sm text-slate-400">{error}</p>
          </div>
        )}

        {!loading && !error && posts.length === 0 && (
          <div className="card p-12 text-center">
            <div className="text-4xl mb-4">✍️</div>
            <h3 className="text-lg font-semibold text-slate-700 mb-2">No posts yet</h3>
            <p className="text-sm text-slate-400">
              Check back soon — new content is on the way.
            </p>
          </div>
        )}

        {!loading && !error && posts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
