// Efecto de escritura en el título
document.addEventListener('DOMContentLoaded', function () {
    const title = document.querySelector('.entrada-left h1');
    const text = title.innerText;
    title.innerText = '';

    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            title.innerText += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }

    setTimeout(typeWriter, 1000);
});

// Funcionalidad del menú hamburguesa
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Alternar menú al hacer click en hamburguesa
    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');

        // Prevenir scroll del body cuando el menú está abierto
        if (navMenu.classList.contains('active')) {
            document.body.classList.add('body-no-scroll');
            // Añadir aria-expanded para accesibilidad
            hamburger.setAttribute('aria-expanded', 'true');
        } else {
            document.body.classList.remove('body-no-scroll');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });

    // Cerrar menú al hacer click en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('body-no-scroll');
            hamburger.setAttribute('aria-expanded', 'false');

            // Smooth scroll hacia la sección
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    setTimeout(() => {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }, 300);
                }
            }
        });
    });

    // Cerrar menú al hacer click fuera de él
    document.addEventListener('click', function (event) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);

        if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('body-no-scroll');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });

    // Cerrar menú con tecla Escape
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('body-no-scroll');
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.focus(); // Devolver el foco al botón
        }
    });

    // Responsive: mostrar/ocultar hamburguesa según el tamaño de pantalla
    function handleResize() {
        if (window.innerWidth > 768) {
            // Desktop: ocultar hamburguesa y mostrar menú normal
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('body-no-scroll');
            hamburger.setAttribute('aria-expanded', 'false');
        } else {
            // Mobile: asegurar que el menú esté oculto por defecto
            if (!navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        }
    }

    // Inicializar atributos de accesibilidad
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-controls', 'nav-menu');
    navMenu.setAttribute('role', 'navigation');

    window.addEventListener('resize', handleResize);
    handleResize(); // Ejecutar al cargar
});

// Crear más partículas dinámicamente
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    const colors = ['#00ffff', '#0096ff', '#00aaff'];

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (Math.random() * 5 + 5) + 's';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particlesContainer.appendChild(particle);
    }
}

createParticles();

// Manejo del formulario de contacto
document.getElementById('contactForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const formStatus = document.getElementById('formStatus');
    const submitBtn = document.querySelector('.submit-btn');

    // Cambiar estado del botón
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitBtn.disabled = true;

    try {
        // Aquí irá la llamada a tu API
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message')
            })
        });

        if (response.ok) {
            formStatus.innerHTML = `
                        <div class="success-message">
                            <i class="fas fa-check-circle"></i>
                            ¡Mensaje enviado correctamente! Te responderé pronto.
                        </div>
                    `;
            this.reset();
        } else {
            throw new Error('Error en el servidor');
        }
    } catch (error) {
        formStatus.innerHTML = `
                    <div class="error-message">
                        <i class="fas fa-exclamation-triangle"></i>
                        Error al enviar el mensaje. Por favor, inténtalo de nuevo o contacta directamente por email.
                    </div>
                `;
    } finally {
        // Restaurar botón
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Mensaje';
        submitBtn.disabled = false;

        // Limpiar mensaje después de 5 segundos
        setTimeout(() => {
            formStatus.innerHTML = '';
        }, 5000);
    }
});

// Efectos de foco en los campos del formulario
document.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('focus', function () {
        this.parentElement.classList.add('focused');
    });

    field.addEventListener('blur', function () {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
});

// Mejoras para móviles

// Smooth scroll para navegación
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80; // Compensar navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Detectar orientación y ajustar layout
function handleOrientationChange() {
    // Pequeño delay para que el navegador termine la rotación
    setTimeout(() => {
        // Recalcular alturas si es necesario
        if (window.innerHeight < 500 && window.innerWidth > window.innerHeight) {
            document.body.classList.add('landscape-mode');
        } else {
            document.body.classList.remove('landscape-mode');
        }
    }, 100);
}

window.addEventListener('orientationchange', handleOrientationChange);
window.addEventListener('resize', handleOrientationChange);

// Prevenir zoom en doble tap en iOS
let lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Mejorar rendimiento en scroll
let ticking = false;

function updateScrollEffects() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    // Parallax suave en las partículas
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
        const speed = (index % 3 + 1) * 0.1;
        particle.style.transform = `translateY(${scrolled * speed}px)`;
    });

    ticking = false;
}

function requestScrollUpdate() {
    if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
    }
}

// Solo aplicar efectos de scroll en dispositivos que no son móviles
if (window.innerWidth > 768) {
    window.addEventListener('scroll', requestScrollUpdate);
}

// Lazy loading para imágenes (si agregamos más en el futuro)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Mejorar accesibilidad del teclado
document.addEventListener('keydown', function (e) {
    // ESC para cerrar mensajes de estado
    if (e.key === 'Escape') {
        const formStatus = document.getElementById('formStatus');
        if (formStatus && formStatus.innerHTML) {
            formStatus.innerHTML = '';
        }
    }
});

// Detectar si el usuario prefiere movimiento reducido
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Desactivar algunas animaciones si el usuario lo prefiere
    document.body.classList.add('reduced-motion');
}

// Efecto de transparencia del navbar al hacer scroll
let lastScrollY = window.scrollY;

function updateNavbarOnScroll() {
    const navbar = document.querySelector('.navbar');
    const currentScrollY = window.scrollY;

    if (currentScrollY > 50) {
        navbar.style.background = 'linear-gradient(135deg, rgba(0, 255, 255, 0.15) 0%, rgba(0, 150, 255, 0.15) 100%)';
        navbar.style.backdropFilter = 'blur(15px)';
        navbar.style.borderColor = 'rgba(0, 255, 255, 0.3)';
    } else {
        navbar.style.background = 'linear-gradient(135deg, rgba(0, 255, 255, 0.1) 0%, rgba(0, 150, 255, 0.1) 100%)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.borderColor = 'rgba(0, 255, 255, 0.2)';
    }

    lastScrollY = currentScrollY;
}

// Solo aplicar en pantallas grandes
if (window.innerWidth > 768) {
    window.addEventListener('scroll', updateNavbarOnScroll, { passive: true });
}

// PWA básico - Service Worker registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        // Registrar service worker en el futuro si lo necesitas
        console.log('Listo para PWA features');
    });
}