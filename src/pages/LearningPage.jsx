import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import MentorChat from '../components/MentorChat'

export default function LearningPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [watched, setWatched] = useState(false)

  const modules = {
    1: {
      id: 1,
      title: 'Machine Learning Fundamentals',
      description:
        'Learn the fundamentals of machine learning, including supervised and unsupervised learning, model evaluation, and best practices.',
      videoId: 'aircAruvnKk', // YouTube video ID
      duration: '1h 23m',
      topics: [
        'What is Machine Learning?',
        'Types of ML (Supervised, Unsupervised, Reinforcement)',
        'Training vs Test Data',
        'Model Evaluation Metrics',
        'Overfitting and Underfitting',
      ],
    },
    2: {
      id: 2,
      title: 'Deep Learning Basics',
      description:
        'Introduction to neural networks, activation functions, backpropagation, and how to build your first neural network.',
      videoId: 'aircAruvnKk',
      duration: '1h 45m',
      topics: [
        'Artificial Neural Networks',
        'Activation Functions',
        'Backpropagation Algorithm',
        'Forward and Backward Pass',
        'Building Neural Networks',
      ],
    },
    3: {
      id: 3,
      title: 'Computer Vision',
      description:
        'Learn about convolutional neural networks, image processing, object detection, and practical computer vision applications.',
      videoId: 'aircAruvnKk',
      duration: '2h 10m',
      topics: [
        'Image Basics and Pixels',
        'Convolutional Neural Networks (CNNs)',
        'Pooling and Stride',
        'Popular CNN Architectures',
        'Object Detection and Segmentation',
      ],
    },
  }

  const module = modules[id] || modules[1]

  const handleWatched = () => {
    setWatched(true)
  }

  const handleNext = () => {
    navigate(`/module-test/${id}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <MentorChat />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <button
          onClick={() => navigate('/roadmap')}
          className="mb-8 text-primary hover:text-secondary transition"
        >
          ← Back to Roadmap
        </button>

        <Card className="mb-8">
          {/* Video Embed */}
          <div className="mb-8 rounded-xl overflow-hidden bg-black aspect-video">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${module.videoId}`}
              title={module.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>

          {/* Module Info */}
          <div className="mb-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {module.title}
                </h1>
                <p className="text-gray-600">Duration: {module.duration}</p>
              </div>
            </div>

            <p className="text-gray-700 text-lg mb-8">{module.description}</p>

            {/* Topics Covered */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Topics Covered
              </h3>
              <ul className="space-y-2">
                {module.topics.map((topic, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-700">
                    <span className="w-6 h-6 rounded-full bg-gradient-primary text-white flex items-center justify-center text-sm font-semibold">
                      ✓
                    </span>
                    {topic}
                  </li>
                ))}
              </ul>
            </div>

            {/* Watched Checkbox */}
            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200 mb-8">
              <input
                type="checkbox"
                id="watched"
                checked={watched}
                onChange={(e) => handleWatched()}
                className="w-5 h-5 rounded accent-primary"
              />
              <label htmlFor="watched" className="text-gray-700 cursor-pointer">
                I've completed this video and understood the concepts
              </label>
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              disabled={!watched}
              className="w-full py-4 bg-gradient-primary text-white rounded-lg font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Next: Take Module Test →
            </button>

            {!watched && (
              <p className="text-center text-sm text-gray-600 mt-4">
                Please watch the video and check the box to proceed
              </p>
            )}
          </div>
        </Card>

        {/* Learning Tips */}
        <Card>
          <h3 className="text-xl font-bold text-gray-900 mb-4">💡 Learning Tips</h3>
          <ul className="space-y-3 text-gray-700">
            <li>• Watch the entire video without skipping for better understanding</li>
            <li>• Take notes of key concepts and examples</li>
            <li>• Pause and think about the concepts before moving forward</li>
            <li>• Try to apply what you learn to real-world scenarios</li>
          </ul>
        </Card>
      </section>
    </div>
  )
}
