"use client"

import { useState, useEffect, useRef } from "react"
import { Terminal, Eye, Skull, Shield } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

interface HackerCharacterProps {
  theme?: "dark" | "light"
}

export function HackerCharacter({ theme = "dark" }: HackerCharacterProps) {
  const [currentMessage, setCurrentMessage] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [displayedText, setDisplayedText] = useState("")
  const [showMessage, setShowMessage] = useState(true)
  const characterRef = useRef<HTMLDivElement>(null)

  const messages = [
    "Hmm... you're looking at my portfolio? 👀",
    "Nice cybersecurity skills you got there! ",
    "I see you scrolling... I'm watching 👁️",
    "Click me if you dare! 💀",
    "Analyzing your browsing patterns... 📊",
    "Security level: MAXIMUM 🛡️",
    "Want to see something cool? Click me! ",
    "I'm not just a decoration, you know! 🤖",
    "Your IP has been... just kidding! 😄",
    "Ready for a surprise? Click here! 🎯",
  ]

  // Responsive initial position for HackerCharacter
  const [initialPosition, setInitialPosition] = useState({ x: 92, y: 12 })

  useEffect(() => {
    const getSafeZones = () => {
      const isMobile = window.innerWidth <= 768
      return isMobile
        ? [
            { x: 82, y: 12 }, // Top-Right
            { x: 18, y: 12 }, // Top-Left
            { x: 82, y: 85 }, // Bottom-Right
            { x: 18, y: 85 }, // Bottom-Left
          ]
        : [
            { x: 92, y: 12 }, // Top-Right
            { x: 8, y: 12 },  // Top-Left
            { x: 92, y: 85 }, // Bottom-Right
            { x: 8, y: 85 },  // Bottom-Left
          ]
    }

    // Set initial position
    setInitialPosition(getSafeZones()[0])

    const handleResize = () => {
      setInitialPosition(getSafeZones()[0])
    }

    // Move character periodically to a random new safe zone
    const movementInterval = setInterval(() => {
      const zones = getSafeZones()
      setInitialPosition((prev) => {
        const potentialZones = zones.filter((z) => z.x !== prev.x || z.y !== prev.y)
        const randomZone = potentialZones[Math.floor(Math.random() * potentialZones.length)]
        return randomZone || prev
      })
    }, 12000)

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
      clearInterval(movementInterval)
    }
  }, [])

  const safeZones = [
    initialPosition, // Initial position (responsive)
    { x: 82, y: 40 },
    { x: 80, y: 60 },
    { x: 83, y: 80 },
  ];

  const themeClasses = {
    characterBg: "bg-[#050505] border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]",
    messageBg: "bg-[#050505]/95 border border-emerald-500/20",
    messageText: "text-emerald-400",
    glowEffect: "shadow-emerald-500/60",
  }

  // Typewriter effect
  useEffect(() => {
    if (!showMessage) return

    const message = messages[currentMessage]
    setIsTyping(true)
    setDisplayedText("")

    let index = 0
    const typeInterval = setInterval(() => {
      if (index < message.length) {
        setDisplayedText(message.slice(0, index + 1))
        index++
      } else {
        setIsTyping(false)
        clearInterval(typeInterval)

        setTimeout(() => {
          setShowMessage(false)
          setTimeout(() => {
            setCurrentMessage((prev) => (prev + 1) % messages.length)
            setShowMessage(true)
          }, 1000)
        }, 4000)
      }
    }, 50)

    return () => clearInterval(typeInterval)
  }, [currentMessage, showMessage])

  const characterVariants = {
    initial: { opacity: 0, scale: 0.5 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
    float: (i: number) => ({
      x: [0, 5 * (i % 2 === 0 ? 1 : -1), 0],
      y: [0, 5 * (i % 2 === 0 ? -1 : 1), 0],
      transition: { repeat: Number.POSITIVE_INFINITY, duration: 5, ease: "easeInOut" },
    }),
  }

  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.2, ease: "easeIn" } },
  }

  return (
    <motion.div
      ref={characterRef}
      className="fixed z-50 pointer-events-none"
      initial={{ opacity: 0, scale: 0.5, left: `${initialPosition.x}%`, top: `${initialPosition.y}%` }}
      animate={{
        opacity: 1,
        scale: 1,
        left: `${initialPosition.x}%`,
        top: `${initialPosition.y}%`,
      }}
      transition={{
        left: { type: "spring", stiffness: 60, damping: 15 },
        top: { type: "spring", stiffness: 60, damping: 15 },
        scale: { duration: 0.3 },
        opacity: { duration: 0.3 },
      }}
      style={{
        transform: "translate(-50%, -50%)",
      }}
    >
      {/* Character */}
      <Link href="/pwned" className="pointer-events-auto">
        <motion.div
          className={`relative w-12 h-12 md:w-16 md:h-16 rounded-full ${themeClasses.characterBg} border-2 backdrop-blur-sm cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-xl ${themeClasses.glowEffect} group`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {/* Animated background glow */}
          <motion.div
            className="absolute inset-0 rounded-full bg-emerald-400/30"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeInOut" }}
          ></motion.div>

          {/* Character icon that changes */}
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            {currentMessage % 4 === 0 && (
              <motion.div key="terminal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Terminal className="w-6 h-6 md:w-8 md:h-8 text-emerald-400 group-hover:text-emerald-300 drop-shadow-lg" />
              </motion.div>
            )}
            {currentMessage % 4 === 1 && (
              <motion.div key="eye" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Eye className="w-6 h-6 md:w-8 md:h-8 text-emerald-400 group-hover:text-emerald-300 drop-shadow-lg" />
              </motion.div>
            )}
            {currentMessage % 4 === 2 && (
              <motion.div key="skull" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Skull className="w-6 h-6 md:w-8 md:h-8 text-emerald-400 group-hover:text-emerald-300 drop-shadow-lg" />
              </motion.div>
            )}
            {currentMessage % 4 === 3 && (
              <motion.div key="shield" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Shield className="w-6 h-6 md:w-8 md:h-8 text-emerald-400 group-hover:text-emerald-300 drop-shadow-lg" />
              </motion.div>
            )}
          </div>

          {/* Floating particles */}
          <motion.div
            className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full opacity-80"
            animate={{ y: [0, -5, 0], x: [0, 5, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" }}
          ></motion.div>
          <motion.div
            className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-emerald-300 rounded-full opacity-80"
            animate={{ y: [0, 5, 0], x: [0, -5, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.8, ease: "easeInOut", delay: 0.3 }}
          ></motion.div>

          {/* Click indicator */}
          <motion.div
            className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-emerald-500 text-white text-xs px-2 py-1 rounded font-mono whitespace-nowrap font-bold shadow-lg"
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            CLICK ME!
          </motion.div>
        </motion.div>
      </Link>

      {/* Speech bubble - positioned to avoid content and screen clip */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            className={`absolute ${initialPosition.x > 50 ? '-left-56' : 'left-16'} ${
              initialPosition.y < 50 ? 'top-0' : '-top-20'
            } ${themeClasses.messageBg} border backdrop-blur-md rounded-lg px-3 py-2 max-w-xs pointer-events-none shadow-lg`}
            variants={messageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              maxWidth: '200px',
              zIndex: 40,
            }}
          >
            <div className={`text-sm font-mono ${themeClasses.messageText} whitespace-normal font-medium`}>
              {displayedText}
              {isTyping && <span className="animate-pulse">|</span>}
            </div>

            {/* Speech bubble arrow - adaptive positioning */}
            <div
              className={`absolute ${initialPosition.y < 50 ? '-top-2' : 'top-full'} ${
                initialPosition.x > 50 ? 'right-4' : 'left-4'
              }`}
            >
              <div
                className={`w-0 h-0 border-l-4 border-r-4 ${
                  initialPosition.y < 50 ? 'border-b-4 border-t-0' : 'border-t-4 border-b-0'
                } border-transparent ${
                  initialPosition.y < 50
                    ? 'border-b-[#050505]'
                    : 'border-t-[#050505]'
                }`}
              ></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Matrix-style trailing effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-emerald-400 rounded-full opacity-60"
            animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeOut", delay: i * 0.5 }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}
