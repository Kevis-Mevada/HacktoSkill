'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/navigation/Navbar'
import Image from 'next/image'

const volunteerOpportunities = [
  {
    id: 1,
    title: 'Food Collection Volunteer',
    description: 'Help collect and sort food donations from various locations.',
    requirements: ['Valid driver\'s license', 'Ability to lift 20kg', 'Flexible schedule'],
    location: 'Multiple locations',
    commitment: '4-6 hours/week',
    image: '/images/slider/slide2.jpg',
  },
  {
    id: 2,
    title: 'Distribution Center Helper',
    description: 'Assist in organizing and distributing food at our centers.',
    requirements: ['Good organizational skills', 'Team player', 'Physical stamina'],
    location: 'Main Distribution Center',
    commitment: '3-4 hours/week',
    image: '/images/slider/slide1.jpg',
  },
  {
    id: 3,
    title: 'Community Outreach Coordinator',
    description: 'Help raise awareness and coordinate community events.',
    requirements: ['Strong communication skills', 'Event planning experience', 'Social media savvy'],
    location: 'Office & Community',
    commitment: '5-6 hours/week',
    image: '/images/slider/slide3.jpg', 
  },
]

export default function VolunteersPage() {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Volunteer With Us</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Join our team of dedicated volunteers and make a difference in your community.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Volunteer Opportunities */}
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {volunteerOpportunities.map((opportunity, index) => (
              <motion.div
                key={opportunity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-gray-900 rounded-lg overflow-hidden"
              >
                <div className="relative h-48">
                  <Image
                    src={opportunity.image}
                    alt={opportunity.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{opportunity.title}</h3>
                  <p className="text-gray-300 mb-4">{opportunity.description}</p>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Requirements:</h4>
                      <ul className="list-disc list-inside text-gray-300 space-y-1">
                        {opportunity.requirements.map((req, i) => (
                          <li key={i}>{req}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Details:</h4>
                      <ul className="text-gray-300 space-y-1">
                        <li>Location: {opportunity.location}</li>
                        <li>Time Commitment: {opportunity.commitment}</li>
                      </ul>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-6 w-full bg-white text-black py-2 px-4 rounded-md font-medium hover:bg-gray-200 transition-colors duration-200"
                  >
                    Apply Now
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Volunteer Registration Form */}
      <div className="py-16 px-4 bg-gray-900">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gray-800 rounded-lg p-8"
          >
            <h2 className="text-2xl font-bold mb-6">Volunteer Registration</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <label htmlFor="opportunity" className="block text-sm font-medium text-gray-300 mb-2">
                  Preferred Role
                </label>
                <select
                  id="opportunity"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <option value="">Select a role</option>
                  {volunteerOpportunities.map((opp) => (
                    <option key={opp.id} value={opp.id}>
                      {opp.title}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-300 mb-2">
                  Relevant Experience
                </label>
                <textarea
                  id="experience"
                  rows={4}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
                  placeholder="Tell us about your relevant experience"
                ></textarea>
              </div>
              <div>
                <label htmlFor="availability" className="block text-sm font-medium text-gray-300 mb-2">
                  Availability
                </label>
                <textarea
                  id="availability"
                  rows={3}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
                  placeholder="Describe your weekly availability"
                ></textarea>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-white text-black py-3 px-6 rounded-md font-medium hover:bg-gray-200 transition-colors duration-200"
              >
                Submit Application
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 