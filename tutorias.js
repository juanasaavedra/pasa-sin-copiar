// Google Calendar integration for tutorias page
const initCalendarIntegration = () => {
    const calendarContainer = document.getElementById('calendar-integration');
    if (!calendarContainer) return;

    // Check if Google Calendar URL is available (from environment variable)
    // In a real implementation, this would come from a backend endpoint
    // For now, we'll check if there's a data attribute or fetch from server
    
    fetch('/api/config/calendar-url')
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Calendar URL not configured');
        })
        .then(data => {
            if (data.calendarUrl) {
                // If Google Calendar URL is present, embed it
                const iframe = document.createElement('iframe');
                iframe.src = data.calendarUrl;
                iframe.style.width = '100%';
                iframe.style.height = '600px';
                iframe.style.border = '0';
                iframe.style.borderRadius = 'var(--radius-lg)';
                iframe.frameBorder = '0';
                iframe.scrolling = 'no';
                
                calendarContainer.innerHTML = '';
                calendarContainer.appendChild(iframe);
            } else {
                showFallbackOptions();
            }
        })
        .catch(error => {
            console.log('Calendar URL not available, showing fallback options');
            showFallbackOptions();
        });
};

const showFallbackOptions = () => {
    const calendarContainer = document.getElementById('calendar-integration');
    if (!calendarContainer) return;

    calendarContainer.innerHTML = `
        <div class="calendar-fallback-message">
            <p>📅 Para agendar tu sesión, utiliza una de las opciones a continuación</p>
        </div>
    `;
};

// Smooth scroll to calendar section
const initSmoothScroll = () => {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
};

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    initCalendarIntegration();
    initSmoothScroll();
});
