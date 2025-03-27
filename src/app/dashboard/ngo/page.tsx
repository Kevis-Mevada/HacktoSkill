'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/navigation/Navbar'
import Link from 'next/link'

// Mock data for dashboard
const mockStats = {
  pendingRequests: 5,
  acceptedRequests: 12,
  volunteerApplications: 3,
  totalFoodDonations: 25,
}

const mockRecentRequests = [
  {
    id: 1,
    guestName: 'John Doe',
    numberOfPeople: 4,
    preferredTime: '2024-03-20T14:00',
    status: 'pending',
    foodItems: ['Rice', 'Vegetables', 'Fruits'],
  },
  {
    id: 2,
    guestName: 'Jane Smith',
    numberOfPeople: 2,
    preferredTime: '2024-03-20T15:30',
    status: 'accepted',
    foodItems: ['Bread', 'Dairy', 'Snacks'],
  },
]

const mockVolunteerApplications = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    phone: '+91 98765 43210',
    experience: '2 years',
    status: 'pending',
  },
  {
    id: 2,
    name: 'Bob Wilson',
    email: 'bob@example.com',
    phone: '+91 98765 43211',
    experience: '1 year',
    status: 'pending',
  },
]

export default function NGODashboard() {
  const [activeTab, setActiveTab] = useState('overview')

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
                  <Link
                    href="/dashboard/ngo/profile"
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white"
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
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span>Profile</span>
                  </Link>
                  <Link
                    href="/dashboard/ngo/history"
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white"
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
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>History</span>
                  </Link>
                  <Link
                    href="/dashboard/ngo/pending-requests"
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white"
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
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Pending Requests</span>
                  </Link>
                  <Link
                    href="/dashboard/ngo/accepted-requests"
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white"
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Accepted Requests</span>
                  </Link>
                  <Link
                    href="/dashboard/ngo/volunteers"
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white"
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
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span>Volunteers</span>
                  </Link>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-800">
                  <button
                    onClick={() => {/* Add logout logic */}}
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
                <h1 className="text-2xl font-bold mb-8">NGO Dashboard</h1>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-800 rounded-lg p-6"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-gray-400">Pending Requests</h3>
                      <svg
                        className="w-6 h-6 text-yellow-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <p className="text-3xl font-bold mt-2">{mockStats.pendingRequests}</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-gray-800 rounded-lg p-6"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-gray-400">Accepted Requests</h3>
                      <svg
                        className="w-6 h-6 text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="text-3xl font-bold mt-2">{mockStats.acceptedRequests}</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gray-800 rounded-lg p-6"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-gray-400">Volunteer Applications</h3>
                      <svg
                        className="w-6 h-6 text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                    <p className="text-3xl font-bold mt-2">{mockStats.volunteerApplications}</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-gray-800 rounded-lg p-6"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-gray-400">Total Food Donations</h3>
                      <svg
                        className="w-6 h-6 text-purple-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                    <p className="text-3xl font-bold mt-2">{mockStats.totalFoodDonations}</p>
                  </motion.div>
                </div>

                {/* Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Recent Requests */}
                  <div className="bg-gray-800 rounded-lg p-6">
                    <h2 className="text-lg font-medium mb-4">Recent Requests</h2>
                    <div className="space-y-4">
                      {mockRecentRequests.map((request) => (
                        <div
                          key={request.id}
                          className="flex items-center justify-between p-4 bg-gray-700 rounded-lg"
                        >
                          <div>
                            <h3 className="font-medium">{request.guestName}</h3>
                            <p className="text-sm text-gray-400">
                              {request.numberOfPeople} people • {new Date(request.preferredTime).toLocaleString()}
                            </p>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs ${
                              request.status === 'pending'
                                ? 'bg-yellow-400/20 text-yellow-400'
                                : 'bg-green-400/20 text-green-400'
                            }`}
                          >
                            {request.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Volunteer Applications */}
                  <div className="bg-gray-800 rounded-lg p-6">
                    <h2 className="text-lg font-medium mb-4">Recent Volunteer Applications</h2>
                    <div className="space-y-4">
                      {mockVolunteerApplications.map((application) => (
                        <div
                          key={application.id}
                          className="flex items-center justify-between p-4 bg-gray-700 rounded-lg"
                        >
                          <div>
                            <h3 className="font-medium">{application.name}</h3>
                            <p className="text-sm text-gray-400">
                              {application.email} • {application.phone}
                            </p>
                            <p className="text-sm text-gray-400">Experience: {application.experience}</p>
                          </div>
                          <span className="px-3 py-1 rounded-full text-xs bg-yellow-400/20 text-yellow-400">
                            pending
                          </span>
                        </div>
                      ))}
                    </div>
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