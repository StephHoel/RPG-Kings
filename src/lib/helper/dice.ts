/** Retorna o valor rolado de um dado de `sides` lados. Ex: d6, d20, ... */
export function rollDice(sides: number): number {
  return Math.floor(Math.random() * sides)
}