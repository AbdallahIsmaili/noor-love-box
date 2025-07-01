import { useState } from 'react'
import { motion } from 'framer-motion'
import { PartyPopper, Cake } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import confetti from 'canvas-confetti'
import toast from 'react-hot-toast'

export default function ConfettiButton() {
  const [isPartyPopper, setIsPartyPopper] = useState(false)

  const triggerConfetti = () => {
    if (isPartyPopper) return
    
    setIsPartyPopper(true)
    toast.success('🎉 Party time!')

    // Multiple confetti bursts
    const duration = 3000
    const end = Date.now() + duration

    const colors = ['#ff69b4', '#ff1493', '#ffc0cb', '#dda0dd', '#9370db']

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      })
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }
    frame()

    // Heart confetti
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: colors,
        shapes: ['circle']
      })
    }, 500)

    setTimeout(() => {
      setIsPartyPopper(false)
    }, 3000)
  }

  return (
    <Card 
      className="h-80 card-hover cursor-pointer relative overflow-hidden"
      onClick={triggerConfetti}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 to-orange-100 opacity-50"></div>
      
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-2xl text-orange-600 flex items-center justify-center gap-2">
          <Cake className="w-6 h-6" />
          Birthday Magic
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col items-center justify-center h-full space-y-6">
        <motion.div
          animate={isPartyPopper ? { 
            rotate: [0, 15, -15, 0],
            scale: [1, 1.2, 1]
          } : {}}
          transition={{ duration: 0.5, repeat: isPartyPopper ? 3 : 0 }}
          className="text-center"
        >
          <div className="text-8xl mb-4">
            🎂
          </div>
          <p className="text-lg font-medium text-gray-700 mb-2">
            Ready for some magic?
          </p>
          <p className="text-sm text-gray-500">
            Click to celebrate! 🎊
          </p>
        </motion.div>

        <Button
          onClick={(e) => {
            e.stopPropagation()
            triggerConfetti()
          }}
          disabled={isPartyPopper}
          className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-full px-8 py-3 hover:scale-110 transition-transform text-lg font-semibold"
        >
          {isPartyPopper ? (
            <div className="flex items-center gap-2">
              <PartyPopper className="w-5 h-5 animate-spin" />
              Celebrating!
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <PartyPopper className="w-5 h-5" />
              Let's Party!
            </div>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}