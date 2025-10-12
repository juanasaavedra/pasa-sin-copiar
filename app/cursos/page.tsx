import SectionWrapper from '@/components/SectionWrapper'
import FadeIn from '@/components/FadeIn'
import SlideUp from '@/components/SlideUp'
import Link from 'next/link'

export default function CursosPage() {
  const courses = [
    {
      title: 'Python desde Cero',
      description: 'Aprende programación con Python desde los fundamentos hasta proyectos reales',
      duration: '8 semanas',
      level: 'Principiante',
      price: '$150',
    },
    {
      title: 'JavaScript Moderno',
      description: 'Domina JavaScript ES6+, async/await, y desarrollo web interactivo',
      duration: '10 semanas',
      level: 'Intermedio',
      price: '$180',
    },
    {
      title: 'Estructuras de Datos',
      description: 'Comprende y aplica estructuras de datos fundamentales',
      duration: '6 semanas',
      level: 'Intermedio',
      price: '$120',
    },
    {
      title: 'Desarrollo Web Full Stack',
      description: 'Crea aplicaciones web completas con React, Node.js y bases de datos',
      duration: '12 semanas',
      level: 'Avanzado',
      price: '$250',
    },
    {
      title: 'LaTeX Profesional',
      description: 'Crea documentos académicos y técnicos de alta calidad',
      duration: '4 semanas',
      level: 'Principiante',
      price: '$80',
    },
    {
      title: 'Bases de Datos SQL',
      description: 'Diseño, consultas y optimización de bases de datos relacionales',
      duration: '6 semanas',
      level: 'Intermedio',
      price: '$130',
    },
  ]

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
              Cursos
            </h1>
            <p className="text-xl text-muted max-w-2xl">
              Programas completos diseñados para dominar temas específicos
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Courses Grid */}
      <SectionWrapper>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <SlideUp key={course.title} delay={index * 0.1}>
              <div className="h-full p-6 bg-[var(--card-bg)] border border-[var(--border)] rounded-[var(--r-3)] hover:shadow-lg hover:shadow-accent/20 transition-all hover:-translate-y-1">
                <div className="flex items-start justify-between mb-3">
                  <span className="px-3 py-1 bg-accent/20 text-accent text-xs font-semibold rounded-full">
                    {course.level}
                  </span>
                  <span className="text-2xl font-bold text-accent">{course.price}</span>
                </div>

                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <p className="text-muted mb-4">{course.description}</p>

                <div className="flex items-center gap-4 text-sm text-muted mb-4">
                  <span className="flex items-center gap-1">
                    <span>📅</span>
                    {course.duration}
                  </span>
                </div>

                <button className="w-full px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-2 transition-all">
                  Más información
                </button>
              </div>
            </SlideUp>
          ))}
        </div>
      </SectionWrapper>

      {/* Benefits Section */}
      <SectionWrapper className="bg-bg-1/30">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Qué incluyen nuestros cursos
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <SlideUp delay={0.1}>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-accent/20 rounded-full flex items-center justify-center text-accent text-2xl">
                📚
              </div>
              <h3 className="font-semibold mb-2">Material completo</h3>
              <p className="text-sm text-muted">
                Guías, ejercicios y proyectos prácticos
              </p>
            </div>
          </SlideUp>

          <SlideUp delay={0.2}>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-accent/20 rounded-full flex items-center justify-center text-accent text-2xl">
                💬
              </div>
              <h3 className="font-semibold mb-2">Soporte continuo</h3>
              <p className="text-sm text-muted">
                Respuestas a tus dudas durante el curso
              </p>
            </div>
          </SlideUp>

          <SlideUp delay={0.3}>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-accent/20 rounded-full flex items-center justify-center text-accent text-2xl">
                🎯
              </div>
              <h3 className="font-semibold mb-2">Proyectos reales</h3>
              <p className="text-sm text-muted">
                Aplica lo aprendido en proyectos prácticos
              </p>
            </div>
          </SlideUp>

          <SlideUp delay={0.4}>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-accent/20 rounded-full flex items-center justify-center text-accent text-2xl">
                🏆
              </div>
              <h3 className="font-semibold mb-2">Certificado</h3>
              <p className="text-sm text-muted">
                Certificado de finalización al completar
              </p>
            </div>
          </SlideUp>
        </div>
      </SectionWrapper>

      {/* CTA Section */}
      <SectionWrapper>
        <FadeIn>
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              ¿Tienes dudas sobre qué curso elegir?
            </h2>
            <p className="text-lg text-muted">
              Agenda una tutoría para discutir tus objetivos y encontrar el curso perfecto para ti
            </p>
            <SlideUp delay={0.2}>
              <Link
                href="/tutorias"
                className="inline-block px-8 py-4 bg-accent text-white rounded-lg hover:bg-accent-2 transition-all hover:shadow-xl hover:shadow-accent/50 hover:-translate-y-1 text-lg font-semibold"
              >
                Hablar con un tutor
              </Link>
            </SlideUp>
          </div>
        </FadeIn>
      </SectionWrapper>
    </>
  )
}
