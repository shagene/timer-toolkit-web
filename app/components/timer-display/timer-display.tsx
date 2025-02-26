'use client';

import { useEffect, useRef } from 'react';

interface TimerDisplayProps {
  seconds: number;
  totalSeconds: number;
  phase?: string;
  round?: number;
  totalRounds?: number;
  showProgress?: boolean;
}

export default function TimerDisplay({
  seconds,
  totalSeconds,
  phase,
  round,
  totalRounds,
  showProgress = true,
}: TimerDisplayProps) {
  const progressRef = useRef<SVGCircleElement>(null);
  const radius = 58; // Increased radius for bigger circle
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    if (progressRef.current && showProgress) {
      const progress = seconds / totalSeconds;
      const offset = circumference * (1 - progress);
      progressRef.current.style.strokeDashoffset = offset.toString();
    }
  }, [seconds, totalSeconds, showProgress, circumference]);

  return (
    <div className="relative w-56 h-56 flex items-center justify-center"> {/* Reduced from w-64 h-64 */}
      {showProgress && (
        <svg className="absolute w-full h-full -rotate-90">
          <circle
            className="stroke-gray-200 dark:stroke-gray-700 fill-none"
            strokeWidth="4"
            r={radius}
            cx="50%"
            cy="50%"
          />
          <circle
            ref={progressRef}
            className="stroke-primary-600 dark:stroke-primary-400 fill-none transition-all duration-300 ease-linear"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            r={radius}
            cx="50%"
            cy="50%"
          />
        </svg>
      )}
      
      <div className="text-center z-10">
        <div className="text-4xl font-bold mb-1"> {/* Kept original text size */}
          {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, '0')}
        </div>
        {phase && <div className="text-base text-gray-600 dark:text-gray-300">{phase}</div>}
        {round !== undefined && totalRounds !== undefined && (
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Round {round}/{totalRounds}
          </div>
        )}
      </div>
    </div>
  );
}
