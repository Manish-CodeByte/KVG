export default function StatCard({ icon, label, value, subtext, gradient, trend }) {
  return (
    <div className={`rounded-2xl p-6 text-white relative overflow-hidden group cursor-pointer`}>
      {/* Gradient background */}
      <div className={`absolute inset-0 ${gradient} opacity-90 group-hover:opacity-100 transition`}></div>

      {/* Glassmorphism overlay*/}
      <div className="absolute inset-0 backdrop-blur-xl bg-white/10"></div>

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-white/80 text-sm font-medium mb-1">{label}</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-4xl font-bold">{value}</h3>
              {subtext && <span className="text-white/70 text-sm">{subtext}</span>}
            </div>
          </div>
          <div className="text-4xl opacity-20">{icon}</div>
        </div>

        {/* Trend indicator */}
        {trend && (
          <div className={`text-sm font-medium flex items-center gap-1 ${trend.positive ? 'text-green-200' : 'text-red-200'}`}>
            {trend.positive ? '↑' : '↓'} {trend.value}% {trend.label}
          </div>
        )}
      </div>

      {/* Hover effect border */}
      <div className="absolute inset-0 border border-white/20 rounded-2xl group-hover:border-white/40 transition pointer-events-none"></div>
    </div>
  )
}
