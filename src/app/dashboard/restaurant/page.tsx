'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

export default function RestaurantDashboard() {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('userRole')
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Restaurant Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gray-800 p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-xl font-semibold text-white mb-4">Food Donations</h2>
            <p className="text-gray-300">Manage your food donations</p>
            <button
              onClick={() => router.push('/dashboard/restaurant/donations')}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              View Donations
            </button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gray-800 p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-xl font-semibold text-white mb-4">Active Requests</h2>
            <p className="text-gray-300">View and respond to food requests</p>
            <button
              onClick={() => router.push('/dashboard/restaurant/requests')}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              View Requests
            </button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gray-800 p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-xl font-semibold text-white mb-4">Profile Settings</h2>
            <p className="text-gray-300">Update your restaurant profile</p>
            <button
              onClick={() => router.push('/dashboard/restaurant/profile')}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Edit Profile
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 