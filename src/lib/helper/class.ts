import { rollDice } from './dice'

/** Retorna o quanto de XP ganhou em aula */
export function xpByClass(hour = 1): number {
  let xp = 0

  for (let i = 1; i <= hour; i++) {
    xp = rollDice(100)
  }

  return xp
}
