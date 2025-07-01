import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Send, MessageCircle, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import toast from 'react-hot-toast'
import { getSmartResponse } from '@/data/responses'

interface AskMePageProps {
  userName: string
  onBack: () => void
}

export default function AskMePage({ userName, onBack }: AskMePageProps) {
  const [question, setQuestion] = useState('')
  const [currentResponse, setCurrentResponse] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showResponse, setShowResponse] = useState(false)

  const getResponse = (question: string): string => {
    return getSmartResponse(question) 
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!question.trim()) {
      toast.error('Please ask me something! 💕')
      return
    }

    setIsTyping(true)
    setShowResponse(false)
    toast.success('Let me think about that... 🤔')

    setTimeout(() => {
      const response = getResponse(question)
      setCurrentResponse(response.replace('{name}', userName))
      setIsTyping(false)
      
      setTimeout(() => {
        setShowResponse(true)
      }, 500)
    }, 2000)
  }

  const handleBackClick = () => {
    onBack()
  }

  return (
    <div className="min-h-screen p-4 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto relative z-10"
      >
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            onClick={handleBackClick}
            variant="outline"
            className="rounded-full p-3 hover:scale-105 transition-transform bg-white/80 backdrop-blur-sm border-2 border-pink-200 hover:border-pink-400 hover:bg-white/90 focus:ring-4 focus:ring-pink-200/50"
          >
            <ArrowLeft className="w-5 h-5 text-pink-600" />
          </Button>
          <h1 className="text-3xl font-bold romantic-gradient bg-clip-text text-transparent font-handwriting">
            Ask Me Anything, {userName} 💭
          </h1>
        </div>

        {/* Question Form */}
        <Card className="mb-8 bg-white/90 backdrop-blur-sm border-2 border-pink-200/50 shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl text-center text-pink-600 flex items-center justify-center gap-2">
              <MessageCircle className="w-6 h-6" />
              What's on your mind?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Input
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Type your question here..."
                  className="text-lg p-4 border-2 border-pink-200 focus:border-pink-400 rounded-xl bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all duration-300 focus:ring-4 focus:ring-pink-200/50 relative z-20"
                  disabled={isTyping}
                  style={{ 
                    position: 'relative',
                    zIndex: 20,
                    pointerEvents: 'auto'
                  }}
                />
              </div>
              <Button
                type="submit"
                className="w-full romantic-gradient text-white text-lg py-3 rounded-xl hover:scale-105 transition-transform shadow-lg hover:shadow-xl"
                disabled={isTyping || !question.trim()}
              >
                {isTyping ? (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    Thinking...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="w-5 h-5" />
                    Ask Me
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Response */}
        <AnimatePresence>
          {currentResponse && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="relative overflow-hidden bg-white/90 backdrop-blur-sm border-2 border-pink-200/50 shadow-xl">
                <div className="absolute inset-0 romantic-gradient opacity-10"></div>
                <CardContent className="p-8 relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <Heart className="w-6 h-6 text-pink-500 animate-heart-beat" />
                    <span className="text-lg font-semibold text-pink-600">My Answer:</span>
                  </div>
                  
                  <AnimatePresence>
                    {showResponse && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="text-xl font-handwriting text-gray-700 leading-relaxed"
                      >
                        {currentResponse}
                      </motion.p>
                    )}
                  </AnimatePresence>
                  
                  {!showResponse && currentResponse && (
                    <div className="flex items-center gap-2 text-gray-500">
                      <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <span className="ml-2">Writing response...</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}