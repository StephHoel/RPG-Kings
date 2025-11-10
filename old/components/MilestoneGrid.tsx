import { podeCompletar } from '@/logic/gameEngine'

// components/MilestoneGrid.tsx
export function MilestoneGrid({ milestones, ctx }: { milestones: any[]; ctx: Ctx }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {milestones.map(m => {
        const ok = podeCompletar(m, ctx);
        return (
          <div key={m.id} className={`p-4 rounded border ${ok ? "border-emerald-500" : "border-gray-300 opacity-75"}`}>
            <h4 className="font-semibold">{m.nome}</h4>
            <p className="text-xs mt-1">Categoria: {m.categoria}</p>
            <ul className="text-sm mt-2 list-disc pl-5">
              {m.reqs.map((r:any, i:number) => <li key={i}>{JSON.stringify(r)}</li>)}
            </ul>
            <button disabled={!ok} className="mt-3 px-3 py-1 rounded bg-black text-white disabled:bg-gray-400">Concluir</button>
          </div>
        );
      })}
    </div>
  );
}
