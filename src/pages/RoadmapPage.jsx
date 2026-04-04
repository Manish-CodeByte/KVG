import Navbar from '../components/Navbar'
import MentorChat from '../components/MentorChat'
import Roadmap from '../components/Roadmap'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

export default function RoadmapPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <Navbar />
      <MentorChat />
      <Roadmap />
    </div>
  )
}
