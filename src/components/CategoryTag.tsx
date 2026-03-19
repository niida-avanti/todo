interface Props {
  category: string
  onRemove?: () => void
  onClick?: () => void
  active?: boolean
}

export default function CategoryTag({ category, onRemove, onClick, active }: Props) {
  return (
    <span
      onClick={onClick}
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium transition-colors ${
        active
          ? 'bg-indigo-600 text-white'
          : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
      } ${onClick ? 'cursor-pointer hover:opacity-80' : ''}`}
    >
      # {category}
      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onRemove()
          }}
          className="hover:text-red-500 leading-none ml-0.5"
        >
          ×
        </button>
      )}
    </span>
  )
}
