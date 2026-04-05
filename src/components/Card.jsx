import { useTheme } from '../context/ThemeContext'

export default function Card({ children, className = '', onClick, glass = false, animated = true }) {
  const { isDark } = useTheme()

  const baseClasses = `rounded-2xl transition-all duration-300 ${
    glass 
      ? isDark 
        ? 'glass-dark' 
        : 'glass'
      : isDark
        ? 'bg-slate-800/50 border border-slate-700/50'
        : 'bg-white/80 border border-gray-100'
  }`

  const interactiveClasses = onClick
    ? 'cursor-pointer hover:scale-105 hover:shadow-xl hover:-translate-y-1' 
    : 'hover-lift'

  return (
    <div
      onClick={onClick}
      className={`${baseClasses} ${interactiveClasses} p-6 ${
        animated ? 'animate-fade-in' : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}
