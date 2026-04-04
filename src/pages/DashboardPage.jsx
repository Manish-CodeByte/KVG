import { useState, useEffect } from 'react'
import {
  LineChart,
  Line,
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
import StatCard from '../components/StatCard'
import ChartCard from '../components/ChartCard'
import InsightCard from '../components/InsightCard'
import AnimatedProgressBar from '../components/AnimatedProgressBar'
import {
  fetchDashboardStats,
  fetchLearningTrend,
  fetchTopicStats,
  generateAIInsights,
} from '../services/analyticsService'

export default function DashboardPage() {
  const [stats, setStats] = useState(null)
  const [learningTrend, setLearningTrend] = useState([])
  const [topicStats, setTopicStats] = useState([])
  const [insights, setInsights] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        const [dashStats, trend, topics] = await Promise.all([
          fetchDashboardStats(),
          fetchLearningTrend(),
          fetchTopicStats(),
        ])

        setStats(dashStats)
        setLearningTrend(trend)
        setTopicStats(topics)
        setInsights(generateAIInsights(dashStats, []))
        setLoading(false)
      } catch (error) {
        console.error('Error loading dashboard:', error)
        setLoading(false)
      }
    }

    loadData()

    // Real-time updates every 5 seconds
    const interval = setInterval(async () => {
      try {
        const updatedStats = await fetchDashboardStats()
        setStats(updatedStats)
      } catch (error) {
        console.error('Error updating stats:', error)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="inline-block w-12 h-12 gradient-primary rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600">Loading your analytics...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Navbar />
      <MentorChat />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-2">
            Learning Analytics Dashboard
          </h1>
          <p className="text-gray-600 text-lg">
            Track your progress with real-time insights and visualizations
          </p>
        </div>

        {/* Top Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats && (
            <>
              <StatCard
                icon="📊"
                label="Overall Completion"
                value={`${stats.completion}%`}
                gradient="bg-gradient-primary"
                trend={{
                  positive: stats.completion > 50,
                  value: Math.floor(Math.random() * 10),
                  label: 'this week',
                }}
              />

              <StatCard
                icon="✅"
                label="Modules Completed"
                value={stats.modulesCompleted}
                subtext="modules"
                gradient="bg-gradient-to-r from-green-400 to-emerald-500"
                trend={{
                  positive: true,
                  value: 2,
                  label: 'new',
                }}
              />

              <StatCard
                icon="🎯"
                label="Accuracy Rate"
                value={`${stats.accuracy}%`}
                gradient="bg-gradient-to-r from-blue-400 to-cyan-500"
                trend={{
                  positive: stats.accuracy > 70,
                  value: Math.floor(Math.random() * 15),
                  label: 'improvement',
                }}
              />

              <StatCard
                icon="⏱️"
                label="Time Saved"
                value={`${stats.timeSaved}h`}
                subtext="hours"
                gradient="bg-gradient-to-r from-orange-400 to-red-500"
                trend={{
                  positive: true,
                  value: 3,
                  label: 'vs traditional',
                }}
              />
            </>
          )}
        </div>

        {/* Main Progress Bar */}
        <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl p-8 mb-8 shadow-lg">
          {stats && <AnimatedProgressBar progress={stats.completion} label="Overall Learning Progress" />}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Learning Trend Chart */}
          <ChartCard title="Learning Trend" subtitle="Score progression over time">
            {learningTrend.length > 0 && (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={learningTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="day" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#6366f1"
                    strokeWidth={3}
                    dot={{ fill: '#6366f1', r: 5 }}
                    activeDot={{ r: 7 }}
                    isAnimationActive={true}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </ChartCard>

          {/* Topic Strength Pie Chart */}
          <ChartCard title="Topic Breakdown" subtitle="Weak vs Strong areas">
            {topicStats.length > 0 && (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={topicStats}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    isAnimationActive={true}
                  >
                    {topicStats.map((entry, index) => (
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

        {/* AI Insights */}
        {insights.length > 0 && <InsightCard insights={insights} />}

        {/* Stats Summary */}
        <div className="mt-8 bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">📈 Quick Stats</h3>

          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="p-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl">
              <p className="text-gray-600 mb-2">Current Streak</p>
              <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-primary">
                {stats?.currentStreak || 0} days 🔥
              </p>
            </div>

            <div className="p-4 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl">
              <p className="text-gray-600 mb-2">Total Hours</p>
              <p className="text-3xl font-bold text-green-600">{stats?.timeSaved || 0}+ hours</p>
            </div>

            <div className="p-4 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl">
              <p className="text-gray-600 mb-2">Percentile Rank</p>
              <p className="text-3xl font-bold text-orange-600">Top {100 - (stats?.accuracy || 70)}%</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
