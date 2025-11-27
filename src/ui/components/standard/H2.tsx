import { PropsWithChildren } from 'react'

export function H2({ children }: PropsWithChildren) {
  return (
    <h2 className="drop-shadow mb-2 font-medium text-accent text-2xl md:text-3xl text-center">
      {children}
    </h2>
  )
}
