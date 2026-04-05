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

// ============================================
// PROFILE OPERATIONS
// ============================================

/**
 * Create or update a user profile
 * @param {string} userId - Clerk user ID
 * @param {object} profileData - Profile information
 * @returns {object} Saved profile data
 */
export const saveUserExtendedProfile = async (userId, profileData) => {
  const { data, error } = await supabase
    .from('profiles')
    .upsert(
      {
        user_id: userId,
        ...profileData,
        updated_at: new Date(),
      },
      { onConflict: 'user_id' }
    )
    .select()
  
  if (error) throw error
  return data?.[0]
}

/**
 * Get user profile details
 * @param {string} userId - Clerk user ID
 * @returns {object} User profile data
 */
export const getUserExtendedProfile = async (userId) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .single()
  
  if (error && error.code !== 'PGRST116') throw error
  return data
}

/**
 * Update specific profile fields
 * @param {string} userId - Clerk user ID
 * @param {object} updates - Fields to update
 * @returns {object} Updated profile data
 */
export const updateUserProfile = async (userId, updates) => {
  const { data, error } = await supabase
    .from('profiles')
    .update({
      ...updates,
      updated_at: new Date(),
    })
    .eq('user_id', userId)
    .select()
  
  if (error) throw error
  return data?.[0]
}

/**
 * Update follow-up assessment answers (stores as JSONB)
 * @param {string} userId - Clerk user ID
 * @param {object} answers - Follow-up survey answers
 * @returns {object} Updated profile data
 */
export const updateFollowUpAnswers = async (userId, answers) => {
  const { data, error } = await supabase
    .from('profiles')
    .update({
      follow_up_answers: answers,
      updated_at: new Date(),
    })
    .eq('user_id', userId)
    .select()
  
  if (error) throw error
  return data?.[0]
}

/**
 * Delete user profile
 * @param {string} userId - Clerk user ID
 * @returns {boolean} Success status
 */
export const deleteUserProfile = async (userId) => {
  const { error } = await supabase
    .from('profiles')
    .delete()
    .eq('user_id', userId)
  
  if (error) throw error
  return true
}

/**
 * Get all profiles (admin use only)
 * @returns {array} All profiles
 */
export const getAllProfiles = async () => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

/**
 * Subscribe to profile changes in real-time
 * @param {string} userId - Clerk user ID
 * @param {function} callback - Function to call on data change
 * @returns {object} Subscription object
 */
export const subscribeToUserProfile = (userId, callback) => {
  const subscription = supabase
    .from(`profiles:user_id=eq.${userId}`)
    .on('*', (payload) => {
      callback(payload)
    })
    .subscribe()
  
  return subscription
}
