'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { FiMail, FiLock, FiUser, FiArrowRight } from 'react-icons/fi'
import { FaGoogle } from 'react-icons/fa'

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup' | 'forgot'>('signin')
  const [userType, setUserType] = useState<'ngo' | 'restaurant'>('ngo')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
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

        {/* User Type Selection (Sign Up only) */}
        {activeTab === 'signup' && (
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

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center"
            >
              {activeTab === 'signin' && 'Sign In'}
              {activeTab === 'signup' && 'Sign Up'}
              {activeTab === 'forgot' && 'Reset Password'}
              <FiArrowRight className="ml-2" />
            </motion.button>

            {/* Google Authentication */}
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

            {/* Switch between forms */}
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
              {activeTab === 'forgot' && (
                <p>
                  Remember your password?{' '}
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
          </motion.form>
        </AnimatePresence>
      </motion.div>
    </div>
  )
}