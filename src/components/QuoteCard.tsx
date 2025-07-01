import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, RotateCcw } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { quotes } from '@/data/quotes'
import toast from 'react-hot-toast'

export default function QuoteCard() {
  const [currentQuote, setCurrentQuote] = useState(0)
  const [isFlipping, setIsFlipping] = useState(false)

  // Set random quote on first load
  useEffect(() => {
    setRandomQuote()
  }, [])

  // Auto-change quote every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setRandomQuote()
    }, 10000)
    
    return () => clearInterval(interval)
  }, [])

  const setRandomQuote = () => {
    setIsFlipping(true)
    setTimeout(() => {
      setCurrentQuote(prev => {
        let newQuote
        do {
          newQuote = Math.floor(Math.random() * quotes.length)
        } while (newQuote === prev && quotes.length > 1)
        return newQuote
      })
      setIsFlipping(false)
    }, 300)
  }

  const nextQuote = () => {
    if (isFlipping) return
    
    setIsFlipping(true)
    toast.success('💕 A new love note for you!')
    
    setTimeout(() => {
      setCurrentQuote(prev => (prev + 1) % quotes.length)
      setIsFlipping(false)
    }, 300)
  }

  return (
    <Card 
      className="h-80 card-hover cursor-pointer relative overflow-hidden"
      onClick={nextQuote}
    >
      <div className="absolute inset-0 romantic-gradient opacity-10"></div>
      
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-2xl text-pink-600 flex items-center justify-center gap-2">
          <Heart className="w-6 h-6 animate-heart-beat" />
          Love Notes
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col items-center justify-center h-full space-y-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuote}
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center px-4"
          >
            <p className="text-lg font-handwriting text-gray-700 leading-relaxed mb-4">
              "{quotes[currentQuote].text}"
            </p>
            <p className="text-sm text-pink-500 font-medium">
              {quotes[currentQuote].author}
            </p>
          </motion.div>
        </AnimatePresence>

        <Button
          onClick={(e) => {
            e.stopPropagation()
            nextQuote()
          }}
          disabled={isFlipping}
          className="romantic-gradient text-white rounded-full w-12 h-12 p-0 hover:scale-110 transition-transform"
        >
          <RotateCcw className={`w-5 h-5 ${isFlipping ? 'animate-spin' : ''}`} />
        </Button>
      </CardContent>
    </Card>
  )
}