'use client'
import { MENUS } from '@/config'
import { isSameRoute } from '@/lib'
import { useActiveSaveContext } from '@/providers/useActiveSaveContext'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Menu() {
  const pathname = usePathname()
  const { activeSaveId } = useActiveSaveContext()

  return (
    <>
      {
        MENUS.map((menu) => {
          const active = isSameRoute(pathname, menu.route(activeSaveId))

          if (process.env.NEXT_PUBLIC_BASE_PATH && menu.type === 'dev')
          {
            return null
          }

          return (
            <Link
              key={menu.label}
              href={menu.route(activeSaveId)}
              className={`rounded-xl px-3 py-2 text-sm transition hover:bg-white/5 ${active ? 'bg-white/10 ring-1 ring-white/15' : ''}`}
            >
              {menu.label}
            </Link>
          )
        })
      }
    </>
  )
}