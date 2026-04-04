import { useState } from 'react'
import { useToast } from '../context/ToastContext'

export default function Roadmap() {
  const { addToast } = useToast()

  // Mock module data
  const mockModules = [
    { id: 1, title: 'Python Basics', duration: '2 weeks' },
    { id: 2, title: 'Data Structures', duration: '3 weeks' },
    { id: 3, title: 'Algorithms', duration: '4 weeks' },
    { id: 4, title: 'Web Development', duration: '4 weeks' },
    { id: 5, title: 'Databases', duration: '3 weeks' },
    { id: 6, title: 'System Design', duration: '5 weeks' },
    { id: 7, title: 'DevOps Basics', duration: '3 weeks' },
    { id: 8, title: 'Cloud Computing', duration: '4 weeks' },
    { id: 9, title: 'Advanced Topics', duration: '6 weeks' },
  ]

  // State: track which module is completed and which is current
  const [completedModules, setCompletedModules] = useState(new Set([]))
  const [currentModuleId, setCurrentModuleId] = useState(1)

  // Handle node click
  const handleNodeClick = (moduleId) => {
    // Only allow clicking the current module
    if (moduleId !== currentModuleId) {
      addToast('Complete current module first!', 'info')
      return
    }

    // Mark as completed
    const newCompleted = new Set(completedModules)
    newCompleted.add(moduleId)
    setCompletedModules(newCompleted)
    addToast('Module Completed ✅', 'success')

    // Find next uncompleted module
    const nextModule = mockModules.find(
      (m) => m.id > moduleId && !newCompleted.has(m.id)
    )

    if (nextModule) {
      setCurrentModuleId(nextModule.id)
      addToast(`Next Module Unlocked 🔓`, 'info')
    } else {
      // All modules completed
      setCurrentModuleId(null)
      addToast('🎉 All modules completed! Congratulations!', 'success')
    }
  }

  // Get node state
  const getNodeState = (moduleId) => {
    if (completedModules.has(moduleId)) return 'completed'
    if (moduleId === currentModuleId) return 'current'
    return 'locked'
  }

  // Arrange modules in snake pattern (3 per row)
  const arrangeSnakePattern = () => {
    const rows = []
    for (let i = 0; i < mockModules.length; i += 3) {
      const row = mockModules.slice(i, i + 3)
      const rowIndex = Math.floor(i / 3)
      rows.push({
        modules: rowIndex % 2 === 0 ? row : [...row].reverse(),
        indices: rowIndex % 2 === 0
          ? Array.from({ length: row.length }, (_, idx) => i + idx)
          : Array.from({ length: row.length }, (_, idx) => i + 2 - idx),
        isReversed: rowIndex % 2 === 1,
      })
    }
    return rows
  }

  const rows = arrangeSnakePattern()
  const completionPercent = Math.round(
    (completedModules.size / mockModules.length) * 100
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Learning Roadmap
          </h1>
          <p className="text-gray-600 mb-6">
            {completedModules.size} of {mockModules.length} modules completed
          </p>

          {/* Progress Bar */}
          <div className="w-full max-w-sm mx-auto h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-500"
              style={{ width: `${completionPercent}%` }}
            />
          </div>
        </div>

        {/* Snake Pattern Roadmap */}
        <div className="relative">
          {/* Connection Lines (SVG) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 0 }}
          >
            {/* Horizontal lines */}
            {rows.map((row, rowIdx) =>
              row.modules.map((_, nodeIdx) => {
                if (nodeIdx < row.modules.length - 1) {
                  const nextRow = rowIdx
                  const isReversed = row.isReversed
                  const x1 = (nodeIdx + 0.5) * (100 / 3) + 2
                  const y = rowIdx * 200 + 100
                  const x2 = (nodeIdx + 1.5) * (100 / 3) - 2

                  return (
                    <line
                      key={`h-${rowIdx}-${nodeIdx}`}
                      x1={`${x1}%`}
                      y1={`${y}px`}
                      x2={`${x2}%`}
                      y2={`${y}px`}
                      stroke="url(#gradient)"
                      strokeWidth="2.5"
                      opacity="0.3"
                      strokeLinecap="round"
                    />
                  )
                }
                return null
              })
            )}

            {/* Vertical lines */}
            {rows.map((row, rowIdx) => {
              if (rowIdx < rows.length - 1) {
                const isCurrentReversed = row.isReversed
                const isNextReversed = rows[rowIdx + 1].isReversed
                const x = isCurrentReversed
                  ? 100 / 6
                  : (100 / 3) * 2.5

                return (
                  <line
                    key={`v-${rowIdx}`}
                    x1={`${x}%`}
                    y1={`${rowIdx * 200 + 100}px`}
                    x2={`${x}%`}
                    y2={`${(rowIdx + 1) * 200 + 100}px`}
                    stroke="url(#gradient)"
                    strokeWidth="2.5"
                    opacity="0.3"
                    strokeLinecap="round"
                  />
                )
              }
              return null
            })}

            {/* Gradient definition */}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
          </svg>

          {/* Nodes Grid */}
          <div className="space-y-32 relative z-10">
            {rows.map((row, rowIdx) => (
              <div
                key={`row-${rowIdx}`}
                className="flex justify-center gap-20"
              >
                {row.modules.map((module, localIdx) => {
                  const state = getNodeState(module.id)
                  const isLocked = state === 'locked'

                  return (
                    <div
                      key={module.id}
                      className="flex flex-col items-center gap-3"
                    >
                      {/* Node Button */}
                      <button
                        onClick={() => handleNodeClick(module.id)}
                        disabled={isLocked}
                        className={`
                          w-24 h-24 rounded-full flex items-center justify-center
                          font-bold text-3xl transition-all duration-300
                          ${
                            state === 'current'
                              ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-2xl shadow-purple-400 animate-pulse hover:shadow-purple-500 hover:scale-110'
                              : state === 'completed'
                              ? 'bg-gradient-to-br from-green-400 to-emerald-500 text-white shadow-lg shadow-green-300 hover:shadow-green-400 hover:scale-110 cursor-pointer'
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-60'
                          }
                        `}
                        title={isLocked ? 'Locked' : `Click to ${state === 'current' ? 'complete' : 'view'}`}
                      >
                        {state === 'completed' && '✓'}
                        {state === 'current' && '⭐'}
                        {state === 'locked' && '🔒'}
                      </button>

                      {/* Node Label */}
                      <div className="text-center">
                        <p className="font-semibold text-sm text-gray-900 w-24 truncate">
                          {module.title}
                        </p>
                        <p className="text-xs text-gray-500">{module.duration}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-20 grid grid-cols-3 gap-6 max-w-2xl mx-auto">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 text-center border border-white/20">
            <p className="text-3xl font-bold text-indigo-600">
              {mockModules.length}
            </p>
            <p className="text-sm text-gray-600 mt-1">Total Modules</p>
          </div>
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 text-center border border-white/20">
            <p className="text-3xl font-bold text-green-600">
              {completedModules.size}
            </p>
            <p className="text-sm text-gray-600 mt-1">Completed</p>
          </div>
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 text-center border border-white/20">
            <p className="text-3xl font-bold text-purple-600">
              {mockModules.length - completedModules.size}
            </p>
            <p className="text-sm text-gray-600 mt-1">Remaining</p>
          </div>
        </div>
      </div>
    </div>
  )
}
