interface Props {
  theme: 'dark' | 'light'
  onToggle: () => void
}

export default function ThemeToggle({ theme, onToggle }: Props) {
  return (
    <button
      onClick={onToggle}
      className="btn-icon w-9 h-9 flex items-center justify-center"
      title={theme === 'dark' ? 'ライトモードに切り替え' : 'ダークモードに切り替え'}
    >
      {theme === 'dark' ? (
        // Sun icon
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <circle cx="12" cy="12" r="5" />
          <path strokeLinecap="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      ) : (
        // Moon icon
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>
      )}
    </button>
  )
}
