import { create } from 'zustand'
import { BaseTimerState, createTimerSlice } from './timer-base.store'

type TabataPhase = 'warmup' | 'work' | 'rest' | 'cooldown' | 'idle'

interface TabataTimerState extends BaseTimerState {
  rounds: number
  currentRound: number
  workTime: number
  restTime: number
  warmupTime: number
  cooldownTime: number
  currentPhase: TabataPhase
  
  // Actions
  setRounds: (rounds: number) => void
  setWorkTime: (time: number) => void
  setRestTime: (time: number) => void
  setWarmupTime: (time: number) => void
  setCooldownTime: (time: number) => void
  nextPhase: () => void
}

export const useTabataTimerStore = create<TabataTimerState>()((set, get) => {
  const baseTimer = createTimerSlice(set, get)
  
  return {
    ...baseTimer,
    rounds: 8,
    currentRound: 1,
    workTime: 20,
    restTime: 10,
    warmupTime: 10,
    cooldownTime: 10,
    currentPhase: 'idle',

    setRounds: (rounds) => set({ rounds }),
    setWorkTime: (time) => set({ workTime: time }),
    setRestTime: (time) => set({ restTime: time }),
    setWarmupTime: (time) => set({ warmupTime: time }),
    setCooldownTime: (time) => set({ cooldownTime: time }),

    start: () => {
      const state = get()
      if (!state.isRunning) {
        if (state.currentPhase === 'idle') {
          set({ 
            currentPhase: state.warmupTime > 0 ? 'warmup' : 'work',
            currentTime: state.warmupTime > 0 ? state.warmupTime : state.workTime
          })
        }
        baseTimer.start()
      }
    },

    reset: () => {
      const state = get()
      if (state.timerInterval) {
        clearInterval(state.timerInterval)
      }
      set({ 
        currentTime: 0,
        currentRound: 1,
        currentPhase: 'idle',
        timerInterval: null,
        isRunning: false,
        isPaused: false
      })
    },

    nextPhase: () => {
      const state = get()
      let nextPhase: TabataPhase = 'idle'
      let nextTime = 0
      let nextRound = state.currentRound

      switch (state.currentPhase) {
        case 'warmup':
          nextPhase = 'work'
          nextTime = state.workTime
          break
        case 'work':
          nextPhase = 'rest'
          nextTime = state.restTime
          break
        case 'rest':
          if (state.currentRound < state.rounds) {
            nextPhase = 'work'
            nextTime = state.workTime
            nextRound = state.currentRound + 1
          } else if (state.cooldownTime > 0) {
            nextPhase = 'cooldown'
            nextTime = state.cooldownTime
          } else {
            nextPhase = 'idle'
            state.stop()
            return
          }
          break
        case 'cooldown':
          nextPhase = 'idle'
          state.stop()
          return
        default:
          state.stop()
          return
      }

      set({ 
        currentPhase: nextPhase,
        currentTime: nextTime,
        currentRound: nextRound
      })
    },

    tick: () => {
      const state = get()
      if (state.currentTime > 0) {
        set({ currentTime: state.currentTime - 1 })
      } else {
        state.nextPhase()
      }
    }
  }
})
