import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'

/**
 * Premium Button Component
 * Variants: primary, secondary, outline, ghost, success, danger, warning
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  onClick,
  className = '',
  ...props
}) {
  const { isDark } = useTheme()
  const [isHovered, setIsHovered] = useState(false)

  // Size classes
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  // Variant classes
  const variantClasses = {
    primary: 'bg-gradient-primary text-white hover:shadow-lg hover:shadow-indigo-500/50 hover:-translate-y-0.5',
    secondary: 'bg-gradient-accent text-white hover:shadow-lg hover:shadow-pink-500/50 hover:-translate-y-0.5',
    success: 'bg-gradient-success text-white hover:shadow-lg hover:shadow-green-500/50 hover:-translate-y-0.5',
    danger: 'bg-gradient-danger text-white hover:shadow-lg hover:shadow-red-500/50 hover:-translate-y-0.5',
    warning: 'bg-gradient-warning text-white hover:shadow-lg hover:shadow-yellow-500/50 hover:-translate-y-0.5',
    outline: isDark
      ? 'border-2 border-indigo-500 text-indigo-400 hover:bg-indigo-950 '
      : 'border-2 border-indigo-500 text-indigo-600 hover:bg-indigo-50',
    ghost: isDark
      ? 'text-gray-300 hover:bg-slate-800'
      : 'text-gray-700 hover:bg-gray-100',
  }

  const baseClasses = `
    inline-flex items-center justify-center
    rounded-xl font-semibold
    transition-all duration-300
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
    disabled:opacity-50 disabled:cursor-not-allowed
    active:scale-95
    ${fullWidth ? 'w-full' : ''}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
  `

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {loading ? (
        <>
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  )
}
