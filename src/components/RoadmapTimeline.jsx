export default function RoadmapTimeline({ modules, onStart }) {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner':
        return 'bg-gradient-to-r from-green-400 to-emerald-500'
      case 'intermediate':
        return 'bg-gradient-to-r from-yellow-400 to-orange-500'
      case 'advanced':
        return 'bg-gradient-to-r from-red-400 to-rose-500'
      default:
        return 'bg-gradient-to-r from-blue-400 to-indigo-500'
    }
  }

  const getDifficultyBadgeColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-800'
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800'
      case 'advanced':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-blue-100 text-blue-800'
    }
  }

  if (!modules || modules.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No modules in roadmap</p>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Vertical Timeline Line */}
      <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 hidden lg:block" />

      {/* Timeline Items */}
      <div className="space-y-8">
        {modules.map((module, index) => (
          <div key={module.id} className="relative">
            {/* Timeline Dot */}
            <div className="absolute left-0 top-6 hidden lg:block">
              <div
                className={`w-16 h-16 rounded-full ${getDifficultyColor(
                  module.difficulty
                )} flex items-center justify-center text-white font-bold shadow-lg border-4 border-white`}
              >
                {index + 1}
              </div>
            </div>

            {/* Content Card */}
            <div className="lg:ml-32 bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {module.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{module.description}</p>
                </div>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap ml-4 ${getDifficultyBadgeColor(
                    module.difficulty
                  )}`}
                >
                  {module.difficulty}
                </span>
              </div>

              {/* Details */}
              <div className="flex flex-wrap gap-6 mb-6 py-4 border-y border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">⏱️</span>
                  <div>
                    <p className="text-xs text-gray-500">Duration</p>
                    <p className="font-semibold text-gray-900">
                      {module.duration}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">📚</span>
                  <div>
                    <p className="text-xs text-gray-500">Topics</p>
                    <p className="font-semibold text-gray-900">
                      {module.topics?.length || 0} topics
                    </p>
                  </div>
                </div>
              </div>

              {/* Topics List */}
              {module.topics && module.topics.length > 0 && (
                <div className="mb-6">
                  <p className="text-sm font-semibold text-gray-700 mb-3">
                    What you'll learn:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {module.topics.map((topic, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-900 rounded-full text-xs font-medium"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Start Button */}
              <button
                onClick={() => onStart?.(module)}
                className={`w-full py-3 rounded-lg font-semibold text-white transition transform hover:scale-105 ${getDifficultyColor(
                  module.difficulty
                )}`}
              >
                Start Learning →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
