import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Sparkles, Stars } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import toast from 'react-hot-toast'
import { easeInOut } from 'framer-motion'

interface AuthPageProps {
  onAuth: (name: string) => void
}

export default function AuthPage({ onAuth }: AuthPageProps) {
  const [name, setName] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  // Allowed names (case insensitive)
  const allowedNames = ['noor', 'nour', 'bright', 'brightei', 'brightness']

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      toast.error('Please enter your beautiful name! 🌸', {
        position: 'top-center'
      })
      return
    }

    const normalizedName = name.trim().toLowerCase()
    
    if (!allowedNames.includes(normalizedName)) {
      toast.error('Sorry, this love box is reserved for someone special! 💕', {
        position: 'top-center'
      })
      return
    }

    setIsTyping(true)
    toast.success(`Welcome, ${name}! 💕`, {
      position: 'top-center',
    })
    
    setTimeout(() => {
      onAuth(name.trim())
    }, 1500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-20"
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              scale: 0 
            }}
            animate={{ 
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              delay: i * 0.5,
              repeat: Infinity,
              ease: easeInOut
            }}
          >
            <Stars className="w-6 h-6 text-pink-400" />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ 
          duration: 0.8, 
          ease: "easeOut",
          type: "spring",
          stiffness: 100
        }}
        className="max-w-md w-full relative z-10"
      >
        {/* Glass Card */}
        <div className="bg-white/20 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/30 relative overflow-hidden">
          {/* Card Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-100/50 via-purple-100/50 to-rose-100/50"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-8">
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: easeInOut
                }}
                className="inline-block mb-6 relative"
              >
                <Heart 
                  className="w-24 h-24 text-pink-500 mx-auto drop-shadow-lg" 
                  fill="#ff69b4" 
                />
                <motion.div
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: easeInOut
                  }}
                  className="absolute inset-0"
                >
                  <Heart 
                    className="w-24 h-24 text-pink-300 mx-auto" 
                    fill="transparent" 
                  />
                </motion.div>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-5xl font-bold bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 bg-clip-text text-transparent mb-3 tracking-tight"
              >
                Your Love Box
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-gray-600 text-lg font-medium"
              >
                A magical journey crafted with love ✨
              </motion.p>
            </div>

            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="space-y-6"
            >
              <div className="space-y-3">
                <motion.label 
                  className="text-lg font-semibold text-gray-700 flex items-center justify-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.4 }}
                >
                  <Sparkles className="w-5 h-5 text-pink-500" />
                  What's your beautiful name?
                  <Sparkles className="w-5 h-5 text-pink-500" />
                </motion.label>
                
                <div className="relative">
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name..."
                    className="text-lg p-6 bg-white/50 backdrop-blur-sm border-2 border-pink-200/50 focus:border-pink-400 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 focus:ring-4 focus:ring-pink-200/50 placeholder:text-gray-400"
                    disabled={isTyping}
                  />
                  <motion.div
                    animate={{
                      scale: name ? [1, 1.2, 1] : 1,
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2"
                  >
                    {name && <Heart className="w-5 h-5 text-pink-400" fill="#ff69b4" />}
                  </motion.div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1, duration: 0.4 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 hover:from-pink-600 hover:via-rose-600 hover:to-purple-600 text-white text-lg py-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 font-semibold tracking-wide border-0 relative overflow-hidden group"
                  disabled={isTyping || !name.trim()}
                >
                  {/* Button shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  {isTyping ? (
                    <div className="flex items-center gap-3">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Sparkles className="w-6 h-6" />
                      </motion.div>
                      Opening your magical box...
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <Heart className="w-6 h-6" fill="white" />
                      Enter My Love Box
                      <Sparkles className="w-6 h-6" />
                    </div>
                  )}
                </Button>
              </motion.div>
            </motion.form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.6 }}
              className="text-center mt-8"
            >
              <p className="text-sm text-gray-500 font-medium">
                Made with{' '}
                <motion.span
                  animate={{ 
                    scale: [1, 1.3, 1],
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    ease: easeInOut
                  }}
                  className="inline-block text-pink-500"
                >
                  💖
                </motion.span>
                {' '}especially for you
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}