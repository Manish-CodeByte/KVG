# Supabase Integration Quick Reference

## Setup Summary

✅ **Installed**: `@supabase/supabase-js`  
✅ **Added**: Supabase credentials to `.env.local`  
✅ **Created**: Supabase client initialization  
✅ **Created**: Service layer for database operations  
✅ **Created**: Custom React hooks for easy access  
✅ **Created**: Comprehensive setup guide  

## Environment Variables

```env
VITE_SUPABASE_URL=https://cmjbmtvalwvkaqruxbbe.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## File Locations

| File | Purpose |
|------|---------|
| `src/lib/supabase.js` | Supabase client initialization |
| `src/lib/supabaseServices.js` | All database service functions |
| `src/hooks/useSupabase.js` | Custom React hooks |
| `src/examples/SUPABASE_EXAMPLES.jsx` | Usage examples |
| `SUPABASE_SETUP.md` | Complete setup guide |

## Available Hooks

```javascript
import {
  useUserProfile,
  useAssessment,
  useModuleProgress,
  useLearningStats,
  useTestResults
} from '../hooks/useSupabase'
```

### Hook Usage Pattern

```jsx
const { data, loading, error, updateFunction } = useHookName()

// Loading
if (loading) return <div>Loading...</div>

// Error
if (error) return <div>Error: {error}</div>

// Render data
return <div>{data?.property}</div>
```

## Available Services

```javascript
import * as supabaseServices from '../lib/supabaseServices'

// User operations
await supabaseServices.saveUserProfile(userId, data)
await supabaseServices.getUserProfile(userId)

// Assessment operations
await supabaseServices.saveAssessment(userId, data)
await supabaseServices.getAssessment(userId)

// Module progress
await supabaseServices.saveModuleProgress(userId, moduleId, data)
await supabaseServices.getModuleProgress(userId, moduleId)

// Test results
await supabaseServices.saveTestResult(userId, data)
await supabaseServices.getTestResults(userId)

// Learning stats
await supabaseServices.getLearningStats(userId)
await supabaseServices.updateLearningStats(userId, data)

// Subscriptions
subscribeToUserStats(userId, callback)
subscribeToModuleProgress(userId, moduleId, callback)
```

## Next Steps

1. **Complete Supabase Setup**
   - Follow [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)
   - Create database tables
   - Enable Row Level Security

2. **Integrate with Pages**
   - See [SUPABASE_EXAMPLES.jsx](./src/examples/SUPABASE_EXAMPLES.jsx)
   - Uncomment and adapt examples
   - Test with your Supabase project

3. **Test Connectivity**
   - Browser console: `import { supabase } from './src/lib/supabase'`
   - Run: `await supabase.from('users').select('*')`
   - Should return empty array if no data yet

4. **Enable Real-Time** (optional)
   - Go to Supabase Dashboard
   - Configure real-time for tables
   - Use subscription hooks in components

## Common Use Cases

### Save User Progress
```jsx
const { updateProgress } = useModuleProgress(moduleId)

const handleComplete = async () => {
  await updateProgress({
    watched: true,
    completed: true,
    status: 'completed'
  })
}
```

### Get Learning Statistics
```jsx
const { stats, updateStats } = useLearningStats()

const handleUpdateStats = async () => {
  await updateStats({
    modules_completed: 4,
    total_hours_learned: 12
  })
}
```

### Submit Test Results
```jsx
const { saveTestResult } = useTestResults()

const handleSubmitTest = async (score, total) => {
  await saveTestResult({
    module_id: 1,
    score: score,
    total_questions: total,
    passed: score >= total * 0.7
  })
}
```

## Troubleshooting

**Error: "VITE_SUPABASE_URL not set"**
- Check `.env.local` has correct URL
- Restart dev server: `npm run dev`

**Error: "RLS policy violated"**
- Verify user is authenticated via Clerk
- Check RLS policies in Supabase Dashboard
- Ensure auth.uid() matches user ID

**Data not saving**
- Check Supabase SQL Editor for table structure
- Verify RLS policies allow INSERT
- Check browser console for detailed errors

**Real-time not working**
- Enable real-time in Supabase table settings
- Verify table is selected for replication
- Check for subscription errors in console

## Resources

- 📚 [Supabase Docs](https://supabase.com/docs)
- 🔐 [Auth Setup](https://supabase.com/docs/guides/auth/clerk)
- 🔄 [Real-time](https://supabase.com/docs/guides/realtime)
- 🛡️ [RLS Policies](https://supabase.com/docs/guides/auth/row-level-security)

## API Credentials Status

✅ `VITE_SUPABASE_URL`: Configured  
✅ `VITE_SUPABASE_ANON_KEY`: Configured  
✅ `VITE_CLERK_PUBLISHABLE_KEY`: Configured  
✅ `CLERK_SECRET_KEY`: Configured  

## Dev Server

🚀 Running at: http://localhost:3000/

Changes to `.env.local` automatically reload the dev server.
