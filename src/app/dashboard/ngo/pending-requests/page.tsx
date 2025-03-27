'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/navigation/Navbar'
import Link from 'next/link'

const mockPendingRequests = [
  {
    id: 1,
    guestName: 'John Doe',
    numberOfPeople: 4,
    preferredTime: '2024-03-20T14:00',
    location: '123 Main St, City',
    foodItems: ['Rice', 'Vegetables', 'Fruits'],
    specialRequirements: 'No spicy food',
    contact: '+91 98765 43210',
    requestDate: '2024-03-19T10:30',
  },
  {
    id: 2,
    guestName: 'Jane Smith',
    numberOfPeople: 2,
    preferredTime: '2024-03-20T15:30',
    location: '456 Community Ave, City',
    foodItems: ['Bread', 'Dairy', 'Snacks'],
    specialRequirements: 'Vegetarian only',
    contact: '+91 98765 43211',
    requestDate: '2024-03-19T11:15',
  },
  {
    id: 3,
    guestName: 'Mike Johnson',
    numberOfPeople: 6,
    preferredTime: '2024-03-20T16:00',
    location: '789 Hope St, City',
    foodItems: ['Hot Meals', 'Water', 'Fruits'],
    specialRequirements: 'Halal food required',
    contact: '+91 98765 43212',
    requestDate: '2024-03-19T12:00',
  },
]

export default function PendingRequests() {
  const handleAccept = (requestId: number) => {
    console.log('Accepting request:', requestId)
  }

  const handleReject = (requestId: number) => {
    console.log('Rejecting request:', requestId)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <div className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-64">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-900 rounded-lg p-6"
              >
                <div className="space-y-4">
                  <SidebarLink href="/dashboard/ngo/profile" label="Profile" />
                  <SidebarLink href="/dashboard/ngo/history" label="History" />
                  <SidebarLink href="/dashboard/ngo/pending-requests" label="Pending Requests" active />
                  <SidebarLink href="/dashboard/ngo/accepted-requests" label="Accepted Requests" />
                </div>
              </motion.div>
            </div>

            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-900 rounded-lg p-8"
              >
                <h1 className="text-2xl font-bold mb-8">Pending Food Requests</h1>

                <div className="space-y-6">
                  {mockPendingRequests.map((request) => (
                    <motion.div
                      key={request.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gray-800 rounded-lg p-6"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-medium">{request.guestName}</h3>
                          <p className="text-sm text-gray-400">
                            Requested on: {new Date(request.requestDate).toLocaleString()}
                          </p>
                        </div>
                        <div className="flex space-x-3">
                          <button
                            onClick={() => handleAccept(request.id)}
                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-200"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleReject(request.id)}
                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200"
                          >
                            Reject
                          </button>
                        </div>
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

function SidebarLink({ href, label, active = false }: { href: string; label: string; active?: boolean }) {
  return (
    <Link
      href={href}
      className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${
        active ? 'bg-white text-black' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
      }`}
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>{label}</span>
    </Link>
  )
}
