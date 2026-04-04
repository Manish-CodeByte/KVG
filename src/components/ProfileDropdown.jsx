import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser, useClerk } from '@clerk/clerk-react'
import { useToast } from '../context/ToastContext'

export default function ProfileDropdown() {
  const navigate = useNavigate()
  const { user } = useUser()
  const { signOut } = useClerk()
  const { addToast } = useToast()
  const [isOpen, setIsOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true')
  const dropdownRef = useRef(null)

  // Mock stats (would come from API/Supabase in production)
  const stats = {
    coursesCompleted: 3,
    currentStreak: 12,
    learningProgress: 65,
    achievements: 8,
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSignOut = async () => {
    try {
      await signOut()
      addToast('Signed out successfully! 👋', 'success')
      navigate('/')
    } catch (error) {
      addToast('Error signing out', 'error')
    }
  }

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    localStorage.setItem('darkMode', newDarkMode)
    document.documentElement.classList.toggle('dark', newDarkMode)
    addToast(`Dark mode ${newDarkMode ? 'enabled' : 'disabled'}`, 'info')
  }

  const menuItems = [
    { icon: '📊', label: 'Dashboard', path: '/dashboard' },
    { icon: '📈', label: 'Analytics', path: '/performance' },
    { icon: '🗺️', label: 'Roadmap', path: '/roadmap' },
    { icon: '👤', label: 'Profile', path: '/profile' },
  ]

  const smartFeatures = [
    { icon: '🧠', label: 'My Learning', stat: `${stats.learningProgress}%` },
    { icon: '📚', label: 'Courses Done', stat: stats.coursesCompleted },
    { icon: '🔥', label: 'Streak', stat: `${stats.currentStreak}d` },
    { icon: '🏆', label: 'Achievements', stat: stats.achievements },
  ]

  if (!user) return null

  const getUserInitials = () => {
    return (
      (user.firstName?.charAt(0) || '') + (user.lastName?.charAt(0) || '')
    ).toUpperCase() || '👤'
  }

  const getUserName = () => {
    return `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'User'
  }

  const getUserEmail = () => {
    return user.primaryEmailAddress?.emailAddress || 'No email'
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm hover:shadow-lg transition transform hover:scale-110 cursor-pointer"
        title="Open profile menu"
      >
        {user.profileImageUrl ? (
          <img
            src={user.profileImageUrl}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <span>{getUserInitials()}</span>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 bg-white/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl z-50 animate-in fade-in slide-in-from-top-2">
          {/* User Info Section */}
          <div className="p-6 border-b border-gray-100 bg-gradient-to-br from-indigo-50 to-purple-50">
            <div className="flex items-center gap-4 mb-4">
              {user.profileImageUrl ? (
                <img
                  src={user.profileImageUrl}
                  alt="Profile"
                  className="w-14 h-14 rounded-full object-cover border-2 border-white/50"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg border-2 border-white/50">
                  {getUserInitials()}
                </div>
              )}
              <div className="flex-1">
                <p className="font-bold text-gray-900 text-lg">{getUserName()}</p>
                <p className="text-sm text-gray-600">{getUserEmail()}</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3">
              {smartFeatures.map((feature) => (
                <div
                  key={feature.label}
                  className="bg-white/60 rounded-lg p-3 text-center hover:bg-white transition"
                >
                  <p className="text-2xl mb-1">{feature.icon}</p>
                  <p className="text-xs text-gray-600 mb-1">{feature.label}</p>
                  <p className="font-bold text-indigo-600">{feature.stat}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="p-4 border-b border-gray-100">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 px-2">
              Navigation
            </p>
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  navigate(item.path)
                  setIsOpen(false)
                  addToast(`Navigating to ${item.label}...`, 'info')
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gradient-to-r hover:from-indigo-100 hover:to-purple-100 transition text-left font-medium"
              >
                <span className="text-lg">{item.icon}</span>
                <span className="flex-1">{item.label}</span>
                <span className="text-gray-400">→</span>
              </button>
            ))}
          </div>

          {/* Settings Section */}
          <div className="p-4 border-b border-gray-100">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 px-2">
              Settings
            </p>

            <button
              onClick={() =>
                addToast('Opening Account Settings...', 'info')
              }
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gradient-to-r hover:from-blue-100 hover:to-cyan-100 transition text-left font-medium mb-2"
            >
              <span className="text-lg">⚙️</span>
              <span className="flex-1">Manage Account</span>
            </button>

            <button
              onClick={() =>
                addToast('Opening Notifications...', 'info')
              }
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gradient-to-r hover:from-blue-100 hover:to-cyan-100 transition text-left font-medium"
            >
              <span className="text-lg">🔔</span>
              <span className="flex-1">Notifications</span>
            </button>
          </div>

          {/* Preferences */}
          <div className="p-4 border-b border-gray-100">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 px-2">
              Preferences
            </p>

            <button
              onClick={toggleDarkMode}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition text-left font-medium"
            >
              <span className="text-lg">{darkMode ? '☀️' : '🌙'}</span>
              <span className="flex-1">
                {darkMode ? 'Light Mode' : 'Dark Mode'}
              </span>
              <div
                className={`w-10 h-6 rounded-full transition ${
                  darkMode
                    ? 'bg-indigo-600'
                    : 'bg-gray-300'
                } flex items-center`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition transform ${
                    darkMode ? 'translate-x-5' : 'translate-x-0'
                  }`}
                ></div>
              </div>
            </button>
          </div>

          {/* Sign Out Section */}
          <div className="p-4">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-red-500 to-rose-500 text-white hover:shadow-lg transition font-semibold"
            >
              <span>🚪</span>
              <span>Sign Out</span>
            </button>

            <p className="text-xs text-gray-500 text-center mt-4 px-2">
              Logged in as <span className="font-semibold">{getUserName()}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
