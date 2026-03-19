import type { AppStats } from '../types/todo'
import ThemeToggle from './ThemeToggle'

interface Props {
  theme: 'dark' | 'light'
  onToggleTheme: () => void
  stats: AppStats
  onClearCompleted: () => void
}

export default function Header({ theme, onToggleTheme, stats, onClearCompleted }: Props) {
  const progress = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
            ✅ TODO
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            {stats.remaining === 0 && stats.total > 0
              ? '全て完了！お疲れ様でした 🎉'
              : `残り ${stats.remaining} 件`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {stats.completed > 0 && (
            <button
              onClick={onClearCompleted}
              className="text-xs text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors px-2 py-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              完了済みを削除
            </button>
          )}
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <StatCard label="合計" value={stats.total} color="indigo" />
        <StatCard label="完了" value={stats.completed} color="green" />
        <StatCard label="残り" value={stats.remaining} color="amber" />
      </div>

      {/* Progress bar */}
      {stats.total > 0 && (
        <div>
          <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500 mb-1">
            <span>進捗</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="progress-bar h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

function StatCard({ label, value, color }: { label: string; value: number; color: 'indigo' | 'green' | 'amber' }) {
  const colorMap = {
    indigo: 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20',
    green: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20',
    amber: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20',
  }
  return (
    <div className={`rounded-xl p-3 text-center ${colorMap[color]}`}>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs font-medium opacity-75">{label}</div>
    </div>
  )
}
