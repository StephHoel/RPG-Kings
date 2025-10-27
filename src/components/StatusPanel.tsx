export function StatusPanel() {
  return (
    <div className="rounded-xl border p-3">
      <div className="text-sm opacity-70">Status</div>
      <ul className="mt-2 space-y-1 text-sm">
        <li>HP: —</li>
        <li>MP: —</li>
        <li>Moedas: —</li>
      </ul>
    </div>
  )
}
