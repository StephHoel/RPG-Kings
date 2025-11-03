// Utilitário simples de relógio do jogo
export type ClockSubscriber = (day: number, hour: number) => void

export class GameClock {
  private day: number
  private hour: number
  private intervalId: number | null = null;
  private subscribers: Set<ClockSubscriber> = new Set();
  private msPerHour: number

  constructor(startDay = 1, startHour = 8, msPerHour = 1000) {
    this.day = startDay
    this.hour = startHour
    this.msPerHour = msPerHour
  }

  start(): void {
    if (this.intervalId != null) return
    this.intervalId = window.setInterval(() => this.advanceHour(), this.msPerHour)
  }

  stop(): void {
    if (this.intervalId == null) return
    clearInterval(this.intervalId)
    this.intervalId = null
  }

  advanceHour(): void {
    this.hour += 1
    if (this.hour >= 24) {
      this.hour = 0
      this.day += 1
    }
    this.emit()
  }

  setTime(day: number, hour: number): void {
    this.day = day
    this.hour = hour
    this.emit()
  }

  subscribe(fn: ClockSubscriber): () => void {
    this.subscribers.add(fn)
    fn(this.day, this.hour)
    return () => this.subscribers.delete(fn)
  }

  private emit(): void {
    for (const s of this.subscribers) s(this.day, this.hour)
  }
}
