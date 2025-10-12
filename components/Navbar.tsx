'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function Navbar() {
  const pathname = usePathname()
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)

  const links = [
    { href: '/', label: 'Inicio' },
    { href: '/tutorias', label: 'Tutorías' },
    { href: '/cursos', label: 'Cursos' },
    { href: '/guias', label: 'Guías' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-0/80 backdrop-blur-md border-b border-[var(--border)]">
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="text-lg md:text-xl font-semibold text-fg hover:text-accent transition-colors"
          >
            Pasa sin Copiar
          </Link>

          {/* Navigation Links */}
          <ul className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <li key={link.href} className="relative">
                <Link
                  href={link.href}
                  className={`text-sm transition-colors ${
                    pathname === link.href ? 'text-accent' : 'text-fg hover:text-accent'
                  }`}
                  onMouseEnter={() => setHoveredLink(link.href)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  {link.label}
                  {(pathname === link.href || hoveredLink === link.href) && (
                    <motion.div
                      layoutId="navbar-underline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <Link
            href="/tutorias"
            className="hidden md:inline-block px-5 py-2 bg-accent text-white rounded-lg hover:bg-accent-2 transition-all hover:shadow-lg hover:shadow-accent/50 hover:-translate-y-0.5"
          >
            Agendar Tutoría
          </Link>

          {/* Mobile Menu Button - Simple version */}
          <div className="md:hidden flex items-center gap-2">
            <Link
              href="/tutorias"
              className="px-4 py-2 bg-accent text-white text-sm rounded-lg hover:bg-accent-2 transition-all"
            >
              Agendar
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
