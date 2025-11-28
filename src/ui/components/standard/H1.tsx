import { PropsWithChildren } from 'react'

export function H1({ children }: PropsWithChildren) {
  return (
    <h1 className="drop-shadow mb-2 font-extrabold text-accent text-4xl md:text-5xl text-center">
      {children}
    </h1>
  )
}
