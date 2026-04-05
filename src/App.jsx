import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import { ToastProvider } from './context/ToastContext'
import { ThemeProvider } from './context/ThemeContext'
import Toast from './components/Toast'
import LandingPage from './pages/LandingPage'
import AuthPage from './pages/AuthPage'
import QuestionsPage from './pages/QuestionsPage'
import TestPage from './pages/TestPage'
import RoadmapPage from './pages/RoadmapPage'
import AIRoadmapGeneratorPage from './pages/AIRoadmapGeneratorPage'
import LearningPage from './pages/LearningPage'
import ModuleTestPage from './pages/ModuleTestPage'
import DashboardPage from './pages/DashboardPage'
import PerformancePage from './pages/PerformancePage'
import ProfilePage from './pages/ProfilePage'

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isSignedIn, isLoaded } = useUser()

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block">
            <div className="w-12 h-12 gradient-primary rounded-full animate-spin"></div>
          </div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isSignedIn) {
    return <Navigate to="/auth" replace />
  }

  return children
}

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <Router>
          <Toast />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<AuthPage />} />
            
            <Route
              path="/questions"
              element={
                <ProtectedRoute>
                  <QuestionsPage />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/test"
              element={
                <ProtectedRoute>
                  <TestPage />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/roadmap"
              element={
                <ProtectedRoute>
                  <RoadmapPage />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/ai-roadmap"
              element={
                <ProtectedRoute>
                  <AIRoadmapGeneratorPage />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/learn/:id"
              element={
                <ProtectedRoute>
                  <LearningPage />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/module-test/:id"
              element={
                <ProtectedRoute>
                  <ModuleTestPage />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/performance"
              element={
                <ProtectedRoute>
                  <PerformancePage />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </ToastProvider>
    </ThemeProvider>
  )
}
