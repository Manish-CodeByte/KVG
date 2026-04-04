import { useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import Navbar from '../components/Navbar'

export default function LandingPage() {
  const navigate = useNavigate()
  const { isSignedIn } = useUser()

  const handleGetStarted = () => {
    if (isSignedIn) {
      navigate('/dashboard')
    } else {
      navigate('/auth')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="mb-8">
          <div className="w-24 h-24 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
            <span className="text-white text-5xl font-bold">N</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Neurox
          </h1>
          <p className="text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-primary font-semibold mb-8">
            Learn only what you don't know
          </p>
        </div>

        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-12">
          An AI-powered smart curriculum designer that personalizes your learning journey.
          Skip what you know, master what you don't. Save hours, gain knowledge faster.
        </p>

        <button
          onClick={handleGetStarted}
          className="px-8 py-4 bg-gradient-primary text-white text-lg font-semibold rounded-xl hover:shadow-xl transition-all transform hover:scale-105"
        >
          Get Started →
        </button>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            Why Neurox?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                🧠
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">AI-Powered</h3>
              <p className="text-gray-600">
                Intelligent assessment identifies your knowledge gaps and creates a personalized roadmap.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 gradient-accent rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                ⏱️
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Save Time</h3>
              <p className="text-gray-600">
                Skip topics you already know. Learn only what's relevant to your goals.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                📈
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Track Progress</h3>
              <p className="text-gray-600">
                Real-time analytics and progress tracking to keep you motivated and on track.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-primary text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Start Learning Smarter Today
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of learners using Neurox to master new skills faster.
          </p>
          <button
            onClick={handleGetStarted}
            className="px-8 py-4 bg-white text-transparent bg-clip-text bg-gradient-primary font-semibold rounded-xl hover:shadow-xl transition-all transform hover:scale-105 border-2 border-white"
          >
            Get Started Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2024 Neurox. AI Smart Curriculum Designer.
          </p>
        </div>
      </footer>
    </div>
  )
}
