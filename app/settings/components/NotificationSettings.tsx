'use client';

import { useSettingsStore } from '@/app/lib/stores/settings.store';
import { useState } from 'react';

export default function NotificationSettings() {
  const { enableNotifications, setEnableNotifications } = useSettingsStore();
  const [permissionStatus, setPermissionStatus] = useState<string>('default');

  const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
      alert('This browser does not support notifications');
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      setPermissionStatus(permission);
      
      if (permission === 'granted') {
        setEnableNotifications(true);
      } else {
        setEnableNotifications(false);
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    }
  };

  return (
    <section className="mb-8 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Notifications</h2>
      
      <div className="flex justify-between items-center mb-4">
        <span>Enable Notifications</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            className="sr-only peer"
            checked={enableNotifications}
            onChange={(e) => {
              if (e.target.checked && permissionStatus !== 'granted') {
                requestNotificationPermission();
              } else {
                setEnableNotifications(e.target.checked);
              }
            }}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
        </label>
      </div>
      
      {permissionStatus === 'denied' && (
        <div className="text-red-500 text-sm">
          Notification permission was denied. Please enable notifications in your browser settings.
        </div>
      )}
    </section>
  );
}
