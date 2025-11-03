import type { Scene } from '../../lib/types/scenes'

type Props = {
  scene: Scene
  onChoose: (choiceId: string) => void
}

export default function SceneRenderer({ scene, onChoose }: Props) {
  return (
    <article className="p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-semibold">{scene.title}</h2>
      <div className="mt-2">{scene.content}</div>
      <div className="mt-4 space-x-2">
        {scene.choices.map((c) => (
          <button key={c.id} onClick={() => onChoose(c.id)} className="px-3 py-1 bg-purple-600 text-white rounded">
            {c.label}
          </button>
        ))}
      </div>
    </article>
  )
}
