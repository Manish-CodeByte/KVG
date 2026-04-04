import { useEffect, useState } from 'react'

export default function AnimatedProgressBar({ progress, label, showPercentage = true }) {
  const [displayProgress, setDisplayProgress] = useState(0)

  useEffect(() => {
    let animationFrame
    let currentProgress = displayProgress

    const animate = () => {
      if (currentProgress < progress) {
        currentProgress += (progress - currentProgress) * 0.1
        setDisplayProgress(Math.round(currentProgress))
        animationFrame = requestAnimationFrame(animate)
      } else {
        setDisplayProgress(progress)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [progress])

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-3">
          <label className="text-sm font-semibold text-gray-700">{label}</label>
          {showPercentage && (
            <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-primary">
              {displayProgress}%
            </span>
          )}
        </div>
      )}

      <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
        {/* Animated gradient bar */}
        <div
          className="h-full bg-gradient-primary rounded-full transition-all duration-500 shadow-lg"
          style={{ width: `${displayProgress}%` }}
        >
          {/* Shine effect */}
          <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
        </div>

        {/* Glow effect */}
        <div
          className="absolute top-0 h-full bg-gradient-primary blur-md opacity-50"
          style={{ width: `${displayProgress}%`, right: '2px' }}
        ></div>
      </div>
    </div>
  )
}
