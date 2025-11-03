
type Props = {
  label: string
  onClick: () => void
}

export default function ChoiceButton({ label, onClick }: Props) {
  return (
    <button onClick={onClick} className="px-3 py-1 bg-lilac-500 text-white rounded">
      {label}
    </button>
  )
}
