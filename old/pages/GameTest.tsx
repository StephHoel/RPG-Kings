import { start } from '@/data/start'

export function GameTest() {
  return (
    <main className="flex flex-1 overflow-hidden">
      {/* LEFT COLUMN — status */}
      <aside className="w-1/4 min-w-[260px] border-r border-neutral-700 p-4 overflow-y-auto backdrop-blur">
        
        <div className='mb-3'>
          <div>Dia {start.weekDay} — Semana {start.week} — {start.hour}:00 — Quarta</div>
          <div className="text-neutral-400">Reputação: {start.reputation} • Moedas: {start.coins}</div>
        </div>

        <div>
          <h2 className="font-semibold text-lg mb-3">Atributos</h2>
          <div className="space-y-2">
            <Bar label="Energia" value={62} />
            <Bar label="Fome" value={40} />
            <Bar label="Humor" value={55} />
          </div>

          <h2 className="font-semibold text-lg mt-6 mb-3">Disciplinas</h2>
          <div className="space-y-2">
            <Bar label="História Arcana" value={34} level={1} />
            <Bar label="Alquimia" value={12} level={1} />
            <Bar label="Combate" value={20} level={1} />
          </div>
        </div>
      </aside>

      {/* RIGHT COLUMN — main scene */}
      <section className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          <div className="bg-neutral-800 border border-neutral-700 p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Explorar o Pátio</h2>
            <p className="text-neutral-300 mb-6">
              O vento frio da montanha sopra entre as colunas antigas. Alguns alunos
              se reúnem à sombra, e um brilho estranho surge atrás da estátua central...
            </p>
            <div className="space-y-3">
              <Choice text="Explorar o brilho misterioso" effects="-5 Energia, +10% evento" />
              <Choice text="Chamar Lena para investigar" effects="-10 Energia, +Afinidade(Lena)" />
              <Choice text="Ignorar e voltar ao dormitório" effects="+Humor, -XP Exploração" />
            </div>
          </div>
        </div>
      </section>
    </main>
  )

  
  function Bar({ label, value, level }: { label: string; value: number; level?: number }) {
    return (
      <div>
        <div className="flex justify-between text-xs mb-1">
          <span>{label}</span>
          <span>{level ? `Lv${level}` : `${value}/100`}</span>
        </div>
        <div className="h-2 bg-neutral-700 rounded">
          <div
            className="h-2 bg-purple-700 rounded"
            style={{ width: `${value}%` }}
          />
        </div>
      </div>
    )
  }

  function Choice({ text, effects }: { text: string; effects: string }) {
    return (
      <button
        className="w-full text-left bg-neutral-700 hover:bg-purple-900 transition p-3 rounded-md"
      >
        <div className="font-medium">{text}</div>
        <div className="text-xs text-neutral-300">{effects}</div>
      </button>
    )
  }
}
