import { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import client from '../api/client'

export default function Layout({ children }) {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    client.get('/categories').then((res) => setCategories(res.data)).catch(() => {})
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar categories={categories} />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">{children}</main>
      <Footer />
    </div>
  )
}
