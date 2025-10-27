import type { JSX } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/auth/AuthContext'
import { url } from '@/constants/routes'

export function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { token, loading } = useAuth()

  if (loading === false && token === null)
    return <Navigate to={url.index} replace />

  return children
}
