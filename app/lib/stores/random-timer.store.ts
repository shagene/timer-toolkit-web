import { create } from 'zustand'
import { BaseTimerState, createTimerSlice } from './timer-base.store'
import { useSettingsStore } from './settings.store'

interface RandomTimerState extends BaseTimerState {
  minTime: number
  maxTime: number
  rounds: number
  currentRound: number
  isLoopMode: boolean
  
  // Actions
  setMinTime: (time: number) => void
  setMaxTime: (time: number) => void
  setRounds: (rounds: number) => void
  setIsLoopMode: (isLoop: boolean) => void
  generateRandomTime: () => void
  nextRound: () => void
  tick: () => void
}

export const useRandomTimerStore = create<RandomTimerState>()((set, get) => {
  const baseTimer = createTimerSlice(set, get)
  
  return {
    ...baseTimer,
    minTime: 30,
    maxTime: 60,
    rounds: 1,
    currentRound: 1,
    isLoopMode: false,

    setMinTime: (time) => set({ minTime: time }),
    setMaxTime: (time) => set({ maxTime: time }),
    setRounds: (rounds) => set({ rounds }),
    setIsLoopMode: (isLoop) => set({ isLoopMode: isLoop }),
    
    generateRandomTime: () => {
      const { minTime, maxTime } = get()
      const randomTime = Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime
      set({ currentTime: randomTime })
    },

    nextRound: () => {
      const state = get()
      if (state.currentRound < state.rounds || state.isLoopMode) {
        set({ 
          currentRound: state.isLoopMode ? 
            (state.currentRound % state.rounds) + 1 : 
            state.currentRound + 1 
        })
        state.generateRandomTime()
        state.start()
      }
    },

    tick: () => {
      const state = get()
      if (state.currentTime > 0) {
        set({ currentTime: state.currentTime - 1 })
      } else {
        const settings = useSettingsStore.getState()
        if (settings.soundEnabled) {
          const audio = new Audio('/sounds/beep.mp3')
          audio.volume = settings.soundVolume
          audio.play()
        }
        state.pause()
        state.nextRound()
      }
    }
  }
})
