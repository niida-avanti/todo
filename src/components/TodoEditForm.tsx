import { useState, useRef, useEffect } from 'react'
import type { Todo, Priority } from '../types/todo'
import CategoryTag from './CategoryTag'

interface Props {
  todo: Todo
  onSave: (changes: Partial<Todo>) => void
  onCancel: () => void
}

export default function TodoEditForm({ todo, onSave, onCancel }: Props) {
  const [text, setText] = useState(todo.text)
  const [priority, setPriority] = useState<Priority>(todo.priority)
  const [dueDate, setDueDate] = useState(todo.dueDate ?? '')
  const [categories, setCategories] = useState<string[]>(todo.categories)
  const [catInput, setCatInput] = useState('')
  const textRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    textRef.current?.focus()
    textRef.current?.select()
  }, [])

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') {
      e.preventDefault()
      onCancel()
    }
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      save()
    }
  }

  function save() {
    const trimmed = text.trim()
    if (!trimmed) return
    onSave({
      text: trimmed,
      priority,
      dueDate: dueDate || null,
      categories,
    })
  }

  function addCategory() {
    const trimmed = catInput.trim()
    if (trimmed && !categories.includes(trimmed)) {
      setCategories((prev) => [...prev, trimmed])
    }
    setCatInput('')
  }

  function removeCategory(cat: string) {
    setCategories((prev) => prev.filter((c) => c !== cat))
  }

  return (
    <div className="space-y-3" onKeyDown={handleKeyDown}>
      <input
        ref={textRef}
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="input-base font-medium"
        placeholder="タスク名"
      />

      <div className="grid grid-cols-2 gap-2">
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
            onChange={(e) => setDueDate(e.target.value)}
            className="input-base"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">カテゴリ</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={catInput}
            onChange={(e) => setCatInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') { e.preventDefault(); addCategory() }
            }}
            placeholder="カテゴリを追加..."
            className="input-base flex-1"
          />
          <button
            onClick={addCategory}
            className="px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg transition-colors"
          >
            追加
          </button>
        </div>
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {categories.map((cat) => (
              <CategoryTag key={cat} category={cat} onRemove={() => removeCategory(cat)} />
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-2 pt-1">
        <button
          onClick={save}
          className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors"
        >
          保存
        </button>
        <button
          onClick={onCancel}
          className="flex-1 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg text-sm font-medium transition-colors"
        >
          キャンセル (Esc)
        </button>
      </div>
    </div>
  )
}
