'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-[600px] mx-auto px-4">
        <div className="flex justify-around py-4">
          <Link 
            href="/random-timer"
            className={`flex flex-col items-center ${
              pathname === '/random-timer' ? 'text-blue-600' : 'text-gray-600'
            }`}
          >
            <span>Random</span>
          </Link>
          <Link 
            href="/standard-timer"
            className={`flex flex-col items-center ${
              pathname === '/standard-timer' ? 'text-blue-600' : 'text-gray-600'
            }`}
          >
            <span>Standard</span>
          </Link>
          <Link 
            href="/tabata-timer"
            className={`flex flex-col items-center ${
              pathname === '/tabata-timer' ? 'text-blue-600' : 'text-gray-600'
            }`}
          >
            <span>Tabata</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}