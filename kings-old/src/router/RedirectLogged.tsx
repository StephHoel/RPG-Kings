import type { JSX } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/auth/AuthContext'

export function RedirectLogged({ children }: { children: JSX.Element }) {
  const nav = useNavigate()
  const { token, loading, user } = useAuth()

  console.log('=========')

  if (loading === false && token !== null) {
    console.log('redirect logged')
    // window.location.href = (url.game)
    // return <Navigate to={url.game} replace />
  }

  console.log('loading', loading)
  console.log('token', token)
  console.log('user', user)

  // if (loading === false && token !== null && user !== null)

  // function redirect() {
  //   return <Navigate to={url.game} replace />
  // }

  // useEffect(() => {
  //   if (!loading && user && token) {
  //     // setRedirecting(true)
  //     // nav('/game', { replace: true })
  //     console.log('loading', loading)

  //     redirect()
  //   }

  // }, [loading])

  return children
}
