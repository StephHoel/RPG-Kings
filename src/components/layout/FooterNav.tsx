'use client'
import { Menu } from './Menu'

export function FooterNav() {
  return (
    <footer className="bg-background py-1 w-full text-sm">
      <nav className="md:hidden bottom-0 z-20 sticky backdrop-blur mx-auto mb-2 border-primary border-y w-full max-w-screen-lg text-center">
        <Menu className="gap-4 grid grid-cols-[repeat(auto-fit,minmax(6rem,1fr))] grid-max mx-auto" />
      </nav>

      <div className="mx-auto px-4 text-center container">
        <p>© {new Date().getFullYear()} King&apos;s Academy by StephHoel</p>
      </div>
    </footer>
  )
}
