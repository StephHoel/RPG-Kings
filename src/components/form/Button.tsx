import type { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'
import { Loader } from '../Loader'

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  isLoading?: boolean
  textLoader?: string
  text: string
}

export function Button({
  isLoading = false,
  textLoader = '',
  text,
  type,
  className,
  onClick,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      type={type}
      disabled={isLoading}
      onClick={type === 'button' ? onClick : undefined}
      className={
        className ??
        'mt-2 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold cursor-pointer'
      }
    >
      {isLoading ? <Loader text={textLoader} /> : text}
    </button>
  )
}
