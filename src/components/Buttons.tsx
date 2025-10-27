import { ButtonsWithClickProps } from '@/interfaces/ButtonsWithClickProps'

export function Buttons({ onClick, disabled = false, children }: ButtonsWithClickProps) {
  return (
    <button className={`border rounded-lg px-4 py-2 w-full md:w-auto ${disabled && 'pointer-events-none'} `} onClick={onClick}>{children}</button>
  )
}