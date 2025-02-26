'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiSettings, FiShuffle, FiClock, FiActivity } from 'react-icons/fi';

export default function Navigation() {
  const pathname = usePathname();
  // Removed unused colorScheme import

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-[600px] mx-auto px-4">
        <div className="flex justify-around py-2">
          <Link 
            href="/random-timer"
            className={`flex flex-col items-center ${
              pathname === '/random-timer' ? 'text-primary' : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            <FiShuffle className="h-6 w-6" />
            <span className="text-xs mt-1">Random</span>
          </Link>
          <Link 
            href="/standard-timer"
            className={`flex flex-col items-center ${
              pathname === '/standard-timer' ? 'text-primary' : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            <FiClock className="h-6 w-6" />
            <span className="text-xs mt-1">Standard</span>
          </Link>
          <Link 
            href="/tabata-timer"
            className={`flex flex-col items-center ${
              pathname === '/tabata-timer' ? 'text-primary' : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            <FiActivity className="h-6 w-6" />
            <span className="text-xs mt-1">Tabata</span>
          </Link>
          <Link 
            href="/settings"
            className={`flex flex-col items-center ${
              pathname === '/settings' ? 'text-primary' : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            <FiSettings className="h-6 w-6" />
            <span className="text-xs mt-1">Settings</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
