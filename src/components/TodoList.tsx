import type { Todo, TodoFilters } from '../types/todo'
import TodoItem from './TodoItem'
import EmptyState from './EmptyState'

interface Props {
  todos: Todo[]
  onToggle: (id: string) => void
  onUpdate: (id: string, changes: Partial<Todo>) => void
  onDelete: (id: string) => void
  filters?: TodoFilters
}

export default function TodoList({ todos, onToggle, onUpdate, onDelete, filters }: Props) {
  if (todos.length === 0) {
    return (
      <EmptyState
        mode={filters?.mode ?? 'all'}
        hasSearch={!!(filters?.search)}
      />
    )
  }

  return (
    <div className="space-y-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={() => onToggle(todo.id)}
          onUpdate={(changes) => onUpdate(todo.id, changes)}
          onDelete={() => onDelete(todo.id)}
        />
      ))}
    </div>
  )
}
