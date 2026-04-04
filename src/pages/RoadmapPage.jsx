import { useState } from 'react'
import Navbar from '../components/Navbar'
import MentorChat from '../components/MentorChat'
import Roadmap from '../components/Roadmap'
import AIRoadmapGenerator from '../components/AIRoadmapGenerator'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

export default function RoadmapPage() {
  const [useAI, setUseAI] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <Navbar />
      <MentorChat />

      {/* Mode Toggle */}
      <div className="flex justify-center py-8 px-4">
        <div className="bg-white/80 backdrop-blur-xl rounded-full border border-white/20 p-1 flex gap-2">
          <button
            onClick={() => setUseAI(false)}
            className={`px-6 py-3 rounded-full font-semibold transition ${
              !useAI
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            📔 Classic Roadmap
          </button>
          <button
            onClick={() => setUseAI(true)}
            className={`px-6 py-3 rounded-full font-semibold transition ${
              useAI
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            🤖 AI Generator
          </button>
        </div>
      </div>

      {/* Content */}
      {useAI ? <AIRoadmapGenerator /> : <Roadmap />}
    </div>
  )
}
