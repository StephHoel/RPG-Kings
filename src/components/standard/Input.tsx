import { InputHTMLAttributes } from 'react'

export function Input({ className, ...rest }: InputHTMLAttributes<HTMLInputElement>) {

  return (
    <input
      className={`w-full rounded border border-primary-bg px-3 py-2 focus:outline-2 focus:outline-primary ${className}`}
      {...rest}
    />
  )
}