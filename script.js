document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('[data-animate]');
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  const revealImmediately = () => {
    animatedElements.forEach((element) => {
      element.classList.add('visible');
      element.style.removeProperty('--delay');
    });
  };

  const registerMotionListener = (callback) => {
    if (typeof motionQuery.addEventListener === 'function') {
      motionQuery.addEventListener('change', callback);
    } else if (typeof motionQuery.addListener === 'function') {
      motionQuery.addListener(callback);
    }
  };

  if (motionQuery.matches) {
    revealImmediately();
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -10%',
      }
    );

    animatedElements.forEach((element, index) => {
      const delay = element.dataset.animateDelay || `${Math.min(index * 60, 360)}ms`;
      element.style.setProperty('--delay', delay);
      observer.observe(element);
    });

    registerMotionListener((event) => {
      if (event.matches) {
        revealImmediately();
      }
    });
  }

  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  const timeElement = document.querySelector('[data-local-time]');
  if (timeElement) {
    const timeZone = timeElement.getAttribute('data-timezone') || Intl.DateTimeFormat().resolvedOptions().timeZone;
    const updateLocalTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('es-CO', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone,
      });
      timeElement.textContent = formatter.format(now);
    };

    updateLocalTime();
    const intervalId = window.setInterval(updateLocalTime, 60000);
    window.addEventListener('beforeunload', () => window.clearInterval(intervalId));
  }
});
