import { SVGProps } from 'react'

export function SuccessIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className="flex-shrink-0 w-4 h-4 text-success"
      aria-hidden
      {...props}
    >
      <circle cx="12" cy="12" r="10" className="stroke-success" />
      <path d="M9 12l2 2 4-4" className="stroke-success" />
    </svg>
  )
}
