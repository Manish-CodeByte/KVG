import { useState } from 'react'
import { useToast } from '../context/ToastContext'

export default function TimelineDisplay({ modules, topic, level }) {
  const { addToast } = useToast()
  const [expandedId, setExpandedId] = useState(null)
  const [startedModules, setStartedModules] = useState(new Set())

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return {
          bg: 'bg-green-100',
          border: 'border-green-300',
          dot: 'bg-green-500',
          text: 'text-green-700',
        }
      case 'intermediate':
        return {
          bg: 'bg-blue-100',
          border: 'border-blue-300',
          dot: 'bg-blue-500',
          text: 'text-blue-700',
        }
      case 'advanced':
        return {
          bg: 'bg-purple-100',
          border: 'border-purple-300',
          dot: 'bg-purple-500',
          text: 'text-purple-700',
        }
      default:
        return {
          bg: 'bg-gray-100',
          border: 'border-gray-300',
          dot: 'bg-gray-500',
          text: 'text-gray-700',
        }
    }
  }

  const handleStart = (moduleId) => {
    const newStarted = new Set(startedModules)
    if (newStarted.has(moduleId)) {
      newStarted.delete(moduleId)
      addToast('Module unmarked', 'info')
    } else {
      newStarted.add(moduleId)
      addToast('🚀 Module started!', 'success')
    }
    setStartedModules(newStarted)
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-2">
          {topic} Roadmap
        </h2>
        <p className="text-gray-600">
          {level.charAt(0).toUpperCase() + level.slice(1)} Level • {modules.length} Modules
        </p>
      </div>

      {/* Timeline */}
      <div className="max-w-4xl mx-auto">
        {modules.map((module, index) => {
          const colors = getDifficultyColor(module.difficulty)
          const isExpanded = expandedId === module.id
          const isStarted = startedModules.has(module.id)

          return (
            <div key={module.id} className="relative mb-8 last:mb-0">
              {/* Vertical Line */}
              {index < modules.length - 1 && (
                <div className="absolute left-6 top-20 w-1 h-16 bg-gradient-to-b from-indigo-500 to-purple-500 opacity-30"></div>
              )}

              {/* Timeline Item */}
              <div className="flex gap-6">
                {/* Timeline Dot */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div
                    className={`w-12 h-12 rounded-full ${colors.dot} flex items-center justify-center text-white font-bold text-lg ring-4 ring-white shadow-lg`}
                  >
                    {index + 1}
                  </div>
                </div>

                {/* Card */}
                <div className="flex-1 mt-1">
                  <button
                    onClick={() =>
                      setExpandedId(isExpanded ? null : module.id)
                    }
                    className={`w-full text-left p-6 rounded-2xl border-2 transition transform hover:scale-105 ${
                      colors.bg
                    } ${colors.border} ${
                      isStarted
                        ? 'ring-2 ring-green-500 ring-offset-2'
                        : ''
                    }`}
                  >
                    {/* Card Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {module.title}
                        </h3>
                        <div className="flex gap-3 flex-wrap">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${colors.text} bg-white/60`}
                          >
                            {module.difficulty}
                          </span>
                          <span className="px-3 py-1 rounded-full text-xs font-semibold text-gray-700 bg-white/60">
                            ⏱️ {module.duration}
                          </span>
                        </div>
                      </div>
                      <div className="text-2xl">
                        {isExpanded ? '▼' : '▶'}
                      </div>
                    </div>

                    {/* Description (Always Visible) */}
                    <p className="text-gray-700 mt-3">{module.description}</p>
                  </button>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="mt-4 p-6 bg-white/80 rounded-2xl border border-gray-200">
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm font-semibold text-gray-600 mb-2">
                            📋 What you'll learn:
                          </p>
                          <ul className="space-y-2">
                            <li className="text-sm text-gray-700">
                              ✅ {module.title} core concepts
                            </li>
                            <li className="text-sm text-gray-700">
                              ✅ Practical hands-on projects
                            </li>
                            <li className="text-sm text-gray-700">
                              ✅ Industry best practices
                            </li>
                          </ul>
                        </div>

                        <button
                          onClick={() => handleStart(module.id)}
                          className={`w-full py-3 rounded-xl font-bold transition ${
                            isStarted
                              ? 'bg-green-500 text-white hover:bg-green-600'
                              : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-lg'
                          }`}
                        >
                          {isStarted
                            ? '✅ Started'
                            : '🚀 Start Learning'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Summary Stats */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 text-center border border-white/20">
          <p className="text-3xl font-bold text-indigo-600">{modules.length}</p>
          <p className="text-sm text-gray-600 mt-1">Total Modules</p>
        </div>
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 text-center border border-white/20">
          <p className="text-3xl font-bold text-green-600">{startedModules.size}</p>
          <p className="text-sm text-gray-600 mt-1">Started</p>
        </div>
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 text-center border border-white/20">
          <p className="text-3xl font-bold text-purple-600">
            {Math.round((startedModules.size / modules.length) * 100)}%
          </p>
          <p className="text-sm text-gray-600 mt-1">Progress</p>
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-12 text-center p-6 bg-indigo-50 rounded-2xl border border-indigo-200">
        <p className="text-sm text-indigo-700">
          💡 <strong>Pro Tip:</strong> Start with the first module and progress through the
          roadmap. Each module builds on the previous one!
        </p>
      </div>
    </div>
  )
}
