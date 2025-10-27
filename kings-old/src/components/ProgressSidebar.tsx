// components/ProgressSidebar.tsx
import type { PlayerState } from '@/data/atributos'
import { lvlFromXp, playerRank } from "@/logic/progress";

export default function ProgressSidebar({ p }: { p: PlayerState }) {
  const rank = playerRank(p.disciplinas, p.titulos.filter(t => t.startsWith("prova-")).length);
  const Bar = ({ label, xp }: { label: string; xp: number }) => {
    const lvl = lvlFromXp(xp), pct = Math.min(100, (xp % (25*(lvl+1)*(lvl+1))) / (25*(lvl+1)*(lvl+1) - 25*lvl*lvl) * 100);
    return (
      <div className="mb-3">
        <div className="flex justify-between text-sm"><span>{label}</span><span>N{lvl}</span></div>
        <div className="h-2 w-full bg-gray-200 rounded"><div className="h-2 rounded" style={{ width: `${pct}%` }} /></div>
      </div>
    );
  };

  return (
    <aside className="w-80 p-4 border-l">
      <h3 className="font-semibold mb-2">Rank: {rank}</h3>
      <div className="mb-4">
        <div>Energia {p.core.energia}/100</div>
        <div>Fome {p.core.fome}/100</div>
        <div>Humor {p.core.humor}/100</div>
      </div>
      {Object.entries(p.disciplinas).map(([k, v]) => (
        <Bar key={k} label={k} xp={v.xp} />
      ))}
    </aside>
  );
}
