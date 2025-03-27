'use client'

import { useState, useEffect } from 'react'

type UserRole = 'guest' | 'ngo' | 'restaurant' | null

export function useAuth() {
  const [userRole, setUserRole] = useState<UserRole>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for auth token in localStorage or sessionStorage
    const authToken = localStorage.getItem('authToken') || sessionStorage.getItem('authToken')
    
    if (authToken) {
      // In a real app, you would validate the token and get the user role from your backend
      // For now, we'll simulate getting the role from the token
      const role = localStorage.getItem('userRole') || sessionStorage.getItem('userRole')
      setUserRole(role as UserRole)
    }
    
    setIsLoading(false)
  }, [])

  return {
    userRole,
    isLoading,
  }
} 