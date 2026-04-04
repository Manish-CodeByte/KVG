import { supabase } from './supabase'

// ============================================
// USER & PROFILE OPERATIONS
// ============================================

export const saveUserProfile = async (userId, profileData) => {
  const { data, error } = await supabase
    .from('users')
    .upsert(
      {
        id: userId,
        ...profileData,
        updated_at: new Date(),
      },
      { onConflict: 'id' }
    )
  
  if (error) throw error
  return data
}

export const getUserProfile = async (userId) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()
  
  if (error) throw error
  return data
}

// ============================================
// ASSESSMENT OPERATIONS
// ============================================

export const saveAssessment = async (userId, assessmentData) => {
  const { data, error } = await supabase
    .from('assessments')
    .insert({
      user_id: userId,
      ...assessmentData,
      created_at: new Date(),
    })
  
  if (error) throw error
  return data
}

export const getAssessment = async (userId) => {
  const { data, error } = await supabase
    .from('assessments')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()
  
  if (error) throw error
  return data
}

// ============================================
// ROADMAP & MODULES OPERATIONS
// ============================================

export const getUserRoadmap = async (userId) => {
  const { data, error } = await supabase
    .from('roadmaps')
    .select('*')
    .eq('user_id', userId)
  
  if (error) throw error
  return data
}

export const saveModuleProgress = async (userId, moduleId, progressData) => {
  const { data, error } = await supabase
    .from('module_progress')
    .upsert(
      {
        user_id: userId,
        module_id: moduleId,
        ...progressData,
        updated_at: new Date(),
      },
      { onConflict: ['user_id', 'module_id'] }
    )
  
  if (error) throw error
  return data
}

export const getModuleProgress = async (userId, moduleId) => {
  const { data, error } = await supabase
    .from('module_progress')
    .select('*')
    .eq('user_id', userId)
    .eq('module_id', moduleId)
    .single()
  
  if (error && error.code !== 'PGRST116') throw error
  return data
}

// ============================================
// TEST/QUIZ OPERATIONS
// ============================================

export const saveTestResult = async (userId, testData) => {
  const { data, error } = await supabase
    .from('test_results')
    .insert({
      user_id: userId,
      ...testData,
      created_at: new Date(),
    })
  
  if (error) throw error
  return data
}

export const getTestResults = async (userId) => {
  const { data, error } = await supabase
    .from('test_results')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

// ============================================
// LEARNING STATS OPERATIONS
// ============================================

export const getLearningStats = async (userId) => {
  const { data, error } = await supabase
    .from('learning_stats')
    .select('*')
    .eq('user_id', userId)
    .single()
  
  if (error && error.code !== 'PGRST116') throw error
  return data
}

export const updateLearningStats = async (userId, stats) => {
  const { data, error } = await supabase
    .from('learning_stats')
    .upsert(
      {
        user_id: userId,
        ...stats,
        updated_at: new Date(),
      },
      { onConflict: 'user_id' }
    )
  
  if (error) throw error
  return data
}

// ============================================
// REALTIME SUBSCRIPTIONS
// ============================================

export const subscribeToModuleProgress = (userId, moduleId, callback) => {
  const subscription = supabase
    .from(`module_progress:user_id=eq.${userId},module_id=eq.${moduleId}`)
    .on('*', (payload) => {
      callback(payload)
    })
    .subscribe()
  
  return subscription
}

export const subscribeToUserStats = (userId, callback) => {
  const subscription = supabase
    .from(`learning_stats:user_id=eq.${userId}`)
    .on('*', (payload) => {
      callback(payload)
    })
    .subscribe()
  
  return subscription
}
