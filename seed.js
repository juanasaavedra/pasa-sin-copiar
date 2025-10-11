const db = require('./src/config/database');

console.log('Seeding database with sample data...');

// Wait for database to be initialized
setTimeout(() => {
  // Sample courses
  const courses = [
    {
      title: 'Matemáticas Básicas para Universitarios',
      description: 'Curso completo de cálculo diferencial e integral, álgebra lineal y ecuaciones diferenciales.',
      duration: '8 semanas',
      price: 299.99,
      image_url: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400'
    },
    {
      title: 'Programación en Python desde Cero',
      description: 'Aprende Python desde los fundamentos hasta proyectos avanzados con aplicaciones prácticas.',
      duration: '12 semanas',
      price: 399.99,
      image_url: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400'
    },
    {
      title: 'Física General',
      description: 'Curso de física mecánica, termodinámica, electromagnetismo y óptica.',
      duration: '10 semanas',
      price: 349.99,
      image_url: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400'
    }
  ];

  courses.forEach(course => {
    db.run(
      'INSERT INTO courses (title, description, duration, price, image_url) VALUES (?, ?, ?, ?, ?)',
      [course.title, course.description, course.duration, course.price, course.image_url],
      (err) => {
        if (err) {
          console.error('Error inserting course:', err.message);
        } else {
          console.log(`✓ Curso insertado: ${course.title}`);
        }
      }
    );
  });

  // Sample guides
  const guides = [
    {
      title: 'Guía Completa de Cálculo I',
      description: 'Todos los temas de cálculo diferencial con ejemplos resueltos paso a paso.',
      category: 'Matemáticas',
      preview_url: 'https://example.com/preview/calculo1.pdf',
      file_url: 'https://example.com/files/calculo1-completo.pdf',
      price: 49.99
    },
    {
      title: 'Formulario de Física',
      description: 'Todas las fórmulas de física general en un solo documento organizado por temas.',
      category: 'Física',
      preview_url: 'https://example.com/preview/fisica-formulas.pdf',
      file_url: 'https://example.com/files/fisica-formulas-completo.pdf',
      price: 29.99
    },
    {
      title: 'Ejercicios de Álgebra Lineal',
      description: '100 ejercicios resueltos de álgebra lineal con explicaciones detalladas.',
      category: 'Matemáticas',
      preview_url: 'https://example.com/preview/algebra-ejercicios.pdf',
      file_url: 'https://example.com/files/algebra-ejercicios-completo.pdf',
      price: 39.99
    },
    {
      title: 'Guía de Python para Principiantes',
      description: 'Manual completo de Python con ejemplos de código y proyectos prácticos.',
      category: 'Programación',
      preview_url: 'https://example.com/preview/python-guia.pdf',
      file_url: 'https://example.com/files/python-guia-completo.pdf',
      price: 59.99
    }
  ];

  guides.forEach(guide => {
    db.run(
      'INSERT INTO guides (title, description, category, preview_url, file_url, price) VALUES (?, ?, ?, ?, ?, ?)',
      [guide.title, guide.description, guide.category, guide.preview_url, guide.file_url, guide.price],
      (err) => {
        if (err) {
          console.error('Error inserting guide:', err.message);
        } else {
          console.log(`✓ Guía insertada: ${guide.title}`);
        }
      }
    );
  });

  // Sample availability
  const availability = [
    { tutor: 'Prof. García', day: 'lunes', start: '09:00', end: '17:00' },
    { tutor: 'Prof. García', day: 'miércoles', start: '09:00', end: '17:00' },
    { tutor: 'Prof. García', day: 'viernes', start: '09:00', end: '13:00' },
    { tutor: 'Prof. Martínez', day: 'martes', start: '10:00', end: '18:00' },
    { tutor: 'Prof. Martínez', day: 'jueves', start: '10:00', end: '18:00' },
    { tutor: 'Prof. López', day: 'lunes', start: '14:00', end: '20:00' },
    { tutor: 'Prof. López', day: 'miércoles', start: '14:00', end: '20:00' },
    { tutor: 'Prof. López', day: 'viernes', start: '14:00', end: '20:00' }
  ];

  availability.forEach(slot => {
    db.run(
      'INSERT INTO availability (tutor_name, day_of_week, start_time, end_time, is_available) VALUES (?, ?, ?, ?, ?)',
      [slot.tutor, slot.day, slot.start, slot.end, 1],
      (err) => {
        if (err) {
          console.error('Error inserting availability:', err.message);
        } else {
          console.log(`✓ Disponibilidad insertada: ${slot.tutor} - ${slot.day}`);
        }
      }
    );
  });

  setTimeout(() => {
    console.log('\n✅ Database seeded successfully!');
    console.log('You can now start the server with: npm start');
    process.exit(0);
  }, 2000);
}, 1000);
