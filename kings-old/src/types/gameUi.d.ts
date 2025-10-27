import type { GameState } from './GameState'

export interface GameUi {
  state: GameState
  setState: (s: GameState) => void
}
