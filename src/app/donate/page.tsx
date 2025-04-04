'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { 
  FiMail,
  FiPhone,
  FiClock,
  FiCheck,
  FiPackage,
  FiDollarSign,
  FiHeart
} from 'react-icons/fi'
import Navbar from '@/components/navigation/Navbar'

// Types
type DonationType = 'food' | 'money'
type DonationStep = 'type' | 'email' | 'otp' | 'details' | 'payment' | 'ngoSelection' | 'requestSent'

interface FormData {
  email: string
  phone: string
  otp: string
  name: string
  address: string
  cookingTime: string
  description: string
  amount: string
  shareDetails: boolean
  photo?: File
}

interface NGO {
  id: string
  name: string
  address: string
  distance: string
  rating: number
  reviews: number
  image: string
  phone: string
}

export default function DonatePage() {
  // State management
  const [step, setStep] = useState<DonationStep>('type')
  const [donationType, setDonationType] = useState<DonationType | null>(null)
  const [selectedNgo, setSelectedNgo] = useState<string | null>(null)
  const [timeLeft, setTimeLeft] = useState(180)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [formData, setFormData] = useState<FormData>({
    email: '',
    phone: '',
    otp: '',
    name: '',
    address: '',
    cookingTime: '',
    description: '',
    amount: '',
    shareDetails: false
  })

  // Timer countdown effect
  useEffect(() => {
    if (step === 'requestSent' && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev: number) => prev - 1)
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [step, timeLeft])

  // Format time helper
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Mock NGO data
  const mockNgos: NGO[] = [
    {
      id: 'ngo1',
      name: 'Food for All Foundation',
      address: '123 Main Street, Mumbai',
      distance: '1.2 km',
      rating: 4.8,
      reviews: 156,
      image: '/images/slider/ngo1.jpg',
      phone: '+91 9876543210'
    },
    {
      id: 'ngo2',
      name: 'Helping Hands NGO',
      address: '456 Park Road, Mumbai',
      distance: '2.5 km',
      rating: 4.6,
      reviews: 98,
      image: '/images/slider/ngo1.jpg',
      phone: '+91 9876543211'
    }
  ]

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8 pt-24 md:pt-32">
        {/* Progress Steps */}
        <motion.div 
          className="mb-8 md:mb-12 bg-gray-800/80 backdrop-blur-lg rounded-xl md:rounded-2xl p-4 md:p-6 shadow-xl md:shadow-2xl border border-gray-700/50"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 right-0 top-1/2 h-1 bg-gray-700/50 -translate-y-1/2 rounded-full" />
            <motion.div 
              className="absolute left-0 top-1/2 h-1 bg-gradient-to-r from-blue-500 to-purple-500 -translate-y-1/2 rounded-full transition-all duration-500"
              initial={{ width: 0 }}
              animate={{
                width: `${
                  step === 'type' ? '0' :
                  step === 'email' ? '25' :
                  step === 'otp' ? '50' :
                  step === 'details' || step === 'payment' ? '75' : '100'
                }%`
              }}
            />
            
            {['Donation Type', 'Contact', 'Verification', 'Details', 'Complete'].map((label, index) => (
              <motion.div
                key={label}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  opacity: 1,
                  transition: { delay: index * 0.1 }
                }}
                className={`relative flex flex-col items-center ${
                  index <= ['type', 'email', 'otp', 'details', 'payment'].indexOf(step)
                    ? 'text-blue-400'
                    : 'text-gray-500'
                }`}
              >
                <motion.div 
                  className={`w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    index <= ['type', 'email', 'otp', 'details', 'payment'].indexOf(step)
                      ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-md md:shadow-lg shadow-blue-500/25'
                      : 'bg-gray-700/50'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-sm md:text-base">{index + 1}</span>
                </motion.div>
                <motion.span 
                  className="mt-2 md:mt-3 text-xs md:text-sm font-medium text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  {label.split(' ')[0]}
                </motion.span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="bg-gray-800/80 backdrop-blur-lg rounded-xl md:rounded-2xl shadow-xl md:shadow-2xl p-4 md:p-8 border border-gray-700/50"
          >
            {step === 'type' && (
              <motion.div variants={itemVariants} className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Choose Your Donation Type</h2>
                  <p className="text-sm md:text-base text-gray-400">Select how you&apos;d like to contribute</p>
                </div>

                <div className="grid grid-cols-1 gap-4 md:gap-6">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setDonationType('food')
                      setStep('email')
                    }}
                    className="group relative h-40 md:h-48 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-lg md:rounded-xl border-2 border-blue-500/20 hover:border-blue-500 transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/5 transition-colors duration-300 rounded-lg md:rounded-xl" />
                    <div className="relative h-full flex flex-col items-center justify-center p-4 md:p-6">
                      <FiPackage className="w-8 h-8 md:w-12 md:h-12 text-blue-400 mb-2 md:mb-4" />
                      <h3 className="text-lg md:text-xl font-semibold text-blue-400 mb-1 md:mb-2">Food Donation</h3>
                      <p className="text-xs md:text-sm text-gray-400 text-center">Share excess food with those in need</p>
                    </div>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setDonationType('money')
                      setStep('email')
                    }}
                    className="group relative h-40 md:h-48 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-lg md:rounded-xl border-2 border-green-500/20 hover:border-green-500 transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-green-500/0 group-hover:bg-green-500/5 transition-colors duration-300 rounded-lg md:rounded-xl" />
                    <div className="relative h-full flex flex-col items-center justify-center p-4 md:p-6">
                      <FiDollarSign className="w-8 h-8 md:w-12 md:h-12 text-green-400 mb-2 md:mb-4" />
                      <h3 className="text-lg md:text-xl font-semibold text-green-400 mb-1 md:mb-2">Money Donation</h3>
                      <p className="text-xs md:text-sm text-gray-400 text-center">Support our food distribution programs</p>
                    </div>
                  </motion.button>
                </div>

                <div className="text-center text-xs md:text-sm text-gray-400 mt-6 md:mt-8">
                  <p className="flex items-center justify-center">
                    <FiHeart className="text-red-400 mr-1 md:mr-2" />
                    Your contribution makes a real difference
                  </p>
                </div>
              </motion.div>
            )}

            {step === 'email' && (
              <motion.div variants={itemVariants} className="space-y-4 md:space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                    Contact Information
                  </h2>
                  <p className="text-sm md:text-base text-gray-400">We&apos;ll send a verification code to confirm your email</p>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-500/10 border border-red-500/20 text-red-400 px-3 py-2 md:px-4 md:py-3 rounded-lg backdrop-blur-sm text-sm md:text-base"
                  >
                    {error}
                  </motion.div>
                )}

                <div className="space-y-4 md:space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label htmlFor="email" className="block text-xs md:text-sm font-medium text-gray-300 mb-1 md:mb-2">
                      Email Address
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-md md:rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300" />
                      <div className="relative">
                        <FiMail className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-blue-400 transition-colors duration-200" />
                        <input
                          type="email"
                          id="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full pl-10 md:pl-12 pr-3 md:pr-4 py-2 md:py-3 text-sm md:text-base bg-gray-700/50 border border-gray-600 rounded-md md:rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400 transition-all duration-200 group-hover:border-blue-500/50"
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={async () => {
                        if (!formData.email) {
                          setError('Please enter your email')
                          return
                        }

                        setIsLoading(true)
                        setError(null)

                        try {
                          // Simulate API call to send OTP
                          await new Promise(resolve => setTimeout(resolve, 1000))
                          setStep('otp')
                        } catch{
                          setError('Failed to send OTP. Please try again.')
                        } finally {
                          setIsLoading(false)
                        }
                      }}
                      disabled={isLoading}
                      className={`w-full flex items-center justify-center px-4 md:px-6 py-3 md:py-4 text-sm md:text-base text-white rounded-md md:rounded-lg ${
                        isLoading 
                          ? 'bg-gray-600 cursor-not-allowed' 
                          : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
                      } transition-all duration-200 shadow-md md:shadow-lg hover:shadow-blue-500/25 relative overflow-hidden group`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all duration-300" />
                      <div className="relative flex items-center">
                        {isLoading ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 md:h-5 md:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending OTP...
                          </>
                        ) : (
                          'Send OTP'
                        )}
                      </div>
                    </motion.button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center text-xs md:text-sm text-gray-400"
                  >
                    <p>We&apos;ll never share your email with anyone else.</p>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {step === 'otp' && (
              <motion.div variants={itemVariants} className="space-y-4 md:space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                    Verify OTP
                  </h2>
                  <p className="text-sm md:text-base text-gray-400">Enter the verification code sent to {formData.email}</p>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-500/10 border border-red-500/20 text-red-400 px-3 py-2 md:px-4 md:py-3 rounded-lg backdrop-blur-sm text-sm md:text-base"
                  >
                    {error}
                  </motion.div>
                )}

                <motion.div 
                  className="max-w-xs mx-auto space-y-4 md:space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-md md:rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300" />
                    <div className="relative">
                      <label htmlFor="otp" className="sr-only">Enter OTP</label>
                      <input
                        type="text"
                        id="otp"
                        value={formData.otp}
                        onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-md md:rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white text-center text-xl md:text-2xl tracking-widest placeholder-gray-400 transition-all duration-200 group-hover:border-blue-500/50"
                        placeholder="000000"
                        maxLength={6}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 md:gap-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setStep('email')}
                      className="flex-1 px-4 md:px-6 py-3 md:py-4 text-sm md:text-base bg-gray-700 text-white rounded-md md:rounded-lg hover:bg-gray-600 transition-colors duration-200 relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-gray-600/0 to-gray-600/0 group-hover:from-gray-600/20 group-hover:to-gray-600/20 transition-all duration-300" />
                      <div className="relative">Back</div>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={async () => {
                        if (!formData.otp || formData.otp.length !== 6) {
                          setError('Please enter a valid 6-digit OTP')
                          return
                        }

                        setIsLoading(true)
                        setError(null)

                        try {
                          // Simulate API call to verify OTP
                          await new Promise(resolve => setTimeout(resolve, 1000))
                          setStep(donationType === 'food' ? 'details' : 'payment')
                        } catch  {
                          setError('Invalid OTP. Please try again.')
                        } finally {
                          setIsLoading(false)
                        }
                      }}
                      disabled={isLoading}
                      className={`flex-1 flex items-center justify-center px-4 md:px-6 py-3 md:py-4 text-sm md:text-base text-white rounded-md md:rounded-lg ${
                        isLoading 
                          ? 'bg-gray-600 cursor-not-allowed' 
                          : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
                      } transition-all duration-200 shadow-md md:shadow-lg hover:shadow-blue-500/25 relative overflow-hidden group`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all duration-300" />
                      <div className="relative flex items-center">
                        {isLoading ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 md:h-5 md:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Verifying...
                          </>
                        ) : (
                          'Verify OTP'
                        )}
                      </div>
                    </motion.button>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-center"
                  >
                    <button className="text-blue-400 hover:text-blue-300 text-xs md:text-sm transition-colors duration-200">
                      Didn&apos;t receive the code? Resend
                    </button>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}

            {step === 'details' && donationType === 'food' && (
              <motion.div variants={itemVariants} className="space-y-4 md:space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-white">Food Donation Details</h2>
                  <p className="text-sm md:text-base text-gray-400">Please provide information about the food you wish to donate</p>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-500/10 border border-red-500/20 text-red-400 px-3 py-2 md:px-4 md:py-3 rounded-lg text-sm md:text-base"
                  >
                    {error}
                  </motion.div>
                )}

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
                  <div>
                    <label htmlFor="name" className="block text-xs md:text-sm font-medium text-gray-300 mb-1 md:mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base bg-gray-700/50 border border-gray-600 rounded-md md:rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-xs md:text-sm font-medium text-gray-300 mb-1 md:mb-2">
                      Contact Number
                    </label>
                    <div className="relative">
                      <FiPhone className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-10 md:pl-12 pr-3 md:pr-4 py-2 md:py-3 text-sm md:text-base bg-gray-700/50 border border-gray-600 rounded-md md:rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                        placeholder="+91 9876543210"
                        required
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="address" className="block text-xs md:text-sm font-medium text-gray-300 mb-1 md:mb-2">
                      Pickup Address
                    </label>
                    <div className="flex flex-col md:flex-row gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          navigator.geolocation.getCurrentPosition(
                            (position) => {
                              const { latitude, longitude } = position.coords;
                              setFormData({
                                ...formData,
                                address: `${latitude}, ${longitude}`
                              });
                            },
                            () => {
                              setError('Unable to get your location. Please enter address manually.');
                            }
                          );
                        }}
                        className="px-3 md:px-4 py-2 text-xs md:text-sm bg-blue-500 text-white rounded-md md:rounded-lg hover:bg-blue-600 transition-colors duration-200"
                      >
                        Use Current Location
                      </button>
                      <input
                        type="text"
                        id="address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="flex-1 px-3 md:px-4 py-2 md:py-3 text-sm md:text-base bg-gray-700/50 border border-gray-600 rounded-md md:rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                        placeholder="Enter pickup address manually"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="cookingTime" className="block text-xs md:text-sm font-medium text-gray-300 mb-1 md:mb-2">
                      Cooking Time (max 14 hours)
                    </label>
                    <div className="relative">
                      <input
                        type="time"
                        id="cookingTime"
                        value={formData.cookingTime}
                        onChange={(e) => {
                          const time = e.target.value;
                          const [hours] = time.split(':').map(Number);
                          
                          if (hours <= 14) {
                            setFormData({ ...formData, cookingTime: time });
                            setError(null);
                          } else {
                            setError('Cooking time cannot exceed 14 hours');
                          }
                        }}
                        className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base bg-gray-700/50 border border-gray-600 rounded-md md:rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400 appearance-none"
                        required
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                        <FiClock className="w-4 h-4 md:w-5 md:h-5" />
                      </div>
                    </div>
                    <p className="mt-1 text-xs md:text-sm text-gray-400">
                      Click to select the time when the food was cooked
                    </p>
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="description" className="block text-xs md:text-sm font-medium text-gray-300 mb-1 md:mb-2">
                      Food Description
                    </label>
                    <textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base bg-gray-700/50 border border-gray-600 rounded-md md:rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                      rows={3}
                      placeholder="Describe the food items and quantities"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="flex items-center space-x-2 md:space-x-3">
                      <input
                        type="checkbox"
                        checked={formData.shareDetails}
                        onChange={(e) => setFormData({ ...formData, shareDetails: e.target.checked })}
                        className="w-4 h-4 text-blue-500 border-gray-600 rounded focus:ring-blue-500 focus:ring-offset-gray-800"
                      />
                      <span className="text-xs md:text-sm text-gray-300">
                        Share my donation story on the home page to inspire others
                      </span>
                    </label>
                  </div>

                  {formData.shareDetails && (
                    <div className="md:col-span-2">
                      <label className="block text-xs md:text-sm font-medium text-gray-300 mb-1 md:mb-2">
                        Upload Your Photo (Optional)
                      </label>
                      <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setFormData({ ...formData, photo: file });
                            }
                          }}
                          className="block w-full text-xs md:text-sm text-gray-400
                            file:mr-2 md:file:mr-4 file:py-1 md:file:py-2 file:px-2 md:file:px-4
                            file:rounded-md md:file:rounded-lg file:border-0
                            file:text-xs md:file:text-sm file:font-semibold
                            file:bg-blue-500 file:text-white
                            hover:file:bg-blue-600"
                        />
                        {formData.photo && (
                          <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-lg overflow-hidden">
                            <Image
                              src={URL.createObjectURL(formData.photo)}
                              alt="Preview"
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-3 md:gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setStep('otp')}
                    className="flex-1 px-4 md:px-6 py-3 md:py-4 text-sm md:text-base bg-gray-700 text-white rounded-md md:rounded-lg hover:bg-gray-600 transition-colors duration-200"
                  >
                    Back
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={async () => {
                      if (!formData.name || !formData.phone || !formData.address || 
                          !formData.cookingTime || !formData.description) {
                        setError('Please fill in all required fields')
                        return
                      }

                      setIsLoading(true)
                      setError(null)

                      try {
                        // Simulate API call to find NGOs
                        await new Promise(resolve => setTimeout(resolve, 1000))
                        setStep('ngoSelection')
                      } catch{
                        setError('Failed to proceed. Please try again.')
                      } finally {
                        setIsLoading(false)
                      }
                    }}
                    disabled={isLoading}
                    className={`flex-1 flex items-center justify-center px-4 md:px-6 py-3 md:py-4 text-sm md:text-base text-white rounded-md md:rounded-lg ${
                      isLoading 
                        ? 'bg-gray-600 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
                    } transition-all duration-200 shadow-md md:shadow-lg hover:shadow-blue-500/25`}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 md:h-5 md:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      'Find Nearby NGOs'
                    )}
                  </motion.button>
                </div>
              </motion.div>
            )}

            {step === 'payment' && donationType === 'money' && (
              <motion.div variants={itemVariants} className="space-y-4 md:space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-white">Payment Details</h2>
                  <p className="text-sm md:text-base text-gray-400">Choose your preferred payment method</p>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-500/10 border border-red-500/20 text-red-400 px-3 py-2 md:px-4 md:py-3 rounded-lg text-sm md:text-base"
                  >
                    {error}
                  </motion.div>
                )}

                <div className="space-y-4 md:space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-xs md:text-sm font-medium text-gray-300 mb-1 md:mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base bg-gray-700/50 border border-gray-600 rounded-md md:rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="amount" className="block text-xs md:text-sm font-medium text-gray-300 mb-1 md:mb-2">
                      Donation Amount (₹)
                    </label>
                    <div className="relative">
                      <FiDollarSign className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="number"
                        id="amount"
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        className="w-full pl-10 md:pl-12 pr-3 md:pr-4 py-2 md:py-3 text-sm md:text-base bg-gray-700/50 border border-gray-600 rounded-md md:rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-400"
                        min="10"
                        required
                      />
                    </div>
                  </div>

                  <div className="bg-gray-800/50 p-4 md:p-6 rounded-lg border border-gray-700">
                    <h3 className="text-base md:text-lg font-medium text-white mb-3 md:mb-4">Payment Method</h3>
                    <div className="space-y-2 md:space-y-3">
                      {['UPI', 'Credit/Debit Card', 'Net Banking'].map((method) => (
                        <label 
                          key={method}
                          className="flex items-center p-3 md:p-4 bg-gray-700/50 rounded-md md:rounded-lg border border-gray-600 cursor-pointer hover:border-blue-500/50 transition-colors duration-200"
                        >
                          <input 
                            type="radio" 
                            name="paymentMethod"
                            value={method}
                            className="h-4 w-4 text-blue-500 border-gray-600 focus:ring-blue-500 focus:ring-offset-gray-800"
                          />
                          <span className="ml-2 md:ml-3 text-sm md:text-base text-white">{method}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="text-center text-xs md:text-sm text-gray-400">
                  <p>Secure payment powered by Stripe</p>
                </div>

                <div className="flex gap-3 md:gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setStep('otp')}
                    className="flex-1 px-4 md:px-6 py-3 md:py-4 text-sm md:text-base bg-gray-700 text-white rounded-md md:rounded-lg hover:bg-gray-600 transition-colors duration-200"
                  >
                    Back
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={async () => {
                      if (!formData.name || !formData.amount) {
                        setError('Please fill in all fields')
                        return
                      }

                      setIsLoading(true)
                      setError(null)

                      try {
                        // Simulate payment processing
                        await new Promise(resolve => setTimeout(resolve, 2000))
                        alert('Payment successful! Thank you for your donation.')
                        // Reset form and go back to start
                        setFormData({
                          email: '',
                          phone: '',
                          otp: '',
                          name: '',
                          address: '',
                          cookingTime: '',
                          description: '',
                          amount: '',
                          shareDetails: false
                        })
                        setStep('type')
                        setDonationType(null)
                      } catch {
                        setError('Payment failed. Please try again.')
                      } finally {
                        setIsLoading(false)
                      }
                    }}
                    disabled={isLoading}
                    className={`flex-1 flex items-center justify-center px-4 md:px-6 py-3 md:py-4 text-sm md:text-base text-white rounded-md md:rounded-lg ${
                      isLoading 
                        ? 'bg-gray-600 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
                    } transition-all duration-200 shadow-md md:shadow-lg hover:shadow-green-500/25`}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 md:h-5 md:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing Payment...
                      </>
                    ) : (
                      `Pay ₹${formData.amount || '0'}`
                    )}
                  </motion.button>
                </div>
              </motion.div>
            )}

            {step === 'ngoSelection' && (
              <motion.div variants={itemVariants} className="space-y-4 md:space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                    Select NGO
                  </h2>
                  <p className="text-sm md:text-base text-gray-400">Choose an NGO to receive your donation</p>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-500/10 border border-red-500/20 text-red-400 px-3 py-2 md:px-4 md:py-3 rounded-lg backdrop-blur-sm text-sm md:text-base"
                  >
                    {error}
                  </motion.div>
                )}

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
                  {mockNgos.map((ngo, index) => (
                    <motion.div
                      key={ngo.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => setSelectedNgo(ngo.id)}
                      className={`relative group cursor-pointer transition-all duration-300 ${
                        selectedNgo === ngo.id
                          ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-gray-800'
                          : 'hover:ring-2 hover:ring-blue-500/50 hover:ring-offset-2 hover:ring-offset-gray-800'
                      }`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg md:rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-300" />
                      <div className="relative bg-gray-800/50 rounded-lg md:rounded-xl p-4 md:p-6 border border-gray-700/50">
                        <div className="flex items-start space-x-3 md:space-x-4">
                          <div className="relative w-16 h-16 md:w-24 md:h-24 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={ngo.image}
                              alt={ngo.name}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-base md:text-lg font-semibold text-white mb-1 md:mb-2">{ngo.name}</h3>
                            <div className="flex flex-col md:flex-row md:items-center mb-1 md:mb-2">
                              <div className="flex items-center text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                  <svg
                                    key={i}
                                    className={`w-3 h-3 md:w-4 md:h-4 ${i < Math.floor(ngo.rating) ? 'fill-current' : 'fill-gray-600'}`}
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                                <span className="ml-1 text-xs md:text-sm text-gray-400">
                                  ({ngo.reviews} reviews)
                                </span>
                              </div>
                              <span className="md:ml-4 text-xs md:text-sm text-gray-400">{ngo.distance} away</span>
                            </div>
                            <p className="text-xs md:text-sm text-gray-400 mb-1 md:mb-2">{ngo.address}</p>
                            <p className="text-xs md:text-sm text-blue-400">{ngo.phone}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="flex gap-3 md:gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setStep('details')}
                    className="flex-1 px-4 md:px-6 py-3 md:py-4 text-sm md:text-base bg-gray-700 text-white rounded-md md:rounded-lg hover:bg-gray-600 transition-colors duration-200 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-600/0 to-gray-600/0 group-hover:from-gray-600/20 group-hover:to-gray-600/20 transition-all duration-300" />
                    <div className="relative">Back</div>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={async () => {
                      if (!selectedNgo) {
                        setError('Please select an NGO')
                        return
                      }

                      setIsLoading(true)
                      setError(null)

                      try {
                        // Generate OTP for volunteer verification
                        
                        // Start the timer
                        setTimeLeft(180)
                        
                        // Simulate sending request to NGO
                        await new Promise(resolve => setTimeout(resolve, 1500))
                        setStep('requestSent')
                      } catch{
                        setError('Failed to send request. Please try again.')
                      } finally {
                        setIsLoading(false)
                      }
                    }}
                    disabled={!selectedNgo || isLoading}
                    className={`flex-1 flex items-center justify-center px-4 md:px-6 py-3 md:py-4 text-sm md:text-base text-white rounded-md md:rounded-lg ${
                      !selectedNgo || isLoading 
                        ? 'bg-gray-600 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
                    } transition-all duration-200 shadow-md md:shadow-lg hover:shadow-blue-500/25 relative overflow-hidden group`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all duration-300" />
                    <div className="relative flex items-center">
                      {isLoading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 md:h-5 md:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending Request...
                        </>
                      ) : (
                        'Send Request'
                      )}
                    </div>
                  </motion.button>
                </div>
              </motion.div>
            )}

            {step === 'requestSent' && (
              <motion.div variants={itemVariants} className="space-y-4 md:space-y-6">
                <h2 className="text-xl md:text-2xl font-semibold text-white mb-3 md:mb-4">Request Sent</h2>
                
                <div className="bg-gray-700/50 border border-gray-600/50 rounded-lg p-4 md:p-6 text-center">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                    <FiClock className="text-white text-xl md:text-2xl" />
                  </div>
                  <h3 className="text-base md:text-lg font-medium text-white mb-1 md:mb-2">
                    Waiting for NGO Response
                  </h3>
                  <p className="text-sm md:text-base text-gray-300 mb-3 md:mb-4">
                    Your request has been sent. Please wait for the NGO to accept.
                  </p>
                  <div className="text-2xl md:text-3xl font-mono font-bold text-blue-400 mb-3 md:mb-4">
                    {formatTime(timeLeft)}
                  </div>
                  {timeLeft === 0 && (
                    <div className="text-sm md:text-base text-red-400">
                      NGO did not respond in time. Please try another NGO.
                    </div>
                  )}
                </div>

                {/* Auto-accept after 30 seconds for demo */}
                {timeLeft === 150 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-gray-700/50 border border-gray-600/50 rounded-lg p-3 md:p-4 text-center"
                  >
                    <FiCheck className="text-green-400 text-xl md:text-2xl mx-auto mb-1 md:mb-2" />
                    <p className="text-sm md:text-base text-white">NGO has accepted your request!</p>
                    <p className="text-xs md:text-sm text-green-400 mt-1">Assigning volunteer...</p>
                  </motion.div>
                )}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}