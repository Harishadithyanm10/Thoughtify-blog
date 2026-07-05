import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import { useAuth } from '../context/AuthContext'

const PLACEHOLDER = 'https://placehold.co/150x150?text=User'

export default function Profile() {
  const { user } = useAuth()

  if (!user) return null

  return (
    <Layout>
      <div className="max-w-lg mx-auto card p-8 text-center">
        <img
          src={user.profile?.image || PLACEHOLDER}
          alt={user.username}
          className="w-28 h-28 rounded-full object-cover mx-auto border-4 border-brand-light"
        />
        <h1 className="text-2xl font-bold text-brand-dark mt-4">{user.username}</h1>
        <p className="text-gray-500 text-sm">{user.email}</p>

        <div className="text-left mt-6 space-y-2 text-sm text-gray-700">
          <p><span className="font-semibold">First name:</span> {user.first_name || '—'}</p>
          <p><span className="font-semibold">Last name:</span> {user.last_name || '—'}</p>
          <p><span className="font-semibold">Phone:</span> {user.profile?.phone || '—'}</p>
          <p><span className="font-semibold">DOB:</span> {user.profile?.dob || '—'}</p>
          <p><span className="font-semibold">Address:</span> {user.profile?.address || '—'}</p>
        </div>

        <Link to="/edit-profile" className="btn-primary inline-block mt-6">
          Edit Profile
        </Link>
      </div>
    </Layout>
  )
}
