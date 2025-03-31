'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, ChangeEvent } from 'react'
import { 
  ArrowRightIcon, 
  BuildingStorefrontIcon,
  UserIcon,
  PhoneIcon,
  MapPinIcon,
  PhotoIcon,
  DocumentTextIcon,
  CheckBadgeIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import Image from 'next/image'

interface ProfileData {
  restaurantName: string
  ownerName: string
  email: string
  telephone: string
  state: string
  city: string
  area: string
  pincode: string
  photo: File | null
  license: File | null
  isVerified: boolean
}

export default function RestaurantWelcome() {
  const [showProfileSection, setShowProfileSection] = useState(false)
  const [isEditing, setIsEditing] = useState(true)
  const [showVerificationPopup, setShowVerificationPopup] = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [profile, setProfile] = useState<ProfileData>({
    restaurantName: '',
    ownerName: '',
    email: '',
    telephone: '',
    state: '',
    city: '',
    area: '',
    pincode: '',
    photo: null,
    license: null,
    isVerified: false
  })

  const photoInputRef = useRef<HTMLInputElement>(null)
  const licenseInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, field: 'photo' | 'license') => {
    if (e.target.files && e.target.files[0]) {
      setProfile({...profile, [field]: e.target.files[0]})
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!acceptedTerms) {
      alert('Please accept the terms and conditions')
      return
    }
    setIsEditing(false)
    setShowVerificationPopup(true)
  }

  const handleProfileClick = () => {
    setShowProfileSection(true)
    setTimeout(() => {
      document.getElementById('profile-section')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  function calculateCompletion(profileData: ProfileData) {
    const requiredFields = [
      'restaurantName', 
      'ownerName', 
      'email', 
      'telephone', 
      'state', 
      'city', 
      'area',
      'pincode'
    ]
    const completedFields = requiredFields.filter(field => profileData[field as keyof ProfileData] && profileData[field as keyof ProfileData]?.toString().trim() !== '').length
    return Math.round((completedFields / requiredFields.length) * 100)
  }

  const completionPercentage = calculateCompletion(profile)

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Verification Popup */}
      <AnimatePresence>
        {showVerificationPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-gray-900 rounded-xl p-8 max-w-md w-full border border-gray-800 relative"
            >
              <button
                onClick={() => setShowVerificationPopup(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
              
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-500/20 mb-6">
                  <CheckBadgeIcon className="h-8 w-8 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Profile Submitted!</h3>
                <p className="text-gray-300 mb-6">
                  Thank you for completing your restaurant profile. Our team will verify your details within 24 hours.
                </p>
                <button
                  onClick={() => setShowVerificationPopup(false)}
                  className="px-6 py-2 bg-white text-black rounded-md hover:bg-gray-200 transition-colors duration-200"
                >
                  Continue to Dashboard
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Welcome <span className="text-orange-400">Restaurant</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Thank you for joining our food donation platform. Let&apos;s get your restaurant profile set up.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Dashboard Card (disabled until profile is complete) */}
          <motion.div
            whileHover={{ scale: completionPercentage === 100 ? 1.03 : 1 }}
            className={`bg-gray-900 p-8 rounded-xl border ${completionPercentage === 100 ? 'border-gray-800 cursor-pointer hover:border-orange-500' : 'border-gray-800 cursor-not-allowed'} transition-all duration-300 group`}
          >
            <div className="flex flex-col items-center text-center">
              <div className={`p-4 rounded-full mb-6 ${completionPercentage === 100 ? 'bg-orange-500/10 group-hover:bg-orange-500/20' : 'bg-gray-800'}`}>
                <BuildingStorefrontIcon className={`h-10 w-10 ${completionPercentage === 100 ? 'text-orange-400' : 'text-gray-600'}`} />
              </div>
              <h2 className="text-2xl font-bold mb-3">Go to Dashboard</h2>
              <p className="text-gray-400 mb-6">
                {completionPercentage === 100 
                  ? "Manage your food donations and requests"
                  : "Complete your profile to access the dashboard"}
              </p>
              <div className={`flex items-center ${completionPercentage === 100 ? 'text-orange-400 group-hover:text-orange-300' : 'text-gray-600'}`}>
                <span>{completionPercentage === 100 ? "Explore now" : "Not available yet"}</span>
                {completionPercentage === 100 && <ArrowRightIcon className="h-5 w-5 ml-2" />}
              </div>
            </div>
          </motion.div>

          {/* Complete Profile Card */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleProfileClick}
            className="bg-gray-900 p-8 rounded-xl border border-gray-800 cursor-pointer transition-all duration-300 hover:border-green-500 group"
          >
            <div className="flex flex-col items-center text-center">
              <div className="p-4 bg-green-500/10 rounded-full mb-6 group-hover:bg-green-500/20 transition-colors">
                <BuildingStorefrontIcon className="h-10 w-10 text-green-400" />
              </div>
              <h2 className="text-2xl font-bold mb-3">Complete Profile</h2>
              <p className="text-gray-400 mb-6">Set up your restaurant&apos;s profile to get started</p>
              <div className="flex items-center text-green-400 group-hover:text-green-300 transition-colors">
                <span>{completionPercentage > 0 ? "Continue setup" : "Get started"}</span>
                <ArrowRightIcon className="h-5 w-5 ml-2" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Profile Section */}
        {showProfileSection && (
          <motion.div
            id="profile-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-24 max-w-4xl mx-auto bg-gray-900 rounded-xl p-8 border border-gray-800"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold flex items-center">
                <BuildingStorefrontIcon className="h-8 w-8 text-orange-400 mr-3" />
                <span>Restaurant Profile</span>
              </h2>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-white text-black rounded-md hover:bg-gray-200 transition-colors duration-200"
                >
                  Edit Profile
                </button>
              )}
            </div>

            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Restaurant Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Restaurant Name *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <BuildingStorefrontIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={profile.restaurantName}
                        onChange={(e) => setProfile({ ...profile, restaurantName: e.target.value })}
                        className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
                        required
                        placeholder="Your restaurant name"
                      />
                    </div>
                  </div>

                  {/* Owner Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Owner Name *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <UserIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={profile.ownerName}
                        onChange={(e) => setProfile({ ...profile, ownerName: e.target.value })}
                        className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
                        required
                        placeholder="Owner's full name"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
                      required
                      placeholder="contact@yourrestaurant.com"
                    />
                  </div>

                  {/* Telephone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Telephone *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <PhoneIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        value={profile.telephone}
                        onChange={(e) => setProfile({ ...profile, telephone: e.target.value })}
                        className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
                        required
                        placeholder="+1 555-123-4567"
                      />
                    </div>
                  </div>

                  {/* State */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      State *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPinIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={profile.state}
                        onChange={(e) => setProfile({ ...profile, state: e.target.value })}
                        className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
                        required
                        placeholder="Your state"
                      />
                    </div>
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      City *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPinIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={profile.city}
                        onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                        className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
                        required
                        placeholder="Your city"
                      />
                    </div>
                  </div>

                  {/* Area/Road/Landmark */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Area/Road/Landmark *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPinIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={profile.area}
                        onChange={(e) => setProfile({ ...profile, area: e.target.value })}
                        className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
                        required
                        placeholder="123 Main Road, Near Central Park"
                      />
                    </div>
                  </div>

                  {/* Pincode */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Pincode *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPinIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={profile.pincode}
                        onChange={(e) => setProfile({ ...profile, pincode: e.target.value })}
                        className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
                        required
                        placeholder="123456"
                      />
                    </div>
                  </div>

                  {/* Restaurant Photo Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Restaurant Photo
                    </label>
                    <div 
                      className="border-2 border-dashed border-gray-700 rounded-md p-4 text-center cursor-pointer hover:border-gray-600 transition-colors"
                      onClick={() => photoInputRef.current?.click()}
                    >
                      <input
                        type="file"
                        ref={photoInputRef}
                        onChange={(e) => handleFileChange(e, 'photo')}
                        className="hidden"
                        accept="image/*"
                      />
                      <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-400">
                        {profile.photo ? profile.photo.name : 'Click to upload restaurant photo'}
                      </p>
                    </div>
                  </div>

                  {/* License Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Upload Food License *
                    </label>
                    <div 
                      className="border-2 border-dashed border-gray-700 rounded-md p-4 text-center cursor-pointer hover:border-gray-600 transition-colors"
                      onClick={() => licenseInputRef.current?.click()}
                    >
                      <input
                        type="file"
                        ref={licenseInputRef}
                        onChange={(e) => handleFileChange(e, 'license')}
                        className="hidden"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      />
                      <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-400">
                        {profile.license ? profile.license.name : 'Click to upload food license'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start mt-6">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                      className="focus:ring-white h-4 w-4 text-orange-500 border-gray-700 rounded bg-gray-800"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="font-medium text-gray-300">
                      I accept the <a href="#" className="text-orange-400 hover:underline">Terms and Conditions</a>
                    </label>
                    <p className="text-gray-500">You agree to our terms of service and privacy policy</p>
                  </div>
                </div>

                {/* Submit Section */}
                <div className="pt-4">
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-400 mb-2">Profile Completion</h3>
                    <div className="w-full bg-gray-800 rounded-full h-2.5">
                      <div 
                        className="bg-orange-500 h-2.5 rounded-full" 
                        style={{ width: `${completionPercentage}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">{completionPercentage}% complete</p>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      disabled={completionPercentage < 100 || !acceptedTerms}
                      className={`px-6 py-2 rounded-md transition-colors duration-200 ${completionPercentage === 100 && acceptedTerms ? 'bg-white text-black hover:bg-gray-200' : 'bg-gray-700 text-gray-400 cursor-not-allowed'}`}
                    >
                      Submit Profile
                    </button>
                    {completionPercentage > 0 && (
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="px-6 py-2 bg-transparent border border-white text-white rounded-md hover:bg-white hover:text-black transition-colors duration-200"
                      >
                        Preview
                      </button>
                    )}
                  </div>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-medium text-gray-400">Restaurant Name</h3>
                    <p className="mt-1 text-lg">{profile.restaurantName || 'Not provided'}</p>
                  </div>
                  <div className="flex items-center bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm">
                    <span>Pending Verification</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-400">Owner Name</h3>
                    <p className="mt-1 text-lg">{profile.ownerName || 'Not provided'}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-400">Email</h3>
                    <p className="mt-1 text-lg">{profile.email || 'Not provided'}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-400">Telephone</h3>
                    <p className="mt-1 text-lg">{profile.telephone || 'Not provided'}</p>
                  </div>
                  <div className="md:col-span-2">
                    <h3 className="text-sm font-medium text-gray-400">Full Address</h3>
                    <p className="mt-1 text-lg">
                      {profile.area || profile.city || profile.state || profile.pincode 
                        ? `${profile.area}, ${profile.city}, ${profile.state} - ${profile.pincode}`
                        : 'Not provided'}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-400">Restaurant Photo</h3>
                    {profile.photo ? (
                      <div className="mt-2 w-32 h-32 bg-gray-800 rounded-md overflow-hidden">
                        <Image 
                          src={URL.createObjectURL(profile.photo)} 
                          alt="Restaurant Preview" 
                          width={128}
                          height={128}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    ) : (
                      <p className="mt-1 text-lg">Not provided</p>
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-400">Food License</h3>
                    {profile.license ? (
                      <div className="mt-2 flex items-center text-orange-400">
                        <DocumentTextIcon className="h-5 w-5 mr-2" />
                        <span>{profile.license.name}</span>
                      </div>
                    ) : (
                      <p className="mt-1 text-lg">Not provided</p>
                    )}
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-6 py-2 bg-white text-black rounded-md hover:bg-gray-200 transition-colors duration-200"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}