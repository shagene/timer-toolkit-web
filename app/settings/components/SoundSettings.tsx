'use client';

import { useSettingsStore } from '@/app/lib/stores/settings.store';
import { FiVolume2, FiVolumeX } from 'react-icons/fi';

interface SoundSettingsProps {
  sounds: Array<{ id: string, name: string, path: string }>;
  refreshSounds: () => void;
}

export default function SoundSettings({ sounds, refreshSounds }: SoundSettingsProps) {
  const { 
    soundEnabled, setSoundEnabled,
    selectedSound, setSelectedSound
  } = useSettingsStore();

  const playSound = (soundPath: string) => {
    if (!soundEnabled) return;
    
    const audio = new Audio(soundPath);
    audio.play().catch(error => {
      console.error('Error playing sound:', error);
    });
  };

  return (
    <section className="mb-8 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Sound</h2>
      
      <div className="flex justify-between items-center mb-4">
        <span>Enable Sound</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            className="sr-only peer"
            checked={soundEnabled}
            onChange={(e) => setSoundEnabled(e.target.checked)}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
        </label>
      </div>
      
      <div className="mt-4">
        <label className="block mb-2">Timer Sound</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {sounds.map(sound => (
            <button
              key={sound.id}
              onClick={() => {
                setSelectedSound(sound.id);
                playSound(sound.path);
              }}
              className={`flex justify-between items-center p-3 rounded-md ${
                selectedSound === sound.id 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 dark:bg-gray-700'
              }`}
            >
              <span>{sound.name}</span>
              {soundEnabled ? (
                <FiVolume2 className="ml-2" onClick={(e) => {
                  e.stopPropagation();
                  playSound(sound.path);
                }} />
              ) : (
                <FiVolumeX className="ml-2" />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
