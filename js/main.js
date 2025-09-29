// Modern JavaScript for Construction Services Website
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Header scroll effect
    let lastScrollTop = 0;
    const header = document.querySelector('.site-header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'var(--dark)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'var(--dark)';
            header.style.backdropFilter = 'none';
        }
        
        lastScrollTop = scrollTop;
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.card, .value-item, .stat-item, .project-card').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Mobile menu functionality
    function initMobileMenu() {
        const nav = document.querySelector('.main-nav');
        const headerInner = document.querySelector('.header-inner');
        
        // Get existing mobile menu toggle (it exists in HTML)
        let mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        if (mobileMenuToggle) {
            mobileMenuToggle.setAttribute('aria-controls', 'main-navigation');
        }
        
        // Set navigation ID for accessibility
        if (nav) {
            nav.setAttribute('id', 'main-navigation');
        } else {
            console.error('Main navigation not found');
            return;
        }
        
        // Toggle menu function
        function toggleMenu() {
            const isOpen = nav.classList.contains('is-open');
            
            console.log('Toggle menu called, current state:', isOpen);
            
            if (isOpen) {
                nav.classList.remove('is-open');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                mobileMenuToggle.innerHTML = '☰';
                document.body.style.overflow = '';
                console.log('Menu closed');
            } else {
                nav.classList.add('is-open');
                mobileMenuToggle.setAttribute('aria-expanded', 'true');
                mobileMenuToggle.innerHTML = '✕';
                document.body.style.overflow = 'hidden';
                console.log('Menu opened');
            }
        }
        
        // Event listeners
        if (mobileMenuToggle) {
            // Remove any existing event listeners to prevent duplicates
            mobileMenuToggle.replaceWith(mobileMenuToggle.cloneNode(true));
            mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
            
            console.log('Attaching click listener to mobile menu toggle');
            mobileMenuToggle.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Mobile menu clicked');
                toggleMenu();
            });
        } else {
            console.error('Mobile menu toggle not found');
        }
        
        // Close menu when clicking nav links
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (nav.classList.contains('is-open')) {
                    toggleMenu();
                }
            });
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && nav.classList.contains('is-open')) {
                toggleMenu();
            }
        });
        
        // Close menu on window resize to desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && nav.classList.contains('is-open')) {
                nav.classList.remove('is-open');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                mobileMenuToggle.innerHTML = '☰';
                document.body.style.overflow = '';
            }
        });
    }

    // Initialize mobile menu
    initMobileMenu();

    // Counter animation for statistics
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += step;
                    if (current > target) current = target;
                    counter.textContent = Math.floor(current) + (counter.textContent.includes('+') ? '+' : '');
                    requestAnimationFrame(updateCounter);
                }
            };
            
            updateCounter();
        });
    }

    // Observe stats section for counter animation
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.disconnect();
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }

    // Form validation and enhancement
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#dc2626';
                    input.addEventListener('input', function() {
                        if (this.value.trim()) {
                            this.style.borderColor = '#e2e8f0';
                        }
                    });
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields.');
            }
        });
    });

    // Loading animation for cards
    document.querySelectorAll('.card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Smooth reveal for hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }

    // Phone number formatting
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.startsWith('0')) {
                value = value.substring(1);
            }
            if (value.startsWith('92')) {
                value = value.substring(2);
            }
            
            if (value.length >= 10) {
                const formatted = `+92-${value.substring(0, 3)}-${value.substring(3, 7)}-${value.substring(7, 10)}`;
                e.target.value = formatted;
            }
        });
    });

    // Optimized Hero Image Slider
    function initHeroSlider() {
        const slides = document.querySelectorAll('.hero-slide');
        
        if (slides.length === 0) return;
        
        let currentSlide = 0;
        let sliderInterval;
        
        function nextSlide() {
            // Use CSS transforms for better performance
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }
        
        function startSlider() {
            sliderInterval = setInterval(nextSlide, 5000);
        }
        
        function stopSlider() {
            clearInterval(sliderInterval);
        }
        
        // Pause slider when tab is not visible (performance optimization)
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                stopSlider();
            } else {
                startSlider();
            }
        });
        
        // Start the slider
        startSlider();
        
        return () => clearInterval(sliderInterval);
    }
    
    // Initialize hero slider
    const cleanupSlider = initHeroSlider();

    // Image lazy loading implementation
    function initLazyLoading() {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            lazyImages.forEach(img => {
                imageObserver.observe(img);
            });
        } else {
            // Fallback for older browsers
            lazyImages.forEach(img => {
                img.classList.add('loaded');
            });
        }
    }
    
    // Initialize lazy loading
    initLazyLoading();
    
    // Performance optimizations
    function optimizePerformance() {
        // Remove unnecessary visibility toggle
        
        // Critical images will be preloaded in HTML head instead
    }
    
    // Initialize performance optimizations
    optimizePerformance();
    
    console.log('Pak Builders website loaded successfully!');
});