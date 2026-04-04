import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import ProfileDropdown from './ProfileDropdown'

export default function Navbar() {
  const { isSignedIn } = useUser()
  const navigate = useNavigate()

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">N</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Neurox</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {isSignedIn && (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-primary transition">
                  Dashboard
                </Link>
                <Link to="/performance" className="text-gray-700 hover:text-primary transition">
                  Analytics
                </Link>
                <Link to="/roadmap" className="text-gray-700 hover:text-primary transition">
                  Roadmap
                </Link>
                <Link to="/ai-roadmap" className="text-gray-700 hover:text-primary transition font-semibold">
                  🤖 AI Roadmap
                </Link>
                <Link to="/profile" className="text-gray-700 hover:text-primary transition">
                  Profile
                </Link>
              </>
            )}
          </div>

          <div className="flex items-center gap-4">
            {isSignedIn ? (
              <ProfileDropdown />
            ) : (
              <button
                onClick={() => navigate('/auth')}
                className="px-4 py-2 bg-gradient-primary text-white rounded-lg hover:shadow-lg transition"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
