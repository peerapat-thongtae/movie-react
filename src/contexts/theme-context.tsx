import { useContext, useEffect, useState } from 'react'

import { createContext } from 'react'
import { ThemeContextInterface } from '@/types/theme.type'

export const ThemeContext = createContext<ThemeContextInterface>({
  darkTheme: true,
  toggleTheme: Function,
})

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [darkTheme, setDarkTheme] = useState<boolean>(true)

  const toggleTheme = () => {
    setDarkTheme(curr => !curr)
  }

  useEffect(() => {
    const currentTheme = localStorage.getItem('theme')
    if (!currentTheme) {
      if (
        window.matchMedia
        && window.matchMedia('prefers-color-scheme: dark)')
      ) {
        setDarkTheme(true)
      }
    }
    else {
      setDarkTheme(currentTheme === 'dark')
    }
  }, [])

  useEffect(() => {
    document.body.className = darkTheme ? '' : 'dark'
    localStorage.setItem('theme', darkTheme ? 'dark' : 'light')
  }, [darkTheme])

  return (
    <ThemeContext.Provider value={{ darkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  return context
}
