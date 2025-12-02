'use client'
import { Menu } from './Menu'

export function Sidebar() {
  return (
    <aside>
      <nav className="flex flex-col gap-1 mt-1">
        <Menu />
      </nav>
    </aside>
  )
}
