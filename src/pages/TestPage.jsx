import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import ProgressBar from '../components/ProgressBar'
import MentorChat from '../components/MentorChat'
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

export default function TestPage() {
  const navigate = useNavigate()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const testQuestions = [
    {
      id: 1,
      question: 'What is the primary goal of AI?',
      options: [
        'Create intelligent machines',
        'Replace all human jobs',
        'Build robots',
        'Control the internet',
      ],
      correct: 0,
    },
    {
      id: 2,
      question: 'Which of these is a machine learning algorithm?',
      options: ['Decision Trees', 'HTML', 'CSS', 'SQL'],
      correct: 0,
    },
    {
      id: 3,
      question: 'What does NLP stand for?',
      options: [
        'Natural Language Processing',
        'Network Loading Protocol',
        'Neural Language Program',
        'Non-Linear Processing',
      ],
      correct: 0,
    },
    {
      id: 4,
      question: 'Which layer is responsible for feature extraction in a CNN?',
      options: ['Dense Layer', 'Convolutional Layer', 'Flatten Layer', 'Output Layer'],
      correct: 1,
    },
    {
      id: 5,
      question: 'What is overfitting?',
      options: [
        'Model performs well on training data but poorly on test data',
        'Model performs poorly on both datasets',
        'Model performs well on both datasets',
        'Model has too many parameters',
      ],
      correct: 0,
    },
    {
      id: 6,
      question: 'Which optimizer is commonly used in deep learning?',
      options: ['Adam', 'Gradient Descent', 'Newton Method', 'All of the above'],
      correct: 3,
    },
    {
      id: 7,
      question: 'What is the purpose of a loss function?',
      options: [
        'To measure model performance',
        'To increase training time',
        'To reduce data complexity',
        'To add regularization',
      ],
      correct: 0,
    },
    {
      id: 8,
      question: 'Which of these is a type of neural network?',
      options: ['RNN', 'CNN', 'GAN', 'All of the above'],
      correct: 3,
    },
    {
      id: 9,
      question: 'What is the activation function used in output layers for binary classification?',
      options: ['ReLU', 'Sigmoid', 'Tanh', 'Softmax'],
      correct: 1,
    },
    {
      id: 10,
      question: 'What is batch normalization used for?',
      options: [
        'To normalize input data',
        'To accelerate training and reduce internal covariate shift',
        'To increase model accuracy',
        'To reduce overfitting',
      ],
      correct: 1,
    },
  ]

  const handleAnswer = (optionIndex) => {
    if (isSubmitted) return

    setAnswered({
      ...answered,
      [currentQuestion]: optionIndex,
    })

    if (optionIndex === testQuestions[currentQuestion].correct) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (currentQuestion < testQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const response = await axios.post(`${API_BASE_URL}/assessment`, {
        score,
        totalQuestions: testQuestions.length,
        answers: answered,
      })

      setIsSubmitted(true)
      setLoading(false)

      // Navigate to roadmap after 2 seconds
      setTimeout(() => {
        navigate('/roadmap', { state: { assessmentResult: response.data } })
      }, 2000)
    } catch (error) {
      console.error('Error submitting assessment:', error)
      setLoading(false)
      setIsSubmitted(true)
    }
  }

  if (isSubmitted) {
    const percentage = (score / testQuestions.length) * 100

    return (
      <div className="min-h-screen bg-gradient-primary flex items-center justify-center px-4">
        <Card className="max-w-md text-center">
          <div className="mb-6">
            <div className="text-6xl mb-4">
              {percentage >= 80 ? '🎉' : percentage >= 60 ? '👍' : '💪'}
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Assessment Complete!
            </h2>
          </div>

          <div className="mb-6">
            <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-primary mb-2">
              {Math.round(percentage)}%
            </p>
            <p className="text-gray-600">
              You scored {score} out of {testQuestions.length}
            </p>
          </div>

          <p className="text-gray-600 mb-6">
            {percentage >= 80
              ? 'Excellent! You have strong fundamentals.'
              : percentage >= 60
              ? 'Good work! Let\'s reinforce these concepts.'
              : 'Great! We\'ll build your knowledge step by step.'}
          </p>

          <p className="text-sm text-gray-500">
            Redirecting to your personalized roadmap...
          </p>
        </Card>
      </div>
    )
  }

  const question = testQuestions[currentQuestion]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <MentorChat />

      <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card>
          <div className="mb-8">
            <ProgressBar
              current={currentQuestion + 1}
              total={testQuestions.length}
              label="Progress"
            />
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {question.question}
            </h2>

            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className={`w-full p-4 text-left rounded-lg transition border-2 ${
                    answered[currentQuestion] === index
                      ? 'border-primary bg-primary/10'
                      : 'border-gray-200 hover:border-primary'
                  } ${isSubmitted ? 'cursor-not-allowed opacity-50' : ''}`}
                  disabled={isSubmitted}
                >
                  <span className="font-medium text-gray-900">{option}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            {currentQuestion < testQuestions.length - 1 ? (
              <>
                <button
                  onClick={handleNext}
                  disabled={answered[currentQuestion] === undefined}
                  className="flex-1 py-3 bg-gradient-primary text-white rounded-lg font-semibold hover:shadow-lg disabled:opacity-50 transition"
                >
                  Next Question
                </button>
              </>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading || Object.keys(answered).length !== testQuestions.length}
                className="flex-1 py-3 bg-gradient-primary text-white rounded-lg font-semibold hover:shadow-lg disabled:opacity-50 transition"
              >
                {loading ? 'Submitting...' : 'Submit Test'}
              </button>
            )}
          </div>

          {Object.keys(answered).length > 0 && (
            <div className="mt-6 text-center text-sm text-gray-600">
              {Object.keys(answered).length} answers recorded
            </div>
          )}
        </Card>
      </section>
    </div>
  )
}
