'use client';

import { FiMoon, FiSun, FiMonitor } from 'react-icons/fi';
import { useSettingsStore } from '@/app/lib/stores/settings.store';

export default function ThemeSettings() {
  const { 
    themeMode, setThemeMode, 
    colorScheme, setColorScheme 
  } = useSettingsStore();

  return (
    <section className="mb-8 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Theme</h2>
      
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <span>Theme Mode</span>
          <div className="flex gap-2">
            <button 
              onClick={() => setThemeMode('light')}
              className={`p-2 rounded-md ${themeMode === 'light' ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700'}`}
              aria-label="Light mode"
            >
              <FiSun />
            </button>
            <button 
              onClick={() => setThemeMode('dark')}
              className={`p-2 rounded-md ${themeMode === 'dark' ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700'}`}
              aria-label="Dark mode"
            >
              <FiMoon />
            </button>
            <button 
              onClick={() => setThemeMode('system')}
              className={`p-2 rounded-md ${themeMode === 'system' ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700'}`}
              aria-label="System preference"
            >
              <FiMonitor />
            </button>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span>Primary Color</span>
          <div className="flex gap-2">
            {['#3B82F6', '#8B5CF6', '#EC4899', '#EF4444', '#F97316', '#10B981'].map(color => (
              <button
                key={color}
                onClick={() => setColorScheme({ ...colorScheme, primary: color })}
                className={`w-8 h-8 rounded-full ${colorScheme.primary === color ? 'ring-2 ring-offset-2 ring-gray-400' : ''}`}
                style={{ backgroundColor: color }}
                aria-label={`Set primary color to ${color}`}
              />
            ))}
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span>Secondary Color</span>
          <div className="flex gap-2">
            {['#10B981', '#F59E0B', '#6366F1', '#EC4899', '#8B5CF6', '#3B82F6'].map(color => (
              <button
                key={color}
                onClick={() => setColorScheme({ ...colorScheme, secondary: color })}
                className={`w-8 h-8 rounded-full ${colorScheme.secondary === color ? 'ring-2 ring-offset-2 ring-gray-400' : ''}`}
                style={{ backgroundColor: color }}
                aria-label={`Set secondary color to ${color}`}
              />
            ))}
          </div>
        </div>

        {/* Preview section */}
        <div className="mt-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h3 className="text-sm font-medium mb-3">Preview</h3>
          <div className="flex gap-3">
            <button className="bg-primary text-white px-3 py-1 rounded-md">
              Primary
            </button>
            <button className="bg-secondary text-white px-3 py-1 rounded-md">
              Secondary
            </button>
            <button className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-md">
              Neutral
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
