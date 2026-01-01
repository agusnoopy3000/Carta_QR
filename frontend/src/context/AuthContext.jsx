import { createContext, useContext, useState, useEffect } from 'react'
import { adminService } from '../services/adminService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Intentar restaurar sesión al cargar
    const restored = adminService.restoreSession()
    setIsAuthenticated(restored)
    setLoading(false)
  }, [])

  const login = async (username, password) => {
    await adminService.login(username, password)
    setIsAuthenticated(true)
  }

  const logout = () => {
    adminService.logout()
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider')
  }
  return context
}
