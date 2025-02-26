'use client';

import TimerDisplay from '../../components/timer-display/timer-display';
import { useTabataTimerStore } from '../../lib/stores/tabata-timer.store';
import InputField from '../../components/input-field/input-field';
import ControlButtons from '../../components/control-buttons/control-buttons';

export default function TabataTimerPage() {
  const {
    currentTime,
    rounds,
    currentRound,
    workTime,
    restTime,
    warmupTime,
    cooldownTime,
    currentPhase,
    isRunning,
    setRounds,
    setWorkTime,
    setRestTime,
    setWarmupTime,
    setCooldownTime,
    start,
    pause,
    reset,
  } = useTabataTimerStore();

  // Get total time based on current phase
  const getTotalTime = () => {
    switch (currentPhase) {
      case 'warmup': return warmupTime;
      case 'work': return workTime;
      case 'rest': return restTime;
      case 'cooldown': return cooldownTime;
      default: return 0;
    }
  };

  // Get background color based on phase
  const getPhaseColor = () => {
    if (!isRunning) return 'bg-transparent';
    switch (currentPhase) {
      case 'work': return 'bg-green-500/20';
      case 'rest': return 'bg-blue-500/20';
      case 'warmup': return 'bg-amber-500/20';
      case 'cooldown': return 'bg-purple-500/20';
      default: return 'bg-transparent';
    }
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-start px-4 transition-colors duration-300 ${getPhaseColor()}`}>
      <div className="w-full max-w-[400px] flex flex-col items-center gap-6 pt-2 pb-20">
        <TimerDisplay 
          seconds={currentTime}
          totalSeconds={getTotalTime()}
          phase={currentPhase !== 'idle' ? currentPhase.charAt(0).toUpperCase() + currentPhase.slice(1) : undefined}
          round={currentPhase !== 'warmup' && currentPhase !== 'cooldown' ? currentRound : undefined}
          totalRounds={currentPhase !== 'warmup' && currentPhase !== 'cooldown' ? rounds : undefined}
        />

        <div className="w-full flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-2 w-full">
            <div className="flex justify-center">
              <InputField
                label="Rounds"
                value={rounds}
                onChange={(value) => setRounds(Number(value))}
                width={100}
              />
            </div>
            <div className="flex justify-center">
              <InputField
                label="Work (s)"
                value={workTime}
                onChange={(value) => setWorkTime(Number(value))}
                width={100}
              />
            </div>
            <div className="flex justify-center">
              <InputField
                label="Rest (s)"
                value={restTime}
                onChange={(value) => setRestTime(Number(value))}
                width={100}
              />
            </div>
            <div className="flex justify-center">
              <InputField
                label="Warm-up (s)"
                value={warmupTime}
                onChange={(value) => setWarmupTime(Number(value))}
                width={100}
              />
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-6">
            <InputField
              label="Cool-down (s)"
              value={cooldownTime}
              onChange={(value) => setCooldownTime(Number(value))}
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
    </div>
  );
}
