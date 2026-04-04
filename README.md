# Neurox - AI Smart Curriculum Designer

A modern, production-ready frontend for an AI-powered personalized learning platform. Built with React, Vite, Tailwind CSS, and Clerk authentication.

## 🌟 Features

- **AI-Powered Assessment**: Takes an intelligent pre-assessment test to identify knowledge gaps
- **Personalized Roadmap**: Creates a customized learning path based on assessment results
- **Interactive Learning**: Video-based learning with module-specific tests
- **Progress Tracking**: Real-time dashboard with learning statistics and insights
- **AI Mentor Chat**: 24/7 floating AI assistant for questions and help
- **Secure Authentication**: Clerk integration for secure user management
- **Responsive Design**: Fully responsive for mobile, tablet, and desktop
- **Modern UI**: Duolingo-style design with gradients, smooth animations, and clean spacing

## 🚀 Tech Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Authentication**: Clerk
- **API Client**: Axios
- **Build Tool**: Vite
- **Package Manager**: npm

## 📋 Pages & Features

### Public Pages
- **Landing Page** (`/`): Hero section with app introduction and CTA
- **Auth Page** (`/auth`): Sign-in and sign-up using Clerk

### Protected Pages (Require Authentication)
- **Questions Page** (`/questions`): Select learning domain and answer initial questions
- **Pre-Assessment Test** (`/test`): 10-question MCQ test to assess current knowledge
- **Roadmap Page** (`/roadmap`): Personalized learning modules with status indicators
- **Learning Page** (`/learn/:id`): YouTube video embed with course content
- **Module Test** (`/module-test/:id`): Quiz to verify module understanding
- **Dashboard** (`/dashboard`): Overall progress, statistics, and insights
- **Profile** (`/profile`): User information and learning achievements

### Components
- **Navbar**: Navigation with Clerk UserButton
- **Card**: Reusable card component with hover effects
- **ProgressBar**: Visual progress indicator
- **MentorChat**: Floating AI chat assistant

## 🛠️ Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd neurox
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env.local` file in the project root:
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
CLERK_SECRET_KEY=your_clerk_secret_key_here
VITE_API_BASE_URL=http://localhost:5000/api
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

Get your Clerk Publishable Key:
1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Create a new application if you don't have one
3. Copy your Publishable Key from the API Keys section
4. Paste it in `.env.local`

Get your Supabase Keys:
1. Go to [Supabase Dashboard](https://supabase.com)
2. Create a new project
3. Go to Project Settings → API Keys
4. Copy your Project URL and Anon Key
5. Paste them in `.env.local`

4. **Start the development server**
```bash
npm run dev
```

The app will open at `http://localhost:3000`

## 📁 Project Structure

```
neurox/
├── src/
│   ├── pages/
│   │   ├── LandingPage.jsx
│   │   ├── AuthPage.jsx
│   │   ├── QuestionsPage.jsx
│   │   ├── TestPage.jsx
│   │   ├── RoadmapPage.jsx
│   │   ├── LearningPage.jsx
│   │   ├── ModuleTestPage.jsx
│   │   ├── DashboardPage.jsx
│   │   └── ProfilePage.jsx
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Card.jsx
│   │   ├── ProgressBar.jsx
│   │   └── MentorChat.jsx
│   ├── hooks/
│   │   └── useSupabase.js (custom hooks for Supabase)
│   ├── lib/
│   │   ├── supabase.js (Supabase client)
│   │   └── supabaseServices.js (Supabase service functions)
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── .env.example
```

## 🔐 Authentication Setup

### Clerk Configuration

The app uses Clerk for authentication. Here's what's configured:

- **Sign Up**: New users can create an account
- **Sign In**: Existing users can log in
- **Protected Routes**: Dashboard, Roadmap, Learning, and Profile pages require authentication
- **User Button**: Top-right corner shows logged-in user info with sign-out option
- **Auto Redirect**: Unauthenticated users are redirected to `/auth`

### First-Time Setup

1. Create a [Clerk Account](https://clerk.com)
2. Create a new application
3. Copy and paste your Publishable Key to `.env.local`
4. Enable authentication strategies (Email/Password recommended)
5. Done!

## 🌐 API Integration

The app makes calls to a backend API. Update `VITE_API_BASE_URL` in `.env.local` to match your backend URL.

### Mock Endpoints Used
- `POST /api/assessment` - Submit pre-assessment test
- `GET /api/roadmap` - Fetch personalized roadmap
- `POST /api/module-test` - Submit module test results

The app has fallback mock data, so it works without a backend!

## 🗄️ Supabase Integration

Neurox includes full Supabase integration for real-time data persistence and user management.

### Supabase Setup

1. **Create a Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Click "New Project"
   - Enter project details and password
   - Wait for project initialization

2. **Create Required Tables**

In your Supabase SQL Editor, run:

```sql
-- Users table
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

-- Assessments table
CREATE TABLE assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  score INTEGER,
  total_questions INTEGER,
  domain TEXT,
  answers JSONB,
  created_at TIMESTAMP DEFAULT now()
);

-- Module Progress table
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

-- Test Results table
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

-- Learning Stats table
CREATE TABLE learning_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  total_hours_learned DECIMAL,
  modules_completed INTEGER DEFAULT 0,
  current_streak INTEGER DEFAULT 0,
  last_opened TIMESTAMP,
  updated_at TIMESTAMP DEFAULT now()
);

-- Roadmaps table
CREATE TABLE roadmaps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  module_id INTEGER NOT NULL,
  status TEXT,
  difficulty TEXT,
  created_at TIMESTAMP DEFAULT now(),
  UNIQUE(user_id, module_id)
);
```

3. **Configure Row Level Security (RLS)**

Enable RLS on all tables and set policies:

```sql
-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE module_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE roadmaps ENABLE ROW LEVEL SECURITY;

-- Create policies (example for assessments)
CREATE POLICY "Users can read own assessments"
  ON assessments FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own assessments"
  ON assessments FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

### Using Supabase in Components

**Using Hooks (Recommended)**

```jsx
import { useLearningStats, useTestResults } from '../hooks/useSupabase'

export default function DashboardPage() {
  const { stats, loading, error, updateStats } = useLearningStats()
  const { results, loading: resultsLoading, saveTestResult } = useTestResults()

  return (
    <div>
      {loading ? <p>Loading...</p> : <p>Hours learned: {stats?.total_hours_learned}</p>}
    </div>
  )
}
```

**Available Hooks**
- `useUserProfile()` - Get/update user profile
- `useAssessment()` - Get/save assessment data
- `useModuleProgress(moduleId)` - Track module progress
- `useLearningStats()` - Get/update learning statistics
- `useTestResults()` - Get/save test results

**Using Services Directly**

```jsx
import * as supabaseServices from '../lib/supabaseServices'

const saveTransactionData = async () => {
  const result = await supabaseServices.saveModuleProgress(
    userId,
    moduleId,
    { watched: true, completed: true }
  )
}
```

### Available Services

- `saveUserProfile(userId, data)` - Save user info
- `getUserProfile(userId)` - Get user profile
- `saveAssessment(userId, data)` - Save assessment
- `getAssessment(userId)` - Get latest assessment
- `saveModuleProgress(userId, moduleId, data)` - Update module progress
- `getModuleProgress(userId, moduleId)` - Get module progress
- `saveTestResult(userId, data)` - Save test result
- `getTestResults(userId)` - Get all test results
- `getLearningStats(userId)` - Get learning stats
- `updateLearningStats(userId, stats)` - Update learning stats

### Real-Time Updates

Subscribe to real-time changes:

```jsx
import { subscribeToUserStats } from '../lib/supabaseServices'

useEffect(() => {
  const subscription = subscribeToUserStats(userId, (payload) => {
    console.log('Stats updated:', payload)
  })

  return () => subscription.unsubscribe()
}, [userId])
```

## 🎨 Design System

### Colors
- **Primary**: `#6366f1` (Indigo)
- **Secondary**: `#a855f7` (Purple)
- **Accent**: `#ec4899` (Pink)
- **Gradients**: Primary to Secondary, Secondary to Accent

### Spacing
- Padding: `p-6` (standard card padding)
- Gap: `gap-6` (standard grid gap)
- Rounded: `rounded-2xl` (cards and buttons)

### Effects
- Soft shadows: `card-shadow` class
- Hover animations: Scale and shadow effects
- Smooth transitions: All transitions are 300ms

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deploy to Vercel (Recommended for React apps)
```bash
npm install -g vercel
vercel
```

## 📚 Available Scripts

- `npm run dev` - Start development server (port 3000)
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## 🐛 Troubleshooting

### Clerk Key Not Working
- Verify the Publishable Key is correct (not Secret Key)
- Check that it's in the right format in `.env.local`
- Restart the dev server after changing `.env.local`

### API Calls Failing
- Ensure backend is running on `http://localhost:5000`
- Check that `VITE_API_BASE_URL` is set correctly
- The app has mock data fallbacks for testing

### Page Not Loading
- Clear browser cache (Ctrl+Shift+Delete)
- Restart dev server
- Check console for errors (F12)

## 🎯 User Flow

1. **Landing Page** → User clicks "Get Started"
2. **Auth** → User signs up/in with Clerk
3. **Questions** → Select learning domain
4. **Pre-Assessment Test** → Take 10-question MCQ test
5. **Roadmap** → View personalized modules
6. **Learning** → Watch videos and take module tests
7. **Dashboard** → Track overall progress
8. **Profile** → View achievements and stats

## 💡 Features in Detail

### Smart Assessment
- 10-question MCQ test
- Covers key concepts in the domain
- Scoring-based on correct answers
- Results analyzed for roadmap generation

### Personalized Roadmap
- 6 modules generated per domain
- Color-coded: Red (needs focus), Green (strong areas)
- Different difficulty levels
- Estimated completion time for each module

### Progressive Learning
- Video-based learning content
- Must mark video as watched to proceed
- Module-specific tests (5 questions each)
- 70% pass rate required to unlock next module

### Progress Tracking
- Overall completion percentage
- Time saved insights
- Daily learning streak
- Achievement system
- Goals and milestones

## 📝 Notes

- This is a **frontend-only** application
- All data is stored client-side or sent to backend for persistence
- The app works without a backend (uses mock data)
- For production, connect to your own API backend
- Clerk handles all authentication securely

## 🤝 Contributing

Contributions are welcome! Please follow the existing code structure and style.

## 📄 License

MIT License - feel free to use this project!

## 📞 Support

For issues or questions:
1. Check the [Clerk Documentation](https://clerk.com/docs)
2. Review Vite docs: https://vitejs.dev
3. Check Tailwind docs: https://tailwindcss.com

---

Built with ❤️ for hackathons and production use.
