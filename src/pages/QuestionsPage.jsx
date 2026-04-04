import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import MentorChat from '../components/MentorChat'

export default function QuestionsPage() {
  const navigate = useNavigate()
  const [selectedDomain, setSelectedDomain] = useState(null)
  const [answers, setAnswers] = useState({})
  const [currentQuestion, setCurrentQuestion] = useState(0)

  const domains = [
    { id: 'ai', name: 'Artificial Intelligence', icon: '🤖' },
    { id: 'web', name: 'Web Development', icon: '🌐' },
    { id: 'mobile', name: 'Mobile Development', icon: '📱' },
    { id: 'data', name: 'Data Science', icon: '📊' },
    { id: 'cloud', name: 'Cloud Computing', icon: '☁️' },
    { id: 'security', name: 'Cybersecurity', icon: '🔒' },
  ]

  const questions = {
    ai: [
      'How familiar are you with machine learning?',
      'Have you worked with neural networks?',
      'Do you understand deep learning concepts?',
    ],
    web: [
      'What is your experience with HTML/CSS?',
      'Are you familiar with JavaScript frameworks?',
      'Do you know backend development?',
    ],
    mobile: [
      'Have you developed mobile apps before?',
      'Are you familiar with React Native?',
      'Do you understand native app development?',
    ],
    data: [
      'What is your experience with Python?',
      'Are you familiar with pandas and numpy?',
      'Do you understand statistical analysis?',
    ],
    cloud: [
      'Have you used AWS or Azure?',
      'Do you understand microservices?',
      'Are you familiar with containerization?',
    ],
    security: [
      'What is your networking background?',
      'Are you familiar with encryption?',
      'Do you understand security vulnerabilities?',
    ],
  }

  const handleDomainSelect = (domainId) => {
    setSelectedDomain(domainId)
    setCurrentQuestion(0)
    setAnswers({})
  }

  const handleAnswer = (answer) => {
    setAnswers({
      ...answers,
      [currentQuestion]: answer,
    })

    if (currentQuestion < questions[selectedDomain].length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Navigate to test page
      navigate('/test', { state: { domain: selectedDomain, answers } })
    }
  }

  if (!selectedDomain) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <MentorChat />

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              What do you want to learn?
            </h1>
            <p className="text-gray-600 text-lg">
              Select a domain to get started with your personalized learning path.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {domains.map((domain) => (
              <Card
                key={domain.id}
                onClick={() => handleDomainSelect(domain.id)}
              >
                <div className="text-center">
                  <div className="text-5xl mb-4">{domain.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {domain.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Get a personalized assessment
                  </p>
                  <button className="w-full py-2 bg-gradient-primary text-white rounded-lg hover:shadow-lg transition">
                    Select
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <MentorChat />

      <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <button
          onClick={() => {
            setSelectedDomain(null)
            setAnswers({})
            setCurrentQuestion(0)
          }}
          className="mb-8 text-primary hover:text-secondary transition"
        >
          ← Back to domains
        </button>

        <Card>
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                {
                  domains.find((d) => d.id === selectedDomain)?.name
                }
              </h2>
              <span className="text-sm font-semibold text-gray-600">
                Question {currentQuestion + 1} of{' '}
                {questions[selectedDomain].length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-primary h-full transition-all duration-300"
                style={{
                  width: `${((currentQuestion + 1) / questions[selectedDomain].length) * 100}%`,
                }}
              ></div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              {questions[selectedDomain][currentQuestion]}
            </h3>

            <div className="space-y-3">
              {['Very beginner', 'Beginner', 'Intermediate', 'Advanced', 'Expert'].map(
                (option) => (
                  <button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    className="w-full p-4 text-left border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition"
                  >
                    {option}
                  </button>
                )
              )}
            </div>
          </div>
        </Card>
      </section>
    </div>
  )
}
