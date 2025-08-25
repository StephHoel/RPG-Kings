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
