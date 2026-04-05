import { useState, useEffect, useCallback } from 'react'
import { useUser } from '@clerk/clerk-react'
import {
  saveUserExtendedProfile,
  getUserExtendedProfile,
  updateUserProfile,
  updateFollowUpAnswers,
  subscribeToUserProfile,
} from '../lib/supabaseServices'

/**
 * Custom hook for managing user profile
 * @returns {object} Profile state, methods, and loading/error states
 */
export const useUserProfile = () => {
  const { user } = useUser()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [hasProfile, setHasProfile] = useState(false)

  const userId = user?.id

  // Fetch profile on mount
  useEffect(() => {
    if (!userId) return

    const fetchProfile = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await getUserExtendedProfile(userId)
        setProfile(data)
        setHasProfile(!!data)
      } catch (err) {
        console.error('Error fetching profile:', err)
        setError(err.message)
        setHasProfile(false)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()

    // Subscribe to real-time updates
    const subscription = subscribeToUserProfile(userId, (payload) => {
      console.log('Profile updated:', payload)
      if (payload.eventType === 'DELETE') {
        setProfile(null)
        setHasProfile(false)
      } else {
        setProfile(payload.new)
        setHasProfile(true)
      }
    })

    return () => {
      subscription.unsubscribe?.()
    }
  }, [userId])

  // Create or update profile
  const saveProfile = useCallback(
    async (profileData) => {
      if (!userId) throw new Error('User not authenticated')

      try {
        setLoading(true)
        setError(null)
        const data = await saveUserExtendedProfile(userId, profileData)
        setProfile(data)
        setHasProfile(true)
        return data
      } catch (err) {
        console.error('Error saving profile:', err)
        setError(err.message)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [userId]
  )

  // Update specific fields
  const updateProfile = useCallback(
    async (updates) => {
      if (!userId) throw new Error('User not authenticated')

      try {
        setLoading(true)
        setError(null)
        const data = await updateUserProfile(userId, updates)
        setProfile(data)
        return data
      } catch (err) {
        console.error('Error updating profile:', err)
        setError(err.message)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [userId]
  )

  // Update follow-up answers
  const updateFollowUp = useCallback(
    async (answers) => {
      if (!userId) throw new Error('User not authenticated')

      try {
        setLoading(true)
        setError(null)
        const data = await updateFollowUpAnswers(userId, answers)
        setProfile(data)
        return data
      } catch (err) {
        console.error('Error updating follow-up answers:', err)
        setError(err.message)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [userId]
  )

  return {
    // Data
    profile,
    hasProfile,
    // Methods
    saveProfile,
    updateProfile,
    updateFollowUp,
    // State
    loading,
    error,
  }
}
