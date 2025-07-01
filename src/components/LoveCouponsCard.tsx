import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Gift } from 'lucide-react'

const LoveCouponsCard = () => {
  const coupons = [
    { emoji: "🫂", title: "Free Hug", description: "Redeemable anytime, anywhere" },
    { emoji: "🍿", title: "Movie Choice", description: "You pick what we watch tonight" },
    { emoji: "💆", title: "Back Massage", description: "15 minutes of pure relaxation" },
    { emoji: "🍳", title: "Breakfast in Bed", description: "Wake up to your favorites" },
    { emoji: "🎮", title: "Game Night", description: "Your choice of games" },
    { emoji: "🧹", title: "Chore Free Day", description: "Relax while I handle everything" },
    { emoji: "🚗", title: "Adventure Drive", description: "Wherever you want to go" },
    { emoji: "🎁", title: "Surprise Gift", description: "Something special just for you" },
    { emoji: "🍣", title: "Sushi Night", description: "Your favorite rolls on me" },
    { emoji: "🛌", title: "Sleep In", description: "I'll handle the morning routine" },
    { emoji: "📚", title: "Quiet Time", description: "Uninterrupted reading for 2 hours" },
    { emoji: "🍦", title: "Dessert Date", description: "Ice cream shop of your choice" },
    { emoji: "💐", title: "Flower Delivery", description: "Fresh blooms just because" },
    { emoji: "🎨", title: "Art Session", description: "Let's paint/draw together" },
    { emoji: "🛍️", title: "Shopping Spree", description: "I'll carry all the bags" },
    { emoji: "🍕", title: "Pizza Night", description: "Your toppings, no complaints" },
    { emoji: "🛀", title: "Bubble Bath", description: "Candles, music, and relaxation" },
    { emoji: "📸", title: "Photo Shoot", description: "I'll be your photographer" },
    { emoji: "🎤", title: "Karaoke Night", description: "Duets or solo performances" },
    { emoji: "🌮", title: "Taco Tuesday", description: "Any toppings you desire" },
    { emoji: "☕", title: "Coffee Date", description: "Your favorite café, my treat" },
    { emoji: "🧘", title: "Yoga Partner", description: "I'll join your practice" },
    { emoji: "🎲", title: "Board Game", description: "Your choice, no veto power" },
    { emoji: "🌄", title: "Sunrise Date", description: "Early morning adventure" },
    { emoji: "🍫", title: "Chocolate Box", description: "Assorted favorites just for you" },
    { emoji: "📝", title: "Love Letter", description: "Handwritten note from my heart" },
    { emoji: "🎧", title: "Playlist Swap", description: "I'll listen to your favorites" },
    { emoji: "🛋️", title: "Cuddle Time", description: "No phones, just us" },
    { emoji: "🌙", title: "Stargazing", description: "Blanket and hot chocolate included" },
    { emoji: "🧺", title: "Picnic Date", description: "Your favorite foods in the park" },
    { emoji: "🎭", title: "Theater Night", description: "Play or musical of your choice" },
    { emoji: "🍰", title: "Bake Together", description: "Your favorite dessert" },
    { emoji: "🚲", title: "Bike Ride", description: "Scenic route of your choosing" },
    { emoji: "📖", title: "Bedtime Story", description: "I'll read to you tonight" },
    { emoji: "🎶", title: "Dance Party", description: "Just us and our favorite songs" },
    { emoji: "🧩", title: "Puzzle Night", description: "Your choice of puzzle" },
    { emoji: "🏕️", title: "Living Room Campout", description: "Blanket fort and snacks" },
    { emoji: "✈️", title: "Dream Vacation", description: "Plan our next adventure together" }
  ]

  const [currentCoupon, setCoupon] = useState(
    Math.floor(Math.random() * coupons.length)
  )
  const [isRevealing, setIsRevealing] = useState(false)

  const getRandomCoupon = (current) => {
    let newCoupon
    do {
      newCoupon = Math.floor(Math.random() * coupons.length)
    } while (newCoupon === current && coupons.length > 1)
    return newCoupon
  }

  const revealCoupon = () => {
    if (isRevealing) return
    setIsRevealing(true)
    setTimeout(() => {
      setCoupon(prev => getRandomCoupon(prev))
      setIsRevealing(false)
    }, 300)
  }

  return (
    <div 
      className="h-80 bg-white/95 backdrop-blur-12 border border-white/30 rounded-2xl shadow-xl cursor-pointer overflow-hidden group hover:scale-105 hover:shadow-2xl transition-all duration-300"
      onClick={revealCoupon}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-yellow-100 opacity-50"></div>
      
      <div className="relative p-6 h-full flex flex-col">
        <div className="text-center mb-4">
          <h3 className="text-2xl text-amber-600 flex items-center justify-center gap-2 font-bold">
            <Gift className="w-6 h-6" />
            Love Coupons
          </h3>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCoupon}
              initial={{ y: 50, opacity: 0, rotateX: 90 }}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              exit={{ y: -50, opacity: 0, rotateX: -90 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <div className="bg-white/80 rounded-lg p-4 border-2 border-dashed border-amber-300 mb-4">
                <div className="text-4xl mb-2">
                  {coupons[currentCoupon].emoji}
                </div>
                <h4 className="text-lg font-bold text-gray-800 mb-1">
                  {coupons[currentCoupon].title}
                </h4>
                <p className="text-gray-600 text-sm">
                  {coupons[currentCoupon].description}
                </p>
              </div>
              <p className="text-amber-600 text-xs font-medium">
                Valid for one special moment ✨
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation()
              revealCoupon()
            }}
            disabled={isRevealing}
            className="bg-gradient-to-r from-amber-400 to-yellow-400 text-white rounded-full w-12 h-12 flex items-center justify-center hover:scale-110 transition-transform"
          >
            <Gift className={`w-5 h-5 ${isRevealing ? 'animate-bounce' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoveCouponsCard