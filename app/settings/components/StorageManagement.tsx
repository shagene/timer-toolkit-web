'use client';

import { useState } from 'react';

interface StorageManagementProps {
  refreshSounds: () => void;
}

export default function StorageManagement({ refreshSounds }: StorageManagementProps) {
  const [isClearing, setIsClearing] = useState(false);

  const clearAllData = () => {
    if (window.confirm('Are you sure you want to clear all app data? This will reset all settings to default.')) {
      setIsClearing(true);
      
      // Clear all localStorage items
      localStorage.clear();
      
      // Reload the page to reset all state
      window.location.reload();
    }
  };

  return (
    <section className="mb-8 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Storage Management</h2>
      
      <div className="flex flex-col gap-4">
        <button
          onClick={clearAllData}
          disabled={isClearing}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md disabled:opacity-50"
        >
          {isClearing ? 'Clearing...' : 'Clear All App Data'}
        </button>
        
        <p className="text-sm text-gray-500 dark:text-gray-400">
          This will reset all settings, preferences, and custom sounds to their default values.
        </p>
      </div>
    </section>
  );
}
