'use client'
import { Menu } from './Menu'

export function FooterNav() {
  return (
    <footer className='text-sm w-full bg-background py-1'>
      <nav className="sticky bottom-0 z-20 mx-auto mb-2 grid w-full max-w-screen-lg grid-cols-5 border-y border-primary text-center backdrop-blur md:hidden">
        <Menu />
      </nav>

      <div className='container mx-auto px-4  text-center'>
        <p>© {new Date().getFullYear()} King's Academy by StephHoel</p>
      </div>
    </footer>
  )
}
