"use client"
import { ButtonHTMLAttributes, JSX } from 'react'

export function Button({ className, onClick, type = "button", disabled, children, ...rest }: ButtonHTMLAttributes<HTMLButtonElement>): JSX.Element {
  return (
    <button
      type={type}
      className={`w-full rounded-xl bg-primary-bg px-4 py-2 text-center font-bold text-panel-fg hover:bg-primary focus:outline-2 focus:outline-primary 
        
        ${onClick !== undefined ? "cursor-pointer" : ""}
        
        ${disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}

        ${className ?? ''}
      `}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  )
}