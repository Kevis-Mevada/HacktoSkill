'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { 
  FiClock,
  FiCheck,
  FiX,
  FiUsers,
  FiMapPin,
  FiInfo,
 
  FiCalendar,
  FiAlertCircle,
  FiHome,
  FiClock as FiHistory,

} from 'react-icons/fi'
import Navbar from '@/components/navigation/Navbar'
import { useRouter } from 'next/navigation'

type RequestStatus = 'pending' | 'accepted' | 'rejected' | 'collected'

interface FoodRequest {
  id: string
  donorName: string
  donorEmail: string
  donorPhone: string
  address: string
  cookingTime: string
  foodDescription: string
  quantity: string
  status: RequestStatus
  requestTime: string
  distance: string
  photo?: string
  specialNotes?: string
}

export default function PendingRequests() {
  const router = useRouter()
  const [requests, setRequests] = useState<FoodRequest[]>([
    {
      id: 'req1',
      donorName: 'Rahul Sharma',
      donorEmail: 'rahul.sharma@example.com',
      donorPhone: '+91 9876543210',
      address: '123 Main Street, Mumbai',
      cookingTime: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
      foodDescription: 'Vegetable biryani, chapati, dal - freshly cooked, vegetarian',
      quantity: 'Serves 8-10 people',
      status: 'pending',
      requestTime: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
      distance: '1.2 km',
      photo: '/food.jpg',
      specialNotes: 'No onion or garlic please'
    },
    {
      id: 'req2',
      donorName: 'Priya Patel',
      donorEmail: 'priya.patel@example.com',
      donorPhone: '+91 9876543211',
      address: '456 Park Road, Mumbai',
      cookingTime: new Date(Date.now() - 1800000).toISOString(), // 30 mins ago
      foodDescription: 'Rice, sambar, vegetable curry, curd',
      quantity: 'Serves 5-6 people',
      status: 'pending',
      requestTime: new Date(Date.now() - 5400000).toISOString(), // 1.5 hours ago
      distance: '2.5 km'
    },
    {
      id: 'req3',
      donorName: 'Amit Kumar',
      donorEmail: 'amit.kumar@example.com',
      donorPhone: '+91 9876543212',
      address: '789 Garden Lane, Mumbai',
      cookingTime: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
      foodDescription: 'Pav bhaji with extra butter, salad',
      quantity: 'Serves 12-15 people',
      status: 'accepted',
      requestTime: new Date(Date.now() - 10800000).toISOString(), // 3 hours ago
      distance: '3.1 km',
      photo: '/food.jpg'
    }
  ])

  const [selectedRequest, setSelectedRequest] = useState<FoodRequest | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'pending' | 'accepted'>('pending')

  const filteredRequests = requests.filter(request => 
    activeTab === 'pending' ? request.status === 'pending' : request.status === 'accepted'
  )

  const handleAccept = async (requestId: string) => {
    setIsLoading(true)
    setError(null)

    try {
      // Simulate API call to accept request
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setRequests(requests.map(req => 
        req.id === requestId ? { ...req, status: 'accepted' } : req
      ))
      
      // Redirect to volunteers page with the request ID
      router.push(`/dashboard/ngo/volunteers?assignTo=${requestId}`)
    } catch {
      setError('Failed to accept request. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleReject = async (requestId: string) => {
    setIsLoading(true)
    setError(null)

    try {
      // Simulate API call to reject request
      await new Promise(resolve => setTimeout(resolve, 1000))
      setRequests(requests.map(req => 
        req.id === requestId ? { ...req, status: 'rejected' } : req
      ))
    } catch  {
      setError('Failed to reject request. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleMarkAsCollected = async (requestId: string) => {
    setIsLoading(true)
    setError(null)

    try {
      // Simulate API call to mark as collected
      await new Promise(resolve => setTimeout(resolve, 1000))
      setRequests(requests.map(req => 
        req.id === requestId ? { ...req, status: 'collected' } : req
      ))
    } catch  {
      setError('Failed to update status. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString([], { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    })
  }

  const getTimeSince = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
    
    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
    return `${Math.floor(diffInSeconds / 86400)} days ago`
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
                    <FiHistory className="w-5 h-5" />
                    <span>History</span>
                  </Link>
                  <Link
                    href="/dashboard/ngo/pending-requests"
                    className="flex items-center space-x-3 px-3 py-2 md:px-4 md:py-3 rounded-lg bg-blue-500 text-white text-sm md:text-base"
                  >
                    <FiClock className="w-5 h-5" />
                    <span>Pending Requests</span>
                  </Link>
                  
                  <Link
                    href="/dashboard/ngo/volunteers"
                    className="flex items-center space-x-3 px-3 py-2 md:px-4 md:py-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white text-sm md:text-base"
                  >
                    <FiUsers className="w-5 h-5" />
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <h1 className="text-2xl md:text-3xl font-bold mb-2">Food Donation Requests</h1>
                <p className="text-gray-400">
                  Manage incoming food donation requests from donors
                </p>
              </motion.div>

              {/* Tabs */}
              <div className="flex border-b border-gray-700 mb-6">
                <button
                  onClick={() => setActiveTab('pending')}
                  className={`px-4 py-2 font-medium text-sm md:text-base ${
                    activeTab === 'pending'
                      ? 'text-blue-400 border-b-2 border-blue-400'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Pending Requests
                </button>
                <button
                  onClick={() => setActiveTab('accepted')}
                  className={`px-4 py-2 font-medium text-sm md:text-base ${
                    activeTab === 'accepted'
                      ? 'text-green-400 border-b-2 border-green-400'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Accepted Requests
                </button>
              </div>

              {/* Request List */}
              <div className="grid grid-cols-1 gap-4 md:gap-6">
                {filteredRequests.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-gray-800/50 rounded-xl p-8 text-center border border-gray-700/50"
                  >
                    <FiAlertCircle className="mx-auto h-12 w-12 text-gray-500 mb-4" />
                    <h3 className="text-lg font-medium text-gray-300 mb-1">
                      No {activeTab} requests
                    </h3>
                    <p className="text-gray-500 text-sm">
                      {activeTab === 'pending'
                        ? 'All pending requests have been processed'
                        : 'No accepted requests at the moment'}
                    </p>
                  </motion.div>
                ) : (
                  <AnimatePresence>
                    {filteredRequests.map((request) => (
                      <motion.div
                        key={request.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className={`bg-gray-800/80 backdrop-blur-lg rounded-xl overflow-hidden border ${
                          request.status === 'pending'
                            ? 'border-blue-500/30 hover:border-blue-500/50'
                            : 'border-green-500/30 hover:border-green-500/50'
                        } transition-colors duration-200`}
                      >
                        <div className="p-4 md:p-6">
                          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                            {request.photo && (
                              <div className="relative w-full md:w-48 h-48 rounded-lg overflow-hidden flex-shrink-0">
                                <Image
                                  src={request.photo}
                                  alt="Food donation"
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            )}

                            <div className="flex-1">
                              <div className="flex justify-between items-start mb-2">
                                <h3 className="text-lg md:text-xl font-semibold">
                                  {request.donorName}
                                </h3>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  request.status === 'pending'
                                    ? 'bg-blue-500/20 text-blue-400'
                                    : 'bg-green-500/20 text-green-400'
                                }`}>
                                  {request.status === 'pending' ? 'Pending' : 'Accepted'}
                                </span>
                              </div>

                              <p className="text-gray-300 mb-4">{request.foodDescription}</p>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="flex items-center text-gray-400">
                                  <FiUsers className="mr-2" />
                                  <span>{request.quantity}</span>
                                </div>
                                <div className="flex items-center text-gray-400">
                                  <FiClock className="mr-2" />
                                  <span>Cooked at {formatTime(request.cookingTime)}</span>
                                </div>
                                <div className="flex items-center text-gray-400">
                                  <FiMapPin className="mr-2" />
                                  <span>{request.distance} away</span>
                                </div>
                                <div className="flex items-center text-gray-400">
                                  <FiCalendar className="mr-2" />
                                  <span>{getTimeSince(request.requestTime)}</span>
                                </div>
                              </div>

                              {request.specialNotes && (
                                <div className="bg-gray-700/50 rounded-lg p-3 mb-4">
                                  <div className="flex items-start">
                                    <FiInfo className="text-yellow-400 mt-0.5 mr-2 flex-shrink-0" />
                                    <p className="text-sm text-yellow-100">{request.specialNotes}</p>
                                  </div>
                                </div>
                              )}

                              <div className="flex flex-wrap gap-3 mt-4">
                                {request.status === 'pending' ? (
                                  <>
                                    <button
                                      onClick={() => handleAccept(request.id)}
                                      disabled={isLoading}
                                      className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center transition-colors duration-200 disabled:opacity-50"
                                    >
                                      <FiCheck className="mr-2" />
                                      Accept Request
                                    </button>
                                    <button
                                      onClick={() => handleReject(request.id)}
                                      disabled={isLoading}
                                      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center transition-colors duration-200 disabled:opacity-50"
                                    >
                                      <FiX className="mr-2" />
                                      Reject Request
                                    </button>
                                  </>
                                ) : (
                                  <button
                                    onClick={() => handleMarkAsCollected(request.id)}
                                    disabled={isLoading}
                                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center transition-colors duration-200 disabled:opacity-50"
                                  >
                                    <FiCheck className="mr-2" />
                                    Mark as Collected
                                  </button>
                                )}

                                <button
                                  onClick={() => setSelectedRequest(request)}
                                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg flex items-center transition-colors duration-200"
                                >
                                  <FiInfo className="mr-2" />
                                  View Details
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Request Details Modal */}
      <AnimatePresence>
        {selectedRequest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedRequest(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-bold">Donation Details</h2>
                  <button
                    onClick={() => setSelectedRequest(null)}
                    className="text-gray-400 hover:text-white"
                  >
                    <FiX className="h-6 w-6" />
                  </button>
                </div>

                {selectedRequest.photo && (
                  <div className="relative w-full h-48 md:h-64 rounded-lg overflow-hidden mb-6">
                    <Image
                      src={selectedRequest.photo}
                      alt="Food donation"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Donor Information</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-400">Name</p>
                        <p className="text-white">{selectedRequest.donorName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Email</p>
                        <p className="text-white">{selectedRequest.donorEmail}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Phone</p>
                        <p className="text-white">{selectedRequest.donorPhone}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Donation Details</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-400">Address</p>
                        <p className="text-white">{selectedRequest.address}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Cooking Time</p>
                        <p className="text-white">
                          {formatTime(selectedRequest.cookingTime)} on {formatDate(selectedRequest.cookingTime)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Quantity</p>
                        <p className="text-white">{selectedRequest.quantity}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Distance</p>
                        <p className="text-white">{selectedRequest.distance}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Food Description</h3>
                  <p className="text-gray-300">{selectedRequest.foodDescription}</p>
                </div>

                {selectedRequest.specialNotes && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">Special Notes</h3>
                    <p className="text-yellow-100">{selectedRequest.specialNotes}</p>
                  </div>
                )}

                <div className="mt-8 flex justify-end gap-3">
                  {selectedRequest.status === 'pending' ? (
                    <>
                      <button
                        onClick={() => {
                          handleAccept(selectedRequest.id)
                          setSelectedRequest(null)
                        }}
                        className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center transition-colors duration-200"
                      >
                        <FiCheck className="mr-2" />
                        Accept Request
                      </button>
                      <button
                        onClick={() => {
                          handleReject(selectedRequest.id)
                          setSelectedRequest(null)
                        }}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg flex items-center transition-colors duration-200"
                      >
                        <FiX className="mr-2" />
                        Reject Request
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        handleMarkAsCollected(selectedRequest.id)
                        setSelectedRequest(null)
                      }}
                      className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center transition-colors duration-200"
                    >
                      <FiCheck className="mr-2" />
                      Mark as Collected
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}