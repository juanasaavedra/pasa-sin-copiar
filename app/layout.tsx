import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import PageTransition from '@/components/PageTransition'

export const metadata: Metadata = {
  title: 'Pasa sin Copiar - Plataforma Educativa',
  description: 'Aprende sin memorizar con tutorías personalizadas, cursos y guías',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Navbar />
        <PageTransition>
          <main className="pt-16 md:pt-20">
            {children}
          </main>
        </PageTransition>
        <footer className="border-t border-[var(--border)] py-8 bg-bg-0/80 backdrop-blur-md">
          <div className="container">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted">
              <span>&copy; 2025 Pasa sin Copiar</span>
              <nav className="flex gap-6">
                <a href="/tutorias" className="text-accent hover:text-accent-2 transition-colors">
                  Tutorías
                </a>
                <a href="/guias" className="text-accent hover:text-accent-2 transition-colors">
                  Guías
                </a>
                <a href="/cursos" className="text-accent hover:text-accent-2 transition-colors">
                  Cursos
                </a>
              </nav>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
