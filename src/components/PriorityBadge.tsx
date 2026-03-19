import type { Priority } from '../types/todo'

interface Props {
  priority: Priority
  size?: 'sm' | 'xs'
}

const CONFIG = {
  high: { label: '高', className: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' },
  medium: { label: '中', className: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' },
  low: { label: '低', className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
}

export default function PriorityBadge({ priority, size = 'xs' }: Props) {
  const { label, className } = CONFIG[priority]
  const sizeClass = size === 'xs' ? 'text-[10px] px-1.5 py-0.5' : 'text-xs px-2 py-0.5'
  return (
    <span className={`inline-flex items-center rounded-full font-semibold ${className} ${sizeClass}`}>
      {label}
    </span>
  )
}
