'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import FadeIn from './FadeIn'
import SlideUp from './SlideUp'

export default function Hero() {
  const [subtitle, setSubtitle] = useState('')
  const subtitles = [
    'Aprende sin memorizar',
    'Domina conceptos reales',
    'Tutorías personalizadas',
  ]
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % subtitles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    setSubtitle(subtitles[currentIndex])
  }, [currentIndex])

  return (
    <section className="relative min-h-screen pt-20 md:pt-32 pb-16">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-2/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <FadeIn>
              <span className="inline-block px-4 py-2 bg-[var(--pill-bg)] border border-[var(--border)] rounded-full text-sm text-accent">
                Plataforma educativa
              </span>
            </FadeIn>

            <SlideUp delay={0.2}>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Pasa sin Copiar
              </h1>
            </SlideUp>

            <SlideUp delay={0.4}>
              <motion.h2
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-2xl md:text-3xl text-accent-2 font-semibold"
              >
                {subtitle}
              </motion.h2>
            </SlideUp>

            <SlideUp delay={0.6}>
              <p className="text-lg text-muted max-w-xl">
                Comienza tu camino hacia el dominio real de conceptos y habilidades
              </p>
            </SlideUp>

            <SlideUp delay={0.8}>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/tutorias"
                  className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-2 transition-all hover:shadow-lg hover:shadow-accent/50 hover:-translate-y-1"
                >
                  Tutorías personalizadas
                </Link>
                <Link
                  href="/guias"
                  className="px-6 py-3 border border-accent text-accent rounded-lg hover:bg-accent/10 transition-all"
                >
                  Explorar guías
                </Link>
              </div>
            </SlideUp>
          </div>

          {/* Visual Area with Stats Cards */}
          <FadeIn delay={0.4}>
            <div className="relative min-h-[400px] flex items-center justify-center">
              <div className="relative w-full h-full min-h-[400px] rounded-[var(--r-2)] bg-gradient-to-br from-accent/10 to-transparent border border-[var(--border)]">
                {/* Stats Card - Top Left */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1, duration: 0.6 }}
                  className="absolute top-8 left-8 bg-[var(--card-bg)] backdrop-blur-md border border-[var(--border)] rounded-[var(--r-1)] p-4 min-w-[120px]"
                >
                  <h3 className="text-3xl font-bold text-accent">500+</h3>
                  <p className="text-sm text-muted">Estudiantes</p>
                </motion.div>

                {/* Stats Card - Bottom Right */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                  className="absolute bottom-8 right-8 bg-[var(--card-bg)] backdrop-blur-md border border-[var(--border)] rounded-[var(--r-1)] p-4 min-w-[120px]"
                >
                  <h3 className="text-3xl font-bold text-accent">98%</h3>
                  <p className="text-sm text-muted">Satisfacción</p>
                </motion.div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
