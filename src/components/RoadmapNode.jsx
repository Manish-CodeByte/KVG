import { useToast } from '../context/ToastContext'

export default function RoadmapNode({ node, state, onClick, index }) {
  const { addToast } = useToast()

  const handleClick = () => {
    if (state === 'locked') {
      addToast('Module is locked. Complete previous modules first!', 'info')
      return
    }
    addToast(`Opening: ${node.title}`, 'success')
    onClick?.(index)
  }

  const getStateStyles = () => {
    switch (state) {
      case 'completed':
        return {
          container:
            'bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg shadow-green-300 scale-100',
          text: 'text-white',
          icon: '✅',
          cursor: 'cursor-pointer hover:scale-110',
        }
      case 'current':
        return {
          container:
            'bg-gradient-to-br from-indigo-500 to-purple-600 shadow-2xl shadow-purple-400 animate-pulse',
          text: 'text-white',
          icon: '⭐',
          cursor: 'cursor-pointer hover:scale-110',
        }
      case 'locked':
        return {
          container: 'bg-gray-300 shadow-md opacity-60',
          text: 'text-gray-600',
          icon: '🔒',
          cursor: 'cursor-not-allowed hover:opacity-70',
        }
      default:
        return {
          container: 'bg-gray-200',
          text: 'text-gray-700',
          icon: '?',
          cursor: 'cursor-default',
        }
    }
  }

  const styles = getStateStyles()

  return (
    <div
      onClick={handleClick}
      className={`
        flex flex-col items-center gap-2 transition-all duration-300
        ${styles.cursor}
      `}
    >
      {/* Node Circle */}
      <div
        className={`
          w-20 h-20 rounded-full flex items-center justify-center font-bold text-2xl
          transition-all duration-300 transform
          ${styles.container}
        `}
      >
        <span className="text-3xl">{styles.icon}</span>
      </div>

      {/* Node Label */}
      <div className="text-center">
        <p className={`font-semibold text-sm ${styles.text}`}>{node.title}</p>
        <p className="text-xs text-gray-500">{node.duration}</p>
      </div>

      {/* Progress Indicator */}
      {state === 'current' && (
        <div className="flex gap-1 mt-1">
          <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce"></div>
          <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 rounded-full bg-purple-300 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      )}
    </div>
  )
}
