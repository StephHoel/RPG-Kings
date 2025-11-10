import { H1, Panel } from '@/components'

export default function SettingClient() {
  return (
    <Panel>
      <H1>Configurações</H1>

      <ul className="mt-2 text-sm space-y-2">
        <li>Tema: sistema</li>
        <li>Fonte: 100%</li>
        <li>Contraste alto: desligado</li>
      </ul>
    </Panel>
  )
}