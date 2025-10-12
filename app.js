const initAnimations = () => {
    const animatedNodes = document.querySelectorAll('[data-animate]');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if ('IntersectionObserver' in window && !prefersReducedMotion) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
        });

        animatedNodes.forEach((node) => observer.observe(node));
    } else {
        animatedNodes.forEach((node) => node.classList.add('is-visible'));
    }
};

const initRotatingSubtitle = () => {
    const subtitleElement = document.getElementById('rotating-subtitle');
    if (!subtitleElement) return;

    const subtitles = [
        'Aprende de verdad, no memorices',
        'Domina conceptos. Aplica. Evoluciona',
        'Tu éxito académico comienza aquí'
    ];
    let currentIndex = 0;

    const updateSubtitle = () => {
        subtitleElement.style.opacity = '0';
        setTimeout(() => {
            subtitleElement.textContent = subtitles[currentIndex];
            subtitleElement.style.opacity = '1';
            currentIndex = (currentIndex + 1) % subtitles.length;
        }, 300);
    };

    updateSubtitle();
    setInterval(updateSubtitle, 3000);
};

const initParallax = () => {
    const parallaxItems = document.querySelectorAll('[data-parallax]');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (!parallaxItems.length) return;

    const update = () => {
        const scrollY = window.scrollY;
        parallaxItems.forEach((item) => {
            const speed = parseFloat(item.getAttribute('data-parallax-speed')) || 0.1;
            item.style.transform = `translateY(${scrollY * speed}px)`;
        });
    };

    const handle = () => {
        requestAnimationFrame(update);
    };

    if (!prefersReducedMotion.matches) {
        update();
        window.addEventListener('scroll', handle, { passive: true });
        prefersReducedMotion.addEventListener('change', (event) => {
            if (event.matches) {
                parallaxItems.forEach((item) => {
                    item.style.transform = 'translateY(0)';
                });
                window.removeEventListener('scroll', handle);
            } else {
                window.addEventListener('scroll', handle, { passive: true });
                update();
            }
        });
    } else {
        parallaxItems.forEach((item) => {
            item.style.transform = 'translateY(0)';
        });
    }
};

const initYear = () => {
    const yearNode = document.getElementById('year');
    if (yearNode) {
        yearNode.textContent = new Date().getFullYear();
    }
};

const initRotatingSubtitle = () => {
    const subtitleElement = document.getElementById('subtitle-rotativo');
    if (!subtitleElement) return;
    
    const subtitles = [
        'Tutorías personalizadas · Cursos completos · Guías descargables',
        'Aprende de verdad, no memorices',
        'Domina conceptos · Aplica · Evoluciona'
    ];
    
    let currentIndex = 0;
    
    setInterval(() => {
        currentIndex = (currentIndex + 1) % subtitles.length;
        subtitleElement.style.opacity = '0';
        
        setTimeout(() => {
            subtitleElement.textContent = subtitles[currentIndex];
            subtitleElement.style.opacity = '1';
        }, 300);
    }, 4000);
};

const initModal = () => {
    const modalBg = document.getElementById('tutoria-modal-bg');
    const closeModalBtn = document.getElementById('close-tutoria-modal');
    const openModalBtns = document.querySelectorAll('.open-tutoria-modal, #open-tutoria-modal, #open-tutoria-modal-cta');
    const tutoriaForm = document.getElementById('tutoria-form');
    const tutoriaSuccess = document.getElementById('tutoria-success');
    
    if (!modalBg) return;
    
    // Open modal
    openModalBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            modalBg.removeAttribute('hidden');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal
    const closeModal = () => {
        modalBg.setAttribute('hidden', '');
        document.body.style.overflow = '';
    };
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    
    modalBg.addEventListener('click', (e) => {
        if (e.target === modalBg) {
            closeModal();
        }
    });
    
    // Handle form submission
    if (tutoriaForm) {
        tutoriaForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Here you would normally send the form data to your backend
            // For now, we'll just show the success message
            tutoriaForm.style.display = 'none';
            if (tutoriaSuccess) {
                tutoriaSuccess.removeAttribute('hidden');
            }
            
            // Reset after a delay
            setTimeout(() => {
                closeModal();
                setTimeout(() => {
                    tutoriaForm.style.display = 'flex';
                    if (tutoriaSuccess) {
                        tutoriaSuccess.setAttribute('hidden', '');
                    }
                    tutoriaForm.reset();
                }, 300);
            }, 3000);
        });
    }
};

window.addEventListener('DOMContentLoaded', () => {
    initAnimations();
    initParallax();
    initYear();
    initRotatingSubtitle();
});
