import { useState, useEffect } from 'react'
import { useUserProfile } from '../../hooks/useUserProfile'

/**
 * ProfileForm Component
 * Demonstrates how to create and update user profiles
 * Includes follow-up survey questions
 */
export const ProfileForm = () => {
  const { profile, loading, error, saveProfile, updateProfile } = useUserProfile()

  const [formData, setFormData] = useState({
    full_name: '',
    age: '',
    education_level: '',
    interests: '',
    skill_level: 'Beginner',
  })

  const [followUpAnswers, setFollowUpAnswers] = useState({
    learning_style: '',
    daily_hours: '',
    goal: '',
    challenges: '',
  })

  const [submitted, setSubmitted] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  // Populate form with existing profile data
  useEffect(() => {
    if (profile && !isEditing) {
      setFormData({
        full_name: profile.full_name || '',
        age: profile.age || '',
        education_level: profile.education_level || '',
        interests: profile.interests || '',
        skill_level: profile.skill_level || 'Beginner',
      })
      setFollowUpAnswers(profile.follow_up_answers || {})
    }
  }, [profile, isEditing])

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFollowUpChange = (e) => {
    const { name, value } = e.target
    setFollowUpAnswers((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (profile) {
        // Update existing profile
        await updateProfile({
          ...formData,
          follow_up_answers: followUpAnswers,
        })
      } else {
        // Create new profile
        await saveProfile({
          ...formData,
          follow_up_answers: followUpAnswers,
        })
      }
      setSubmitted(true)
      setIsEditing(false)
      setTimeout(() => setSubmitted(false), 3000)
    } catch (err) {
      console.error('Failed to save profile:', err)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-500">Loading profile...</div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        {profile ? 'Edit Your Profile' : 'Complete Your Profile'}
      </h1>
      <p className="text-gray-600 mb-6">
        Help us personalize your learning experience
      </p>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {submitted && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          ✓ Profile saved successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information Section */}
        <div className="border-b pb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Basic Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleFormChange}
                placeholder="John Doe"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {/* Age */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Age
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleFormChange}
                placeholder="25"
                min="13"
                max="120"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Education & Skills Section */}
        <div className="border-b pb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Education & Skills
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Education Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Education Level
              </label>
              <select
                name="education_level"
                value={formData.education_level}
                onChange={handleFormChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="">Select education level</option>
                <option value="High School">High School</option>
                <option value="Bachelor's">Bachelor's Degree</option>
                <option value="Master's">Master's Degree</option>
                <option value="PhD">PhD</option>
                <option value="Self-taught">Self-taught</option>
                <option value="Bootcamp">Bootcamp</option>
              </select>
            </div>

            {/* Skill Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Skill Level
              </label>
              <select
                name="skill_level"
                value={formData.skill_level}
                onChange={handleFormChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
            </div>
          </div>

          {/* Interests */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Interests (comma-separated)
            </label>
            <input
              type="text"
              name="interests"
              value={formData.interests}
              onChange={handleFormChange}
              placeholder="e.g., React, Web Development, Machine Learning"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">
              Help us recommend relevant courses
            </p>
          </div>
        </div>

        {/* Learning Preferences Section */}
        <div className="border-b pb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Learning Preferences
          </h2>

          <div className="space-y-4">
            {/* Learning Style */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                How do you prefer to learn?
              </label>
              <select
                name="learning_style"
                value={followUpAnswers.learning_style}
                onChange={handleFollowUpChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="">Select learning style</option>
                <option value="video">Video courses</option>
                <option value="interactive">Interactive tutorials</option>
                <option value="docs">Documentation & reading</option>
                <option value="projects">Project-based learning</option>
                <option value="mixed">Mix of all styles</option>
              </select>
            </div>

            {/* Daily Hours */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                How many hours can you dedicate daily?
              </label>
              <select
                name="daily_hours"
                value={followUpAnswers.daily_hours}
                onChange={handleFollowUpChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="">Select hours per day</option>
                <option value="1">Less than 1 hour</option>
                <option value="1-2">1-2 hours</option>
                <option value="2-4">2-4 hours</option>
                <option value="4+">4+ hours</option>
              </select>
            </div>

            {/* Learning Goal */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                What's your primary goal?
              </label>
              <select
                name="goal"
                value={followUpAnswers.goal}
                onChange={handleFollowUpChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="">Select your goal</option>
                <option value="career-change">Career change</option>
                <option value="advancement">Career advancement</option>
                <option value="skill-building">Skill building</option>
                <option value="hobby">Hobby/Personal interest</option>
                <option value="certification">Get certified</option>
              </select>
            </div>

            {/* Challenges */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                What challenges do you face? (optional)
              </label>
              <textarea
                name="challenges"
                value={followUpAnswers.challenges}
                onChange={handleFollowUpChange}
                placeholder="e.g., Limited time, difficulty with complex topics..."
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 transition-colors"
          >
            {loading ? 'Saving...' : 'Save Profile'}
          </button>

          {profile && (
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="flex-1 bg-gray-300 text-gray-800 font-semibold py-3 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>

        {profile && (
          <p className="text-xs text-gray-500 text-center">
            Last updated: {new Date(profile.updated_at).toLocaleDateString()}
          </p>
        )}
      </form>
    </div>
  )
}
