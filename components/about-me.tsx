"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion"
import { useLanguage } from "./language-provider"

export function AboutMe() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5])

  const [hoveredType, setHoveredType] = useState<null | "recognition" | "expertise">(null)
  const highlightsRef = useRef<HTMLDivElement>(null)
  const { t } = useLanguage()
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (highlightsRef.current) {
      const rect = highlightsRef.current.getBoundingClientRect()
      mouseX.set(e.clientX - rect.left)
      mouseY.set(e.clientY - rect.top)
    }
  }

  return (
    <section ref={containerRef} id="about" className="relative py-32 md:py-48">
      <div className="px-8 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-4">{t.aboutMe.sectionLabel}</p>
          <h2 className="font-sans text-3xl md:text-5xl font-light italic">{t.aboutMe.title}</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="space-y-6"
          >
            {t.aboutMe.paragraphs.map((paragraph, index) => {
              const parts = paragraph.split(t.aboutMe.highlightText)
              const hasHighlight = parts.length > 1

              return (
                <p key={index} className="font-sans text-lg md:text-xl leading-relaxed text-foreground/90">
                  {hasHighlight ? (
                    <>
                      {parts[0]}
                      <span className="font-semibold text-emerald-500 drop-shadow-[0_0_10px_rgba(16,185,129,0.35)]">
                        {t.aboutMe.highlightText}
                      </span>
                      {parts[1]}
                    </>
                  ) : (
                    paragraph
                  )}
                </p>
              )
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {t.aboutMe.skills.map((skillGroup, idx) => (
              <div key={idx} className="border-l border-white/10 pl-6">
                <h3 className="font-mono text-xs tracking-widest text-muted-foreground mb-3">{skillGroup.category.toUpperCase()}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: idx * 0.1 + i * 0.05 }}
                      className="px-3 py-1.5 border border-white/10 rounded-full font-mono text-xs text-foreground/70 hover:border-white/30 hover:text-foreground transition-all duration-300"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 pt-20 border-t border-white/10 relative"
          ref={highlightsRef}
          onMouseMove={handleMouseMove}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              className="space-y-2 cursor-help group p-4 border border-transparent hover:border-white/5 rounded-lg transition-all"
              onMouseEnter={() => setHoveredType("recognition")}
              onMouseLeave={() => setHoveredType(null)}
            >
              <p className="font-mono text-xs tracking-widest text-emerald-500">{t.aboutMe.highlights.recognition.label}</p>
              <p className="font-sans text-2xl font-light">{t.aboutMe.highlights.recognition.value}</p>
              <p className="font-mono text-xs text-muted-foreground">{t.aboutMe.highlights.recognition.description}</p>
            </div>
            <div
              className="space-y-2 cursor-help group p-4 border border-transparent hover:border-white/5 rounded-lg transition-all"
              onMouseEnter={() => setHoveredType("expertise")}
              onMouseLeave={() => setHoveredType(null)}
            >
              <p className="font-mono text-xs tracking-widest text-emerald-500">{t.aboutMe.highlights.expertise.label}</p>
              <p className="font-sans text-2xl font-light">{t.aboutMe.highlights.expertise.value}</p>
              <p className="font-mono text-xs text-muted-foreground">{t.aboutMe.highlights.expertise.description}</p>
            </div>
            <div className="space-y-2 p-4">
              <p className="font-mono text-xs tracking-widest text-emerald-500">{t.aboutMe.highlights.focus.label}</p>
              <p className="font-sans text-2xl font-light">{t.aboutMe.highlights.focus.value}</p>
              <p className="font-mono text-xs text-muted-foreground">{t.aboutMe.highlights.focus.description}</p>
            </div>
          </div>

          <AnimatePresence>
            {hoveredType === "recognition" && (
              <motion.div
                className="absolute pointer-events-none z-50 shadow-2xl rounded-lg overflow-hidden bg-transparent"
                style={{
                  x: springX,
                  y: springY,
                  translateX: "10%",
                  translateY: "-110%",
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <img
                  src="/Tryhackme.png"
                  alt="TryHackMe Ranking"
                  className="w-[450px] md:w-[650px] h-auto object-contain border border-white/10 rounded-lg shadow-2xl"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {hoveredType === "expertise" && (
              <motion.div
                className="absolute pointer-events-none z-50 overflow-hidden rounded-lg border border-white/10 bg-[#050505]/95 shadow-2xl p-4 min-w-[320px]"
                style={{
                  x: springX,
                  y: springY,
                  translateX: "10%",
                  translateY: "-110%",
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <div className="font-mono text-xs space-y-3">
                  <p className="text-emerald-400 font-bold border-b border-white/10 pb-1 mb-2">{t.aboutMe.certificationsTitle}</p>
                  <ul className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {t.aboutMe.certifications.map((certification) => (
                      <li key={certification.title} className="flex flex-col">
                        <span className="text-white font-medium">{certification.title}</span>
                        <span className="text-[10px] text-muted-foreground">{certification.issuer}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
