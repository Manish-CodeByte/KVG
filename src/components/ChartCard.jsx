export default function ChartCard({ title, subtitle, children, className = '' }) {
  return (
    <div className={`bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:bg-white/90 transition ${className}`}>
      {/* Header */}
      {(title || subtitle) && (
        <div className="mb-6 pb-4 border-b border-gray-200">
          {title && <h3 className="text-xl font-bold text-gray-900 mb-1">{title}</h3>}
          {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
        </div>
      )}

      {/* Chart Content */}
      <div className="w-full">
        {children}
      </div>
    </div>
  )
}
