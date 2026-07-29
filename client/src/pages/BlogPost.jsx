import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/client';

export default function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await api.get(`/posts/${id}`);
        setPost(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-accent-200 border-t-accent-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container-main py-16">
        <div className="card p-12 text-center max-w-lg mx-auto">
          <div className="text-4xl mb-4">📄</div>
          <h2 className="text-lg font-semibold text-slate-700 mb-2">Post not found</h2>
          <p className="text-sm text-slate-400 mb-6">{error || 'The post you are looking for does not exist.'}</p>
          <Link to="/blog" className="btn-primary">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const date = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="container-main py-16">
      <article className="max-w-3xl mx-auto animate-slide-up">
        {/* Back link */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-accent-600 transition-colors mb-8"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          All Posts
        </Link>

        {/* Header */}
        <header className="mb-10">
          <time className="text-sm font-medium text-slate-400 uppercase tracking-wide">{date}</time>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-3 mb-4 leading-tight">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="text-lg text-slate-500">{post.excerpt}</p>
          )}
        </header>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="rounded-2xl overflow-hidden mb-10">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-auto"
            />
          </div>
        )}

        {/* Content */}
        <div
          className="prose-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
}
