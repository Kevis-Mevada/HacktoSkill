'use client'

import Navbar from '@/components/navigation/Navbar'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <main className="pt-16">
        {children}
      </main>
    </div>
  )
} 