import { ROUTES } from '@/config'
import Link from 'next/link'

export function Header() {
  return (
    <header className='w-full bg-background shadow-md'>
      <div className='container mx-auto flex justify-between px-4 py-2 text-center'>
        <div className='w-full'></div>

        <Link href={ROUTES.ROOT} className='min-w-fit text-2xl font-bold tracking-wide'>
          King's Academy
        </Link>

        <div className='w-full text-right'>
          {/* Olá, {user?.name ?? 'Visitante'}! */}
        </div>
      </div>
    </header>
  )
}
