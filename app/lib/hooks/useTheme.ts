import { useEffect } from 'react'
import { useSettingsStore } from '../stores/settings.store'

export const useTheme = () => {
  const { themeMode, colorScheme } = useSettingsStore()

  useEffect(() => {
    const root = window.document.documentElement
    
    // Handle theme mode
    if (themeMode === 'system') {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      root.classList.toggle('dark', systemDark)
    } else {
      root.classList.toggle('dark', themeMode === 'dark')
    }

    // Apply custom colors
    root.style.setProperty('--color-primary', colorScheme.primary)
    root.style.setProperty('--color-secondary', colorScheme.secondary)
  }, [themeMode, colorScheme])

  return null
}