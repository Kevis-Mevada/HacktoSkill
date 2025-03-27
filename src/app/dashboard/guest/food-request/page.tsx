'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/navigation/Navbar'
import Link from 'next/link'

const mockNGOs = [
  {
    id: 1,
    name: 'Food Bank A',
    location: '123 Main St, City',
    rating: 4.8,
    distance: '0.5 km',
    coordinates: { lat: 12.9716, lng: 77.5946 },
    description: 'Serving the community with fresh meals and food packages.',
    operatingHours: '9:00 AM - 6:00 PM',
    availableFood: ['Rice', 'Vegetables', 'Fruits', 'Bread'],
    contact: '+91 98765 43210'
  },
  {
    id: 2,
    name: 'Community Kitchen',
    location: '456 Community Ave, City',
    rating: 4.5,
    distance: '1.2 km',
    coordinates: { lat: 12.9783, lng: 77.6408 },
    description: 'Community-driven kitchen providing hot meals to those in need.',
    operatingHours: '10:00 AM - 8:00 PM',
    availableFood: ['Hot Meals', 'Snacks', 'Water', 'Fruits'],
    contact: '+91 98765 43211'
  },
  {
    id: 3,
    name: 'Hope Food Center',
    location: '789 Hope St, City',
    rating: 4.9,
    distance: '2.0 km',
    coordinates: { lat: 12.9516, lng: 77.5991 },
    description: 'Dedicated to providing nutritious food to families in need.',
    operatingHours: '8:00 AM - 7:00 PM',
    availableFood: ['Groceries', 'Fresh Produce', 'Dairy', 'Canned Food'],
    contact: '+91 98765 43212'
  },
]

export default function FoodRequest() {
  const [formData, setFormData] = useState({
    ngoId: '',
    numberOfPeople: 1,
    preferredTime: '',
    specialRequirements: '',
  })
  const [selectedNGO, setSelectedNGO] = useState<typeof mockNGOs[0] | null>(null)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [locationError, setLocationError] = useState('')
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)
  const [searchRadius, setSearchRadius] = useState(5) // Default 5km radius

  // Function to calculate distance between two points
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371 // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLon = (lon2 - lon1) * Math.PI / 180
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return R * c
  }

  // Function to get user's location
  const getUserLocation = () => {
    setIsLoadingLocation(true)
    setLocationError('')

    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser')
      setIsLoadingLocation(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
        setIsLoadingLocation(false)
      },
      (error) => {
        setLocationError('Unable to retrieve your location')
        setIsLoadingLocation(false)
      }
    )
  }

  // Filter NGOs based on distance
  const filteredNGOs = userLocation
    ? mockNGOs
        .map(ngo => ({
          ...ngo,
          distance: calculateDistance(
            userLocation.lat,
            userLocation.lng,
            ngo.coordinates.lat,
            ngo.coordinates.lng
          ).toFixed(1)
        }))
        .filter(ngo => parseFloat(ngo.distance) <= searchRadius)
        .sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))
    : mockNGOs

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Add form submission logic here
    console.log('Form submitted:', formData)
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
                    href="/dashboard/guest/profile"
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
                    href="/dashboard/guest/history"
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
                    href="/dashboard/guest/food-request"
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
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span>Food Request</span>
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
                <h1 className="text-2xl font-bold mb-8">Request Food</h1>

                {/* Location Section */}
                <div className="mb-8 p-6 bg-gray-800 rounded-lg">
                  <h2 className="text-lg font-medium mb-4">Your Location</h2>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={getUserLocation}
                        disabled={isLoadingLocation}
                        className="flex items-center space-x-2 px-4 py-2 bg-white text-black rounded-md hover:bg-gray-200 transition-colors duration-200 disabled:opacity-50"
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
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span>{isLoadingLocation ? 'Getting Location...' : 'Get Current Location'}</span>
                      </button>
                      {userLocation && (
                        <span className="text-sm text-gray-400">
                          Location found: {userLocation.lat.toFixed(6)}, {userLocation.lng.toFixed(6)}
                        </span>
                      )}
                    </div>
                    {locationError && (
                      <p className="text-sm text-red-400">{locationError}</p>
                    )}
                    <div className="flex items-center space-x-4">
                      <label className="text-sm text-gray-300">Search Radius:</label>
                      <select
                        value={searchRadius}
                        onChange={(e) => setSearchRadius(Number(e.target.value))}
                        className="px-3 py-1 bg-gray-700 border border-gray-600 rounded-md text-white"
                      >
                        <option value="1">1 km</option>
                        <option value="2">2 km</option>
                        <option value="5">5 km</option>
                        <option value="10">10 km</option>
                        <option value="20">20 km</option>
                      </select>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Select NGO
                    </label>
                    <select
                      value={formData.ngoId}
                      onChange={(e) => {
                        setFormData({ ...formData, ngoId: e.target.value })
                        const selected = filteredNGOs.find(ngo => ngo.id.toString() === e.target.value)
                        setSelectedNGO(selected || null)
                      }}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
                    >
                      <option value="">Choose an NGO</option>
                      {filteredNGOs.map((ngo) => (
                        <option key={ngo.id} value={ngo.id}>
                          {ngo.name} ({ngo.distance} km)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Number of People
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={formData.numberOfPeople}
                      onChange={(e) => setFormData({ ...formData, numberOfPeople: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Preferred Time
                    </label>
                    <input
                      type="datetime-local"
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Special Requirements
                    </label>
                    <textarea
                      value={formData.specialRequirements}
                      onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
                      rows={4}
                      placeholder="Any dietary restrictions or special needs..."
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2 bg-white text-black rounded-md hover:bg-gray-200 transition-colors duration-200"
                    >
                      Submit Request
                    </button>
                  </div>
                </form>

                {/* Available NGOs Section */}
                <div className="mt-12">
                  <h2 className="text-xl font-bold mb-6">Available NGOs</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredNGOs.map((ngo) => (
                      <motion.div
                        key={ngo.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`bg-gray-800 rounded-lg p-6 cursor-pointer transition-colors duration-200 ${
                          selectedNGO?.id === ngo.id ? 'ring-2 ring-white' : 'hover:bg-gray-700'
                        }`}
                        onClick={() => {
                          setSelectedNGO(ngo)
                          setFormData({ ...formData, ngoId: ngo.id.toString() })
                        }}
                      >
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="font-medium">{ngo.name}</h3>
                          <div className="flex items-center">
                            <svg
                              className="w-5 h-5 text-yellow-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.363 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="ml-1 text-sm text-gray-300">{ngo.rating}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm text-gray-400 flex items-center">
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                            {ngo.location} ({ngo.distance} km)
                          </p>
                          <p className="text-sm text-gray-400 flex items-center">
                            <svg
                              className="w-4 h-4 mr-1"
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
                            {ngo.operatingHours}
                          </p>
                          <p className="text-sm text-gray-400 flex items-center">
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                              />
                            </svg>
                            {ngo.contact}
                          </p>
                        </div>
                        <div className="mt-4">
                          <h4 className="text-sm font-medium text-gray-300 mb-2">Available Food:</h4>
                          <div className="flex flex-wrap gap-2">
                            {ngo.availableFood.map((food, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-gray-700 rounded-full text-xs text-gray-300"
                              >
                                {food}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
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