import type { DisciplinaId, Disciplinas, PlayerState } from '@/data/atributos'
import type { EventScene } from '@/types/eventScene'
import type { GameState } from '@/types/GameState'
import type { Player } from '@/types/player'

// Simple engine implementation (expandable)
export async function loadInitialState(): Promise<GameState> {
  // Em produção, fetch('/api/events') ou carregar sql.js
  const eventsResp = await import('../data/events.json')
  const charactersResp = await import('../data/characters.json')

  const player: Player = {
    id: 'guest-1',
    name: 'Convidado',
    attributes: charactersResp.default[0].atributos,
    inventory: charactersResp.default[0].inventario,
    xp: 0,
    level: 1,
  }

  const events: EventScene[] = eventsResp.default.map((ev) => ({
    ...ev,
    choices: ev.choices.map((choice) => ({
      ...choice,
      effects: choice.effects
        ? Object.fromEntries(
            Object.entries(choice.effects).filter(
              ([_, v]) => typeof v === 'number',
            ),
          )
        : undefined,
    })),
  }))
  const currentEvent = events[0]

  const engine = {
    applyChoice(state: GameState, choiceIdx: number) {
      const ev = state.currentEvent
      const choice = ev.choices[choiceIdx]
      const newPlayer = {
        ...state.player,
        attributes: { ...state.player.attributes },
      }
      if (choice.effects) {
        for (const [k, v] of Object.entries(choice.effects)) {
          newPlayer.attributes[k] = (newPlayer.attributes[k] ?? 0) + v
        }
      }
      const nextEvent =
        state.events.find((e) => e.id === choice.next) ?? state.events[0]
      return { ...state, player: newPlayer, currentEvent: nextEvent }
    },
  }

  return { player, events, currentEvent, day: 1, engine }
}

// A. Níveis por disciplina
// Nível N quando xp >= N^2 * 25 (quadrática suave).
// Ex.: N1=25, N2=100, N3=225…
export const lvlFromXp = (xp: number) => Math.floor(Math.sqrt(xp / 25));

// B. “Rank do Jogador”
// Use um metarank para gates da história:
// Aprendiz → total XP disciplinas ≥ 150
// Adept@ → total ≥ 400 e 2 provas concluídas
// Expert → total ≥ 900 e 5 marcos chave
export function playerRank(ds: Disciplinas, provas: number) {
  const total = Object.values(ds).reduce((a, d) => a + d.xp, 0);
  if (total >= 900 && provas >= 5) return "Expert";
  if (total >= 400 && provas >= 2) return "Adept@";
  if (total >= 150) return "Aprendiz";
  return "Calouro";
}

//C. Checagem de marcos (unlock)
type Ctx = { p: PlayerState; possuiItem: (id: string, qtd: number) => boolean };

export function podeCompletar(m: any, ctx: Ctx): boolean {
  return m.reqs.every((r: any) => {
    switch (r.tipo) {
      case "disciplinaXp": return ctx.p.disciplinas[r.alvo].xp >= r.min;
      case "coreMin":      return (ctx.p.core as any)[r.alvo] >= r.min;
      case "item":         return ctx.possuiItem(r.alvo, r.qtd);
      case "afinidadeQualquer":
        return Object.values(ctx.p.afinidades).some(v => v >= r.min);
      default: return false;
    }
  });
}

//D. Agenda e avanço do relógio
export function avancaHora(p: PlayerState, horas = 1): PlayerState {
  let { hora, dia, semana } = p;
  hora += horas;
  if (hora >= 22) { // dormir obrigatório
    p = dormir(p);
    hora = 7; dia += 1;
    if (dia % 7 === 0) { semana += 1; }
  }
  return { ...p, hora, dia, semana };
}

export function aplicarAcao(p: PlayerState, acao: "estudar"|"treinar"|"socializar"|"explorar"|"descansar", alvo?: DisciplinaId) {
  // custos/restauros
  const c = CONFIG.custoAcoes[acao];
  const clamp = (v: number, max=100) => Math.max(0, Math.min(v, max));
  const core = {
    energia: clamp(p.core.energia - c.energia),
    fome:    clamp(p.core.fome + c.fome),
    humor:   clamp(p.core.humor + c.humor)
  };

  // ganhos
  const disciplinas = { ...p.disciplinas };
  if (acao === "estudar" && alvo) disciplinas[alvo].xp += CONFIG.xpDisciplinaPorEstudo;
  return avancaHora({ ...p, core, disciplinas });
}

export function dormir(p: PlayerState) {
  const r = CONFIG.restauroDormir;
  const clamp = (v: number, max=100) => Math.max(0, Math.min(v, max));
  return {
    ...p,
    core: {
      energia: clamp(p.core.energia + r.energia),
      fome:    clamp(p.core.fome + r.fome),
      humor:   clamp(p.core.humor + r.humor)
    }
  };
}

