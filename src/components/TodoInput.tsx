import { useRef, useState } from 'react'
import type { Priority } from '../types/todo'
import type { AddTodoParams } from '../hooks/useTodos'
import { todayIso } from '../utils/dates'

interface Props {
  onAdd: (params: AddTodoParams) => void
}

export default function TodoInput({ onAdd }: Props) {
  const textRef = useRef<HTMLInputElement>(null)
  const [priority, setPriority] = useState<Priority>('medium')
  const [dueDate, setDueDate] = useState('')
  const [categoryInput, setCategoryInput] = useState('')
  const [showOptions, setShowOptions] = useState(false)
  const [error, setError] = useState('')

  function submit() {
    const text = textRef.current?.value.trim() ?? ''
    if (!text) {
      setError('タスクを入力してください')
      textRef.current?.focus()
      return
    }
    setError('')

    const categories = categoryInput
      .split(',')
      .map((c) => c.trim())
      .filter(Boolean)

    onAdd({
      text,
      priority,
      dueDate: dueDate || null,
      categories,
    })

    // Reset
    if (textRef.current) textRef.current.value = ''
    setPriority('medium')
    setDueDate('')
    setCategoryInput('')
    setShowOptions(false)
    textRef.current?.focus()
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      submit()
    } else if (e.key === 'Escape') {
      if (textRef.current) textRef.current.value = ''
      setPriority('medium')
      setDueDate('')
      setCategoryInput('')
      setShowOptions(false)
      setError('')
    }
  }

  return (
    <div className="card p-4">
      <div className="flex gap-2">
        <input
          ref={textRef}
          type="text"
          placeholder="新しいタスクを入力... (Enterで追加)"
          className="input-base flex-1"
          onKeyDown={handleKeyDown}
          onChange={() => error && setError('')}
        />
        <button
          onClick={() => setShowOptions((v) => !v)}
          title="オプション"
          className={`px-3 py-2 rounded-lg text-sm transition-colors ${
            showOptions
              ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300'
              : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        </button>
        <button
          onClick={submit}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          追加
        </button>
      </div>

      {error && (
        <p className="text-xs text-red-500 mt-1.5 ml-1">{error}</p>
      )}

      {showOptions && (
        <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 grid grid-cols-1 sm:grid-cols-3 gap-3 animate-scale-in">
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">優先度</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as Priority)}
              className="select-base"
            >
              <option value="high">🔴 高</option>
              <option value="medium">🟡 中</option>
              <option value="low">🟢 低</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">期限</label>
            <input
              type="date"
              value={dueDate}
              min={todayIso()}
              onChange={(e) => setDueDate(e.target.value)}
              className="input-base"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
              カテゴリ <span className="font-normal opacity-60">(カンマ区切り)</span>
            </label>
            <input
              type="text"
              value={categoryInput}
              onChange={(e) => setCategoryInput(e.target.value)}
              placeholder="仕事, 個人..."
              className="input-base"
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), submit())}
            />
          </div>
        </div>
      )}
    </div>
  )
}
