import { Activity, InputHTMLAttributes } from 'react'

export function Input({ className, children, ...rest }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={`w-full ${className}`}>
      <label className="space-y-2">
        <Activity mode={children === undefined ? 'hidden' : 'visible'}>
          <p>{children}</p>
        </Activity>

        <input
          className="px-3 py-2 border border-highlight rounded focus:outline-2 focus:outline-primary w-full"
          {...rest}
        />
      </label>
    </div>
  )
}
