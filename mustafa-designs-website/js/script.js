// Navbar scroll effect
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
        navbar.classList.add('glass-nav');
        navbar.classList.remove('py-5');
        navbar.classList.add('py-3');
    } else {
        navbar.classList.remove('glass-nav');
        navbar.classList.remove('py-3');
        navbar.classList.add('py-5');
    }

    if (window.scrollY > 500) {
        backToTop.classList.remove('opacity-0', 'pointer-events-none');
        backToTop.classList.add('opacity-100');
    } else {
        backToTop.classList.add('opacity-0', 'pointer-events-none');
        backToTop.classList.remove('opacity-100');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Mobile menu
const mobileToggle = document.getElementById('mobile-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = mobileToggle.querySelector('i');

mobileToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    if (!mobileMenu.classList.contains('hidden')) {
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-times');
    } else {
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
    }
});

document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
    });
});

// Active nav link
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active', 'text-white');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active', 'text-white');
        }
    });
});

// Counter animation
const counters = document.querySelectorAll('.counter');
let countersAnimated = false;

const animateCounters = () => {
    if (countersAnimated) return;
    const statsSection = document.querySelector('.stat-counter');
    if (!statsSection) return;
    const rect = statsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
        countersAnimated = true;
        counters.forEach(counter => {
            const target = parseInt(counter.closest('.stat-counter').dataset.target, 10);
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current);
                }
            }, 16);
        });
    }
};
window.addEventListener('scroll', animateCounters);

// Scroll reveal
const revealElements = document.querySelectorAll('.reveal-on-scroll');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
});

// Form submission
const form = document.getElementById('contactForm');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalHTML = btn.innerHTML;

    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;
    btn.classList.add('opacity-75', 'cursor-not-allowed');

    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        btn.classList.remove('bg-brand-accent', 'hover:bg-brand-accentHover');
        btn.classList.add('bg-green-600');

        setTimeout(() => {
            form.reset();
            btn.innerHTML = originalHTML;
            btn.disabled = false;
            btn.classList.remove('opacity-75', 'cursor-not-allowed', 'bg-green-600');
            btn.classList.add('bg-brand-accent', 'hover:bg-brand-accentHover');
            alert('Thank you for your inquiry! We will get back to you within 24 hours.');
        }, 2000);
    }, 1500);
});
