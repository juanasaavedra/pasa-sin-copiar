// Courses page JavaScript
let currentCourseId = null;

document.addEventListener('DOMContentLoaded', function() {
    loadCourses();
    
    const enrollForm = document.getElementById('enrollForm');
    enrollForm.addEventListener('submit', handleEnrollSubmit);
});

async function loadCourses() {
    try {
        const response = await fetch('/api/courses');
        const data = await response.json();
        
        const container = document.getElementById('coursesList');
        container.innerHTML = '';
        
        if (data.courses && data.courses.length > 0) {
            data.courses.forEach(course => {
                const card = createCourseCard(course);
                container.appendChild(card);
            });
        } else {
            container.innerHTML = '<p class="text-center">No hay cursos disponibles en este momento.</p>';
        }
    } catch (error) {
        console.error('Error loading courses:', error);
        document.getElementById('coursesList').innerHTML = 
            '<p class="text-center message error">Error al cargar cursos.</p>';
    }
}

function createCourseCard(course) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        ${course.image_url ? `<img src="${course.image_url}" alt="${course.title}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 4px; margin-bottom: 1rem;">` : ''}
        <h3>${course.title}</h3>
        <p>${course.description}</p>
        <p><strong>Duración:</strong> ${course.duration}</p>
        <p class="price">$${course.price}</p>
        <button class="btn btn-small" onclick="openEnrollModal(${course.id}, '${course.title}')">
            Inscribirse
        </button>
    `;
    return card;
}

function openEnrollModal(courseId, courseName) {
    currentCourseId = courseId;
    document.getElementById('modal_course_id').value = courseId;
    document.getElementById('modalCourseName').textContent = courseName;
    
    const modal = document.getElementById('enrollModal');
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
}

function closeEnrollModal() {
    const modal = document.getElementById('enrollModal');
    modal.classList.add('hidden');
    modal.style.display = 'none';
    document.getElementById('enrollForm').reset();
}

async function handleEnrollSubmit(e) {
    e.preventDefault();
    
    const formData = {
        course_id: parseInt(document.getElementById('modal_course_id').value),
        student_name: document.getElementById('modal_student_name').value,
        student_email: document.getElementById('modal_student_email').value
    };
    
    try {
        const response = await fetch('/api/courses/enroll', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (response.ok) {
            closeEnrollModal();
            showMessage('¡Inscripción exitosa! Revisa tu correo para el enlace de pago.', 'success');
        } else {
            showMessage(data.error || 'Error al inscribirse', 'error');
        }
    } catch (error) {
        console.error('Error enrolling:', error);
        showMessage('Error al inscribirse. Por favor intenta nuevamente.', 'error');
    }
}

function showMessage(message, type = 'info') {
    const messageDiv = document.getElementById('message');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    messageDiv.style.display = 'block';
    
    // Scroll to message
    messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}
