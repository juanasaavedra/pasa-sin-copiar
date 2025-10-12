import Hero from '@/components/Hero'
import SectionWrapper from '@/components/SectionWrapper'
import FadeIn from '@/components/FadeIn'
import SlideUp from '@/components/SlideUp'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Hero />

      {/* Services Section */}
      <SectionWrapper id="servicios" className="bg-bg-1/30">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Nuestros Servicios
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8">
          <SlideUp delay={0.1}>
            <div className="p-6 bg-[var(--card-bg)] border border-[var(--border)] rounded-[var(--r-3)] hover:shadow-lg hover:shadow-accent/20 transition-all hover:-translate-y-1">
              <h3 className="text-xl font-semibold mb-3 text-accent">Tutorías 1:1</h3>
              <p className="text-muted mb-4">
                Sesiones personalizadas adaptadas a tu ritmo y necesidades específicas.
              </p>
              <Link
                href="/tutorias"
                className="text-accent hover:text-accent-2 transition-colors inline-flex items-center gap-2"
              >
                Ver más →
              </Link>
            </div>
          </SlideUp>

          <SlideUp delay={0.2}>
            <div className="p-6 bg-[var(--card-bg)] border border-[var(--border)] rounded-[var(--r-3)] hover:shadow-lg hover:shadow-accent/20 transition-all hover:-translate-y-1">
              <h3 className="text-xl font-semibold mb-3 text-accent">Cursos</h3>
              <p className="text-muted mb-4">
                Programas completos diseñados para dominar temas específicos.
              </p>
              <Link
                href="/cursos"
                className="text-accent hover:text-accent-2 transition-colors inline-flex items-center gap-2"
              >
                Ver más →
              </Link>
            </div>
          </SlideUp>

          <SlideUp delay={0.3}>
            <div className="p-6 bg-[var(--card-bg)] border border-[var(--border)] rounded-[var(--r-3)] hover:shadow-lg hover:shadow-accent/20 transition-all hover:-translate-y-1">
              <h3 className="text-xl font-semibold mb-3 text-accent">Guías</h3>
              <p className="text-muted mb-4">
                Recursos descargables para estudiar a tu propio ritmo.
              </p>
              <Link
                href="/guias"
                className="text-accent hover:text-accent-2 transition-colors inline-flex items-center gap-2"
              >
                Ver más →
              </Link>
            </div>
          </SlideUp>
        </div>
      </SectionWrapper>

      {/* Why Choose Us Section */}
      <SectionWrapper id="ventajas">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            ¿Por qué elegirnos?
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <SlideUp delay={0.1}>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center text-accent text-xl font-bold">
                ✓
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Aprendizaje Real</h3>
                <p className="text-muted">
                  No memorices, comprende. Desarrollamos tu pensamiento crítico.
                </p>
              </div>
            </div>
          </SlideUp>

          <SlideUp delay={0.2}>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center text-accent text-xl font-bold">
                ✓
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Horarios Flexibles</h3>
                <p className="text-muted">
                  Agenda sesiones que se adapten a tu disponibilidad.
                </p>
              </div>
            </div>
          </SlideUp>

          <SlideUp delay={0.3}>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center text-accent text-xl font-bold">
                ✓
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Tutores Expertos</h3>
                <p className="text-muted">
                  Profesionales con experiencia en docencia y desarrollo.
                </p>
              </div>
            </div>
          </SlideUp>

          <SlideUp delay={0.4}>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center text-accent text-xl font-bold">
                ✓
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Recursos Incluidos</h3>
                <p className="text-muted">
                  Acceso a guías, ejercicios y material complementario.
                </p>
              </div>
            </div>
          </SlideUp>
        </div>
      </SectionWrapper>

      {/* CTA Section */}
      <SectionWrapper className="bg-bg-1/30">
        <FadeIn>
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Comienza tu camino hacia el dominio real
            </h2>
            <p className="text-lg text-muted">
              No esperes más para transformar tu forma de aprender
            </p>
            <SlideUp delay={0.2}>
              <Link
                href="/tutorias"
                className="inline-block px-8 py-4 bg-accent text-white rounded-lg hover:bg-accent-2 transition-all hover:shadow-xl hover:shadow-accent/50 hover:-translate-y-1 text-lg font-semibold"
              >
                Agendar tutoría ahora
              </Link>
            </SlideUp>
          </div>
        </FadeIn>
      </SectionWrapper>
    </>
  )
}
