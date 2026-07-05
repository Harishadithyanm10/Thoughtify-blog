import { Link } from 'react-router-dom'

const PLACEHOLDER = 'https://placehold.co/60x60?text=T'

function MiniList({ title, posts }) {
  return (
    <div className="card p-4">
      <h5 className="font-bold text-brand mb-3">{title}</h5>
      <div className="space-y-3">
        {posts.length === 0 && <p className="text-xs text-gray-400">Nothing here yet.</p>}
        {posts.map((post) => (
          <Link
            to={`/post/${post.blog_slug}`}
            key={post.id}
            className="flex gap-3 items-center hover:bg-gray-50 rounded-md p-1 -m-1"
          >
            <img
              src={post.image || PLACEHOLDER}
              alt={post.title}
              className="w-12 h-12 rounded-md object-cover flex-shrink-0"
            />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-brand truncate">{post.title}</p>
              <p className="text-xs text-gray-500">
                {post.author?.username} • {new Date(post.date).toLocaleDateString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default function Sidebar({ recent = [], pop = [], trending = [] }) {
  return (
    <div className="space-y-4">
      <MiniList title="Recent Posts" posts={recent} />
      <MiniList title="Popular Posts" posts={pop} />
      <MiniList title="Trending Posts" posts={trending} />
    </div>
  )
}
