import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import { useTheme } from '../context/ThemeContext'
import ProfileDropdown from './ProfileDropdown'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const { isSignedIn } = useUser()
  const { isDark } = useTheme()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className={`sticky top-0 z-50 backdrop-blur-xl transition-all duration-300 ${
      isDark 
        ? 'bg-slate-900/80 border-b border-slate-700/50' 
        : 'bg-white/80 border-b border-gray-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 group transition-all duration-300 hover:scale-110"
          >
            <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/50 transition-all duration-300 group-hover:shadow-indigo-500/70">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <span className={`text-2xl font-bold transition-colors duration-300 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Neurox
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {isSignedIn && (
              <>
                <NavLink to="/dashboard" label="Dashboard" isDark={isDark} />
                <NavLink to="/performance" label="Analytics" isDark={isDark} />
                <NavLink to="/roadmap" label="Roadmap" isDark={isDark} />
                <NavLink 
                  to="/ai-roadmap" 
                  label="🤖 AI Roadmap" 
                  isDark={isDark} 
                  highlighted 
                />
                <NavLink to="/profile" label="Profile" isDark={isDark} />
              </>
            )}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {isSignedIn ? (
              <ProfileDropdown />
            ) : (
              <button
                onClick={() => navigate('/auth')}
                className="hidden sm:block px-6 py-2.5 bg-gradient-primary text-white rounded-xl hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-105 font-semibold"
              >
                Sign In
              </button>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className={`md:hidden pb-4 space-y-2 animate-fade-in-down ${
            isDark ? 'border-t border-slate-700/50' : 'border-t border-gray-100'
          }`}>
            {isSignedIn && (
              <>
                <MobileNavLink to="/dashboard" label="Dashboard" />
                <MobileNavLink to="/performance" label="Analytics" />
                <MobileNavLink to="/roadmap" label="Roadmap" />
                <MobileNavLink to="/ai-roadmap" label="🤖 AI Roadmap" />
                <MobileNavLink to="/profile" label="Profile" />
              </>
            )}
            {!isSignedIn && (
              <button
                onClick={() => {
                  navigate('/auth')
                  setMobileMenuOpen(false)
                }}
                className="w-full px-4 py-2 bg-gradient-primary text-white rounded-lg font-semibold"
              >
                Sign In
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

function NavLink({ to, label, isDark, highlighted }) {
  return (
    <Link
      to={to}
      className={`px-4 py-2 rounded-lg transition-all duration-300 font-medium group relative ${
        highlighted
          ? isDark
            ? 'text-indigo-300 hover:text-indigo-200 bg-indigo-950/50'
            : 'text-indigo-600 hover:text-indigo-700 bg-indigo-50'
          : isDark
            ? 'text-gray-300 hover:text-white hover:bg-slate-800'
            : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
      }`}
    >
      {label}
      {highlighted && (
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-indigo-500 rounded-full transition-all duration-300 group-hover:w-4 group-hover:h-1"></div>
      )}
    </Link>
  )
}

function MobileNavLink({ to, label }) {
  return (
    <Link
      to={to}
      className="block px-4 py-3 rounded-lg transition-all duration-300 hover:bg-gray-100 dark:hover:bg-slate-800 font-medium"
    >
      {label}
    </Link>
  )
}
