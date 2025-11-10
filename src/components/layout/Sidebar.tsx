'use client'
import { Menu } from './Menu'

export function Sidebar() {
  return (
    <aside>
      <nav className="mt-1 flex flex-col gap-1">
        <Menu />
      </nav>
    </aside>
  )
}
