import { useTheme } from '../context/ThemeContext'

export default function ChartCard({ title, subtitle, children, className = '' }) {
  const { isDark } = useTheme()

  return (
    <div className={`
      rounded-2xl p-6 transition-all duration-300 hover-lift animate-fade-in
      ${isDark
        ? 'bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800/70'
        : 'bg-white/80 backdrop-blur-xl border border-white/20 hover:bg-white/90'
      } ${className}
    `}>
      {/* Header */}
      {(title || subtitle) && (
        <div className={`mb-6 pb-4 ${isDark ? 'border-b border-slate-700/50' : 'border-b border-gray-200'}`}>
          {title && (
            <h3 className={`text-xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {title}
            </h3>
          )}
          {subtitle && (
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Chart Content */}
      <div className="w-full">
        {children}
      </div>
    </div>
  )
}
