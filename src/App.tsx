import { useState, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import AuthPage from './components/AuthPage'
import MainPage from './components/MainPage'
import AskMePage from './components/AskMePage'
import FloatingHearts from './components/FloatingHearts'
import NotesPage from './components/NotesPage'
import FloatingMusicPlayer from './components/FloatingMusicPlayer'

function App() {
  const [userName, setUserName] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<'auth' | 'main' | 'ask' | 'notes'>('auth')
  const [isLoading, setIsLoading] = useState(true)
  const [showMusicPlayer, setShowMusicPlayer] = useState(false)

  useEffect(() => {
    // Remove localStorage for Claude.ai compatibility
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50">
        <div className="flex flex-col items-center space-y-6">
          <div className="relative">
            <div className="text-8xl animate-pulse">💖</div>
            <div className="absolute inset-0 text-8xl animate-ping opacity-30">💖</div>
          </div>
          <div className="text-4xl font-bold bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 bg-clip-text text-transparent animate-pulse">
            Loading Your Love...
          </div>
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    )
  }

  const handleAuth = (name: string) => {
    setUserName(name);
    setCurrentPage('main');
    // Show music player after login with a slight delay
    setTimeout(() => {
      setShowMusicPlayer(true);
    }, 1500); // Increased delay slightly for better UX
  };

  const handlePageChange = (page: 'main' | 'ask') => {
    setCurrentPage(page)
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-rose-50">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-0 right-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-rose-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <FloatingHearts count={20} />
      
      {/* Music Player - Only show after login */}
      {showMusicPlayer && currentPage !== 'auth' && (
        <FloatingMusicPlayer autoPlay={true} />
      )}
      
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 50%, #fbc2eb 100%)',
            color: 'white',
            borderRadius: '9999px',
            padding: '16px 24px',
            fontSize: '16px',
            fontWeight: '500',
            boxShadow: '0 20px 25px -5px rgba(255, 105, 180, 0.4), 0 10px 10px -5px rgba(255, 105, 180, 0.2)',
            maxWidth: '100%',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#ff69b4',
          },
          duration: 3000,
        }}
      />
      
      {currentPage === 'auth' && <AuthPage onAuth={handleAuth} />}
      {currentPage === 'main' && (
        <MainPage 
          userName={userName} 
          onNavigate={handlePageChange}
        />
      )}
      {currentPage === 'ask' && (
        <AskMePage 
          userName={userName}
          onBack={() => handlePageChange('main')}
        />
      )}
      {currentPage === 'notes' && (
        <NotesPage 
          userName={userName}
          onBack={() => handlePageChange('main')}
        />
      )}
    </div>
  )
}

export default App