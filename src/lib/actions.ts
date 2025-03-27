type Result = { success: boolean; error?: string }

export async function registerGuest(_formData: FormData): Promise<Result> {
  void _formData // Explicitly marking it as unused
  return { success: true }
}

export async function registerNGO(_formData: FormData): Promise<Result> {
  void _formData // Explicitly marking it as unused
  return { success: true }
}

export async function registerRestaurant(_formData: FormData): Promise<Result> {
  void _formData // Explicitly marking it as unused
  return { success: true }
}

export async function signIn(email: string, password: string, role: string, rememberMe: boolean) {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))

    const storage = rememberMe ? localStorage : sessionStorage
    storage.setItem('authToken', 'dummy-token')
    storage.setItem('userRole', role)

    return { success: true }
  } catch {
    return { success: false, error: 'Invalid credentials' }
  }
}

export async function signOut() {
  localStorage.removeItem('authToken')
  localStorage.removeItem('userRole')
  sessionStorage.removeItem('authToken')
  sessionStorage.removeItem('userRole')
  return { success: true }
}
