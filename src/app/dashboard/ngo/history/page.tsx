'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/navigation/Navbar'
import Link from 'next/link'
import { FiHome } from 'react-icons/fi'

const mockHistory = [
  {
    id: 1,
    type: 'food_request',
    guestName: 'John Doe',
    numberOfPeople: 4,
    date: '2024-03-15T14:00',
    location: '123 Main St, City',
    status: 'completed',
    volunteer: 'Sarah Wilson',
    foodItems: ['Rice', 'Vegetables', 'Fruits'],
    completionDate: '2024-03-15T15:30',
    rating: 5,
    feedback: 'Excellent service, food was fresh and delivered on time.',
  },
  {
    id: 2,
    type: 'volunteer_activity',
    volunteerName: 'Mike Brown',
    activity: 'Food Delivery',
    date: '2024-03-14T16:00',
    location: '456 Community Ave, City',
    status: 'completed',
    details: 'Delivered food to 2 families',
    completionDate: '2024-03-14T17:30',
    rating: 4,
    feedback: 'Very punctual and professional.',
  },
  {
    id: 3,
    type: 'food_request',
    guestName: 'Jane Smith',
    numberOfPeople: 2,
    date: '2024-03-13T12:00',
    location: '789 Hope St, City',
    status: 'completed',
    volunteer: 'Lisa Chen',
    foodItems: ['Bread', 'Dairy', 'Snacks'],
    completionDate: '2024-03-13T13:15',
    rating: 5,
    feedback: 'Great communication and service.',
  },
  {
    id: 4,
    type: 'volunteer_activity',
    volunteerName: 'David Kumar',
    activity: 'Food Collection',
    date: '2024-03-12T10:00',
    location: '321 Service Rd, City',
    status: 'completed',
    details: 'Collected food from 3 restaurants',
    completionDate: '2024-03-12T12:30',
    rating: 4,
    feedback: 'Efficient collection and organization.',
  },
]

export default function History() {
  const [filter, setFilter] = useState<'all' | 'food_request' | 'volunteer_activity'>('all')
  const [dateRange, setDateRange] = useState<'week' | 'month' | 'year'>('month')

  const filteredHistory = mockHistory.filter(
    (item) => filter === 'all' || item.type === filter
  )

  const getDateRange = (date: string) => {
    const itemDate = new Date(date)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - itemDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (dateRange === 'week' && diffDays > 7) return false
    if (dateRange === 'month' && diffDays > 30) return false
    if (dateRange === 'year' && diffDays > 365) return false
    return true
  }

  const filteredByDate = filteredHistory.filter((item) => getDateRange(item.date))

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      
      <div className="pt-24 md:pt-32 pb-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            {/* Sidebar Navigation */}
            <div className="w-full md:w-64">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-800 rounded-lg p-4 md:p-6"
              >
                
                <div className="space-y-3 md:space-y-4">
                <Link
                    href="/dashboard/ngo"
                    className="flex items-center space-x-3 px-3 py-2 md:px-4 md:py-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white text-sm md:text-base"
                  >
                    <FiHome className="w-5 h-5" />
                    <span>Dashboard</span>
                  </Link>
                  <Link
                    href="/dashboard/ngo/history"
                    className="flex items-center space-x-3 px-3 py-2 md:px-4 md:py-3 rounded-lg bg-blue-500 text-white text-sm md:text-base"
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
                    className="flex items-center space-x-3 px-3 py-2 md:px-4 md:py-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white text-sm md:text-base"
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
                    href="/dashboard/ngo/volunteers"
                    className="flex items-center space-x-3 px-3 py-2 md:px-4 md:py-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white text-sm md:text-base"
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
                <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-gray-700">
                  <button
                    onClick={() => {/* Add logout logic */}}
                    className="flex items-center space-x-3 w-full px-3 py-2 md:px-4 md:py-3 rounded-lg text-red-400 hover:bg-red-400/10 transition-colors duration-200 text-sm md:text-base"
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
                className="bg-gray-900 rounded-lg p-4 sm:p-6 md:p-8"
              >
                <div className="flex flex-col gap-4 mb-6 md:mb-8">
                  <h1 className="text-xl sm:text-2xl font-bold">History</h1>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setFilter('all')}
                        className={`px-3 py-1 sm:px-4 sm:py-2 rounded-md transition-colors duration-200 text-sm sm:text-base ${
                          filter === 'all'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-800 text-white hover:bg-gray-700'
                        }`}
                      >
                        All
                      </button>
                      <button
                        onClick={() => setFilter('food_request')}
                        className={`px-3 py-1 sm:px-4 sm:py-2 rounded-md transition-colors duration-200 text-sm sm:text-base ${
                          filter === 'food_request'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-800 text-white hover:bg-gray-700'
                        }`}
                      >
                        Food Requests
                      </button>
                      <button
                        onClick={() => setFilter('volunteer_activity')}
                        className={`px-3 py-1 sm:px-4 sm:py-2 rounded-md transition-colors duration-200 text-sm sm:text-base ${
                          filter === 'volunteer_activity'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-800 text-white hover:bg-gray-700'
                        }`}
                      >
                        Volunteer Activities
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setDateRange('week')}
                        className={`px-3 py-1 sm:px-4 sm:py-2 rounded-md transition-colors duration-200 text-sm sm:text-base ${
                          dateRange === 'week'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-800 text-white hover:bg-gray-700'
                        }`}
                      >
                        Week
                      </button>
                      <button
                        onClick={() => setDateRange('month')}
                        className={`px-3 py-1 sm:px-4 sm:py-2 rounded-md transition-colors duration-200 text-sm sm:text-base ${
                          dateRange === 'month'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-800 text-white hover:bg-gray-700'
                        }`}
                      >
                        Month
                      </button>
                      <button
                        onClick={() => setDateRange('year')}
                        className={`px-3 py-1 sm:px-4 sm:py-2 rounded-md transition-colors duration-200 text-sm sm:text-base ${
                          dateRange === 'year'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-800 text-white hover:bg-gray-700'
                        }`}
                      >
                        Year
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  {filteredByDate.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-gray-800 rounded-lg p-4 sm:p-6"
                    >
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
                        <div>
                          <h3 className="text-base sm:text-lg font-medium">
                            {item.type === 'food_request' ? item.guestName : item.volunteerName}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-400">
                            {new Date(item.date).toLocaleString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span
                            className={`px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm ${
                              item.status === 'completed'
                                ? 'bg-green-500/20 text-green-400'
                                : 'bg-yellow-500/20 text-yellow-400'
                            }`}
                          >
                            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                          </span>
                          <span className="text-xs sm:text-sm text-gray-400">
                            Rating: {item.rating}/5
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                          <h4 className="text-xs sm:text-sm font-medium text-gray-300 mb-2">
                            {item.type === 'food_request' ? 'Request Details' : 'Activity Details'}
                          </h4>
                          <div className="space-y-1 sm:space-y-2">
                            {item.type === 'food_request' ? (
                              <>
                                <p className="text-xs sm:text-sm text-gray-400">
                                  <span className="font-medium">Number of People:</span>{' '}
                                  {item.numberOfPeople}
                                </p>
                                <p className="text-xs sm:text-sm text-gray-400">
                                  <span className="font-medium">Location:</span> {item.location}
                                </p>
                                <p className="text-xs sm:text-sm text-gray-400">
                                  <span className="font-medium">Volunteer:</span> {item.volunteer}
                                </p>
                                {(item.foodItems?.length ?? 0) > 0 && (
                                  <div>
                                    <p className="text-xs sm:text-sm text-gray-400 mb-1 sm:mb-2">Food Items:</p>
                                    <div className="flex flex-wrap gap-1 sm:gap-2">
                                      {(item.foodItems ?? []).map((food, index) => (
                                        <span
                                          key={index}
                                          className="px-2 py-0.5 sm:px-2 sm:py-1 bg-gray-700 rounded-full text-xs text-gray-300"
                                        >
                                          {food}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </>
                            ) : (
                              <>
                                <p className="text-xs sm:text-sm text-gray-400">
                                  <span className="font-medium">Activity:</span> {item.activity}
                                </p>
                                <p className="text-xs sm:text-sm text-gray-400">
                                  <span className="font-medium">Location:</span> {item.location}
                                </p>
                                <p className="text-xs sm:text-sm text-gray-400">
                                  <span className="font-medium">Details:</span> {item.details}
                                </p>
                              </>
                            )}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-xs sm:text-sm font-medium text-gray-300 mb-2">Completion Details</h4>
                          <div className="space-y-1 sm:space-y-2">
                            <p className="text-xs sm:text-sm text-gray-400">
                              <span className="font-medium">Completed on:</span>{' '}
                              {new Date(item.completionDate).toLocaleString()}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-400">
                              <span className="font-medium">Feedback:</span> {item.feedback}
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