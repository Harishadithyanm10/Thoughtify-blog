import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Layout from '../components/Layout'
import PostForm from '../components/PostForm'
import client from '../api/client'

export default function EditPost() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)

  useEffect(() => {
    client.get('/posts/mine').then((res) => {
      const found = res.data.find((p) => String(p.id) === id)
      setPost(found)
    })
  }, [id])

  async function handleUpdate(payload) {
    await client.put(`/posts/${id}`, payload)
    navigate('/myposts')
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
      <h1 className="text-2xl font-bold text-brand-dark mb-6">Edit post</h1>
      <PostForm initial={post} onSubmit={handleUpdate} submitLabel="Save Changes" />
    </Layout>
  )
}
