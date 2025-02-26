// Define the built-in sounds
export const BUILT_IN_SOUNDS = [
  { id: 'beep', name: 'Beep', path: '/sounds/beep.mp3' },
  { id: 'bell', name: 'Bell', path: '/sounds/bell.mp3' },
  { id: 'whistle', name: 'Whistle', path: '/sounds/whistle.mp3' },
];

// Function to get all sounds (built-in + custom)
export const getAllSounds = async (): Promise<Array<{ id: string, name: string, path: string }>> => {
  // In a real implementation, you might fetch custom sounds from IndexedDB or another storage
  // For now, we'll just return the built-in sounds
  return BUILT_IN_SOUNDS;
};

// Function to play a sound by ID
export const playSound = (soundId: string, volume = 1.0): void => {
  const sound = BUILT_IN_SOUNDS.find(s => s.id === soundId);
  
  if (!sound) {
    console.error(`Sound with ID ${soundId} not found`);
    return;
  }
  
  const audio = new Audio(sound.path);
  audio.volume = volume;
  
  audio.play().catch(error => {
    console.error('Error playing sound:', error);
  });
};
