// Admin page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    loadBookings();
    loadCourses();
    loadEnrollments();
    loadGuides();
    loadPurchases();
    
    // Setup forms
    document.getElementById('courseForm').addEventListener('submit', handleCourseSubmit);
    document.getElementById('guideForm').addEventListener('submit', handleGuideSubmit);
});

// Bookings Management
async function loadBookings() {
    try {
        const response = await fetch('/api/bookings');
        const data = await response.json();
        
        const container = document.getElementById('bookingsTable');
        
        if (data.bookings && data.bookings.length > 0) {
            let table = '<table><thead><tr><th>ID</th><th>Estudiante</th><th>Email</th><th>Tutor</th><th>Fecha</th><th>Hora</th><th>Materia</th><th>Estado</th><th>Acciones</th></tr></thead><tbody>';
            
            data.bookings.forEach(booking => {
                table += `
                    <tr>
                        <td>${booking.id}</td>
                        <td>${booking.student_name}</td>
                        <td>${booking.student_email}</td>
                        <td>${booking.tutor_name}</td>
                        <td>${booking.date}</td>
                        <td>${booking.time}</td>
                        <td>${booking.subject}</td>
                        <td>${booking.status}</td>
                        <td>
                            ${booking.status !== 'cancelled' ? `<button class="btn btn-small" onclick="cancelBooking(${booking.id})">Cancelar</button>` : '-'}
                        </td>
                    </tr>
                `;
            });
            
            table += '</tbody></table>';
            container.innerHTML = table;
        } else {
            container.innerHTML = '<p>No hay reservas.</p>';
        }
    } catch (error) {
        console.error('Error loading bookings:', error);
        document.getElementById('bookingsTable').innerHTML = '<p class="message error">Error al cargar reservas.</p>';
    }
}

async function cancelBooking(id) {
    if (!confirm('¿Estás seguro de cancelar esta reserva?')) return;
    
    try {
        const response = await fetch(`/api/bookings/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            showMessage('Reserva cancelada exitosamente', 'success');
            loadBookings();
        } else {
            showMessage('Error al cancelar reserva', 'error');
        }
    } catch (error) {
        console.error('Error cancelling booking:', error);
        showMessage('Error al cancelar reserva', 'error');
    }
}

// Courses Management
async function loadCourses() {
    try {
        const response = await fetch('/api/courses');
        const data = await response.json();
        
        const container = document.getElementById('coursesTable');
        
        if (data.courses && data.courses.length > 0) {
            let table = '<table><thead><tr><th>ID</th><th>Título</th><th>Duración</th><th>Precio</th><th>Acciones</th></tr></thead><tbody>';
            
            data.courses.forEach(course => {
                table += `
                    <tr>
                        <td>${course.id}</td>
                        <td>${course.title}</td>
                        <td>${course.duration}</td>
                        <td>$${course.price}</td>
                        <td>
                            <button class="btn btn-small btn-secondary" onclick="editCourse(${course.id})">Editar</button>
                            <button class="btn btn-small" onclick="deleteCourse(${course.id})">Eliminar</button>
                        </td>
                    </tr>
                `;
            });
            
            table += '</tbody></table>';
            container.innerHTML = table;
        } else {
            container.innerHTML = '<p>No hay cursos.</p>';
        }
    } catch (error) {
        console.error('Error loading courses:', error);
        document.getElementById('coursesTable').innerHTML = '<p class="message error">Error al cargar cursos.</p>';
    }
}

function showCourseForm() {
    document.getElementById('courseForm').classList.remove('hidden');
    document.getElementById('course_id').value = '';
    document.getElementById('courseForm').reset();
}

function hideCourseForm() {
    document.getElementById('courseForm').classList.add('hidden');
    document.getElementById('courseForm').reset();
}

async function editCourse(id) {
    try {
        const response = await fetch(`/api/courses/${id}`);
        const data = await response.json();
        
        if (data.course) {
            document.getElementById('course_id').value = data.course.id;
            document.getElementById('course_title').value = data.course.title;
            document.getElementById('course_description').value = data.course.description;
            document.getElementById('course_duration').value = data.course.duration;
            document.getElementById('course_price').value = data.course.price;
            document.getElementById('course_image_url').value = data.course.image_url || '';
            
            showCourseForm();
        }
    } catch (error) {
        console.error('Error loading course:', error);
        showMessage('Error al cargar curso', 'error');
    }
}

async function handleCourseSubmit(e) {
    e.preventDefault();
    
    const courseId = document.getElementById('course_id').value;
    const formData = {
        title: document.getElementById('course_title').value,
        description: document.getElementById('course_description').value,
        duration: document.getElementById('course_duration').value,
        price: parseFloat(document.getElementById('course_price').value),
        image_url: document.getElementById('course_image_url').value
    };
    
    const url = courseId ? `/api/courses/${courseId}` : '/api/courses';
    const method = courseId ? 'PUT' : 'POST';
    
    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        if (response.ok) {
            showMessage(courseId ? 'Curso actualizado' : 'Curso creado', 'success');
            hideCourseForm();
            loadCourses();
        } else {
            showMessage('Error al guardar curso', 'error');
        }
    } catch (error) {
        console.error('Error saving course:', error);
        showMessage('Error al guardar curso', 'error');
    }
}

async function deleteCourse(id) {
    if (!confirm('¿Estás seguro de eliminar este curso?')) return;
    
    try {
        const response = await fetch(`/api/courses/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            showMessage('Curso eliminado', 'success');
            loadCourses();
        } else {
            showMessage('Error al eliminar curso', 'error');
        }
    } catch (error) {
        console.error('Error deleting course:', error);
        showMessage('Error al eliminar curso', 'error');
    }
}

// Enrollments
async function loadEnrollments() {
    try {
        const response = await fetch('/api/courses/enrollments/all');
        const data = await response.json();
        
        const container = document.getElementById('enrollmentsTable');
        
        if (data.enrollments && data.enrollments.length > 0) {
            let table = '<table><thead><tr><th>ID</th><th>Curso</th><th>Estudiante</th><th>Email</th><th>Estado Pago</th><th>Fecha</th></tr></thead><tbody>';
            
            data.enrollments.forEach(enrollment => {
                table += `
                    <tr>
                        <td>${enrollment.id}</td>
                        <td>${enrollment.course_title}</td>
                        <td>${enrollment.student_name}</td>
                        <td>${enrollment.student_email}</td>
                        <td>${enrollment.payment_status}</td>
                        <td>${enrollment.created_at}</td>
                    </tr>
                `;
            });
            
            table += '</tbody></table>';
            container.innerHTML = table;
        } else {
            container.innerHTML = '<p>No hay inscripciones.</p>';
        }
    } catch (error) {
        console.error('Error loading enrollments:', error);
        document.getElementById('enrollmentsTable').innerHTML = '<p class="message error">Error al cargar inscripciones.</p>';
    }
}

// Guides Management
async function loadGuides() {
    try {
        const response = await fetch('/api/guides');
        const data = await response.json();
        
        const container = document.getElementById('guidesTable');
        
        if (data.guides && data.guides.length > 0) {
            let table = '<table><thead><tr><th>ID</th><th>Título</th><th>Categoría</th><th>Precio</th><th>Acciones</th></tr></thead><tbody>';
            
            data.guides.forEach(guide => {
                table += `
                    <tr>
                        <td>${guide.id}</td>
                        <td>${guide.title}</td>
                        <td>${guide.category || '-'}</td>
                        <td>$${guide.price}</td>
                        <td>
                            <button class="btn btn-small btn-secondary" onclick="editGuide(${guide.id})">Editar</button>
                            <button class="btn btn-small" onclick="deleteGuide(${guide.id})">Eliminar</button>
                        </td>
                    </tr>
                `;
            });
            
            table += '</tbody></table>';
            container.innerHTML = table;
        } else {
            container.innerHTML = '<p>No hay guías.</p>';
        }
    } catch (error) {
        console.error('Error loading guides:', error);
        document.getElementById('guidesTable').innerHTML = '<p class="message error">Error al cargar guías.</p>';
    }
}

function showGuideForm() {
    document.getElementById('guideForm').classList.remove('hidden');
    document.getElementById('guide_id').value = '';
    document.getElementById('guideForm').reset();
}

function hideGuideForm() {
    document.getElementById('guideForm').classList.add('hidden');
    document.getElementById('guideForm').reset();
}

async function editGuide(id) {
    try {
        const response = await fetch(`/api/guides/${id}`);
        const data = await response.json();
        
        if (data.guide) {
            document.getElementById('guide_id').value = data.guide.id;
            document.getElementById('guide_title').value = data.guide.title;
            document.getElementById('guide_description').value = data.guide.description;
            document.getElementById('guide_category').value = data.guide.category || '';
            document.getElementById('guide_preview_url').value = data.guide.preview_url || '';
            document.getElementById('guide_file_url').value = data.guide.file_url;
            document.getElementById('guide_price').value = data.guide.price;
            
            showGuideForm();
        }
    } catch (error) {
        console.error('Error loading guide:', error);
        showMessage('Error al cargar guía', 'error');
    }
}

async function handleGuideSubmit(e) {
    e.preventDefault();
    
    const guideId = document.getElementById('guide_id').value;
    const formData = {
        title: document.getElementById('guide_title').value,
        description: document.getElementById('guide_description').value,
        category: document.getElementById('guide_category').value,
        preview_url: document.getElementById('guide_preview_url').value,
        file_url: document.getElementById('guide_file_url').value,
        price: parseFloat(document.getElementById('guide_price').value)
    };
    
    const url = guideId ? `/api/guides/${guideId}` : '/api/guides';
    const method = guideId ? 'PUT' : 'POST';
    
    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        if (response.ok) {
            showMessage(guideId ? 'Guía actualizada' : 'Guía creada', 'success');
            hideGuideForm();
            loadGuides();
        } else {
            showMessage('Error al guardar guía', 'error');
        }
    } catch (error) {
        console.error('Error saving guide:', error);
        showMessage('Error al guardar guía', 'error');
    }
}

async function deleteGuide(id) {
    if (!confirm('¿Estás seguro de eliminar esta guía?')) return;
    
    try {
        const response = await fetch(`/api/guides/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            showMessage('Guía eliminada', 'success');
            loadGuides();
        } else {
            showMessage('Error al eliminar guía', 'error');
        }
    } catch (error) {
        console.error('Error deleting guide:', error);
        showMessage('Error al eliminar guía', 'error');
    }
}

// Guide Purchases
async function loadPurchases() {
    try {
        const response = await fetch('/api/guides/purchases/all');
        const data = await response.json();
        
        const container = document.getElementById('purchasesTable');
        
        if (data.purchases && data.purchases.length > 0) {
            let table = '<table><thead><tr><th>ID</th><th>Guía</th><th>Comprador</th><th>Email</th><th>Estado</th><th>Fecha</th></tr></thead><tbody>';
            
            data.purchases.forEach(purchase => {
                table += `
                    <tr>
                        <td>${purchase.id}</td>
                        <td>${purchase.guide_title}</td>
                        <td>${purchase.buyer_name}</td>
                        <td>${purchase.buyer_email}</td>
                        <td>${purchase.payment_status}</td>
                        <td>${purchase.created_at}</td>
                    </tr>
                `;
            });
            
            table += '</tbody></table>';
            container.innerHTML = table;
        } else {
            container.innerHTML = '<p>No hay compras.</p>';
        }
    } catch (error) {
        console.error('Error loading purchases:', error);
        document.getElementById('purchasesTable').innerHTML = '<p class="message error">Error al cargar compras.</p>';
    }
}

// Utility
function showMessage(message, type = 'info') {
    const messageDiv = document.getElementById('message');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    messageDiv.style.display = 'block';
    
    // Scroll to message
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}
