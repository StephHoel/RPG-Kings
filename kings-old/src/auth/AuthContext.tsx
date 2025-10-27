import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import type { User } from '@/types/user'
import type { AuthContextType } from '../types/authContextType'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedToken = localStorage.getItem('jwt')
    if (storedToken) setToken(storedToken)

    const storedUser = localStorage.getItem('user')
    if (storedUser) setUser(JSON.parse(storedUser))

    setLoading(false)
  }, [])

  async function login(_email: string, _passwordd: string) {
    try {
      // const res = await fetch('/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password }),
      // })

      // if (!res.ok) return false

      // const data = await res.json()
      const data = {
        token: 'abc.anc',
        user: {
          id: 'string',
          email: 'steph@hoel.com',
          name: 'Steph',
        },
      }
      setToken(data.token)
      localStorage.setItem('jwt', data.token)

      setUser(data.user)
      localStorage.setItem('user', JSON.stringify(data.user))

      return true
    } catch {
      return false
    }
  }

  async function register(name: string, email: string, password: string) {
    try {
      const res = await fetch('/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
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
    <AuthContext.Provider value={{ user, token, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)

  if (!ctx) throw new Error('useAuth must be used within AuthProvider')

  return ctx
}
