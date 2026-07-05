import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../components/Layout'
import PostCards from '../components/PostCards'
import client from '../api/client'

export default function CategoryPage() {
  const { slug } = useParams()
  const [posts, setPosts] = useState([])

  useEffect(() => {
    client.get(`/categories/${slug}/posts`).then((res) => setPosts(res.data))
  }, [slug])

  return (
    <Layout>
      <h1 className="text-2xl font-bold text-brand-dark capitalize">{slug.replace(/-/g, ' ')}</h1>
      <PostCards posts={posts} />
    </Layout>
  )
}
