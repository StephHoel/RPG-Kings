import Link from 'next/link'
import { ROUTES } from '@/config'

export function Header() {
  return (
    <header className="bg-background shadow-md w-full">
      <div className="flex justify-between items-center mx-auto px-4 py-2 container">
        <div className="w-full" />

        <Link
          href={ROUTES.ROOT}
          className="min-w-fit font-bold text-highlight text-2xl tracking-wide"
        >
          King&apos;s Academy
        </Link>

        <div className="w-full" />
      </div>
    </header>
  )
}
