import { H1, Panel } from '@/components'

export function SettingClient() {
  return (
    <Panel>
      <H1>Configurações</H1>

      <ul className="space-y-2 mt-2 text-sm">
        <li>Tema: sistema</li>
        <li>Fonte: 100%</li>
        <li>Contraste alto: desligado</li>
      </ul>
    </Panel>
  )
}