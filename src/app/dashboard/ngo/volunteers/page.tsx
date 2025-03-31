'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/navigation/Navbar'
import Link from 'next/link'

const mockVolunteers = [
  {
    id: 1,
    name: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    phone: '+91 98765 43213',
    location: '123 Main St, City',
    availability: 'Weekdays, 9 AM - 5 PM',
    skills: ['Driving', 'Cooking', 'Organization'],
    experience: '2 years of volunteering',
    status: 'active',
    joinDate: '2024-01-15',
    totalDeliveries: 25,
    rating: 4.8,
  },
  {
    id: 2,
    name: 'Mike Brown',
    email: 'mike.brown@example.com',
    phone: '+91 98765 43214',
    location: '456 Community Ave, City',
    availability: 'Weekends, 10 AM - 6 PM',
    skills: ['Communication', 'First Aid', 'Team Leadership'],
    experience: '1 year of volunteering',
    status: 'active',
    joinDate: '2024-02-01',
    totalDeliveries: 15,
    rating: 4.9,
  },
  {
    id: 3,
    name: 'Lisa Chen',
    email: 'lisa.chen@example.com',
    phone: '+91 98765 43215',
    location: '789 Hope St, City',
    availability: 'Flexible',
    skills: ['Multilingual', 'Event Planning', 'Social Media'],
    experience: '3 years of volunteering',
    status: 'pending',
    applicationDate: '2024-03-15',
    notes: 'Speaks Mandarin and English',
  },
  {
    id: 4,
    name: 'David Kumar',
    email: 'david.kumar@example.com',
    phone: '+91 98765 43216',
    location: '321 Service Rd, City',
    availability: 'Evenings, 6 PM - 10 PM',
    skills: ['Logistics', 'Problem Solving', 'Training'],
    experience: '5 years of volunteering',
    status: 'inactive',
    joinDate: '2023-06-01',
    totalDeliveries: 45,
    rating: 4.7,
    lastActive: '2024-02-15',
  },
]

export default function Volunteers() {
  const [filter, setFilter] = useState<'all' | 'active' | 'pending' | 'inactive'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredVolunteers = mockVolunteers.filter(
    (volunteer) =>
      (filter === 'all' || volunteer.status === filter) &&
      (searchQuery === '' ||
        volunteer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        volunteer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        volunteer.location.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const handleStatusUpdate = (volunteerId: number, newStatus: string) => {
    // Add status update logic here
    console.log('Updating volunteer status:', volunteerId, newStatus)
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
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                  <h1 className="text-2xl font-bold">Volunteers</h1>
                  <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                    <input
                      type="text"
                      placeholder="Search volunteers..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="px-4 py-2 bg-gray-800 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setFilter('all')}
                        className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                          filter === 'all'
                            ? 'bg-white text-black'
                            : 'bg-gray-800 text-white hover:bg-gray-700'
                        }`}
                      >
                        All
                      </button>
                      <button
                        onClick={() => setFilter('active')}
                        className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                          filter === 'active'
                            ? 'bg-white text-black'
                            : 'bg-gray-800 text-white hover:bg-gray-700'
                        }`}
                      >
                        Active
                      </button>
                      <button
                        onClick={() => setFilter('pending')}
                        className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                          filter === 'pending'
                            ? 'bg-white text-black'
                            : 'bg-gray-800 text-white hover:bg-gray-700'
                        }`}
                      >
                        Pending
                      </button>
                      <button
                        onClick={() => setFilter('inactive')}
                        className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                          filter === 'inactive'
                            ? 'bg-white text-black'
                            : 'bg-gray-800 text-white hover:bg-gray-700'
                        }`}
                      >
                        Inactive
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {filteredVolunteers.map((volunteer) => (
                    <motion.div
                      key={volunteer.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gray-800 rounded-lg p-6"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-medium">{volunteer.name}</h3>
                          <p className="text-sm text-gray-400">{volunteer.email}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span
                            className={`px-3 py-1 rounded-full text-sm ${
                              volunteer.status === 'active'
                                ? 'bg-green-500/20 text-green-400'
                                : volunteer.status === 'pending'
                                ? 'bg-yellow-500/20 text-yellow-400'
                                : 'bg-red-500/20 text-red-400'
                            }`}
                          >
                            {volunteer.status.charAt(0).toUpperCase() + volunteer.status.slice(1)}
                          </span>
                          {volunteer.status === 'pending' && (
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleStatusUpdate(volunteer.id, 'active')}
                                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-200"
                              >
                                Accept
                              </button>
                              <button
                                onClick={() => handleStatusUpdate(volunteer.id, 'inactive')}
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200"
                              >
                                Reject
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-sm font-medium text-gray-300 mb-2">Contact Information</h4>
                          <div className="space-y-2">
                            <p className="text-sm text-gray-400">
                              <span className="font-medium">Phone:</span> {volunteer.phone}
                            </p>
                            <p className="text-sm text-gray-400">
                              <span className="font-medium">Location:</span> {volunteer.location}
                            </p>
                            <p className="text-sm text-gray-400">
                              <span className="font-medium">Availability:</span> {volunteer.availability}
                            </p>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-medium text-gray-300 mb-2">Volunteer Details</h4>
                          <div className="space-y-2">
                            <p className="text-sm text-gray-400">
                              <span className="font-medium">Experience:</span> {volunteer.experience}
                            </p>
                            {volunteer.status === 'active' && (
                              <>
                                <p className="text-sm text-gray-400">
                                  <span className="font-medium">Total Deliveries:</span>{' '}
                                  {volunteer.totalDeliveries}
                                </p>
                                <p className="text-sm text-gray-400">
                                  <span className="font-medium">Rating:</span> {volunteer.rating}/5
                                </p>
                              </>
                            )}
                            {volunteer.status === 'inactive' && (
                              <p className="text-sm text-gray-400">
                                <span className="font-medium">Last Active:</span>{' '}
                                {volunteer.lastActive ? new Date(volunteer.lastActive).toLocaleDateString() : 'N/A'}
                              </p>
                            )}
                            {volunteer.status === 'pending' && (
                              <p className="text-sm text-gray-400">
                                <span className="font-medium">Applied on:</span>{' '}
                                {volunteer.applicationDate ? new Date(volunteer.applicationDate).toLocaleDateString() : 'N/A'}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="mt-6">
                        <h4 className="text-sm font-medium text-gray-300 mb-2">Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {volunteer.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-700 rounded-full text-xs text-gray-300"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                        {volunteer.notes && (
                          <p className="mt-2 text-sm text-gray-400">
                            <span className="font-medium">Notes:</span> {volunteer.notes}
                          </p>
                        )}
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