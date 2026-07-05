import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const PLACEHOLDER = 'https://placehold.co/1000x400?text=Thoughtify'

export default function Carousel({ posts = [] }) {
  const [index, setIndex] = useState(0)
  const slides = posts.length > 0 ? posts : []

  useEffect(() => {
    if (slides.length < 2) return
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [slides.length])

  if (slides.length === 0) {
    return (
      <div className="relative rounded-lg overflow-hidden h-64 md:h-96 bg-gray-200 flex items-center justify-center text-gray-500">
        No featured post yet
      </div>
    )
  }

  const post = slides[index]

  return (
    <div className="relative rounded-lg overflow-hidden h-64 md:h-96 group">
      <img
        src={post.image || PLACEHOLDER}
        alt={post.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 p-6 text-white">
        <span className="bg-brand text-xs px-2 py-1 rounded-md uppercase tracking-wide">
          {post.category?.name}
        </span>
        <Link to={`/post/${post.blog_slug}`}>
          <h2 className="text-2xl md:text-3xl font-bold mt-2 hover:underline">{post.title}</h2>
        </Link>
        <p className="text-sm text-gray-200 mt-1">By {post.author?.username}</p>
      </div>

      {slides.length > 1 && (
        <div className="absolute bottom-3 right-4 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 w-2 rounded-full ${i === index ? 'bg-white' : 'bg-white/40'}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
