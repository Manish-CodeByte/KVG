import { useState } from 'react'
import { useToast } from '../context/ToastContext'
import { generateAIRoadmap } from '../services/geminiService'
import TimelineDisplay from './TimelineDisplay'

export default function AIRoadmapGenerator() {
  const { addToast } = useToast()
  const [topic, setTopic] = useState('')
  const [level, setLevel] = useState('beginner')
  const [roadmap, setRoadmap] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    if (!topic.trim()) {
      addToast('Please enter a learning topic', 'error')
      return
    }

    if (topic.trim().length < 3) {
      addToast('Topic must be at least 3 characters', 'error')
      return
    }

    setLoading(true)
    addToast(`🤖 Generating roadmap for "${topic}"...`, 'info')

    try {
      const generatedRoadmap = await generateAIRoadmap(topic, level)
      setRoadmap(generatedRoadmap)
      addToast('✅ Roadmap generated successfully!', 'success')
    } catch (error) {
      console.error('Error:', error)
      addToast('Failed to generate roadmap', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setRoadmap(null)
    setTopic('')
    setLevel('beginner')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-8">
      <div className="max-w-6xl mx-auto">
        {!roadmap ? (
          <>
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold text-gray-900 mb-4">
                🤖 AI Roadmap Generator
              </h1>
              <p className="text-lg text-gray-600">
                Generate a personalized learning roadmap in seconds using AI
              </p>
            </div>

            {/* Input Section */}
            <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="space-y-6">
                {/* Topic Input */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-3">
                    📚 What do you want to learn?
                  </label>
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
                    placeholder="e.g., Web Development, Machine Learning, Data Science..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                {/* Level Selection */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-3">
                    🎯 Your Current Level
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { value: 'beginner', label: 'Beginner', icon: '🌱' },
                      {
                        value: 'intermediate',
                        label: 'Intermediate',
                        icon: '🚀',
                      },
                      { value: 'advanced', label: 'Advanced', icon: '⭐' },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setLevel(opt.value)}
                        className={`py-3 rounded-xl font-semibold transition ${
                          level === opt.value
                            ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {opt.icon} {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Generate Button */}
                <button
                  onClick={handleGenerate}
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-lg hover:shadow-lg transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      Generating...
                    </span>
                  ) : (
                    '✨ Generate Roadmap'
                  )}
                </button>
              </div>

              {/* Info Message */}
              <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <p className="text-sm text-blue-700">
                  💡 <strong>Tip:</strong> Be specific about what you want to learn
                  (e.g., "React.js", "Python Data Analysis", "Game Development")
                </p>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Roadmap Display */}
            <div className="mb-8">
              <button
                onClick={handleReset}
                className="px-6 py-3 rounded-xl bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 transition"
              >
                ← Generate Another Roadmap
              </button>
            </div>

            <TimelineDisplay modules={roadmap} topic={topic} level={level} />
          </>
        )}
      </div>
    </div>
  )
}
