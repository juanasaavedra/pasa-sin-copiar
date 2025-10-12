'use client'

import { ReactNode } from 'react'
import SectionReveal from './SectionReveal'

interface SectionWrapperProps {
  children: ReactNode
  className?: string
  id?: string
}

export default function SectionWrapper({ children, className = '', id }: SectionWrapperProps) {
  return (
    <section id={id} className={`relative py-16 md:py-24 ${className}`}>
      <SectionReveal>
        <div className="container">
          {children}
        </div>
      </SectionReveal>
    </section>
  )
}
