import { useRef } from 'react'
import type { TodoFilters, FilterMode } from '../types/todo'
import CategoryTag from './CategoryTag'

interface Props {
  filters: TodoFilters
  onFiltersChange: (f: TodoFilters) => void
  allCategories: string[]
  totalCounts: { all: number; active: number; completed: number }
}

const FILTER_TABS: { mode: FilterMode; label: string }[] = [
  { mode: 'all', label: '全て' },
  { mode: 'active', label: '未完了' },
  { mode: 'completed', label: '完了' },
]

export default function FilterBar({ filters, onFiltersChange, allCategories, totalCounts }: Props) {
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  function setMode(mode: FilterMode) {
    onFiltersChange({ ...filters, mode })
  }

  function handleSearch(value: string) {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      onFiltersChange({ ...filters, search: value })
    }, 150)
  }

  function toggleCategory(cat: string) {
    onFiltersChange({ ...filters, category: filters.category === cat ? null : cat })
  }

  return (
    <div className="card p-4 space-y-3">
      <div className="flex items-center gap-2 flex-wrap">
        {/* Filter tabs */}
        <div className="flex gap-1 bg-gray-100 dark:bg-gray-700 p-1 rounded-xl">
          {FILTER_TABS.map(({ mode, label }) => (
            <button
              key={mode}
              onClick={() => setMode(mode)}
              className={`filter-btn ${filters.mode === mode ? 'filter-btn-active' : 'filter-btn-inactive'}`}
            >
              {label}
              <span
                className={`ml-1.5 text-xs ${
                  filters.mode === mode ? 'opacity-75' : 'opacity-50'
                }`}
              >
                {totalCounts[mode]}
              </span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="flex-1 min-w-[140px] relative">
          <svg
            className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <circle cx="11" cy="11" r="8" />
            <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="検索..."
            defaultValue={filters.search}
            onChange={(e) => handleSearch(e.target.value)}
            className="input-base pl-8"
          />
        </div>
      </div>

      {/* Category filters */}
      {allCategories.length > 0 && (
        <div className="flex gap-1.5 flex-wrap">
          {allCategories.map((cat) => (
            <CategoryTag
              key={cat}
              category={cat}
              active={filters.category === cat}
              onClick={() => toggleCategory(cat)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
