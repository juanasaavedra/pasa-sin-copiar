// Main JavaScript for homepage
document.addEventListener('DOMContentLoaded', function() {
    loadFeaturedCourses();
});

async function loadFeaturedCourses() {
    try {
        const response = await fetch('/api/courses');
        const data = await response.json();
        
        const container = document.getElementById('featured-courses');
        container.innerHTML = '';
        
        if (data.courses && data.courses.length > 0) {
            // Show only first 3 courses as featured
            const featured = data.courses.slice(0, 3);
            
            featured.forEach(course => {
                const card = createCourseCard(course);
                container.appendChild(card);
            });
        } else {
            container.innerHTML = '<p class="text-center">No hay cursos disponibles en este momento.</p>';
        }
    } catch (error) {
        console.error('Error loading featured courses:', error);
        document.getElementById('featured-courses').innerHTML = 
            '<p class="text-center message error">Error al cargar cursos destacados.</p>';
    }
}

function createCourseCard(course) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <h3>${course.title}</h3>
        <p>${course.description}</p>
        <p><strong>Duración:</strong> ${course.duration}</p>
        <p class="price">$${course.price}</p>
        <a href="/courses" class="btn btn-small">Ver Más</a>
    `;
    return card;
}
