import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen p-6 pb-20">
      <main className="w-full max-w-[1200px] flex flex-col items-center gap-12 mt-12 mb-16">
        {/* Header */}
        <div className="text-center max-w-[800px]">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">TimerToolkit</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-[600px] mx-auto">
            A versatile collection of timers for your workout needs
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-8">
          <Link 
            href="/random-timer" 
            className="flex flex-col items-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700"
          >
            <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600 dark:text-blue-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mb-3">Random Timer</h2>
            <p className="text-center text-gray-600 dark:text-gray-300">
              Unpredictable intervals to keep your workouts fresh and challenging
            </p>
          </Link>

          <Link 
            href="/standard-timer" 
            className="flex flex-col items-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700"
          >
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600 dark:text-green-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mb-3">Standard Timer</h2>
            <p className="text-center text-gray-600 dark:text-gray-300">
              Simple countdown timer for focused training sessions
            </p>
          </Link>

          <Link 
            href="/tabata-timer" 
            className="flex flex-col items-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700"
          >
            <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-600 dark:text-purple-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mb-3">Tabata Timer</h2>
            <p className="text-center text-gray-600 dark:text-gray-300">
              High-intensity interval training with work and rest phases
            </p>
          </Link>
        </div>

        {/* App Features */}
        <div className="w-full mt-12 px-4">
          <h2 className="text-3xl font-semibold mb-8 text-center">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 dark:text-blue-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-medium text-lg mb-2 text-center">Customizable Timers</h3>
              <p className="text-center text-gray-600 dark:text-gray-300">
                Adjust durations, rounds, and intervals to match your workout needs
              </p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600 dark:text-green-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                </svg>
              </div>
              <h3 className="font-medium text-lg mb-2 text-center">Smart Notifications</h3>
              <p className="text-center text-gray-600 dark:text-gray-300">
                Stay on track with audio alerts and visual cues
              </p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
              <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600 dark:text-purple-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
                </svg>
              </div>
              <h3 className="font-medium text-lg mb-2 text-center">Customizable Themes</h3>
              <p className="text-center text-gray-600 dark:text-gray-300">
                Personalize your experience with light and dark modes
              </p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
              <div className="bg-amber-100 dark:bg-amber-900 p-3 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-600 dark:text-amber-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </svg>
              </div>
              <h3 className="font-medium text-lg mb-2 text-center">Progress Tracking</h3>
              <p className="text-center text-gray-600 dark:text-gray-300">
                Visual progress indicators to monitor your workout status
              </p>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="w-full mt-12 px-4">
          <h2 className="text-3xl font-semibold mb-8 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">1</div>
              <h3 className="text-xl font-medium mb-2 text-center">Choose Your Timer</h3>
              <p className="text-center text-gray-600 dark:text-gray-300">
                Select from Random, Standard, or Tabata timers based on your workout style
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">2</div>
              <h3 className="text-xl font-medium mb-2 text-center">Customize Settings</h3>
              <p className="text-center text-gray-600 dark:text-gray-300">
                Adjust durations, rounds, and other parameters to fit your needs
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">3</div>
              <h3 className="text-xl font-medium mb-2 text-center">Start Your Workout</h3>
              <p className="text-center text-gray-600 dark:text-gray-300">
                Press play and focus on your exercise while the timer keeps track
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="w-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-10 text-white text-center mt-12">
          <h2 className="text-3xl font-bold mb-4">Ready to start your workout?</h2>
          <p className="text-xl mb-8 max-w-[600px] mx-auto">Choose a timer and get started right away!</p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link 
              href="/random-timer" 
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors text-lg shadow-lg"
            >
              Try Random Timer
            </Link>
            <Link 
              href="/standard-timer" 
              className="bg-transparent border-2 border-white px-8 py-3 rounded-full font-medium hover:bg-white/10 transition-colors text-lg"
            >
              Try Standard Timer
            </Link>
          </div>
        </div>
      </main>

      {/* PWA Install Prompt - Can be implemented later */}
      <div className="fixed bottom-20 left-0 right-0 flex justify-center pointer-events-none opacity-0">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex items-center gap-4 pointer-events-auto">
          <div>
            <p className="font-medium">Install TimerToolkit</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">Add to your home screen for quick access</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            Install
          </button>
        </div>
      </div>
    </div>
  );
}
