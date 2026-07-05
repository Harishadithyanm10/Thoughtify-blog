import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import PostForm from '../components/PostForm'
import client from '../api/client'

export default function CreatePost() {
  const navigate = useNavigate()

  async function handleCreate(payload) {
    await client.post('/posts', payload)
    navigate('/myposts')
  }

  return (
    <Layout>
      <h1 className="text-2xl font-bold text-brand-dark mb-6">Write a new post</h1>
      <PostForm onSubmit={handleCreate} submitLabel="Publish Post" />
    </Layout>
  )
}
