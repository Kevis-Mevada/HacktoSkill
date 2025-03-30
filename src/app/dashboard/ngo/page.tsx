// 'use client'

// import { motion } from 'framer-motion'
// import { useRouter } from 'next/navigation'

// export default function NGODashboard() {
//   const router = useRouter()

//   const handleLogout = () => {
//     localStorage.removeItem('userRole')
//     router.push('/')
//   }

//   return (
//     <div className="min-h-screen bg-gray-900">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold text-white">NGO Dashboard</h1>
//           <button
//             onClick={handleLogout}
//             className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
//           >
//             Logout
//           </button>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           <motion.div
//             whileHover={{ scale: 1.02 }}
//             className="bg-gray-800 p-6 rounded-lg shadow-lg"
//           >
//             <h2 className="text-xl font-semibold text-white mb-4">Pending Requests</h2>
//             <p className="text-gray-300">View and manage food donation requests</p>
//             <button
//               onClick={() => router.push('/dashboard/ngo/pending-requests')}
//               className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
//             >
//               View Requests
//             </button>
//           </motion.div>

//           <motion.div
//             whileHover={{ scale: 1.02 }}
//             className="bg-gray-800 p-6 rounded-lg shadow-lg"
//           >
//             <h2 className="text-xl font-semibold text-white mb-4">Active Donations</h2>
//             <p className="text-gray-300">Track ongoing food donations</p>
//             <button
//               onClick={() => router.push('/dashboard/ngo/active-donations')}
//               className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
//             >
//               View Donations
//             </button>
//           </motion.div>

//           <motion.div
//             whileHover={{ scale: 1.02 }}
//             className="bg-gray-800 p-6 rounded-lg shadow-lg"
//           >
//             <h2 className="text-xl font-semibold text-white mb-4">Profile Settings</h2>
//             <p className="text-gray-300">Update your NGO profile information</p>
//             <button
//               onClick={() => router.push('/dashboard/ngo/profile')}
//               className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
//             >
//               Edit Profile
//             </button>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   )
// }   

'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/navigation/Navbar'
import Link from 'next/link'
import { 
  HeartIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon,
  DocumentTextIcon,
  GlobeAltIcon,
  CheckBadgeIcon
} from '@heroicons/react/24/solid'

export default function NGOProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: 'Green Earth Foundation',
    email: 'contact@greenearth.org',
    phone: '+1 555-123-4567',
    address: '123 Eco Street, Green City',
    registrationNumber: 'NGO-12345',
    description: 'We are dedicated to environmental conservation and sustainable development initiatives worldwide.',
    website: 'https://greenearth.org',
    isVerified: true
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsEditing(false)
    // Add profile update logic here
  }

  return (
    <div className="min-h-screen bg-black text-white">
    <Navbar />
    
    <div className="pt-24 md:pt-32 pb-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {/* Sidebar Navigation */}
          <div className="w-full md:w-64">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-900 rounded-lg p-4 md:p-6"
            >
              <div className="space-y-3 md:space-y-4">
                <Link
                  href="/dashboard/ngo/profile"
                  className="flex items-center space-x-3 px-3 py-2 md:px-4 md:py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white text-sm md:text-base"
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
                  href="/dashboard/ngo/history"
                  className="flex items-center space-x-3 px-3 py-2 md:px-4 md:py-3 rounded-lg bg-white text-black text-sm md:text-base"
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
                  href="/dashboard/ngo/pending-requests"
                  className="flex items-center space-x-3 px-3 py-2 md:px-4 md:py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white text-sm md:text-base"
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
                  <span>Pending Requests</span>
                </Link>
                <Link
                  href="/dashboard/ngo/accepted-requests"
                  className="flex items-center space-x-3 px-3 py-2 md:px-4 md:py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white text-sm md:text-base"
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Accepted Requests</span>
                </Link>
                <Link
                  href="/dashboard/ngo/volunteers"
                  className="flex items-center space-x-3 px-3 py-2 md:px-4 md:py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white text-sm md:text-base"
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
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span>Volunteers</span>
                </Link>
              </div>
              <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-gray-800">
                <button
                  onClick={() => {/* Add logout logic */}}
                  className="flex items-center space-x-3 w-full px-3 py-2 md:px-4 md:py-3 rounded-lg text-red-400 hover:bg-red-400/10 transition-colors duration-200 text-sm md:text-base"
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
                <div className="flex justify-between items-center mb-8">
                  <h1 className="text-2xl font-bold">NGO Profile</h1>
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
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Organization Name
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <HeartIcon className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            value={profile.name}
                            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Registration Number
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <DocumentTextIcon className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            value={profile.registrationNumber}
                            onChange={(e) => setProfile({ ...profile, registrationNumber: e.target.value })}
                            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Email Address
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="email"
                            value={profile.email}
                            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Phone Number
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <PhoneIcon className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="tel"
                            value={profile.phone}
                            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Website
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <GlobeAltIcon className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="url"
                            value={profile.website}
                            onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
                            placeholder="https://"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MapPinIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <textarea
                          value={profile.address}
                          onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                          className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
                          rows={3}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Organization Description
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <DocumentTextIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <textarea
                          value={profile.description}
                          onChange={(e) => setProfile({ ...profile, description: e.target.value })}
                          className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-white"
                          rows={4}
                          required
                        />
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <button
                        type="submit"
                        className="px-6 py-2 bg-white text-black rounded-md hover:bg-gray-200 transition-colors duration-200"
                      >
                        Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="px-6 py-2 bg-transparent border border-white text-white rounded-md hover:bg-white hover:text-black transition-colors duration-200"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-sm font-medium text-gray-400">Organization Name</h3>
                        <p className="mt-1 text-lg">{profile.name}</p>
                      </div>
                      {profile.isVerified && (
                        <div className="flex items-center bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                          <CheckBadgeIcon className="h-4 w-4 mr-1" />
                          Verified
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-sm font-medium text-gray-400">Registration Number</h3>
                        <p className="mt-1 text-lg">{profile.registrationNumber}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-400">Email Address</h3>
                        <p className="mt-1 text-lg">{profile.email}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-400">Phone Number</h3>
                        <p className="mt-1 text-lg">{profile.phone}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-400">Website</h3>
                        <p className="mt-1 text-lg">
                          <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                            {profile.website}
                          </a>
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-400">Address</h3>
                      <p className="mt-1 text-lg">{profile.address}</p>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-400">Organization Description</h3>
                      <p className="mt-1 text-lg whitespace-pre-line">{profile.description}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}