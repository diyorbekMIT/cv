import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  const date = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link to={`/blog/${post.slug || post._id}`} className="card group overflow-hidden block">

      <div className="p-6">
        <time className="text-xs font-medium text-slate-400 uppercase tracking-wide">{date}</time>
        <h3 className="text-lg font-semibold text-slate-900 mt-2 mb-2 group-hover:text-accent-600 transition-colors line-clamp-2">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="text-sm text-slate-500 line-clamp-3">{post.excerpt}</p>
        )}
      </div>
    </Link>
  );
}
