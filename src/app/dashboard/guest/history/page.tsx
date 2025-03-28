// 'use client'

// import { useState } from 'react'
// import { motion } from 'framer-motion'
// import Navbar from '@/components/navigation/Navbar'
// import Link from 'next/link'

// const mockHistory = [
//   {
//     id: 1,
//     type: 'Food Request',
//     status: 'Completed',
//     date: '2024-03-15',
//     time: '14:30',
//     details: 'Requested 2 meals from Food Bank A',
//     location: '123 Main St, City',
//   },
//   {
//     id: 2,
//     type: 'Volunteer',
//     status: 'Completed',
//     date: '2024-03-10',
//     time: '09:00',
//     details: 'Helped distribute food at Community Center',
//     location: '456 Community Ave, City',
//   },
//   {
//     id: 3,
//     type: 'Food Request',
//     status: 'Completed',
//     date: '2024-03-05',
//     time: '16:45',
//     details: 'Requested 1 meal from Restaurant B',
//     location: '789 Food St, City',
//   },
//   {
//     id: 4,
//     type: 'Volunteer',
//     status: 'Completed',
//     date: '2024-02-28',
//     time: '10:00',
//     details: 'Assisted in food packaging',
//     location: '321 Service Rd, City',
//   },
// ]

// export default function GuestHistory() {
//   const [filter, setFilter] = useState('all')

//   const filteredHistory = mockHistory.filter((item) => {
//     if (filter === 'all') return true
//     return item.type === filter
//   })

//   return (
//     <div className="min-h-screen bg-black text-white">
//       <Navbar />
      
//       <div className="pt-32 pb-16 px-4">
//         <div className="max-w-7xl mx-auto">
//           <div className="flex flex-col md:flex-row gap-8">
//             {/* Sidebar Navigation */}
//             <div className="w-full md:w-64">
//               <motion.div
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className="bg-gray-900 rounded-lg p-6"
//               >
//                 <div className="space-y-4">
//                   <Link
//                     href="/dashboard/guest/profile"
//                     className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white"
//                   >
//                     <svg
//                       className="w-5 h-5"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                       />
//                     </svg>
//                     <span>Profile</span>
//                   </Link>
//                   <Link
//                     href="/dashboard/guest/history"
//                     className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-white text-black"
//                   >
//                     <svg
//                       className="w-5 h-5"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//                       />
//                     </svg>
//                     <span>History</span>
//                   </Link>
//                   <Link
//                     href="/dashboard/guest/food-request"
//                     className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white"
//                   >
//                     <svg
//                       className="w-5 h-5"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
//                       />
//                     </svg>
//                     <span>Food Request</span>
//                   </Link>
//                 </div>
//                 <div className="mt-8 pt-8 border-t border-gray-800">
//                   <button
//                     onClick={() => {/* Add logout logic */}}
//                     className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-red-400 hover:bg-red-400/10 transition-colors duration-200"
//                   >
//                     <svg
//                       className="w-5 h-5"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
//                       />
//                     </svg>
//                     <span>Log Out</span>
//                   </button>
//                 </div>
//               </motion.div>
//             </div>

//             {/* Main Content */}
//             <div className="flex-1">
//               <motion.div
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className="bg-gray-900 rounded-lg p-8"
//               >
//                 <div className="flex justify-between items-center mb-8">
//                   <h1 className="text-2xl font-bold">History</h1>
//                   <div className="flex space-x-4">
//                     <button
//                       onClick={() => setFilter('all')}
//                       className={`px-4 py-2 rounded-md transition-colors duration-200 ${
//                         filter === 'all'
//                           ? 'bg-white text-black'
//                           : 'bg-transparent border border-white text-white hover:bg-white hover:text-black'
//                       }`}
//                     >
//                       All
//                     </button>
//                     <button
//                       onClick={() => setFilter('Food Request')}
//                       className={`px-4 py-2 rounded-md transition-colors duration-200 ${
//                         filter === 'Food Request'
//                           ? 'bg-white text-black'
//                           : 'bg-transparent border border-white text-white hover:bg-white hover:text-black'
//                       }`}
//                     >
//                       Food Requests
//                     </button>
//                     <button
//                       onClick={() => setFilter('Volunteer')}
//                       className={`px-4 py-2 rounded-md transition-colors duration-200 ${
//                         filter === 'Volunteer'
//                           ? 'bg-white text-black'
//                           : 'bg-transparent border border-white text-white hover:bg-white hover:text-black'
//                       }`}
//                     >
//                       Volunteering
//                     </button>
//                   </div>
//                 </div>

//                 <div className="space-y-4">
//                   {filteredHistory.map((item) => (
//                     <motion.div
//                       key={item.id}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       className="bg-gray-800 rounded-lg p-6"
//                     >
//                       <div className="flex items-center justify-between mb-4">
//                         <div className="flex items-center space-x-4">
//                           <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
//                             <svg
//                               className="w-5 h-5 text-black"
//                               fill="none"
//                               stroke="currentColor"
//                               viewBox="0 0 24 24"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth={2}
//                                 d={
//                                   item.type === 'Food Request'
//                                     ? 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
//                                     : 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
//                                 }
//                               />
//                             </svg>
//                           </div>
//                           <div>
//                             <h3 className="font-medium">{item.type}</h3>
//                             <p className="text-sm text-gray-400">
//                               {item.date} at {item.time}
//                             </p>
//                           </div>
//                         </div>
//                         <span className="px-3 py-1 rounded-full text-sm bg-green-500/20 text-green-400">
//                           {item.status}
//                         </span>
//                       </div>
//                       <div className="space-y-2">
//                         <p className="text-gray-300">{item.details}</p>
//                         <p className="text-sm text-gray-400">
//                           <svg
//                             className="inline-block w-4 h-4 mr-1"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//                             />
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                             />
//                           </svg>
//                           {item.location}
//                         </p>
//                       </div>
//                     </motion.div>
//                   ))}
//                 </div>
//               </motion.div>
//             </div>
//           </div>
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

const mockHistory: any[] = [
  // ... (keep your existing mockHistory data)
]

export default function GuestHistory() {
  const [filter, setFilter] = useState('all')

  const filteredHistory = mockHistory.filter((item) => {
    if (filter === 'all') return true
    return item.type === filter
  })

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <div className="pt-24 md:pt-32 pb-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            {/* Sidebar Navigation - Always visible */}
            <div className="w-full md:w-64">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-900 rounded-lg p-6"
              >
                <div className="space-y-4">
                  <Link
                    href="/dashboard/guest/profile"
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
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span>Profile</span>
                  </Link>
                  <Link
                    href="/dashboard/guest/history"
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-white text-black"
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
                    href="/dashboard/guest/food-request"
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
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span>Food Request</span>
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
                className="bg-gray-900 rounded-lg p-6 md:p-8"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 md:mb-8">
                  <h1 className="text-2xl font-bold mb-4 sm:mb-0">History</h1>
                  <div className="flex flex-wrap gap-2 sm:gap-4">
                    <button
                      onClick={() => setFilter('all')}
                      className={`px-3 py-1 sm:px-4 sm:py-2 rounded-md transition-colors duration-200 ${
                        filter === 'all'
                          ? 'bg-white text-black'
                          : 'bg-transparent border border-white text-white hover:bg-white hover:text-black'
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setFilter('Food Request')}
                      className={`px-3 py-1 sm:px-4 sm:py-2 rounded-md transition-colors duration-200 ${
                        filter === 'Food Request'
                          ? 'bg-white text-black'
                          : 'bg-transparent border border-white text-white hover:bg-white hover:text-black'
                      }`}
                    >
                      Food Requests
                    </button>
                    <button
                      onClick={() => setFilter('Volunteer')}
                      className={`px-3 py-1 sm:px-4 sm:py-2 rounded-md transition-colors duration-200 ${
                        filter === 'Volunteer'
                          ? 'bg-white text-black'
                          : 'bg-transparent border border-white text-white hover:bg-white hover:text-black'
                      }`}
                    >
                      Volunteering
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {filteredHistory.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gray-800 rounded-lg p-4 sm:p-6"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                        <div className="flex items-center space-x-4 mb-3 sm:mb-0">
                          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                            <svg
                              className="w-5 h-5 text-black"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d={
                                  item.type === 'Food Request'
                                    ? 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
                                    : 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
                                }
                              />
                            </svg>
                          </div>
                          <div>
                            <h3 className="font-medium">{item.type}</h3>
                            <p className="text-sm text-gray-400">
                              {item.date} at {item.time}
                            </p>
                          </div>
                        </div>
                        <span className="px-3 py-1 rounded-full text-sm bg-green-500/20 text-green-400">
                          {item.status}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <p className="text-gray-300">{item.details}</p>
                        <p className="text-sm text-gray-400">
                          <svg
                            className="inline-block w-4 h-4 mr-1"
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
                          {item.location}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}