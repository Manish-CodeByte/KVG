/**
 * Example: How to integrate Supabase with existing pages
 * 
 * This file demonstrates how to use Supabase hooks and services
 * in your Neurox pages for persistence and real-time updates.
 */

// ============================================
// EXAMPLE 1: Dashboard with Supabase Stats
// ============================================

import { useEffect } from 'react'
import { useLearningStats } from '../hooks/useSupabase'

/*
export default function DashboardPage() {
  const { stats, loading, error, updateStats } = useLearningStats()

  useEffect(() => {
    // Manually update stats when needed
    updateStats({
      total_hours_learned: 45,
      modules_completed: 4,
      current_streak: 7,
    })
  }, [])

  if (loading) return <div>Loading stats...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <h1>Hours Learned: {stats?.total_hours_learned}</h1>
      <p>Modules: {stats?.modules_completed}</p>
    </div>
  )
}
*/

// ============================================
// EXAMPLE 2: Test Page with Supabase Results
// ============================================

import { useTestResults } from '../hooks/useSupabase'

/*
export default function TestPage() {
  const { results, saveTestResult } = useTestResults()

  const handleSubmitTest = async (score, totalQuestions) => {
    await saveTestResult({
      module_id: 1,
      score: score,
      total_questions: totalQuestions,
      passed: score >= totalQuestions * 0.7,
      answers: {},
    })
  }

  return (
    <div>
      <h1>Your Test Results</h1>
      {results.map(result => (
        <div key={result.id}>
          Score: {result.score}/{result.total_questions}
          Status: {result.passed ? 'Passed' : 'Failed'}
        </div>
      ))}
    </div>
  )
}
*/

// ============================================
// EXAMPLE 3: Module Learning with Progress
// ============================================

import { useModuleProgress } from '../hooks/useSupabase'

/*
export default function LearningPage() {
  const { id } = useParams()
  const { progress, updateProgress } = useModuleProgress(id)

  const handleMarkWatched = async () => {
    await updateProgress({
      watched: true,
      status: 'in_progress',
    })
  }

  return (
    <div>
      <video onEnded={handleMarkWatched} />
      <p>Watched: {progress?.watched ? 'Yes' : 'No'}</p>
    </div>
  )
}
*/

// ============================================
// EXAMPLE 4: Real-Time Subscriptions
// ============================================

import { subscribeToUserStats } from '../lib/supabaseServices'

/*
export default function StatsSubscriber() {
  const { user } = useUser()

  useEffect(() => {
    if (!user) return

    const subscription = subscribeToUserStats(user.id, (payload) => {
      console.log('Stats updated in real-time:', payload.new)
      // Update local state with new data
    })

    return () => subscription.unsubscribe()
  }, [user])

  return <div>Listening for real-time updates...</div>
}
*/

// ============================================
// EXAMPLE 5: Using Services Directly
// ============================================

import { supabase } from '../lib/supabase'
import * as supabaseServices from '../lib/supabaseServices'

/*
const performDatabaseOperation = async (userId) => {
  // Save assessment
  const assessment = await supabaseServices.saveAssessment(userId, {
    domain: 'AI',
    score: 85,
    total_questions: 10,
  })

  // Get assessment
  const latestAssessment = await supabaseServices.getAssessment(userId)

  // Update module progress
  await supabaseServices.saveModuleProgress(userId, 1, {
    watched: true,
    completed: true,
  })

  // Get test results
  const results = await supabaseServices.getTestResults(userId)
}
*/

// ============================================
// EXAMPLE 6: Custom Query with Supabase Client
// ============================================

/*
const customQuery = async () => {
  // Get all modules for a user
  const { data, error } = await supabase
    .from('roadmaps')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching roadmaps:', error)
  } else {
    console.log('User roadmaps:', data)
  }
}
*/

export default function IntegrationExamples() {
  return (
    <div>
      <h1>Supabase Integration Examples</h1>
      <p>See comments in this file for implementation examples.</p>
      <p>
        To use these examples, uncomment the code and replace with your actual component.
      </p>
    </div>
  )
}
