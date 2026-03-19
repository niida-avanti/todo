import type { Todo, TodoFilters } from '../types/todo'

const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 }

export function applyFilters(todos: Todo[], filters: TodoFilters): Todo[] {
  let result = todos.filter((todo) => {
    // Filter by completion status
    if (filters.mode === 'active' && todo.completed) return false
    if (filters.mode === 'completed' && !todo.completed) return false

    // Filter by category
    if (filters.category && !todo.categories.includes(filters.category)) return false

    // Filter by search query
    if (filters.search) {
      const query = filters.search.toLowerCase()
      const textMatch = todo.text.toLowerCase().includes(query)
      const categoryMatch = todo.categories.some((c) => c.toLowerCase().includes(query))
      if (!textMatch && !categoryMatch) return false
    }

    return true
  })

  // Sort: incomplete first, then by priority, then by due date, then by creation date
  result = result.sort((a, b) => {
    // Incomplete before complete
    if (a.completed !== b.completed) return a.completed ? 1 : -1

    // Higher priority first
    const priorityDiff = PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]
    if (priorityDiff !== 0) return priorityDiff

    // Earlier due date first (null = no deadline = last)
    if (a.dueDate !== b.dueDate) {
      if (!a.dueDate) return 1
      if (!b.dueDate) return -1
      return a.dueDate.localeCompare(b.dueDate)
    }

    // Newest first
    return b.createdAt.localeCompare(a.createdAt)
  })

  return result
}

export function getAllCategories(todos: Todo[]): string[] {
  const set = new Set<string>()
  for (const todo of todos) {
    for (const cat of todo.categories) {
      set.add(cat)
    }
  }
  return Array.from(set).sort()
}
