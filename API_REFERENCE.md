# Neurox Supabase API Reference

Complete API reference for Supabase integration in Neurox.

## 📚 Table of Contents
1. [Service Functions](#service-functions)
2. [React Hooks](#react-hooks)
3. [Type Definitions](#type-definitions)
4. [Error Handling](#error-handling)
5. [Examples](#examples)

---

## Service Functions

Import from `src/lib/supabaseServices.js`

### User Profile Operations

#### `saveUserProfile(userId, profileData)`
Save or update user profile.

**Parameters:**
- `userId` (string, UUID): User ID from Clerk
- `profileData` (object): Profile data
  - `email` (string, optional)
  - `first_name` (string, optional)
  - `last_name` (string, optional)
  - `domain` (string, optional): Learning domain
  - `current_level` (string, optional): Skill level
  - Additional custom properties...

**Returns:** Promise<ProfileData>

**Example:**
```javascript
const profile = await saveUserProfile(userId, {
  first_name: 'John',
  last_name: 'Doe',
  domain: 'AI',
  current_level: 'beginner'
})
```

**Error Handling:**
```javascript
try {
  await saveUserProfile(userId, data)
} catch (error) {
  console.error('Failed to save profile:', error.message)
}
```

---

#### `getUserProfile(userId)`
Fetch user profile.

**Parameters:**
- `userId` (string, UUID): User ID from Clerk

**Returns:** Promise<ProfileData>

**Example:**
```javascript
const profile = await getUserProfile(userId)
console.log(profile.first_name)
```

---

### Assessment Operations

#### `saveAssessment(userId, assessmentData)`
Save pre-assessment test results.

**Parameters:**
- `userId` (string, UUID): User ID
- `assessmentData` (object):
  - `score` (number): Score obtained
  - `total_questions` (number): Total questions
  - `domain` (string): Learning domain (e.g., 'AI', 'Web Dev')
  - `answers` (object): User answers object

**Returns:** Promise<AssessmentData[]>

**Example:**
```javascript
const assessment = await saveAssessment(userId, {
  score: 85,
  total_questions: 10,
  domain: 'AI',
  answers: { 0: 'A', 1: 'B', ... }
})
```

---

#### `getAssessment(userId)`
Fetch latest assessment.

**Parameters:**
- `userId` (string, UUID): User ID

**Returns:** Promise<AssessmentData>

**Example:**
```javascript
const latestAssessment = await getAssessment(userId)
console.log(`Score: ${latestAssessment.score}/${latestAssessment.total_questions}`)
```

---

### Module Progress Operations

#### `saveModuleProgress(userId, moduleId, progressData)`
Save or update module progress.

**Parameters:**
- `userId` (string, UUID): User ID
- `moduleId` (number): Module ID
- `progressData` (object):
  - `status` (string, optional): 'not_started' | 'in_progress' | 'completed'
  - `watched` (boolean, optional): Whether video was watched
  - `completed` (boolean, optional): Whether module is completed
  - `started_at` (timestamp, optional)
  - `completed_at` (timestamp, optional)

**Returns:** Promise<ModuleProgress[]>

**Example:**
```javascript
const progress = await saveModuleProgress(userId, 1, {
  watched: true,
  status: 'in_progress'
})
```

---

#### `getModuleProgress(userId, moduleId)`
Fetch module progress.

**Parameters:**
- `userId` (string, UUID): User ID
- `moduleId` (number): Module ID

**Returns:** Promise<ModuleProgress | null>

**Example:**
```javascript
const progress = await getModuleProgress(userId, 1)
if (progress?.completed) {
  console.log('Module completed!')
}
```

---

### Test/Quiz Operations

#### `saveTestResult(userId, testData)`
Save module test results.

**Parameters:**
- `userId` (string, UUID): User ID
- `testData` (object):
  - `module_id` (number): Module ID
  - `score` (number): Score achieved
  - `total_questions` (number): Total questions
  - `passed` (boolean): Whether test was passed
  - `answers` (object, optional): User answers

**Returns:** Promise<TestResult[]>

**Example:**
```javascript
const result = await saveTestResult(userId, {
  module_id: 1,
  score: 8,
  total_questions: 10,
  passed: true
})
```

---

#### `getTestResults(userId)`
Fetch all test results for user.

**Parameters:**
- `userId` (string, UUID): User ID

**Returns:** Promise<TestResult[]>

**Example:**
```javascript
const results = await getTestResults(userId)
const passedTests = results.filter(r => r.passed)
```

---

### Learning Stats Operations

#### `getLearningStats(userId)`
Fetch user learning statistics.

**Parameters:**
- `userId` (string, UUID): User ID

**Returns:** Promise<LearningStats | null>

**Example:**
```javascript
const stats = await getLearningStats(userId)
console.log(`Modules completed: ${stats?.modules_completed}`)
```

---

#### `updateLearningStats(userId, stats)`
Update learning statistics.

**Parameters:**
- `userId` (string, UUID): User ID
- `stats` (object):
  - `total_hours_learned` (number, optional)
  - `modules_completed` (number, optional)
  - `current_streak` (number, optional)
  - `last_opened` (timestamp, optional)

**Returns:** Promise<LearningStats[]>

**Example:**
```javascript
const updated = await updateLearningStats(userId, {
  modules_completed: 5,
  current_streak: 10
})
```

---

### Subscription Operations

#### `subscribeToModuleProgress(userId, moduleId, callback)`
Real-time subscription to module progress changes.

**Parameters:**
- `userId` (string, UUID): User ID
- `moduleId` (number): Module ID
- `callback` (function): Called on changes
  - Receives: `{ eventType: 'INSERT|UPDATE|DELETE', new: {...}, old: {...} }`

**Returns:** RealtimeSubscription

**Example:**
```javascript
const sub = subscribeToModuleProgress(userId, 1, (payload) => {
  console.log('Progress updated:', payload.new)
})

// Cleanup
sub.unsubscribe()
```

---

#### `subscribeToUserStats(userId, callback)`
Real-time subscription to learning stats changes.

**Parameters:**
- `userId` (string, UUID): User ID
- `callback` (function): Called on changes

**Returns:** RealtimeSubscription

**Example:**
```javascript
const sub = subscribeToUserStats(userId, (payload) => {
  if (payload.eventType === 'UPDATE') {
    console.log('Stats changed!')
  }
})
```

---

## React Hooks

Import from `src/hooks/useSupabase.js`

### `useUserProfile()`
Manage user profile data.

**Returns:**
```javascript
{
  profile: ProfileData | null,
  loading: boolean,
  error: string | null,
  updateProfile: (data) => Promise<ProfileData>
}
```

**Example:**
```javascript
const { profile, loading, error, updateProfile } = useUserProfile()

const handleUpdateProfile = async () => {
  await updateProfile({ first_name: 'Jane' })
}
```

---

### `useAssessment()`
Manage assessment data.

**Returns:**
```javascript
{
  assessment: AssessmentData | null,
  loading: boolean,
  error: string | null,
  saveAssessment: (data) => Promise<AssessmentData>
}
```

---

### `useModuleProgress(moduleId)`
Manage module progress for specific module.

**Parameters:**
- `moduleId` (number): Module ID

**Returns:**
```javascript
{
  progress: ModuleProgress | null,
  loading: boolean,
  error: string | null,
  updateProgress: (data) => Promise<ModuleProgress>
}
```

---

### `useLearningStats()`
Manage learning statistics.

**Returns:**
```javascript
{
  stats: LearningStats | null,
  loading: boolean,
  error: string | null,
  updateStats: (data) => Promise<LearningStats>
}
```

---

### `useTestResults()`
Manage test results.

**Returns:**
```javascript
{
  results: TestResult[],
  loading: boolean,
  error: string | null,
  saveTestResult: (data) => Promise<TestResult>
}
```

---

## Type Definitions

```typescript
// User Profile
interface ProfileData {
  id: string
  email: string
  first_name: string
  last_name: string
  domain: string
  current_level: string
  created_at: timestamp
  updated_at: timestamp
}

// Assessment
interface AssessmentData {
  id: string
  user_id: string
  score: number
  total_questions: number
  domain: string
  answers: Record<number, string>
  created_at: timestamp
}

// Module Progress
interface ModuleProgress {
  id: string
  user_id: string
  module_id: number
  status: 'not_started' | 'in_progress' | 'completed'
  watched: boolean
  completed: boolean
  started_at: timestamp | null
  completed_at: timestamp | null
  updated_at: timestamp
}

// Test Result
interface TestResult {
  id: string
  user_id: string
  module_id: number
  score: number
  total_questions: number
  passed: boolean
  answers: Record<number, string>
  created_at: timestamp
}

// Learning Stats
interface LearningStats {
  id: string
  user_id: string
  total_hours_learned: number
  modules_completed: number
  current_streak: number
  last_opened: timestamp | null
  updated_at: timestamp
}
```

---

## Error Handling

### Common Errors

**RLS Policy Violation**
```javascript
// Error: "new row violates row-level security policy"
// Solution: Check that auth.uid() matches user_id
// Verify RLS policies in Supabase Dashboard
```

**Foreign Key Error**
```javascript
// Error: "violates foreign key constraint"
// Solution: Ensure user exists in 'users' table before inserting related data
```

**Connection Error**
```javascript
// Error: "Failed to fetch"
// Solution: Check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
// Verify network connectivity
```

### Global Error Handler

```javascript
import * as supabaseServices from '../lib/supabaseServices'

const handleSupabaseError = (error) => {
  if (error.code === 'PGRST116') {
    return 'Record not found'
  }
  if (error.message.includes('RLS')) {
    return 'Access denied'
  }
  return error.message
}

try {
  await supabaseServices.getUserProfile(userId)
} catch (error) {
  const message = handleSupabaseError(error)
  console.error(message)
}
```

---

## Examples

### Complete User Flow

```jsx
import { useUser } from '@clerk/clerk-react'
import { 
  useUserProfile, 
  useAssessment, 
  useLearningStats 
} from '../hooks/useSupabase'

export default function UserDashboard() {
  const { user } = useUser()
  const { profile, updateProfile } = useUserProfile()
  const { assessment } = useAssessment()
  const { stats, updateStats } = useLearningStats()

  const handleCompleteModule = async () => {
    await updateStats({
      modules_completed: (stats?.modules_completed || 0) + 1
    })
  }

  return (
    <div>
      <h1>Welcome, {profile?.first_name}</h1>
      <p>Modules: {stats?.modules_completed}</p>
      <button onClick={handleCompleteModule}>
        Mark Module Complete
      </button>
    </div>
  )
}
```

### Real-time Module Progress

```jsx
import { useEffect } from 'react'
import { subscribeToModuleProgress } from '../lib/supabaseServices'

export default function ModuleProgressTracker() {
  const userId = 'user-123'
  const moduleId = 1

  useEffect(() => {
    const subscription = subscribeToModuleProgress(
      userId,
      moduleId,
      (payload) => {
        console.log('Module updated:', payload.new)
      }
    )

    return () => subscription.unsubscribe()
  }, [userId, moduleId])

  return <div>Listening for updates...</div>
}
```

### Batch Operations

```javascript
import * as supabaseServices from '../lib/supabaseServices'

async function saveCompleteAssessment(userId, assessmentData) {
  try {
    // Save assessment
    const assessment = await supabaseServices.saveAssessment(
      userId, 
      assessmentData
    )

    // Update learning stats
    await supabaseServices.updateLearningStats(userId, {
      last_opened: new Date()
    })

    // Initialize module progress
    for (let moduleId = 1; moduleId <= 6; moduleId++) {
      await supabaseServices.saveModuleProgress(userId, moduleId, {
        status: 'not_started'
      })
    }

    return assessment
  } catch (error) {
    console.error('Failed to save assessment:', error)
    throw error
  }
}
```

---

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [Realtime Guide](https://supabase.com/docs/guides/realtime)
- [RLS Policies](https://supabase.com/docs/guides/auth/row-level-security)
