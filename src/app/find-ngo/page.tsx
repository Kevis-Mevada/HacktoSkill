'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/navigation/Navbar'
import Image from 'next/image'
import { useState } from 'react'

// Mock data for NGOs
const mockNGOs = [
  {
    id: 1,
    name: 'Food Bank Foundation',
    location: 'New York, NY',
    description: 'Providing food assistance to communities in need since 2010.',
    rating: 4.8,
    image: '/images/ngos/ngo1.jpg',
    specialties: ['Food Distribution', 'Community Outreach', 'Emergency Relief'],
  },
  {
    id: 2,
    name: 'Community Food Share',
    location: 'Los Angeles, CA',
    description: 'Connecting surplus food with those who need it most.',
    rating: 4.6,
    image: '/images/ngos/ngo2.jpg',
    specialties: ['Food Recovery', 'Youth Programs', 'Senior Meals'],
  },
  {
    id: 3,
    name: 'Hope Food Bank',
    location: 'Chicago, IL',
    description: 'Serving communities with dignity and respect.',
    rating: 4.9,
    image: '/images/ngos/ngo3.jpg',
    specialties: ['Food Pantry', 'Mobile Distribution', 'Nutrition Education'],
  },
]

export default function FindNGOPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [locationFilter, setLocationFilter] = useState('')

  const filteredNGOs = mockNGOs.filter(ngo => {
    const matchesSearch = ngo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ngo.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesLocation = !locationFilter || ngo.location.toLowerCase().includes(locationFilter.toLowerCase())
    return matchesSearch && matchesLocation
  })

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Find NGOs Near You</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Connect with local NGOs working to fight hunger and reduce food waste in your community.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Search Section */}
      <div className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gray-900 rounded-lg p-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-300 mb-2">
                  Search NGOs
                </label>
                <input
                  type="text"
                  id="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
                  placeholder="Search by name or description"
                />
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
                  placeholder="Enter city or state"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* NGO Listings */}
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNGOs.map((ngo, index) => (
              <motion.div
                key={ngo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-gray-900 rounded-lg overflow-hidden"
              >
                <div className="relative h-48">
                  <Image
                    src={ngo.image}
                    alt={ngo.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{ngo.name}</h3>
                  <p className="text-gray-400 mb-4">{ngo.location}</p>
                  <div className="flex items-center mb-4">
                    <span className="text-yellow-400 mr-2">★</span>
                    <span>{ngo.rating}</span>
                  </div>
                  <p className="text-gray-300 mb-4">{ngo.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {ngo.specialties.map((specialty) => (
                      <span
                        key={specialty}
                        className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-6 w-full bg-white text-black py-2 px-4 rounded-md font-medium hover:bg-gray-200 transition-colors duration-200"
                  >
                    Contact NGO
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* No Results Message */}
      {filteredNGOs.length === 0 && (
        <div className="py-16 px-4 text-center">
          <p className="text-xl text-gray-300">No NGOs found matching your search criteria.</p>
        </div>
      )}
    </div>
  )
} 