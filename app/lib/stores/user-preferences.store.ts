import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface TimerPreset {
  id: string
  name: string
  type: 'standard' | 'tabata' | 'random'
  config: {
    // Common fields
    duration?: number
    // Random timer specific
    minTime?: number
    maxTime?: number
    rounds?: number
    // Tabata specific
    workTime?: number
    restTime?: number
    warmupTime?: number
    cooldownTime?: number
    totalRounds?: number
  }
}

interface RecentTimer {
  type: 'standard' | 'tabata' | 'random'
  lastUsed: number // timestamp
  useCount: number
}

interface UserPreferencesState {
  // Timer preferences
  defaultTimerType: 'standard' | 'tabata' | 'random'
  recentTimers: Record<string, RecentTimer>
  timerPresets: TimerPreset[]
  
  // UI preferences
  showTutorials: boolean
  compactMode: boolean
  vibrateOnComplete: boolean
  keepScreenAwake: boolean

  // Actions
  setDefaultTimerType: (type: 'standard' | 'tabata' | 'random') => void
  addTimerPreset: (preset: Omit<TimerPreset, 'id'>) => void
  updateTimerPreset: (id: string, preset: Partial<TimerPreset>) => void
  deleteTimerPreset: (id: string) => void
  updateRecentTimer: (type: 'standard' | 'tabata' | 'random') => void
  setShowTutorials: (show: boolean) => void
  setCompactMode: (enabled: boolean) => void
  setVibrateOnComplete: (enabled: boolean) => void
  setKeepScreenAwake: (enabled: boolean) => void
}

export const useUserPreferencesStore = create<UserPreferencesState>()(
  persist(
    (set) => ({
      // Default values
      defaultTimerType: 'standard',
      recentTimers: {},
      timerPresets: [],
      showTutorials: true,
      compactMode: false,
      vibrateOnComplete: true,
      keepScreenAwake: true,

      // Timer type actions
      setDefaultTimerType: (type) => set({ defaultTimerType: type }),

      // Timer preset actions
      addTimerPreset: (preset) => {
        const newPreset: TimerPreset = {
          ...preset,
          id: crypto.randomUUID()
        }
        set((state) => ({
          timerPresets: [...state.timerPresets, newPreset]
        }))
      },

      updateTimerPreset: (id, preset) => {
        set((state) => ({
          timerPresets: state.timerPresets.map((p) =>
            p.id === id ? { ...p, ...preset } : p
          )
        }))
      },

      deleteTimerPreset: (id) => {
        set((state) => ({
          timerPresets: state.timerPresets.filter((p) => p.id !== id)
        }))
      },

      // Recent timers tracking
      updateRecentTimer: (type) => {
        set((state) => {
          const current = state.recentTimers[type] || { useCount: 0, lastUsed: 0 }
          return {
            recentTimers: {
              ...state.recentTimers,
              [type]: {
                type,
                lastUsed: Date.now(),
                useCount: current.useCount + 1
              }
            }
          }
        })
      },

      // UI preference actions
      setShowTutorials: (show) => set({ showTutorials: show }),
      setCompactMode: (enabled) => set({ compactMode: enabled }),
      setVibrateOnComplete: (enabled) => set({ vibrateOnComplete: enabled }),
      setKeepScreenAwake: (enabled) => set({ keepScreenAwake: enabled }),
    }),
    {
      name: 'timer-toolkit-user-preferences',
      // Only persist non-temporary state
      partialize: (state) => ({
        defaultTimerType: state.defaultTimerType,
        timerPresets: state.timerPresets,
        showTutorials: state.showTutorials,
        compactMode: state.compactMode,
        vibrateOnComplete: state.vibrateOnComplete,
        keepScreenAwake: state.keepScreenAwake,
      }),
    }
  )
)
