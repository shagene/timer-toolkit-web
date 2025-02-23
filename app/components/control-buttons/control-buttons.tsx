'use client';

import { PlayIcon, PauseIcon, StopIcon } from '@heroicons/react/24/outline';

interface ControlButtonsProps {
  isRunning: boolean;
  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
  disabled?: boolean;
}

export default function ControlButtons({
  isRunning,
  onPlay,
  onPause,
  onStop,
  disabled = false,
}: ControlButtonsProps) {
  return (
    <div className="flex gap-4 items-center">
      <button
        onClick={isRunning ? onPause : onPlay}
        disabled={disabled}
        className={`
          rounded-full p-4 transition-colors
          ${isRunning
            ? 'bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600'
            : 'bg-primary-500 hover:bg-primary-600 dark:bg-primary-400 dark:hover:bg-primary-500'}
          disabled:bg-gray-300 dark:disabled:bg-gray-700
        `}
      >
        {isRunning ? (
          <PauseIcon className="w-8 h-8 text-white" />
        ) : (
          <PlayIcon className="w-8 h-8 text-white" />
        )}
      </button>
      
      <button
        onClick={onStop}
        disabled={disabled}
        className="rounded-full p-4 bg-secondary-500 hover:bg-secondary-600 
                 dark:bg-secondary-400 dark:hover:bg-secondary-500
                 disabled:bg-gray-300 dark:disabled:bg-gray-700 transition-colors"
      >
        <StopIcon className="w-8 h-8 text-white" />
      </button>
    </div>
  );
}
