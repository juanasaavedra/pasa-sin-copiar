import SectionWrapper from '@/components/SectionWrapper'
import FadeIn from '@/components/FadeIn'
import SlideUp from '@/components/SlideUp'
import Link from 'next/link'

export default function GuiasPage() {
  const guides = [
    {
      title: 'Introducción a Python',
      description: 'Conceptos básicos, sintaxis y primeros programas',
      category: 'Programación',
      pages: '45 páginas',
      level: 'Principiante',
    },
    {
      title: 'Git y GitHub Esencial',
      description: 'Control de versiones y colaboración en proyectos',
      category: 'Herramientas',
      pages: '30 páginas',
      level: 'Principiante',
    },
    {
      title: 'Estructuras de Datos en Java',
      description: 'Listas, pilas, colas, árboles y grafos',
      category: 'Algoritmos',
      pages: '68 páginas',
      level: 'Intermedio',
    },
    {
      title: 'LaTeX para Documentos Académicos',
      description: 'Tesis, artículos y presentaciones profesionales',
      category: 'LaTeX',
      pages: '52 páginas',
      level: 'Principiante',
    },
    {
      title: 'SQL y Bases de Datos',
      description: 'Consultas, joins, índices y optimización',
      category: 'Bases de Datos',
      pages: '58 páginas',
      level: 'Intermedio',
    },
    {
      title: 'JavaScript Asíncrono',
      description: 'Promises, async/await y manejo de APIs',
      category: 'Programación',
      pages: '42 páginas',
      level: 'Intermedio',
    },
    {
      title: 'React Hooks Completo',
      description: 'useState, useEffect, useContext y custom hooks',
      category: 'Frontend',
      pages: '55 páginas',
      level: 'Avanzado',
    },
    {
      title: 'Algoritmos de Ordenamiento',
      description: 'Bubble, Quick, Merge sort y análisis de complejidad',
      category: 'Algoritmos',
      pages: '38 páginas',
      level: 'Intermedio',
    },
  ]

  const categories = ['Todas', 'Programación', 'Algoritmos', 'LaTeX', 'Frontend', 'Herramientas', 'Bases de Datos']

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
              Guías de Estudio
            </h1>
            <p className="text-xl text-muted max-w-2xl">
              Recursos descargables para estudiar a tu propio ritmo
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Filter Section */}
      <SectionWrapper className="py-8">
        <FadeIn>
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full border transition-all ${
                  category === 'Todas'
                    ? 'bg-accent text-white border-accent'
                    : 'border-[var(--border)] text-muted hover:text-accent hover:border-accent'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </FadeIn>
      </SectionWrapper>

      {/* Guides Grid */}
      <SectionWrapper>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {guides.map((guide, index) => (
            <SlideUp key={guide.title} delay={index * 0.1}>
              <div className="h-full p-6 bg-[var(--card-bg)] border border-[var(--border)] rounded-[var(--r-3)] hover:shadow-lg hover:shadow-accent/20 transition-all hover:-translate-y-1">
                <div className="flex items-start justify-between mb-3">
                  <span className="px-3 py-1 bg-accent/20 text-accent text-xs font-semibold rounded-full">
                    {guide.category}
                  </span>
                  <span className="px-3 py-1 bg-bg-2 text-muted text-xs rounded-full">
                    {guide.level}
                  </span>
                </div>

                <h3 className="text-xl font-semibold mb-2">{guide.title}</h3>
                <p className="text-muted mb-4 text-sm">{guide.description}</p>

                <div className="flex items-center justify-between text-sm text-muted mb-4">
                  <span className="flex items-center gap-1">
                    <span>📄</span>
                    {guide.pages}
                  </span>
                  <span className="text-accent font-semibold">Gratis</span>
                </div>

                <button className="w-full px-4 py-2 border border-accent text-accent rounded-lg hover:bg-accent/10 transition-all">
                  Descargar PDF
                </button>
              </div>
            </SlideUp>
          ))}
        </div>
      </SectionWrapper>

      {/* How to Use Section */}
      <SectionWrapper className="bg-bg-1/30">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Cómo usar las guías
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <SlideUp delay={0.1}>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-accent/20 rounded-full flex items-center justify-center text-accent text-2xl font-bold">
                1
              </div>
              <h3 className="font-semibold mb-2 text-lg">Descarga</h3>
              <p className="text-muted">
                Elige la guía que necesitas y descárgala en formato PDF
              </p>
            </div>
          </SlideUp>

          <SlideUp delay={0.2}>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-accent/20 rounded-full flex items-center justify-center text-accent text-2xl font-bold">
                2
              </div>
              <h3 className="font-semibold mb-2 text-lg">Estudia</h3>
              <p className="text-muted">
                Lee y practica los conceptos a tu propio ritmo
              </p>
            </div>
          </SlideUp>

          <SlideUp delay={0.3}>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-accent/20 rounded-full flex items-center justify-center text-accent text-2xl font-bold">
                3
              </div>
              <h3 className="font-semibold mb-2 text-lg">Refuerza</h3>
              <p className="text-muted">
                Agenda una tutoría si necesitas ayuda adicional
              </p>
            </div>
          </SlideUp>
        </div>
      </SectionWrapper>

      {/* CTA Section */}
      <SectionWrapper>
        <FadeIn>
          <div className="max-w-3xl mx-auto text-center space-y-6 p-8 bg-gradient-to-br from-accent/20 to-[var(--card-bg)] border border-accent rounded-[var(--r-3)]">
            <h2 className="text-3xl md:text-4xl font-bold">
              ¿Necesitas ayuda con algún tema?
            </h2>
            <p className="text-lg text-muted">
              Combina nuestras guías con tutorías personalizadas para acelerar tu aprendizaje
            </p>
            <SlideUp delay={0.2}>
              <Link
                href="/tutorias"
                className="inline-block px-8 py-4 bg-accent text-white rounded-lg hover:bg-accent-2 transition-all hover:shadow-xl hover:shadow-accent/50 hover:-translate-y-1 text-lg font-semibold"
              >
                Agendar tutoría
              </Link>
            </SlideUp>
          </div>
        </FadeIn>
      </SectionWrapper>
    </>
  )
}
