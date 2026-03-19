import { useState } from 'react'
import type { TodoFilters } from './types/todo'
import { useTheme } from './hooks/useTheme'
import { useTodos } from './hooks/useTodos'
import Header from './components/Header'
import TodoInput from './components/TodoInput'
import FilterBar from './components/FilterBar'
import TodoList from './components/TodoList'

const DEFAULT_FILTERS: TodoFilters = {
  mode: 'all',
  search: '',
  category: null,
}

export default function App() {
  const { theme, toggleTheme } = useTheme()
  const [filters, setFilters] = useState<TodoFilters>(DEFAULT_FILTERS)

  const { filteredTodos, allCategories, stats, addTodo, toggleComplete, updateTodo, deleteTodo, clearCompleted } =
    useTodos(filters)

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-4">
        <Header theme={theme} onToggleTheme={toggleTheme} stats={stats} onClearCompleted={clearCompleted} />
        <TodoInput onAdd={addTodo} />
        <FilterBar
          filters={filters}
          onFiltersChange={setFilters}
          allCategories={allCategories}
          totalCounts={{
            all: stats.total,
            active: stats.remaining,
            completed: stats.completed,
          }}
        />
        <TodoList
          todos={filteredTodos}
          onToggle={toggleComplete}
          onUpdate={updateTodo}
          onDelete={deleteTodo}
          filters={filters}
        />
      </div>
    </div>
  )
}
