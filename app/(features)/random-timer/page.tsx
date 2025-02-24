'use client';

import TimerDisplay from '../../components/timer-display/timer-display';
import { useRandomTimerStore } from '../../lib/stores/random-timer.store';
import InputField from '../../components/input-field/input-field';
import ControlButtons from '../../components/control-buttons/control-buttons';
import ToggleRow from '../../components/toggle-row/toggle-row';

export default function RandomTimerPage() {
  const {
    currentTime,
    minTime,
    maxTime,
    rounds,
    currentRound,
    isLoopMode,
    isRunning,
    setMinTime,
    setMaxTime,
    setRounds,
    setIsLoopMode,
    start,
    pause,
    reset,
  } = useRandomTimerStore();

  return (
    <div className="min-h-screen flex flex-col items-center pb-16 pt-4 px-4 gap-4 sm:gap-6">
      <TimerDisplay 
        seconds={currentTime}
        totalSeconds={maxTime}
        round={currentRound}
        totalRounds={rounds}
      />

      <div className="flex flex-col gap-4 w-full max-w-[400px]">
        <div className="flex gap-4 justify-center">
          <InputField
            label="Min (s)"
            value={minTime}
            onChange={(value) => setMinTime(Number(value))}
            width={100}
          />
          <InputField
            label="Max (s)"
            value={maxTime}
            onChange={(value) => setMaxTime(Number(value))}
            width={100}
          />
        </div>

        <div className="flex flex-col items-center gap-4">
          <InputField
            label="Rounds (0 = endless)"
            value={rounds}
            onChange={(value) => setRounds(Number(value))}
            width={175}
          />
          
          <ToggleRow
            label="Loop Mode"
            value={isLoopMode}
            onChange={setIsLoopMode}
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
