import type { HTMLInputTypeAttribute, InputHTMLAttributes } from 'react'
import type { FieldValues, RegisterOptions } from 'react-hook-form'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  type: HTMLInputTypeAttribute
  name: string
  rules: RegisterOptions<FieldValues, string>
}
