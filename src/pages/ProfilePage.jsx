import { useUser } from '@clerk/clerk-react'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import MentorChat from '../components/MentorChat'

export default function ProfilePage() {
  const { user } = useUser()

  const stats = {
    totalLearningHours: 45,
    modulesCompleted: 4,
    certificatesEarned: 2,
    skillsAcquired: 12,
    currentStreak: 7,
  }

  const achievements = [
    { icon: '🥇', title: 'Fast Learner', description: 'Completed 3 modules in 1 week' },
    { icon: '🔥', title: '7-Day Streak', description: 'Learned for 7 consecutive days' },
    { icon: '⭐', title: 'Perfect Score', description: 'Scored 100% on module test' },
    { icon: '🚀', title: 'Quick Start', description: 'Completed first module within 24 hours' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <MentorChat />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Profile Header */}
        <Card className="mb-12">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-full gradient-primary flex items-center justify-center text-white">
                <span className="text-6xl font-bold">
                  {user?.firstName?.charAt(0) || 'U'}
                </span>
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {user?.firstName} {user?.lastName}
              </h1>
              <p className="text-gray-600 mb-4">{user?.emailAddresses?.[0]?.emailAddress}</p>
              <p className="text-gray-600 mb-6">
                Member since{' '}
                <span className="font-semibold">
                  {new Date(user?.createdAt || Date.now()).toLocaleDateString('en-US', {
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
              </p>

              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <button className="px-6 py-2 bg-gradient-primary text-white rounded-lg hover:shadow-lg transition">
                  Edit Profile
                </button>
                <button className="px-6 py-2 border-2 border-primary text-primary rounded-lg hover:bg-primary/10 transition">
                  Settings
                </button>
              </div>
            </div>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
          <Card>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary">{stats.totalLearningHours}</p>
              <p className="text-sm text-gray-600 mt-2">Learning Hours</p>
            </div>
          </Card>

          <Card>
            <div className="text-center">
              <p className="text-4xl font-bold text-blue-600">{stats.modulesCompleted}</p>
              <p className="text-sm text-gray-600 mt-2">Modules Done</p>
            </div>
          </Card>

          <Card>
            <div className="text-center">
              <p className="text-4xl font-bold text-green-600">{stats.certificatesEarned}</p>
              <p className="text-sm text-gray-600 mt-2">Certificates</p>
            </div>
          </Card>

          <Card>
            <div className="text-center">
              <p className="text-4xl font-bold text-purple-600">{stats.skillsAcquired}</p>
              <p className="text-sm text-gray-600 mt-2">Skills Gained</p>
            </div>
          </Card>

          <Card>
            <div className="text-center">
              <p className="text-4xl font-bold text-orange-600">{stats.currentStreak}</p>
              <p className="text-sm text-gray-600 mt-2">Day Streak</p>
            </div>
          </Card>
        </div>

        {/* Achievements */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Achievements 🏆</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <Card key={index}>
                <div className="flex items-start gap-4">
                  <span className="text-4xl">{achievement.icon}</span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{achievement.title}</h3>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Learning Goals */}
        <Card>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Learning Goals</h2>

          <div className="space-y-4">
            <div>
              <p className="font-semibold text-gray-900 mb-2">Master Deep Learning</p>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-gradient-primary h-3 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <p className="text-sm text-gray-600 mt-1">75% Complete</p>
            </div>

            <div>
              <p className="font-semibold text-gray-900 mb-2">Build 5 Projects</p>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-gradient-primary h-3 rounded-full" style={{ width: '40%' }}></div>
              </div>
              <p className="text-sm text-gray-600 mt-1">2 of 5 Completed</p>
            </div>

            <div>
              <p className="font-semibold text-gray-900 mb-2">30-Day Learning Streak</p>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-gradient-primary h-3 rounded-full" style={{ width: '23%' }}></div>
              </div>
              <p className="text-sm text-gray-600 mt-1">7 of 30 Days</p>
            </div>
          </div>
        </Card>
      </section>
    </div>
  )
}
