import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { useMemo } from 'react'
import { easeInOut } from 'framer-motion'

const colors = ['#ff69b4', '#ff1493', '#ffb6c1', '#ffc0cb', '#dda0dd']

interface FloatingHeartsProps {
  count?: number
}

export default function FloatingHearts({ count = 20 }: FloatingHeartsProps) {
  const hearts = useMemo(() => (
    [...Array(count)].map((_, i) => {
      const size = Math.random() * 20 + 16
      const duration = Math.random() * 10 + 8
      const delay = Math.random() * 5
      const left = Math.random() * 100
      const color = colors[Math.floor(Math.random() * colors.length)]
      const xDrift = Math.random() * 40 - 20
      const rotation = Math.random() > 0.5 ? 360 : -360

      return {
        key: i,
        style: {
          left: `${left}vw`,
          fontSize: `${size}px`,
          color,
        },
        animation: {
          opacity: [0, 1, 0],
          y: ['100vh', '-10vh'],
          x: [`${left}vw`, `${left + xDrift}vw`],
          rotate: [0, rotation],
          scale: [1, 1.2, 1],
        },
        transition: {
          duration,
          delay,
          repeat: Infinity,
          ease: easeInOut
        }
      }
    })
  ), [count])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {hearts.map(({ key, style, animation, transition }) => (
        <motion.div
          key={key}
          initial={{ opacity: 0 }}
          animate={animation}
          transition={transition}
          style={{
            position: 'absolute',
            ...style,
            filter: 'drop-shadow(0 0 6px rgba(255, 105, 180, 0.5))',
          }}
        >
          {/* Rotate heart so the point is upward */}
          <Heart 
            className="w-full h-full rotate-180 animate-spin-slow" 
            fill={style.color} 
          />
        </motion.div>
      ))}
    </div>
  )
}
