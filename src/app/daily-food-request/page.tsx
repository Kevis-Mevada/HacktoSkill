'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '@/components/navigation/Navbar'
import { TypeAnimation } from 'react-type-animation'
import { FiUser, FiMail, FiPhone, FiHome, FiMapPin, FiUpload, FiX, FiCheck, FiAlertCircle, FiStar } from 'react-icons/fi'

type RequestType = 'new' | 'existing' | null
type UserType = 'hostel' | 'other' | null

interface FormData {
  fullName: string
  gender: string
  dateOfBirth: string
  email: string
  contactNumber: string
  userType: UserType
  address: {
    house: string
    street: string
    area: string
    landmark: string
    state: string
    city: string
    pincode: string
  }
  documents: {
    idProof: File | null
    photo: File | null
  }
}

interface FormErrors {
  fullName?: string;
  gender?: string;
  dateOfBirth?: string;
  email?: string;
  contactNumber?: string;
  userType?: string;
  house?: string;
  street?: string;
  area?: string;
  city?: string;
  state?: string;
  pincode?: string;
  idProof?: string;
  photo?: string;
}

export default function DailyFoodRequestPage() {
  const [showWelcome, setShowWelcome] = useState(true)
  const [, setWelcomeCompleted] = useState(false)
  const [requestType, setRequestType] = useState<RequestType>(null)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    gender: '',
    dateOfBirth: '',
    email: '',
    contactNumber: '',
    userType: null,
    address: {
      house: '',
      street: '',
      area: '',
      landmark: '',
      state: '',
      city: '',
      pincode: ''
    },
    documents: {
      idProof: null,
      photo: null
    }
  })
  const [existingEmail, setExistingEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formErrors, setFormErrors] = useState<FormErrors>({})
  const [emailVerified, setEmailVerified] = useState(false)
  const [emailOtp, setEmailOtp] = useState('')
  const [showEmailOtp, setShowEmailOtp] = useState(false)
  const [showExistingOtp, setShowExistingOtp] = useState(false)
  const [showSubmissionPopup, setShowSubmissionPopup] = useState(false)
  const [selectedNgo, setSelectedNgo] = useState<number | null>(null)
  const [nearbyNgos, setNearbyNgos] = useState([
    {
      id: 1,
      name: 'Food Bank NGO',
      rating: 4.5,
      distance: '2.5 km',
      area: 'Downtown',
      image: 'https://static.vecteezy.com/system/resources/previews/019/636/946/large_2x/ngo-or-non-governmental-organization-to-serve-specific-social-and-political-needs-in-template-hand-drawn-cartoon-flat-illustration-vector.jpg'
    },
    {
      id: 2,
      name: 'Community Food Share',
      rating: 4.2,
      distance: '3.1 km',
      area: 'Westside',
      image: 'https://static.vecteezy.com/system/resources/previews/019/636/946/large_2x/ngo-or-non-governmental-organization-to-serve-specific-social-and-political-needs-in-template-hand-drawn-cartoon-flat-illustration-vector.jpg'
    }
  ])

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome')
    if (hasSeenWelcome) {
      setShowWelcome(false)
    }
  }, [])

  const handleCloseWelcome = () => {
    localStorage.setItem('hasSeenWelcome', 'true')
    setShowWelcome(false)
  }

  const handleWelcomeComplete = () => {
    setWelcomeCompleted(true)
    setTimeout(() => {
      handleCloseWelcome()
    }, 1000)
  }

  const handleFileChange = (type: keyof FormData['documents']) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData(prev => ({
        ...prev,
        documents: {
          ...prev.documents,
          [type]: file
        }
      }))
      setFormErrors(prev => ({ ...prev, [type]: undefined }))
    }
  }

  const handleSubmit = async () => {
    if (!selectedNgo) {
      setError('Please select an NGO to send your request')
      return
    }

    setIsLoading(true)
    setError(null)
    
    try {
      const isValid = validateStep(currentStep)
      if (!isValid) {
        setIsLoading(false)
        return
      }

      await new Promise(resolve => setTimeout(resolve, 2000))
      console.log('Form submitted to NGO:', selectedNgo, formData)
      setShowSubmissionPopup(true)
    } catch {
      setError('Failed to submit request. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleExistingRequest = async () => {
    if (!existingEmail) {
      setError('Email is required')
      return
    }
    if (!otp) {
      setError('OTP is required')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setError(null)
      alert('Request status: Approved')
    } catch   {
      setError('Failed to verify OTP. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendEmailOtp = async () => {
    if (!formData.email) {
      setFormErrors(prev => ({ ...prev, email: 'Email is required' }))
      return
    }
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setShowEmailOtp(true)
      setFormErrors(prev => ({ ...prev, email: undefined }))
    } catch   {
      setError('Failed to send OTP. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyEmailOtp = async () => {
    if (!emailOtp) {
      setError('OTP is required')
      return
    }
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setEmailVerified(true)
      setShowEmailOtp(false)
      setError(null)
    } catch   {
      setError('Failed to verify OTP. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendExistingOtp = async () => {
    if (!existingEmail) {
      setError('Email is required')
      return
    }
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setShowExistingOtp(true)
      setError(null)
    } catch   {
      setError('Failed to send OTP. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const validateStep = (step: number) => {
    const errors: FormErrors = {}
    
    if (step === 1) {
      if (!formData.fullName.trim()) errors.fullName = 'Full name is required'
      if (!formData.gender) errors.gender = 'Gender is required'
      if (!formData.dateOfBirth) errors.dateOfBirth = 'Date of birth is required'
      if (!formData.email) errors.email = 'Email is required'
      if (!formData.contactNumber) errors.contactNumber = 'Contact number is required'
      if (!formData.userType) errors.userType = 'Please select your category'
    } else if (step === 2) {
      if (!formData.address.house.trim()) errors.house = 'House/Flat/Hostel is required'
      if (!formData.address.street.trim()) errors.street = 'Street/Road is required'
      if (!formData.address.area.trim()) errors.area = 'Area is required'
      if (!formData.address.city.trim()) errors.city = 'City is required'
      if (!formData.address.state.trim()) errors.state = 'State is required'
      if (!formData.address.pincode.trim()) errors.pincode = 'Pincode is required'
    } else if (step === 3) {
      if (!formData.documents.idProof) errors.idProof = 'ID Proof is required'
      if (!formData.documents.photo) errors.photo = 'Photo is required'
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1)
      setError(null)
    }
  }

  const handlePreviousStep = () => {
    setCurrentStep(prev => prev - 1)
    setError(null)
  }

  // Calculate scooter position based on current step

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8 pt-24 md:pt-32">
        {/* Welcome Message */}
        <AnimatePresence>
          {showWelcome && (
            <motion.div 
              className="relative mb-8 md:mb-12 bg-gradient-to-r from-gray-800/90 to-gray-800/80 backdrop-blur-lg rounded-2xl p-6 md:p-8 shadow-2xl border border-gray-700/50 overflow-hidden"
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -20 }}
              variants={{
                hidden: { opacity: 0, y: -20 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <motion.button
                className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
                onClick={handleCloseWelcome}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiX size={20} />
              </motion.button>
              <div className="relative z-10">
                <TypeAnimation
                  sequence={[
                    'Welcome to our platform. Are you a hostel student or have you come from outside to work in the city and you are looking for food then our platform can help you. Our platform helps people find free food to satisfy their hunger. Our platform can help you to contact the nearest NGO. You can get free food from there. And this food will be very fresh and of good quality. You can request food from the nearest one who can give you free food.',
                    1000,
                    handleWelcomeComplete
                  ]}
                  wrapper="p"
                  speed={50}
                  className="text-gray-300 text-sm md:text-lg leading-relaxed"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-50" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Request Type Selection */}
        <AnimatePresence>
          {!requestType && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
            >
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="group cursor-pointer"
                onClick={() => setRequestType('existing')}
              >
                <div className="p-6 md:p-8 bg-gradient-to-br from-gray-800 to-gray-800/80 rounded-xl border border-gray-700 shadow-xl transition-all duration-300 group-hover:border-blue-500/50 group-hover:shadow-blue-500/10 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10">
                    <h3 className="text-xl md:text-2xl font-semibold text-white mb-2 md:mb-3">Already Requested?</h3>
                    <p className="text-gray-400 text-sm md:text-base">Check your request status here</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="group cursor-pointer"
                onClick={() => setRequestType('new')}
              >
                <div className="p-6 md:p-8 bg-gradient-to-br from-gray-800 to-gray-800/80 rounded-xl border border-gray-700 shadow-xl transition-all duration-300 group-hover:border-blue-500/50 group-hover:shadow-blue-500/10 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10">
                    <h3 className="text-xl md:text-2xl font-semibold text-white mb-2 md:mb-3">New Request</h3>
                    <p className="text-gray-400 text-sm md:text-base">Submit a new food request</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* New Request Form */}
        {requestType === 'new' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gradient-to-br from-gray-800 to-gray-800/80 rounded-xl p-6 md:p-8 shadow-xl border border-gray-700"
          >
            {/* Progress Steps with Scooter */}
            <div className="mb-8 md:mb-12 relative">
              <div className="flex items-center justify-between relative">
                <div className="absolute left-0 right-0 top-1/2 h-1 bg-gray-700/50 -translate-y-1/2 rounded-full" />
                <motion.div 
                  className="absolute left-0 top-1/2 h-1 bg-gradient-to-r from-blue-500 to-purple-500 -translate-y-1/2 rounded-full transition-all duration-500"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${
                      currentStep === 1 ? '0' :
                      currentStep === 2 ? '33.33' :
                      currentStep === 3 ? '66.66' : '100'
                    }%`
                  }}
                />
                
                {[1, 2, 3, 4].map((step) => (
                  <motion.div
                    key={step}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ 
                      scale: 1, 
                      opacity: 1,
                      transition: { delay: (step - 1) * 0.1 }
                    }}
                    className="relative flex flex-col items-center"
                  >
                    <motion.div 
                      className={`w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                        step <= currentStep
                          ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-white shadow-md md:shadow-lg shadow-blue-500/25'
                          : 'bg-gray-700/20'
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {step === currentStep && (
                        <img 
                          src="/images/scooter.jpg" 
                          alt="Progress scooter" 
                          className="w-6 h-6 md:w-8 md:h-8 object-contain opacity-80"
                        />
                      )}
                      {step < currentStep && (
                        <FiCheck className="w-4 h-4 md:w-5 md:h-5 text-white opacity-80" />
                      )}
                      {step > currentStep && (
                        <span className="text-sm md:text-base opacity-80">{step}</span>
                      )}
                    </motion.div>
                    <motion.span 
                      className="mt-2 md:mt-3 text-xs md:text-sm font-medium text-center text-gray-400"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: (step - 1) * 0.1 + 0.2 }}
                    >
                      {step === 1 ? 'Personal' :
                       step === 2 ? 'Address' :
                       step === 3 ? 'Documents' : 'NGO'}
                    </motion.span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Step 1: Personal Details */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4 md:space-y-6 mt-4 md:mt-8"
              >
                <h2 className="text-xl md:text-2xl font-semibold text-white mb-4 md:mb-6">Personal Details</h2>
                
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1 md:mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => {
                          setFormData({ ...formData, fullName: e.target.value })
                          setFormErrors(prev => ({ ...prev, fullName: undefined }))
                        }}
                        className={`w-full pl-10 pr-4 py-2 md:py-3 bg-gray-700/50 backdrop-blur-sm border ${
                          formErrors.fullName ? 'border-red-500' : 'border-gray-600'
                        } rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200`}
                        placeholder="Enter your full name"
                      />
                      {formErrors.fullName && (
                        <div className="flex items-center mt-1 text-red-500 text-xs md:text-sm">
                          <FiAlertCircle className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                          {formErrors.fullName}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1 md:mb-2">
                      Gender <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.gender}
                      onChange={(e) => {
                        setFormData({ ...formData, gender: e.target.value })
                        setFormErrors(prev => ({ ...prev, gender: undefined }))
                      }}
                      className={`w-full px-4 py-2 bg-gray-700 border ${
                        formErrors.gender ? 'border-red-500' : 'border-gray-600'
                      } rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    {formErrors.gender && (
                      <div className="flex items-center mt-1 text-red-500 text-xs md:text-sm">
                        <FiAlertCircle className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                        {formErrors.gender}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1 md:mb-2">
                      Date of Birth <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => {
                        setFormData({ ...formData, dateOfBirth: e.target.value })
                        setFormErrors(prev => ({ ...prev, dateOfBirth: undefined }))
                      }}
                      className={`w-full px-4 py-2 bg-gray-700 border ${
                        formErrors.dateOfBirth ? 'border-red-500' : 'border-gray-600'
                      } rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                    />
                    {formErrors.dateOfBirth && (
                      <div className="flex items-center mt-1 text-red-500 text-xs md:text-sm">
                        <FiAlertCircle className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                        {formErrors.dateOfBirth}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1 md:mb-2">
                      Contact Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        value={formData.contactNumber}
                        onChange={(e) => {
                          setFormData({ ...formData, contactNumber: e.target.value })
                          setFormErrors(prev => ({ ...prev, contactNumber: undefined }))
                        }}
                        className={`w-full pl-10 pr-4 py-2 bg-gray-700 border ${
                          formErrors.contactNumber ? 'border-red-500' : 'border-gray-600'
                        } rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                        placeholder="Enter your contact number"
                      />
                      {formErrors.contactNumber && (
                        <div className="flex items-center mt-1 text-red-500 text-xs md:text-sm">
                          <FiAlertCircle className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                          {formErrors.contactNumber}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-1 md:mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <div className="flex flex-col md:flex-row gap-2">
                      <div className="relative flex-grow">
                        <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value })
                            setFormErrors(prev => ({ ...prev, email: undefined }))
                          }}
                          className={`w-full pl-10 pr-4 py-2 bg-gray-700 border ${
                            formErrors.email ? 'border-red-500' : 'border-gray-600'
                          } rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                          placeholder="Enter your email"
                          disabled={emailVerified}
                        />
                      </div>
                      {!emailVerified ? (
                        <button
                          type="button"
                          onClick={handleSendEmailOtp}
                          disabled={isLoading || !formData.email}
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                        >
                          {isLoading ? 'Sending...' : 'Send OTP'}
                        </button>
                      ) : (
                        <div className="flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-lg">
                          <FiCheck className="mr-2" />
                          Verified
                        </div>
                      )}
                    </div>
                    {formErrors.email && (
                      <div className="flex items-center mt-1 text-red-500 text-xs md:text-sm">
                        <FiAlertCircle className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                        {formErrors.email}
                      </div>
                    )}
                  </div>

                  {showEmailOtp && !emailVerified && (
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-300 mb-1 md:mb-2">
                        Enter OTP sent to your email
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={emailOtp}
                          onChange={(e) => setEmailOtp(e.target.value)}
                          className="flex-grow px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter OTP"
                        />
                        <button
                          type="button"
                          onClick={handleVerifyEmailOtp}
                          disabled={isLoading || !emailOtp}
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                        >
                          {isLoading ? 'Verifying...' : 'Verify OTP'}
                        </button>
                      </div>
                      {error && (
                        <div className="flex items-center mt-1 text-red-500 text-xs md:text-sm">
                          <FiAlertCircle className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                          {error}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-1 md:mb-2">
                      You are a <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2 md:gap-4">
                      <button
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, userType: 'hostel' })
                          setFormErrors(prev => ({ ...prev, userType: undefined }))
                        }}
                        className={`px-4 py-2 rounded-lg border ${
                          formData.userType === 'hostel'
                            ? 'bg-blue-500 border-blue-600 text-white'
                            : 'bg-gray-700 border-gray-600 text-gray-300'
                        } hover:bg-blue-500 hover:border-blue-600 hover:text-white transition-colors`}
                      >
                        Hostel Student
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, userType: 'other' })
                          setFormErrors(prev => ({ ...prev, userType: undefined }))
                        }}
                        className={`px-4 py-2 rounded-lg border ${
                          formData.userType === 'other'
                            ? 'bg-blue-500 border-blue-600 text-white'
                            : 'bg-gray-700 border-gray-600 text-gray-300'
                        } hover:bg-blue-500 hover:border-blue-600 hover:text-white transition-colors`}
                      >
                        Other
                      </button>
                    </div>
                    {formErrors.userType && (
                      <div className="flex items-center mt-1 text-red-500 text-xs md:text-sm">
                        <FiAlertCircle className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                        {formErrors.userType}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end mt-6 md:mt-8">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleNextStep}
                    className="px-6 py-2 md:px-8 md:py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
                  >
                    Next Step
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Address Details */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4 md:space-y-6"
              >
                <h2 className="text-xl md:text-2xl font-semibold text-white mb-4 md:mb-6">Address Details</h2>
                
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1 md:mb-2">
                      House/Flat/Hostel <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FiHome className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={formData.address.house}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            address: { ...formData.address, house: e.target.value }
                          })
                          setFormErrors(prev => ({ ...prev, house: undefined }))
                        }}
                        className={`w-full pl-10 pr-4 py-2 bg-gray-700 border ${
                          formErrors.house ? 'border-red-500' : 'border-gray-600'
                        } rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                        placeholder="Enter house/flat/hostel details"
                      />
                      {formErrors.house && (
                        <div className="flex items-center mt-1 text-red-500 text-xs md:text-sm">
                          <FiAlertCircle className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                          {formErrors.house}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1 md:mb-2">
                      Street/Road <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.address.street}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          address: { ...formData.address, street: e.target.value }
                        })
                        setFormErrors(prev => ({ ...prev, street: undefined }))
                      }}
                      className={`w-full px-4 py-2 bg-gray-700 border ${
                        formErrors.street ? 'border-red-500' : 'border-gray-600'
                      } rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                      placeholder="Enter street/road"
                    />
                    {formErrors.street && (
                      <div className="flex items-center mt-1 text-red-500 text-xs md:text-sm">
                        <FiAlertCircle className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                        {formErrors.street}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1 md:mb-2">
                      Area <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.address.area}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          address: { ...formData.address, area: e.target.value }
                        })
                        setFormErrors(prev => ({ ...prev, area: undefined }))
                      }}
                      className={`w-full px-4 py-2 bg-gray-700 border ${
                        formErrors.area ? 'border-red-500' : 'border-gray-600'
                      } rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                      placeholder="Enter area"
                    />
                    {formErrors.area && (
                      <div className="flex items-center mt-1 text-red-500 text-xs md:text-sm">
                        <FiAlertCircle className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                        {formErrors.area}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1 md:mb-2">
                      Landmark
                    </label>
                    <div className="relative">
                      <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={formData.address.landmark}
                        onChange={(e) => setFormData({
                          ...formData,
                          address: { ...formData.address, landmark: e.target.value }
                        })}
                        className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter landmark"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1 md:mb-2">
                      State <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.address.state}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          address: { ...formData.address, state: e.target.value }
                        })
                        setFormErrors(prev => ({ ...prev, state: undefined }))
                      }}
                      className={`w-full px-4 py-2 bg-gray-700 border ${
                        formErrors.state ? 'border-red-500' : 'border-gray-600'
                      } rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                      placeholder="Enter state"
                    />
                    {formErrors.state && (
                      <div className="flex items-center mt-1 text-red-500 text-xs md:text-sm">
                        <FiAlertCircle className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                        {formErrors.state}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1 md:mb-2">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.address.city}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          address: { ...formData.address, city: e.target.value }
                        })
                        setFormErrors(prev => ({ ...prev, city: undefined }))
                      }}
                      className={`w-full px-4 py-2 bg-gray-700 border ${
                        formErrors.city ? 'border-red-500' : 'border-gray-600'
                      } rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                      placeholder="Enter city"
                    />
                    {formErrors.city && (
                      <div className="flex items-center mt-1 text-red-500 text-xs md:text-sm">
                        <FiAlertCircle className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                        {formErrors.city}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1 md:mb-2">
                      Pincode <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.address.pincode}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          address: { ...formData.address, pincode: e.target.value }
                        })
                        setFormErrors(prev => ({ ...prev, pincode: undefined }))
                      }}
                      className={`w-full px-4 py-2 bg-gray-700 border ${
                        formErrors.pincode ? 'border-red-500' : 'border-gray-600'
                      } rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                      placeholder="Enter pincode"
                    />
                    {formErrors.pincode && (
                      <div className="flex items-center mt-1 text-red-500 text-xs md:text-sm">
                        <FiAlertCircle className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                        {formErrors.pincode}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-between mt-6 md:mt-8">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handlePreviousStep}
                    className="px-6 py-2 md:px-8 md:py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors shadow-lg"
                  >
                    Previous Step
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleNextStep}
                    className="px-6 py-2 md:px-8 md:py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
                  >
                    Next Step
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Document Upload */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6 md:space-y-8"
              >
                <h2 className="text-xl md:text-2xl font-semibold text-white mb-4 md:mb-6">Document Upload</h2>
                
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
                  <div className="space-y-4 md:space-y-6">
                    <div className="relative group">
                      <label className="block text-sm font-medium text-gray-300 mb-1 md:mb-2">
                        ID Proof <span className="text-red-500">*</span>
                      </label>
                      <div className={`relative border-2 border-dashed ${
                        formErrors.idProof ? 'border-red-500' : 'border-gray-600'
                      } rounded-lg p-4 md:p-6 transition-all duration-200 group-hover:border-blue-500`}>
                        <input
                          type="file"
                          onChange={handleFileChange('idProof')}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          accept="image/*,.pdf"
                        />
                        <div className="flex flex-col items-center justify-center text-center">
                          <FiUpload className="w-6 h-6 md:w-8 md:h-8 text-gray-400 mb-2 group-hover:text-blue-500 transition-colors" />
                          <p className="text-sm text-gray-400 group-hover:text-gray-300">
                            {formData.documents.idProof
                              ? formData.documents.idProof.name
                              : 'Drag & drop or click to upload'}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Supported formats: JPG, PNG, PDF
                          </p>
                        </div>
                      </div>
                      {formErrors.idProof && (
                        <div className="flex items-center mt-1 text-red-500 text-xs md:text-sm">
                          <FiAlertCircle className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                          {formErrors.idProof}
                        </div>
                      )}
                    </div>

                    <div className="relative group">
                      <label className="block text-sm font-medium text-gray-300 mb-1 md:mb-2">
                        Photo <span className="text-red-500">*</span>
                      </label>
                      <div className={`relative border-2 border-dashed ${
                        formErrors.photo ? 'border-red-500' : 'border-gray-600'
                      } rounded-lg p-4 md:p-6 transition-all duration-200 group-hover:border-blue-500`}>
                        <input
                          type="file"
                          onChange={handleFileChange('photo')}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          accept="image/*"
                        />
                        <div className="flex flex-col items-center justify-center text-center">
                          <FiUpload className="w-6 h-6 md:w-8 md:h-8 text-gray-400 mb-2 group-hover:text-blue-500 transition-colors" />
                          <p className="text-sm text-gray-400 group-hover:text-gray-300">
                            {formData.documents.photo
                              ? formData.documents.photo.name
                              : 'Drag & drop or click to upload'}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Supported formats: JPG, PNG
                          </p>
                        </div>
                      </div>
                      {formErrors.photo && (
                        <div className="flex items-center mt-1 text-red-500 text-xs md:text-sm">
                          <FiAlertCircle className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                          {formErrors.photo}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-6 md:mt-8">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handlePreviousStep}
                    className="px-6 py-2 md:px-8 md:py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors shadow-lg"
                  >
                    Previous Step
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleNextStep}
                    className="px-6 py-2 md:px-8 md:py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
                  >
                    Next Step
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Find Nearby NGOs */}
            {currentStep === 4 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4 md:space-y-6"
              >
                <h2 className="text-xl md:text-2xl font-semibold text-white mb-4 md:mb-6">Find Nearby NGOs</h2>
                
                <div className="space-y-4 md:space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-300 mb-1 md:mb-2">
                        Your Location
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={formData.address.area}
                          readOnly
                          className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
                          placeholder="Your location will appear here"
                        />
                        <button
                          type="button"
                          onClick={async () => {
                            try {
                              const position = await new Promise((resolve, reject) => {
                                navigator.geolocation.getCurrentPosition(resolve, reject);
                              });
                              const { latitude, longitude } = (position as GeolocationPosition).coords;
                              setFormData(prev => ({
                                ...prev,
                                address: {
                                  ...prev.address,
                                  area: `${latitude}, ${longitude}`
                                }
                              }));
                            } catch (error) {
                              console.error('Error getting location:', error);
                            }
                          }}
                          className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                        >
                          Get Location
                        </button>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setNearbyNgos([
                          {
                            id: 1,
                            name: 'Food Bank NGO',
                            rating: 4.5,
                            distance: '2.5 km',
                            area: 'Downtown',
                            image: 'https://static.vecteezy.com/system/resources/previews/019/636/946/large_2x/ngo-or-non-governmental-organization-to-serve-specific-social-and-political-needs-in-template-hand-drawn-cartoon-flat-illustration-vector.jpg'
                          },
                          {
                            id: 2,
                            name: 'Community Food Share',
                            rating: 4.2,
                            distance: '3.1 km',
                            area: 'Westside',
                            image: 'https://static.vecteezy.com/system/resources/previews/019/636/946/large_2x/ngo-or-non-governmental-organization-to-serve-specific-social-and-political-needs-in-template-hand-drawn-cartoon-flat-illustration-vector.jpg'
                          }
                        ]);
                      }}
                      className="self-end px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Find NGOs
                    </button>
                  </div>

                  {error && (
                    <div className="flex items-center text-red-500 text-sm">
                      <FiAlertCircle className="w-4 h-4 mr-1" />
                      {error}
                    </div>
                  )}

                  <div className="space-y-3 md:space-y-4">
                    {nearbyNgos.map((ngo) => (
                      <motion.div
                        key={ngo.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedNgo(ngo.id)}
                        className={`p-4 bg-gray-800/50 rounded-lg flex gap-4 items-center cursor-pointer transition-all duration-200 ${
                          selectedNgo === ngo.id ? 'ring-2 ring-blue-500' : 'hover:bg-gray-700/50'
                        }`}
                      >
                        <img 
                          src={ngo.image} 
                          alt={ngo.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="text-white font-medium">{ngo.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <FiStar
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < Math.floor(ngo.rating)
                                      ? 'text-yellow-400'
                                      : 'text-gray-400'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-gray-400 text-sm">{ngo.rating}</span>
                          </div>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-gray-400 text-sm flex items-center gap-1">
                              <FiMapPin className="w-4 h-4" />
                              {ngo.distance}
                            </span>
                            <span className="text-gray-400 text-sm">{ngo.area}</span>
                          </div>
                        </div>
                        {selectedNgo === ngo.id && (
                          <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                            <FiCheck className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between mt-6 md:mt-8">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handlePreviousStep}
                    className="px-6 py-2 md:px-8 md:py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors shadow-lg"
                  >
                    Previous Step
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSubmit}
                    disabled={isLoading || !selectedNgo}
                    className="px-6 py-2 md:px-8 md:py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Submitting...' : 'Submit Request'}
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Submission Popup */}
            <AnimatePresence>
              {showSubmissionPopup && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-gray-800 rounded-xl p-6 md:p-8 max-w-md w-full mx-4 shadow-2xl border border-gray-700"
                  >
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FiCheck className="w-8 h-8 text-green-500" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">Request Submitted Successfully!</h3>
                      <p className="text-gray-400 mb-6">
                        Your food request has been submitted. We will notify you once it approved.
                      </p>
                      <button
                        onClick={() => {
                          setShowSubmissionPopup(false);
                          setRequestType(null);
                          setCurrentStep(1);
                          setFormData({
                            fullName: '',
                            gender: '',
                            dateOfBirth: '',
                            email: '',
                            contactNumber: '',
                            userType: null,
                            address: {
                              house: '',
                              street: '',
                              area: '',
                              landmark: '',
                              state: '',
                              city: '',
                              pincode: ''
                            },
                            documents: {
                              idProof: null,
                              photo: null
                            }
                          });
                        }}
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        Done
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Existing Request Form */}
        {requestType === 'existing' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-md mx-auto bg-gradient-to-br from-gray-800 to-gray-800/80 rounded-xl p-6 md:p-8 shadow-xl border border-gray-700"
          >
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-4 md:mb-6">Check Request Status</h2>
            
            <div className="space-y-4 md:space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1 md:mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-grow">
                    <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      value={existingEmail}
                      onChange={(e) => {
                        setExistingEmail(e.target.value)
                        setError(null)
                      }}
                      className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
                      placeholder="Enter your email"
                      disabled={showExistingOtp}
                    />
                  </div>
                  {!showExistingOtp && (
                    <button
                      type="button"
                      onClick={handleSendExistingOtp}
                      disabled={isLoading || !existingEmail}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                    >
                      {isLoading ? 'Sending...' : 'Send OTP'}
                    </button>
                  )}
                </div>
              </div>

              {showExistingOtp && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1 md:mb-2">
                    OTP <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => {
                      setOtp(e.target.value)
                      setError(null)
                    }}
                    className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
                    placeholder="Enter OTP"
                  />
                </div>
              )}

              {error && (
                <div className="flex items-center text-red-500 text-sm">
                  <FiAlertCircle className="w-4 h-4 mr-1" />
                  {error}
                </div>
              )}

              {showExistingOtp && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleExistingRequest}
                  disabled={isLoading}
                  className="w-full px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Verifying...' : 'Verify OTP'}
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}