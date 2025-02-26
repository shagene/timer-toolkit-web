'use client';

import { useState, useEffect } from 'react';
import { getAllSounds, BUILT_IN_SOUNDS } from '@/app/lib/utils/sound';
import ThemeSettings from './components/ThemeSettings';
import SoundSettings from './components/SoundSettings';
import DisplaySettings from './components/DisplaySettings';
import NotificationSettings from './components/NotificationSettings';
import StorageManagement from './components/StorageManagement';

export default function SettingsPage() {
  const [sounds, setSounds] = useState<Array<{ id: string, name: string, path: string }>>(BUILT_IN_SOUNDS);

  useEffect(() => {
    // Load all sounds when component mounts
    loadSounds();
  }, []);

  const loadSounds = async () => {
    const allSounds = await getAllSounds();
    setSounds(allSounds);
  };

  return (
    <div className="max-w-[600px] mx-auto p-6 pb-24">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <ThemeSettings />
      
      <SoundSettings 
        sounds={sounds} 
        refreshSounds={loadSounds} 
      />
      
      <DisplaySettings />
      
      <NotificationSettings />
      
      <StorageManagement 
        refreshSounds={loadSounds} 
      />
    </div>
  );
}
