export interface GameState {
  player: Player
  currentEvent: EventScene
  engine: GameEngine
  events: EventScene[]
  day: number
}

export interface Player {
  id: string
  name: string
  attributes: Record<string, number>
  inventory: string[]
  xp: number
  level: number
}

export interface EventScene {
  id: number
  scene: string
  choices: Choice[]
}

export interface GameEngine {
  applyChoice: (state: GameState, choiceIdx: number) => GameState
}



export type Effects = Record<string, number>
export type Choice = { text: string; effects?: Effects; next?: number }

