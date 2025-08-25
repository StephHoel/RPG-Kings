import { url } from '@/constants/routes'

export function NotFound() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-900 via-violet-950 to-neutral-800'>
      <div className='bg-neutral-800/80 rounded-2xl shadow-2xl border border-violet-900 p-8 text-center'>
        <h2 className='text-3xl font-bold text-violet-400 mb-4'>
          404 - Página não encontrada
        </h2>
        <p className='text-neutral-300 mb-2'>
          Esta rota não existe. Volte para a{' '}
          <a href={url.index} className='text-violet-400 underline'>
            Home
          </a>
          .
        </p>
      </div>
    </div>
  )
}
