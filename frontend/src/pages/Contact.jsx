import { useState } from 'react'
import Layout from '../components/Layout'
import client from '../api/client'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setStatus('')
    setSending(true)
    try {
      const res = await client.post('/contact', form)
      setStatus(res.data.message)
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to send your message.')
    } finally {
      setSending(false)
    }
  }

  return (
    <Layout>
      <div className="max-w-lg mx-auto card p-8">
        <h1 className="text-2xl font-bold text-brand-dark mb-6">Contact Us</h1>
        {status && <p className="bg-green-50 text-green-700 text-sm p-3 rounded-md mb-4">{status}</p>}
        {error && <p className="bg-red-50 text-red-600 text-sm p-3 rounded-md mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
            <input
              required
              className="input-field"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
            <input
              type="email"
              required
              className="input-field"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
            <textarea
              required
              rows={4}
              className="input-field"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </div>
          <button disabled={sending} className="btn-primary w-full">
            {sending ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </Layout>
  )
}
