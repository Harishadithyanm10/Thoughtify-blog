import { createContext, useContext, useEffect, useState } from 'react'
import client from '../api/client'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('thoughtify_token')
    if (!token) {
      setLoading(false)
      return
    }
    client
      .get('/auth/me')
      .then((res) => setUser(res.data))
      .catch(() => {
        localStorage.removeItem('thoughtify_token')
      })
      .finally(() => setLoading(false))
  }, [])

  async function login(email, password) {
    const res = await client.post('/auth/login', { email, password })
    localStorage.setItem('thoughtify_token', res.data.access_token)
    setUser(res.data.user)
    return res.data.user
  }

  async function register(payload) {
    const res = await client.post('/auth/register', payload)
    localStorage.setItem('thoughtify_token', res.data.access_token)
    setUser(res.data.user)
    return res.data.user
  }

  function logout() {
    localStorage.removeItem('thoughtify_token')
    setUser(null)
  }

  function refreshUser(updated) {
    setUser(updated)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
