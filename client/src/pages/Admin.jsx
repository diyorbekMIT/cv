import { useState, useEffect, useCallback } from 'react';
import api from '../api/client';
import TiptapEditor from '../components/TiptapEditor';

function PostForm({ post, onSave, onCancel }) {
  const [title, setTitle] = useState(post?.title || '');
  const [excerpt, setExcerpt] = useState(post?.excerpt || '');
  const [content, setContent] = useState(post?.content || '');
  const [coverImage, setCoverImage] = useState(post?.coverImage || '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleCoverUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const data = await api.upload(file);
      setCoverImage(data.url);
    } catch (err) {
      setError('Failed to upload cover image');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      if (post?._id) {
        await api.patch(`/posts/${post._id}`, { title, excerpt, content, coverImage });
      } else {
        await api.post('/posts', { title, excerpt, content, coverImage });
      }
      onSave();
    } catch (err) {
      setError(err.message || 'Failed to save post');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900">
          {post?._id ? 'Edit Post' : 'New Post'}
        </h2>
        <button type="button" onClick={onCancel} className="btn-ghost text-sm">
          ← Back to list
        </button>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="post-title" className="block text-sm font-medium text-slate-700 mb-1.5">
          Title
        </label>
        <input
          id="post-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm
                     focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
          placeholder="Post title"
        />
      </div>

      <div>
        <label htmlFor="post-excerpt" className="block text-sm font-medium text-slate-700 mb-1.5">
          Excerpt
        </label>
        <textarea
          id="post-excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={2}
          className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm resize-none
                     focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
          placeholder="Short description for the blog list..."
        />
      </div>



      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          Content
        </label>
        <TiptapEditor content={content} onChange={setContent} />
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
        <button type="button" onClick={onCancel} className="btn-ghost">
          Cancel
        </button>
        <button type="submit" disabled={saving} className="btn-primary disabled:opacity-50">
          {saving ? 'Saving...' : post?._id ? 'Update Post' : 'Publish Post'}
        </button>
      </div>
    </form>
  );
}

export default function Admin() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState(null); // null = list view, {} = new, post = edit
  const [showForm, setShowForm] = useState(false);

  const fetchPosts = useCallback(async () => {
    try {
      const data = await api.get('/posts');
      setPosts(data);
    } catch (err) {
      console.error('Failed to fetch posts:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await api.delete(`/posts/${id}`);
      setPosts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      alert('Failed to delete post: ' + err.message);
    }
  };

  const handleNewPost = () => {
    setEditingPost(null);
    setShowForm(true);
  };

  const handleEditPost = async (post) => {
    try {
      // Fetch full post with content
      const fullPost = await api.get(`/posts/${post._id}`);
      setEditingPost(fullPost);
      setShowForm(true);
    } catch (err) {
      alert('Failed to load post: ' + err.message);
    }
  };

  const handleSave = () => {
    setShowForm(false);
    setEditingPost(null);
    setLoading(true);
    fetchPosts();
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingPost(null);
  };

  if (showForm) {
    return (
      <div className="container-main py-16">
        <div className="max-w-3xl mx-auto animate-fade-in">
          <PostForm post={editingPost} onSave={handleSave} onCancel={handleCancel} />
        </div>
      </div>
    );
  }

  return (
    <div className="container-main py-16">
      <div className="animate-slide-up">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="section-heading mb-1">Admin Dashboard</h1>
            <p className="text-sm text-slate-500">Manage your blog posts</p>
          </div>
          <button onClick={handleNewPost} className="btn-primary">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Post
          </button>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-accent-200 border-t-accent-600 rounded-full animate-spin" />
          </div>
        )}

        {!loading && posts.length === 0 && (
          <div className="card p-12 text-center">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-lg font-semibold text-slate-700 mb-2">No posts yet</h3>
            <p className="text-sm text-slate-400 mb-6">Create your first blog post to get started.</p>
            <button onClick={handleNewPost} className="btn-primary">
              Create First Post
            </button>
          </div>
        )}

        {!loading && posts.length > 0 && (
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Title</th>
                    <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden sm:table-cell">Date</th>
                    <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {posts.map((post) => (
                    <tr key={post._id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-slate-900">{post.title}</p>
                        {post.excerpt && (
                          <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{post.excerpt}</p>
                        )}
                      </td>
                      <td className="px-6 py-4 hidden sm:table-cell">
                        <span className="text-sm text-slate-500">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEditPost(post)}
                            className="px-3 py-1.5 text-xs font-medium text-accent-600 bg-accent-50 rounded-lg
                                       hover:bg-accent-100 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(post._id)}
                            className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-lg
                                       hover:bg-red-100 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
