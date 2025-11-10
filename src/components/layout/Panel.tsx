import { PropsWithChildren } from 'react'

export function Panel({ children, className }: PropsWithChildren & { className?: string }) {
  return (
    <div className={`flex w-full flex-col gap-6 px-2 sm:px-4 ${className ?? ''}`}>
      {children}
    </div>
  )
}