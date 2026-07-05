import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../components/Layout'
import client from '../api/client'
import { useAuth } from '../context/AuthContext'

const PLACEHOLDER = 'https://placehold.co/900x400?text=Thoughtify'

export default function PostDetail() {
  const { slug } = useParams()
  const { user } = useAuth()
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [content, setContent] = useState('')
  const [error, setError] = useState('')

  function loadPost() {
    client.get(`/posts/${slug}`).then((res) => {
      setPost(res.data)
      client.get(`/posts/${res.data.id}/comments`).then((r) => setComments(r.data))
    })
  }

  useEffect(() => {
    loadPost()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug])

  async function handleComment(e) {
    e.preventDefault()
    if (!content.trim()) return
    try {
      await client.post(`/posts/${post.id}/comments`, { content })
      setContent('')
      loadPost()
    } catch (err) {
      setError(err.response?.data?.detail || 'Could not post comment.')
    }
  }

  if (!post) {
    return (
      <Layout>
        <p className="text-gray-500">Loading...</p>
      </Layout>
    )
  }

  return (
    <Layout>
      <article className="max-w-3xl mx-auto">
        <img
          src={post.image || PLACEHOLDER}
          alt={post.title}
          className="w-full h-72 object-cover rounded-lg"
        />
        <span className="text-xs text-brand font-semibold uppercase mt-4 inline-block">
          {post.category?.name}
        </span>
        <h1 className="text-3xl font-bold text-brand-dark mt-2">{post.title}</h1>
        <p className="text-sm text-gray-500 mt-1">
          By {post.author?.username} • {new Date(post.date).toLocaleDateString()}
        </p>
        <div className="mt-6 text-gray-700 leading-relaxed whitespace-pre-line">
          {post.content}
        </div>

        <hr className="my-8" />

        <h2 className="text-xl font-bold text-brand-dark mb-4">Comments</h2>

        {user ? (
          <form onSubmit={handleComment} className="mb-6">
            {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
            <textarea
              className="input-field"
              rows={3}
              placeholder="Share your thoughts..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button className="btn-primary mt-2">Post Comment</button>
          </form>
        ) : (
          <p className="text-sm text-gray-500 mb-6">
            <a href="/login" className="text-brand font-semibold">
              Log in
            </a>{' '}
            to leave a comment.
          </p>
        )}

        <div className="space-y-4">
          {comments.length === 0 && <p className="text-gray-400 text-sm">No comments yet.</p>}
          {comments.map((c) => (
            <div key={c.id} className="card p-4">
              <p className="font-semibold text-brand-dark text-sm">{c.author?.username}</p>
              <p className="text-xs text-gray-400">{new Date(c.date).toLocaleString()}</p>
              <p className="text-gray-700 mt-2 text-sm">{c.content}</p>
            </div>
          ))}
        </div>
      </article>
    </Layout>
  )
}
