'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/navigation/Navbar'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const navigation = [
  { name: 'Profile', href: '/dashboard/guest/profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  { name: 'History', href: '/dashboard/guest/history', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
  { name: 'Food Request', href: '/dashboard/guest/food-request', icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z' },
]

export default function GuestDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('Profile')

  const handleLogout = () => {
    // Add logout logic here
    router.push('/auth/guest/signin')
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <div className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar Navigation */}
            <div className="w-full md:w-64">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-900 rounded-lg p-6"
              >
                <div className="space-y-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setActiveTab(item.name)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                        activeTab === item.name
                          ? 'bg-white text-black'
                          : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                      }`}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d={item.icon}
                        />
                      </svg>
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </div>
                <div className="mt-8 pt-8 border-t border-gray-800">
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-red-400 hover:bg-red-400/10 transition-colors duration-200"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    <span>Log Out</span>
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-900 rounded-lg p-8"
              >
                <h1 className="text-2xl font-bold mb-6">Welcome to Your Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Quick Stats */}
                  <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-lg font-medium mb-2">Total Requests</h3>
                    <p className="text-3xl font-bold">12</p>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-lg font-medium mb-2">Active Requests</h3>
                    <p className="text-3xl font-bold">3</p>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-lg font-medium mb-2">Completed</h3>
                    <p className="text-3xl font-bold">9</p>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="mt-8">
                  <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
                  <div className="space-y-4">
                    {[1, 2, 3].map((item) => (
                      <div
                        key={item}
                        className="bg-gray-800 rounded-lg p-4 flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                            <svg
                              className="w-5 h-5 text-black"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                              />
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium">Food Request #{item}</p>
                            <p className="text-sm text-gray-400">2 hours ago</p>
                          </div>
                        </div>
                        <span className="px-3 py-1 rounded-full text-sm bg-green-500/20 text-green-400">
                          Completed
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 