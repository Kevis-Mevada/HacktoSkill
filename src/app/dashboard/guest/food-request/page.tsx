'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

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
  const router = useRouter()
  const [formData, setFormData] = useState({
    quantity: '',
    description: '',
    pickupTime: '',
  })
  const [selectedNGO, setSelectedNGO] = useState<typeof mockNGOs[0] | null>(null)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [locationError, setLocationError] = useState('')
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)
  const [searchRadius, setSearchRadius] = useState(5) // Default 5km radius
  const [isLoading, setIsLoading] = useState(false)

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
      () => {  // Remove 'err' and just leave the error handler function
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Add your food request logic here
      await new Promise(resolve => setTimeout(resolve, 1000))
      router.push('/dashboard/guest')
    } catch  {
      // Handle error
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Request Food</h1>
          <button
            onClick={() => router.push('/dashboard/guest')}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800 rounded-lg p-6 shadow-lg"
            >
              <h2 className="text-xl font-semibold text-white mb-6">Food Request Details</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Select NGO
                  </label>
                  <select
                    value={selectedNGO?.id.toString() || ''}
                    onChange={(e) => {
                      const selected = filteredNGOs.find(ngo => ngo.id.toString() === e.target.value)
                      setSelectedNGO(selected || null)
                    }}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    Quantity
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Number of people"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    placeholder="Any dietary restrictions or special needs..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Pickup Time
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.pickupTime}
                    onChange={(e) => setFormData({ ...formData, pickupTime: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50"
                  >
                    {isLoading ? 'Submitting...' : 'Submit Request'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>

          {/* Location and NGO List */}
          <div className="space-y-6">
            {/* Location Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gray-800 rounded-lg p-6 shadow-lg"
            >
              <h2 className="text-xl font-semibold text-white mb-4">Your Location</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={getUserLocation}
                    disabled={isLoadingLocation}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50"
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
            </motion.div>

            {/* Available NGOs Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-800 rounded-lg p-6 shadow-lg"
            >
              <h2 className="text-xl font-semibold text-white mb-4">Available NGOs</h2>
              <div className="space-y-4">
                {filteredNGOs.map((ngo) => (
                  <div
                    key={ngo.id}
                    className={`p-4 rounded-lg cursor-pointer transition-colors duration-200 ${
                      selectedNGO?.id === ngo.id
                        ? 'bg-blue-500/20 border border-blue-500'
                        : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                    onClick={() => setSelectedNGO(ngo)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-white">{ngo.name}</h3>
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
                    <div className="space-y-1">
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
                    </div>
                    <div className="mt-2">
                      <div className="flex flex-wrap gap-1">
                        {ngo.availableFood.map((food, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-600 rounded-full text-xs text-gray-300"
                          >
                            {food}
                          </span>
                        ))}
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
  )
} 