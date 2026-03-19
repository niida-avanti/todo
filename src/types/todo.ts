export type Priority = 'high' | 'medium' | 'low'
export type FilterMode = 'all' | 'active' | 'completed'

export interface Todo {
  id: string
  text: string
  completed: boolean
  priority: Priority
  dueDate: string | null
  categories: string[]
  createdAt: string
  updatedAt: string
}

export interface TodoFilters {
  mode: FilterMode
  search: string
  category: string | null
}

export interface AppStats {
  total: number
  completed: number
  remaining: number
}
