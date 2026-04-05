# ⚡ Profile System - Quick Reference

## 3-Step Setup

### 1️⃣ Create Database
```sql
-- Copy from: DATABASE_SCHEMA_PROFILES.sql
-- Paste in: Supabase → SQL Editor → Run
```

### 2️⃣ Use in Component
```jsx
import { useUserProfile } from '../hooks/useUserProfile'

const { profile, updateProfile } = useUserProfile()
```

### 3️⃣ Add to Routes
```jsx
import { ProfileForm } from './components/ProfileForm'
<Route path="/profile" element={<ProfileForm />} />
```

---

## Most Common Operations

### Get Profile
```javascript
const { profile, loading } = useUserProfile()

// Access data
console.log(profile.full_name)
console.log(profile.skill_level)
console.log(profile.follow_up_answers)
```

### Update Profile
```javascript
const { updateProfile } = useUserProfile()

await updateProfile({
  full_name: 'New Name',
  skill_level: 'Advanced'
})
```

### Update Form Responses
```javascript
const { updateFollowUp } = useUserProfile()

await updateFollowUp({
  learning_style: 'video',
  daily_hours: '2-4',
  goal: 'career-change'
})
```

### Check if Profile Exists
```javascript
const { hasProfile, profile } = useUserProfile()

if (!hasProfile) {
  return <Redirect to="/complete-profile" />
}
```

---

## Profiles Table Fields

```
user_id              string    (Clerk user ID) ⭐ REQUIRED
full_name            string    (John Doe)
age                  number    (25)
education_level      string    (Bachelor's, High School, etc.)
skill_level          string    (Beginner, Intermediate, Advanced, Expert)
interests            string    (React, Web Dev, AI)
follow_up_answers    JSONB     ({ learning_style: 'video', ... })
created_at           timestamp (auto)
updated_at           timestamp (auto)
```

---

## Hook: `useUserProfile()`

### Returns
```javascript
{
  profile,           // Full profile object or null
  hasProfile,        // Boolean: profile exists?
  loading,           // Boolean: fetching?
  error,             // String: error message or null
  
  saveProfile,       // Async: create/overwrite profile
  updateProfile,     // Async: update specific fields
  updateFollowUp     // Async: update JSON answers
}
```

### Auto Features
✅ Auto-fetches on component mount  
✅ Auto-subscribes to real-time updates  
✅ Auto-cleans up on unmount  
✅ Auto-handles loading/error states  

---

## Files Created

```
supabaseServices.js   (8 new profile functions)
useUserProfile.js     (Custom React hook)
ProfileForm.jsx       (Complete form component)
DATABASE_SCHEMA.sql   (SQL to run in Supabase)
PROFILE_SYSTEM_GUIDE  (Full documentation)
```

---

## Ready? Do This Now

1. Copy `DATABASE_SCHEMA_PROFILES.sql` content
2. Go to Supabase → SQL Editor
3. Paste and click "Run"
4. Import hook in any component: `import { useUserProfile } from '../hooks/useUserProfile'`
5. Done! 🎉

---

## Quick Examples

### Example 1: Show User Name
```jsx
const { profile } = useUserProfile()
return <h1>Welcome, {profile?.full_name}</h1>
```

### Example 2: Update & Save
```jsx
const { updateProfile } = useUserProfile()

const handleClick = async () => {
  await updateProfile({ skill_level: 'Advanced' })
}

return <button onClick={handleClick}>Mark as Advanced</button>
```

### Example 3: Form Input
```jsx
const { updateProfile, loading } = useUserProfile()
const [name, setName] = useState('')

return (
  <>
    <input 
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
    <button 
      onClick={() => updateProfile({ full_name: name })}
      disabled={loading}
    >
      Save
    </button>
  </>
)
```

### Example 4: Redirect if Incomplete
```jsx
const { hasProfile, loading } = useUserProfile()

if (loading) return <Spinner />
if (!hasProfile) return <Navigate to="/complete-profile" />

// Safe to use profile now
return <Dashboard />
```

---

## Debugging Checklist

- ❌ Profile is null?  
  → Check if user is logged in with Clerk  
  → Check if Supabase tables exist  

- ❌ Updates not saving?  
  → Check browser console for errors  
  → Check Supabase logs  
  → Verify user_id is correct type  

- ❌ Real-time not working?  
  → Check WebSocket connection in DevTools  
  → Verify RLS policies allow read/write  

---

## Production Checklist

- [ ] Run SQL schema in prod Supabase
- [ ] Update RLS policies to only allow user's own profile
- [ ] Test with real Clerk auth
- [ ] Add error boundaries around profile components
- [ ] Add loading skeletons
- [ ] Add form validation
- [ ] Monitor Supabase logs for errors

---

## Links

📚 [Full Guide](PROFILE_SYSTEM_GUIDE.md)  
📦 [ProfileForm Component](src/components/ProfileForm.jsx)  
🎣 [useUserProfile Hook](src/hooks/useUserProfile.js)  
🗄️ [Supabase Services](src/lib/supabaseServices.js)  
💾 [SQL Schema](DATABASE_SCHEMA_PROFILES.sql)  

---

**That's it! You're ready to use profiles in your app.** 🚀
