import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import Carousel from '../components/Carousel'
import PostCards from '../components/PostCards'
import Sidebar from '../components/Sidebar'
import client from '../api/client'

export default function Home() {
  const [data, setData] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    client
      .get('/home')
      .then((res) => setData(res.data))
      .catch(() => setError('Could not load the homepage feed.'))
  }, [])

  if (error) {
    return (
      <Layout>
        <p className="text-red-600">{error}</p>
      </Layout>
    )
  }

  if (!data) {
    return (
      <Layout>
        <p className="text-gray-500">Loading...</p>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Carousel posts={data.main_post} />
          <PostCards posts={data.posts} />
        </div>
        <div className="lg:col-span-1">
          <Sidebar recent={data.recent} pop={data.pop} trending={data.trending} />
        </div>
      </div>
    </Layout>
  )
}
