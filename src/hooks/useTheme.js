import { useEffect, useState } from 'react'
import { defaultTheme, themes, THEME_KEY } from '../app/theme'

export default function useTheme() {
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem(THEME_KEY)
    return stored === themes.light ? themes.light : defaultTheme
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((current) => (current === themes.dark ? themes.light : themes.dark))
  }

  return { theme, toggleTheme }
}
