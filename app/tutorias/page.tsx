import SectionWrapper from '@/components/SectionWrapper'
import FadeIn from '@/components/FadeIn'
import SlideUp from '@/components/SlideUp'
import Link from 'next/link'

export default function TutoriasPage() {
  return (
    <>
      {/* Header */}
      <section className="relative pt-32 pb-16 bg-gradient-to-b from-bg-1/50 to-transparent">
        <div className="container">
          <FadeIn>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-accent hover:text-accent-2 transition-colors mb-6"
            >
              ← Volver al inicio
            </Link>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Tutorías personalizadas
            </h1>
            <p className="text-xl text-muted max-w-2xl">
              Aprende a tu ritmo con sesiones diseñadas para ti
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Info Cards */}
      <SectionWrapper>
        <div className="grid md:grid-cols-2 gap-8">
          <SlideUp delay={0.1}>
            <div className="p-6 bg-[var(--card-bg)] border border-[var(--border)] rounded-[var(--r-3)]">
              <h2 className="text-2xl font-semibold mb-4 text-accent">
                Materias disponibles
              </h2>
              <ul className="space-y-2 text-muted">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  Programación (Python, JavaScript, Java)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  LaTeX y herramientas académicas
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  Estructuras de datos y algoritmos
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  Desarrollo web (Frontend y Backend)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">•</span>
                  Bases de datos y SQL
                </li>
              </ul>
            </div>
          </SlideUp>

          <SlideUp delay={0.2}>
            <div className="p-6 bg-[var(--card-bg)] border border-[var(--border)] rounded-[var(--r-3)]">
              <h2 className="text-2xl font-semibold mb-4 text-accent">
                Modalidades
              </h2>
              <div className="space-y-4 text-muted">
                <div>
                  <h3 className="text-fg font-semibold mb-1">Online</h3>
                  <p>Sesiones por videollamada con pizarra virtual interactiva</p>
                </div>
                <div>
                  <h3 className="text-fg font-semibold mb-1">Duración flexible</h3>
                  <p>Sesiones de 1 o 2 horas según tus necesidades</p>
                </div>
                <div>
                  <h3 className="text-fg font-semibold mb-1">Material incluido</h3>
                  <p>Guías de estudio y ejercicios prácticos</p>
                </div>
              </div>
            </div>
          </SlideUp>
        </div>
      </SectionWrapper>

      {/* Google Calendar Integration */}
      <SectionWrapper className="bg-bg-1/30">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Agenda tu sesión
          </h2>
        </FadeIn>

        <SlideUp delay={0.2}>
          <div className="max-w-4xl mx-auto">
            {/* Placeholder for Google Calendar */}
            <div className="min-h-[400px] flex items-center justify-center bg-[var(--card-bg)] border border-[var(--border)] rounded-[var(--r-3)] p-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-accent/20 rounded-full flex items-center justify-center text-accent text-2xl">
                  📅
                </div>
                <h3 className="text-xl font-semibold">Google Calendar</h3>
                <p className="text-muted max-w-md">
                  Aquí se integrará el calendario de Google para que puedas ver la disponibilidad y agendar tu sesión.
                </p>
                <p className="text-sm text-muted italic">
                  [Placeholder - Requiere configuración de Google Calendar API]
                </p>
              </div>
            </div>
          </div>
        </SlideUp>

        {/* Fallback Contact Options */}
        <SlideUp delay={0.4}>
          <div className="max-w-2xl mx-auto mt-8 pt-8 border-t border-[var(--border)] text-center">
            <p className="text-muted mb-6">
              También puedes contactarnos directamente para agendar:
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="mailto:info@pasasincopiar.com"
                className="px-6 py-3 border border-accent text-accent rounded-lg hover:bg-accent/10 transition-all"
              >
                Email
              </a>
              <a
                href="https://wa.me/1234567890"
                className="px-6 py-3 border border-accent text-accent rounded-lg hover:bg-accent/10 transition-all"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </SlideUp>
      </SectionWrapper>

      {/* Pricing Section */}
      <SectionWrapper>
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Precios
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <SlideUp delay={0.1}>
            <div className="p-6 bg-[var(--card-bg)] border border-[var(--border)] rounded-[var(--r-3)] hover:shadow-lg hover:shadow-accent/20 transition-all">
              <h3 className="text-xl font-semibold mb-2">Sesión Individual</h3>
              <div className="text-3xl font-bold text-accent mb-4">$25</div>
              <p className="text-muted mb-6">Por hora</p>
              <ul className="space-y-2 text-sm text-muted mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-accent">✓</span>
                  Atención personalizada
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">✓</span>
                  Material de estudio
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">✓</span>
                  Grabación de la sesión
                </li>
              </ul>
            </div>
          </SlideUp>

          <SlideUp delay={0.2}>
            <div className="p-6 bg-gradient-to-br from-accent/20 to-[var(--card-bg)] border-2 border-accent rounded-[var(--r-3)] relative overflow-hidden">
              <div className="absolute top-4 right-4 px-3 py-1 bg-accent text-white text-xs font-semibold rounded-full">
                Popular
              </div>
              <h3 className="text-xl font-semibold mb-2">Paquete 5 Sesiones</h3>
              <div className="text-3xl font-bold text-accent mb-4">$110</div>
              <p className="text-muted mb-6">$22 por hora</p>
              <ul className="space-y-2 text-sm text-muted mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-accent">✓</span>
                  Todo lo anterior
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">✓</span>
                  Ahorra $15
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">✓</span>
                  Seguimiento personalizado
                </li>
              </ul>
            </div>
          </SlideUp>

          <SlideUp delay={0.3}>
            <div className="p-6 bg-[var(--card-bg)] border border-[var(--border)] rounded-[var(--r-3)] hover:shadow-lg hover:shadow-accent/20 transition-all">
              <h3 className="text-xl font-semibold mb-2">Paquete 10 Sesiones</h3>
              <div className="text-3xl font-bold text-accent mb-4">$200</div>
              <p className="text-muted mb-6">$20 por hora</p>
              <ul className="space-y-2 text-sm text-muted mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-accent">✓</span>
                  Todo lo anterior
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">✓</span>
                  Ahorra $50
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">✓</span>
                  Máximo descuento
                </li>
              </ul>
            </div>
          </SlideUp>
        </div>
      </SectionWrapper>
    </>
  )
}
