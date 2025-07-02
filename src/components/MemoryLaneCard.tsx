import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, RotateCcw, CalendarPlus } from 'lucide-react'

const MemoryLaneCard = () => {
  const memories = [
    // Past memories
    { emoji: "🌟", title: "First Meeting", description: "The day our story will in real life began", date: "A magical moment", future: false },
    { emoji: "☕", title: "Coffee Date", description: "Talking for hours without realizing", date: "Lost in conversation", future: false },
    { emoji: "🎬", title: "Movie Night", description: "Cuddled up watching our favorite film", date: "Perfect evening", future: false },
    { emoji: "🌅", title: "Sunrise Together", description: "Watching the world wake up", date: "Golden hour magic", future: false },
    
    // Future memories (plans)
    { emoji: "✈️", title: "European Adventure", description: "Exploring cobblestone streets together", date: "Coming Summer 2030", future: true },
    { emoji: "🏡", title: "Our First Home", description: "Building a space filled with love", date: "Future dreams", future: true },
    { emoji: "🐶", title: "Adopt a Pet", description: "Welcoming a furry friend to our family", date: "Planned for next two years", future: true },
    { emoji: "🌊", title: "Learn to Surf", description: "Riding waves together in Bali", date: "Bucket list item", future: true },
    { emoji: "🎭", title: "Broadway Show", description: "Dressing up for a night in NYC", date: "2029's anniversary trip", future: true },
    { emoji: "🍷", title: "Wine Tasting", description: "Exploring vineyards in Napa Valley", date: "Romantic getaway", future: true },
    { emoji: "🌌", title: "Northern Lights", description: "Watching auroras dance above us", date: "Winter 2028 plan", future: true },
    { emoji: "📚", title: "Write Our Story", description: "Creating a book of our adventures", date: "Ongoing project", future: true },
    { emoji: "🎸", title: "Music Festival", description: "Dancing under the stars together", date: "2029 summer's plan", future: true },
    { emoji: "🚗", title: "Cross-Country Roadtrip", description: "Seeing America's hidden gems", date: "Planned adventure", future: true },
    { emoji: "🎂", title: "Milestone Birthday", description: "Celebrating your special decade", date: "Future celebration", future: true },
    { emoji: "🌴", title: "Tropical Escape", description: "Beachside hammock mornings", date: "2028 winter getaway", future: true },
    { emoji: "🎄", title: "Christmas Traditions", description: "Starting our own holiday customs", date: "Future memories", future: true },
    { emoji: "👶", title: "Start a Family", description: "The next chapter of our love", date: "Someday soon", future: true },
    { emoji: "🚤", title: "Sailing Weekend", description: "Learning to sail together", date: "2029 summer's challenge", future: true },
    { emoji: "🎨", title: "Art Retreat", description: "Painting landscapes in Tuscany", date: "Creative getaway", future: true },
  ]

  const [currentMemory, setCurrentMemory] = useState(
    Math.floor(Math.random() * memories.length)
  )
  const [isFlipping, setIsFlipping] = useState(false)

  const getRandomMemory = (current: number) => {
    let newMemory
    do {
      newMemory = Math.floor(Math.random() * memories.length)
    } while (newMemory === current && memories.length > 1)
    return newMemory
  }

  const nextMemory = () => {
    if (isFlipping) return
    setIsFlipping(true)
    setTimeout(() => {
      setCurrentMemory(prev => getRandomMemory(prev))
      setIsFlipping(false)
    }, 300)
  }

  return (
    <div 
      className="h-80 bg-white/95 backdrop-blur-12 border border-white/30 rounded-2xl shadow-xl cursor-pointer overflow-hidden group hover:scale-105 hover:shadow-2xl transition-all duration-300"
      onClick={nextMemory}
    >
      <div className={`absolute inset-0 opacity-50 ${memories[currentMemory].future ? 'bg-gradient-to-br from-purple-100 to-pink-100' : 'bg-gradient-to-br from-blue-100 to-indigo-100'}`}></div>
      
      <div className="relative p-6 h-full flex flex-col">
        <div className="text-center mb-4">
          <h3 className="text-2xl text-indigo-600 flex items-center justify-center gap-2 font-bold">
            {memories[currentMemory].future ? <CalendarPlus className="w-6 h-6" /> : <Camera className="w-6 h-6" />}
            {memories[currentMemory].future ? "Future Plans" : "Memory Lane"}
          </h3>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMemory}
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <div className="text-6xl mb-4">
                {memories[currentMemory].emoji}
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                {memories[currentMemory].title}
              </h4>
              <p className="text-gray-600 mb-2 text-sm">
                {memories[currentMemory].description}
              </p>
              <p className={`text-xs font-medium ${memories[currentMemory].future ? 'text-pink-500' : 'text-indigo-500'}`}>
                {memories[currentMemory].date}
                {memories[currentMemory].future && <span className="ml-1">✨</span>}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation()
              nextMemory()
            }}
            disabled={isFlipping}
            className={`rounded-full w-12 h-12 flex items-center justify-center hover:scale-110 transition-transform ${memories[currentMemory].future ? 'bg-gradient-to-r from-purple-400 to-pink-400' : 'bg-gradient-to-r from-blue-400 to-indigo-400'}`}
          >
            <RotateCcw className={`w-5 h-5 text-white ${isFlipping ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default MemoryLaneCard