import { motion } from 'framer-motion'
import { Heart, MessageCircle, Sparkles, PenTool, Notebook } from 'lucide-react'
import QuoteCard from './QuoteCard'
import StickerCard from './StickerCard'
import ConfettiButton from './ConfettiButton'
import MemoryLaneCard from './MemoryLaneCard'
import LoveCouponsCard from './LoveCouponsCard'
import ComplimentsCard from './ComplimentsCard'
import FortuneCookieCard from './FortuneCookieCard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { easeInOut } from 'framer-motion'

interface MainPageProps {
  userName: string
  onNavigate: (page: 'main' | 'ask' | 'notes') => void
}

// New Love Notes Card Component
function LoveNotesCard({ onNavigate }: { onNavigate: (page: 'notes') => void }) {
  return (
    <Card className="card-hover cursor-pointer h-full" onClick={() => onNavigate('notes')}>
      <CardHeader className="text-center pb-4">
        <div className="mx-auto mb-3 w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
          <motion.div
            animate={{ 
              rotate: [0, -10, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: easeInOut
            }}
          >
            <PenTool className="w-8 h-8 text-white" />
          </motion.div>
        </div>
        <CardTitle className="text-xl font-bold text-gray-800 flex items-center justify-center gap-2">
          <Notebook className="w-5 h-5 text-purple-500" />
          Love Notes
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-gray-600 mb-4 leading-relaxed">
          Write beautiful notes with rich formatting, emojis, and stickers! 
        </p>
        <div className="flex justify-center gap-2 mb-4">
          <span className="text-2xl animate-bounce">💌</span>
          <span className="text-2xl animate-bounce" style={{ animationDelay: '0.1s' }}>💕</span>
          <span className="text-2xl animate-bounce" style={{ animationDelay: '0.2s' }}>✨</span>
        </div>
      </CardContent>
    </Card>
  )
}

export default function MainPage({ userName, onNavigate }: MainPageProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  }

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15
      }
    }
  }

  return (
    <div className="min-h-screen relative">
      {/* Enhanced Background Grid */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-100/50 via-purple-100/50 to-rose-100/50"></div>
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgb(255, 182, 193)" strokeWidth="0.5" opacity="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 p-4 sm:p-6 lg:p-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-7xl mx-auto"
        >
          {/* Enhanced Header */}
          <motion.div
            variants={cardVariants}
            className="text-center mb-12 lg:mb-16"
          >
            <div className="relative inline-block">
              <motion.h1
                className="text-4xl sm:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 bg-clip-text text-transparent mb-4 tracking-tight"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: easeInOut
                }}
                style={{
                  backgroundSize: '200% 200%'
                }}
              >
                Welcome, {userName}! 
              </motion.h1>
              
              {/* Floating emojis around name */}
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute -top-4 -right-8 text-4xl"
              >
                🎉
              </motion.div>
              
              <motion.div
                animate={{ 
                  y: [-10, 10, -10],
                  rotate: [-5, 5, -5]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: easeInOut
                }}
                className="absolute -top-6 -left-8 text-3xl"
              >
                ✨
              </motion.div>
            </div>
            
            <motion.p
              variants={cardVariants}
              className="text-xl sm:text-2xl lg:text-3xl text-gray-700 font-medium max-w-3xl mx-auto leading-relaxed"
            >
              Your magical love box is ready! Each card holds a special surprise 
              <motion.span
                animate={{ 
                  scale: [1, 1.3, 1],
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: easeInOut
                }}
                className="inline-block ml-2"
              >
                💕
              </motion.span>
            </motion.p>
          </motion.div>

          {/* Enhanced Cards Grid - Now with 8 cards including Love Notes */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 lg:gap-8 mb-12 lg:mb-16"
          >
            {/* Love Notes Card - New and Featured */}
            <motion.div
              variants={cardVariants}
              whileHover={{ 
                scale: 1.05,
                rotate: 1,
                transition: { type: "spring", stiffness: 300 }
              }}
              className="relative"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-300 via-pink-300 to-rose-300 rounded-3xl blur-lg opacity-40"></div>
              <div className="relative">
                <LoveNotesCard onNavigate={onNavigate} />
              </div>
              {/* New badge */}
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg animate-pulse">
                NEW ✨
              </div>
            </motion.div>

            {/* Original Cards */}
            <motion.div
              variants={cardVariants}
              whileHover={{ 
                scale: 1.05,
                rotate: 1,
                transition: { type: "spring", stiffness: 300 }
              }}
              className="relative"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-pink-300 to-rose-300 rounded-3xl blur-lg opacity-30"></div>
              <div className="relative">
                <QuoteCard />
              </div>
            </motion.div>

            <motion.div
              variants={cardVariants}
              whileHover={{ 
                scale: 1.05,
                rotate: -1,
                transition: { type: "spring", stiffness: 300 }
              }}
              className="relative"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-300 to-pink-300 rounded-3xl blur-lg opacity-30"></div>
              <div className="relative">
                <StickerCard />
              </div>
            </motion.div>

            <motion.div
              variants={cardVariants}
              whileHover={{ 
                scale: 1.05,
                rotate: 0.5,
                transition: { type: "spring", stiffness: 300 }
              }}
              className="relative"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-3xl blur-lg opacity-30"></div>
              <div className="relative">
                <ConfettiButton />
              </div>
            </motion.div>

            <motion.div
              variants={cardVariants}
              whileHover={{ 
                scale: 1.05,
                rotate: -0.5,
                transition: { type: "spring", stiffness: 300 }
              }}
              className="relative"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-300 to-indigo-300 rounded-3xl blur-lg opacity-30"></div>
              <div className="relative">
                <MemoryLaneCard />
              </div>
            </motion.div>

            <motion.div
              variants={cardVariants}
              whileHover={{ 
                scale: 1.05,
                rotate: 1.5,
                transition: { type: "spring", stiffness: 300 }
              }}
              className="relative"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-amber-300 to-yellow-300 rounded-3xl blur-lg opacity-30"></div>
              <div className="relative">
                <LoveCouponsCard />
              </div>
            </motion.div>

            <motion.div
              variants={cardVariants}
              whileHover={{ 
                scale: 1.05,
                rotate: -1.5,
                transition: { type: "spring", stiffness: 300 }
              }}
              className="relative"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-rose-300 to-pink-300 rounded-3xl blur-lg opacity-30"></div>
              <div className="relative">
                <ComplimentsCard />
              </div>
            </motion.div>

            <motion.div
              variants={cardVariants}
              whileHover={{ 
                scale: 1.05,
                rotate: 0.8,
                transition: { type: "spring", stiffness: 300 }
              }}
              className="relative"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-orange-300 to-red-300 rounded-3xl blur-lg opacity-30"></div>
              <div className="relative">
                <FortuneCookieCard />
              </div>
            </motion.div>
          </motion.div>

          {/* Enhanced Ask Me Button */}
          <motion.div
            variants={cardVariants}
            className="text-center mb-32"
          >
            <motion.div
              whileHover={{ 
                scale: 1.05,
                y: -5,
              }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Button
                onClick={() => onNavigate('ask')}
                className="group relative bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 hover:from-pink-600 hover:via-rose-600 hover:to-purple-600 text-white text-xl sm:text-2xl px-8 sm:px-12 py-4 sm:py-6 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 border-0 overflow-hidden"
              >
                {/* Button background animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Button shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                <div className="relative flex items-center gap-3">
                  <motion.div
                    animate={{ 
                      rotate: [0, 15, -15, 0],
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      ease: easeInOut
                    }}
                  >
                    <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8" />
                  </motion.div>
                  
                  <span className="font-bold tracking-wide">
                    Ask Me Anything
                  </span>
                  
                  <motion.div
                    animate={{ 
                      scale: [1, 1.3, 1],
                      rotate: [0, 180, 360]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      ease: easeInOut
                    }}
                  >
                    <Sparkles className="w-5 h-5 sm:w-7 sm:h-7" />
                  </motion.div>
                </div>
              </Button>
            </motion.div>
          </motion.div>

          {/* Enhanced Floating Hearts Grid */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-pink-300/60"
                initial={{ 
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
                  y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 50,
                  scale: 0,
                  rotate: 0
                }}
                animate={{
                  y: -50,
                  scale: [0, 1, 0],
                  rotate: [0, 180, 360],
                  opacity: [0, 0.6, 0],
                }}
                transition={{
                  duration: 8 + Math.random() * 4,
                  delay: i * 1.5,
                  repeat: Infinity,
                  ease: easeInOut
                }}
              >
                <Heart className="w-4 h-4 sm:w-6 sm:h-6" fill="currentColor" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}