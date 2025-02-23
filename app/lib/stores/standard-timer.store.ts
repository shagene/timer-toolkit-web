import { create } from 'zustand'
import { BaseTimerState, createTimerSlice } from './timer-base.store'

interface StandardTimerState extends BaseTimerState {
  duration: number
  setDuration: (duration: number) => void
}

export const useStandardTimerStore = create<StandardTimerState>()((set, get) => {
  const baseTimer = createTimerSlice(set, get)
  
  return {
    ...baseTimer,
    duration: 60,
    currentTime: 60, // Initialize currentTime with duration

    setDuration: (duration) => {
      set({ 
        duration,
        currentTime: duration // Reset currentTime when duration changes
      })
    },

    reset: () => {
      const state = get()
      if (state.timerInterval) {
        clearInterval(state.timerInterval)
      }
      set({ 
        currentTime: state.duration,
        timerInterval: null,
        isRunning: false,
        isPaused: false
      })
    }
  }
})
