'use client'
import Link from 'next/link'
import { useActiveSaveContext } from '@/providers/useActiveSaveContext'
import { MENUS } from '@/config'

export function FooterNav() {
  const { activeSaveId } = useActiveSaveContext()

  return (
    <footer className='text-sm w-full bg-background py-1'>
      <nav className="sticky bottom-0 z-20  backdrop-blur mb-2 border-y border-primary md:hidden">
        <div className="mx-auto max-w-6xl grid grid-cols-5 text-center">
          {MENUS.map((menu) => (
            <Link href={menu.route(activeSaveId)} key={menu.label} className="p-3">{menu.label}</Link>
          ))}
        </div>
      </nav>

      <div className='container mx-auto px-4  text-center'>
        <p>© {new Date().getFullYear()} King's Academy by StephHoel</p>
      </div>
    </footer>
  )
}
