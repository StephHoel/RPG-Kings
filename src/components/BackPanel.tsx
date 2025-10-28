import { PropsWithChildren } from 'react'

export function BackPanel({ children }: PropsWithChildren) {
  return (
    <div className='flex items-center justify-center p-6 h-full'>
      <div className='w-full max-w-3xl bg-neutral-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-violet-900'>
        {children}
      </div>
    </div>
  )
}