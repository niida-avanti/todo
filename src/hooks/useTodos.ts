import { useState, useEffect, useMemo } from 'react'
import type { Todo, TodoFilters, AppStats, Priority } from '../types/todo'
import { loadTodos, saveTodos } from '../utils/storage'
import { applyFilters, getAllCategories } from '../utils/filters'

export interface AddTodoParams {
  text: string
  priority: Priority
  dueDate: string | null
  categories: string[]
}

export function useTodos(filters: TodoFilters) {
  const [todos, setTodos] = useState<Todo[]>(() => loadTodos())

  useEffect(() => {
    saveTodos(todos)
  }, [todos])

  const filteredTodos = useMemo(() => applyFilters(todos, filters), [todos, filters])

  const allCategories = useMemo(() => getAllCategories(todos), [todos])

  const stats: AppStats = useMemo(
    () => ({
      total: todos.length,
      completed: todos.filter((t) => t.completed).length,
      remaining: todos.filter((t) => !t.completed).length,
    }),
    [todos],
  )

  function addTodo(params: AddTodoParams) {
    const now = new Date().toISOString()
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: params.text.trim(),
      completed: false,
      priority: params.priority,
      dueDate: params.dueDate,
      categories: params.categories,
      createdAt: now,
      updatedAt: now,
    }
    setTodos((prev) => [newTodo, ...prev])
  }

  function toggleComplete(id: string) {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed, updatedAt: new Date().toISOString() } : t,
      ),
    )
  }

  function updateTodo(id: string, changes: Partial<Omit<Todo, 'id' | 'createdAt'>>) {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, ...changes, updatedAt: new Date().toISOString() } : t,
      ),
    )
  }

  function deleteTodo(id: string) {
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }

  function clearCompleted() {
    setTodos((prev) => prev.filter((t) => !t.completed))
  }

  return {
    todos,
    filteredTodos,
    allCategories,
    stats,
    addTodo,
    toggleComplete,
    updateTodo,
    deleteTodo,
    clearCompleted,
  }
}
