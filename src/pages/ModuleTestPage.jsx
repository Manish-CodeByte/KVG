import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import ProgressBar from '../components/ProgressBar'
import MentorChat from '../components/MentorChat'
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

export default function ModuleTestPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const moduleQuestions = {
    1: [
      {
        id: 1,
        question: 'What defines machine learning?',
        options: [
          'Teaching machines to learn from data',
          'Manually programming every rule',
          'Using only predefined algorithms',
          'Creating random outputs',
        ],
        correct: 0,
      },
      {
        id: 2,
        question: 'What is the difference between supervised and unsupervised learning?',
        options: [
          'Both are the same',
          'Supervised has labeled data, unsupervised doesn\'t',
          'Unsupervised is faster',
          'Supervised uses neural networks only',
        ],
        correct: 1,
      },
      {
        id: 3,
        question: 'Which of these is a classification problem?',
        options: [
          'Predicting house prices',
          'Predicting customer churn (Yes/No)',
          'Weather forecasting',
          'Stock price prediction',
        ],
        correct: 1,
      },
      {
        id: 4,
        question: 'What is overfitting?',
        options: [
          'Model learns noise instead of patterns',
          'Model is too simple',
          'Using too much data',
          'Training for too long is impossible',
        ],
        correct: 0,
      },
      {
        id: 5,
        question: 'Which metric is best for imbalanced classes?',
        options: ['Accuracy', 'Precision and Recall', 'F1 Score', 'Options B and C'],
        correct: 3,
      },
    ],
    2: [
      {
        id: 1,
        question: 'What is a neuron in a neural network?',
        options: [
          'A biological cell',
          'A mathematical function',
          'A layer',
          'An optimizer',
        ],
        correct: 1,
      },
      {
        id: 2,
        question: 'Which activation function is commonly used in hidden layers?',
        options: [
          'Linear',
          'ReLU',
          'Softmax',
          'Sigmoid only',
        ],
        correct: 1,
      },
      {
        id: 3,
        question: 'What is backpropagation?',
        options: [
          'Moving data backward',
          'Computing gradients to update weights',
          'Reversing the neural network',
          'Testing the model',
        ],
        correct: 1,
      },
      {
        id: 4,
        question: 'What does a forward pass compute?',
        options: [
          'Gradients',
          'Predictions/output',
          'Weights',
          'Loss reduction',
        ],
        correct: 1,
      },
      {
        id: 5,
        question: 'What is the purpose of a loss function?',
        options: [
          'To add regularization',
          'To measure model error',
          'To increase training speed',
          'To generate data',
        ],
        correct: 1,
      },
    ],
    3: [
      {
        id: 1,
        question: 'What does CNN stand for?',
        options: [
          'Central Neural Network',
          'Convolutional Neural Network',
          'Connected Neural Network',
          'Complex Neural Network',
        ],
        correct: 1,
      },
      {
        id: 2,
        question: 'What is the purpose of convolution in image processing?',
        options: [
          'To scale images',
          'To extract features from images',
          'To increase image size',
          'To compress images',
        ],
        correct: 1,
      },
      {
        id: 3,
        question: 'What does pooling do?',
        options: [
          'Groups multiple images',
          'Reduces spatial dimensions and extracts important features',
          'Increases resolution',
          'Adds more layers',
        ],
        correct: 1,
      },
      {
        id: 4,
        question: 'Which architecture is famous for image classification?',
        options: [
          'ResNet',
          'VGG',
          'AlexNet',
          'All of the above',
        ],
        correct: 3,
      },
      {
        id: 5,
        question: 'What is object detection?',
        options: [
          'Classifying entire images',
          'Finding and localizing objects in images',
          'Enhancing images',
          'Counting pixels',
        ],
        correct: 1,
      },
    ],
  }

  const questions = moduleQuestions[id] || moduleQuestions[1]

  const handleAnswer = (optionIndex) => {
    if (isSubmitted) return

    setAnswered({
      ...answered,
      [currentQuestion]: optionIndex,
    })

    if (optionIndex === questions[currentQuestion].correct) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const response = await axios.post(`${API_BASE_URL}/module-test`, {
        moduleId: id,
        score,
        totalQuestions: questions.length,
        passed: score >= questions.length * 0.7,
      })

      const passed = score >= questions.length * 0.7
      setResult({ passed, message: response.data.message })
      setIsSubmitted(true)
      setLoading(false)
    } catch (error) {
      console.error('Error submitting module test:', error)
      const passed = score >= questions.length * 0.7
      setResult({ passed, message: passed ? 'Test Passed!' : 'Test Failed. Try Again!' })
      setIsSubmitted(true)
      setLoading(false)
    }
  }

  if (isSubmitted && result) {
    return (
      <div className="min-h-screen bg-gradient-primary flex items-center justify-center px-4">
        <Card className="max-w-md text-center">
          <div className="mb-6">
            <div className="text-6xl mb-4">
              {result.passed ? '🎉' : '📚'}
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {result.passed ? 'Test Passed!' : 'Keep Learning'}
            </h2>
          </div>

          <div className="mb-6">
            <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-primary mb-2">
              {Math.round((score / questions.length) * 100)}%
            </p>
            <p className="text-gray-600">
              You scored {score} out of {questions.length}
            </p>
          </div>

          <p className="text-gray-600 mb-8">
            {result.passed
              ? 'Congratulations! You\'ve unlocked the next module.'
              : 'Review the material and try again to pass.'}
          </p>

          <div className="flex gap-3">
            <button
              onClick={() => navigate('/roadmap')}
              className="flex-1 py-3 bg-gradient-primary text-white rounded-lg font-semibold hover:shadow-lg transition"
            >
              Back to Roadmap
            </button>
            {!result.passed && (
              <button
                onClick={() => {
                  setCurrentQuestion(0)
                  setScore(0)
                  setAnswered({})
                  setIsSubmitted(false)
                  setResult(null)
                }}
                className="flex-1 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition"
              >
                Retry
              </button>
            )}
          </div>
        </Card>
      </div>
    )
  }

  const question = questions[currentQuestion]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <MentorChat />

      <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <button
          onClick={() => navigate('/roadmap')}
          className="mb-8 text-primary hover:text-secondary transition"
        >
          ← Back to Module
        </button>

        <Card>
          <div className="mb-8">
            <ProgressBar
              current={currentQuestion + 1}
              total={questions.length}
              label="Module Test Progress"
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
                  }`}
                >
                  <span className="font-medium text-gray-900">{option}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            {currentQuestion < questions.length - 1 ? (
              <button
                onClick={handleNext}
                disabled={answered[currentQuestion] === undefined}
                className="flex-1 py-3 bg-gradient-primary text-white rounded-lg font-semibold hover:shadow-lg disabled:opacity-50 transition"
              >
                Next Question
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading || Object.keys(answered).length !== questions.length}
                className="flex-1 py-3 bg-gradient-primary text-white rounded-lg font-semibold hover:shadow-lg disabled:opacity-50 transition"
              >
                {loading ? 'Submitting...' : 'Submit Test'}
              </button>
            )}
          </div>
        </Card>
      </section>
    </div>
  )
}
