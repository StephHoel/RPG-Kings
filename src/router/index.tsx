import { createBrowserRouter, Navigate } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { URL_BASE, url } from '@/constants/routes'
import { Game } from '@/pages/Game'
import { Home } from '@/pages/Home'
import { ProtectedRoute } from './ProtectedRoute'

export const router = createBrowserRouter(
  [
    {
      element: <Layout />,
      children: [
        {
          path: url.index.replace(URL_BASE, ''),
          element: <Home />,
        },
        {
          path: url.game.replace(URL_BASE, ''),
          element: (
            <ProtectedRoute>
              <Game />
            </ProtectedRoute>
          ),
        },
        {
          path: url.notFound.replace(URL_BASE, ''),
          element: <Navigate to={'/'} replace={true} />,
        },
      ],
    },
  ],
  {
    basename: URL_BASE,
  },
)
