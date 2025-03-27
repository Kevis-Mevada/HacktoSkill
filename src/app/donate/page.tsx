'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/navigation/Navbar'
import Image from 'next/image'
import { useState } from 'react'

export default function DonatePage() {
  const [amount, setAmount] = useState('')
  const [frequency, setFrequency] = useState('one-time')

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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Make a Donation</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Your financial contribution helps us provide food to those in need. Every donation makes a difference.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Donation Form Section */}
      <div className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gray-900 rounded-lg p-8"
          >
            <h2 className="text-2xl font-bold mb-6">Donation Form</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
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
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
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
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <label htmlFor="frequency" className="block text-sm font-medium text-gray-300 mb-2">
                  Donation Frequency
                </label>
                <select
                  id="frequency"
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <option value="one-time">One-time Donation</option>
                  <option value="monthly">Monthly Donation</option>
                  <option value="yearly">Yearly Donation</option>
                </select>
              </div>
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-300 mb-2">
                  Donation Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-400">₹</span>
                  <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full pl-8 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
                    placeholder="Enter amount"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message (Optional)
                </label>
                <textarea
                  id="message"
                  rows={3}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
                  placeholder="Any message you'd like to include with your donation"
                ></textarea>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-white text-black py-3 px-6 rounded-md font-medium hover:bg-gray-200 transition-colors duration-200"
              >
                Proceed to Payment
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Information Section */}
      <div className="py-16 px-4 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold mb-6">How Your Donation Helps</h2>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <span className="text-white mr-2">•</span>
                  Provides nutritious meals to underprivileged families
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-2">•</span>
                  Supports food distribution programs
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-2">•</span>
                  Helps maintain food storage facilities
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-2">•</span>
                  Enables emergency food relief efforts
                </li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold mb-6">Donation Benefits</h2>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <span className="text-white mr-2">•</span>
                  Tax-deductible donations
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-2">•</span>
                  Regular updates on impact
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-2">•</span>
                  Secure payment processing
                </li>
                <li className="flex items-start">
                  <span className="text-white mr-2">•</span>
                  Flexible donation options
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
} 