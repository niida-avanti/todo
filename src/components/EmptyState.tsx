interface Props {
  mode: 'all' | 'active' | 'completed'
  hasSearch: boolean
}

export default function EmptyState({ mode, hasSearch }: Props) {
  if (hasSearch) {
    return (
      <div className="card p-12 text-center">
        <div className="text-4xl mb-3">🔍</div>
        <p className="text-gray-500 dark:text-gray-400 font-medium">検索結果が見つかりません</p>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">別のキーワードで検索してみてください</p>
      </div>
    )
  }

  const messages = {
    all: { emoji: '📝', title: 'タスクがありません', sub: '上のフォームからタスクを追加してください' },
    active: { emoji: '🎉', title: '全てのタスクが完了しました！', sub: 'お疲れ様でした' },
    completed: { emoji: '⏳', title: '完了したタスクはありません', sub: 'タスクを完了してここに表示させましょう' },
  }

  const { emoji, title, sub } = messages[mode]

  return (
    <div className="card p-12 text-center">
      <div className="text-4xl mb-3">{emoji}</div>
      <p className="text-gray-500 dark:text-gray-400 font-medium">{title}</p>
      <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">{sub}</p>
    </div>
  )
}
