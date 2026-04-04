import { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import * as supabaseServices from '../lib/supabaseServices'

export const useUserProfile = () => {
  const { user } = useUser()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!user) {
      setLoading(false)
      return
    }

    const fetchProfile = async () => {
      try {
        const data = await supabaseServices.getUserProfile(user.id)
        setProfile(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [user])

  const updateProfile = async (profileData) => {
    try {
      const updated = await supabaseServices.saveUserProfile(user.id, profileData)
      setProfile(updated)
      return updated
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  return { profile, loading, error, updateProfile }
}

export const useAssessment = () => {
  const { user } = useUser()
  const [assessment, setAssessment] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!user) {
      setLoading(false)
      return
    }

    const fetchAssessment = async () => {
      try {
        const data = await supabaseServices.getAssessment(user.id)
        setAssessment(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchAssessment()
  }, [user])

  const saveAssessment = async (assessmentData) => {
    try {
      const result = await supabaseServices.saveAssessment(user.id, assessmentData)
      setAssessment(result[0])
      return result[0]
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  return { assessment, loading, error, saveAssessment }
}

export const useModuleProgress = (moduleId) => {
  const { user } = useUser()
  const [progress, setProgress] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!user || !moduleId) {
      setLoading(false)
      return
    }

    const fetchProgress = async () => {
      try {
        const data = await supabaseServices.getModuleProgress(user.id, moduleId)
        setProgress(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProgress()
  }, [user, moduleId])

  const updateProgress = async (progressData) => {
    try {
      const result = await supabaseServices.saveModuleProgress(user.id, moduleId, progressData)
      setProgress(result[0])
      return result[0]
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  return { progress, loading, error, updateProgress }
}

export const useLearningStats = () => {
  const { user } = useUser()
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!user) {
      setLoading(false)
      return
    }

    const fetchStats = async () => {
      try {
        const data = await supabaseServices.getLearningStats(user.id)
        setStats(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [user])

  const updateStats = async (statsData) => {
    try {
      const result = await supabaseServices.updateLearningStats(user.id, statsData)
      setStats(result[0])
      return result[0]
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  return { stats, loading, error, updateStats }
}

export const useTestResults = () => {
  const { user } = useUser()
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!user) {
      setLoading(false)
      return
    }

    const fetchResults = async () => {
      try {
        const data = await supabaseServices.getTestResults(user.id)
        setResults(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [user])

  const saveTestResult = async (testData) => {
    try {
      const result = await supabaseServices.saveTestResult(user.id, testData)
      setResults([result[0], ...results])
      return result[0]
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  return { results, loading, error, saveTestResult }
}
