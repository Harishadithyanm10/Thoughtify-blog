import { Link } from 'react-router-dom'

const PLACEHOLDER = 'https://placehold.co/400x250?text=Thoughtify'

export default function PostCards({ posts = [] }) {
  if (posts.length === 0) {
    return <p className="text-gray-500 mt-6">No posts to show yet.</p>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">
      {posts.map((post) => (
        <Link
          to={`/post/${post.blog_slug}`}
          key={post.id}
          className="card overflow-hidden hover:shadow-md transition-shadow"
        >
          <img
            src={post.image || PLACEHOLDER}
            alt={post.title}
            className="w-full h-44 object-cover"
          />
          <div className="p-4">
            <span className="text-xs text-brand font-semibold uppercase">
              {post.category?.name}
            </span>
            <h3 className="font-bold text-gray-800 mt-1 line-clamp-2">{post.title}</h3>
            <p className="text-xs text-gray-500 mt-2">
              {post.author?.username} • {new Date(post.date).toLocaleDateString()}
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}
