import { useState } from 'react'
import { SignIn, SignUp } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'

export default function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(true)
  const navigate = useNavigate()

  return (
    <div className="min-h-screen gradient-primary flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div
            onClick={() => navigate('/')}
            className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 cursor-pointer shadow-xl hover:shadow-2xl transition"
          >
            <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-primary">
              N
            </span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Neurox</h1>
          <p className="text-white/80">Learn only what you don't know</p>
        </div>

        {/* Clerk Components */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {isSignIn ? (
            <>
              <div className="mb-6">
                <SignIn
                  appearance={{
                    elements: {
                      rootBox: 'w-full',
                      card: 'shadow-none border-none bg-transparent',
                      headerTitle: 'text-2xl font-bold text-gray-900',
                      headerSubtitle: 'text-gray-600',
                      socialButtonsBlockButton: 'w-full border border-gray-300 text-gray-700',
                      formButtonPrimary: 'w-full bg-gradient-primary hover:shadow-lg',
                      dividerLine: 'bg-gray-300',
                      footerActionLink: 'text-primary hover:text-secondary',
                    },
                  }}
                  redirectUrl="/dashboard"
                />
              </div>

              {/* Toggle to Sign Up */}
              <div className="text-center pt-6 border-t border-gray-200">
                <p className="text-gray-600 text-sm">
                  Don't have an account?{' '}
                  <button
                    onClick={() => setIsSignIn(false)}
                    className="text-primary font-semibold hover:text-secondary transition"
                  >
                    Sign Up
                  </button>
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="mb-6">
                <SignUp
                  appearance={{
                    elements: {
                      rootBox: 'w-full',
                      card: 'shadow-none border-none bg-transparent',
                      headerTitle: 'text-2xl font-bold text-gray-900',
                      headerSubtitle: 'text-gray-600',
                      socialButtonsBlockButton: 'w-full border border-gray-300 text-gray-700',
                      formButtonPrimary: 'w-full bg-gradient-primary hover:shadow-lg',
                      dividerLine: 'bg-gray-300',
                      footerActionLink: 'text-primary hover:text-secondary',
                    },
                  }}
                  redirectUrl="/questions"
                />
              </div>

              {/* Toggle to Sign In */}
              <div className="text-center pt-6 border-t border-gray-200">
                <p className="text-gray-600 text-sm">
                  Already have an account?{' '}
                  <button
                    onClick={() => setIsSignIn(true)}
                    className="text-primary font-semibold hover:text-secondary transition"
                  >
                    Sign In
                  </button>
                </p>
              </div>
            </>
          )}
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/')}
            className="text-white hover:text-white/80 transition text-sm"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  )
}
