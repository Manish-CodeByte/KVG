# 🗄️ Supabase Setup Guide for Neurox

This guide walks you through setting up Supabase for the Neurox learning platform.

## Prerequisites

- Supabase account (free at [supabase.com](https://supabase.com))
- Node.js project with Neurox installed
- Environment variables file

## 1️⃣ Create a Supabase Project

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Click **"New Project"**
3. Enter:
   - **Name**: `neurox` (or your preference)
   - **Password**: Create a strong password
   - **Region**: Choose closest to your users
4. Click **"Create new project"**
5. Wait 2-3 minutes for initialization

## 2️⃣ Get Your API Credentials

1. Go to **Project Settings** → **API**
2. Copy:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **Anon Key** → `VITE_SUPABASE_ANON_KEY`

3. Add to `.env.local`:
```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

## 3️⃣ Create Database Tables

Go to **SQL Editor** and run these queries:

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email TEXT,
  first_name TEXT,
  last_name TEXT,
  domain TEXT,
  current_level TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Index for faster queries
CREATE INDEX idx_users_email ON users(email);
```

### Assessments Table
```sql
CREATE TABLE assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  score INTEGER,
  total_questions INTEGER,
  domain TEXT,
  answers JSONB,
  created_at TIMESTAMP DEFAULT now()
);

CREATE INDEX idx_assessments_user_id ON assessments(user_id);
```

### Module Progress Table
```sql
CREATE TABLE module_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  module_id INTEGER NOT NULL,
  status TEXT DEFAULT 'not_started',
  watched BOOLEAN DEFAULT false,
  completed BOOLEAN DEFAULT false,
  started_at TIMESTAMP,
  completed_at TIMESTAMP,
  updated_at TIMESTAMP DEFAULT now(),
  UNIQUE(user_id, module_id)
);

CREATE INDEX idx_module_progress_user_id ON module_progress(user_id);
```

### Test Results Table
```sql
CREATE TABLE test_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  module_id INTEGER NOT NULL,
  score INTEGER,
  total_questions INTEGER,
  passed BOOLEAN,
  answers JSONB,
  created_at TIMESTAMP DEFAULT now()
);

CREATE INDEX idx_test_results_user_id ON test_results(user_id);
CREATE INDEX idx_test_results_module ON test_results(module_id);
```

### Learning Stats Table
```sql
CREATE TABLE learning_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  total_hours_learned DECIMAL DEFAULT 0,
  modules_completed INTEGER DEFAULT 0,
  current_streak INTEGER DEFAULT 0,
  last_opened TIMESTAMP,
  updated_at TIMESTAMP DEFAULT now()
);

CREATE INDEX idx_learning_stats_user ON learning_stats(user_id);
```

### Roadmaps Table
```sql
CREATE TABLE roadmaps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  module_id INTEGER NOT NULL,
  status TEXT,
  difficulty TEXT,
  created_at TIMESTAMP DEFAULT now(),
  UNIQUE(user_id, module_id)
);

CREATE INDEX idx_roadmaps_user ON roadmaps(user_id);
```

## 4️⃣ Enable Row Level Security (RLS)

### Enable RLS on all tables
```sql
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE module_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE roadmaps ENABLE ROW LEVEL SECURITY;
```

### Create RLS Policies

**Users Table**
```sql
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);
```

**Assessments Table**
```sql
CREATE POLICY "Users can view own assessments"
  ON assessments FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own assessments"
  ON assessments FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

**Module Progress Table**
```sql
CREATE POLICY "Users can view own progress"
  ON module_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON module_progress FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON module_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

**Test Results Table**
```sql
CREATE POLICY "Users can view own test results"
  ON test_results FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own test results"
  ON test_results FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

**Learning Stats Table**
```sql
CREATE POLICY "Users can view own stats"
  ON learning_stats FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own stats"
  ON learning_stats FOR UPDATE
  USING (auth.uid() = user_id);
```

**Roadmaps Table**
```sql
CREATE POLICY "Users can view own roadmaps"
  ON roadmaps FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own roadmaps"
  ON roadmaps FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

## 5️⃣ Set Up Authentication with Clerk

### Link Clerk and Supabase

1. In Supabase, go to **Database** → **Extensions**
2. Search for `pgcrypto` and enable it
3. Go to **SQL Editor** and create a trigger:

```sql
-- Create a trigger to sync users from Clerk
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email)
  VALUES (new.id, new.email);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- This trigger requires Clerk webhooks to be set up
-- See Clerk documentation for webhook setup
```

## 6️⃣ Verify Setup

1. Restart your development server:
```bash
npm run dev
```

2. Test Supabase connection:
```bash
# In your browser console
import { supabase } from './src/lib/supabase'
await supabase.from('users').select('*').limit(1)
```

3. Check for errors - they'll appear in browser console

## 7️⃣ Using Supabase in Your App

### Option A: Using Hooks (Recommended)
```jsx
import { useLearningStats } from '../hooks/useSupabase'

export default function MyComponent() {
  const { stats, loading, error } = useLearningStats()
  
  if (loading) return <div>Loading...</div>
  return <div>Stats: {stats?.modules_completed}</div>
}
```

### Option B: Using Services
```jsx
import * as supabaseServices from '../lib/supabaseServices'
import { useUser } from '@clerk/clerk-react'

export default function MyComponent() {
  const { user } = useUser()
  const [data, setData] = useState(null)

  useEffect(() => {
    supabaseServices.getUserProfile(user.id)
      .then(setData)
      .catch(console.error)
  }, [user])

  return <div>{data?.first_name}</div>
}
```

### Option C: Direct Query
```jsx
import { supabase } from '../lib/supabase'

export default function MyComponent() {
  const { data, error } = await supabase
    .from('assessments')
    .select('*')
    .eq('user_id', userId)
  
  return <div>{data?.length} assessments</div>
}
```

## 🐛 Troubleshooting

### "Row Level Security" errors
- Check that RLS policies are created
- Verify `auth.uid()` is accessible (requires Clerk auth setup)
- Test with RLS disabled temporarily: go to **Auth** → **Policies** → disable

### "Foreign key" errors
- Ensure `users` table exists before inserting other tables
- Check that user IDs match Clerk user IDs

### Data not persisting
- Verify `.env.local` has correct credentials
- Check browser console for Supabase errors
- Confirm RLS policies allow the operation

### Real-time not working
- Go to **Replication** settings and check if table is subscribed
- Verify RLS policies include SELECT permission

## 📚 Reference

- [Supabase Docs](https://supabase.com/docs)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [Supabase Realtime](https://supabase.com/docs/guides/realtime)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

## 🚀 Production Deployment

Before going live:

1. ✅ Enable RLS on all tables
2. ✅ Set up proper authentication
3. ✅ Enable backups
4. ✅ Set up monitoring alerts
5. ✅ Test RLS policies thoroughly
6. ✅ Use environment-specific API keys

Go to **Project Settings** → **General** for more options.
