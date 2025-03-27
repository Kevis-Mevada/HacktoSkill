type Result = { success: boolean; error?: string }

export async function registerGuest(formData: FormData): Promise<Result> {
  // TODO: Implement actual API call
  return { success: true }
}

export async function registerNGO(formData: FormData): Promise<Result> {
  // TODO: Implement actual API call
  return { success: true }
}

export async function registerRestaurant(formData: FormData): Promise<Result> {
  // TODO: Implement actual API call
  return { success: true }
}

export async function signIn(email: string, password: string, role: string, rememberMe: boolean) {
  try {
    // TODO: Implement actual API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Store auth data in localStorage or sessionStorage
    const storage = rememberMe ? localStorage : sessionStorage
    storage.setItem('authToken', 'dummy-token')
    storage.setItem('userRole', role)

    return { success: true }
  } catch (error) {
    return { success: false, error: 'Invalid credentials' }
  }
}

export async function signOut() {
  // Clear both storages to ensure complete logout
  localStorage.removeItem('authToken')
  localStorage.removeItem('userRole')
  sessionStorage.removeItem('authToken')
  sessionStorage.removeItem('userRole')
  return { success: true }
} 