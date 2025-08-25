export interface ChoicesProps {
  choices: Array<{ text: string }>
  onChoose: (i: number) => void
}
