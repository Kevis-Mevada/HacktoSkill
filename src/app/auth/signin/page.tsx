'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { FiMail, FiLock, FiUser, FiArrowRight, FiCheck } from 'react-icons/fi'
import { FaGoogle } from 'react-icons/fa'
import { useRouter } from 'next/navigation'

export default function AuthPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'signin' | 'signup' | 'forgot'>('signin')
  const [userType, setUserType] = useState<'ngo' | 'restaurant'>('ngo')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPasswordUpdated, setShowPasswordUpdated] = useState(false)
  const [showAccountCreated, setShowAccountCreated] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      if (activeTab === 'forgot') {
        setShowPasswordUpdated(true)
        setTimeout(() => {
          setShowPasswordUpdated(false)
          setActiveTab('signin')
        }, 3000)
      } else if (activeTab === 'signup') {
        setShowAccountCreated(true)
        setTimeout(() => {
          setShowAccountCreated(false)
          setActiveTab('signin')
        }, 3000)
      } else {
        // Handle redirection based on user type
        if (userType === 'ngo') {
          router.push('/dashboard/ngo')
        } else if (userType === 'restaurant') {
          router.push('/dashboard/restaurant')
        }
      }
    } catch {
      setError('Invalid credentials')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-900 rounded-xl p-8 w-full max-w-md"
      >
        {/* Tab Selection */}
        <div className="flex mb-8 border-b border-gray-800">
          <button
            onClick={() => setActiveTab('signin')}
            className={`pb-4 px-4 font-medium ${activeTab === 'signin' ? 'text-white border-b-2 border-blue-500' : 'text-gray-400'}`}
          >
            Sign In
          </button>
          <button
            onClick={() => setActiveTab('signup')}
            className={`pb-4 px-4 font-medium ${activeTab === 'signup' ? 'text-white border-b-2 border-blue-500' : 'text-gray-400'}`}
          >
            Sign Up
          </button>
        </div>

        {/* User Type Selection */}
        {activeTab !== 'forgot' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6"
          >
            <div className="flex rounded-lg bg-gray-800 p-1">
              <button
                onClick={() => setUserType('ngo')}
                className={`flex-1 py-2 rounded-md ${userType === 'ngo' ? 'bg-gray-700 text-white' : 'text-gray-400'}`}
              >
                NGO
              </button>
              <button
                onClick={() => setUserType('restaurant')}
                className={`flex-1 py-2 rounded-md ${userType === 'restaurant' ? 'bg-gray-700 text-white' : 'text-gray-400'}`}
              >
                Restaurant
              </button>
            </div>
          </motion.div>
        )}

        {/* Forms */}
        <AnimatePresence mode="wait">
          <motion.form
            key={activeTab}
            initial={{ opacity: 0, x: activeTab === 'signin' ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: activeTab === 'signin' ? -20 : 20 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {activeTab === 'signup' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-1"
              >
                <label className="text-sm font-medium text-gray-300">
                  {userType === 'ngo' ? 'NGO Name' : 'Restaurant Name'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </motion.div>
            )}

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-300">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {(activeTab === 'signin' || activeTab === 'signup') && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-1"
              >
                <label className="text-sm font-medium text-gray-300">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="text-gray-400" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </motion.div>
            )}

            {(activeTab === 'signup' || activeTab === 'forgot') && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-1"
              >
                <label className="text-sm font-medium text-gray-300">
                  {activeTab === 'signup' ? 'Confirm Password' : 'New Password'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="text-gray-400" />
                  </div>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </motion.div>
            )}

            {activeTab === 'signin' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-end"
              >
                <button
                  type="button"
                  onClick={() => setActiveTab('forgot')}
                  className="text-sm text-blue-400 hover:text-blue-300"
                >
                  Forgot Password?
                </button>
              </motion.div>
            )}

            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center"
            >
              {isLoading ? 'Processing...' : (activeTab === 'forgot' ? 'Submit' : (activeTab === 'signin' ? 'Sign In' : 'Sign Up'))}
              <FiArrowRight className="ml-2" />
            </motion.button>

            {/* Google Authentication */}
            {activeTab !== 'forgot' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6"
              >
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-700"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-gray-900 text-gray-400">
                      Or continue with
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  className="w-full mt-6 py-2 bg-gray-800 rounded-md hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center"
                >
                  <FaGoogle className="mr-2" />
                  Google
                </button>
              </motion.div>
            )}

            {/* Switch between forms */}
            {activeTab !== 'forgot' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-sm text-gray-400"
              >
                {activeTab === 'signin' && (
                  <p>
                    Don&apos;t have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setActiveTab('signup')}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      Sign up
                    </button>
                  </p>
                )}
                {activeTab === 'signup' && (
                  <p>
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setActiveTab('signin')}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      Sign in
                    </button>
                  </p>
                )}
              </motion.div>
            )}
          </motion.form>
        </AnimatePresence>
      </motion.div>

      {/* Password Updated Popup */}
      {showPasswordUpdated && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed inset-0 flex items-center justify-center bg-black/50"
        >
          <div className="bg-gray-800 rounded-xl p-6 max-w-sm w-full mx-4 text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiCheck className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Password Updated</h3>
            <p className="text-gray-400">Your password has been successfully updated.</p>
          </div>
        </motion.div>
      )}

      {/* Account Created Popup */}
      {showAccountCreated && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed inset-0 flex items-center justify-center bg-black/50"
        >
          <div className="bg-gray-800 rounded-xl p-6 max-w-sm w-full mx-4 text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiCheck className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Account Created</h3>
            <p className="text-gray-400">Your account has been successfully created.</p>
          </div>
        </motion.div>
      )}
    </div>
  )
}