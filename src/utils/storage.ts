import type { Todo } from '../types/todo'

const TODOS_KEY = 'todo-app-todos'
const THEME_KEY = 'todo-app-theme'

export function loadTodos(): Todo[] {
  try {
    const raw = localStorage.getItem(TODOS_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed as Todo[]
  } catch {
    return []
  }
}

export function saveTodos(todos: Todo[]): void {
  try {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos))
  } catch {
    // localStorage might be full or unavailable
  }
}

export function loadTheme(): 'dark' | 'light' {
  try {
    const saved = localStorage.getItem(THEME_KEY)
    if (saved === 'dark' || saved === 'light') return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

export function saveTheme(theme: 'dark' | 'light'): void {
  try {
    localStorage.setItem(THEME_KEY, theme)
  } catch {
    // ignore
  }
}
