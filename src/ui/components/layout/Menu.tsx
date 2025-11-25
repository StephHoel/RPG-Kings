'use client'
import { MENUS } from '@/infra/config'
import { isValidRoute, isSameRoute } from '@/services'
import { useActiveSaveContext } from '@/ui/providers/useActiveSaveContext'
import Link from 'next/link'
import { useRouter } from 'next/router'

export function Menu({ className = '' }: { className?: string }) {
  const router = useRouter()
  const pathname = router.asPath
  const { activeSaveId } = useActiveSaveContext()

  return (
    <div className={className}>
      {MENUS.filter((m) => isValidRoute(m.type, m.route(activeSaveId))).map((menu) => {
        const route = menu.route(activeSaveId)
        const active = isSameRoute(pathname, route)

        return (
          <Link
            key={menu.label}
            href={route}
            className={`md:rounded-xl px-3 py-2 md:my-1 text-sm transition block hover:bg-white/5 ${
              active ? 'bg-white/10 ring-1 ring-white/15' : ''
            }`}
          >
            {menu.label}
          </Link>
        )
      })}
    </div>
  )
}
