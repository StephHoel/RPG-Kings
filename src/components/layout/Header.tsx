import Link from 'next/link'
import { ROUTES } from '@/config'

export function Header() {
  return (
    <header className='w-full bg-background shadow-md'>
      <div className='container mx-auto flex items-center justify-between px-4 py-2'>
        <div className='w-full' />

        <Link
          href={ROUTES.ROOT}
          className='min-w-fit text-2xl font-bold tracking-wide'
        >
          King's Academy
        </Link>

        <div className='w-full' />
      </div>
    </header>
  )
}
