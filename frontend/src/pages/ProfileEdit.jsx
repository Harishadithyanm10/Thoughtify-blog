import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import client from '../api/client'
import { useAuth } from '../context/AuthContext'

export default function ProfileEdit() {
  const { user, refreshUser } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    email: user?.email || '',
    dob: user?.profile?.dob || '',
    phone: user?.profile?.phone || '',
    address: user?.profile?.address || '',
    image: user?.profile?.image || '',
  })
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  async function handleImageChange(e) {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    try {
      const data = new FormData()
      data.append('file', file)
      const res = await client.post('/upload', data)   
      setForm((f) => ({ ...f, image: res.data.url }))
    } catch {
      setError('Image upload failed.')
    } finally {
      setUploading(false)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSuccess('')
    try {
      const res = await client.put('/users/profile', form)
      refreshUser(res.data)
      setSuccess('Your profile has been updated successfully!')
      setTimeout(() => navigate('/profile'), 800)
    } catch (err) {
      setError(err.response?.data?.detail || 'Could not update profile.')
    }
  }

  return (
    <Layout>
      <div className="max-w-lg mx-auto card p-8">
        <h1 className="text-2xl font-bold text-brand-dark mb-6">Edit Profile</h1>
        {error && <p className="bg-red-50 text-red-600 text-sm p-3 rounded-md mb-4">{error}</p>}
        {success && <p className="bg-green-50 text-green-700 text-sm p-3 rounded-md mb-4">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Profile Photo</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {uploading && <p className="text-xs text-gray-500 mt-1">Uploading...</p>}
            {form.image && (
              <img src={form.image} alt="preview" className="mt-2 h-20 w-20 rounded-full object-cover" />
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                className="input-field"
                value={form.first_name}
                onChange={(e) => setForm({ ...form, first_name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                className="input-field"
                value={form.last_name}
                onChange={(e) => setForm({ ...form, last_name: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="input-field"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
            <input
              type="date"
              className="input-field"
              value={form.dob}
              onChange={(e) => setForm({ ...form, dob: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              className="input-field"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <textarea
              rows={3}
              className="input-field"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
          </div>
          <button className="btn-primary w-full">Save Changes</button>
        </form>
      </div>
    </Layout>
  )
}
