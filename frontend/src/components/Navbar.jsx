import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar({ categories = [] }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-brand-dark text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
      <Link to="/" className="flex items-center">
  <img
    src="https://res.cloudinary.com/dl2hcx3sr/image/upload/v1733040016/2-Photoroom_ossost.png"
    alt="Logo"
    className="h-20 w-auto"
  />
</Link>

        <div className="hidden md:flex items-center gap-6 text-sm">
          <Link to="/" className="hover:text-brand-light flex items-center gap-1">
            <i className="fa-solid fa-house"></i> Home
          </Link>

          {user && (
            <>
             <div className="relative group">
  <button className="hover:text-brand-light flex items-center gap-1">
    <i className="fa-solid fa-list"></i> Categories
  </button>

  <div className="absolute left-0 top-full mt-1 w-48 rounded-md bg-white text-gray-800 shadow-lg
                  opacity-0 invisible
                  group-hover:opacity-100 group-hover:visible
                  transition-all duration-200 z-50">
    {categories.length === 0 ? (
      <span className="block px-4 py-2 text-gray-400 text-sm">
        No categories
      </span>
    ) : (
      categories.map((c) => (
        <Link
          key={c.id}
          to={`/category/${c.slug}`}
          className="block px-4 py-2 hover:bg-gray-100"
        >
          {c.name}
        </Link>
      ))
    )}
  </div>
</div>
              <Link to="/myposts" className="hover:text-brand-light flex items-center gap-1">
                <i className="fa-solid fa-blog"></i> My Posts
              </Link>
              <Link to="/about" className="hover:text-brand-light flex items-center gap-1">
                <i className="fa-solid fa-address-card"></i> About
              </Link>
              <Link to="/contact" className="hover:text-brand-light flex items-center gap-1">
                <i className="fa-regular fa-id-badge"></i> Contact
              </Link>
              <Link to="/profile" className="hover:text-brand-light flex items-center gap-1">
                <i className="fa-solid fa-user"></i> Profile
              </Link>
            </>
          )}
        </div>

        {user ? (
          <button onClick={handleLogout} className="bg-brand hover:bg-brand-light px-4 py-1.5 rounded-md text-sm">
            Logout
          </button>
        ) : (
          <Link to="/login" className="bg-brand hover:bg-brand-light px-4 py-1.5 rounded-md text-sm">
            Login
          </Link>
        )}
      </div>
    </nav>
  )
}
