# 👤 User Profile System - Integration Guide

## Overview

You now have a complete user profile system for the sullia (Neurox) project with:
- ✅ Database schema (`profiles` table with RLS)
- ✅ Supabase service functions (CRUD + real-time)
- ✅ Custom React hook (`useUserProfile`)
- ✅ Pre-built form component (`ProfileForm`)

---

## Files Created

| File | Purpose |
|------|---------|
| `DATABASE_SCHEMA_PROFILES.sql` | SQL schema to run in Supabase |
| `src/lib/supabaseServices.js` | Updated with 8 profile functions |
| `src/hooks/useUserProfile.js` | Custom React hook for profile management |
| `src/components/ProfileForm.jsx` | Complete form component |

---

## 🚀 Quick Setup (5 mins)

### Step 1: Create Database Table

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Open **SQL Editor** (left sidebar)
3. Copy content from `DATABASE_SCHEMA_PROFILES.sql`
4. Paste and click **Run**

**What gets created:**
- `profiles` table with 10 fields
- Row Level Security enabled
- Auto-updating `updated_at` timestamp
- Index on `user_id` for fast queries

### Step 2: Use Profile Hook in Your Pages

#### Simple Usage Example

```jsx
import { useUserProfile } from '../hooks/useUserProfile'

export const MyPage = () => {
  const { profile, loading, error, updateProfile } = useUserProfile()

  const handleUpdate = async () => {
    await updateProfile({
      full_name: 'John Doe',
      skill_level: 'Intermediate'
    })
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <h1>Hello, {profile?.full_name || 'User'}</h1>
      <button onClick={handleUpdate}>Update Profile</button>
    </div>
  )
}
```

### Step 3: Add ProfileForm to Your Routes

```jsx
// In App.jsx or your router
import { ProfileForm } from './components/ProfileForm'

<Route path="/profile" element={<ProfileForm />} />
```

---

## 📚 API Reference

### Database Functions (in `supabaseServices.js`)

#### 1. **saveUserExtendedProfile(userId, profileData)**
Creates or updates a complete profile
```javascript
await saveUserExtendedProfile(userId, {
  full_name: 'John Doe',
  age: 25,
  education_level: 'Bachelor\'s',
  interests: 'React, Web Dev',
  skill_level: 'Intermediate',
  follow_up_answers: { learning_style: 'video' }
})
```

#### 2. **getUserExtendedProfile(userId)**
Fetches user's profile
```javascript
const profile = await getUserExtendedProfile(userId)
console.log(profile.full_name)
```

#### 3. **updateUserProfile(userId, updates)**
Updates specific fields (partial update)
```javascript
await updateUserProfile(userId, {
  skill_level: 'Advanced',
  age: 26
})
```

#### 4. **updateFollowUpAnswers(userId, answers)**
Updates the follow-up survey responses (JSONB)
```javascript
await updateFollowUpAnswers(userId, {
  learning_style: 'interactive',
  daily_hours: '2-4',
  goal: 'career-change',
  challenges: 'Limited time'
})
```

#### 5. **deleteUserProfile(userId)**
Deletes a user profile
```javascript
await deleteUserProfile(userId)
```

#### 6. **getAllProfiles()**
Gets all profiles (admin use)
```javascript
const allProfiles = await getAllProfiles()
```

#### 7. **subscribeToUserProfile(userId, callback)**
Real-time updates to profile
```javascript
const subscription = subscribeToUserProfile(userId, (payload) => {
  console.log('Profile updated:', payload)
})

// To unsubscribe:
subscription.unsubscribe()
```

---

## 🎣 React Hook Usage

### `useUserProfile()` Hook

Returns an object with:

```typescript
{
  // Data
  profile: {
    user_id: string,
    full_name: string,
    age: number,
    education_level: string,
    interests: string,
    skill_level: string,
    follow_up_answers: object,
    created_at: timestamp,
    updated_at: timestamp
  },
  hasProfile: boolean,          // Whether profile exists
  
  // Methods
  saveProfile(data) => Promise,  // Create/update entire profile
  updateProfile(updates) => Promise,  // Update specific fields
  updateFollowUp(answers) => Promise, // Update follow-up answers
  
  // State
  loading: boolean,
  error: string | null
}
```

### Example: Check if Profile Exists

```jsx
const { profile, hasProfile, updateProfile, loading } = useUserProfile()

if (loading) return <Spinner />
if (!hasProfile) return <CompleteProfilePrompt />

return <Dashboard profile={profile} />
```

### Example: Auto-save Form

```jsx
const { profile, updateProfile } = useUserProfile()
const [name, setName] = useState('')

const handleBlur = async () => {
  await updateProfile({ full_name: name })
}

return (
  <input 
    value={name} 
    onChange={e => setName(e.target.value)}
    onBlur={handleBlur}
    placeholder="Full name"
  />
)
```

---

## 💾 Database Schema

### profiles Table

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT UNIQUE NOT NULL,           -- Links to Clerk user ID
  full_name TEXT,                          -- User's full name
  age INTEGER,                             -- Age (13-120)
  education_level TEXT,                    -- High School, Bachelor's, etc.
  interests TEXT,                          -- Comma-separated interests
  skill_level TEXT,                        -- Beginner, Intermediate, Advanced, Expert
  follow_up_answers JSONB DEFAULT '{}',   -- Flexible JSON for survey answers
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Field Values (Recommendations)

| Field | Example Values |
|-------|---|
| `education_level` | High School, Bachelor's, Master's, PhD, Self-taught, Bootcamp |
| `skill_level` | Beginner, Intermediate, Advanced, Expert |
| `interests` | React, Web Dev, ML, Python (comma-separated) |
| `follow_up_answers` | `{ "learning_style": "video", "daily_hours": "2-4", "goal": "career-change" }` |

---

## 🔑 Using Follow-Up Answers (JSONB)

The `follow_up_answers` field is a flexible JSON object. You can store anything:

```javascript
// Example structure
const answers = {
  learning_style: 'video',           // How they prefer to learn
  daily_hours: '2-4',                 // Daily time commitment
  goal: 'career-change',              // Learning goal
  challenges: 'Limited time',         // Obstacles they face
  preferred_topics: ['React', 'Node'], // Array of topics
  preferred_languages: ['English'],    // Languages
  timezone: 'EST',                     // For scheduling
  // Add any custom fields you need!
}

await updateFollowUpAnswers(userId, answers)
```

Query JSON in Supabase:
```sql
-- Get all users interested in React
SELECT * FROM profiles 
WHERE follow_up_answers->>'learning_style' = 'video'

-- Filter by array contains
SELECT * FROM profiles 
WHERE follow_up_answers->'preferred_topics' @> '["React"]'
```

---

## 🎨 Component Examples

### Example 1: Profile Card (Read-only)

```jsx
import { useUserProfile } from '../hooks/useUserProfile'

export const ProfileCard = () => {
  const { profile } = useUserProfile()

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold">{profile?.full_name}</h2>
      <p className="text-gray-600">{profile?.education_level}</p>
      <div className="mt-4">
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded">
          {profile?.skill_level}
        </span>
      </div>
    </div>
  )
}
```

### Example 2: Profile Settings

```jsx
import { useUserProfile } from '../hooks/useUserProfile'

export const ProfileSettings = () => {
  const { profile, updateProfile, loading } = useUserProfile()
  const [skillLevel, setSkillLevel] = useState(profile?.skill_level || '')

  const handleSave = async () => {
    await updateProfile({ skill_level: skillLevel })
  }

  return (
    <div>
      <select value={skillLevel} onChange={e => setSkillLevel(e.target.value)}>
        <option>Beginner</option>
        <option>Intermediate</option>
        <option>Advanced</option>
      </select>
      <button onClick={handleSave} disabled={loading}>
        Save Skill Level
      </button>
    </div>
  )
}
```

### Example 3: Profile Completion Status

```jsx
import { useUserProfile } from '../hooks/useUserProfile'

export const ProfileStatus = () => {
  const { profile } = useUserProfile()

  const completionPercentage = profile ? 
    Object.values(profile).filter(v => v).length / 10 * 100 : 0

  return (
    <div className="w-full bg-gray-200 rounded-full h-4">
      <div
        className="bg-green-500 h-4 rounded-full transition-all"
        style={{ width: `${completionPercentage}%` }}
      />
      <p className="text-sm text-gray-600 mt-2">
        {Math.round(completionPercentage)}% complete
      </p>
    </div>
  )
}
```

---

## ⚠️ Common Patterns

### Redirect if No Profile
```jsx
const { profile, hasProfile, loading } = useUserProfile()

if (!loading && !hasProfile) {
  return <Navigate to="/complete-profile" />
}
```

### Profile with Default Values
```jsx
const { profile } = useUserProfile()

const displayName = profile?.full_name || 'Anonymous User'
const skillLevel = profile?.skill_level || 'Beginner'
```

### Validate Before Save
```jsx
const { saveProfile } = useUserProfile()

const handleSave = async (data) => {
  if (!data.full_name) {
    alert('Name is required')
    return
  }
  await saveProfile(data)
}
```

---

## 🔐 Security

### Row Level Security (RLS)
The `profiles` table has RLS enabled. Currently, the policy allows all operations. In production, update to:

```sql
-- Only allow users to view/edit their own profile
CREATE POLICY "Users can view own profile"
ON profiles FOR SELECT USING (
  auth.uid()::text = user_id
);

CREATE POLICY "Users can edit own profile"  
ON profiles FOR UPDATE USING (
  auth.uid()::text = user_id
);
```

---

## 🧪 Testing

### Test with curl
```bash
# Test if table exists
curl https://cmjbmtvalwvkaqruxbbe.supabase.co/rest/v1/profiles \
  -H "apikey: YOUR_ANON_KEY" \
  -H "Authorization: Bearer YOUR_JWT"
```

### Test in Console
```javascript
import { getUserExtendedProfile } from './lib/supabaseServices'

// Test fetching
const profile = await getUserExtendedProfile('user_123')
console.log(profile)
```

---

## 📱 UI Integration Checklist

- [ ] Run `DATABASE_SCHEMA_PROFILES.sql` in Supabase
- [ ] Import `useUserProfile` hook in pages
- [ ] Add `ProfileForm` component to a route
- [ ] Display profile in navbar/user menu
- [ ] Show profile completion status
- [ ] Redirect new users to profile completion
- [ ] Update assessment logic to use profile data
- [ ] Display skill level in recommendations

---

## 🚀 Next Steps

1. **Run the SQL schema** in Supabase
2. **Test the hook** with a simple page
3. **Add ProfileForm** to onboarding flow
4. **Update assessments** to use profile data
5. **Integrate** skill_level into recommendations
6. **Monitor** with Supabase logging

---

## 📞 Troubleshooting

### Profile not saving?
- ✅ Check Supabase tables exist
- ✅ Verify user_id is being passed
- ✅ Check Clerk is authenticated
- ✅ Look at network tab for errors

### Real-time updates not working?
- ✅ Ensure subscription is created
- ✅ Check browser console for socket errors
- ✅ Verify RLS policies aren't blocking

### Hook returns null?
- ✅ Verify user is authenticated via Clerk
- ✅ Check if profile exists in database
- ✅ Wait for loading to finish

---

## 📖 Full Documentation Links

- [Supabase Docs](https://supabase.com/docs)
- [Clerk Docs](https://clerk.com/docs)
- [React Hooks](https://react.dev/reference/react/hooks)
- [Tailwind Classes](https://tailwindcss.com)

---

**Ready to integrate? Start with Step 1 above! 🚀**
