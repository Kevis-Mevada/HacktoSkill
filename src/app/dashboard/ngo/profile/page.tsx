'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/navigation/Navbar'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

const mockProfile = {
  name: 'FoodShare NGO',
  email: 'contact@foodshare.org',
  phone: '+91 98765 43210',
  address: '123 Service Street, City, State 12345',
  website: 'www.foodshare.org',
  description: 'A non-profit organization dedicated to reducing food waste and helping those in need.',
  operatingHours: 'Monday - Friday: 9 AM - 6 PM',
  areasServed: ['Downtown', 'West Side', 'East Side', 'North Area'],
  totalDeliveries: 150,
  activeVolunteers: 25,
  totalBeneficiaries: 500,
  rating: 4.8,
  reviews: 45,
}

export default function Profile() {
  const searchParams = useSearchParams()
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState(mockProfile)
  const [showVerificationAlert, setShowVerificationAlert] = useState(false)
  const [isProfileComplete, setIsProfileComplete] = useState(false)

  useEffect(() => {
    // Check if redirected from sign-up with verification pending
    if (searchParams.get('verification') === 'pending') {
      setShowVerificationAlert(true)
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Add profile update logic here
    setIsEditing(false)
    setIsProfileComplete(true)
    setShowVerificationAlert(true)
  }

  const handleCompleteProfile = () => {
    setIsProfileComplete(true)
    setShowVerificationAlert(true)
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
                <div className="flex justify-between items-center mb-8">
                  <h1 className="text-2xl font-bold">Organization Profile</h1>
                  {!isEditing && !isProfileComplete ? (
                    <button
                      onClick={handleCompleteProfile}
                      className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-200"
                    >
                      Complete Profile
                    </button>
                  ) : !isEditing ? (
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

                {showVerificationAlert && (
                  <div className="mb-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-md">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-blue-400">
                          Profile Submitted for Verification
                        </h3>
                        <div className="mt-2 text-sm text-blue-300">
                          <p>
                            Your NGO profile has been submitted for verification. Our admin team will review your details within 24 hours.
                            You will be notified once your profile is verified.
                          </p>
                        </div>
                        <div className="mt-4">
                          <div className="-mx-2 -my-1.5 flex">
                            <button
                              onClick={() => setShowVerificationAlert(false)}
                              className="bg-blue-500/10 px-2 py-1.5 rounded-md text-sm font-medium text-blue-400 hover:bg-blue-500/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-500/50 focus:ring-blue-500"
                            >
                              Dismiss
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h2 className="text-lg font-medium mb-4">Basic Information</h2>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Organization Name
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
                            Areas Served
                          </label>
                          {isEditing ? (
                            <input
                              type="text"
                              value={profile.areasServed.join(', ')}
                              onChange={(e) => setProfile({ ...profile, areasServed: e.target.value.split(', ') })}
                              className="w-full px-4 py-2 bg-gray-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          ) : (
                            <div className="flex flex-wrap gap-2">
                              {profile.areasServed.map((area, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 bg-gray-700 rounded-full text-xs text-gray-300"
                                >
                                  {area}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-lg font-medium mb-4">About</h2>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Description
                      </label>
                      {isEditing ? (
                        <textarea
                          value={profile.description}
                          onChange={(e) => setProfile({ ...profile, description: e.target.value })}
                          className="w-full px-4 py-2 bg-gray-800 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          rows={4}
                        />
                      ) : (
                        <p className="text-gray-400">{profile.description}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-800 rounded-lg p-6">
                      <h3 className="text-lg font-medium mb-2">Total Deliveries</h3>
                      <p className="text-3xl font-bold text-white">{profile.totalDeliveries}</p>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-6">
                      <h3 className="text-lg font-medium mb-2">Active Volunteers</h3>
                      <p className="text-3xl font-bold text-white">{profile.activeVolunteers}</p>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-6">
                      <h3 className="text-lg font-medium mb-2">Total Beneficiaries</h3>
                      <p className="text-3xl font-bold text-white">{profile.totalBeneficiaries}</p>
                    </div>
                  </div>

                  <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-lg font-medium mb-2">Organization Rating</h3>
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