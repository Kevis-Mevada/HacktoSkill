'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/navigation/Navbar'
import Link from 'next/link'

const mockProfile = {
  name: 'Tasty Bites Restaurant',
  email: 'contact@tastybites.com',
  phone: '+91 98765 43210',
  address: '123 Food Street, City, State 12345',
  website: 'www.tastybites.com',
  cuisine: 'Indian, Chinese, Continental',
  operatingHours: 'Monday - Sunday: 11 AM - 11 PM',
  totalDonations: 150,
  activeDonations: 5,
  totalBeneficiaries: 500,
  rating: 4.8,
  reviews: 45,
}

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState(mockProfile)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Add profile update logic here
    setIsEditing(false)
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
                    href="/dashboard/restaurant/profile"
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
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span>Profile</span>
                  </Link>
                  <Link
                    href="/dashboard/restaurant/history"
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
                    href="/dashboard/restaurant/donate"
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
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    <span>Donate Food</span>
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
                  <h1 className="text-2xl font-bold">Restaurant Profile</h1>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 bg-white text-black rounded-md hover:bg-gray-100 transition-colors duration-200"
                    >
                      Edit Profile
                    </button>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors duration-200"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-200"
                      >
                        Save Changes
                      </button>
                    </div>
                  )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h2 className="text-lg font-medium mb-4">Basic Information</h2>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Restaurant Name
                          </label>
                          {isEditing ? (
                            <input
                              type="text"
                              value={profile.name}
                              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                              className="w-full px-4 py-2 bg-gray-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          ) : (
                            <p className="text-gray-400">{profile.name}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Email
                          </label>
                          {isEditing ? (
                            <input
                              type="email"
                              value={profile.email}
                              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                              className="w-full px-4 py-2 bg-gray-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          ) : (
                            <p className="text-gray-400">{profile.email}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Phone
                          </label>
                          {isEditing ? (
                            <input
                              type="tel"
                              value={profile.phone}
                              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                              className="w-full px-4 py-2 bg-gray-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          ) : (
                            <p className="text-gray-400">{profile.phone}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Website
                          </label>
                          {isEditing ? (
                            <input
                              type="url"
                              value={profile.website}
                              onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                              className="w-full px-4 py-2 bg-gray-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          ) : (
                            <p className="text-gray-400">{profile.website}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h2 className="text-lg font-medium mb-4">Location & Hours</h2>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Address
                          </label>
                          {isEditing ? (
                            <textarea
                              value={profile.address}
                              onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                              className="w-full px-4 py-2 bg-gray-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                              rows={3}
                            />
                          ) : (
                            <p className="text-gray-400">{profile.address}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Operating Hours
                          </label>
                          {isEditing ? (
                            <input
                              type="text"
                              value={profile.operatingHours}
                              onChange={(e) => setProfile({ ...profile, operatingHours: e.target.value })}
                              className="w-full px-4 py-2 bg-gray-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          ) : (
                            <p className="text-gray-400">{profile.operatingHours}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Cuisine Types
                          </label>
                          {isEditing ? (
                            <input
                              type="text"
                              value={profile.cuisine}
                              onChange={(e) => setProfile({ ...profile, cuisine: e.target.value })}
                              className="w-full px-4 py-2 bg-gray-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          ) : (
                            <div className="flex flex-wrap gap-2">
                              {profile.cuisine.split(', ').map((type, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 bg-gray-700 rounded-full text-xs text-gray-300"
                                >
                                  {type}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-800 rounded-lg p-6">
                      <h3 className="text-lg font-medium mb-2">Total Donations</h3>
                      <p className="text-3xl font-bold text-white">{profile.totalDonations}</p>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-6">
                      <h3 className="text-lg font-medium mb-2">Active Donations</h3>
                      <p className="text-3xl font-bold text-white">{profile.activeDonations}</p>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-6">
                      <h3 className="text-lg font-medium mb-2">Total Beneficiaries</h3>
                      <p className="text-3xl font-bold text-white">{profile.totalBeneficiaries}</p>
                    </div>
                  </div>

                  <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-lg font-medium mb-2">Restaurant Rating</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-3xl font-bold text-white">{profile.rating}</span>
                      <span className="text-gray-400">/ 5</span>
                      <span className="text-gray-400">({profile.reviews} reviews)</span>
                    </div>
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 