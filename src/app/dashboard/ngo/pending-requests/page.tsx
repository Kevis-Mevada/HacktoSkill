'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/navigation/Navbar'
import Link from 'next/link'

const mockPendingRequests = [
  {
    id: 1,
    guestName: 'John Doe',
    numberOfPeople: 4,
    preferredTime: '2024-03-20T14:00',
    location: '123 Main St, City',
    foodItems: ['Rice', 'Vegetables', 'Fruits'],
    specialRequirements: 'No spicy food',
    contact: '+91 98765 43210',
    requestDate: '2024-03-19T10:30',
  },
  {
    id: 2,
    guestName: 'Jane Smith',
    numberOfPeople: 2,
    preferredTime: '2024-03-20T15:30',
    location: '456 Community Ave, City',
    foodItems: ['Bread', 'Dairy', 'Snacks'],
    specialRequirements: 'Vegetarian only',
    contact: '+91 98765 43211',
    requestDate: '2024-03-19T11:15',
  },
  {
    id: 3,
    guestName: 'Mike Johnson',
    numberOfPeople: 6,
    preferredTime: '2024-03-20T16:00',
    location: '789 Hope St, City',
    foodItems: ['Hot Meals', 'Water', 'Fruits'],
    specialRequirements: 'Halal food required',
    contact: '+91 98765 43212',
    requestDate: '2024-03-19T12:00',
  },
]

export default function PendingRequests() {
  const [selectedRequest, setSelectedRequest] = useState<typeof mockPendingRequests[0] | null>(null)

  const handleAccept = (requestId: number) => {
    // Add accept logic here
    console.log('Accepting request:', requestId)
  }

  const handleReject = (requestId: number) => {
    // Add reject logic here
    console.log('Rejecting request:', requestId)
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
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-white text-black"
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
                <h1 className="text-2xl font-bold mb-8">Pending Food Requests</h1>

                <div className="space-y-6">
                  {mockPendingRequests.map((request) => (
                    <motion.div
                      key={request.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gray-800 rounded-lg p-6"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-medium">{request.guestName}</h3>
                          <p className="text-sm text-gray-400">
                            Requested on: {new Date(request.requestDate).toLocaleString()}
                          </p>
                        </div>
                        <div className="flex space-x-3">
                          <button
                            onClick={() => handleAccept(request.id)}
                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-200"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleReject(request.id)}
                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200"
                          >
                            Reject
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-sm font-medium text-gray-300 mb-2">Request Details</h4>
                          <div className="space-y-2">
                            <p className="text-sm text-gray-400">
                              <span className="font-medium">Number of People:</span> {request.numberOfPeople}
                            </p>
                            <p className="text-sm text-gray-400">
                              <span className="font-medium">Preferred Time:</span>{' '}
                              {new Date(request.preferredTime).toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-400">
                              <span className="font-medium">Location:</span> {request.location}
                            </p>
                            <p className="text-sm text-gray-400">
                              <span className="font-medium">Contact:</span> {request.contact}
                            </p>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-300 mb-2">Food Requirements</h4>
                          <div className="space-y-2">
                            <div>
                              <p className="text-sm text-gray-400 mb-2">Requested Food Items:</p>
                              <div className="flex flex-wrap gap-2">
                                {request.foodItems.map((item, index) => (
                                  <span
                                    key={index}
                                    className="px-2 py-1 bg-gray-700 rounded-full text-xs text-gray-300"
                                  >
                                    {item}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <p className="text-sm text-gray-400">
                              <span className="font-medium">Special Requirements:</span>{' '}
                              {request.specialRequirements}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 