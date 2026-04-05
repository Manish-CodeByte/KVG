import { useState } from 'react'
import Navbar from '../components/Navbar'
import MentorChat from '../components/MentorChat'
import { useTheme } from '../context/ThemeContext'
import RoadmapTimeline from '../components/RoadmapTimeline'
import { generateAIRoadmap } from '../services/AIRoadmapService'
import { useToast } from '../context/ToastContext'

export default function AIRoadmapGeneratorPage() {
  const { addToast } = useToast()
  const { isDark } = useTheme()
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
    <div className={`min-h-screen ${isDark ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50'}`}>
      <Navbar />
      <MentorChat />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            🤖 AI Roadmap Generator
          </h1>
          <p className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Generate a personalized learning roadmap powered by AI
          </p>
        </div>

        {!generated ? (
          /* Input Form */
          <div className="max-w-2xl mx-auto mb-12">
            <div className={`${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white/80 border-white/20'} backdrop-blur-xl rounded-3xl p-8 border shadow-xl transition-all duration-300`}>
              <form onSubmit={handleGenerate} className="space-y-6">
                {/* Subject Input */}
                <div>
                  <label className={`block text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    What do you want to learn?
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g., Web Development, Machine Learning, Data Science..."
                    className={`w-full px-6 py-4 rounded-xl border focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition text-lg ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-200 text-gray-900'}`}
                    disabled={loading}
                  />
                  <p className={`text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Be specific! The more details, the better the roadmap.
                  </p>
                </div>

                {/* Difficulty Level */}
                <div>
                  <label className={`block text-lg font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
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
                            : isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
              <div className={`mt-8 pt-8 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <p className={`text-sm mb-4 font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
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
                      className={`p-3 rounded-lg font-medium text-sm transition ${isDark ? 'bg-gradient-to-r from-indigo-900/40 to-purple-900/40 text-indigo-300 hover:from-indigo-900/60 hover:to-purple-900/60' : 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 hover:from-indigo-100 hover:to-purple-100'}`}
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
            <div className={`mb-8 ${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white/80 border-white/20'} backdrop-blur-xl rounded-2xl p-6 border shadow-lg transition-all duration-300`}>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {subject} Roadmap ({level} Level)
                  </h2>
                  <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                    {modules.length} modules • AI-generated personalized path
                  </p>
                </div>
                <button
                  onClick={handleReset}
                  className={`px-6 py-3 rounded-lg font-semibold transition ${isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
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
