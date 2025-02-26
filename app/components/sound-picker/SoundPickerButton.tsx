import { useState, useRef } from 'react'
import { useSettingsStore } from '@/app/lib/stores/settings.store'
import { FiMusic, FiUpload, FiLink, FiVolume2, FiPlay, FiCheck } from 'react-icons/fi'

// Define the sound options
const BUILT_IN_SOUNDS = [
  { id: 'beep', name: 'Beep', path: '/sounds/beep.mp3' },
  { id: 'bell', name: 'Bell', path: '/sounds/bell.mp3' },
  { id: 'chime', name: 'Chime', path: '/sounds/chime.mp3' },
  { id: 'ding', name: 'Ding', path: '/sounds/ding.mp3' },
  { id: 'gong', name: 'Gong', path: '/sounds/gong.mp3' },
]

export default function SoundPickerButton() {
  const { selectedSound, setSelectedSound, soundVolume } = useSettingsStore(state => ({
    selectedSound: state.selectedSound,
    setSelectedSound: state.setSelectedSound,
    soundVolume: state.soundVolume
  }))
  
  const [isOpen, setIsOpen] = useState(false)
  const [customSounds, setCustomSounds] = useState<Array<{ id: string, name: string, path: string }>>([])
  const [isAddingUrl, setIsAddingUrl] = useState(false)
  const [soundUrl, setSoundUrl] = useState('')
  const [soundName, setSoundName] = useState('')
  const [isPlaying, setIsPlaying] = useState<string | null>(null)
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Handle file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    try {
      // Generate a unique ID for the sound
      const soundId = `custom-${Date.now()}`
      
      // Store the file in cache storage
      const cache = await caches.open('timer-toolkit-sounds')
      const response = new Response(file)
      await cache.put(`/custom-sounds/${soundId}`, response)
      
      // Add to custom sounds list
      const newSound = {
        id: soundId,
        name: file.name.replace(/\.[^/.]+$/, ""), // Remove file extension
        path: `/custom-sounds/${soundId}`
      }
      
      setCustomSounds(prev => [...prev, newSound])
      setSelectedSound(soundId)
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } catch (error) {
      console.error('Error uploading sound:', error)
      alert('Failed to upload sound. Please try again.')
    }
  }

  // Handle URL sound addition
  const handleAddUrlSound = async () => {
    if (!soundUrl || !soundName) return
    
    try {
      // Validate URL (basic check)
      new URL(soundUrl)
      
      // Generate a unique ID for the sound
      const soundId = `url-${Date.now()}`
      
      // Try to fetch the sound to verify it exists
      const response = await fetch(soundUrl)
      if (!response.ok) throw new Error('Could not fetch sound from URL')
      
      // Store the URL in localStorage
      const urlSounds = JSON.parse(localStorage.getItem('timer-toolkit-url-sounds') || '{}')
      urlSounds[soundId] = {
        name: soundName,
        url: soundUrl
      }
      localStorage.setItem('timer-toolkit-url-sounds', JSON.stringify(urlSounds))
      
      // Add to custom sounds list
      const newSound = {
        id: soundId,
        name: soundName,
        path: soundUrl
      }
      
      setCustomSounds(prev => [...prev, newSound])
      setSelectedSound(soundId)
      
      // Reset form
      setSoundUrl('')
      setSoundName('')
      setIsAddingUrl(false)
    } catch (error) {
      console.error('Error adding URL sound:', error)
      alert('Invalid URL or sound could not be accessed. Please check the URL and try again.')
    }
  }

  // Load custom sounds from storage on component mount
  useState(() => {
    // Load URL sounds from localStorage
    try {
      const urlSounds = JSON.parse(localStorage.getItem('timer-toolkit-url-sounds') || '{}')
      const urlSoundsList = Object.entries(urlSounds).map(([id, data]: [string, any]) => ({
        id,
        name: data.name,
        path: data.url
      }))
      
      // Load file sounds from cache
      caches.open('timer-toolkit-sounds').then(cache => {
        cache.keys().then(keys => {
          const fileSoundPromises = keys.map(async key => {
            const id = key.url.split('/').pop() || ''
            return {
              id,
              name: id.replace('custom-', ''),
              path: key.url
            }
          })
          
          Promise.all(fileSoundPromises).then(fileSounds => {
            setCustomSounds([...urlSoundsList, ...fileSounds])
          })
        })
      })
    } catch (error) {
      console.error('Error loading custom sounds:', error)
    }
  }, [])

  // Play sound preview
  const playSound = (soundId: string, soundPath: string) => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.src = soundPath
      audioRef.current.volume = soundVolume
      audioRef.current.play()
      setIsPlaying(soundId)
      
      audioRef.current.onended = () => {
        setIsPlaying(null)
      }
    }
  }

  // Get the currently selected sound name
  const getSelectedSoundName = () => {
    const builtInSound = BUILT_IN_SOUNDS.find(s => s.id === selectedSound)
    if (builtInSound) return builtInSound.name
    
    const customSound = customSounds.find(s => s.id === selectedSound)
    if (customSound) return customSound.name
    
    return 'Select Sound'
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300"
      >
        <FiMusic className="text-blue-500 dark:text-blue-400" />
        <span className="text-gray-800 dark:text-gray-200">{getSelectedSoundName()}</span>
      </button>
      
      {isOpen && (
        <div className="absolute z-10 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">Select Sound</h3>
          
          {/* Built-in sounds */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Built-in</h4>
            <ul className="space-y-2">
              {BUILT_IN_SOUNDS.map(sound => (
                <li key={sound.id}>
                  <button
                    onClick={() => setSelectedSound(sound.id)}
                    className={`flex items-center justify-between w-full px-3 py-2 rounded-lg ${
                      selectedSound === sound.id 
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' 
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200'
                    }`}
                  >
                    <span>{sound.name}</span>
                    <div className="flex items-center">
                      {selectedSound === sound.id && (
                        <FiCheck className="mr-2 text-blue-500 dark:text-blue-400" />
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          playSound(sound.id, sound.path)
                        }}
                        className={`p-1 rounded-full ${
                          isPlaying === sound.id 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <FiPlay size={14} />
                      </button>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Custom sounds */}
          {customSounds.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Custom</h4>
              <ul className="space-y-2">
                {customSounds.map(sound => (
                  <li key={sound.id}>
                    <button
                      onClick={() => setSelectedSound(sound.id)}
                      className={`flex items-center justify-between w-full px-3 py-2 rounded-lg ${
                        selectedSound === sound.id 
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' 
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200'
                      }`}
                    >
                      <span>{sound.name}</span>
                      <div className="flex items-center">
                        {selectedSound === sound.id && (
                          <FiCheck className="mr-2 text-blue-500 dark:text-blue-400" />
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            playSound(sound.id, sound.path)
                          }}
                          className={`p-1 rounded-full ${
                            isPlaying === sound.id 
                              ? 'bg-blue-500 text-white' 
                              : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          <FiPlay size={14} />
                        </button>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Add custom sound options */}
          <div className="space-y-2">
            {isAddingUrl ? (
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="mb-2">
                  <input
                    type="text"
                    placeholder="Sound name"
                    value={soundName}
                    onChange={(e) => setSoundName(e.target.value)}
                    className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                  />
                </div>
                <div className="mb-2">
                  <input
                    type="url"
                    placeholder="Sound URL"
                    value={soundUrl}
                    onChange={(e) => setSoundUrl(e.target.value)}
                    className="w-full p-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setIsAddingUrl(false)}
                    className="px-3 py-1 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddUrlSound}
                    className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    disabled={!soundUrl || !soundName}
                  >
                    Add
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center justify-center gap-1 flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <FiUpload size={14} />
                  <span>Upload</span>
                </button>
                <button
                  onClick={() => setIsAddingUrl(true)}
                  className="flex items-center justify-center gap-1 flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <FiLink size={14} />
                  <span>Add URL</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="audio/*"
        className="hidden"
      />
      
      {/* Hidden audio element for previews */}
      <audio ref={audioRef} className="hidden" />
    </div>
  )
}