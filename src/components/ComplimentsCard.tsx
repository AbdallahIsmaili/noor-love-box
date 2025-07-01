import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Heart } from 'lucide-react'

const ComplimentsCard = () => {
  const compliments = [
    { emoji: "🌟", text: "Your smile lights up my entire world" },
    { emoji: "💫", text: "You make every day feel like magic" },
    { emoji: "🦋", text: "You give me butterflies every time I see you" },
    { emoji: "🌈", text: "You're the rainbow after my storm" },
    { emoji: "✨", text: "Your laugh is my favorite sound" },
    { emoji: "🌙", text: "You're my wish upon a shooting star" },
    { emoji: "🌺", text: "Your kindness blooms beauty everywhere" },
    { emoji: "💎", text: "You're more precious than any treasure" },
    { emoji: "🎵", text: "Your voice is my favorite melody" },
    { emoji: "🔥", text: "Your passion inspires me every day" },
    { emoji: "☀️", text: "You’re the sunshine that brightens my day" },
    { emoji: "🍯", text: "You're sweeter than honey" },
    { emoji: "🧸", text: "You make me feel safe and loved like a warm hug" },
    { emoji: "🎇", text: "You light up my life like fireworks in the sky" },
    { emoji: "🌹", text: "You're more beautiful than a field of roses" },
    { emoji: "🫧", text: "Being with you feels like floating in a dream" },
    { emoji: "🫶", text: "Your love completes me in every way" },
    { emoji: "💖", text: "Your heart is the purest I've ever known" },
    { emoji: "🍓", text: "You're my favorite kind of sweet" },
    { emoji: "🎀", text: "You're the gift I never knew I needed" },
    { emoji: "📸", text: "Every moment with you is picture perfect" },
    { emoji: "🌌", text: "You're the galaxy in my universe" },
    { emoji: "🕊️", text: "You bring peace to my chaos" },
    { emoji: "🌻", text: "You radiate happiness like the sun" },
    { emoji: "💐", text: "You're a bouquet of everything I adore" },
    { emoji: "🧁", text: "You’re the cherry on top of my life" },
    { emoji: "🍒", text: "You're as rare and lovely as a perfect cherry blossom" },
    { emoji: "📖", text: "Every chapter of my life with you is beautiful" },
    { emoji: "🌷", text: "Your love blossoms endlessly" },
    { emoji: "🎶", text: "You're the harmony to my heart's song" },
    { emoji: "🪞", text: "In you, I see the reflection of everything I ever wanted" },
    { emoji: "🧲", text: "I'm drawn to you like a magnet" },
    { emoji: "💌", text: "You’re the love letter I never stop reading" },
    { emoji: "🍁", text: "You make every season feel like spring" },
    { emoji: "🌊", text: "Your love flows through me like the ocean's tide" },
    { emoji: "🪄", text: "You put a spell on my heart" },
    { emoji: "🦄", text: "You're more magical than any fairytale" },
    { emoji: "📎", text: "You hold my heart together" },
    { emoji: "🧠", text: "Your mind is just as beautiful as your soul" },
    { emoji: "🧡", text: "You color my world in warmth" },
    { emoji: "🍂", text: "Even in your silence, there's comfort" },
    { emoji: "🕰️", text: "Every second with you is timeless" },
    { emoji: "🏝️", text: "You're my paradise" },
    { emoji: "🚀", text: "You take my love to the stars and back" },
    { emoji: "🎠", text: "Loving you is like living in a dream" },
    { emoji: "🛏️", text: "You're the peace I crave after a long day" },
    { emoji: "💭", text: "You’re in my thoughts every moment" },
    { emoji: "🎁", text: "Every day with you is a present I treasure" },
    { emoji: "🧃", text: "You refresh my soul" },
    { emoji: "🕯️", text: "You light up even my darkest hours" },
    { emoji: "🧶", text: "You warm my heart like a cozy sweater" },
    { emoji: "🧜‍♀️", text: "You’re the magic I never believed was real" },
    { emoji: "🌬️", text: "You’re the whisper of love in the breeze" },
    { emoji: "🦢", text: "Your grace leaves me speechless" },
    { emoji: "🫖", text: "You're the calm in my stormy teacup" },
    { emoji: "💿", text: "You’re my favorite love song on repeat" },
    { emoji: "🎡", text: "Loving you is the most exciting ride of my life" },
    { emoji: "🥀", text: "Even in vulnerability, you’re beautiful" },
  ]


  const [currentCompliment, setCompliment] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)

  const generateCompliment = () => {
    if (isGenerating) return
    setIsGenerating(true)
    setTimeout(() => {
      setCompliment(Math.floor(Math.random() * compliments.length))
      setIsGenerating(false)
    }, 400)
  }

  return (
    <div 
      className="h-80 bg-white/95 backdrop-blur-12 border border-white/30 rounded-2xl shadow-xl cursor-pointer overflow-hidden group hover:scale-105 hover:shadow-2xl transition-all duration-300"
      onClick={generateCompliment}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-rose-100 to-pink-100 opacity-50"></div>
      
      <div className="relative p-6 h-full flex flex-col">
        <div className="text-center mb-4">
          <h3 className="text-2xl text-rose-600 flex items-center justify-center gap-2 font-bold">
            <Star className="w-6 h-6 animate-pulse" />
            Sweet Words
          </h3>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCompliment}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="text-center"
            >
              <div className="text-5xl mb-4">
                {compliments[currentCompliment].emoji}
              </div>
              <p className="text-gray-700 text-lg leading-relaxed font-medium px-2">
                {compliments[currentCompliment].text}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation()
              generateCompliment()
            }}
            disabled={isGenerating}
            className="bg-gradient-to-r from-rose-400 to-pink-400 text-white rounded-full w-12 h-12 flex items-center justify-center hover:scale-110 transition-transform"
          >
            <Heart className={`w-5 h-5 ${isGenerating ? 'animate-ping' : 'animate-pulse'}`} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ComplimentsCard