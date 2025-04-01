'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMail, FiPhone, FiUser, FiMapPin, FiClock, FiInfo, FiChevronRight, FiDollarSign, FiPackage, FiCheck, FiX, FiStar } from 'react-icons/fi'
import Navbar from '@/components/navigation/Navbar'
import Image from 'next/image'

export default function DonationPage() {
  const [step, setStep] = useState<'type' | 'email' | 'otp' | 'details' | 'payment' | 'ngoSelection' | 'requestSent'>('type')
  const [donationType, setDonationType] = useState<'food' | 'money' | null>(null)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card')
  const [selectedNgo, setSelectedNgo] = useState<string | null>(null)
  const [timeLeft, setTimeLeft] = useState(180) // 3 minutes in seconds
  const [formData, setFormData] = useState({
    email: '',
    contact: '',
    otp: '',
    name: '',
    gender: '',
    address: '',
    cookingTime: '',
    expireTime: '',
    description: '',
    amount: '500' // Default amount
  })

  // Enhanced Mock NGO data with images, ratings, and full addresses
  const mockNgos = [
    { 
      id: 'ngo1', 
      name: 'Feed the Hungry Foundation', 
      distance: '0.5 km', 
      phone: '+91 9876543210',
      rating: 4.7,
      image: '/ngo1.jpg', // Replace with your actual images
      address: '123 Charity Lane, Mumbai, Maharashtra 400001',
      reviews: 128,
      description: 'Specializing in daily meal distribution to homeless communities'
    },
    { 
      id: 'ngo2', 
      name: 'Food for All', 
      distance: '1.2 km', 
      phone: '+91 9876543211',
      rating: 4.3,
      image: '/ngo2.jpg',
      address: '456 Helping Street, Mumbai, Maharashtra 400002',
      reviews: 87,
      description: 'Providing nutritious meals to children in need'
    },
    { 
      id: 'ngo3', 
      name: 'Share A Meal', 
      distance: '2.1 km', 
      phone: '+91 9876543212',
      rating: 4.9,
      image: '/ngo3.jpg',
      address: '789 Kindness Road, Mumbai, Maharashtra 400003',
      reviews: 215,
      description: 'Reducing food waste by connecting donors with those in need'
    }
  ]

  // Countdown timer for NGO acceptance
  useEffect(() => {
    if (step === 'requestSent' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft, step])

  const handleSelectDonationType = (type: 'food' | 'money') => {
    setDonationType(type)
    setStep('email')
  }

  const handleSendOTP = () => {
    if (formData.email && formData.contact) {
      setStep('otp')
    }
  }

  const handleVerifyOTP = () => {
    if (formData.otp.length === 6) {
      setStep(donationType === 'food' ? 'details' : 'payment')
    }
  }

  const handleFindNgos = () => {
    if (!isFoodExpired()) {
      setStep('ngoSelection')
    }
  }

  const handleSendRequest = () => {
    if (selectedNgo) {
      setStep('requestSent')
      setTimeLeft(180) // Reset timer
    }
  }

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle payment submission
    alert(`Donation of ₹${formData.amount} submitted successfully!`)
  }

  const isFoodExpired = () => {
    if (!formData.cookingTime) return false
    const cookingTime = new Date(formData.cookingTime)
    const now = new Date()
    const diffHours = (now.getTime() - cookingTime.getTime()) / (1000 * 60 * 60)
    return diffHours > 48
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  const currentNgo = mockNgos.find(n => n.id === selectedNgo)

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <div className="pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          {/* Progress Bar */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-between mb-8 relative"
          >
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-800 -z-10"></div>
            <div 
              className="absolute top-1/2 left-0 h-1 bg-blue-500 -z-10 transition-all duration-500"
              style={{ 
                width: step === 'type' ? '0%' : 
                       step === 'email' ? '20%' : 
                       step === 'otp' ? '40%' : 
                       donationType === 'food' ? (
                         step === 'details' ? '60%' :
                         step === 'ngoSelection' ? '80%' : 
                         step === 'requestSent' ? '100%' : '60%'
                       ) : (
                         step === 'payment' ? '80%' : '60%'
                       )
              }}
            ></div>
            
            {[
              'type', 
              'email', 
              'otp', 
              donationType === 'food' ? 'details' : 'payment',
              donationType === 'food' ? 'ngoSelection' : 'complete'
            ].map((s, i) => (
              <motion.div
                key={s}
                whileHover={{ scale: 1.1 }}
                className={`flex flex-col items-center ${
                  step === s || 
                  (step === 'requestSent' && s === 'ngoSelection') ? 'text-blue-400' : 'text-gray-400'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === s || 
                  (step === 'requestSent' && s === 'ngoSelection') ? 'bg-blue-500' : 'bg-gray-800'
                } mb-2`}>
                  {i + 1}
                </div>
                <span className="text-xs capitalize">{s.replace('Selection', '')}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Form Content */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gray-900 rounded-lg p-6 sm:p-8"
          >
            <AnimatePresence mode="wait">
              {step === 'type' && (
                <motion.div
                  key="type-step"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-xl font-bold mb-6">What would you like to donate?</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleSelectDonationType('food')}
                      className="bg-gray-800 hover:bg-gray-700 p-6 rounded-lg flex flex-col items-center transition-colors duration-200"
                    >
                      <FiPackage className="text-3xl mb-3 text-green-400" />
                      <span className="text-lg font-medium">Food Donation</span>
                      <p className="text-sm text-gray-400 mt-2 text-center">
                        Donate excess food from events, restaurants, or households
                      </p>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleSelectDonationType('money')}
                      className="bg-gray-800 hover:bg-gray-700 p-6 rounded-lg flex flex-col items-center transition-colors duration-200"
                    >
                      <FiDollarSign className="text-3xl mb-3 text-blue-400" />
                      <span className="text-lg font-medium">Money Donation</span>
                      <p className="text-sm text-gray-400 mt-2 text-center">
                        Contribute funds to support our food distribution efforts
                      </p>
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {step === 'email' && (
                <motion.div
                  key="email-step"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-xl font-bold mb-6">Contact Verification</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="flex items-center text-sm text-gray-300 mb-2">
                        <FiMail className="mr-2" /> Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-gray-800 rounded-md px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="flex items-center text-sm text-gray-300 mb-2">
                        <FiPhone className="mr-2" /> Contact Number
                      </label>
                      <input
                        type="tel"
                        value={formData.contact}
                        onChange={(e) => setFormData({...formData, contact: e.target.value})}
                        className="w-full bg-gray-800 rounded-md px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="+91 9876543210"
                        required
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSendOTP}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md transition-colors duration-200 mt-4 flex items-center justify-center"
                    >
                      Send OTP <FiChevronRight className="ml-2" />
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {step === 'otp' && (
                <motion.div
                  key="otp-step"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-xl font-bold mb-6">OTP Verification</h2>
                  <p className="text-gray-400 mb-6">We've sent a 6-digit code to {formData.email}</p>
                  <div>
                    <label className="text-sm text-gray-300 mb-2 block">Enter OTP</label>
                    <input
                      type="text"
                      value={formData.otp}
                      onChange={(e) => setFormData({...formData, otp: e.target.value})}
                      className="w-full bg-gray-800 rounded-md px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="123456"
                      maxLength={6}
                      required
                    />
                  </div>
                  <div className="flex gap-4 mt-6">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setStep('email')}
                      className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-md transition-colors duration-200"
                    >
                      Back
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleVerifyOTP}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md transition-colors duration-200 flex items-center justify-center"
                    >
                      Verify OTP <FiChevronRight className="ml-2" />
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {step === 'details' && (
                <motion.div
                  key="details-step"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-xl font-bold mb-6">Enter Food Donation Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="flex items-center text-sm text-gray-300 mb-2">
                        <FiUser className="mr-2" /> Your Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-gray-800 rounded-md px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Full Name"
                        required
                      />
                    </div>
                    <div>
                      <label className="flex items-center text-sm text-gray-300 mb-2">
                        <FiUser className="mr-2" /> Gender
                      </label>
                      <select
                        value={formData.gender}
                        onChange={(e) => setFormData({...formData, gender: e.target.value})}
                        className="w-full bg-gray-800 rounded-md px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        required
                      >
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="flex items-center text-sm text-gray-300 mb-2">
                        <FiMapPin className="mr-2" /> Address
                      </label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                        className="w-full bg-gray-800 rounded-md px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Full Address"
                        required
                      />
                    </div>
                    <div>
                      <label className="flex items-center text-sm text-gray-300 mb-2">
                        <FiClock className="mr-2" /> Food Cooking Time
                      </label>
                      <input
                        type="datetime-local"
                        value={formData.cookingTime}
                        onChange={(e) => setFormData({...formData, cookingTime: e.target.value})}
                        className="w-full bg-gray-800 rounded-md px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        required
                      />
                      {isFoodExpired() && (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-400 text-sm mt-2 flex items-center"
                        >
                          <FiInfo className="mr-1" /> Food prepared more than 48 hours ago cannot be donated
                        </motion.p>
                      )}
                    </div>
                    <div>
                      <label className="flex items-center text-sm text-gray-300 mb-2">
                        <FiClock className="mr-2" /> Expiry Time
                      </label>
                      <input
                        type="datetime-local"
                        value={formData.expireTime}
                        onChange={(e) => setFormData({...formData, expireTime: e.target.value})}
                        className="w-full bg-gray-800 rounded-md px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="flex items-center text-sm text-gray-300 mb-2">
                        <FiInfo className="mr-2" /> Description of Food Items
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        className="w-full bg-gray-800 rounded-md px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none min-h-[100px]"
                        placeholder="List all food items with quantities"
                        required
                      />
                    </div>
                  </div>

                  <div className="mt-8 space-y-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-md transition-colors duration-200 flex items-center justify-center"
                    >
                      <FiMapPin className="mr-2" /> Get Your Current Location
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={handleFindNgos}
                      disabled={isFoodExpired()}
                      className={`w-full ${isFoodExpired() ? 'bg-gray-700 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white py-3 px-6 rounded-md transition-colors duration-200 flex items-center justify-center`}
                    >
                      Find Nearby NGOs <FiChevronRight className="ml-2" />
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {step === 'payment' && (
                <motion.div
                  key="payment-step"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-xl font-bold mb-6">Make a Monetary Donation</h2>
                  <form onSubmit={handlePaymentSubmit} className="space-y-6">
                    <div>
                      <label className="flex items-center text-sm text-gray-300 mb-2">
                        <FiUser className="mr-2" /> Your Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-gray-800 rounded-md px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Full Name"
                        required
                      />
                    </div>
                    <div>
                      <label className="flex items-center text-sm text-gray-300 mb-2">
                        <FiDollarSign className="mr-2" /> Donation Amount (₹)
                      </label>
                      <input
                        type="number"
                        value={formData.amount}
                        onChange={(e) => setFormData({...formData, amount: e.target.value})}
                        className="w-full bg-gray-800 rounded-md px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="500"
                        min="10"
                        required
                      />
                    </div>
                    <div className="bg-gray-800 rounded-lg p-4">
                      <h3 className="text-lg font-medium mb-3">Payment Method</h3>
                      <div className="space-y-3">
                        {['card', 'upi', 'netbanking'].map((method) => (
                          <label 
                            key={method}
                            className="flex items-center space-x-3 p-3 bg-gray-700 rounded-md cursor-pointer"
                          >
                            <input 
                              type="radio" 
                              name="payment" 
                              className="text-blue-500" 
                              checked={selectedPaymentMethod === method}
                              onChange={() => setSelectedPaymentMethod(method)}
                              required
                            />
                            <span className="capitalize">
                              {method === 'upi' ? 'UPI Payment' : 
                               method === 'netbanking' ? 'Net Banking' : 'Credit/Debit Card'}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md transition-colors duration-200 mt-4"
                    >
                      Donate ₹{formData.amount || '0'}
                    </motion.button>
                    <p className="text-gray-400 text-sm text-center">
                      Your donation will help us provide meals to those in need
                    </p>
                  </form>
                </motion.div>
              )}

              {step === 'ngoSelection' && (
                <motion.div
                  key="ngo-step"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-xl font-bold mb-6">Nearby NGOs</h2>
                  <div className="space-y-6">
                    {mockNgos.map((ngo) => (
                      <motion.div
                        key={ngo.id}
                        whileHover={{ scale: 1.01 }}
                        className={`overflow-hidden rounded-lg cursor-pointer ${selectedNgo === ngo.id ? 'ring-2 ring-blue-500' : 'bg-gray-800'}`}
                        onClick={() => setSelectedNgo(ngo.id)}
                      >
                        <div className="flex flex-col sm:flex-row">
                          <div className="w-full sm:w-1/3 h-40 bg-gray-700 relative">
                            {/* Replace with your actual image component */}
                            <Image
                              src={ngo.image}
                              alt={ngo.name}
                              fill
                              className="object-cover"
                              unoptimized // Remove this if using optimized images
                            />
                          </div>
                          <div className="w-full sm:w-2/3 p-4">
                            <div className="flex justify-between items-start">
                              <h3 className="font-medium text-lg">{ngo.name}</h3>
                              {selectedNgo === ngo.id && (
                                <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center ml-2">
                                  <FiCheck className="text-white text-xs" />
                                </div>
                              )}
                            </div>
                            <div className="flex items-center mt-1">
                              <div className="flex items-center text-yellow-400">
                                <FiStar className="fill-current" />
                                <span className="ml-1 text-white">{ngo.rating}</span>
                                <span className="text-gray-400 text-sm ml-1">({ngo.reviews} reviews)</span>
                              </div>
                              <span className="text-gray-400 text-sm ml-3">{ngo.distance} away</span>
                            </div>
                            <p className="text-gray-300 text-sm mt-2">{ngo.description}</p>
                            <div className="mt-2">
                              <p className="text-gray-300 text-sm flex items-start">
                                <FiMapPin className="flex-shrink-0 mt-0.5 mr-1.5" />
                                {ngo.address}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSendRequest}
                    disabled={!selectedNgo}
                    className={`w-full mt-6 ${!selectedNgo ? 'bg-gray-700 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white py-3 px-6 rounded-md transition-colors duration-200`}
                  >
                    Send Donation Request
                  </motion.button>
                </motion.div>
              )}

              {step === 'requestSent' && currentNgo && (
                <motion.div
                  key="request-step"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  <div className="bg-blue-500/10 p-6 rounded-lg mb-6">
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FiCheck className="text-white text-2xl" />
                    </div>
                    <h2 className="text-xl font-bold mb-2">Request Sent Successfully!</h2>
                    <p className="text-gray-400 mb-4">
                      Waiting for {currentNgo.name} to accept your donation
                    </p>
                    <div className="bg-black rounded-full p-2 inline-block">
                      <div className="text-2xl font-mono">{formatTime(timeLeft)}</div>
                    </div>
                  </div>

                  {timeLeft > 0 ? (
                    <div className="space-y-4">
                      <p className="text-gray-400">
                        Please stay with us while we confirm acceptance from the NGO
                      </p>
                      <div className="animate-pulse text-blue-400">
                        Waiting for response...
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="text-red-400 flex items-center justify-center">
                        <FiX className="mr-2" /> NGO didn't respond in time
                      </div>
                      <div className="bg-gray-800 p-4 rounded-lg text-left">
                        <div className="flex items-start">
                          <div className="w-16 h-16 bg-gray-700 rounded-md mr-4 overflow-hidden">
                            <Image
                              src={currentNgo.image}
                              alt={currentNgo.name}
                              width={64}
                              height={64}
                              className="object-cover w-full h-full"
                              unoptimized
                            />
                          </div>
                          <div>
                            <h3 className="font-medium text-lg">{currentNgo.name}</h3>
                            <div className="flex items-center mt-1">
                              <div className="flex items-center text-yellow-400">
                                <FiStar className="fill-current" />
                                <span className="ml-1 text-white">{currentNgo.rating}</span>
                                <span className="text-gray-400 text-sm ml-1">({currentNgo.reviews} reviews)</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-300 text-sm mt-2 flex items-start">
                          <FiMapPin className="flex-shrink-0 mt-0.5 mr-1.5" />
                          {currentNgo.address}
                        </p>
                        <p className="text-gray-300 text-sm mt-2">{currentNgo.description}</p>
                        <a 
                          href={`tel:${currentNgo.phone}`}
                          className="text-blue-400 hover:underline flex items-center mt-3"
                        >
                          <FiPhone className="mr-2" /> {currentNgo.phone}
                        </a>
                      </div>
                      <button
                        onClick={() => setStep('ngoSelection')}
                        className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-md transition-colors duration-200 mt-4"
                      >
                        Try Another NGO
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  )
}