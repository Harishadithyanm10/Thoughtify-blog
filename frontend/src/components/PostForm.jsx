import { useEffect, useState } from 'react'
import client from '../api/client'

export default function PostForm({ initial, onSubmit, submitLabel = 'Publish' }) {
  const [categories, setCategories] = useState([])
  const [form, setForm] = useState({
    title: initial?.title || '',
    content: initial?.content || '',
    image: initial?.image || '',
    category_id: initial?.category?.id || '',
    status: initial?.status || 'draft',
    section: initial?.section || 'recent',
    main_post: initial?.main_post || false,
  })
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    client.get('/categories').then((res) => setCategories(res.data))
  }, [])

  async function handleImageChange(e) {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    setError('')
    try {
      const data = new FormData()
      data.append('file', file)
      const res = await client.post('/upload', data)   // <- no headers override
      setForm((f) => ({ ...f, image: res.data.url }))
    } catch (err) {
      setError('Image upload failed. Make sure Cloudinary is configured on the backend.')
    } finally {
      setUploading(false)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      await onSubmit({ ...form, category_id: Number(form.category_id) })
    } catch (err) {
      setError(err.response?.data?.detail || 'Something went wrong while saving your post.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
      {error && <p className="bg-red-50 text-red-600 text-sm p-3 rounded-md">{error}</p>}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          required
          className="input-field"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
        <select
          required
          className="input-field"
          value={form.category_id}
          onChange={(e) => setForm({ ...form, category_id: e.target.value })}
        >
          <option value="">Select a category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {uploading && <p className="text-xs text-gray-500 mt-1">Uploading...</p>}
        {form.image && (
          <img src={form.image} alt="preview" className="mt-2 h-32 rounded-md object-cover" />
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
        <textarea
          required
          rows={8}
          className="input-field"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            className="input-field"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option value="draft">Draft</option>
            <option value="publish">Publish</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
          <select
            className="input-field"
            value={form.section}
            onChange={(e) => setForm({ ...form, section: e.target.value })}
          >
            <option value="recent">Recent</option>
            <option value="popular">Popular</option>
            <option value="trending">Trending</option>
          </select>
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm text-gray-700">
        <input
          type="checkbox"
          checked={form.main_post}
          onChange={(e) => setForm({ ...form, main_post: e.target.checked })}
        />
        Feature this as the homepage highlight
      </label>

      <button className="btn-primary">{submitLabel}</button>
    </form>
  )
}
