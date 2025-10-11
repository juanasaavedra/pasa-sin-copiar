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

window.addEventListener('DOMContentLoaded', () => {
    initAnimations();
    initParallax();
    initYear();
    initRotatingSubtitle();
});
