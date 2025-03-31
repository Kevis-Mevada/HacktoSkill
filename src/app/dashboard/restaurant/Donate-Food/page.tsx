'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/navigation/Navbar'
import Link from 'next/link'

// Mock data for available food items
const mockFoodItems = [
  {
    id: 1,
    name: 'Rice',
    quantity: '5 kg',
    expiryDate: '2024-03-25',
    description: 'Fresh basmati rice',
    status: 'available',
  },
  {
    id: 2,
    name: 'Vegetables',
    quantity: '2 kg',
    expiryDate: '2024-03-24',
    description: 'Mixed vegetables',
    status: 'available',
  },
  {
    id: 3,
    name: 'Bread',
    quantity: '10 pieces',
    expiryDate: '2024-03-23',
    description: 'Fresh baked bread',
    status: 'available',
  },
]

// Mock data for nearby NGOs
const mockNGOs = [
  {
    id: 1,
    name: 'Food Bank India',
    location: 'Mumbai, Maharashtra',
    rating: 4.8,
    totalDeliveries: 150,
    distance: '2.5 km',
  },
  {
    id: 2,
    name: 'Helping Hands Foundation',
    location: 'Mumbai, Maharashtra',
    rating: 4.6,
    totalDeliveries: 120,
    distance: '3.1 km',
  },
  {
    id: 3,
    name: 'Share Food Foundation',
    location: 'Mumbai, Maharashtra',
    rating: 4.9,
    totalDeliveries: 180,
    distance: '4.2 km',
  },
]

export default function FoodRequest() {
  const [selectedFoodItems, setSelectedFoodItems] = useState<number[]>([])
  const [selectedNGO, setSelectedNGO] = useState<number | null>(null)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)

  const handleFoodSelection = (foodId: number) => {
    setSelectedFoodItems(prev =>
      prev.includes(foodId)
        ? prev.filter(id => id !== foodId)
        : [...prev, foodId]
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Add request submission logic here
    setShowSuccessAlert(true)
    setTimeout(() => setShowSuccessAlert(false), 3000)
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
                    href="/dashboard/restaurant/food-request"
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-gray-800 text-white"
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
                <h1 className="text-2xl font-bold mb-8">Donate Food</h1>

                {showSuccessAlert && (
                  <div className="mb-6 p-4 bg-green-500/20 text-green-400 rounded-lg">
                    Donate Food submitted successfully! An NGO will contact you soon.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Available Food Items */}
                  <div>
                    <h2 className="text-xl font-bold mb-4">Available Food Items</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {mockFoodItems.map((food) => (
                        <div
                          key={food.id}
                          className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                            selectedFoodItems.includes(food.id)
                              ? 'border-blue-500 bg-blue-500/10'
                              : 'border-gray-700 hover:border-gray-600'
                          }`}
                          onClick={() => handleFoodSelection(food.id)}
                        >
                          <h3 className="font-bold mb-2">{food.name}</h3>
                          <p className="text-gray-400 text-sm mb-2">Quantity: {food.quantity}</p>
                          <p className="text-gray-400 text-sm mb-2">Expires: {food.expiryDate}</p>
                          <p className="text-gray-400 text-sm">{food.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Select NGO */}
                  <div>
                    <h2 className="text-xl font-bold mb-4">Select NGO</h2>
                    <div className="space-y-4">
                      {mockNGOs.map((ngo) => (
                        <div
                          key={ngo.id}
                          className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                            selectedNGO === ngo.id
                              ? 'border-blue-500 bg-blue-500/10'
                              : 'border-gray-700 hover:border-gray-600'
                          }`}
                          onClick={() => setSelectedNGO(ngo.id)}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-bold">{ngo.name}</h3>
                              <p className="text-gray-400 text-sm">{ngo.location}</p>
                              <p className="text-gray-400 text-sm">Distance: {ngo.distance}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-yellow-400">★</span>
                              <span>{ngo.rating}</span>
                            </div>
                          </div>
                          <p className="text-gray-400 text-sm mt-2">
                            Total Deliveries: {ngo.totalDeliveries}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={selectedFoodItems.length === 0 || !selectedNGO}
                    className={`w-full py-3 rounded-lg font-medium transition-colors ${
                      selectedFoodItems.length === 0 || !selectedNGO
                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                  >
                    Submit Request
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}