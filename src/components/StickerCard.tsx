import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Shuffle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { stickers } from '@/data/stickers'
import toast from 'react-hot-toast'

export default function StickerCard() {
  const [currentSticker, setCurrentSticker] = useState(0)
  const [isChanging, setIsChanging] = useState(false)

  // Auto-change sticker every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      showNewSticker();
    }, 10000); // 10 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const showNewSticker = () => {
    if (isChanging) return;
    
    setIsChanging(true);
    toast.success('✨ New sticker appeared!', {
      duration: 2000,
      position: 'bottom-center'
    });
    
    setTimeout(() => {
      let newSticker;
      do {
        newSticker = Math.floor(Math.random() * stickers.length);
      } while (newSticker === currentSticker && stickers.length > 1);
      
      setCurrentSticker(newSticker);
      setIsChanging(false);
    }, 200);
  }

  return (
    <Card 
      className="h-80 card-hover cursor-pointer relative overflow-hidden"
      onClick={showNewSticker}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-pink-100 opacity-50"></div>
      
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-2xl text-purple-600 flex items-center justify-center gap-2">
          <Sparkles className="w-6 h-6 animate-spin" />
          Cute Stickers
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col items-center justify-center h-full space-y-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSticker}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ 
              type: "spring",
              stiffness: 200,
              damping: 15
            }}
            className="text-center"
          >
            <div className="text-8xl mb-4 animate-bounce-in">
              {stickers[currentSticker].emoji}
            </div>
            <p className="text-lg font-medium text-gray-700">
              {stickers[currentSticker].name}
            </p>
          </motion.div>
        </AnimatePresence>

        <Button
          onClick={(e) => {
            e.stopPropagation()
            showNewSticker()
          }}
          disabled={isChanging}
          className="bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-full w-12 h-12 p-0 hover:scale-110 transition-transform"
        >
          <Shuffle className={`w-5 h-5 ${isChanging ? 'animate-spin' : ''}`} />
        </Button>
      </CardContent>
    </Card>
  )
}