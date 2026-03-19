export function formatDueDate(isoDate: string): string {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const due = new Date(isoDate + 'T00:00:00')

  const diffMs = due.getTime() - today.getTime()
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays < 0) return `${Math.abs(diffDays)}日超過`
  if (diffDays === 0) return '今日'
  if (diffDays === 1) return '明日'
  if (diffDays <= 7) return `${diffDays}日後`

  return due.toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' })
}

export function isOverdue(isoDate: string): boolean {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const due = new Date(isoDate + 'T00:00:00')
  return due < today
}

export function isToday(isoDate: string): boolean {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const due = new Date(isoDate + 'T00:00:00')
  return due.getTime() === today.getTime()
}

export function todayIso(): string {
  return new Date().toISOString().split('T')[0]
}
