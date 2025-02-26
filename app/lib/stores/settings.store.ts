import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ThemeMode = 'light' | 'dark' | 'system';

interface ColorScheme {
  primary: string;
  secondary: string;
}

interface SettingsState {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  
  colorScheme: ColorScheme;
  setColorScheme: (colors: ColorScheme) => void;
  
  showVisualCountdown: boolean;
  setShowVisualCountdown: (show: boolean) => void;
  
  enableNotifications: boolean;
  setEnableNotifications: (enable: boolean) => void;
  
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  
  selectedSound: string;
  setSelectedSound: (soundId: string) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      // Theme settings
      themeMode: 'system',
      setThemeMode: (mode) => set({ themeMode: mode }),
      
      colorScheme: {
        primary: '#3B82F6', // Default blue
        secondary: '#10B981', // Default green
      },
      setColorScheme: (colors) => set({ colorScheme: colors }),
      
      // Display settings
      showVisualCountdown: true,
      setShowVisualCountdown: (show) => set({ showVisualCountdown: show }),
      
      // Notification settings
      enableNotifications: true,
      setEnableNotifications: (enable) => set({ enableNotifications: enable }),
      
      // Sound settings
      soundEnabled: true,
      setSoundEnabled: (enabled) => set({ soundEnabled: enabled }),
      
      selectedSound: 'beep', // Default sound
      setSelectedSound: (soundId) => set({ selectedSound: soundId }),
    }),
    {
      name: 'timer-toolkit-settings',
    }
  )
);
