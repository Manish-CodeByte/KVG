import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

// Mock data generators
const generateMockDashboardStats = () => ({
  completion: Math.floor(Math.random() * 30) + 60,
  modulesCompleted: Math.floor(Math.random() * 5) + 8,
  accuracy: Math.floor(Math.random() * 25) + 70,
  timeSaved: Math.floor(Math.random() * 8) + 12,
  currentStreak: Math.floor(Math.random() * 10) + 5,
})

const generateMockSubjectAnalysis = () => [
  { subject: 'React', score: Math.floor(Math.random() * 20) + 75 },
  { subject: 'DSA', score: Math.floor(Math.random() * 20) + 55 },
  { subject: 'DBMS', score: Math.floor(Math.random() * 20) + 50 },
  { subject: 'APIs', score: Math.floor(Math.random() * 20) + 65 },
  { subject: 'Testing', score: Math.floor(Math.random() * 20) + 60 },
]

const generateMockWeeklyData = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  return days.map((day) => ({
    day,
    time: Math.floor(Math.random() * 4) + 1,
  }))
}

const generateMockLearningTrend = () => {
  const days = Array.from({ length: 14 }, (_, i) => `Day ${i + 1}`)
  let baseScore = 50
  return days.map((day) => ({
    day,
    score: (baseScore += Math.floor(Math.random() * 8) - 1),
  }))
}

// Fetch dashboard stats
export const fetchDashboardStats = async () => {
  try {
    // Try real API first
    const response = await axios.get(`${API_BASE_URL}/dashboard-stats`, {
      timeout: 2000,
    })
    return response.data
  } catch (error) {
    // Fallback to mock data
    console.log('Using mock dashboard data')
    return generateMockDashboardStats()
  }
}

// Fetch performance analytics
export const fetchPerformanceData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/performance-data`, {
      timeout: 2000,
    })
    return response.data
  } catch (error) {
    // Fallback to mock data
    console.log('Using mock performance data')
    return {
      subjectAnalysis: generateMockSubjectAnalysis(),
      weeklyActivity: generateMockWeeklyData(),
      accuracyBreakdown: {
        correct: Math.floor(Math.random() * 30) + 70,
        wrong: Math.floor(Math.random() * 20) + 10,
      },
      weakAreas: [
        { topic: 'Binary Trees', weakness: 85 },
        { topic: 'Graph Algorithms', weakness: 78 },
        { topic: 'SQL Joins', weakness: 72 },
      ],
    }
  }
}

// Fetch learning trend
export const fetchLearningTrend = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/learning-trend`, {
      timeout: 2000,
    })
    return response.data
  } catch (error) {
    console.log('Using mock learning trend data')
    return generateMockLearningTrend()
  }
}

// Fetch weak topics for pie chart
export const fetchTopicStats = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/topic-stats`, {
      timeout: 2000,
    })
    return response.data
  } catch (error) {
    console.log('Using mock topic stats')
    return [
      { name: 'Weak Topics', value: 4, fill: '#ef4444' },
      { name: 'Strong Topics', value: 8, fill: '#22c55e' },
    ]
  }
}

// Generate AI insights
export const generateAIInsights = (stats, subjectData) => {
  const insights = []

  // Accuracy insight
  if (stats.accuracy >= 80) {
    insights.push({
      icon: '🔥',
      title: 'Excellent Performance',
      description: `You're in the top 10% learners with ${stats.accuracy}% accuracy`,
      metric: `${stats.accuracy}% accuracy`,
    })
  } else if (stats.accuracy >= 70) {
    insights.push({
      icon: '⚡',
      title: 'Good Progress',
      description: `Your accuracy of ${stats.accuracy}% shows consistent learning`,
      metric: `${stats.accuracy}% accuracy`,
    })
  } else {
    insights.push({
      icon: '💡',
      title: 'Keep Learning',
      description: 'Focus on weak areas to improve your accuracy',
      metric: 'Room to grow',
    })
  }

  // Weakest topic
  if (subjectData && subjectData.length > 0) {
    const weakest = subjectData.reduce((a, b) => (a.score < b.score ? a : b))
    insights.push({
      icon: '🎯',
      title: `Focus on ${weakest.subject}`,
      description: `Your ${weakest.subject} score is ${weakest.score}%. Try dedicated practice.`,
      metric: `${weakest.score}%`,
    })
  }

  // Time saved
  if (stats.timeSaved) {
    insights.push({
      icon: '⏱️',
      title: 'Time Optimization',
      description: `Neurox saved you ${stats.timeSaved} hours by focusing on gaps`,
      metric: `${stats.timeSaved}h saved`,
    })
  }

  // Streak
  if (stats.currentStreak >= 7) {
    insights.push({
      icon: '🔥',
      title: 'Great Consistency',
      description: `${stats.currentStreak}-day streak! You're on fire 🚀`,
      metric: `${stats.currentStreak} days`,
    })
  }

  return insights.slice(0, 4) // Return top 4 insights
}
