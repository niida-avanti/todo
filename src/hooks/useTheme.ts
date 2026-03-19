import { useState, useEffect } from 'react'
import { loadTheme, saveTheme } from '../utils/storage'

export function useTheme() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => loadTheme())

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    saveTheme(theme)
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return { theme, toggleTheme }
}
