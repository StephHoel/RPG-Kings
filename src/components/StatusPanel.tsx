export function StatusPanel() {
  return (
    <div className="p-3 border rounded-xl">
      <div className="opacity-70 text-sm">Status</div>
      <ul className="space-y-1 mt-2 text-sm">
        <li>HP: —</li>
        <li>MP: —</li>
        <li>Moedas: —</li>
      </ul>
    </div>
  )
}
