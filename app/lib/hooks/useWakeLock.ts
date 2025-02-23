import { useEffect, useRef } from 'react'
import { useUserPreferencesStore } from '../stores/user-preferences.store'

export const useWakeLock = () => {
  const keepScreenAwake = useUserPreferencesStore((state) => state.keepScreenAwake)
  const wakeLockRef = useRef<WakeLockSentinel | null>(null)

  useEffect(() => {
    const requestWakeLock = async () => {
      if (keepScreenAwake && 'wakeLock' in navigator) {
        try {
          wakeLockRef.current = await navigator.wakeLock.request('screen')
        } catch (err) {
          console.warn('Wake Lock request failed:', err)
        }
      }
    }

    const releaseWakeLock = async () => {
      if (wakeLockRef.current) {
        try {
          await wakeLockRef.current.release()
          wakeLockRef.current = null
        } catch (err) {
          console.warn('Wake Lock release failed:', err)
        }
      }
    }

    if (keepScreenAwake) {
      requestWakeLock()
    } else {
      releaseWakeLock()
    }

    return () => {
      releaseWakeLock()
    }
  }, [keepScreenAwake])
}