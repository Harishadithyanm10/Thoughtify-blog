import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import client from '../api/client'

const PLACEHOLDER = 'https://placehold.co/100x100?text=T'

export default function MyPosts() {
  const [posts, setPosts] = useState([])

  function load() {
    client.get('/posts/mine').then((res) => setPosts(res.data))
  }

  useEffect(() => {
    load()
  }, [])

  async function handleDelete(id) {
    if (!confirm('Delete this post?')) return
    await client.delete(`/posts/${id}`)
    load()
  }

  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-brand-dark">My Posts</h1>
        <Link to="/createposts" className="btn-primary">
          <i className="fa-solid fa-plus mr-2"></i>New Post
        </Link>
      </div>

      {posts.length === 0 && <p className="text-gray-500">You haven't written any posts yet.</p>}

      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="card p-4 flex items-center gap-4">
            <img
              src={post.image || PLACEHOLDER}
              alt={post.title}
              className="w-20 h-20 rounded-md object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-brand-dark truncate">{post.title}</h3>
              <p className="text-xs text-gray-500">
                {post.category?.name} • {post.status} • {new Date(post.date).toLocaleDateString()}
              </p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <Link
                to={`/editposts/${post.id}`}
                className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-md"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(post.id)}
                className="text-sm bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1.5 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  )
}
