import { createContext, useContext, useEffect, useState } from 'react'
import type { AuthContextType, User } from '../types/auth'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const storedToken = localStorage.getItem('jwt')
    if (storedToken) setToken(storedToken)
  }, [])

  async function login(email: string, password: string) {
    try {
      const res = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      if (!res.ok) return false
      const data = await res.json()
      setToken(data.token)
      localStorage.setItem('jwt', data.token)
      setUser(data.user)
      return true
    } catch {
      return false
    }
  }

  async function register(email: string, password: string) {
    try {
      const res = await fetch('/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      if (!res.ok) return false
      const data = await res.json()
      setToken(data.token)
      localStorage.setItem('jwt', data.token)
      setUser(data.user)
      return true
    } catch {
      return false
    }
  }

  function logout() {
    setToken(null)
    setUser(null)
    localStorage.removeItem('jwt')
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
