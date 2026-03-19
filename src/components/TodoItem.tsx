import { useState, useRef } from 'react'
import type { Todo } from '../types/todo'
import { formatDueDate, isOverdue, isToday } from '../utils/dates'
import PriorityBadge from './PriorityBadge'
import CategoryTag from './CategoryTag'
import TodoEditForm from './TodoEditForm'

interface Props {
  todo: Todo
  onToggle: () => void
  onUpdate: (changes: Partial<Todo>) => void
  onDelete: () => void
}

export default function TodoItem({ todo, onToggle, onUpdate, onDelete }: Props) {
  const [editing, setEditing] = useState(false)
  const [removing, setRemoving] = useState(false)
  const itemRef = useRef<HTMLDivElement>(null)

  function handleDelete() {
    setRemoving(true)
    itemRef.current?.addEventListener(
      'animationend',
      () => onDelete(),
      { once: true },
    )
  }

  function handleSave(changes: Partial<Todo>) {
    onUpdate(changes)
    setEditing(false)
  }

  const overdue = todo.dueDate && !todo.completed && isOverdue(todo.dueDate)
  const dueToday = todo.dueDate && !todo.completed && isToday(todo.dueDate)

  return (
    <div
      ref={itemRef}
      className={`card p-4 transition-all duration-150 ${removing ? 'animate-fade-out' : 'animate-slide-in'} ${
        todo.completed ? 'opacity-60' : ''
      }`}
    >
      {editing ? (
        <TodoEditForm
          todo={todo}
          onSave={handleSave}
          onCancel={() => setEditing(false)}
        />
      ) : (
        <div className="flex items-start gap-3">
          {/* Checkbox */}
          <button
            onClick={onToggle}
            className={`flex-shrink-0 mt-0.5 w-5 h-5 rounded-full border-2 transition-all duration-200 flex items-center justify-center checkbox-circle ${
              todo.completed
                ? 'bg-emerald-500 border-emerald-500 checked'
                : 'border-gray-300 dark:border-gray-600 hover:border-indigo-400'
            }`}
            title={todo.completed ? '未完了に戻す' : '完了にする'}
          >
            <svg
              className={`check-path w-3 h-3 text-white ${todo.completed ? 'checked' : ''}`}
              viewBox="0 0 12 10"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M1 5l3.5 3.5L11 1" className="check-path" />
            </svg>
          </button>

          {/* Content */}
          <div
            className="flex-1 min-w-0 cursor-pointer"
            onClick={() => setEditing(true)}
          >
            <p
              className={`text-sm font-medium leading-snug break-words ${
                todo.completed
                  ? 'line-through text-gray-400 dark:text-gray-500'
                  : 'text-gray-800 dark:text-gray-100'
              }`}
            >
              {todo.text}
            </p>

            <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
              <PriorityBadge priority={todo.priority} />

              {todo.dueDate && (
                <span
                  className={`inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
                    overdue
                      ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      : dueToday
                      ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                      : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                  }`}
                >
                  <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  {formatDueDate(todo.dueDate)}
                </span>
              )}

              {todo.categories.map((cat) => (
                <CategoryTag key={cat} category={cat} />
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-0.5 flex-shrink-0">
            <button
              onClick={() => setEditing(true)}
              className="btn-icon"
              title="編集"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={handleDelete}
              className="btn-icon hover:!text-red-500 hover:!bg-red-50 dark:hover:!bg-red-900/20"
              title="削除"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
