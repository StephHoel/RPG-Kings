import { useFormContext } from 'react-hook-form'
import type { InputProps } from '@/types/inputProps'

export function Input({ label, name, type, rules, ...props }: InputProps) {
  const { register, formState } = useFormContext()

  return (
    <label className='text-neutral-300 font-semibold'>
      {label}

      <input
        {...props}
        {...register(name, rules)}
        type={type}
        name={name}
        className='mt-1 w-full px-3 py-2 rounded bg-neutral-800 text-neutral-100 border border-neutral-700'
        required
      />

      {formState.errors[name] && (
        <div className='text-red-400 font-semibold mt-2'>
          {formState.errors[name].message?.toString()}
        </div>
      )}
    </label>
  )
}
