import type { JSX } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/auth/AuthContext'

export function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { token } = useAuth()
  if (!token) return <Navigate to='/' replace />
  return children
}
