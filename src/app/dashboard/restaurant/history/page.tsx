'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/navigation/Navbar'
import Link from 'next/link'

const mockHistory = [
  {
    id: 1,
    date: '2024-03-15',
    foodItems: ['Rice', 'Dal', 'Vegetables', 'Chapati'],
    quantity: '50 servings',
    status: 'completed',
    ngo: 'FoodShare NGO',
    beneficiaries: 25,
    rating: 4.5,
    feedback: 'Great quality food, delivered on time',
  },
  {
    id: 2,
    date: '2024-03-14',
    foodItems: ['Biryani', 'Raita', 'Salad'],
    quantity: '30 servings',
    status: 'completed',
    ngo: 'Feed the Hungry',
    beneficiaries: 15,
    rating: 4.8,
    feedback: 'Excellent food quality and packaging',
  },
  {
    id: 3,
    date: '2024-03-13',
    foodItems: ['Pizza', 'Pasta', 'Garlic Bread'],
    quantity: '40 servings',
    status: 'completed',
    ngo: 'Food for All',
    beneficiaries: 20,
    rating: 4.2,
    feedback: 'Good food, slightly delayed delivery',
  },
]

export default function History() {
  const [filter, setFilter] = useState('all')

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
                    href="/dashboard/restaurant/Donate-Food"
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
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span>Donate Food</span>
                  </Link>
                  <Link
                    href="/dashboard/restaurant/history"
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
                    <span>History</span>
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
                <div className="flex justify-between items-center mb-8">
                  <h1 className="text-2xl font-bold">Donation History</h1>
                  <div className="flex space-x-4">
                    <select
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                      className="px-4 py-2 bg-gray-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Donations</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-6">
                  {mockHistory.map((donation) => (
                    <div
                      key={donation.id}
                      className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors duration-200"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-medium">Donation #{donation.id}</h3>
                          <p className="text-gray-400">{donation.date}</p>
                        </div>
                        <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                          {donation.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-sm font-medium text-gray-400 mb-2">Food Items</h4>
                          <div className="flex flex-wrap gap-2">
                            {donation.foodItems.map((item, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-gray-700 rounded-full text-xs text-gray-300"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-400 mb-2">Details</h4>
                          <div className="space-y-2">
                            <p className="text-sm">
                              <span className="text-gray-400">Quantity:</span>{' '}
                              <span className="text-white">{donation.quantity}</span>
                            </p>
                            <p className="text-sm">
                              <span className="text-gray-400">NGO:</span>{' '}
                              <span className="text-white">{donation.ngo}</span>
                            </p>
                            <p className="text-sm">
                              <span className="text-gray-400">Beneficiaries:</span>{' '}
                              <span className="text-white">{donation.beneficiaries}</span>
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 pt-6 border-t border-gray-700">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium text-gray-400 mb-1">Feedback</h4>
                            <p className="text-sm text-gray-300">{donation.feedback}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-yellow-400">★</span>
                            <span className="text-white">{donation.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
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