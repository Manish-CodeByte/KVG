import { useState, useEffect } from 'react'
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import Navbar from '../components/Navbar'
import MentorChat from '../components/MentorChat'
import ChartCard from '../components/ChartCard'
import InsightCard from '../components/InsightCard'
import {
  fetchPerformanceData,
  fetchPerformanceData as fetchAnalytics,
  generateAIInsights,
} from '../services/analyticsService'

export default function PerformancePage() {
  const [data, setData] = useState({
    subjectAnalysis: [],
    weeklyActivity: [],
    accuracyBreakdown: { correct: 0, wrong: 0 },
    weakAreas: [],
  })
  const [insights, setInsights] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const performanceData = await fetchPerformanceData()
        setData(performanceData)

        // Generate insights based on weak areas
        const mockStats = {
          accuracy: 72,
          timeSaved: 12,
          currentStreak: 7,
        }
        const generatedInsights = generateAIInsights(mockStats, performanceData.subjectAnalysis)
        setInsights(generatedInsights)
        setLoading(false)
      } catch (error) {
        console.error('Error loading performance data:', error)
        setLoading(false)
      }
    }

    loadData()

    // Real-time updates
    const interval = setInterval(loadData, 6000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="inline-block w-12 h-12 gradient-primary rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600">Loading performance analytics...</p>
          </div>
        </div>
      </div>
    )
  }

  // Prepare accuracy data for donut chart
  const accuracyData = [
    { name: 'Correct', value: data.accuracyBreakdown.correct, fill: '#22c55e' },
    { name: 'Wrong', value: data.accuracyBreakdown.wrong, fill: '#ef4444' },
  ]

  const weakAreasForChart = data.weakAreas.slice(0, 5).map((area) => ({
    ...area,
    difficulty: area.weakness,
  }))

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Navbar />
      <MentorChat />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-2">
            Performance Analytics
          </h1>
          <p className="text-gray-600 text-lg">
            Deep dive into your learning patterns and performance metrics
          </p>
        </div>

        {/* Section 1: Subject Analysis */}
        <div className="mb-8">
          <ChartCard title="Subject Performance Analysis" subtitle="Score by topic">
            {data.subjectAnalysis.length > 0 && (
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={data.subjectAnalysis}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="subject" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                    }}
                    formatter={(value) => `${value}%`}
                  />
                  <Legend />
                  <Bar dataKey="score" fill="#6366f1" radius={[8, 8, 0, 0]} isAnimationActive={true} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </ChartCard>
        </div>

        {/* Section 2 & 3: Weekly Activity and Accuracy */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Weekly Activity */}
          <ChartCard title="Weekly Learning Activity" subtitle="Hours spent per day">
            {data.weeklyActivity.length > 0 && (
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={data.weeklyActivity}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="day" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                    }}
                    formatter={(value) => `${value}h`}
                  />
                  <Area
                    type="monotone"
                    dataKey="time"
                    fill="#a855f7"
                    stroke="#a855f7"
                    isAnimationActive={true}
                    opacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </ChartCard>

          {/* Accuracy Breakdown */}
          <ChartCard title="Answer Accuracy" subtitle="Correct vs Wrong responses">
            {accuracyData.length > 0 && (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={accuracyData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    isAnimationActive={true}
                  >
                    {accuracyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </ChartCard>
        </div>

        {/* Section 4: Weak Areas */}
        <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-lg mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">🎯 Areas for Improvement</h3>

          {data.weakAreas.length > 0 ? (
            <div className="space-y-3">
              {data.weakAreas.map((area, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-xl hover:shadow-md transition">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">{area.topic}</h4>
                    <p className="text-sm text-gray-600">Weakness index: {area.weakness}%</p>
                  </div>

                  <div className="ml-4 text-right">
                    <div className="text-3xl font-bold text-red-600">{area.weakness}%</div>
                    <p className="text-xs text-red-600 mt-1">Needs Work</p>
                  </div>

                  {/* Progress bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-200">
                    <div
                      className="h-full bg-red-600 transition-all"
                      style={{ width: `${area.weakness}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No weak areas detected. Keep up the great work! 🎉</p>
          )}
        </div>

        {/* Section 5: Smart AI Insights */}
        {insights.length > 0 && (
          <div className="mb-8">
            <InsightCard insights={insights} />
          </div>
        )}

        {/* Recommendations Card */}
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">💡 Personalized Study Plan</h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/80 rounded-xl p-4">
              <p className="font-semibold text-gray-900 mb-2">📚 Focus Areas</p>
              <ul className="space-y-2 text-sm text-gray-700">
                {data.weakAreas.slice(0, 3).map((area, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-red-600">●</span> {area.topic}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white/80 rounded-xl p-4">
              <p className="font-semibold text-gray-900 mb-2">🎯 Recommended Actions</p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="text-blue-600">✓</span> Take targeted quizzes
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-600">✓</span> Watch concept videos
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-600">✓</span> Review past mistakes
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
