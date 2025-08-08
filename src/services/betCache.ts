export type Participant = { name?: string; avatarUrl: string }

export type Bet = {
  id: string
  title: string
  amount: number
  dateLabel?: string
  participants?: Participant[]
  days: number[]
  completedDays: number[]
  pendingDays: number[]
}

const cache = new Map<string, Bet>()

export function cacheBet(bet: Bet): void {
  cache.set(bet.id, bet)
}

export function getBet(id: string): Bet | undefined {
  return cache.get(id)
}

export { cache as betCache }


