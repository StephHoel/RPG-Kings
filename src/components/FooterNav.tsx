'use client'
import Link from 'next/link'
import { useActiveSave } from '@/hooks/useActiveSave'
import { ROUTES } from '@/config/routes'

export function FooterNav() {
  const { activeSaveId } = useActiveSave()

  return (
    <footer className='text-sm w-full'>
      <nav className="sticky bottom-0 z-20  backdrop-blur my-2 border-y border-violet-400 md:hidden">
        <div className="mx-auto max-w-6xl grid grid-cols-5 text-center">
          <Link href={activeSaveId ? ROUTES.GAME(activeSaveId) : ROUTES.SAVES} className="p-3">Jogo</Link>
          <Link href={activeSaveId ? ROUTES.SHEET(activeSaveId) : ROUTES.SAVES} className="p-3">Ficha</Link>
          <Link href={activeSaveId ? ROUTES.PROGRESS(activeSaveId) : ROUTES.SAVES} className="p-3">Progresso</Link>
          <Link href={ROUTES.SAVES} className="p-3">Saves</Link>
          <Link href={ROUTES.SETTINGS} className="p-3">Config</Link>
        </div>
      </nav>
      <div className='container mx-auto px-4  text-center'>
        <p>© {new Date().getFullYear()} King's Academy by StephHoel</p>
      </div>
    </footer>
  )
}
