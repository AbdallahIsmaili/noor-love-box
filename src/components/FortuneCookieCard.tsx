import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, Dice1 } from 'lucide-react'

const FortuneCookieCard = () => {
  const fortunes = [
    "Your love story will be legendary",
    "Adventure awaits around every corner",
    "Today brings a beautiful surprise",
    "Your smile will brighten someone's day",
    "Magic happens when hearts connect",
    "The best is yet to come in your journey",
    "Love multiplies when shared with others",
    "Your dreams are closer than you think",
    "Happiness is your natural state",
    "You are exactly where you need to be",
    "A heart full of love is never alone",
    "Something you've wished for is on its way",
    "You are the missing piece in someone's world",
    "Your kindness is a silent superpower",
    "Stars align when you believe in love",
    "You radiate joy wherever you go",
    "Someone thinks about you more than you know",
    "The universe has a sweet plan for you",
    "You are a magnet for miracles",
    "Love will guide you to beautiful places",
    "A tender moment is around the corner",
    "You glow differently when you're loved right",
    "The best version of you is already blossoming",
    "Your love can heal, inspire, and transform",
    "Every moment with you is someone's favorite memory",
    "A beautiful soul always finds its reflection",
    "You are someone's answered prayer",
    "The moon knows all your secret wishes",
    "Romance is waiting patiently for your smile",
    "Your touch leaves traces of light",
    "Love is not a destination, it's your aura",
    "Your voice is a melody that soothes hearts",
    "You make ordinary days feel like magic",
    "Your heart is a lighthouse to the lost",
    "You're about to receive a sign of deep affection",
    "Tiny acts of love will shape your destiny",
    "Something unexpected will warm your heart",
    "You are love in its purest form",
    "Every heartbeat brings you closer to your destiny",
    "Someone is falling for your soul"
  ]

  const [currentFortune, setCurrentFortune] = useState(0)
  const [isCracking, setIsCracking] = useState(false)
  const [showFortune, setShowFortune] = useState(false)

  // Get a random fortune that's different from the current one
  const getRandomFortune = (current: number) => {
    let newFortune
    do {
      newFortune = Math.floor(Math.random() * fortunes.length)
    } while (newFortune === current && fortunes.length > 1)
    return newFortune
  }

  // Show initial random fortune on mount
  useEffect(() => {
    setCurrentFortune(getRandomFortune(-1))
    setShowFortune(true)
    
    // Set up auto-change every 10 seconds
    const interval = setInterval(() => {
      crackCookie(false) // false means no animation
    }, 30000)
    
    return () => clearInterval(interval)
  }, [])

  const crackCookie = (animate = true) => {
    if (isCracking) return
    
    setIsCracking(animate)
    if (animate) setShowFortune(false)
    
    setTimeout(() => {
      setCurrentFortune(prev => getRandomFortune(prev))
      setShowFortune(true)
      setIsCracking(false)
    }, animate ? 800 : 0)
  }

  return (
    <div 
      className="h-80 bg-white/95 backdrop-blur-12 border border-white/30 rounded-2xl shadow-xl cursor-pointer overflow-hidden group hover:scale-105 hover:shadow-2xl transition-all duration-300"
      onClick={() => crackCookie(true)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-red-100 opacity-50"></div>
      
      <div className="relative p-6 h-full flex flex-col">
        <div className="text-center mb-4">
          <h3 className="text-2xl text-orange-600 flex items-center justify-center gap-2 font-bold">
            <Cookie className="w-6 h-6" />
            Fortune Cookie
          </h3>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            {!showFortune ? (
              <motion.div
                key="cookie"
                initial={{ scale: 1 }}
                animate={{ 
                  scale: isCracking ? [1, 1.1, 0.9, 1.2, 0] : 1,
                  rotate: isCracking ? [0, -5, 5, -10, 0] : 0
                }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <div className="text-8xl mb-4">
                  🥠
                </div>
                <p className="text-gray-600 text-sm">
                  {isCracking ? "Cracking..." : "Click to reveal your fortune"}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="fortune"
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="text-4xl mb-4">✨</div>
                <div className="bg-white/80 rounded-lg p-4 border border-orange-200">
                  <p className="text-gray-700 text-lg font-medium leading-relaxed">
                    "{fortunes[currentFortune]}"
                  </p>
                </div>
                <p className="text-orange-600 text-xs mt-2">
                  Your magical fortune 🔮
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation()
              crackCookie(true)
            }}
            disabled={isCracking}
            className="bg-gradient-to-r from-orange-400 to-red-400 text-white rounded-full w-12 h-12 flex items-center justify-center hover:scale-110 transition-transform"
          >
            <Dice1 className={`w-5 h-5 ${isCracking ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default FortuneCookieCard