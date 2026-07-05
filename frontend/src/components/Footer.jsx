export default function Footer() {
  return (
    <footer className="bg-brand-dark text-gray-300 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
        <div>
          <h3 className="text-white text-lg font-bold mb-2 flex items-center gap-2">
          
  <img
    src="https://res.cloudinary.com/dl2hcx3sr/image/upload/v1733040016/2-Photoroom_ossost.png"
    alt="Logo"
    className="h-20 w-auto"
  />

          </h3>
          <p className="text-gray-400">
            A space to write, read and share your daily thoughts with the world.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1">
            <li><a href="/" className="hover:text-brand-light">Home</a></li>
            <li><a href="/about" className="hover:text-brand-light">About</a></li>
            <li><a href="/contact" className="hover:text-brand-light">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-2">Follow us</h4>
          <div className="flex gap-3 text-lg">
            <i className="fa-brands fa-facebook hover:text-brand-light cursor-pointer"></i>
            <i className="fa-brands fa-twitter hover:text-brand-light cursor-pointer"></i>
            <i className="fa-brands fa-instagram hover:text-brand-light cursor-pointer"></i>
          </div>
        </div>
      </div>
      <div className="text-center text-gray-500 text-xs py-3 border-t border-gray-700">
        &copy; {new Date().getFullYear()} Thoughtify. All rights reserved.
      </div>
    </footer>
  )
}
