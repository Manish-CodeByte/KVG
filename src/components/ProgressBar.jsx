export default function ProgressBar({ current, total, label }) {
  const percentage = (current / total) * 100

  return (
    <div className="w-full">
      {label && <p className="text-sm font-medium text-gray-700 mb-2">{label}</p>}
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className="bg-gradient-primary h-full rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <p className="text-xs text-gray-600 mt-2 text-right">
        {current} of {total} ({Math.round(percentage)}%)
      </p>
    </div>
  )
}
