import { StateCreator } from 'zustand'

export interface BaseTimerState {
  isRunning: boolean
  isPaused: boolean
  currentTime: number
  timerInterval: NodeJS.Timeout | null
  
  // Actions
  start: () => void
  pause: () => void
  stop: () => void
  reset: () => void
  tick: () => void
}

type TimerSliceCreator<T extends BaseTimerState> = StateCreator<T, [], [], BaseTimerState>

export const createTimerSlice = <T extends BaseTimerState>(
  set: Parameters<TimerSliceCreator<T>>[0],
  get: () => T
): BaseTimerState => ({
  isRunning: false,
  isPaused: false,
  currentTime: 0,
  timerInterval: null,

  start: () => {
    const state = get()
    if (!state.isRunning) {
      set({ 
        isRunning: true, 
        isPaused: false,
        timerInterval: setInterval(() => get().tick(), 1000) 
      } as Partial<T>)
    }
  },

  pause: () => {
    const state = get()
    if (state.timerInterval) {
      clearInterval(state.timerInterval)
    }
    set({ isRunning: false, isPaused: true, timerInterval: null } as Partial<T>)
  },

  stop: () => {
    const state = get()
    if (state.timerInterval) {
      clearInterval(state.timerInterval)
    }
    set({ 
      isRunning: false, 
      isPaused: false, 
      currentTime: 0, 
      timerInterval: null 
    } as Partial<T>)
  },

  reset: () => {
    const state = get()
    if (state.timerInterval) {
      clearInterval(state.timerInterval)
    }
    set({ currentTime: 0, timerInterval: null } as Partial<T>)
  },

  tick: () => {
    const state = get()
    if (state.currentTime > 0) {
      set({ currentTime: state.currentTime - 1 } as Partial<T>)
    } else {
      state.stop()
    }
  }
})
