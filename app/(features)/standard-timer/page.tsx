'use client';

import TimerDisplay from '../../components/timer-display/timer-display';
import { useStandardTimerStore } from '../../lib/stores/standard-timer.store';
import InputField from '../../components/input-field/input-field';
import ControlButtons from '../../components/control-buttons/control-buttons';

export default function StandardTimerPage() {
  const {
    currentTime,
    duration,
    isRunning,
    setDuration,
    start,
    pause,
    reset,
  } = useStandardTimerStore();

  return (
    <div className="min-h-screen flex flex-col items-center pb-16 pt-4 px-4 gap-4 sm:gap-6">
      <TimerDisplay 
        seconds={currentTime}
        totalSeconds={duration}
      />

      <div className="flex flex-col gap-4 w-full max-w-[400px]">
        <div className="flex flex-col items-center gap-4">
          <InputField
            label="Duration (s)"
            value={duration}
            onChange={(value) => setDuration(Number(value))}
            width={175}
          />
          
          <ControlButtons
            isRunning={isRunning}
            onPlay={start}
            onPause={pause}
            onStop={reset}
          />
        </div>
      </div>
    </div>
  );
}
