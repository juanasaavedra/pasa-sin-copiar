// Bookings page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('bookingForm');
    bookingForm.addEventListener('submit', handleBookingSubmit);
    
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').min = today;
    document.getElementById('availabilityDate').min = today;
});

async function checkAvailability() {
    const date = document.getElementById('availabilityDate').value;
    
    if (!date) {
        showMessage('Por favor selecciona una fecha', 'error');
        return;
    }
    
    const resultsContainer = document.getElementById('availabilityResults');
    resultsContainer.innerHTML = '<div class="spinner"></div>';
    
    try {
        const response = await fetch(`/api/bookings/availability?date=${date}`);
        const data = await response.json();
        
        resultsContainer.innerHTML = '';
        
        if (data.availability && data.availability.length > 0) {
            resultsContainer.innerHTML = `<h3>Horarios Disponibles - ${data.dayOfWeek}</h3>`;
            
            data.availability.forEach(slot => {
                const slotDiv = document.createElement('div');
                slotDiv.className = 'time-slot available';
                slotDiv.innerHTML = `
                    <div>
                        <strong>${slot.tutor}</strong><br>
                        ${slot.time} (${slot.duration} minutos)
                    </div>
                    <button class="btn btn-small" onclick="fillBookingForm('${slot.tutor}', '${date}', '${slot.time}', ${slot.duration})">
                        Seleccionar
                    </button>
                `;
                resultsContainer.appendChild(slotDiv);
            });
        } else {
            resultsContainer.innerHTML = '<p class="message info">No hay horarios disponibles para esta fecha.</p>';
        }
    } catch (error) {
        console.error('Error checking availability:', error);
        resultsContainer.innerHTML = '<p class="message error">Error al verificar disponibilidad.</p>';
    }
}

function fillBookingForm(tutor, date, time, duration) {
    document.getElementById('tutor_name').value = tutor;
    document.getElementById('date').value = date;
    document.getElementById('time').value = time;
    document.getElementById('duration').value = duration;
    
    // Scroll to form
    document.getElementById('bookingForm').scrollIntoView({ behavior: 'smooth' });
    showMessage('Formulario prellenado. Completa los datos restantes.', 'info');
}

async function handleBookingSubmit(e) {
    e.preventDefault();
    
    const formData = {
        student_name: document.getElementById('student_name').value,
        student_email: document.getElementById('student_email').value,
        tutor_name: document.getElementById('tutor_name').value,
        subject: document.getElementById('subject').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        duration: parseInt(document.getElementById('duration').value)
    };
    
    try {
        const response = await fetch('/api/bookings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showMessage('¡Tutoría agendada exitosamente! Revisa tu correo para la confirmación.', 'success');
            document.getElementById('bookingForm').reset();
        } else {
            showMessage(data.error || 'Error al agendar tutoría', 'error');
        }
    } catch (error) {
        console.error('Error creating booking:', error);
        showMessage('Error al agendar tutoría. Por favor intenta nuevamente.', 'error');
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
