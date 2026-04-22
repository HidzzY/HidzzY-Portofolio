document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    const preloaderText = document.getElementById('preloader-text');
    const nav = document.querySelector('nav');
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    
    // --- Preloader Logic ---
    preloaderText.addEventListener('animationend', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            document.body.style.overflowY = 'auto'; // Re-enable scroll
            revealElements.forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    el.classList.add('is-visible');
                }
            });
        }, 500);
    });

    // --- Navbar Scroll Effect ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // --- Smooth Scrolling for Navbar ---
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                const offsetTop = targetSection.offsetTop - nav.offsetHeight - 20;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Reveal on Scroll (Intersection Observer) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        observer.observe(el);
    });

    // --- Active Navbar Link Highlighting (Scrollspy) ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav ul.navbar-menu li a');

    function highlightActiveLink() {
        let currentActive = null;

        for (let i = sections.length - 1; i >= 0; i--) {
            const section = sections[i];
            const sectionTop = section.offsetTop - nav.offsetHeight - 30;
            
            if (window.scrollY >= sectionTop) {
                currentActive = section.getAttribute('id');
                break;
            }
        }

        navLinks.forEach(link => {
            link.classList.remove('active-link');
            if (link.getAttribute('href') === `#${currentActive}`) {
                link.classList.add('active-link');
            }
        });
        
        if (window.scrollY < document.querySelector('#about').offsetTop - nav.offsetHeight - 30) {
             const homeLink = document.querySelector('a[href="#home"]');
             if(homeLink) homeLink.classList.add('active-link');
        }
    }

    window.addEventListener('scroll', highlightActiveLink);
    window.addEventListener('load', highlightActiveLink);

    preloaderText.addEventListener('animationend', () => {
        setTimeout(() => {
            highlightActiveLink();
        }, 500);
    });
});