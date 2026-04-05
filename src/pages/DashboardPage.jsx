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
import { useTheme } from '../context/ThemeContext'
import {
  fetchDashboardStats,
  fetchLearningTrend,
  fetchTopicStats,
  generateAIInsights,
} from '../services/analyticsService'

export default function DashboardPage() {
  const { isDark } = useTheme()
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
      <div className={`min-h-screen bg-gradient-to-br ${isDark ? 'from-gray-900 via-gray-800 to-gray-900' : 'from-blue-50 via-purple-50 to-pink-50'}`}>
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="inline-block w-12 h-12 gradient-primary rounded-full animate-spin mb-4"></div>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Loading your analytics...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'}`}>
      <Navbar />
      <MentorChat />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="mb-12 animate-fade-in-down">
          <h1 className={`text-5xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            📊 Learning Analytics
          </h1>
          <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Track your progress with real-time insights and visualizations
          </p>
        </div>

        {/* Top Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats && (
            <>
              <div className="animate-fade-in-up" style={{ animationDelay: '0s' }}>
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
              </div>

              <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <StatCard
                  icon="✅"
                  label="Modules Completed"
                  value={stats.modulesCompleted}
                  subtext="modules"
                  gradient="bg-gradient-success"
                  trend={{
                    positive: true,
                    value: 2,
                    label: 'new',
                  }}
                />
              </div>

              <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <StatCard
                  icon="🎯"
                  label="Accuracy Rate"
                  value={`${stats.accuracy}%`}
                  gradient="bg-gradient-cyan"
                  trend={{
                    positive: stats.accuracy > 70,
                    value: Math.floor(Math.random() * 15),
                    label: 'improvement',
                  }}
                />
              </div>

              <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <StatCard
                  icon="⏱️"
                  label="Time Saved"
                  value={`${stats.timeSaved}h`}
                  subtext="hours"
                  gradient="bg-gradient-warning"
                  trend={{
                    positive: true,
                    value: 3,
                    label: 'vs traditional',
                  }}
                />
              </div>
            </>
          )}
        </div>

        {/* Main Progress Bar */}
        <div className={`rounded-2xl p-8 mb-8 transition-all duration-300 animate-fade-in ${
          isDark 
            ? 'bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800/70' 
            : 'bg-white/80 border border-white/20 hover:bg-white/90'
        }`}>
          {stats && <AnimatedProgressBar progress={stats.completion} label="Overall Learning Progress" />}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Learning Trend Chart */}
          <ChartCard title="Learning Trend" subtitle="Score progression over time">
            {learningTrend.length > 0 && (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={learningTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} />
                  <XAxis dataKey="day" stroke={isDark ? '#9ca3af' : '#6b7280'} />
                  <YAxis stroke={isDark ? '#9ca3af' : '#6b7280'} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDark ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                      border: `1px solid ${isDark ? '#334155' : '#e5e7eb'}`,
                      borderRadius: '12px',
                      color: isDark ? '#f1f5f9' : '#111827',
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
                      backgroundColor: isDark ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                      border: `1px solid ${isDark ? '#334155' : '#e5e7eb'}`,
                      borderRadius: '12px',
                      color: isDark ? '#f1f5f9' : '#111827',
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
        <div className={`mt-8 rounded-2xl p-8 transition-all duration-300 animate-fade-in ${
          isDark 
            ? 'bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800/70' 
            : 'bg-white/80 border border-white/20 hover:bg-white/90'
        }`}>
          <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>📈 Quick Stats</h3>

          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className={`p-4 rounded-xl transition-all duration-300 hover:scale-105 ${isDark ? 'bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-800/50' : 'bg-gradient-to-br from-blue-100 to-purple-100'}`}>
              <p className={isDark ? 'text-gray-400 mb-2' : 'text-gray-600 mb-2'}>Current Streak</p>
              <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-primary">
                {stats?.currentStreak || 0} days 🔥
              </p>
            </div>

            <div className={`p-4 rounded-xl transition-all duration-300 hover:scale-105 ${isDark ? 'bg-gradient-to-br from-green-900/30 to-emerald-900/30 border border-green-800/50' : 'bg-gradient-to-br from-green-100 to-emerald-100'}`}>
              <p className={isDark ? 'text-gray-400 mb-2' : 'text-gray-600 mb-2'}>Total Hours</p>
              <p className={`text-3xl font-bold ${isDark ? 'text-green-400' : 'text-green-600'}`}>{stats?.timeSaved || 0}+ hours</p>
            </div>

            <div className={`p-4 rounded-xl transition-all duration-300 hover:scale-105 ${isDark ? 'bg-gradient-to-br from-orange-900/30 to-red-900/30 border border-orange-800/50' : 'bg-gradient-to-br from-orange-100 to-red-100'}`}>
              <p className={isDark ? 'text-gray-400 mb-2' : 'text-gray-600 mb-2'}>Percentile Rank</p>
              <p className={`text-3xl font-bold ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>Top {100 - (stats?.accuracy || 70)}%</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
