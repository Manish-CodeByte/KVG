import { useState } from 'react'
import Navbar from '../components/Navbar'
import MentorChat from '../components/MentorChat'
import RoadmapTimeline from '../components/RoadmapTimeline'
import { generateAIRoadmap } from '../services/AIRoadmapService'
import { useToast } from '../context/ToastContext'

export default function AIRoadmapGeneratorPage() {
  const { addToast } = useToast()
  const [subject, setSubject] = useState('')
  const [level, setLevel] = useState('Beginner')
  const [modules, setModules] = useState([])
  const [loading, setLoading] = useState(false)
  const [generated, setGenerated] = useState(false)

  const handleGenerate = async (e) => {
    e.preventDefault()

    if (!subject.trim()) {
      addToast('Please enter a subject!', 'error')
      return
    }

    setLoading(true)
    addToast('🤖 Generating your AI roadmap...', 'info')

    try {
      const roadmap = await generateAIRoadmap(subject, level)
      setModules(roadmap)
      setGenerated(true)
      addToast('✅ Roadmap generated successfully!', 'success')
    } catch (error) {
      console.error('Error generating roadmap:', error)
      addToast('Error generating roadmap', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleStartModule = (module) => {
    addToast(`Starting: ${module.title}`, 'success')
    // Could navigate to learning page here
  }

  const handleReset = () => {
    setSubject('')
    setLevel('Beginner')
    setModules([])
    setGenerated(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <Navbar />
      <MentorChat />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            🤖 AI Roadmap Generator
          </h1>
          <p className="text-xl text-gray-600">
            Generate a personalized learning roadmap powered by AI
          </p>
        </div>

        {!generated ? (
          /* Input Form */
          <div className="max-w-2xl mx-auto mb-12">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-xl">
              <form onSubmit={handleGenerate} className="space-y-6">
                {/* Subject Input */}
                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-3">
                    What do you want to learn?
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g., Web Development, Machine Learning, Data Science..."
                    className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition text-lg"
                    disabled={loading}
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Be specific! The more details, the better the roadmap.
                  </p>
                </div>

                {/* Difficulty Level */}
                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-3">
                    Your Level
                  </label>
                  <div className="flex gap-4">
                    {['Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setLevel(lvl)}
                        disabled={loading}
                        className={`px-6 py-3 rounded-lg font-semibold transition ${
                          level === lvl
                            ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-lg hover:shadow-lg transition disabled:opacity-50"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Generating roadmap...
                    </span>
                  ) : (
                    '✨ Generate Roadmap'
                  )}
                </button>
              </form>

              {/* Quick Suggestions */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-4 font-medium">
                  Quick suggestions:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    'Web Development',
                    'Machine Learning',
                    'Data Science',
                    'Cloud Computing',
                  ].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => {
                        setSubject(suggestion)
                      }}
                      className="p-3 rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 font-medium hover:from-indigo-100 hover:to-purple-100 transition text-sm"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Roadmap Display */
          <div>
            {/* Summary */}
            <div className="mb-8 bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {subject} Roadmap ({level} Level)
                  </h2>
                  <p className="text-gray-600">
                    {modules.length} modules • AI-generated personalized path
                  </p>
                </div>
                <button
                  onClick={handleReset}
                  className="px-6 py-3 rounded-lg bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition"
                >
                  ← Generate New Roadmap
                </button>
              </div>
            </div>

            {/* Timeline */}
            <RoadmapTimeline
              modules={modules}
              onStart={handleStartModule}
            />
          </div>
        )}
      </div>
    </div>
  )
}
