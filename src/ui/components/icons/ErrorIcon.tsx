import { SVGProps } from 'react'

export function ErrorIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className="flex-shrink-0 w-4 h-4 text-danger"
      aria-hidden
      {...props}
    >
      <circle cx="12" cy="12" r="10" className="stroke-danger" />
      <path d="M12 8v4" className="stroke-danger" />
      <circle cx="12" cy="16" r="1" className="fill-danger" />
    </svg>
  )
}
