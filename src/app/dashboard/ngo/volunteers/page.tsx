'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/navigation/Navbar'
import Link from 'next/link'
import { FiHome, FiClock, FiMapPin, FiUser, FiPhone} from 'react-icons/fi'

const mockVolunteers = [
  {
    id: 1,
    name: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    phone: '+91 98765 43213',
    location: '123 Main St, City',
    availability: 'Weekdays, 9 AM - 5 PM',
    skills: ['Driving', 'Food Handling', 'Organization'],
    status: 'active',
    currentAssignments: 2,
    rating: 4.8,
    distanceToDonor: '1.2 km',
    vehicle: 'Car'
  },
  {
    id: 2,
    name: 'Mike Brown',
    email: 'mike.brown@example.com',
    phone: '+91 98765 43214',
    location: '456 Community Ave, City',
    availability: 'Weekends, 10 AM - 6 PM',
    skills: ['Heavy Lifting', 'First Aid', 'Navigation'],
    status: 'active',
    currentAssignments: 1,
    rating: 4.9,
    distanceToDonor: '2.5 km',
    vehicle: 'Bike'
  },
  {
    id: 3,
    name: 'Lisa Chen',
    email: 'lisa.chen@example.com',
    phone: '+91 98765 43215',
    location: '789 Hope St, City',
    availability: 'Flexible',
    skills: ['Multilingual', 'Cold Storage', 'Time Management'],
    status: 'active',
    currentAssignments: 0,
    rating: 4.7,
    distanceToDonor: '3.1 km',
    vehicle: 'Scooter'
  }
]

const mockPendingRequests = [
  {
    id: 1,
    donorName: 'Rahul Sharma',
    donorLocation: '123 Main Street, Mumbai',
    foodDescription: 'Vegetable biryani, chapati, dal - freshly cooked, vegetarian',
    quantity: 'Serves 8-10 people',
    pickupTime: '2024-03-20T14:00',
    specialRequirements: 'No onion or garlic please',
    status: 'unassigned'
  },
  {
    id: 2,
    donorName: 'Priya Patel',
    donorLocation: '456 Park Road, Mumbai',
    foodDescription: 'Rice, sambar, vegetable curry, curd',
    quantity: 'Serves 5-6 people',
    pickupTime: '2024-03-20T15:30',
    specialRequirements: 'Vegetarian only',
    status: 'assigned',
    assignedVolunteer: 'Sarah Wilson'
  }
]

export default function Volunteers() {
  const [selectedRequest, setSelectedRequest] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [assignmentStatus, setAssignmentStatus] = useState<'idle' | 'assigning' | 'success' | 'error'>('idle')

  const filteredVolunteers = mockVolunteers.filter(volunteer =>
    searchQuery === '' ||
    volunteer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    volunteer.location.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAssignVolunteer = (requestId: number, volunteerId: number) => {
    setAssignmentStatus('assigning')
    // Simulate API call
    setTimeout(() => {
      const request = mockPendingRequests.find(req => req.id === requestId)
      const volunteer = mockVolunteers.find(vol => vol.id === volunteerId)
      
      if (request && volunteer) {
        request.status = 'assigned'
        request.assignedVolunteer = volunteer.name
        setAssignmentStatus('success')
        setTimeout(() => setAssignmentStatus('idle'), 2000)
      } else {
        setAssignmentStatus('error')
        setTimeout(() => setAssignmentStatus('idle'), 2000)
      }
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      
      <div className="pt-24 md:pt-32 pb-16 px-4 sm:px-6 lg:px-8">
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
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span>Volunteers</span>
                  </Link>
                </div>
                <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-gray-700">
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
                className="bg-gray-800 rounded-lg p-6"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                  <h1 className="text-2xl font-bold">Volunteer Assignment</h1>
                  <input
                    type="text"
                    placeholder="Search volunteers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="px-4 py-2 bg-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Assignment Status Message */}
                {assignmentStatus === 'assigning' && (
                  <div className="mb-6 p-4 bg-blue-500/20 text-blue-400 rounded-lg">
                    Assigning volunteer, please wait...
                  </div>
                )}
                {assignmentStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-500/20 text-green-400 rounded-lg">
                    Volunteer assigned successfully!
                  </div>
                )}
                {assignmentStatus === 'error' && (
                  <div className="mb-6 p-4 bg-red-500/20 text-red-400 rounded-lg">
                    Error assigning volunteer. Please try again.
                  </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Pending Requests Section */}
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Pending Food Collections</h2>
                    <div className="space-y-4">
                      {mockPendingRequests.map(request => (
                        <motion.div
                          key={request.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`bg-gray-700 rounded-lg p-4 border ${
                            request.status === 'assigned' ? 'border-green-500/30' : 'border-yellow-500/30'
                          }`}
                        >
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="font-medium">{request.donorName}</h3>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              request.status === 'assigned' 
                                ? 'bg-green-500/20 text-green-400' 
                                : 'bg-yellow-500/20 text-yellow-400'
                            }`}>
                              {request.status === 'assigned' ? 'Assigned' : 'Unassigned'}
                            </span>
                          </div>
                          
                          <div className="space-y-2 text-sm text-gray-300">
                            <p><span className="font-medium">Food:</span> {request.foodDescription}</p>
                            <p><span className="font-medium">Quantity:</span> {request.quantity}</p>
                            <p className="flex items-center">
                              <FiMapPin className="mr-1" />
                              {request.donorLocation}
                            </p>
                            <p className="flex items-center">
                              <FiClock className="mr-1" />
                              Pickup by: {new Date(request.pickupTime).toLocaleString()}
                            </p>
                            {request.specialRequirements && (
                              <p><span className="font-medium">Notes:</span> {request.specialRequirements}</p>
                            )}
                            {request.status === 'assigned' && (
                              <p className="text-green-400 flex items-center">
                                <FiUser className="mr-1" />
                                Assigned to: {request.assignedVolunteer}
                              </p>
                            )}
                          </div>

                          {request.status === 'unassigned' && (
                            <button
                              onClick={() => setSelectedRequest(request.id)}
                              className="mt-3 w-full py-2 bg-blue-500 hover:bg-blue-600 rounded-md transition-colors"
                            >
                              Assign Volunteer
                            </button>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Volunteers Section */}
                  <div>
                    <h2 className="text-xl font-semibold mb-4">
                      {selectedRequest ? 'Available Volunteers' : 'All Volunteers'}
                      {selectedRequest && (
                        <button 
                          onClick={() => setSelectedRequest(null)}
                          className="ml-2 text-sm text-gray-400 hover:text-white"
                        >
                          (Cancel selection)
                        </button>
                      )}
                    </h2>
                    
                    <div className="space-y-4">
                      {filteredVolunteers.length > 0 ? (
                        filteredVolunteers.map(volunteer => (
                          <motion.div
                            key={volunteer.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gray-700 rounded-lg p-4"
                          >
                            <div className="flex justify-between items-start mb-3">
                              <h3 className="font-medium">{volunteer.name}</h3>
                              <span className="px-2 py-1 text-xs bg-green-500/20 text-green-400 rounded-full">
                                {volunteer.status.charAt(0).toUpperCase() + volunteer.status.slice(1)}
                              </span>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-2 text-sm text-gray-300 mb-3">
                              <p className="flex items-center">
                                <FiPhone className="mr-1" /> {volunteer.phone}
                              </p>
                              <p className="flex items-center">
                                <FiMapPin className="mr-1" /> {volunteer.distanceToDonor} away
                              </p>
                              <p className="flex items-center">
                                <FiClock className="mr-1" /> {volunteer.availability}
                              </p>
                              <p>🚗 {volunteer.vehicle}</p>
                            </div>
                            
                            <div className="mb-3">
                              <h4 className="text-xs font-medium text-gray-400 mb-1">Skills</h4>
                              <div className="flex flex-wrap gap-1">
                                {volunteer.skills.map((skill, i) => (
                                  <span key={i} className="px-2 py-0.5 bg-gray-600 text-xs rounded-full">
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                            
                            <div className="flex justify-between items-center text-sm">
                              <span>⭐ {volunteer.rating}/5</span>
                              <span>{volunteer.currentAssignments} current assignments</span>
                            </div>
                            
                            {selectedRequest && (
                              <button
                                onClick={() => handleAssignVolunteer(selectedRequest, volunteer.id)}
                                className="mt-3 w-full py-2 bg-green-500 hover:bg-green-600 rounded-md transition-colors"
                              >
                                Assign to This Request
                              </button>
                            )}
                          </motion.div>
                        ))
                      ) : (
                        <div className="bg-gray-700 rounded-lg p-6 text-center">
                          <p className="text-gray-400">No volunteers found matching your search</p>
                        </div>
                      )}
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