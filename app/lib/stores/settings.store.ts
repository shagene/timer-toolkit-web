import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type ThemeMode = 'light' | 'dark' | 'system'
export type ColorScheme = {
  primary: string
  secondary: string
}

interface SettingsState {
  // Theme settings
  themeMode: ThemeMode
  colorScheme: ColorScheme
  visualCountdown: boolean
  
  // Sound settings
  soundEnabled: boolean
  soundVolume: number
  selectedSound: string
  
  // Notification settings
  notificationsEnabled: boolean
  backgroundNotifications: boolean
  
  // Actions
  setThemeMode: (mode: ThemeMode) => void
  setColorScheme: (colors: ColorScheme) => void
  setVisualCountdown: (enabled: boolean) => void
  setSoundEnabled: (enabled: boolean) => void
  setSoundVolume: (volume: number) => void
  setSelectedSound: (soundId: string) => void
  setNotificationsEnabled: (enabled: boolean) => void
  setBackgroundNotifications: (enabled: boolean) => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      // Theme defaults
      themeMode: 'system',
      colorScheme: {
        primary: '#3B82F6',   // blue-500
        secondary: '#10B981', // emerald-500
      },
      visualCountdown: true,

      // Sound defaults
      soundEnabled: true,
      soundVolume: 0.7,
      selectedSound: 'beep',

      // Notification defaults
      notificationsEnabled: true,
      backgroundNotifications: true,

      // Theme actions
      setThemeMode: (mode) => set({ themeMode: mode }),
      setColorScheme: (colors) => set({ colorScheme: colors }),
      setVisualCountdown: (enabled) => set({ visualCountdown: enabled }),

      // Sound actions
      setSoundEnabled: (enabled) => set({ soundEnabled: enabled }),
      setSoundVolume: (volume) => set({ 
        soundVolume: Math.max(0, Math.min(1, volume)) 
      }),
      setSelectedSound: (soundId) => set({ selectedSound: soundId }),

      // Notification actions
      setNotificationsEnabled: (enabled) => set({ notificationsEnabled: enabled }),
      setBackgroundNotifications: (enabled) => set({ backgroundNotifications: enabled }),
    }),
    {
      name: 'timer-toolkit-settings',
      // Only persist specific fields
      partialize: (state) => ({
        themeMode: state.themeMode,
        colorScheme: state.colorScheme,
        visualCountdown: state.visualCountdown,
        soundEnabled: state.soundEnabled,
        soundVolume: state.soundVolume,
        selectedSound: state.selectedSound,
        notificationsEnabled: state.notificationsEnabled,
        backgroundNotifications: state.backgroundNotifications,
      }),
    }
  )
)
